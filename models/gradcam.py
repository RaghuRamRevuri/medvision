"""
MedVision AI: Explainable AI (Grad-CAM) PyTorch Implementation
Gradient-weighted Class Activation Mapping for Deep Convolutional Networks.
"""

import cv2
import numpy as np
import torch
import torch.nn.functional as F

class GradCAM:
    """
    Computes Gradient-weighted Class Activation Maps (Grad-CAM) for deep convolutional networks.
    """
    def __init__(self, model, target_layer):
        self.model = model
        self.target_layer = target_layer
        self.gradients = None
        self.activations = None
        self.hook_handles = []
        self._register_hooks()

    def _register_hooks(self):
        def forward_hook(module, input, output):
            self.activations = output.detach()

        def backward_hook(module, grad_in, grad_out):
            self.gradients = grad_out[0].detach()

        self.hook_handles.append(self.target_layer.register_forward_hook(forward_hook))
        self.hook_handles.append(self.target_layer.register_backward_hook(backward_hook))

    def generate_heatmap(self, input_tensor, target_class=None):
        """
        Generates 2D Grad-CAM heatmap array normalized in range [0, 1].
        """
        self.model.eval()
        output = self.model(input_tensor)

        if target_class is None:
            target_class = torch.argmax(output, dim=1).item()

        self.model.zero_grad()
        target_score = output[0, target_class]
        target_score.backward()

        # Global average pooling of gradients: alpha_k^c
        weights = torch.mean(self.gradients, dim=(2, 3), keepdim=True)
        # Linear combination of activation maps
        cam = torch.sum(weights * self.activations, dim=1, keepdim=True)
        # Apply ReLU to retain only positive influence
        cam = F.relu(cam)

        # Normalize between 0 and 1
        cam = cam.squeeze().cpu().numpy()
        cam = cv2.resize(cam, (input_tensor.shape[3], input_tensor.shape[2]))
        cam_min, cam_max = np.min(cam), np.max(cam)
        if cam_max - cam_min > 1e-8:
            cam = (cam - cam_min) / (cam_max - cam_min)
        else:
            cam = np.zeros_like(cam)

        return cam

    def overlay_on_image(self, original_bgr, heatmap, colormap=cv2.COLORMAP_JET, alpha=0.6):
        """
        Overlays the normalized heatmap on the original medical radiograph/scan.
        """
        heatmap_uint8 = np.uint8(255 * heatmap)
        colored_heatmap = cv2.applyColorMap(heatmap_uint8, colormap)
        blended = cv2.addWeighted(colored_heatmap, alpha, original_bgr, 1 - alpha, 0)
        return blended

    def remove_hooks(self):
        for handle in self.hook_handles:
            handle.remove()
