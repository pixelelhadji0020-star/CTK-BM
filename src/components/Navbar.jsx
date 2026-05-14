import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(6,6,6,0.97)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 40, height: 40, background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: 1, color: '#fff',
            clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
          }}>CTK</div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: 3, color: 'var(--white)' }}>
            CTK<span style={{ color: 'var(--red)' }}>&</span>BM
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="desktop-nav">
          {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
            <Link key={key} to={`/categorie/${key}`} style={{
              fontFamily: 'var(--font-condensed)', fontSize: 15, letterSpacing: 2, textTransform: 'uppercase',
              color: location.pathname === `/categorie/${key}` ? 'var(--red)' : 'var(--grey-light)',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--white)'}
              onMouseLeave={e => e.target.style.color = location.pathname === `/categorie/${key}` ? 'var(--red)' : 'var(--grey-light)'}
            >
              {icon} {label}
            </Link>
          ))}
        </nav>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} style={{ color: 'var(--white)', display: 'none' }} className="hamburger">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'var(--deep)', borderTop: '1px solid var(--border)',
          padding: '24px',
          animation: 'fadeIn 0.2s ease',
        }}>
          {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
            <Link key={key} to={`/categorie/${key}`} style={{
              display: 'block', padding: '14px 0',
              fontFamily: 'var(--font-condensed)', fontSize: 20, letterSpacing: 2, textTransform: 'uppercase',
              color: location.pathname === `/categorie/${key}` ? 'var(--red)' : 'var(--grey-light)',
              borderBottom: '1px solid var(--border)',
            }}>
              {icon} {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </header>
  );
}
