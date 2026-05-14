import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Phone } from 'lucide-react';
import { CATEGORIES, WHATSAPP_NUMBER } from '../data/products';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--deep)',
      borderTop: '1px solid var(--border)',
      padding: '60px 0 30px',
      marginTop: 80,
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 32, letterSpacing: 4,
              marginBottom: 12,
            }}>
              CTK<span style={{ color: 'var(--red)' }}>&</span>BM
            </div>
            <p style={{ color: 'var(--grey)', fontSize: 13, lineHeight: 1.8 }}>
              Votre partenaire de confiance pour les téléphones, voitures et chaussures de qualité au Sénégal.
            </p>
          </div>

          {/* Catégories */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-condensed)', fontSize: 13, letterSpacing: 3,
              textTransform: 'uppercase', color: 'var(--red)', marginBottom: 16,
            }}>Nos catégories</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
                <li key={key}>
                  <Link to={`/categorie/${key}`} style={{
                    color: 'var(--grey-light)', fontSize: 14,
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.target.style.color = 'var(--white)'}
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
              fontFamily: 'var(--font-condensed)', fontSize: 13, letterSpacing: 3,
              textTransform: 'uppercase', color: 'var(--red)', marginBottom: 16,
            }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 10, color: 'var(--grey-light)', fontSize: 14 }}>
                <MapPin size={16} style={{ flexShrink: 0, marginTop: 2, color: 'var(--red)' }} />
                Dakar, Sénégal
              </div>
              <div style={{ display: 'flex', gap: 10, color: 'var(--grey-light)', fontSize: 14 }}>
                <Phone size={16} style={{ flexShrink: 0, marginTop: 2, color: 'var(--red)' }} />
                +221 77 101 85 57
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour CTK&BM ! Je souhaite avoir plus d'informations sur vos produits.")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                marginTop: 20, background: '#25D366', color: '#fff',
                padding: '10px 18px',
                fontFamily: 'var(--font-condensed)', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <MessageCircle size={15} />
              Contacter sur WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid var(--border)', paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ color: 'var(--grey)', fontSize: 12 }}>
            © {new Date().getFullYear()} CTK&BM — Tous droits réservés
          </p>
          <Link to="/admin" style={{
            color: 'var(--border)', fontSize: 11,
            transition: 'color 0.2s',
          }}
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
