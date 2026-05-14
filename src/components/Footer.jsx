import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Phone } from 'lucide-react';
import { CATEGORIES, WHATSAPP_NUMBER } from '../data/products';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--deep)', borderTop: '1px solid var(--border)',
      padding: '48px 0 24px', marginTop: 60,
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 36, marginBottom: 40,
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 28,
              letterSpacing: 4, marginBottom: 10,
            }}>
              CTK
              <span style={{
                background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>&</span>
              BM
            </div>
            <p style={{ color: 'var(--grey)', fontSize: 13, lineHeight: 1.7 }}>
              Téléphones, voitures et chaussures de qualité. Commandez directement sur WhatsApp.
            </p>
          </div>

          {/* Catégories */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-condensed)', fontSize: 11,
              letterSpacing: 3, textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: 14,
            }}>Catégories</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
                <li key={key}>
                  <Link to={`/categorie/${key}`} style={{
                    color: 'var(--grey-light)', fontSize: 14, transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.target.style.color = 'var(--off-white)'}
                    onMouseLeave={e => e.target.style.color = 'var(--grey-light)'}
                  >
                    {icon} {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-condensed)', fontSize: 11,
              letterSpacing: 3, textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: 14,
            }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', gap: 8, color: 'var(--grey-light)', fontSize: 13 }}>
                <MapPin size={14} style={{ color: 'var(--gold)', marginTop: 2, flexShrink: 0 }} />
                Dakar, Sénégal
              </div>
              <div style={{ display: 'flex', gap: 8, color: 'var(--grey-light)', fontSize: 13 }}>
                <Phone size={14} style={{ color: 'var(--gold)', marginTop: 2, flexShrink: 0 }} />
                +221 77 101 85 57
              </div>
            </div>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour CTK&BM ! Je souhaite plus d'informations.")}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                marginTop: 16,
                background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                color: '#000', padding: '10px 16px', borderRadius: 8,
                fontFamily: 'var(--font-condensed)', fontSize: 13,
                fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border)', paddingTop: 20,
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 8,
        }}>
          <p style={{ color: 'var(--grey)', fontSize: 12 }}>
            © {new Date().getFullYear()} CTK&BM — Tous droits réservés
          </p>
          <Link to="/admin" style={{ color: 'var(--border)', fontSize: 11 }}
            onMouseEnter={e => e.target.style.color = 'var(--grey)'}
            onMouseLeave={e => e.target.style.color = 'var(--border)'}
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
