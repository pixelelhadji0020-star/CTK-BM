import React from 'react';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { formatPrice, buildWhatsAppUrl } from '../data/products';

export default function ProductCard({ product }) {
  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'rgba(37,211,102,0.4)';
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(37,211,102,0.08)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Badge */}
      {product.badge && (
        <div style={{
          position: 'absolute', top: 10, left: 10, zIndex: 2,
          background: 'var(--green)', color: '#000',
          fontFamily: 'var(--font-condensed)', fontSize: 10,
          fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
          padding: '3px 10px', borderRadius: 4,
        }}>
          {product.badge}
        </div>
      )}

      {/* Image */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden', flexShrink: 0 }}>
        <img src={product.image} alt={product.name} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.4s ease',
        }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(5,5,5,0.5) 0%, transparent 55%)',
        }} />
        {product.badge && (
          <div style={{
            position: 'absolute', top: 10, left: 10,
            background: 'var(--green)', color: '#000',
            fontFamily: 'var(--font-condensed)', fontSize: 10,
            fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
            padding: '3px 10px', borderRadius: 4,
          }}>
            {product.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{
        padding: '16px', flex: 1,
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
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
            color: 'var(--green)', marginTop: 6, letterSpacing: 1,
          }}>
            {formatPrice(product.price)}
          </div>
        </div>

        {/* Specs */}
        <ul style={{ listStyle: 'none', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {product.specs.map((spec, i) => (
            <li key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 8,
              fontSize: 13, color: 'var(--grey-light)', lineHeight: 1.4,
            }}>
              <CheckCircle2 size={13}
                style={{ color: 'var(--green)', marginTop: 1, flexShrink: 0 }} />
              {spec}
            </li>
          ))}
        </ul>

        {/* WhatsApp CTA */}
        <a href={buildWhatsAppUrl(product)}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: 'var(--green)', color: '#000',
            padding: '13px',
            borderRadius: 8,
            fontFamily: 'var(--font-condensed)', fontSize: 15,
            fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
            transition: 'background 0.2s, transform 0.1s',
            marginTop: 4,
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--green-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--green)'}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <MessageCircle size={16} />
          Commander
        </a>
      </div>
    </div>
  );
}
