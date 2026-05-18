import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Process from './components/Process';
import CinematicFeature from './components/CinematicFeature';
import AiChat from './components/AiChat';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const [page, setPage] = useState('home');
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);


  if (page === 'ai-chat') {
    return (
      <AnimatePresence mode="wait">
        <AiChat onBack={() => setPage('home')} />
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <main style={{ minHeight: '100vh', position: 'relative' }}>
        <Header onNavigate={setPage} />
        <Hero onNavigate={setPage} />
        <CinematicFeature />
        <Features />
        <Process />
        
        <footer style={{ 
          padding: '4rem 0', 
          textAlign: 'center', 
          color: 'var(--muted)', 
          borderTop: '1px solid var(--border)',
          background: 'rgba(5, 5, 5, 0.4)'
        }}>
          <div className="container">
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }} className="font-serif">
              Dijital Geleceğinizi İnşa Edelim
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>© 2026 Forge Labs. Tüm hakları saklıdır.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.9rem' }}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setIsPrivacyOpen(true); }}
                style={{ color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = 'var(--muted)'}
              >
                Gizlilik Politikası
              </a>
              <span style={{ color: 'rgba(255, 255, 255, 0.1)' }}>|</span>
              <a 
                href="#contact" 
                style={{ color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = 'var(--muted)'}
              >
                İletişim
              </a>
            </div>
          </div>
        </footer>

        <AnimatePresence>
          {isPrivacyOpen && (
            <PrivacyPolicy onClose={() => setIsPrivacyOpen(false)} />
          )}
        </AnimatePresence>
      </main>
    </AnimatePresence>
  );
}

export default App;
