import React, { useState } from 'react';
import { 
  BarChart3, Trophy, Zap, ShieldCheck, Cpu, GitCommit, Layers, 
  CheckCircle, ArrowUpRight, TrendingUp, BarChart2
} from 'lucide-react';
import { MODEL_BENCHMARKS } from '../data/medicalData';

export default function ModelBenchmarks({ selectedModel, setSelectedModel }) {
  const [activeMetric, setActiveMetric] = useState('accuracy');

  const metrics = [
    { id: 'accuracy', label: 'Accuracy (%)', max: 100 },
    { id: 'precision', label: 'Precision (%)', max: 100 },
    { id: 'recall', label: 'Recall / Sensitivity (%)', max: 100 },
    { id: 'aucRoc', label: 'AUC-ROC', max: 1.0, isRatio: true }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-emerald">Evaluated on Held-Out Test Splits</span>
              <span className="badge badge-cyan">Multimodal Benchmarks</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '6px', color: '#ffffff' }}>
              Comparative CNN Architectures & Deep Learning Performance
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Quantitative evaluation across ResNet50, EfficientNet-B0, and DenseNet121 on multimodal medical imaging datasets (Chest X-Ray, CT, MRI, Fundus, Dermoscopy).
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 18px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(52, 211, 153, 0.3)',
            borderRadius: '12px'
          }}>
            <Trophy size={24} color="#10b981" />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Top Performer</span>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                EfficientNet-B0 (96.5% Acc | 0.982 AUC)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {MODEL_BENCHMARKS.slice(0, 3).map((model) => {
          const isSelected = selectedModel.includes(model.name) || model.id.includes(selectedModel.toLowerCase());
          return (
            <div 
              key={model.id}
              className={`glass-panel ${model.isChampion ? 'glow-emerald' : ''}`}
              style={{
                padding: '20px',
                border: isSelected ? `2px solid ${model.color}` : model.isChampion ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-subtle)',
                position: 'relative'
              }}
            >
              {model.isChampion && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10b981',
                  borderRadius: '999px',
                  padding: '3px 10px',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: '#34d399'
                }}>
                  <Trophy size={12} />
                  <span>CHAMPION</span>
                </div>
              )}

              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {model.architectureType}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                  {model.name}
                </h3>
                <span className="mono" style={{ fontSize: '0.75rem', color: model.color }}>
                  {model.pretrainedBase}
                </span>
              </div>

              {/* Primary Key Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                <div style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>ACCURACY</span>
                  <div className="mono" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>
                    {model.accuracy}%
                  </div>
                </div>

                <div style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>AUC-ROC</span>
                  <div className="mono" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#38bdf8' }}>
                    {model.aucRoc.toFixed(3)}
                  </div>
                </div>

                <div style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>PRECISION</span>
                  <div className="mono" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0' }}>
                    {model.precision}%
                  </div>
                </div>

                <div style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>RECALL / SENS.</span>
                  <div className="mono" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0' }}>
                    {model.recall}%
                  </div>
                </div>
              </div>

              {/* Parameters & Latency */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '8px',
                fontSize: '0.75rem',
                border: '1px solid rgba(255,255,255,0.05)',
                marginBottom: '16px'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Params: </span>
                  <strong style={{ color: '#e2e8f0' }}>{model.params}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>FLOPs: </span>
                  <strong style={{ color: '#e2e8f0' }}>{model.flops}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Latency: </span>
                  <strong style={{ color: '#38bdf8' }}>{model.latency}</strong>
                </div>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                {model.strengths}
              </p>

              <button
                onClick={() => setSelectedModel(model.name)}
                style={{
                  width: '100%',
                  padding: '9px',
                  borderRadius: '8px',
                  background: isSelected ? 'rgba(14, 165, 233, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: isSelected ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
                  color: isSelected ? '#38bdf8' : 'var(--text-secondary)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {isSelected ? '✓ Active Default Model' : `Set as Active Model`}
              </button>
            </div>
          );
        })}
      </div>

      {/* Interactive Charts & ROC Curve Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1fr)', gap: '20px' }}>
        
        {/* Metric Comparison Bar Chart */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
              Architectural Metric Comparison
            </h4>

            {/* Metric Filter */}
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.3)', padding: '2px', borderRadius: '6px' }}>
              {metrics.map(m => (
                <button
                  key={m.id}
                  onClick={() => setActiveMetric(m.id)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: activeMetric === m.id ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                    border: 'none',
                    color: activeMetric === m.id ? '#38bdf8' : 'var(--text-muted)',
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  {m.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Chart Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {MODEL_BENCHMARKS.map((m) => {
              const val = m[activeMetric];
              const displayVal = activeMetric === 'aucRoc' ? val.toFixed(3) : `${val}%`;
              const widthPct = activeMetric === 'aucRoc' ? (val / 1.0) * 100 : val;
              return (
                <div key={m.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: m.isChampion ? '#10b981' : 'var(--text-primary)' }}>
                      {m.name} {m.isChampion && '🏆'}
                    </span>
                    <span className="mono" style={{ color: m.color, fontWeight: 700 }}>
                      {displayVal}
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${widthPct}%`,
                      height: '100%',
                      background: m.isChampion ? 'linear-gradient(90deg, #059669, #10b981)' : m.color,
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Simulated ROC Curve & Confusion Matrix */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
              ROC Curve & Confusion Matrix
            </h4>
            <span className="badge badge-emerald">AUC = 0.982</span>
          </div>

          {/* ROC SVG Graphic */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '200px',
            background: 'rgba(5, 8, 12, 0.8)',
            borderRadius: '10px',
            border: '1px solid var(--border-subtle)',
            overflow: 'hidden'
          }}>
            <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%' }}>
              {/* Grid lines */}
              <line x1="40" y1="20" x2="40" y2="170" stroke="rgba(255,255,255,0.1)" />
              <line x1="40" y1="170" x2="380" y2="170" stroke="rgba(255,255,255,0.1)" />
              <line x1="40" y1="95" x2="380" y2="95" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="210" y1="20" x2="210" y2="170" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

              {/* Diagonal Chance Line */}
              <line x1="40" y1="170" x2="380" y2="20" stroke="rgba(255,255,255,0.15)" strokeDasharray="6 6" />

              {/* EfficientNet-B0 Curve (AUC 0.982) */}
              <path
                d="M 40 170 C 45 40, 110 22, 380 20"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
              />

              {/* DenseNet121 Curve (AUC 0.976) */}
              <path
                d="M 40 170 C 55 55, 130 28, 380 20"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="4 2"
              />

              {/* ResNet50 Curve (AUC 0.969) */}
              <path
                d="M 40 170 C 65 68, 150 35, 380 20"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
                strokeDasharray="2 2"
              />

              {/* Labels */}
              <text x="50" y="32" fill="#10b981" fontSize="10" fontFamily="monospace">EfficientNet-B0 (0.982)</text>
              <text x="50" y="48" fill="#3b82f6" fontSize="10" fontFamily="monospace">DenseNet121 (0.976)</text>
              <text x="50" y="64" fill="#8b5cf6" fontSize="10" fontFamily="monospace">ResNet50 (0.969)</text>

              <text x="210" y="190" fill="#64748b" fontSize="10" textAnchor="middle">False Positive Rate (1 - Specificity)</text>
              <text x="18" y="95" fill="#64748b" fontSize="10" transform="rotate(-90 18 95)" textAnchor="middle">True Positive Rate</text>
            </svg>
          </div>

          {/* Normalized Confusion Matrix Mini-Grid */}
          <div style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', textAlign: 'center' }}>
            <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '6px', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
              <div style={{ fontSize: '0.68rem', color: '#34d399' }}>TRUE POSITIVE (TP)</div>
              <strong className="mono" style={{ fontSize: '1rem', color: '#ffffff' }}>96.5%</strong>
            </div>
            <div style={{ padding: '8px', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '6px', border: '1px solid rgba(251, 113, 133, 0.2)' }}>
              <div style={{ fontSize: '0.68rem', color: '#fb7185' }}>FALSE POSITIVE (FP)</div>
              <strong className="mono" style={{ fontSize: '1rem', color: '#ffffff' }}>3.5%</strong>
            </div>
            <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '6px', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
              <div style={{ fontSize: '0.68rem', color: '#fbbf24' }}>FALSE NEGATIVE (FN)</div>
              <strong className="mono" style={{ fontSize: '1rem', color: '#ffffff' }}>4.8%</strong>
            </div>
            <div style={{ padding: '8px', background: 'rgba(56, 189, 248, 0.15)', borderRadius: '6px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              <div style={{ fontSize: '0.68rem', color: '#38bdf8' }}>TRUE NEGATIVE (TN)</div>
              <strong className="mono" style={{ fontSize: '1rem', color: '#ffffff' }}>95.2%</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Transfer Learning Pipeline Flow Card */}
      <div className="glass-panel" style={{ padding: '20px 24px' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>
          Transfer Learning & Fine-Tuning Methodology
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div style={{ padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', borderLeft: '3px solid #0ea5e9' }}>
            <strong style={{ fontSize: '0.82rem', color: '#38bdf8' }}>1. ImageNet Initialization</strong>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Base convolutional backbones initialized with weights pre-trained on 1.4M natural images for foundational low-level feature extraction.
            </p>
          </div>
          <div style={{ padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', borderLeft: '3px solid #8b5cf6' }}>
            <strong style={{ fontSize: '0.82rem', color: '#c084fc' }}>2. Convolutional Freezing</strong>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Early convolutional layers frozen to preserve generic edge/texture detectors; middle and top layers thawed for domain-specific medical tuning.
            </p>
          </div>
          <div style={{ padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', borderLeft: '3px solid #10b981' }}>
            <strong style={{ fontSize: '0.82rem', color: '#34d399' }}>3. Dense Head & Grad-CAM</strong>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Replaced top classification head with Dropout (0.3), Dense (512), and Softmax layers for multi-class pathology classification + Grad-CAM hook.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
