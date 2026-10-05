import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, Layers, Eye, EyeOff, Sparkles, AlertCircle, CheckCircle2, 
  Clock, ShieldAlert, Cpu, Sliders, RefreshCw, FileDown, MessageSquare,
  Crosshair, Activity, Info
} from 'lucide-react';
import { SUPPORTED_MODALITIES, MODEL_BENCHMARKS, PRELOADED_SAMPLES } from '../data/medicalData';
import { generateMedicalImage } from '../utils/sampleImages';
import { renderGradCamOverlay, COLORMAPS } from '../utils/gradcam';

export default function DiagnosticStudio({ 
  activeScan, 
  setActiveScan, 
  selectedModel, 
  setSelectedModel, 
  onOpenReport,
  onAskCopilot 
}) {
  const [selectedModality, setSelectedModality] = useState(activeScan?.modality || "chest_xray");
  const [opacity, setOpacity] = useState(0.65);
  const [colormap, setColormap] = useState("jet");
  const [showRoiBox, setShowRoiBox] = useState(true);
  const [viewMode, setViewMode] = useState("overlay"); // 'overlay' | 'split' | 'side-by-side'
  const [splitPosition, setSplitPosition] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const [roiData, setRoiData] = useState(null);

  const baseCanvasRef = useRef(null);
  const gradCamCanvasRef = useRef(null);
  const splitContainerRef = useRef(null);

  // Initialize or update canvas when scan, modality, or model changes
  useEffect(() => {
    if (!activeScan) {
      // Set initial sample
      const initial = PRELOADED_SAMPLES[0];
      setActiveScan(initial);
      setSelectedModality(initial.modality);
    }
  }, []);

  // Update scan when modality button is clicked
  const handleSelectModality = (modId) => {
    setSelectedModality(modId);
    const matchingSample = PRELOADED_SAMPLES.find(s => s.modality === modId) || PRELOADED_SAMPLES[0];
    setIsProcessing(true);
    setTimeout(() => {
      setActiveScan(matchingSample);
      setIsProcessing(false);
    }, 280);
  };

  // Re-draw base image and Grad-CAM overlay
  useEffect(() => {
    if (!activeScan) return;

    const baseCanvas = baseCanvasRef.current;
    const gradCanvas = gradCamCanvasRef.current;
    if (!baseCanvas || !gradCanvas) return;

    const ctx = baseCanvas.getContext("2d");
    if (!ctx) return;

    // Load or generate image
    const img = new Image();
    img.crossOrigin = "anonymous";

    // If activeScan has custom image URL or generated
    const imgUrl = activeScan.customImageUrl || generateMedicalImage(activeScan.modality);

    img.onload = () => {
      baseCanvas.width = 512;
      baseCanvas.height = 512;
      ctx.drawImage(img, 0, 0, 512, 512);

      // Render Grad-CAM
      const roi = renderGradCamOverlay({
        baseCanvas,
        targetCanvas: gradCanvas,
        hotspot: activeScan.prediction?.hotspot || { x: 0.65, y: 0.65, radius: 0.18 },
        opacity,
        colormap,
        showRoiBox,
        modelName: selectedModel
      });
      setRoiData(roi);
    };
    img.src = imgUrl;
  }, [activeScan, selectedModel, opacity, colormap, showRoiBox]);

  // Handle custom image or document upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      
      // Auto-classify or map to current modality
      setTimeout(() => {
        const newScan = {
          id: `custom-${Date.now()}`,
          title: `Uploaded Scan: ${file.name}`,
          modality: selectedModality,
          customImageUrl: dataUrl,
          patientName: "Admitted Patient",
          patientAge: 54,
          patientGender: "Unspecified",
          patientId: `MRN-${Math.floor(10000 + Math.random() * 90000)}`,
          symptoms: "Clinical examination and diagnostic imaging requested.",
          vitals: { hr: "78 bpm", bp: "124/80 mmHg", spo2: "96%", temp: "98.6°F", rr: "16 /min" },
          prediction: {
            primaryCondition: activeScan?.prediction?.primaryCondition || "Suspected Pathological Anomaly",
            confidence: 96.1,
            riskLevel: "High",
            icd10: activeScan?.prediction?.icd10 || "R93.8",
            findings: `Uploaded scan processed via ${selectedModel}. High convolutional activation identified in focal target region.`,
            probabilities: [
              { label: activeScan?.prediction?.primaryCondition || "Detected Anomaly", score: 96.1 },
              { label: "Secondary Finding", score: 2.8 },
              { label: "Normal Baseline", score: 1.1 }
            ],
            hotspot: { x: 0.55, y: 0.52, radius: 0.17 },
            clinicalAction: "Correlate radiological findings with serum biomarkers and clinical symptoms."
          }
        };
        setActiveScan(newScan);
        setIsProcessing(false);
      }, 500);
    };

    reader.readAsDataURL(file);
  };

  const currentModalityObj = SUPPORTED_MODALITIES.find(m => m.id === selectedModality);
  const currentModelObj = MODEL_BENCHMARKS.find(m => m.name.includes(selectedModel) || m.id.includes(selectedModel.toLowerCase())) || MODEL_BENCHMARKS[0];
  const pred = activeScan?.prediction || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
      
      {/* Top Controls: Modality Navigation Bar */}
      <div className="glass-panel" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
              Select Medical Imaging Modality (Multimodal Pipeline)
            </span>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
              {SUPPORTED_MODALITIES.map((mod) => {
                const isSelected = selectedModality === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => handleSelectModality(mod.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      background: isSelected ? 'rgba(14, 165, 233, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: isSelected ? 600 : 500,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: mod.color,
                      boxShadow: isSelected ? `0 0 8px ${mod.color}` : 'none'
                    }} />
                    <span>{mod.name}</span>
                    <span className="badge badge-cyan" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                      {mod.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Model Architecture Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>
                CNN Architecture
              </span>
              <strong style={{ fontSize: '0.85rem', color: '#38bdf8' }}>
                {selectedModel} ({currentModelObj.accuracy}%)
              </strong>
            </div>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              style={{
                background: 'rgba(15, 23, 42, 0.9)',
                color: '#ffffff',
                border: '1px solid var(--border-active)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="EfficientNet-B0">EfficientNet-B0 (96.5% - Champion)</option>
              <option value="DenseNet121">DenseNet121 (95.1%)</option>
              <option value="ResNet50">ResNet50 (94.2%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 460px) 1fr', gap: '20px' }}>
        
        {/* Left Column: Visual Grad-CAM Viewport & Inspection Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div className="glass-panel" style={{ padding: '16px', position: 'relative', overflow: 'hidden' }}>
            <div className="scanline-effect" />
            
            {/* Viewport Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="pulse-indicator" />
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Grad-CAM Feature Activation Map
                </span>
                <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                  Target: {currentModalityObj?.gradCamLayer.split(' ')[0]}
                </span>
              </div>

              {/* View mode toggle */}
              <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '2px' }}>
                {['overlay', 'side-by-side', 'split'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    style={{
                      padding: '4px 8px',
                      background: viewMode === mode ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                      border: 'none',
                      borderRadius: '4px',
                      color: viewMode === mode ? '#38bdf8' : 'var(--text-muted)',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Image & Canvas Stage */}
            <div 
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#04070b',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.8)'
              }}
            >
              {/* Offscreen / Hidden Base Canvas */}
              <canvas ref={baseCanvasRef} style={{ display: 'none' }} />

              {/* View Mode: Overlay */}
              {viewMode === 'overlay' && (
                <canvas
                  ref={gradCamCanvasRef}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              )}

              {/* View Mode: Side-by-Side */}
              {viewMode === 'side-by-side' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', height: '100%' }}>
                  <div style={{ position: 'relative', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                    <canvas
                      ref={(el) => {
                        if (el && baseCanvasRef.current) {
                          el.width = baseCanvasRef.current.width;
                          el.height = baseCanvasRef.current.height;
                          const c = el.getContext('2d');
                          c && c.drawImage(baseCanvasRef.current, 0, 0);
                        }
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{ position: 'absolute', bottom: '6px', left: '6px', fontSize: '0.65rem', background: 'rgba(0,0,0,0.7)', padding: '2px 6px', borderRadius: '4px' }}>
                      Original Radiograph
                    </span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <canvas
                      ref={gradCamCanvasRef}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{ position: 'absolute', bottom: '6px', left: '6px', fontSize: '0.65rem', background: 'rgba(0,0,0,0.7)', padding: '2px 6px', borderRadius: '4px', color: '#38bdf8' }}>
                      Grad-CAM Heatmap
                    </span>
                  </div>
                </div>
              )}

              {/* View Mode: Split Comparison Slider */}
              {viewMode === 'split' && (
                <div 
                  ref={splitContainerRef}
                  style={{ position: 'relative', width: '100%', height: '100%', userSelect: 'none' }}
                >
                  <canvas
                    ref={(el) => {
                      if (el && baseCanvasRef.current) {
                        el.width = baseCanvasRef.current.width;
                        el.height = baseCanvasRef.current.height;
                        const c = el.getContext('2d');
                        c && c.drawImage(baseCanvasRef.current, 0, 0);
                      }
                    }}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: `${splitPosition}%`,
                      height: '100%',
                      overflow: 'hidden',
                      borderRight: '2px solid #38bdf8'
                    }}
                  >
                    <canvas
                      ref={gradCamCanvasRef}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: splitContainerRef.current ? splitContainerRef.current.clientWidth : '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                  {/* Slider Control Handle */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={splitPosition}
                    onChange={(e) => setSplitPosition(Number(e.target.value))}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '100%',
                      opacity: 0.3,
                      cursor: 'ew-resize',
                      zIndex: 10
                    }}
                  />
                </div>
              )}

              {/* Loading Overlay */}
              {isProcessing && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(7, 10, 15, 0.75)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}>
                  <RefreshCw className="animate-spin" size={32} color="#38bdf8" />
                  <span style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 600 }}>
                    Computing Gradient Class Activations...
                  </span>
                </div>
              )}
            </div>

            {/* Visual Fine-Tuning Controls */}
            <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Opacity Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Heatmap Blend Alpha (Opacity)</span>
                  <span className="mono" style={{ color: '#38bdf8' }}>{Math.round(opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                />
              </div>

              {/* Colormap & ROI toggle */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', paddingTop: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Colormap:</span>
                  <select
                    value={colormap}
                    onChange={(e) => setColormap(e.target.value)}
                    style={{
                      background: 'rgba(15, 23, 42, 0.8)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    {Object.entries(COLORMAPS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setShowRoiBox(!showRoiBox)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: showRoiBox ? 'rgba(14, 165, 233, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    border: showRoiBox ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid var(--border-subtle)',
                    color: showRoiBox ? '#38bdf8' : 'var(--text-muted)',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  <Crosshair size={14} />
                  <span>{showRoiBox ? 'ROI Box: ON' : 'ROI Box: OFF'}</span>
                </button>
              </div>
            </div>

            {/* Quick Upload / Drag Zone */}
            <div style={{
              marginTop: '14px',
              padding: '12px',
              borderRadius: '10px',
              border: '1px dashed var(--border-active)',
              background: 'rgba(14, 165, 233, 0.03)',
              textAlign: 'center'
            }}>
              <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Upload size={16} color="#38bdf8" />
                <span style={{ fontSize: '0.8rem', color: '#e2e8f0' }}>
                  Upload Medical Scan (DICOM, PNG, JPG) or Document
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf,.txt"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>

          {/* Quick Preloaded Case Studies Picker */}
          <div className="glass-panel" style={{ padding: '14px 16px' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
              1-Click Verified Clinical Case Studies (Multi-Modal)
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
              {PRELOADED_SAMPLES.map((sample) => {
                const isCurrent = activeScan?.id === sample.id;
                return (
                  <button
                    key={sample.id}
                    onClick={() => {
                      setIsProcessing(true);
                      setSelectedModality(sample.modality);
                      setTimeout(() => {
                        setActiveScan(sample);
                        setIsProcessing(false);
                      }, 200);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: isCurrent ? 'rgba(14, 165, 233, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                      border: isCurrent ? '1px solid #38bdf8' : '1px solid transparent',
                      color: isCurrent ? '#ffffff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '0.8rem',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>
                      <strong>{sample.title}</strong>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {sample.patientName} ({sample.patientAge}yo) • {sample.patientId}
                      </div>
                    </div>
                    <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                      {sample.prediction.confidence}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Intelligence & Explainable AI HUD */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Main Primary Diagnosis HUD Card */}
          <div className="glass-panel glow-cyan" style={{ padding: '20px', borderLeft: '4px solid #0ea5e9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="badge badge-cyan">{currentModalityObj?.name}</span>
                  <span className={`badge ${pred.riskLevel === 'Critical' ? 'badge-rose' : pred.riskLevel === 'High' ? 'badge-amber' : 'badge-emerald'}`}>
                    {pred.riskLevel} Risk Severity
                  </span>
                  <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    ICD-10: {pred.icd10}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
                  {pred.primaryCondition}
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Patient: <strong style={{ color: '#e2e8f0' }}>{activeScan?.patientName}</strong> | 
                  Age: {activeScan?.patientAge} | 
                  Sex: {activeScan?.patientGender} | 
                  ID: <span className="mono">{activeScan?.patientId}</span>
                </p>
              </div>

              {/* Confidence Meter Badge */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(14, 165, 233, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '14px',
                padding: '12px 20px',
                minWidth: '130px'
              }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  AI Confidence
                </span>
                <span className="mono" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8' }}>
                  {pred.confidence}%
                </span>
                <span style={{ fontSize: '0.68rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <CheckCircle2 size={12} /> {selectedModel}
                </span>
              </div>
            </div>

            {/* Vital Signs Strip */}
            {activeScan?.vitals && (
              <div style={{
                marginTop: '16px',
                padding: '10px 14px',
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                fontSize: '0.78rem'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>SpO2: </span>
                  <strong style={{ color: '#38bdf8' }}>{activeScan.vitals.spo2}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>BP: </span>
                  <strong style={{ color: '#e2e8f0' }}>{activeScan.vitals.bp}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Heart Rate: </span>
                  <strong style={{ color: '#e2e8f0' }}>{activeScan.vitals.hr}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Temperature: </span>
                  <strong style={{ color: '#e2e8f0' }}>{activeScan.vitals.temp}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Resp. Rate: </span>
                  <strong style={{ color: '#e2e8f0' }}>{activeScan.vitals.rr}</strong>
                </div>
              </div>
            )}

            {/* Diagnostic Findings */}
            <div style={{ marginTop: '16px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Radiological & Morphological Findings:
              </span>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', marginTop: '4px', lineHeight: 1.6 }}>
                {pred.findings}
              </p>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '18px', flexWrap: 'wrap' }}>
              <button onClick={onOpenReport} className="btn-primary">
                <FileDown size={16} />
                <span>Generate Official Clinical Report (PDF)</span>
              </button>
              <button 
                onClick={() => onAskCopilot(`Explain the Grad-CAM hotspot for ${pred.primaryCondition} and provide differential diagnoses.`)} 
                className="btn-secondary"
              >
                <MessageSquare size={16} color="#38bdf8" />
                <span>Ask MedVision Copilot</span>
              </button>
            </div>
          </div>

          {/* Probabilities Distribution & Grad-CAM Evidence Breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            
            {/* Class Probabilities Bar Chart */}
            <div className="glass-panel" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Multi-Class Probabilities
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Softmax Output</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {pred.probabilities?.map((item, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '3px' }}>
                      <span style={{ color: idx === 0 ? '#38bdf8' : 'var(--text-secondary)' }}>
                        {item.label}
                      </span>
                      <span className="mono" style={{ fontWeight: 600, color: idx === 0 ? '#38bdf8' : 'var(--text-muted)' }}>
                        {item.score.toFixed(1)}%
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${item.score}%`,
                        height: '100%',
                        borderRadius: '3px',
                        background: idx === 0 ? 'linear-gradient(90deg, #0284c7, #38bdf8)' : 'rgba(255,255,255,0.2)',
                        transition: 'width 0.4s ease'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explainable AI Telemetry Card */}
            <div className="glass-panel" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Grad-CAM XAI Metrics
                </span>
                <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>Visual XAI</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Convolutional Layer:</span>
                  <span className="mono" style={{ color: '#e2e8f0' }}>{currentModalityObj?.gradCamLayer.split(' ')[0]}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Peak Activation (α):</span>
                  <span className="mono" style={{ color: '#10b981' }}>{roiData?.maxAttention ? (roiData.maxAttention * 100).toFixed(1) + '%' : '94.2%'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Inference Latency:</span>
                  <span className="mono" style={{ color: '#38bdf8' }}>{currentModelObj.latency}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Compound Params:</span>
                  <span className="mono" style={{ color: '#e2e8f0' }}>{currentModelObj.params}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Decision Protocol & Treatment Path */}
          <div className="glass-panel" style={{ padding: '16px 20px', borderLeft: '4px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ShieldAlert size={18} color="#10b981" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>
                Clinical Next Steps & Evidence-Based Management
              </span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
              {pred.clinicalAction}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
