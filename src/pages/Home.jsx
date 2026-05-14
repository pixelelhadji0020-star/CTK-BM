import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { getProducts, CATEGORIES, formatPrice, buildWhatsAppUrl } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const featuredByCategory = Object.keys(CATEGORIES).reduce((acc, key) => {
    acc[key] = products.filter(p => p.category === key).slice(0, 3);
    return acc;
  }, {});

  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--black)',
      }}>
        {/* Background texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            radial-gradient(ellipse 800px 600px at 70% 50%, rgba(230,48,48,0.08) 0%, transparent 70%),
            repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.015) 80px),
            repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.015) 80px)
          `,
        }} />

        {/* Big decorative text */}
        <div style={{
          position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
          fontFamily: 'var(--font-display)', fontSize: 'clamp(120px, 20vw, 280px)',
          color: 'rgba(255,255,255,0.02)', letterSpacing: -10, userSelect: 'none',
          lineHeight: 1,
        }}>
          CTK
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 700 }}>
            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(230,48,48,0.12)', border: '1px solid rgba(230,48,48,0.3)',
              padding: '6px 14px', marginBottom: 32,
              animation: 'fadeUp 0.6s 0.1s both',
            }}>
              <Zap size={12} color="var(--red)" />
              <span style={{
                fontFamily: 'var(--font-condensed)', fontSize: 12, letterSpacing: 3,
                textTransform: 'uppercase', color: 'var(--red)',
              }}>
                CTK&BM — Dakar, Sénégal
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(56px, 9vw, 120px)',
              lineHeight: 0.95,
              letterSpacing: -1,
              marginBottom: 28,
              animation: 'fadeUp 0.7s 0.2s both',
            }}>
              L'EXCELLENCE<br />
              <span style={{ color: 'var(--red)', WebkitTextStroke: '1px var(--red)', WebkitTextFillColor: 'transparent' }}>
                À VOTRE
              </span><br />
              PORTÉE.
            </h1>

            <p style={{
              color: 'var(--grey-light)', fontSize: 17, lineHeight: 1.7, maxWidth: 480,
              marginBottom: 40, animation: 'fadeUp 0.7s 0.35s both',
            }}>
              Téléphones haut de gamme, voitures d'exception et chaussures tendance — tout ce qu'il vous faut, livré avec passion.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex', gap: 16, flexWrap: 'wrap',
              animation: 'fadeUp 0.7s 0.45s both',
            }}>
              {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
                <Link key={key} to={`/categorie/${key}`} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '14px 28px',
                  fontFamily: 'var(--font-condensed)', fontSize: 14, fontWeight: 700, letterSpacing: 2,
                  textTransform: 'uppercase',
                  background: key === 'telephones' ? 'var(--red)' : 'transparent',
                  color: key === 'telephones' ? '#fff' : 'var(--grey-light)',
                  border: key === 'telephones' ? 'none' : '1px solid var(--border)',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => {
                    if (key !== 'telephones') {
                      e.currentTarget.style.borderColor = 'var(--red)';
                      e.currentTarget.style.color = 'var(--white)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (key !== 'telephones') {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.color = 'var(--grey-light)';
                    }
                  }}
                >
                  {icon} {label}
                  {key === 'telephones' && <ArrowRight size={14} />}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          animation: 'fadeIn 1s 1s both',
        }}>
          <span style={{ fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: 3, color: 'var(--grey)', textTransform: 'uppercase' }}>
            Découvrir
          </span>
          <div style={{
            width: 1, height: 40, background: 'linear-gradient(to bottom, var(--grey), transparent)',
            animation: 'pulse-red 2s infinite',
          }} />
        </div>
      </section>

      {/* Category sections */}
      {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
        <section key={key} style={{ padding: '80px 0' }}>
          <div className="container">
            {/* Section header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
              marginBottom: 48, borderBottom: '1px solid var(--border)', paddingBottom: 24,
            }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-condensed)', fontSize: 12, letterSpacing: 4,
                  textTransform: 'uppercase', color: 'var(--red)', marginBottom: 8,
                }}>
                  {icon} Notre sélection
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 60px)',
                  letterSpacing: 2,
                }}>
                  {label.toUpperCase()}
                </h2>
              </div>
              <Link to={`/categorie/${key}`} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: 'var(--font-condensed)', fontSize: 13, letterSpacing: 2,
                textTransform: 'uppercase', color: 'var(--red)',
                transition: 'gap 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.gap = '12px'}
                onMouseLeave={e => e.currentTarget.style.gap = '6px'}
              >
                Voir tout <ArrowRight size={14} />
              </Link>
            </div>

            {/* Products grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 24,
            }}>
              {featuredByCategory[key].map((product, i) => (
                <div key={product.id} style={{ animation: `fadeUp 0.6s ${i * 0.1}s both` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA banner */}
      <section style={{
        background: 'var(--red)', padding: '60px 0', textAlign: 'center',
      }}>
        <div className="container">
          <p style={{
            fontFamily: 'var(--font-condensed)', fontSize: 13, letterSpacing: 4,
            textTransform: 'uppercase', opacity: 0.8, marginBottom: 12,
          }}>
            Service client disponible 7j/7
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 64px)',
            letterSpacing: 2, marginBottom: 24,
          }}>
            UNE QUESTION ? ON EST LÀ.
          </h2>
          <a
            href={`https://wa.me/221771018557?text=${encodeURIComponent("Bonjour CTK&BM ! Je souhaite plus d'informations.")}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: '#fff', color: 'var(--red)',
              padding: '16px 36px',
              fontFamily: 'var(--font-condensed)', fontSize: 15, fontWeight: 700, letterSpacing: 2,
              textTransform: 'uppercase',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Nous contacter sur WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
