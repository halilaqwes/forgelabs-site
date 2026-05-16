import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Process from './components/Process';
import CinematicFeature from './components/CinematicFeature';

import AiChat from './components/AiChat';

function App() {
  const [page, setPage] = useState('home');


  if (page === 'ai-chat') {
    return (
      <AnimatePresence mode="wait">
        <AiChat onBack={() => setPage('home')} />
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <main style={{ minHeight: '100vh' }}>
        <Header onNavigate={setPage} />
        <Hero onNavigate={setPage} />
        <CinematicFeature />
        <Features />
        <Process />
        
        <footer style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--muted)', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#fff' }} className="font-serif">
              Dijital Geleceğinizi İnşa Edelim
            </h2>
            <p>© 2026 Forge Labs. Tüm hakları saklıdır.</p>
          </div>
        </footer>
      </main>
    </AnimatePresence>
  );
}

export default App;
