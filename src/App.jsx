import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DiagnosticStudio from './components/DiagnosticStudio';
import DocumentReader from './components/DocumentReader';
import ModelBenchmarks from './components/ModelBenchmarks';
import AIChatbot from './components/AIChatbot';
import ReportModal from './components/ReportModal';
import { PRELOADED_SAMPLES, PROJECT_METADATA } from './data/medicalData';

export default function App() {
  const [activeTab, setActiveTab] = useState('diagnostic');
  const [activeScan, setActiveScan] = useState(PRELOADED_SAMPLES[0]);
  const [selectedModel, setSelectedModel] = useState('EfficientNet-B0');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copilotQuestion, setCopilotQuestion] = useState(null);

  // Trigger copilot with specific prompt
  const handleAskCopilot = (question) => {
    setCopilotQuestion(question);
    setIsChatOpen(true);
  };

  // Switch to scan from document reader
  const handleSelectScanFromDoc = (scan) => {
    setActiveScan(scan);
    setActiveTab('diagnostic');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Main Dynamic Viewport */}
      <main style={{ flex: 1, paddingBottom: '60px' }}>
        {activeTab === 'diagnostic' && (
          <DiagnosticStudio
            activeScan={activeScan}
            setActiveScan={setActiveScan}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            onOpenReport={() => setIsReportOpen(true)}
            onAskCopilot={handleAskCopilot}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentReader
            onSelectScan={handleSelectScanFromDoc}
            onAskCopilot={handleAskCopilot}
          />
        )}

        {activeTab === 'benchmarks' && (
          <ModelBenchmarks
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
        )}
      </main>

      {/* Persistent AI Clinical Copilot Drawer */}
      <AIChatbot
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setCopilotQuestion(null);
        }}
        activeScan={activeScan}
        selectedModel={selectedModel}
        initialQuestion={copilotQuestion}
      />

      {/* Printable Clinical Diagnostic Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        activeScan={activeScan}
        selectedModel={selectedModel}
      />

      {/* Global Clinical Status Footer */}
      <footer style={{
        background: 'rgba(7, 10, 15, 0.95)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '16px 24px',
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="pulse-indicator" />
          <strong style={{ color: '#e2e8f0' }}>{PROJECT_METADATA.shortTitle}</strong>
          <span>• Multimodal Deep Learning & Explainable AI (XAI) Framework</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>Architecture: <strong style={{ color: '#38bdf8' }}>Compound Scaling (EfficientNet-B0)</strong></span>
          <span>Security: <strong>HIPAA Aligned Anonymization</strong></span>
          <span className="mono" style={{ color: 'var(--text-dim)' }}>v{PROJECT_METADATA.version}</span>
        </div>
      </footer>
    </div>
  );
}
