import React, { useState } from 'react';
import { MessageCircle, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPrice, buildWhatsAppUrl } from '../data/products';

export default function ProductCard({ product }) {
  const images = product.images || (product.image ? [product.image] : []);
  const [current, setCurrent] = useState(0);

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
      borderRadius: 12, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.45)';
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(201,168,76,0.08)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* ── IMAGE CAROUSEL ── */}
      <div style={{ position: 'relative', height: 220, overflow: 'hidden', flexShrink: 0, background: '#0a0a0a' }}>

        {/* Slides — scroll horizontal superposé */}
        <div style={{
          display: 'flex',
          width: `${images.length * 100}%`,
          height: '100%',
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

        {/* Gradient bas */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(6,6,6,0.6) 0%, transparent 50%)',
        }} />

        {/* Badge */}
        {product.badge && (
          <div style={{
            position: 'absolute', top: 10, left: 10,
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
            color: '#000', fontFamily: 'var(--font-condensed)',
            fontSize: 10, fontWeight: 700, letterSpacing: 2,
            textTransform: 'uppercase', padding: '3px 10px', borderRadius: 4,
          }}>
            {product.badge}
          </div>
        )}

        {/* Flèches (seulement si plusieurs images) */}
        {images.length > 1 && (
          <>
            <button onClick={prev} style={{
              position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.55)', color: '#fff',
              width: 30, height: 30, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              transition: 'background 0.2s',
              zIndex: 2,
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.7)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.55)'}
            >
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} style={{
              position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.55)', color: '#fff',
              width: 30, height: 30, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              transition: 'background 0.2s',
              zIndex: 2,
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.7)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.55)'}
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div style={{
            position: 'absolute', bottom: 10, left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', gap: 5, zIndex: 2,
          }}>
            {images.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setCurrent(i); }} style={{
                width: i === current ? 16 : 6,
                height: 6, borderRadius: 3,
                background: i === current ? 'var(--gold-light)' : 'rgba(255,255,255,0.35)',
                transition: 'width 0.3s, background 0.3s',
                padding: 0,
              }} />
            ))}
          </div>
        )}

        {/* Compteur */}
        {images.length > 1 && (
          <div style={{
            position: 'absolute', top: 10, right: 10,
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
            color: 'var(--gold-light)',
            fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: 1,
            padding: '3px 8px', borderRadius: 99,
          }}>
            {current + 1}/{images.length}
          </div>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-condensed)', fontSize: 18,
            fontWeight: 700, letterSpacing: 0.5,
            color: 'var(--white)', lineHeight: 1.2,
          }}>
            {product.name}
          </h3>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 24,
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginTop: 6, letterSpacing: 1,
          }}>
            {formatPrice(product.price)}
          </div>
        </div>

        <ul style={{ listStyle: 'none', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {product.specs.map((spec, i) => (
            <li key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 8,
              fontSize: 13, color: 'var(--grey-light)', lineHeight: 1.4,
            }}>
              <CheckCircle2 size={13} style={{ color: 'var(--gold)', marginTop: 1, flexShrink: 0 }} />
              {spec}
            </li>
          ))}
        </ul>

        <a href={buildWhatsAppUrl(product)}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
            color: '#000', padding: '13px', borderRadius: 8,
            fontFamily: 'var(--font-condensed)', fontSize: 15,
            fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
            transition: 'opacity 0.2s, transform 0.1s', marginTop: 4,
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <MessageCircle size={16} /> Commander
        </a>
      </div>
    </div>
  );
}
