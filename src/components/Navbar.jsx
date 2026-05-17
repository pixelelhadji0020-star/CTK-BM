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

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/#catalogue', label: 'Catalogue', scroll: true },
    { to: '/#apropos', label: 'À propos', scroll: true },
  ];

  function handleScroll(e, id) {
    if (!id) return;
    e.preventDefault();
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(6,6,6,0.97)' : 'rgba(6,6,6,0.55)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'all 0.3s',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 64, padding: '0 24px',
          maxWidth: 1100, margin: '0 auto',
        }}>

          {/* Logo image */}
         <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, zIndex: 110 }}>
  <img
    src="/logo-ctkbm.png" {/* <-- On change juste le nom du fichier ici */}
    alt="CTK&BM"
    style={{ height: 44, width: 44, borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(201,168,76,0.3)' }}
    onError={e => { e.target.style.display = 'none'; }}
  />
  <span style={{
    fontFamily: 'var(--font-display)', fontSize: 20,
    letterSpacing: 3, color: 'var(--white)',
  }}>
    CTK<span style={{
      background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    }}>&</span>BM
  </span>
</Link>
          {/* Desktop nav — Accueil / Catalogue / À propos */}
          <nav style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="desktop-nav">
            <Link to="/" style={{
              fontFamily: 'var(--font-condensed)', fontSize: 14,
              letterSpacing: 2, textTransform: 'uppercase',
              color: location.pathname === '/' && !window.location.hash ? 'var(--gold-light)' : 'var(--grey-light)',
              borderBottom: location.pathname === '/' && !window.location.hash ? '1px solid var(--gold)' : '1px solid transparent',
              paddingBottom: 2, transition: 'color 0.2s',
            }}>
              Accueil
            </Link>
            <a href="#catalogue" onClick={e => handleScroll(e, 'catalogue')} style={{
              fontFamily: 'var(--font-condensed)', fontSize: 14,
              letterSpacing: 2, textTransform: 'uppercase',
              color: 'var(--grey-light)', borderBottom: '1px solid transparent',
              paddingBottom: 2, transition: 'color 0.2s', cursor: 'pointer',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--off-white)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--grey-light)'}
            >
              Catalogue
            </a>
            <a href="#apropos" onClick={e => handleScroll(e, 'apropos')} style={{
              fontFamily: 'var(--font-condensed)', fontSize: 14,
              letterSpacing: 2, textTransform: 'uppercase',
              color: 'var(--grey-light)', borderBottom: '1px solid transparent',
              paddingBottom: 2, transition: 'color 0.2s', cursor: 'pointer',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--off-white)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--grey-light)'}
            >
              À propos
            </a>
          </nav>

          {/* Burger */}
          <button
            onClick={() => setOpen(!open)}
            style={{
              display: 'none', flexDirection: 'column', gap: 5,
              width: 38, height: 38, alignItems: 'center', justifyContent: 'center',
              zIndex: 110, borderRadius: 8,
              background: open ? 'rgba(201,168,76,0.12)' : 'transparent',
              border: '1px solid',
              borderColor: open ? 'rgba(201,168,76,0.3)' : 'var(--border)',
              transition: 'all 0.2s',
            }}
            className="hamburger"
          >
            {[
              open ? 'translateY(6.5px) rotate(45deg)' : 'none',
              null,
              open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            ].map((transform, i) => (
              <span key={i} style={{
                display: 'block', width: 18, height: 1.5, borderRadius: 2,
                background: open ? 'var(--gold)' : 'var(--white)',
                transform: transform || 'none',
                opacity: i === 1 && open ? 0 : 1,
                transition: 'all 0.25s',
              }} />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99,
        background: 'rgba(6,6,6,0.98)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        gap: 12, padding: '80px 24px 40px',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'opacity 0.3s ease',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)',
        }} />

        {/* Logo dans le menu mobile */}
        <img src="/logo-ctkbm.png" alt="CTK&BM" style={{
          width: 72, height: 72, borderRadius: '50%', objectFit: 'cover',
          border: '2px solid rgba(201,168,76,0.4)',
          marginBottom: 8,
          opacity: open ? 1 : 0,
          transform: open ? 'scale(1)' : 'scale(0.8)',
          transition: 'all 0.4s ease',
        }} onError={e => e.target.style.display = 'none'} />

        {/* Liens Accueil / Catalogue / À propos */}
        {[
          { label: 'Accueil', id: null, to: '/' },
          { label: 'Catalogue', id: 'catalogue' },
          { label: 'À propos', id: 'apropos' },
        ].map(({ label, id, to }, i) => (
          id ? (
            <a key={label} href={`#${id}`}
              onClick={e => handleScroll(e, id)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', maxWidth: 300,
                padding: '18px 24px',
                border: '1px solid var(--border)',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.02)',
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                opacity: open ? 1 : 0,
                transition: `all 0.35s ${i * 0.07}s ease`,
                cursor: 'pointer',
              }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, letterSpacing: 2, color: 'var(--white)' }}>
                {label.toUpperCase()}
              </span>
              <span style={{ color: 'var(--gold)', fontSize: 20 }}>›</span>
            </a>
          ) : (
            <Link key={label} to={to} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', maxWidth: 300,
              padding: '18px 24px',
              border: '1px solid var(--border)',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.02)',
              transform: open ? 'translateY(0)' : 'translateY(20px)',
              opacity: open ? 1 : 0,
              transition: `all 0.35s ${i * 0.07}s ease`,
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, letterSpacing: 2, color: 'var(--white)' }}>
                {label.toUpperCase()}
              </span>
              <span style={{ color: 'var(--gold)', fontSize: 20 }}>›</span>
            </Link>
          )
        ))}

        {/* WhatsApp */}
        <a href="https://wa.me/221771018557"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            width: '100%', maxWidth: 300, marginTop: 8,
            padding: '15px 24px', borderRadius: 99,
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
            color: '#000',
            fontFamily: 'var(--font-condensed)', fontSize: 15,
            fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
            transform: open ? 'translateY(0)' : 'translateY(20px)',
            opacity: open ? 1 : 0,
            transition: 'all 0.35s 0.21s ease',
          }}>
          💬 Contacter sur WhatsApp
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
