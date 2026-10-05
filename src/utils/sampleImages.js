// MedVision AI: High-Fidelity Medical Scan Generator & Procedural Imaging Engine
// Generates accurate grayscale and color medical diagnostic images for all 5 modalities

export function generateMedicalImage(modality, options = {}) {
  const width = options.width || 512;
  const height = options.height || 512;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) return "";

  switch (modality) {
    case "chest_xray":
      drawChestXray(ctx, width, height, options);
      break;
    case "mri_brain":
      drawBrainMRI(ctx, width, height, options);
      break;
    case "ct_scan":
      drawChestCT(ctx, width, height, options);
      break;
    case "fundus":
      drawRetinalFundus(ctx, width, height, options);
      break;
    case "dermoscopy":
      drawDermoscopy(ctx, width, height, options);
      break;
    default:
      drawChestXray(ctx, width, height, options);
  }

  return canvas.toDataURL("image/png");
}

function drawChestXray(ctx, w, h, opts) {
  // Deep radiographic dark background
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#080b10");
  bg.addColorStop(0.5, "#0d131a");
  bg.addColorStop(1, "#05070a");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Thoracic cage outline / soft tissues
  ctx.fillStyle = "rgba(40, 50, 65, 0.4)";
  ctx.beginPath();
  ctx.ellipse(w * 0.5, h * 0.52, w * 0.44, h * 0.46, 0, 0, Math.PI * 2);
  ctx.fill();

  // Spine & mediastinum column
  const spineGrad = ctx.createLinearGradient(w * 0.44, 0, w * 0.56, 0);
  spineGrad.addColorStop(0, "rgba(80, 95, 120, 0.2)");
  spineGrad.addColorStop(0.5, "rgba(160, 180, 205, 0.7)");
  spineGrad.addColorStop(1, "rgba(80, 95, 120, 0.2)");
  ctx.fillStyle = spineGrad;
  ctx.fillRect(w * 0.47, h * 0.1, w * 0.06, h * 0.75);

  // Clavicles (collar bones)
  ctx.strokeStyle = "rgba(180, 200, 220, 0.65)";
  ctx.lineWidth = 14;
  ctx.lineCap = "round";
  // Left clavicle
  ctx.beginPath();
  ctx.moveTo(w * 0.48, h * 0.18);
  ctx.quadraticCurveTo(w * 0.3, h * 0.14, w * 0.14, h * 0.2);
  ctx.stroke();
  // Right clavicle
  ctx.beginPath();
  ctx.moveTo(w * 0.52, h * 0.18);
  ctx.quadraticCurveTo(w * 0.7, h * 0.14, w * 0.86, h * 0.2);
  ctx.stroke();

  // Left & Right Hemithorax (Lungs - Radiolucent / Darker areas)
  ctx.fillStyle = "rgba(12, 18, 25, 0.85)";
  // Left Lung (anatomical right on screen)
  ctx.beginPath();
  ctx.ellipse(w * 0.3, h * 0.48, w * 0.17, h * 0.28, -0.05, 0, Math.PI * 2);
  ctx.fill();

  // Right Lung (anatomical left on screen)
  ctx.beginPath();
  ctx.ellipse(w * 0.7, h * 0.48, w * 0.17, h * 0.28, 0.05, 0, Math.PI * 2);
  ctx.fill();

  // Rib arches
  ctx.strokeStyle = "rgba(140, 160, 185, 0.35)";
  ctx.lineWidth = 8;
  for (let i = 0; i < 7; i++) {
    const yOff = h * (0.24 + i * 0.08);
    // Left ribs
    ctx.beginPath();
    ctx.moveTo(w * 0.48, yOff - 10);
    ctx.quadraticCurveTo(w * 0.28, yOff + 15, w * 0.12, yOff - 5);
    ctx.stroke();
    // Right ribs
    ctx.beginPath();
    ctx.moveTo(w * 0.52, yOff - 10);
    ctx.quadraticCurveTo(w * 0.72, yOff + 15, w * 0.88, yOff - 5);
    ctx.stroke();
  }

  // Cardiac silhouette (Heart shadow shifted leftwards)
  const heartGrad = ctx.createRadialGradient(w * 0.42, h * 0.58, 10, w * 0.42, h * 0.58, w * 0.22);
  heartGrad.addColorStop(0, "rgba(200, 220, 240, 0.8)");
  heartGrad.addColorStop(0.7, "rgba(130, 150, 175, 0.6)");
  heartGrad.addColorStop(1, "rgba(70, 90, 115, 0.1)");
  ctx.fillStyle = heartGrad;
  ctx.beginPath();
  ctx.moveTo(w * 0.46, h * 0.4);
  ctx.bezierCurveTo(w * 0.58, h * 0.45, w * 0.58, h * 0.72, w * 0.46, h * 0.75);
  ctx.bezierCurveTo(w * 0.25, h * 0.75, w * 0.24, h * 0.55, w * 0.46, h * 0.4);
  ctx.fill();

  // Diaphragm arches
  ctx.fillStyle = "rgba(110, 130, 150, 0.75)";
  ctx.beginPath();
  ctx.arc(w * 0.3, h * 0.82, w * 0.24, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(w * 0.7, h * 0.84, w * 0.24, Math.PI, Math.PI * 2);
  ctx.fill();

  // PATHOLOGY: Dense Alveolar Pneumonia Consolidation in right lower zone (screen right/anatomical right)
  const hotspotX = w * 0.68;
  const hotspotY = h * 0.65;
  const rad = ctx.createRadialGradient(hotspotX, hotspotY, 5, hotspotX, hotspotY, w * 0.18);
  rad.addColorStop(0, "rgba(240, 245, 255, 0.85)");
  rad.addColorStop(0.4, "rgba(190, 210, 235, 0.65)");
  rad.addColorStop(0.7, "rgba(120, 150, 180, 0.35)");
  rad.addColorStop(1, "rgba(20, 30, 45, 0)");
  ctx.fillStyle = rad;
  ctx.beginPath();
  ctx.ellipse(hotspotX, hotspotY, w * 0.16, h * 0.14, 0.15, 0, Math.PI * 2);
  ctx.fill();

  // Add subtle bronchogram striations
  ctx.strokeStyle = "rgba(15, 20, 30, 0.4)";
  ctx.lineWidth = 2.5;
  for (let j = 0; j < 5; j++) {
    ctx.beginPath();
    ctx.moveTo(hotspotX - 25 + j * 12, hotspotY - 20);
    ctx.lineTo(hotspotX - 10 + j * 10, hotspotY + 30);
    ctx.stroke();
  }

  // Radiographic Lead Markers & HUD
  ctx.font = "bold 16px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(220, 230, 240, 0.85)";
  ctx.fillText("R", w * 0.88, h * 0.12);
  ctx.font = "11px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(120, 160, 190, 0.7)";
  ctx.fillText("PA ERECT | CXR-00941", 18, 28);
  ctx.fillText("MEDVISION-AI PRETRAINED EFFICIENTNET-B0", 18, 44);
}

function drawBrainMRI(ctx, w, h, opts) {
  // MRI Dark T1/T2 space
  ctx.fillStyle = "#03060a";
  ctx.fillRect(0, 0, w, h);

  // Outer Calvarium / Skull
  ctx.strokeStyle = "rgba(160, 175, 195, 0.75)";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.ellipse(w * 0.5, h * 0.5, w * 0.38, h * 0.42, 0, 0, Math.PI * 2);
  ctx.stroke();

  // CSF Space (Subarachnoid)
  ctx.strokeStyle = "rgba(15, 25, 38, 0.9)";
  ctx.lineWidth = 6;
  ctx.stroke();

  // Brain Parenchyma (Cerebral hemispheres)
  const brainGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, 30, w * 0.5, h * 0.5, w * 0.36);
  brainGrad.addColorStop(0, "rgba(85, 95, 110, 0.95)");
  brainGrad.addColorStop(0.8, "rgba(65, 75, 90, 0.9)");
  brainGrad.addColorStop(1, "rgba(35, 45, 58, 0.85)");
  ctx.fillStyle = brainGrad;
  ctx.beginPath();
  ctx.ellipse(w * 0.5, h * 0.5, w * 0.35, h * 0.39, 0, 0, Math.PI * 2);
  ctx.fill();

  // Longitudinal interhemispheric fissure
  ctx.strokeStyle = "rgba(15, 20, 28, 0.85)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w * 0.5, h * 0.12);
  ctx.lineTo(w * 0.5, h * 0.88);
  ctx.stroke();

  // Lateral Ventricles (CSF - Dark on T1 / Bright on T2)
  ctx.fillStyle = "rgba(15, 22, 32, 0.95)";
  ctx.beginPath();
  ctx.ellipse(w * 0.46, h * 0.48, w * 0.04, h * 0.14, -0.15, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(w * 0.54, h * 0.48, w * 0.04, h * 0.14, 0.15, 0, Math.PI * 2);
  ctx.fill();

  // Sulci convolutions
  ctx.strokeStyle = "rgba(25, 35, 45, 0.5)";
  ctx.lineWidth = 2;
  for (let a = 0; a < Math.PI * 2; a += 0.2) {
    const r = w * 0.33;
    const sx = w * 0.5 + Math.cos(a) * r;
    const sy = h * 0.5 + Math.sin(a) * r * 1.1;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx - Math.cos(a) * 22, sy - Math.sin(a) * 22);
    ctx.stroke();
  }

  // PATHOLOGY: High-Grade Glioma in Right Frontal/Temporal white matter
  const tumorX = w * 0.60;
  const tumorY = h * 0.40;

  // Vasogenic edema cloud
  const edema = ctx.createRadialGradient(tumorX, tumorY, 5, tumorX, tumorY, w * 0.16);
  edema.addColorStop(0, "rgba(130, 145, 170, 0.7)");
  edema.addColorStop(0.6, "rgba(90, 110, 135, 0.4)");
  edema.addColorStop(1, "rgba(65, 75, 90, 0)");
  ctx.fillStyle = edema;
  ctx.beginPath();
  ctx.ellipse(tumorX, tumorY, w * 0.15, h * 0.14, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Hyperintense Necrotic/Enhancing Ring Tumor
  const tumorGrad = ctx.createRadialGradient(tumorX, tumorY, 6, tumorX, tumorY, w * 0.09);
  tumorGrad.addColorStop(0, "rgba(225, 235, 250, 0.95)");
  tumorGrad.addColorStop(0.5, "rgba(165, 185, 215, 0.9)");
  tumorGrad.addColorStop(0.85, "rgba(240, 248, 255, 1.0)"); // rim enhancement
  tumorGrad.addColorStop(1, "rgba(110, 130, 155, 0.3)");
  ctx.fillStyle = tumorGrad;
  ctx.beginPath();
  ctx.ellipse(tumorX, tumorY, w * 0.08, h * 0.075, -0.3, 0, Math.PI * 2);
  ctx.fill();

  // Lead annotations
  ctx.font = "11px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(140, 180, 220, 0.75)";
  ctx.fillText("AXIAL T2-FLAIR | SLICE 18/32", 18, 28);
  ctx.fillText("BRAIN MRI | TR 9000ms TE 120ms", 18, 44);
}

function drawChestCT(ctx, w, h, opts) {
  ctx.fillStyle = "#05080c";
  ctx.fillRect(0, 0, w, h);

  // Thoracic body ring
  ctx.fillStyle = "rgba(75, 88, 105, 0.75)";
  ctx.beginPath();
  ctx.ellipse(w * 0.5, h * 0.52, w * 0.44, h * 0.38, 0, 0, Math.PI * 2);
  ctx.fill();

  // Subcutaneous fat & muscular wall
  ctx.fillStyle = "rgba(40, 50, 62, 0.9)";
  ctx.beginPath();
  ctx.ellipse(w * 0.5, h * 0.52, w * 0.41, h * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();

  // Spine / Thoracic vertebra (Dorsal)
  ctx.fillStyle = "rgba(235, 245, 255, 0.95)";
  ctx.beginPath();
  ctx.ellipse(w * 0.5, h * 0.76, w * 0.07, h * 0.06, 0, 0, Math.PI * 2);
  ctx.fill();
  // Spinal canal
  ctx.fillStyle = "rgba(20, 25, 35, 0.95)";
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.75, w * 0.025, 0, Math.PI * 2);
  ctx.fill();

  // Ribs cross sections
  ctx.fillStyle = "rgba(220, 235, 250, 0.9)";
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI + 0.1;
    const rx = w * 0.5 + Math.cos(angle) * (w * 0.41);
    const ry = h * 0.52 + Math.sin(angle) * (h * 0.35);
    ctx.fillRect(rx - 5, ry - 5, 10, 10);
    const lx = w * 0.5 - Math.cos(angle) * (w * 0.41);
    ctx.fillRect(lx - 5, ry - 5, 10, 10);
  }

  // Lung Cavities (Very low HU - Black air)
  ctx.fillStyle = "rgba(10, 14, 20, 0.95)";
  // Right lung field (left screen)
  ctx.beginPath();
  ctx.ellipse(w * 0.32, h * 0.48, w * 0.16, h * 0.22, 0.1, 0, Math.PI * 2);
  ctx.fill();
  // Left lung field (right screen)
  ctx.beginPath();
  ctx.ellipse(w * 0.68, h * 0.48, w * 0.16, h * 0.22, -0.1, 0, Math.PI * 2);
  ctx.fill();

  // Mediastinum & Descending Aorta
  ctx.fillStyle = "rgba(120, 135, 155, 0.8)";
  ctx.beginPath();
  ctx.ellipse(w * 0.5, h * 0.44, w * 0.12, h * 0.16, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(175, 195, 220, 0.9)";
  ctx.beginPath();
  ctx.arc(w * 0.46, h * 0.65, w * 0.035, 0, Math.PI * 2);
  ctx.fill();

  // PATHOLOGY: Solitary Pulmonary Nodule (SPN) with micro-spiculation
  const nodX = w * 0.72;
  const nodY = h * 0.44;
  const nodule = ctx.createRadialGradient(nodX, nodY, 2, nodX, nodY, w * 0.04);
  nodule.addColorStop(0, "rgba(240, 245, 255, 0.98)");
  nodule.addColorStop(0.7, "rgba(190, 205, 225, 0.9)");
  nodule.addColorStop(1, "rgba(50, 70, 95, 0.2)");
  ctx.fillStyle = nodule;
  ctx.beginPath();
  ctx.arc(nodX, nodY, w * 0.032, 0, Math.PI * 2);
  ctx.fill();

  // Spiculations
  ctx.strokeStyle = "rgba(210, 225, 245, 0.7)";
  ctx.lineWidth = 1.8;
  for (let s = 0; s < 6; s++) {
    const a = (s / 6) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(nodX + Math.cos(a) * 12, nodY + Math.sin(a) * 12);
    ctx.lineTo(nodX + Math.cos(a) * 22, nodY + Math.sin(a) * 22);
    ctx.stroke();
  }

  // CT HUD
  ctx.font = "11px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(130, 170, 210, 0.75)";
  ctx.fillText("CT THORAX CONTRAST | W: 1500 L: -600 (LUNG)", 18, 28);
  ctx.fillText("VOXEL: 0.72mm x 0.72mm | FOV 360mm", 18, 44);
}

function drawRetinalFundus(ctx, w, h, opts) {
  // Dark surround
  ctx.fillStyle = "#020305";
  ctx.fillRect(0, 0, w, h);

  // Circular Fundus Aperture
  const fundus = ctx.createRadialGradient(w * 0.5, h * 0.5, 10, w * 0.5, h * 0.5, w * 0.46);
  fundus.addColorStop(0, "#c04a28");
  fundus.addColorStop(0.5, "#9c3218");
  fundus.addColorStop(0.85, "#6a1a0c");
  fundus.addColorStop(1, "#260603");

  ctx.fillStyle = fundus;
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.5, w * 0.45, 0, Math.PI * 2);
  ctx.fill();

  // Optic Disc (Nasal side / screen left)
  const discX = w * 0.35;
  const discY = h * 0.50;
  const discGrad = ctx.createRadialGradient(discX, discY, 3, discX, discY, w * 0.07);
  discGrad.addColorStop(0, "#ffebb5");
  discGrad.addColorStop(0.6, "#f8c576");
  discGrad.addColorStop(1, "#c96c34");
  ctx.fillStyle = discGrad;
  ctx.beginPath();
  ctx.arc(discX, discY, w * 0.065, 0, Math.PI * 2);
  ctx.fill();

  // Macula & Fovea Centralis (Temporal side / screen right)
  const macX = w * 0.62;
  const macY = h * 0.52;
  const macGrad = ctx.createRadialGradient(macX, macY, 2, macX, macY, w * 0.06);
  macGrad.addColorStop(0, "#481007");
  macGrad.addColorStop(0.6, "#782212");
  macGrad.addColorStop(1, "rgba(156, 50, 24, 0)");
  ctx.fillStyle = macGrad;
  ctx.beginPath();
  ctx.arc(macX, macY, w * 0.05, 0, Math.PI * 2);
  ctx.fill();

  // Retinal blood vessel arcades branching out of optic disc
  ctx.strokeStyle = "#5a0e06";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";

  // Superior temporal arcade
  ctx.beginPath();
  ctx.moveTo(discX, discY);
  ctx.bezierCurveTo(discX + 20, discY - 110, macX - 10, macY - 120, w * 0.78, h * 0.22);
  ctx.stroke();

  // Inferior temporal arcade
  ctx.beginPath();
  ctx.moveTo(discX, discY);
  ctx.bezierCurveTo(discX + 20, discY + 110, macX - 10, macY + 120, w * 0.78, h * 0.78);
  ctx.stroke();

  // Nasal branches
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(discX, discY);
  ctx.bezierCurveTo(discX - 60, discY - 60, discX - 100, discY - 30, w * 0.12, h * 0.38);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(discX, discY);
  ctx.bezierCurveTo(discX - 60, discY + 60, discX - 100, discY + 30, w * 0.12, h * 0.62);
  ctx.stroke();

  // PATHOLOGY: Hard Exudates (Yellow lipid deposits) & Dot Hemorrhages (Diabetic Retinopathy)
  ctx.fillStyle = "#fff8b3"; // Exudate cluster
  for (let e = 0; e < 18; e++) {
    const ex = macX - 45 + (e % 5) * 16 + (Math.sin(e) * 12);
    const ey = macY - 40 + Math.floor(e / 5) * 18 + (Math.cos(e) * 10);
    ctx.beginPath();
    ctx.arc(ex, ey, 2.5 + (e % 3), 0, Math.PI * 2);
    ctx.fill();
  }

  // Microaneurysms (Red dots)
  ctx.fillStyle = "#7a0505";
  for (let m = 0; m < 14; m++) {
    const mx = discX + 50 + (m * 19) % 180;
    const my = discY - 70 + (m * 23) % 140;
    ctx.beginPath();
    ctx.arc(mx, my, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Fundus HUD
  ctx.font = "11px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(255, 200, 170, 0.7)";
  ctx.fillText("COLOR FUNDUS PHOTOGRAPHY | 50-DEGREE FOV", 18, 28);
  ctx.fillText("OD (RIGHT EYE) | POSTERIOR POLE", 18, 44);
}

function drawDermoscopy(ctx, w, h, opts) {
  // Surrounding dark vignette
  ctx.fillStyle = "#0c0d11";
  ctx.fillRect(0, 0, w, h);

  // Normal surrounding pale skin base
  const skin = ctx.createRadialGradient(w * 0.5, h * 0.5, 40, w * 0.5, h * 0.5, w * 0.46);
  skin.addColorStop(0, "#d8af97");
  skin.addColorStop(0.7, "#c99c82");
  skin.addColorStop(1, "#7d5440");
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.5, w * 0.44, 0, Math.PI * 2);
  ctx.fill();

  // Subtle skin pores & dermatoglyphics
  ctx.strokeStyle = "rgba(100, 60, 40, 0.15)";
  ctx.lineWidth = 1;
  for (let l = 0; l < 40; l++) {
    ctx.beginPath();
    ctx.moveTo(w * 0.1, h * 0.1 + l * 12);
    ctx.lineTo(w * 0.9, h * 0.12 + l * 12);
    ctx.stroke();
  }

  // PATHOLOGY: Malignant Melanoma Lesion
  // Asymmetrical, Irregular border, Multi-colored
  const lesionX = w * 0.51;
  const lesionY = h * 0.49;

  // Outer irregular pigment border (Tan/Light Brown)
  ctx.fillStyle = "#5c331e";
  ctx.beginPath();
  ctx.moveTo(lesionX - 100, lesionY - 30);
  ctx.bezierCurveTo(lesionX - 110, lesionY - 90, lesionX - 30, lesionY - 120, lesionX + 40, lesionY - 95);
  ctx.bezierCurveTo(lesionX + 115, lesionY - 70, lesionX + 125, lesionY + 20, lesionX + 80, lesionY + 85);
  ctx.bezierCurveTo(lesionX + 40, lesionY + 125, lesionX - 50, lesionY + 110, lesionX - 85, lesionY + 60);
  ctx.closePath();
  ctx.fill();

  // Dark brown to jet black atypical central blotches
  ctx.fillStyle = "#1e110b";
  ctx.beginPath();
  ctx.moveTo(lesionX - 60, lesionY - 20);
  ctx.bezierCurveTo(lesionX - 70, lesionY - 60, lesionX - 10, lesionY - 75, lesionX + 35, lesionY - 50);
  ctx.bezierCurveTo(lesionX + 80, lesionY - 30, lesionX + 65, lesionY + 35, lesionX + 25, lesionY + 55);
  ctx.bezierCurveTo(lesionX - 25, lesionY + 70, lesionX - 65, lesionY + 40, lesionX - 60, lesionY - 20);
  ctx.closePath();
  ctx.fill();

  // Blue-white veil characteristic
  const veil = ctx.createRadialGradient(lesionX - 15, lesionY - 10, 4, lesionX - 15, lesionY - 10, 42);
  veil.addColorStop(0, "rgba(180, 205, 230, 0.65)");
  veil.addColorStop(0.7, "rgba(120, 155, 190, 0.35)");
  veil.addColorStop(1, "rgba(80, 110, 140, 0)");
  ctx.fillStyle = veil;
  ctx.beginPath();
  ctx.ellipse(lesionX - 15, lesionY - 10, 42, 32, -0.3, 0, Math.PI * 2);
  ctx.fill();

  // Peripheral pigment globules / dots
  ctx.fillStyle = "#221109";
  for (let g = 0; g < 16; g++) {
    const angle = (g / 16) * Math.PI * 2;
    const gx = lesionX + Math.cos(angle) * (95 + Math.sin(g * 3) * 15);
    const gy = lesionY + Math.sin(angle) * (85 + Math.cos(g * 2) * 12);
    ctx.beginPath();
    ctx.arc(gx, gy, 3.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Dermoscopy reticle / millimeter scale
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w * 0.1, h * 0.9);
  ctx.lineTo(w * 0.3, h * 0.9);
  ctx.stroke();
  for (let k = 0; k <= 10; k++) {
    const kx = w * 0.1 + (k / 10) * (w * 0.2);
    ctx.beginPath();
    ctx.moveTo(kx, h * 0.9 - (k % 5 === 0 ? 8 : 4));
    ctx.lineTo(kx, h * 0.9);
    ctx.stroke();
  }

  // HUD
  ctx.font = "11px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(255, 230, 215, 0.75)";
  ctx.fillText("POLARIZED DERMOSCOPY | 10X MAGNIFICATION", 18, 28);
  ctx.fillText("CALIBRATED SCALE: 1.0 CM (10 DIV)", 18, 44);
}
