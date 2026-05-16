import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
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

  // Empêche le scroll du body quand menu ouvert
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(6,6,6,0.97)' : 'rgba(6,6,6,0.6)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'all 0.3s',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          height: 60, padding: '0 20px',
          maxWidth: 1100, margin: '0 auto',
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, zIndex: 110 }}>
            <div style={{
              width: 32, height: 32,
              background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: 12,
              color: '#000', letterSpacing: 1, borderRadius: 6, fontWeight: 700,
            }}>CTK</div>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 19,
              letterSpacing: 3, color: 'var(--white)',
            }}>
              CTK
              <span style={{
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
                }}>
                  {icon} {label}
                </Link>
              );
            })}
          </nav>

          {/* Burger custom */}
          <button
            onClick={() => setOpen(!open)}
            style={{
              display: 'none', flexDirection: 'column', gap: 5,
              width: 36, height: 36, alignItems: 'center', justifyContent: 'center',
              zIndex: 110, borderRadius: 8,
              background: open ? 'rgba(201,168,76,0.12)' : 'transparent',
              border: '1px solid',
              borderColor: open ? 'rgba(201,168,76,0.3)' : 'var(--border)',
              transition: 'all 0.2s',
            }}
            className="hamburger"
          >
            <span style={{
              display: 'block', width: 18, height: 1.5, borderRadius: 2,
              background: open ? 'var(--gold)' : 'var(--white)',
              transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
              transition: 'all 0.25s',
            }} />
            <span style={{
              display: 'block', width: 18, height: 1.5, borderRadius: 2,
              background: open ? 'var(--gold)' : 'var(--white)',
              opacity: open ? 0 : 1,
              transition: 'all 0.25s',
            }} />
            <span style={{
              display: 'block', width: 18, height: 1.5, borderRadius: 2,
              background: open ? 'var(--gold)' : 'var(--white)',
              transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              transition: 'all 0.25s',
            }} />
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
        gap: 8, padding: '80px 24px 40px',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'opacity 0.3s ease',
      }}>
        {/* Décor radial */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)',
        }} />

        {Object.entries(CATEGORIES).map(([key, { label, icon }], i) => {
          const active = location.pathname === `/categorie/${key}`;
          return (
            <Link key={key} to={`/categorie/${key}`} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', maxWidth: 320,
              padding: '20px 24px',
              border: `1px solid ${active ? 'rgba(201,168,76,0.5)' : 'var(--border)'}`,
              borderRadius: 16,
              background: active ? 'rgba(201,168,76,0.07)' : 'rgba(255,255,255,0.02)',
              transform: open ? 'translateY(0)' : 'translateY(20px)',
              opacity: open ? 1 : 0,
              transition: `all 0.35s ${i * 0.07}s ease`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: active
                    ? 'linear-gradient(135deg, var(--gold), var(--gold-light))'
                    : 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}>
                  {icon}
                </div>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 28, letterSpacing: 2,
                  color: active ? 'var(--gold-light)' : 'var(--white)',
                }}>
                  {label.toUpperCase()}
                </span>
              </div>
              <span style={{ color: active ? 'var(--gold)' : 'var(--grey)', fontSize: 20 }}>›</span>
            </Link>
          );
        })}

        {/* Contact WhatsApp dans le menu */}
        <a href="https://wa.me/221771018557"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            width: '100%', maxWidth: 320, marginTop: 16,
            padding: '16px 24px', borderRadius: 99,
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
