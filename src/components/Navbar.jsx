import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(5,5,5,0.96)' : 'rgba(5,5,5,0.7)',
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
              background: 'var(--green)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: 14, color: '#000',
              letterSpacing: 1,
              borderRadius: 4,
            }}>CTK</div>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 20,
              letterSpacing: 3, color: 'var(--white)',
            }}>
              CTK<span style={{ color: 'var(--green)' }}>&</span>BM
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}
            className="desktop-nav">
            {Object.entries(CATEGORIES).map(([key, { label, icon }]) => {
              const active = location.pathname === `/categorie/${key}`;
              return (
                <Link key={key} to={`/categorie/${key}`} style={{
                  fontFamily: 'var(--font-condensed)', fontSize: 14,
                  letterSpacing: 2, textTransform: 'uppercase',
                  color: active ? 'var(--green)' : 'var(--grey-light)',
                  borderBottom: active ? '1px solid var(--green)' : '1px solid transparent',
                  paddingBottom: 2,
                  transition: 'color 0.2s',
                }}>
                  {icon} {label}
                </Link>
              );
            })}
          </nav>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)}
            style={{ color: 'var(--white)', display: 'none', padding: 4 }}
            className="hamburger">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{
            background: 'var(--deep)',
            borderTop: '1px solid var(--border)',
            padding: '8px 0 16px',
            animation: 'fadeIn 0.15s ease',
          }}>
            {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
              <Link key={key} to={`/categorie/${key}`} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '14px 20px',
                fontFamily: 'var(--font-condensed)', fontSize: 18,
                letterSpacing: 2, textTransform: 'uppercase',
                color: location.pathname === `/categorie/${key}`
                  ? 'var(--green)' : 'var(--off-white)',
                borderBottom: '1px solid var(--border)',
              }}>
                <span style={{ fontSize: 20 }}>{icon}</span> {label}
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
