import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Send, Sparkles, Bot, User, CornerDownLeft, RefreshCcw, 
  HelpCircle, ArrowUpRight, CheckCircle2, ChevronRight, Zap
} from 'lucide-react';
import { generateChatbotReply } from '../utils/aiClinicalEngine';

export default function AIChatbot({ 
  isOpen, 
  onClose, 
  activeScan, 
  activeDoc, 
  selectedModel,
  initialQuestion 
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello! I am **MedVision Copilot**, your clinical decision-support AI assistant.\n\nI am currently synchronized with **${activeScan?.title || "your active medical scan"}** processed via **${selectedModel || "EfficientNet-B0"}**.\n\nYou can ask me to explain the **Grad-CAM heatmap attention**, request **differential diagnoses**, or refine **diagnostic precision** with clinical biomarkers.`,
      chips: ["Explain Grad-CAM focus", "Differential Diagnoses", "Refine Diagnostic Precision", "Recommend Treatment"]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle external question triggers
  useEffect(() => {
    if (initialQuestion) {
      handleSendMessage(initialQuestion);
    }
  }, [initialQuestion]);

  const handleSendMessage = (textToSend = inputText) => {
    const text = (typeof textToSend === 'string' ? textToSend : inputText).trim();
    if (!text) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking and generate context-aware reply
    setTimeout(() => {
      const reply = generateChatbotReply({
        userMessage: text,
        activeScan,
        activeDoc,
        selectedModel,
        history: messages
      });

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply.text,
        chips: reply.chips || ["Explain Grad-CAM focus", "Next steps", "Treatment protocol"]
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleChipClick = (chipText) => {
    handleSendMessage(chipText);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: `Chat session reset. Actively synchronized with **${activeScan?.prediction?.primaryCondition || "current scan"}**. How can I help refine your clinical assessment?`,
        chips: ["Explain Grad-CAM focus", "Differential Diagnoses", "Treatment recommendations"]
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '420px',
      maxWidth: 'calc(100vw - 48px)',
      height: '620px',
      maxHeight: 'calc(100vh - 120px)',
      zIndex: 100,
      background: 'rgba(10, 15, 24, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid var(--border-glow)',
      borderRadius: '20px',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(14, 165, 233, 0.25)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      
      {/* Chatbot Header */}
      <div style={{
        padding: '16px 20px',
        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(139, 92, 246, 0.15))',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 14px rgba(14, 165, 233, 0.4)'
          }}>
            <Sparkles size={18} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>MedVision Copilot</strong>
              <span className="badge badge-emerald" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                Online
              </span>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              Context: {activeScan?.prediction?.primaryCondition ? activeScan.prediction.primaryCondition.slice(0, 24) + '...' : 'Multimodal AI'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={handleClearChat}
            title="Reset Conversation"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex'
            }}
          >
            <RefreshCcw size={16} />
          </button>
          <button
            onClick={onClose}
            title="Close Assistant"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex'
            }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Synchronized Context Status Strip */}
      <div style={{
        padding: '6px 16px',
        background: 'rgba(0, 0, 0, 0.4)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.7rem',
        color: 'var(--text-muted)'
      }}>
        <span>Model: <strong style={{ color: '#38bdf8' }}>{selectedModel}</strong></span>
        <span>Patient: <strong style={{ color: '#e2e8f0' }}>{activeScan?.patientName || "Robert Vance"}</strong></span>
        <span>Confidence: <strong style={{ color: '#10b981' }}>{activeScan?.prediction?.confidence || 96.5}%</strong></span>
      </div>

      {/* Messages Scroll Area */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isUser ? 'flex-end' : 'flex-start',
                gap: '6px',
                maxWidth: '92%',
                alignSelf: isUser ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
                flexDirection: isUser ? 'row-reverse' : 'row'
              }}>
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: isUser ? '#0284c7' : 'rgba(139, 92, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  {isUser ? <User size={14} color="#ffffff" /> : <Bot size={14} color="#c084fc" />}
                </div>

                <div style={{
                  padding: '12px 14px',
                  borderRadius: isUser ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  background: isUser ? 'linear-gradient(135deg, #0284c7, #0ea5e9)' : 'rgba(20, 30, 48, 0.85)',
                  border: isUser ? 'none' : '1px solid var(--border-subtle)',
                  color: isUser ? '#ffffff' : '#e2e8f0',
                  fontSize: '0.84rem',
                  lineHeight: 1.5,
                  wordBreak: 'break-word',
                  boxShadow: isUser ? '0 4px 12px rgba(14, 165, 233, 0.3)' : '0 2px 8px rgba(0,0,0,0.3)'
                }}>
                  {/* Basic markdown parsing: bold, lists */}
                  <div style={{ whiteSpace: 'pre-wrap' }}>
                    {msg.text.split('\n').map((line, lIdx) => {
                      if (line.startsWith('• ') || line.startsWith('- ')) {
                        return (
                          <div key={lIdx} style={{ display: 'flex', gap: '6px', margin: '3px 0' }}>
                            <span style={{ color: isUser ? '#ffffff' : '#38bdf8' }}>•</span>
                            <span>{renderFormattedText(line.substring(2))}</span>
                          </div>
                        );
                      }
                      return <div key={lIdx} style={{ minHeight: '1.2em' }}>{renderFormattedText(line)}</div>;
                    })}
                  </div>
                </div>
              </div>

              {/* Action Chips for bot responses */}
              {!isUser && msg.chips && msg.chips.length > 0 && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginTop: '4px',
                  paddingLeft: '34px'
                }}>
                  {msg.chips.map((chip, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => handleChipClick(chip)}
                      style={{
                        padding: '4px 10px',
                        background: 'rgba(56, 189, 248, 0.08)',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        borderRadius: '999px',
                        color: '#38bdf8',
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '34px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8', animation: 'pulseGlow 1s infinite' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>MedVision Copilot is analyzing findings...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div style={{
        padding: '12px 16px',
        background: 'rgba(7, 10, 15, 0.9)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Ask a question to refine output precision..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          style={{
            flex: 1,
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '10px 14px',
            color: '#ffffff',
            fontSize: '0.85rem',
            outline: 'none'
          }}
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim()}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: inputText.trim() ? 'linear-gradient(135deg, #0284c7, #0ea5e9)' : 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: inputText.trim() ? 'pointer' : 'default',
            transition: 'all 0.2s ease'
          }}
        >
          <Send size={16} />
        </button>
      </div>

    </div>
  );
}

// Simple formatter for bold text inside chat
function renderFormattedText(str) {
  if (!str) return '';
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} style={{ color: '#ffffff', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
