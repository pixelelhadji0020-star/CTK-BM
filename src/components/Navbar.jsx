import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../data/products';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  function scrollTo(id) {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  }

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(6,6,6,0.97)' : 'rgba(6,6,6,0.55)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        transition: 'all 0.3s',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 64, padding: '0 20px',
          maxWidth: 1100, margin: '0 auto',
        }}>

          {/* Logo image à gauche */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', zIndex: 110 }}>
            <img src="/logo.png" alt="CTK&BM" style={{
              height: 46, width: 46, borderRadius: '50%', objectFit: 'cover',
              border: '1.5px solid rgba(201,168,76,0.45)',
              boxShadow: '0 0 12px rgba(201,168,76,0.15)',
            }} />
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="desktop-nav">
            <Link to="/" style={{
              fontFamily: 'var(--font-condensed)', fontSize: 14,
              letterSpacing: 2, textTransform: 'uppercase',
              color: location.pathname === '/' ? 'var(--gold-light)' : 'var(--grey-light)',
              borderBottom: location.pathname === '/' ? '1px solid var(--gold)' : '1px solid transparent',
              paddingBottom: 2, transition: 'color 0.2s',
            }}>Accueil</Link>

            <a onClick={() => scrollTo('catalogue')} style={{
              fontFamily: 'var(--font-condensed)', fontSize: 14,
              letterSpacing: 2, textTransform: 'uppercase',
              color: 'var(--grey-light)', cursor: 'pointer',
              borderBottom: '1px solid transparent', paddingBottom: 2,
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--off-white)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--grey-light)'}
            >Catalogue</a>

            <a onClick={() => scrollTo('apropos')} style={{
              fontFamily: 'var(--font-condensed)', fontSize: 14,
              letterSpacing: 2, textTransform: 'uppercase',
              color: 'var(--grey-light)', cursor: 'pointer',
              borderBottom: '1px solid transparent', paddingBottom: 2,
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--off-white)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--grey-light)'}
            >À propos</a>
          </nav>

          {/* Burger */}
          <button onClick={() => setOpen(!open)} className="hamburger" style={{
            display: 'none', flexDirection: 'column', gap: 5,
            width: 40, height: 40, alignItems: 'center', justifyContent: 'center',
            zIndex: 110, borderRadius: 10,
            background: open ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.04)',
            border: '1px solid',
            borderColor: open ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.1)',
            transition: 'all 0.2s',
          }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 18, height: 1.5, borderRadius: 2,
                background: open ? 'var(--gold)' : 'var(--white)',
                transform: i === 0 && open ? 'translateY(6.5px) rotate(45deg)'
                  : i === 2 && open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                opacity: i === 1 && open ? 0 : 1,
                transition: 'all 0.25s',
              }} />
            ))}
          </button>
        </div>
      </header>

      {/* Menu mobile fullscreen */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99,
        background: 'rgba(6,6,6,0.98)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        gap: 10, padding: '80px 24px 40px',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'opacity 0.3s ease',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)',
        }} />

        {/* Logo dans menu */}
        <img src="/logo.png" alt="CTK&BM" style={{
          width: 70, height: 70, borderRadius: '50%', objectFit: 'cover',
          border: '2px solid rgba(201,168,76,0.4)',
          marginBottom: 12,
          opacity: open ? 1 : 0,
          transform: open ? 'scale(1)' : 'scale(0.85)',
          transition: 'all 0.4s ease',
        }} />

        {/* Liens */}
        {[
          { label: 'Accueil', action: () => { setOpen(false); } , isLink: true, to: '/' },
          { label: 'Catalogue', action: () => scrollTo('catalogue') },
          { label: 'À propos', action: () => scrollTo('apropos') },
        ].map(({ label, action, isLink, to }, i) => (
          <button key={label} onClick={action} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', maxWidth: 310,
            padding: '18px 22px',
            border: '1px solid var(--border)',
            borderRadius: 14,
            background: 'rgba(255,255,255,0.02)',
            transform: open ? 'translateY(0)' : 'translateY(20px)',
            opacity: open ? 1 : 0,
            transition: `all 0.35s ${i * 0.07}s ease`,
            cursor: 'pointer',
            width: '100%', maxWidth: 310,
          }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 26,
              letterSpacing: 2, color: 'var(--white)',
            }}>
              {label.toUpperCase()}
            </span>
            <span style={{ color: 'var(--gold)', fontSize: 20 }}>›</span>
          </button>
        ))}

        {/* WhatsApp */}
        <a href="https://wa.me/221771018557" target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            width: '100%', maxWidth: 310, marginTop: 8,
            padding: '15px 24px', borderRadius: 99,
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
            color: '#000',
            fontFamily: 'var(--font-condensed)', fontSize: 15,
            fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
            transform: open ? 'translateY(0)' : 'translateY(20px)',
            opacity: open ? 1 : 0,
            transition: 'all 0.35s 0.21s ease',
          }}>
          Contacter sur WhatsApp
        </a>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
