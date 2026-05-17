import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Phone } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--deep)', borderTop: '1px solid var(--border)' }}>

      {/* Bande livraison */}
      <div style={{
        background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light))',
        padding: '12px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 12, flexWrap: 'wrap', textAlign: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-condensed)', fontSize: 13,
          fontWeight: 700, letterSpacing: 2, color: '#000', textTransform: 'uppercase',
        }}>
          Livraison disponible à Dakar
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

      <div style={{ padding: '36px 24px 22px', maxWidth: 900, margin: '0 auto' }}>

        {/* Section principale — empilée sur mobile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <img src="/logo.png" alt="CTK&BM" style={{
                width: 48, height: 48, borderRadius: '50%', objectFit: 'cover',
                border: '1.5px solid rgba(201,168,76,0.4)',
                flexShrink: 0,
              }} onError={e => e.target.style.display = 'none'} />
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: 4,
              }}>
                CTK<span style={{
                  background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>&</span>BM
              </div>
            </div>
            <p style={{ color: 'var(--grey)', fontSize: 13, lineHeight: 1.75, maxWidth: 300 }}>
              CTK&BM Business & Trading — votre partenaire de confiance à Dakar pour l'achat de téléphones, voitures et chaussures de qualité.
            </p>

            {/* Réseaux */}
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'rgba(37,211,102,0.1)',
                  border: '1px solid rgba(37,211,102,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17,
                }}>💬</a>
              <a href="#" style={{
                width: 38, height: 38, borderRadius: 10,
                background: 'rgba(201,168,76,0.08)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17,
              }}>📸</a>
            </div>
          </div>

          {/* Ligne séparatrice */}
          <div style={{ height: 1, background: 'var(--border)' }} />

          {/* Navigation + Contact — côte à côte même sur mobile */}
          <div style={{ display: 'flex', gap: 0, justifyContent: 'space-between', flexWrap: 'wrap' }}>

            {/* Navigation */}
            <div style={{ minWidth: 130 }}>
              <h4 style={{
                fontFamily: 'var(--font-condensed)', fontSize: 11,
                letterSpacing: 3, textTransform: 'uppercase',
                color: 'var(--gold)', marginBottom: 16,
              }}>Navigation</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <li>
                  <Link to="/" style={{
                    color: 'var(--grey-light)', fontSize: 15,
                    fontFamily: 'var(--font-condensed)', letterSpacing: 1,
                  }}>Accueil</Link>
                </li>
                <li>
                  <span onClick={() => scrollTo('catalogue')} style={{
                    color: 'var(--grey-light)', fontSize: 15,
                    fontFamily: 'var(--font-condensed)', letterSpacing: 1,
                    cursor: 'pointer',
                  }}>Catalogue</span>
                </li>
                <li>
                  <span onClick={() => scrollTo('apropos')} style={{
                    color: 'var(--grey-light)', fontSize: 15,
                    fontFamily: 'var(--font-condensed)', letterSpacing: 1,
                    cursor: 'pointer',
                  }}>À propos</span>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div style={{ minWidth: 180 }}>
              <h4 style={{
                fontFamily: 'var(--font-condensed)', fontSize: 11,
                letterSpacing: 3, textTransform: 'uppercase',
                color: 'var(--gold)', marginBottom: 16,
              }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <MapPin size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <span style={{ color: 'var(--grey-light)', fontSize: 14 }}>Dakar, Sénégal</span>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <Phone size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <span style={{ color: 'var(--grey-light)', fontSize: 14 }}>+221 77 101 85 57</span>
                </div>
              </div>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour CTK&BM !")}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                  color: '#000', padding: '11px 20px', borderRadius: 99,
                  fontFamily: 'var(--font-condensed)', fontSize: 14,
                  fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
                }}>
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid var(--border)', marginTop: 32, paddingTop: 18,
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 8,
        }}>
          <p style={{ color: 'var(--grey)', fontSize: 12 }}>
            © {new Date().getFullYear()} CTK&BM Business & Trading
          </p>
          <Link to="/admin" style={{ color: 'var(--border)', fontSize: 11 }}>Admin</Link>
        </div>
      </div>
    </footer>
  );
}
