import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { getProducts, CATEGORIES, WHATSAPP_NUMBER } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => { setProducts(getProducts()); }, []);

  const byCategory = Object.keys(CATEGORIES).reduce((acc, key) => {
    acc[key] = products.filter(p => p.category === key).slice(0, 3);
    return acc;
  }, {});

  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight: '100svh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 16px 60px',
        position: 'relative', overflow: 'hidden',
        background: 'var(--black)',
      }}>
        {/* Subtle radial glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(37,211,102,0.06) 0%, transparent 70%)',
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 560, width: '100%' }}>
          {/* Pill badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid rgba(37,211,102,0.3)',
            background: 'rgba(37,211,102,0.06)',
            padding: '6px 16px', borderRadius: 99,
            marginBottom: 28,
            animation: 'fadeUp 0.5s 0.1s both',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
            <span style={{
              fontFamily: 'var(--font-condensed)', fontSize: 12,
              letterSpacing: 3, textTransform: 'uppercase', color: 'var(--green)',
            }}>
              Dakar, Sénégal
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 15vw, 96px)',
            lineHeight: 0.95, letterSpacing: 2,
            marginBottom: 20,
            animation: 'fadeUp 0.6s 0.2s both',
          }}>
            CTK<span style={{ color: 'var(--green)' }}>&</span>BM
          </h1>

          <p style={{
            color: 'var(--grey-light)', fontSize: 'clamp(15px, 4vw, 18px)',
            lineHeight: 1.65, maxWidth: 400, margin: '0 auto 36px',
            animation: 'fadeUp 0.6s 0.3s both',
          }}>
            Téléphones, voitures et chaussures de qualité — commandez directement sur WhatsApp.
          </p>

          {/* Category pills */}
          <div style={{
            display: 'flex', gap: 10, justifyContent: 'center',
            flexWrap: 'wrap', marginBottom: 32,
            animation: 'fadeUp 0.6s 0.4s both',
          }}>
            {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
              <Link key={key} to={`/categorie/${key}`} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '10px 20px', borderRadius: 99,
                border: '1px solid var(--border)',
                background: 'var(--card)',
                fontFamily: 'var(--font-condensed)', fontSize: 15,
                letterSpacing: 1.5, textTransform: 'uppercase',
                color: 'var(--off-white)',
                transition: 'border-color 0.2s, background 0.2s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--green)';
                  e.currentTarget.style.background = 'rgba(37,211,102,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.background = 'var(--card)';
                }}
              >
                {icon} {label}
              </Link>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div style={{ animation: 'fadeUp 0.6s 0.5s both' }}>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour CTK&BM ! Je souhaite passer une commande.")}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'var(--green)', color: '#000',
                padding: '15px 32px', borderRadius: 99,
                fontFamily: 'var(--font-condensed)', fontSize: 16,
                fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
                transition: 'background 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--green-dark)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--green)'}
            >
              <MessageCircle size={18} /> Nous contacter
            </a>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
        <section key={key} style={{ padding: '64px 0' }}>
          <div className="container">
            {/* Header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'flex-end', marginBottom: 28,
              borderBottom: '1px solid var(--border)', paddingBottom: 16,
            }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-condensed)', fontSize: 11,
                  letterSpacing: 4, textTransform: 'uppercase',
                  color: 'var(--green)', marginBottom: 4,
                }}>
                  {icon} Sélection
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 8vw, 52px)', letterSpacing: 2,
                }}>
                  {label.toUpperCase()}
                </h2>
              </div>
              <Link to={`/categorie/${key}`} style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontFamily: 'var(--font-condensed)', fontSize: 13,
                letterSpacing: 2, textTransform: 'uppercase',
                color: 'var(--green)',
                transition: 'gap 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                onMouseLeave={e => e.currentTarget.style.gap = '5px'}
              >
                Tout voir <ArrowRight size={14} />
              </Link>
            </div>

            {/* Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: 20,
            }}>
              {byCategory[key].map((product, i) => (
                <div key={product.id}
                  style={{ animation: `fadeUp 0.5s ${i * 0.08}s both` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* BOTTOM BANNER */}
      <section style={{
        background: 'var(--green)', padding: '52px 16px',
        textAlign: 'center',
      }}>
        <div className="container">
          <p style={{
            fontFamily: 'var(--font-condensed)', fontSize: 12,
            letterSpacing: 4, textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.6)', marginBottom: 10,
          }}>
            Service client 7j/7
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 8vw, 56px)',
            color: '#000', letterSpacing: 2, marginBottom: 24,
          }}>
            UNE QUESTION ? ON EST LÀ.
          </h2>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour CTK&BM ! J'ai une question.")}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: '#000', color: 'var(--green)',
              padding: '15px 32px', borderRadius: 99,
              fontFamily: 'var(--font-condensed)', fontSize: 15,
              fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <MessageCircle size={17} /> Écrire sur WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
