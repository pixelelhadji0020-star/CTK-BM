import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Assure-toi que ces icônes sont installées

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
    { to: '/#catalogue', label: 'Menu', id: 'catalogue' },
    { to: '/#apropos', label: 'À propos', id: 'apropos' },
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
        background: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '16px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          
          {/* LOGO EN HAUT À GAUCHE */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img 
              src="/logo-ctkbm.png" 
              alt="CTK & BM" 
              style={{ 
                height: '40px', 
                width: 'auto', 
                objectFit: 'contain',
                display: 'block'
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

          {/* MENU HORIZONTAL DESKTOP */}
          <nav className="nav-desktop-links" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {navLinks.map((link) => (
              link.id ? (
                <a 
                  key={link.label}
                  href={link.to}
                  onClick={(e) => handleScroll(e, link.id)}
                  style={{
                    color: 'var(--grey-light)', textDecoration: 'none',
                    fontFamily: 'var(--font-condensed)', fontSize: 15,
                    fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.target.style.color = 'var(--grey-light)'}
                >
                  {link.label}
                </a>
              ) : (
                <Link 
                  key={link.label}
                  to={link.to}
                  style={{
                    color: 'var(--grey-light)', textDecoration: 'none',
                    fontFamily: 'var(--font-condensed)', fontSize: 15,
                    fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.target.style.color = 'var(--grey-light)'}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* Bouton Burger Mobile */}
          <button 
            onClick={() => setOpen(!open)}
            style={{
              display: 'none', background: 'none', border: 'none', color: '#fff', cursor: 'pointer'
            }}
            className="burger-button"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </header>

      {/* Menu Tiroir Mobile */}
      <div style={{
        position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 99,
        background: '#0a0a0a', display: open ? 'flex' : 'none',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24,
        padding: 20
      }}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.to}
            onClick={(e) => link.id ? handleScroll(e, link.id) : setOpen(false)}
            style={{
              color: '#fff', textDecoration: 'none', fontSize: 24,
              fontFamily: 'var(--font-display)', letterSpacing: 2
            }}
          >
            {link.label.toUpperCase()}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .burger-button { display: block !important; }
        }
      `}</style>
    </>
  );
}
