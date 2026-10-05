import React from 'react';
import { Activity, FileText, BarChart3, Sparkles } from 'lucide-react';
import { PROJECT_METADATA } from '../data/medicalData';

export default function Navbar({ activeTab, setActiveTab, isChatOpen, setIsChatOpen, onOpenReport }) {
  const navItems = [
    { id: 'diagnostic', label: 'Diagnostic Studio', icon: Activity, badge: 'Live AI' },
    { id: 'documents', label: 'Medical Records & OCR', icon: FileText, badge: 'EHR' },
    { id: 'benchmarks', label: 'Model Benchmarks', icon: BarChart3, badge: '96.5%' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(7, 10, 15, 0.88)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '12px 24px'
    }}>
      {/* Top Clinical Status Sub-Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '8px',
        marginBottom: '10px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        fontSize: '0.75rem',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-cyan" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
            {PROJECT_METADATA.shortTitle}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>•</span>
          <span>{PROJECT_METADATA.platform} (v{PROJECT_METADATA.version})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            Status: <strong style={{ color: '#e2e8f0' }}>Production Triage Ready</strong>
          </span>
          <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span className="pulse-indicator"></span> EfficientNet-B0 SOTA (96.5% Acc)
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand & Project Identity */}
        <div 
          onClick={() => setActiveTab('diagnostic')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(14, 165, 233, 0.4)'
          }}>
            <Activity size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(120deg, #ffffff, #38bdf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                MedVision AI
              </h1>
              <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>XAI Grad-CAM</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Multimodal Medical Image & Diagnostic Document Intelligence
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  background: isActive ? 'rgba(14, 165, 233, 0.15)' : 'transparent',
                  color: isActive ? '#38bdf8' : 'var(--text-secondary)',
                  border: isActive ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                  borderRadius: '10px',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {item.badge && (
                  <span style={{
                    fontSize: '0.65rem',
                    padding: '1px 6px',
                    borderRadius: '999px',
                    background: isActive ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                    color: isActive ? '#ffffff' : 'var(--text-muted)'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA / Copilot Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="btn-primary"
            style={{
              padding: '8px 16px',
              fontSize: '0.82rem',
              background: isChatOpen 
                ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' 
                : 'linear-gradient(135deg, #0284c7, #0ea5e9)'
            }}
          >
            <Sparkles size={16} />
            <span>{isChatOpen ? 'Close Copilot' : 'MedVision Copilot'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
