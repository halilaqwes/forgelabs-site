import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Sparkles, Bot } from 'lucide-react';

// Preset Q&A data
const presetQA = [
  {
    question: 'Forge Labs hangi hizmetleri sunuyor?',
    answer:
      'Forge Labs olarak kurumsal web sitesi tasarımı, 3D animasyon entegrasyonu, mobil uygulamalar, SEO optimizasyonu ve yapay zeka destekli içerik üretimi hizmetleri sunuyoruz. Her projemizde en son teknolojileri kullanarak markanızı dijital dünyada öne çıkarıyoruz.',
  },
  {
    question: 'StatBoost Fitness nedir?',
    answer:
      'StatBoost Fitness, Forge Labs tarafından geliştirilen, yakında Google Play Store\'da yayınlanacak olan yenilikçi bir ağırlık takip ve sosyal medya platformudur.',
  },
  {
    question: '3D animasyon desteği var mı?',
    answer:
      'Evet! Spline ve Three.js teknolojilerini kullanarak web sitenize etkileşimli 3D modeller, animasyonlu sahneler ve immersive deneyimler ekliyoruz. Profesyonel ve Kurumsal paketlerimizde özel 3D sahne tasarımı hizmetimiz bulunmaktadır.',
  },
  {
    question: 'Proje süreci nasıl işliyor?',
    answer:
      'Sürecimiz 4 aşamadan oluşur: 1) Keşif & Analiz — ihtiyaçlarınızı ve hedeflerinizi belirliyoruz. 2) Tasarım — wireframe ve UI/UX tasarımı oluşturuyoruz. 3) Geliştirme — modern teknolojilerle kodlama yapıyoruz. 4) Lansman & Destek — sitenizi yayına alıp sürekli destek sağlıyoruz.',
  },
  {
    question: 'SEO hizmetleri hakkında bilgi',
    answer:
      'Tüm paketlerimizde temel SEO yapılandırması dahildir. Profesyonel ve üzeri paketlerde gelişmiş anahtar kelime optimizasyonu, Google Analytics entegrasyonu, site hızı optimizasyonu, meta tag yönetimi ve arama motoru sıralamanızı yükseltmek için kapsamlı SEO stratejisi uyguluyoruz.',
  },
  {
    question: 'İletişime nasıl geçebilirim?',
    answer:
      'Bize web sitemiz üzerindeki iletişim formundan, info@forgelabs.com.tr e-posta adresinden veya +90 (212) 555 0199 numaralı telefondan ulaşabilirsiniz. Ayrıca sosyal medya hesaplarımız üzerinden de mesaj atabilirsiniz. İş günlerinde 24 saat içinde dönüş sağlıyoruz.',
  },
];

export default function AiChat({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendQuestion = (qa) => {
    // Add user message
    setMessages((prev) => [...prev, { role: 'user', text: qa.question }]);
    setInputValue('');
    setShowSuggestions(false);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: 'bot', text: qa.answer }]);
      // Show suggestions again after response
      setTimeout(() => setShowSuggestions(true), 300);
    }, 1200 + Math.random() * 800);
  };

  const handlePillClick = (qa) => {
    setInputValue(qa.question);
    // Small delay so user sees the question in input, then send
    setTimeout(() => handleSendQuestion(qa), 350);
  };

  const handleSendFromInput = () => {
    if (!inputValue.trim()) return;
    const match = presetQA.find((qa) => qa.question === inputValue.trim());
    if (match) {
      handleSendQuestion(match);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendFromInput();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: '100vh',
        backgroundColor: '#09090b',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Background layers */}
      <div className="bg-plus-pattern" />
      <div className="bg-plus-markers" />
      <div className="bg-center-glow" />

      {/* Top vignette gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(80% 45% at 50% 0%, rgba(0,255,136,0.03), transparent 60%)',
          zIndex: 0,
        }}
      />

      {/* Logo top-left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        onClick={onBack}
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '1.5rem',
          fontSize: '1.2rem',
          fontWeight: 800,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#00ff88',
          textShadow:
            '0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,255,136,0.15)',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          zIndex: 1000,
        }}>
        Forge Labs
      </motion.div>

      {/* Main chat area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '720px',
          width: '100%',
          margin: '0 auto',
          padding: '0 1.25rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Chat content — scrollable */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '6rem',
            paddingBottom: '12rem',
          }}
          className="chat-scroll-area"
        >
          {/* Welcome area — only shown when no messages */}
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                textAlign: 'center',
                marginTop: '8vh',
                marginBottom: '2rem',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '0.8rem',
                  background: 'rgba(0,255,136,0.08)',
                  border: '1px solid rgba(0,255,136,0.15)',
                  marginBottom: '1.25rem',
                }}
              >
                <Sparkles size={22} color="#00ff88" />
              </div>
              <h1
                style={{
                  fontSize: 'var(--fs-h2)',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.02em',
                }}
              >
                <span style={{ color: '#fff' }}>Forge Labs </span>
                <span
                  style={{
                    color: '#00ff88',
                    textShadow: '0 0 20px rgba(0,255,136,0.3)',
                  }}
                >
                  Asistan
                </span>
              </h1>
              <p
                style={{
                  color: '#737373',
                  fontSize: '0.9rem',
                  maxWidth: '320px',
                  margin: '0 auto',
                  lineHeight: 1.5,
                }}
              >
                Size nasıl yardımcı olabilirim? Aşağıdaki sorulardan birini
                seçerek başlayabilirsiniz.
              </p>
            </motion.div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`ai-chat-msg ${
                msg.role === 'user' ? 'ai-chat-msg-user' : 'ai-chat-msg-bot'
              }`}
              style={{
                marginBottom: '0.75rem',
                animationDelay: `${i * 0.05}s`,
                fontSize: '0.85rem'
              }}
            >
              {msg.role === 'bot' && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    marginBottom: '0.4rem',
                  }}
                >
                  <Bot size={12} color="#00ff88" />
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      color: '#00ff88',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}>
                    Forge Labs
                  </span>
                </div>
              )}
              {msg.text}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="typing-indicator" style={{ marginBottom: '1rem' }}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Bottom fixed area: suggestions + input */}
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '720px',
            padding: '0 1.25rem 1.25rem',
            zIndex: 10,
            background:
              'linear-gradient(to top, #09090b 80%, transparent 100%)',
          }}
        >
          {/* Suggestions */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="ai-suggestions-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                }}
              >
                {presetQA.map((qa, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className="ai-suggestion-pill"
                    onClick={() => handlePillClick(qa)}
                    disabled={isTyping}
                    style={{
                      padding: '0.7rem 0.9rem',
                      fontSize: '0.8rem',
                      opacity: isTyping ? 0.4 : 1,
                      pointerEvents: isTyping ? 'none' : 'auto'
                    }}
                  >
                    {qa.question}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat input */}
          <div className="ai-chat-input-wrapper">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputValue}
              readOnly
              placeholder="Bir soru seçin..."
              onKeyDown={handleKeyDown}
              style={{ cursor: 'default', fontSize: '0.85rem' }}
            />
            <button
              className="ai-chat-send-btn"
              onClick={handleSendFromInput}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Gönder"
              style={{ width: '32px', height: '32px' }}
            >
              <ArrowUp size={16} strokeWidth={2.5} />
            </button>
          </div>

          <p
            style={{
              textAlign: 'center',
              color: '#525252',
              fontSize: '0.65rem',
              marginTop: '0.5rem',
            }}>
            Forge Labs Asistan sadece hazır sorulara yanıt vermektedir.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .ai-suggestions-grid {
            grid-template-columns: 1fr !important;
            max-height: 200px;
            overflow-y: auto;
            padding-right: 4px;
          }
          .chat-scroll-area {
            padding-bottom: 15rem !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
