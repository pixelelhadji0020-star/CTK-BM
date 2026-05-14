import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(6,6,6,0.97)' : 'rgba(6,6,6,0.75)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        transition: 'background 0.3s',
      }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', height: 60,
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 34, height: 34,
              background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: 13,
              color: '#000', letterSpacing: 1, borderRadius: 4,
              fontWeight: 700,
            }}>CTK</div>
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

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="desktop-nav">
            {Object.entries(CATEGORIES).map(([key, { label, icon }]) => {
              const active = location.pathname === `/categorie/${key}`;
              return (
                <Link key={key} to={`/categorie/${key}`} style={{
                  fontFamily: 'var(--font-condensed)', fontSize: 14,
                  letterSpacing: 2, textTransform: 'uppercase',
                  color: active ? 'var(--gold-light)' : 'var(--grey-light)',
                  borderBottom: active ? '1px solid var(--gold)' : '1px solid transparent',
                  paddingBottom: 2, transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--off-white)'}
                  onMouseLeave={e => e.currentTarget.style.color = active ? 'var(--gold-light)' : 'var(--grey-light)'}
                >
                  {icon} {label}
                </Link>
              );
            })}
          </nav>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)}
            style={{ color: 'var(--white)', display: 'none', padding: 6 }}
            className="hamburger">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{
            background: 'var(--deep)', borderTop: '1px solid var(--border)',
            padding: '8px 0 20px', animation: 'fadeIn 0.15s ease',
          }}>
            {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
              <Link key={key} to={`/categorie/${key}`} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '16px 20px',
                fontFamily: 'var(--font-condensed)', fontSize: 20,
                letterSpacing: 2, textTransform: 'uppercase',
                color: location.pathname === `/categorie/${key}`
                  ? 'var(--gold-light)' : 'var(--off-white)',
                borderBottom: '1px solid var(--border)',
              }}>
                <span style={{ fontSize: 22 }}>{icon}</span> {label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 700px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
