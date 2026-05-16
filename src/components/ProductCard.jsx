import React, { useState } from 'react';
import { MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPrice, buildWhatsAppUrl } from '../data/products';

// Couleurs prédéfinies disponibles (admin peut en ajouter via les specs)
const COLOR_MAP = {
  'noir': '#1a1a1a', 'black': '#1a1a1a',
  'blanc': '#f5f5f5', 'white': '#f5f5f5',
  'rouge': '#e63030', 'red': '#e63030',
  'bleu': '#2563eb', 'blue': '#2563eb',
  'vert': '#16a34a', 'green': '#16a34a',
  'jaune': '#eab308', 'yellow': '#eab308',
  'orange': '#ea580c',
  'rose': '#ec4899', 'pink': '#ec4899',
  'violet': '#7c3aed', 'purple': '#7c3aed',
  'gris': '#6b7280', 'grey': '#6b7280', 'gray': '#6b7280',
  'marron': '#92400e', 'brown': '#92400e',
  'or': '#C9A84C', 'gold': '#C9A84C',
  'argent': '#9ca3af', 'silver': '#9ca3af',
  'beige': '#d4b896',
  'cognac': '#92400e',
  'titane': '#8a9ba8', 'titanium': '#8a9ba8',
  'naturel': '#d4c5a9',
  'nacré': '#e8e0d0',
};

function extractColors(specs) {
  // Cherche une spec contenant "coloris", "couleur", "color"
  const colorSpec = specs?.find(s =>
    /coloris|couleur|color/i.test(s)
  );
  if (!colorSpec) return [];

  // Extrait les couleurs listées après le ":"
  const part = colorSpec.includes(':') ? colorSpec.split(':')[1] : colorSpec;
  const words = part.toLowerCase().split(/[,/\s&+]+/).map(w => w.trim()).filter(Boolean);

  const found = [];
  for (const word of words) {
    if (COLOR_MAP[word]) {
      found.push({ name: word, hex: COLOR_MAP[word] });
    }
  }
  return found;
}

export default function ProductCard({ product }) {
  const images = product.images?.length ? product.images : (product.image ? [product.image] : []);
  const [current, setCurrent] = useState(0);
  const colors = extractColors(product.specs);

  function prev(e) {
    e.stopPropagation();
    setCurrent(i => (i - 1 + images.length) % images.length);
  }
  function next(e) {
    e.stopPropagation();
    setCurrent(i => (i + 1) % images.length);
  }

  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 16, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
      WebkitTapHighlightColor: 'transparent',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.45)';
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(201,168,76,0.08)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* ── CAROUSEL ── */}
      <div style={{ position: 'relative', height: 220, overflow: 'hidden', background: '#0a0a0a', flexShrink: 0 }}>

        {/* Slides */}
        <div style={{
          display: 'flex', height: '100%',
          width: `${images.length * 100}%`,
          transform: `translateX(-${current * (100 / images.length)}%)`,
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}>
          {images.map((src, i) => (
            <div key={i} style={{ width: `${100 / images.length}%`, height: '100%', flexShrink: 0 }}>
              <img src={src} alt={`${product.name} ${i + 1}`} style={{
                width: '100%', height: '100%', objectFit: 'cover',
              }} />
            </div>
          ))}
        </div>

        {/* Gradient */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(6,6,6,0.7) 0%, transparent 50%)',
        }} />

        {/* Badge */}
        {product.badge && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
            color: '#000', fontFamily: 'var(--font-condensed)',
            fontSize: 10, fontWeight: 700, letterSpacing: 2,
            textTransform: 'uppercase', padding: '4px 10px', borderRadius: 99,
          }}>
            {product.badge}
          </div>
        )}

        {/* Compteur photos */}
        {images.length > 1 && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            color: 'var(--gold-light)',
            fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: 1,
            padding: '3px 9px', borderRadius: 99,
          }}>
            {current + 1}/{images.length}
          </div>
        )}

        {/* Flèches */}
        {images.length > 1 && (
          <>
            <button onClick={prev} style={{
              position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)', color: '#fff',
              width: 32, height: 32, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)', zIndex: 2,
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.6)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
            >
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)', color: '#fff',
              width: 32, height: 32, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)', zIndex: 2,
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.6)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div style={{
            position: 'absolute', bottom: 12, left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', gap: 5, zIndex: 2,
          }}>
            {images.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setCurrent(i); }} style={{
                width: i === current ? 18 : 6, height: 6,
                borderRadius: 3,
                background: i === current ? 'var(--gold-light)' : 'rgba(255,255,255,0.3)',
                transition: 'width 0.3s, background 0.3s',
                padding: 0,
              }} />
            ))}
          </div>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Nom + Prix */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-condensed)', fontSize: 19,
            fontWeight: 700, letterSpacing: 0.5,
            color: 'var(--white)', lineHeight: 1.2,
          }}>
            {product.name}
          </h3>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 26,
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginTop: 4, letterSpacing: 1,
          }}>
            {formatPrice(product.price)}
          </div>
        </div>

        {/* Couleurs disponibles */}
        {colors.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontFamily: 'var(--font-condensed)', fontSize: 11,
              letterSpacing: 2, textTransform: 'uppercase', color: 'var(--grey-light)',
            }}>
              Coloris
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              {colors.map((c, i) => (
                <div key={i} title={c.name} style={{
                  width: 18, height: 18, borderRadius: '50%',
                  background: c.hex,
                  border: c.hex === '#f5f5f5' || c.hex === '#e8e0d0' || c.hex === '#d4c5a9'
                    ? '1.5px solid rgba(255,255,255,0.2)'
                    : '1.5px solid rgba(255,255,255,0.08)',
                  boxShadow: `0 0 0 2px rgba(201,168,76,0.2)`,
                  transition: 'transform 0.2s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.25)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              ))}
            </div>
          </div>
        )}

        {/* Specs */}
        <ul style={{ listStyle: 'none', flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {product.specs?.map((spec, i) => (
            <li key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 8,
              fontSize: 13, color: 'var(--grey-light)', lineHeight: 1.4,
              paddingBottom: i < product.specs.length - 1 ? 5 : 0,
              borderBottom: i < product.specs.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              <span style={{
                width: 4, height: 4, borderRadius: '50%',
                background: 'var(--gold)', flexShrink: 0, marginTop: 5,
              }} />
              {spec}
            </li>
          ))}
        </ul>

        {/* CTA WhatsApp */}
        <a href={buildWhatsAppUrl(product)}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
            color: '#000', padding: '14px', borderRadius: 10,
            fontFamily: 'var(--font-condensed)', fontSize: 15,
            fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
            transition: 'opacity 0.2s, transform 0.1s', marginTop: 6,
            WebkitTapHighlightColor: 'transparent',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          onTouchStart={e => e.currentTarget.style.opacity = '0.75'}
          onTouchEnd={e => e.currentTarget.style.opacity = '1'}
        >
          <MessageCircle size={16} /> Commander sur WhatsApp
        </a>
      </div>
    </div>
  );
}
