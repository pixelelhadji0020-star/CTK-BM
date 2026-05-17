import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  function handleScroll(e, id) {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <footer style={{
      background: '#050505',
      color: 'var(--text)',
      borderTop: '1px solid var(--border)',
      padding: '80px 24px 40px 24px',
      fontFamily: 'var(--font-sans)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        
        {/* GRILLE PRINCIPALE DU FOOTER */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 48,
          marginBottom: 60,
        }} className="footer-grid">
          
          {/* COLONNE 1 : MARQUE & IDENTITÉ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img 
                src="/logo-ctkbm.png" 
                alt="CTK & BM Logo" 
                style={{ height: '45px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <p style={{
              color: 'var(--grey)',
              fontSize: 14,
              lineHeight: 1.6,
              maxWidth: 300,
            }}>
              L'univers premium à Dakar. Une sélection rigoureuse et exclusive de véhicules d'exception, smartphones haut de gamme et sneakers de collection.
            </p>
          </div>

          {/* COLONNE 2 : NAVIGATION ÉPURÉE */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 14,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 24,
              color: 'var(--white)',
            }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li>
                <Link to="/" style={{ color: 'var(--grey-light)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--grey-light)'}>
                  Accueil
                </Link>
              </li>
              <li>
                <a href="#catalogue" onClick={(e) => handleScroll(e, 'catalogue')} style={{ color: 'var(--grey-light)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--grey-light)'}>
                  Notre Menu
                </a>
              </li>
              <li>
                <a href="#apropos" onClick={(e) => handleScroll(e, 'apropos')} style={{ color: 'var(--grey-light)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--grey-light)'}>
                  Recherche 48H
                </a>
              </li>
            </ul>
          </div>

          {/* COLONNE 3 : CONTACT & DISPONIBILITÉ */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 14,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 24,
              color: 'var(--white)',
            }}>
              Contact & Showroom
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ color: 'var(--grey)', fontSize: 14, lineHeight: 1.5 }}>
                <span style={{ color: 'var(--grey-light)', fontWeight: 600 }}>Adresse :</span> Almadies, Dakar, Sénégal
              </li>
              <li style={{ color: 'var(--grey)', fontSize: 14 }}>
                <span style={{ color: 'var(--grey-light)', fontWeight: 600 }}>Téléphone :</span> +221 77 672 97 40
              </li>
              <li style={{ color: 'var(--grey)', fontSize: 14 }}>
                <span style={{ color: 'var(--grey-light)', fontWeight: 600 }}>Disponibilité :</span> 7j/7 • 24h/24 via WhatsApp
              </li>
            </ul>
          </div>

        </div>

        {/* SECTION BANNIÈRE BASSE : DROITS D'AUTEUR & ACCENT GOLD */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: 32,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }} className="footer-bottom">
          <p style={{ color: 'var(--grey)', fontSize: 13, margin: 0 }}>
            &copy; {currentYear} <span style={{ color: 'var(--white)', fontWeight: 600 }}>CTK & BM</span>. Tous droits réservés.
          </p>
          <div style={{
            fontFamily: 'var(--font-condensed)',
            fontSize: 12,
            color: 'var(--gold)',
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            fontWeight: 700,
          }}>
            Excellence & Prestige
          </div>
        </div>

      </div>

      {/* STYLES COMPLÉMENTAIRES ET MEDIA QUERIES SÉCURISÉES POUR MOBILE */}
      <style>{`
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
            text-align: left !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            alignItems: flex-start !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </footer>
  );
}
