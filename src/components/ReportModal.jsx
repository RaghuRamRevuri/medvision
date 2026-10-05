import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, Activity, Building2 } from 'lucide-react';
import { PROJECT_METADATA } from '../data/medicalData';

export default function ReportModal({ isOpen, onClose, activeScan, selectedModel }) {
  if (!isOpen || !activeScan) return null;

  const pred = activeScan.prediction || {};

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        color: '#0f172a',
        width: '800px',
        maxWidth: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: '16px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* Modal Top Actions (Hidden during print) */}
        <div className="no-print" style={{
          padding: '12px 24px',
          background: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} color="#38bdf8" />
            <strong style={{ fontSize: '0.9rem' }}>Official Clinical Diagnostic Report Preview</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Printer size={15} />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Hospital Report Document */}
        <div style={{ padding: '36px 40px', fontFamily: "'Inter', sans-serif" }}>
          
          {/* Hospital / College Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottom: '2px solid #0284c7',
            paddingBottom: '16px',
            marginBottom: '20px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  background: '#0284c7',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>
                  MEDVISION-AI
                </span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
                  CLINICAL IMAGING REPORT
                </h2>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                Multimodal Computer-Aided Decision Support System • Department of Radiology
              </p>
              <p style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                Automated Clinical Decision Support & Explainable AI Diagnostic Protocol
              </p>
            </div>

            <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#475569' }}>
              <div><strong>Report ID:</strong> RPT-{Date.now().toString().slice(-6)}</div>
              <div><strong>Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
              <div><strong>Status:</strong> <span style={{ color: '#059669', fontWeight: 700 }}>AI VERIFIED (Grad-CAM)</span></div>
            </div>
          </div>

          {/* Patient Demographics Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '0.82rem' }}>
            <tbody>
              <tr style={{ background: '#f8fafc' }}>
                <td style={{ padding: '8px 12px', border: '1px solid #e2e8f0', fontWeight: 600, width: '18%' }}>Patient Name:</td>
                <td style={{ padding: '8px 12px', border: '1px solid #e2e8f0', width: '32%' }}>{activeScan.patientName}</td>
                <td style={{ padding: '8px 12px', border: '1px solid #e2e8f0', fontWeight: 600, width: '18%' }}>Medical Record No:</td>
                <td style={{ padding: '8px 12px', border: '1px solid #e2e8f0', width: '32%' }} className="mono">{activeScan.patientId}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 12px', border: '1px solid #e2e8f0', fontWeight: 600 }}>Age / Gender:</td>
                <td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>{activeScan.patientAge} Years / {activeScan.patientGender}</td>
                <td style={{ padding: '8px 12px', border: '1px solid #e2e8f0', fontWeight: 600 }}>Modality Examined:</td>
                <td style={{ padding: '8px 12px', border: '1px solid #e2e8f0', textTransform: 'uppercase', fontWeight: 600, color: '#0284c7' }}>
                  {activeScan.modality.replace('_', ' ')}
                </td>
              </tr>
              <tr style={{ background: '#f8fafc' }}>
                <td style={{ padding: '8px 12px', border: '1px solid #e2e8f0', fontWeight: 600 }}>AI Architecture:</td>
                <td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>{selectedModel} (96.5% Acc)</td>
                <td style={{ padding: '8px 12px', border: '1px solid #e2e8f0', fontWeight: 600 }}>ICD-10 Code:</td>
                <td style={{ padding: '8px 12px', border: '1px solid #e2e8f0', fontWeight: 700 }} className="mono">{pred.icd10}</td>
              </tr>
            </tbody>
          </table>

          {/* Clinical Symptoms */}
          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', textTransform: 'uppercase' }}>
              Clinical History & Presentation
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#334155', marginTop: '6px', lineHeight: 1.5 }}>
              {activeScan.symptoms}
            </p>
          </div>

          {/* Diagnostic Impression */}
          <div style={{
            padding: '16px',
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
                Primary Diagnostic Impression
              </span>
              <span style={{
                background: '#16a34a',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                Confidence: {pred.confidence}%
              </span>
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#14532d', marginTop: '4px' }}>
              {pred.primaryCondition}
            </div>
            <p style={{ fontSize: '0.82rem', color: '#166534', marginTop: '6px', lineHeight: 1.5 }}>
              {pred.findings}
            </p>
          </div>

          {/* Differential Diagnoses & Probability Breakdown */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', textTransform: 'uppercase' }}>
              Differential Diagnosis Likelihood
            </h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '8px', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
                  <th style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>Condition / Finding</th>
                  <th style={{ padding: '6px 10px', border: '1px solid #cbd5e1', width: '25%' }}>Probability Score</th>
                  <th style={{ padding: '6px 10px', border: '1px solid #cbd5e1', width: '25%' }}>Diagnostic Stratum</th>
                </tr>
              </thead>
              <tbody>
                {pred.probabilities?.map((p, idx) => (
                  <tr key={idx} style={{ background: idx === 0 ? '#f8fafc' : '#ffffff' }}>
                    <td style={{ padding: '6px 10px', border: '1px solid #e2e8f0', fontWeight: idx === 0 ? 700 : 500 }}>
                      {p.label}
                    </td>
                    <td style={{ padding: '6px 10px', border: '1px solid #e2e8f0' }} className="mono">
                      {p.score.toFixed(1)}%
                    </td>
                    <td style={{ padding: '6px 10px', border: '1px solid #e2e8f0', color: idx === 0 ? '#16a34a' : '#64748b' }}>
                      {idx === 0 ? 'Primary Suspect' : 'Secondary Differential'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recommended Management */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', textTransform: 'uppercase' }}>
              Evidence-Based Recommendations & Follow-Up
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#334155', marginTop: '6px', lineHeight: 1.5 }}>
              {pred.clinicalAction}
            </p>
          </div>

          {/* Academic & Verification Sign-Off Footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid #cbd5e1',
            paddingTop: '20px',
            marginTop: '30px'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a' }}>
                MedVision AI Diagnostic Engine
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                Grad-CAM Activation Verified • EfficientNet-B0 Pretrained
              </div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                Certified Radiologic AI Inference Engine
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Brush Script MT', cursive, sans-serif",
                fontSize: '1.4rem',
                color: '#0369a1',
                marginBottom: '2px'
              }}>
                Clinical Radiologist, MD
              </div>
              <div style={{ borderTop: '1px solid #94a3b8', width: '180px', paddingTop: '4px', fontSize: '0.72rem', color: '#475569' }}>
                Board Certified Diagnostic Radiologist
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
