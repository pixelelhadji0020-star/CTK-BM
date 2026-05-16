import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Phone, Instagram } from 'lucide-react';
import { CATEGORIES, WHATSAPP_NUMBER } from '../data/products';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--deep)',
      borderTop: '1px solid var(--border)',
      marginTop: 60,
    }}>
      {/* CTA bande or */}
      <div style={{
        background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light))',
        padding: '18px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
        flexWrap: 'wrap', textAlign: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-condensed)', fontSize: 15,
          fontWeight: 700, letterSpacing: 2, color: '#000',
          textTransform: 'uppercase',
        }}>
          📦 Livraison disponible à Dakar
        </span>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour CTK&BM ! Je voudrais commander.")}`}
          target="_blank" rel="noopener noreferrer"
          style={{
            background: '#000', color: 'var(--gold-light)',
            padding: '8px 20px', borderRadius: 99,
            fontFamily: 'var(--font-condensed)', fontSize: 13,
            fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
          }}>
          Commander →
        </a>
      </div>

      {/* Corps du footer */}
      <div style={{ padding: '40px 20px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 32, marginBottom: 36,
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 26,
              letterSpacing: 4, marginBottom: 8,
            }}>
              CTK
              <span style={{
                background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>&</span>BM
            </div>
            <p style={{ color: 'var(--grey)', fontSize: 13, lineHeight: 1.7 }}>
              Votre boutique de confiance à Dakar pour les téléphones, voitures et chaussures.
            </p>
            {/* Réseaux sociaux */}
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <a href="https://wa.me/221771018557" target="_blank" rel="noopener noreferrer"
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#25D366', transition: 'all 0.2s', fontSize: 16,
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,211,102,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,211,102,0.1)'}
              >💬</a>
              <a href="#" style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'rgba(201,168,76,0.08)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gold)', transition: 'all 0.2s', fontSize: 16,
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.08)'}
              >📸</a>
            </div>
          </div>

          {/* Catégories */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-condensed)', fontSize: 11,
              letterSpacing: 3, textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: 16,
            }}>Nos produits</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
                <li key={key}>
                  <Link to={`/categorie/${key}`} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    color: 'var(--grey-light)', fontSize: 14, transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--off-white)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--grey-light)'}
                  >
                    <span>{icon}</span> {label}
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
              color: 'var(--gold)', marginBottom: 16,
            }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <MapPin size={14} style={{ color: 'var(--gold)', marginTop: 2, flexShrink: 0 }} />
                <span style={{ color: 'var(--grey-light)', fontSize: 13 }}>Dakar, Sénégal</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Phone size={14} style={{ color: 'var(--gold)', marginTop: 2, flexShrink: 0 }} />
                <span style={{ color: 'var(--grey-light)', fontSize: 13 }}>+221 77 101 85 57</span>
              </div>
            </div>

            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour CTK&BM !")}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                marginTop: 16,
                background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                color: '#000', padding: '10px 18px', borderRadius: 99,
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

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)', paddingTop: 20,
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 8,
        }}>
          <p style={{ color: 'var(--grey)', fontSize: 12 }}>
            © {new Date().getFullYear()} CTK&BM — Tous droits réservés
          </p>
          <Link to="/admin" style={{ color: 'var(--border)', fontSize: 11, transition: 'color 0.2s' }}
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
