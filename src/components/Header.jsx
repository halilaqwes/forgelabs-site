import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink } from 'lucide-react';

export default function Header({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when navigating
  const handleNavigate = (page) => {
    onNavigate(page);
    setIsOpen(false);
  };

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.5rem clamp(1rem, 5vw, 3rem)',
      background: isOpen ? 'transparent' : 'rgba(0,0,0,0.3)',
      backdropFilter: isOpen ? 'none' : 'blur(10px)',
      borderBottom: isOpen ? 'none' : '1px solid rgba(255,255,255,0.05)',
      transition: 'all 0.3s ease',
    }}>
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        onClick={() => handleNavigate('home')}
        style={{
          fontSize: '1.4rem',
          fontWeight: 800,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#00ff88',
          textShadow: '0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,255,136,0.15)',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          zIndex: 1100,
        }}
      >
        Forge Labs
      </motion.div>

      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        className="desktop-nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
        }}
      >
        <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('ai-chat'); }} style={{
          color: '#00ff88',
          textDecoration: 'none',
          fontSize: '1.4rem',
          fontWeight: 800,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          transition: 'all 0.3s ease',
          fontFamily: 'Inter, sans-serif',
          textShadow: '0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,255,136,0.15)',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => { e.target.style.textShadow = '0 0 25px rgba(0,255,136,0.6), 0 0 50px rgba(0,255,136,0.3)'; }}
        onMouseLeave={(e) => { e.target.style.textShadow = '0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,255,136,0.15)'; }}
        >
          AI
        </a>
        <a href="#hero" style={{
          color: 'rgba(255,255,255,0.85)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 500,
          letterSpacing: '0.02em',
          transition: 'color 0.3s ease',
          fontFamily: 'Inter, sans-serif',
        }}
        onMouseEnter={(e) => e.target.style.color = '#fff'}
        onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.85)'}
        >
          Ana Sayfa
        </a>
        <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" style={{
          color: 'rgba(255,255,255,0.85)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 500,
          letterSpacing: '0.02em',
          transition: 'color 0.3s ease',
          fontFamily: 'Inter, sans-serif',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
        }}
        onMouseEnter={(e) => e.target.style.color = '#fff'}
        onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.85)'}
        >
          Google Play Store <ExternalLink size={14} />
        </a>
        <a href="#contact" style={{
          color: 'rgba(255,255,255,0.85)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 500,
          letterSpacing: '0.02em',
          transition: 'color 0.3s ease',
          fontFamily: 'Inter, sans-serif',
        }}
        onMouseEnter={(e) => e.target.style.color = '#fff'}
        onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.85)'}
        >
          İletişim
        </a>
      </motion.nav>

      {/* Mobile Toggle */}
      <div 
        className="mobile-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          cursor: 'pointer',
          zIndex: 1100,
          display: 'none',
          color: '#fff',
        }}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
              zIndex: 1050,
            }}
          >
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleNavigate('ai-chat'); }}
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: '#00ff88',
                textDecoration: 'none',
                textTransform: 'uppercase',
                textShadow: '0 0 20px rgba(0,255,136,0.4)',
              }}
            >
              AI ASİSTAN
            </a>
            <a 
              href="#hero" 
              onClick={() => setIsOpen(false)}
              style={{ fontSize: '1.5rem', color: '#fff', textDecoration: 'none', fontWeight: 600 }}
            >
              Ana Sayfa
            </a>
            <a 
              href="https://play.google.com/store"
              target="_blank" rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              style={{ fontSize: '1.5rem', color: '#fff', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Google Play Store <ExternalLink size={20} />
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              style={{ fontSize: '1.5rem', color: '#fff', textDecoration: 'none', fontWeight: 600 }}
            >
              İletişim
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
