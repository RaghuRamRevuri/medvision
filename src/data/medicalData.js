// MedVision AI: Comprehensive Medical Knowledge Base & Multimodal Specifications

export const PROJECT_METADATA = {
  title: "MedVision AI: Integrated Deep Learning Framework for Multimodal Medical Image Analysis",
  shortTitle: "MedVision AI",
  platform: "Clinical Decision Support System",
  version: "2.4.0-Production",
  releaseYear: "2026"
};

export const SUPPORTED_MODALITIES = [
  {
    id: "chest_xray",
    name: "Chest X-Ray (CXR)",
    badge: "Radiography",
    icon: "Activity",
    description: "Posteroanterior (PA) / Anteroposterior (AP) chest radiographs for pulmonary and cardiac triage.",
    primaryDatasets: "NIH ChestX-ray14, CheXpert, RSNA Pneumonia",
    commonConditions: ["Bacterial/Viral Pneumonia", "Cardiomegaly", "Pleural Effusion", "COVID-19 Infiltrates", "Normal / Clear"],
    hotspotRegions: "Lower right lobe parenchymal consolidation, cardiothoracic ratio > 0.50, costophrenic angle blunting.",
    gradCamLayer: "Conv_1 (EfficientNet) / conv5_block3_out (ResNet50)",
    color: "#0ea5e9"
  },
  {
    id: "mri_brain",
    name: "Brain MRI",
    badge: "Neuroimaging",
    icon: "Brain",
    description: "Multi-sequence T1-weighted, T2-weighted, and FLAIR neuroimaging slices for cranial assessment.",
    primaryDatasets: "BraTS 2023, Figshare Brain Tumor Dataset",
    commonConditions: ["High-Grade Glioma", "Meningioma", "Pituitary Adenoma", "Healthy Brain Tissue"],
    hotspotRegions: "Frontal/temporal peritumoral hyperintensity, mass effect on lateral ventricles, dural tail enhancement.",
    gradCamLayer: "top_conv (DenseNet) / Conv_1 (EfficientNet)",
    color: "#8b5cf6"
  },
  {
    id: "ct_scan",
    name: "Chest / Abdomen CT",
    badge: "Tomography",
    icon: "Scan",
    description: "High-resolution computed tomography slices calibrated with Hounsfield Units (HU) for soft-tissue contrast.",
    primaryDatasets: "LIDC-IDRI, RSNA Intracranial Hemorrhage",
    commonConditions: ["Solitary Pulmonary Nodule (SPN)", "Subdural/Epidural Hemorrhage", "Emphysema", "Normal CT"],
    hotspotRegions: "Spiculated nodule margin, ground-glass opacity, hyperdense crescentic extra-axial collection.",
    gradCamLayer: "conv5_block16_2_conv (DenseNet121)",
    color: "#06b6d4"
  },
  {
    id: "fundus",
    name: "Retinal Fundus Photography",
    badge: "Ophthalmology",
    icon: "Eye",
    description: "High-magnification retinal posterior pole view imaging macula, optic disc, and microvasculature.",
    primaryDatasets: "ODIR-5K, Messidor-2, EyePACS Diabetic Retinopathy",
    commonConditions: ["Proliferative Diabetic Retinopathy", "Open-Angle Glaucoma", "Dense Cataract", "Normal Retina"],
    hotspotRegions: "Cotton-wool spots, flame-shaped micro-hemorrhages, increased cup-to-disc ratio (CDR > 0.7).",
    gradCamLayer: "Conv_1 (EfficientNet-B0)",
    color: "#f59e0b"
  },
  {
    id: "dermoscopy",
    name: "Dermoscopy Skin Lesion",
    badge: "Dermatology",
    icon: "Microscope",
    description: "Epiluminescence skin surface microscopy for pigmented cutaneous lesions (ABCD Rule compliant).",
    primaryDatasets: "ISIC 2024 Challenge, HAM10000 Skin Lesion Archive",
    commonConditions: ["Malignant Melanoma", "Basal Cell Carcinoma (BCC)", "Melanocytic Nevus", "Benign Keratosis"],
    hotspotRegions: "Atypical pigment network, asymmetry along orthogonal axes, blue-white veil, irregular globules.",
    gradCamLayer: "Conv_1 (EfficientNet-B0)",
    color: "#ec4899"
  }
];

export const MODEL_BENCHMARKS = [
  {
    id: "efficientnet_b0",
    name: "EfficientNet-B0",
    tag: "Champion Architecture",
    isChampion: true,
    accuracy: 96.5,
    precision: 95.8,
    recall: 95.2,
    f1Score: 95.5,
    aucRoc: 0.982,
    params: "5.3 Million",
    latency: "34 ms",
    flops: "0.39 GFLOPs",
    architectureType: "Compound Scaling CNN (Depth, Width, Resolution)",
    pretrainedBase: "ImageNet-1K Pretrained Weights",
    strengths: "Highest AUC-ROC & Accuracy, optimal parameter efficiency for point-of-care deployment.",
    color: "#10b981"
  },
  {
    id: "densenet121",
    name: "DenseNet121",
    tag: "Feature Reuse Specialist",
    isChampion: false,
    accuracy: 95.1,
    precision: 94.6,
    recall: 94.8,
    f1Score: 94.7,
    aucRoc: 0.976,
    params: "7.0 Million",
    latency: "48 ms",
    flops: "2.88 GFLOPs",
    architectureType: "Densely Connected Convolutional Network",
    pretrainedBase: "ImageNet-1K Pretrained Weights",
    strengths: "Mitigates vanishing gradients via direct feature concatenation; robust boundary localization.",
    color: "#3b82f6"
  },
  {
    id: "resnet50",
    name: "ResNet50",
    tag: "Deep Residual Baseline",
    isChampion: false,
    accuracy: 94.2,
    precision: 93.5,
    recall: 93.8,
    f1Score: 93.65,
    aucRoc: 0.969,
    params: "25.6 Million",
    latency: "42 ms",
    flops: "4.12 GFLOPs",
    architectureType: "Residual Network with Identity Skip Connections",
    pretrainedBase: "ImageNet-1K Pretrained Weights",
    strengths: "Standard clinical research benchmark; solid convergence stability across diverse pathology.",
    color: "#8b5cf6"
  },
  {
    id: "mobilenet_v2",
    name: "MobileNetV2 (Baseline)",
    tag: "Edge Lightweight",
    isChampion: false,
    accuracy: 93.0,
    precision: 92.2,
    recall: 91.8,
    f1Score: 92.0,
    aucRoc: 0.948,
    params: "3.5 Million",
    latency: "28 ms",
    flops: "0.30 GFLOPs",
    architectureType: "Inverted Residuals & Linear Bottlenecks",
    pretrainedBase: "ImageNet-1K",
    strengths: "Ultra-fast execution on edge devices with slight compromise in edge feature resolution.",
    color: "#64748b"
  },
  {
    id: "vgg16",
    name: "VGG16 (Baseline)",
    tag: "Classical CNN",
    isChampion: false,
    accuracy: 91.2,
    precision: 90.1,
    recall: 90.5,
    f1Score: 90.3,
    aucRoc: 0.932,
    params: "138.4 Million",
    latency: "76 ms",
    flops: "15.3 GFLOPs",
    architectureType: "Sequential 3x3 Conv Stacks",
    pretrainedBase: "ImageNet-1K",
    strengths: "Straightforward linear gradient propagation; high computational and memory footprint.",
    color: "#94a3b8"
  }
];

export const PRELOADED_SAMPLES = [
  {
    id: "sample-cxr-pneumonia",
    title: "Chest X-Ray: Right Lower Lobe Pneumonia",
    modality: "chest_xray",
    patientName: "Robert Vance",
    patientAge: 58,
    patientGender: "Male",
    patientId: "PT-CXR-84920",
    symptoms: "Productive cough with purulent sputum, fever (39.1°C), pleuritic right-sided chest pain for 4 days.",
    vitals: { hr: "96 bpm", bp: "128/82 mmHg", spo2: "92% (Room Air)", temp: "102.4°F", rr: "22 /min" },
    prediction: {
      primaryCondition: "Right Lower Lobe Bacterial Pneumonia",
      confidence: 96.8,
      riskLevel: "High",
      icd10: "J18.9",
      findings: "Dense airspace consolidation with air bronchograms in the right lower lung zone. Right cardiophrenic angle intact; no evidence of large pneumothorax or mediastinal shift.",
      probabilities: [
        { label: "Bacterial Pneumonia", score: 96.8 },
        { label: "Pleural Effusion", score: 2.1 },
        { label: "Normal CXR", score: 0.7 },
        { label: "Cardiomegaly", score: 0.4 }
      ],
      hotspot: { x: 0.65, y: 0.68, radius: 0.18 }, // normalized coordinates
      clinicalAction: "Immediate initiation of empiric antibiotic therapy (e.g., Ceftriaxone + Azithromycin). Oxygen supplementation to maintain SpO2 >= 95%. Sputum culture and repeat PA radiograph in 48-72h."
    }
  },
  {
    id: "sample-mri-glioma",
    title: "Brain MRI: Right Frontal High-Grade Glioma",
    modality: "mri_brain",
    patientName: "Eleanor Sterling",
    patientAge: 47,
    patientGender: "Female",
    patientId: "PT-MRI-39102",
    symptoms: "Progressive morning cephalea over 3 weeks, mild left-sided motor weakness, subtle speech hesitancy.",
    vitals: { hr: "74 bpm", bp: "135/88 mmHg", spo2: "98%", temp: "98.6°F", rr: "16 /min" },
    prediction: {
      primaryCondition: "High-Grade Glioma (WHO Grade III/IV Suspected)",
      confidence: 95.4,
      riskLevel: "Critical",
      icd10: "C71.1",
      findings: "Heterogeneously enhancing intra-axial mass lesion measuring ~3.8 x 3.2 cm centered in right frontal white matter with marked vasogenic edema and subtle mass effect compressing right anterior horn.",
      probabilities: [
        { label: "High-Grade Glioma", score: 95.4 },
        { label: "Meningioma", score: 3.2 },
        { label: "Metastatic Lesion", score: 1.1 },
        { label: "Healthy Brain", score: 0.3 }
      ],
      hotspot: { x: 0.58, y: 0.38, radius: 0.16 },
      clinicalAction: "Urgent Neurosurgical consultation for stereotactic biopsy/craniotomy resection. Initiate Dexamethasone for peritumoral edema control; schedule contrast perfusion MRI & spectroscopy."
    }
  },
  {
    id: "sample-ct-nodule",
    title: "Chest CT: Solitary Pulmonary Nodule (SPN)",
    modality: "ct_scan",
    patientName: "Harold Miller",
    patientAge: 64,
    patientGender: "Male",
    patientId: "PT-CT-10948",
    symptoms: "Routine surveillance screening in 35-pack-year smoker; asymptomatic, no hemoptysis.",
    vitals: { hr: "68 bpm", bp: "122/78 mmHg", spo2: "97%", temp: "98.2°F", rr: "14 /min" },
    prediction: {
      primaryCondition: "Solitary Pulmonary Nodule (Lung-RADS Category 4B)",
      confidence: 94.7,
      riskLevel: "Moderate-High",
      icd10: "R91.1",
      findings: "14 mm solid pulmonary nodule situated in the peripheral posterior segment of the upper lobe with subtle micro-spiculation and coronal pleural tugging. No hilar lymphadenopathy.",
      probabilities: [
        { label: "Solitary Pulmonary Nodule", score: 94.7 },
        { label: "Benign Granuloma", score: 4.1 },
        { label: "Hamartoma", score: 0.9 },
        { label: "Normal Lung CT", score: 0.3 }
      ],
      hotspot: { x: 0.72, y: 0.42, radius: 0.12 },
      clinicalAction: "FDG-PET/CT metabolic staging recommended. Multidisciplinary Thoracic Oncology Tumor Board review. Consider CT-guided percutaneous transthoracic needle biopsy."
    }
  },
  {
    id: "sample-fundus-dr",
    title: "Retinal Fundus: Proliferative Diabetic Retinopathy",
    modality: "fundus",
    patientName: "Sunita Patel",
    patientAge: 53,
    patientGender: "Female",
    patientId: "PT-OPH-77215",
    symptoms: "Type 2 Diabetes Mellitus x 14 years (HbA1c 9.2%). Visual blurriness and occasional dark floating specks in right eye.",
    vitals: { hr: "80 bpm", bp: "142/90 mmHg", spo2: "99%", temp: "98.4°F", rr: "16 /min" },
    prediction: {
      primaryCondition: "Proliferative Diabetic Retinopathy (PDR) with Macular Edema",
      confidence: 97.1,
      riskLevel: "High",
      icd10: "E11.359",
      findings: "Extensive retinal microaneurysms, blot hemorrhages, hard exudate rings tracking towards macula, and neovascularization of the disc (NVD > 1/3 disc area).",
      probabilities: [
        { label: "Proliferative Retinopathy", score: 97.1 },
        { label: "Moderate NPDR", score: 2.2 },
        { label: "Open-Angle Glaucoma", score: 0.5 },
        { label: "Normal Fundus", score: 0.2 }
      ],
      hotspot: { x: 0.44, y: 0.52, radius: 0.20 },
      clinicalAction: "Prompt Vitreoretinal specialist referral. Optical Coherence Tomography (OCT) macula scan. Initiate anti-VEGF intravitreal injection protocol and consider panretinal photocoagulation (PRP)."
    }
  },
  {
    id: "sample-derm-melanoma",
    title: "Dermoscopy: Malignant Melanoma (Superficial Spreading)",
    modality: "dermoscopy",
    patientName: "David Larson",
    patientAge: 41,
    patientGender: "Male",
    patientId: "PT-DERM-55319",
    symptoms: "Irregularly pigmented back lesion observed to enlarge and darken over 6 months; occasional itching.",
    vitals: { hr: "72 bpm", bp: "118/76 mmHg", spo2: "99%", temp: "98.6°F", rr: "15 /min" },
    prediction: {
      primaryCondition: "Superficial Spreading Malignant Melanoma",
      confidence: 96.2,
      riskLevel: "Critical",
      icd10: "C43.9",
      findings: "High dermatoscopic total dermoscopy score (TDS 7.4). Striking asymmetry in two orthogonal axes, irregular polycyclic border, multi-color distribution (black, tan, slate-grey), and peripheral atypical network.",
      probabilities: [
        { label: "Malignant Melanoma", score: 96.2 },
        { label: "Dysplastic Nevus", score: 2.8 },
        { label: "Seborrheic Keratosis", score: 0.7 },
        { label: "Basal Cell Carcinoma", score: 0.3 }
      ],
      hotspot: { x: 0.52, y: 0.50, radius: 0.22 },
      clinicalAction: "Urgent complete excisional biopsy with 2mm surgical margins for histopathologic Breslow depth & Clark level evaluation. BRAF V600 mutation testing upon confirmation."
    }
  }
];

export const SAMPLE_DOCUMENTS = [
  {
    id: "doc-sample-1",
    title: "Inpatient Clinical Admission & Radiology Requisition",
    fileType: "Clinical Requisition PDF",
    patientName: "Robert Vance",
    patientAge: "58 / Male",
    department: "Pulmonary Medicine & Critical Care",
    date: "2026-10-04",
    content: `PATIENT CLINICAL ADMISSION NOTE & RADIOLOGY REQUEST
Patient Name: Vance, Robert | Age: 58 | Sex: M | MRN: #CXR-84920
Admitted To: Ward 4B, Respiratory Care Unit
Attending Physician: Staff Pulmonologist, MD

CHIEF COMPLAINTS:
- High-grade fever peaking at 39.1°C with severe chills x 4 days.
- Persistent cough with rusty/purulent sputum production.
- Right lower thoracic pleuritic pain aggravated on deep inspiration.

EXAMINATION & CLINICAL VITALS:
- Pulse: 96 bpm | BP: 128/82 mmHg | RR: 22 breaths/min
- SpO2: 92% on room air (improved to 96% on 2L nasal cannula O2)
- Chest Auscultation: Coarse crackles and bronchial breath sounds localized over right infrascapular base. Tactile vocal fremitus increased.

LABORATORY INVESTIGATIONS:
- Complete Blood Count: Total Leukocyte Count (TLC): 16,800 /uL (Neutrophils 84%) - Marked Leukocytosis.
- Inflammatory Biomarkers: Serum C-Reactive Protein (CRP): 142 mg/L (Normal < 5 mg/L), Serum Procalcitonin: 2.4 ng/mL.
- Arterial Blood Gas (ABG): pH 7.43, pO2 64 mmHg, pCO2 36 mmHg.

REQUESTED IMAGING & PROVISIONAL DIAGNOSIS:
- Modality Requested: Digital Chest X-Ray PA View + MedVision AI Computer Aided Diagnosis.
- Provisional Diagnosis: Community-Acquired Bacterial Pneumonia (Right Lower Lobe). Rule out parapneumonic effusion.`
  },
  {
    id: "doc-sample-2",
    title: "Neurology Specialist Consultation & Brain MRI Summary",
    fileType: "Neurological Assessment",
    patientName: "Eleanor Sterling",
    patientAge: "47 / Female",
    department: "Department of Neurosurgery",
    date: "2026-10-02",
    content: `COMPREHENSIVE NEUROLOGICAL CONSULTATION SUMMARY
Patient Name: Sterling, Eleanor | Age: 47 | Sex: F | MRN: #MRI-39102
Consultant: Department Attending Neurosurgeon, MD

CLINICAL PRESENTATION:
Patient presents with insidious onset of progressive headaches awakening her from sleep, worse with Valsalva maneuver, accompanied by nausea. Family reports episodic word-finding difficulty and transient left pronator drift.

NEUROLOGICAL EXAMINATION:
- Mental Status: Alert, mild expressive dysphasia.
- Cranial Nerves: Mild papilledema visible bilaterally on fundoscopy.
- Motor System: Left upper extremity strength 4+/5, lower extremity 5/5. Babinski negative bilaterally.
- Sensory: Intact to light touch and pinprick.

DIAGNOSTIC WORKUP & MULTIMODAL IMAGING CORRELATION:
- High field 3.0T Brain MRI with Gadolinium contrast.
- MedVision AI Integrated Deep Learning: DenseNet121 + Grad-CAM heatmaps highlight focal hyperintense core in right frontal lobe with surrounding vasogenic edema.
- Primary Concern: High-Grade Astrocytoma / Glioblastoma vs solitary metastasis.
- Treatment Protocol: IV Dexamethasone 8mg loading, followed by 4mg Q6H. Antiepileptic prophylaxis with Levetiracetam 500mg BID. Urgent navigation-guided craniotomy.`
  }
];
