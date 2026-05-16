import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Phone } from 'lucide-react';
import { CATEGORIES, WHATSAPP_NUMBER } from '../data/products';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--deep)',
      borderTop: '1px solid var(--border)',
      marginTop: 60,
    }}>

      {/* Bande livraison */}
      <div style={{
        background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light))',
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 12, flexWrap: 'wrap', textAlign: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-condensed)', fontSize: 14,
          fontWeight: 700, letterSpacing: 2, color: '#000', textTransform: 'uppercase',
        }}>
          📦 Livraison disponible à Dakar
        </span>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour CTK&BM ! Je voudrais commander.")}`}
          target="_blank" rel="noopener noreferrer"
          style={{
            background: '#000', color: 'var(--gold-light)',
            padding: '7px 18px', borderRadius: 99,
            fontFamily: 'var(--font-condensed)', fontSize: 12,
            fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
          }}>
          Commander →
        </a>
      </div>

      {/* Corps */}
      <div style={{ padding: '36px 20px 20px', maxWidth: 1100, margin: '0 auto' }}>

        {/* Brand */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 28,
            letterSpacing: 4, marginBottom: 8,
          }}>
            CTK
            <span style={{
              background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>&</span>BM
          </div>
          <p style={{ color: 'var(--grey)', fontSize: 13, lineHeight: 1.7, maxWidth: 300 }}>
            Votre boutique de confiance à Dakar pour les téléphones, voitures et chaussures.
          </p>
          {/* Icônes réseaux */}
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                width: 38, height: 38, borderRadius: 10,
                background: 'rgba(37,211,102,0.1)',
                border: '1px solid rgba(37,211,102,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,211,102,0.22)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,211,102,0.1)'}
            >💬</a>
            <a href="#" style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'rgba(201,168,76,0.08)',
              border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.18)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.08)'}
            >📸</a>
          </div>
        </div>

        {/* Ligne séparatrice */}
        <div style={{ height: 1, background: 'var(--border)', marginBottom: 28 }} />

        {/* Catégories + Contact côte à côte sur desktop, empilés sur mobile */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 32,
          marginBottom: 32,
        }}>
          {/* Catégories */}
          <div style={{ flex: '1 1 140px' }}>
            <h4 style={{
              fontFamily: 'var(--font-condensed)', fontSize: 11,
              letterSpacing: 3, textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: 16,
            }}>Nos produits</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
                <li key={key}>
                  <Link to={`/categorie/${key}`} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    color: 'var(--grey-light)', fontSize: 15,
                    fontFamily: 'var(--font-condensed)', letterSpacing: 1,
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--off-white)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--grey-light)'}
                  >
                    <span style={{ fontSize: 18 }}>{icon}</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div style={{ flex: '1 1 180px' }}>
            <h4 style={{
              fontFamily: 'var(--font-condensed)', fontSize: 11,
              letterSpacing: 3, textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: 16,
            }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <MapPin size={15} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <span style={{ color: 'var(--grey-light)', fontSize: 14 }}>Dakar, Sénégal</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Phone size={15} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <span style={{ color: 'var(--grey-light)', fontSize: 14 }}>+221 77 101 85 57</span>
              </div>
            </div>

            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour CTK&BM !")}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                color: '#000', padding: '11px 22px', borderRadius: 99,
                fontFamily: 'var(--font-condensed)', fontSize: 14,
                fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)', paddingTop: 18,
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: 8,
        }}>
          <p style={{ color: 'var(--grey)', fontSize: 12 }}>
            © {new Date().getFullYear()} CTK&BM — Tous droits réservés
          </p>
          <Link to="/admin"
            style={{ color: 'var(--border)', fontSize: 11, transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--grey)'}
            onMouseLeave={e => e.target.style.color = 'var(--border)'}
          >
            Admin
          </Link>
        </div>
      </div>

      {/* Media query mobile */}
      <style>{`
        @media (max-width: 480px) {
          .footer-grid { flex-direction: column !important; }
        }
      `}</style>
    </footer>
  );
}
