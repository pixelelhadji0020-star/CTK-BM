import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Phone } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

function handleScroll(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--deep)',
      borderTop: '1px solid var(--border)',
    }}>
      {/* Bande livraison */}
      <div style={{
        background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light))',
        padding: '13px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 12, flexWrap: 'wrap', textAlign: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-condensed)', fontSize: 13,
          fontWeight: 700, letterSpacing: 2, color: '#000', textTransform: 'uppercase',
        }}>
          📦 Livraison disponible à Dakar
        </span>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour CTK&BM ! Je voudrais commander.")}`}
          target="_blank" rel="noopener noreferrer"
          style={{
            background: '#000', color: 'var(--gold-light)',
            padding: '6px 16px', borderRadius: 99,
            fontFamily: 'var(--font-condensed)', fontSize: 11,
            fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
          }}>
          Commander →
        </a>
      </div>

      <div style={{ padding: '40px 24px 24px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, marginBottom: 36 }}>

          {/* Brand */}
          <div style={{ flex: '2 1 220px' }}>
            {/* Logo + nom */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <img src="/logo.png" alt="CTK&BM" style={{
                width: 52, height: 52, borderRadius: '50%', objectFit: 'cover',
                border: '1px solid rgba(201,168,76,0.35)',
              }} onError={e => e.target.style.display = 'none'} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: 4 }}>
                CTK<span style={{
                  background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>&</span>BM
              </div>
            </div>
            <p style={{ color: 'var(--grey)', fontSize: 13, lineHeight: 1.75, maxWidth: 280, marginBottom: 20 }}>
              CTK&BM Business & Trading — votre partenaire de confiance à Dakar pour l'achat de téléphones, voitures et chaussures de qualité.
            </p>

            {/* Réseaux */}
            <div style={{ display: 'flex', gap: 10 }}>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,211,102,0.22)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,211,102,0.1)'}
              >💬</a>
              <a href="#" style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'rgba(201,168,76,0.08)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.18)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.08)'}
              >📸</a>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ flex: '1 1 130px' }}>
            <h4 style={{
              fontFamily: 'var(--font-condensed)', fontSize: 11,
              letterSpacing: 3, textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: 16,
            }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li>
                <Link to="/" style={{ color: 'var(--grey-light)', fontSize: 14, fontFamily: 'var(--font-condensed)', letterSpacing: 1, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--off-white)'}
                  onMouseLeave={e => e.target.style.color = 'var(--grey-light)'}
                >Accueil</Link>
              </li>
              <li>
                <a onClick={() => handleScroll('catalogue')} style={{ color: 'var(--grey-light)', fontSize: 14, fontFamily: 'var(--font-condensed)', letterSpacing: 1, cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--off-white)'}
                  onMouseLeave={e => e.target.style.color = 'var(--grey-light)'}
                >Catalogue</a>
              </li>
              <li>
                <a onClick={() => handleScroll('apropos')} style={{ color: 'var(--grey-light)', fontSize: 14, fontFamily: 'var(--font-condensed)', letterSpacing: 1, cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--off-white)'}
                  onMouseLeave={e => e.target.style.color = 'var(--grey-light)'}
                >À propos</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div style={{ flex: '1 1 170px' }}>
            <h4 style={{
              fontFamily: 'var(--font-condensed)', fontSize: 11,
              letterSpacing: 3, textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: 16,
            }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <MapPin size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <span style={{ color: 'var(--grey-light)', fontSize: 13 }}>Dakar, Sénégal</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Phone size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <span style={{ color: 'var(--grey-light)', fontSize: 13 }}>+221 77 101 85 57</span>
              </div>
            </div>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour CTK&BM !")}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                color: '#000', padding: '10px 18px', borderRadius: 99,
                fontFamily: 'var(--font-condensed)', fontSize: 13,
                fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid var(--border)', paddingTop: 18,
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 8,
        }}>
          <p style={{ color: 'var(--grey)', fontSize: 12 }}>
            © {new Date().getFullYear()} CTK&BM Business & Trading — Tous droits réservés
          </p>
          <Link to="/admin" style={{ color: 'var(--border)', fontSize: 11, transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--grey)'}
            onMouseLeave={e => e.target.style.color = 'var(--border)'}
          >Admin</Link>
        </div>
      </div>
    </footer>
  );
}
