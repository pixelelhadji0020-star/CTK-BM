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
    { to: '/#catalogue', label: 'Menu', id: 'catalogue', scroll: true },
    { to: '/#apropos', label: 'À propos', id: 'apropos', scroll: true },
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
        background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: scrolled ? '14px 24px' : '24px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          
          {/* LOGO EN HAUT À GAUCHE */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img 
              src="/logo-ctkbm.png" 
              alt="CTK & BM" 
              style={{ 
                height: scrolled ? '35px' : '42px', 
                width: 'auto', 
                objectFit: 'contain',
                display: 'block',
                transition: 'height 0.4s ease'
              }} 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if(e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = 'block';
              }}
            />
            <span style={{ 
              display: 'none', 
              fontFamily: 'var(--font-display)', 
              fontSize: '22px', 
              color: '#fff', 
              letterSpacing: '2px' 
            }}>
              CTK & BM
            </span>
          </Link>

          {/* Nav Links (Desktop) */}
          <nav style={{ display: 'flex', gap: 36 }} className="nav-desktop">
            {navLinks.map((l) => (
              l.scroll ? (
                <a key={l.label} href={l.to} onClick={(e) => handleScroll(e, l.id)} style={{
                  color: 'var(--grey-light)', textDecoration: 'none',
                  fontFamily: 'var(--font-condensed)', fontSize: 13,
                  fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--grey-light)'}>
                  {l.label}
                </a>
              ) : (
                <Link key={l.label} to={l.to} style={{
                  color: 'var(--grey-light)', textDecoration: 'none',
                  fontFamily: 'var(--font-condensed)', fontSize: 13,
                  fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--grey-light)'}>
                  {l.label}
                </Link>
              )
            ))}
          </nav>

          {/* Burger */}
          <button onClick={() => setOpen(!open)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: 6, padding: 4, zIndex: 110,
          }} className="nav-burger">
            <div style={{ width: 22, height: 2, background: '#fff', transition: '0.3s', transform: open ? 'translateY(8px) rotate(45deg)' : 'none' }} />
            <div style={{ width: 16, height: 2, background: '#fff', transition: '0.2s', opacity: open ? 0 : 1, alignSelf: 'flex-end' }} />
            <div style={{ width: 22, height: 2, background: '#fff', transition: '0.3s', transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div style={{
        position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 105,
        background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(20px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px', gap: 20,
        pointerEvents: open ? 'all' : 'none', opacity: open ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {navLinks.map(({ to, label, scroll, id }, i) => (
          scroll ? (
            <a key={label} href={to} onClick={(e) => handleScroll(e, id)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              textDecoration: 'none', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.02)',
              transform: open ? 'translateY(0)' : 'translateY(20px)', opacity: open ? 1 : 0,
              transition: `all 0.35s ${i * 0.07}s ease`,
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, letterSpacing: 2, color: 'var(--white)' }}>
                {label.toUpperCase()}
              </span>
              <span style={{ color: 'var(--gold)', fontSize: 20 }}>›</span>
            </a>
          ) : (
            <Link key={label} to={to} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              textDecoration: 'none', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.02)',
              transform: open ? 'translateY(0)' : 'translateY(20px)', opacity: open ? 1 : 0,
              transition: `all 0.35s ${i * 0.07}s ease`,
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, letterSpacing: 2, color: 'var(--white)' }}>
                {label.toUpperCase()}
              </span>
              <span style={{ color: 'var(--gold)', fontSize: 20 }}>›</span>
            </Link>
          )
        ))}
      </div>

      <style>{`
        @media (min-width: 769px) {
          .nav-burger { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
        }
      `}</style>
    </>
  );
}
