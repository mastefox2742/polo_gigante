import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const NAV_LINKS = [
  { label: 'Programme', href: '#programme' },
  { label: 'Intervenants', href: '#speakers' },
  { label: 'FAQ', href: '#faq' },
];

export function MasterclassNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(5,10,20,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem,4vw,3rem)', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #0066FF, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1rem', color: '#fff' }}>R</span>
          </div>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '1rem', color: '#F8FAFF', letterSpacing: '0.02em' }}>
            REBOOT<span style={{ color: '#0066FF' }}>.</span>BIZ
          </span>
        </div>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden md:flex">
          {NAV_LINKS.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.9rem', fontWeight: 500, color: 'rgba(248,250,255,0.65)', letterSpacing: '0.05em', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F8FAFF')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,250,255,0.65)')}
            >
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo('#inscription')} className="mc-btn mc-btn-primary" style={{ padding: '0.55rem 1.4rem', fontSize: '0.85rem' }}>
            S'inscrire — Gratuit
          </button>
        </nav>

        {/* Mobile menu btn */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#F8FAFF', padding: '0.5rem' }} className="flex md:hidden" aria-label="Menu">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <><line x1="4" y1="4" x2="18" y2="18"/><line x1="18" y1="4" x2="4" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ background: 'rgba(5,10,20,0.97)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem' }}>
          {NAV_LINKS.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Space Grotesk',sans-serif", fontSize: '1rem', color: 'rgba(248,250,255,0.75)', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo('#inscription')} className="mc-btn mc-btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
            S'inscrire — Gratuit
          </button>
        </div>
      )}
    </motion.header>
  );
}
