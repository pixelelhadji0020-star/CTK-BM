import React from 'react';
import { MessageCircle } from 'lucide-react';
import { formatPrice, buildWhatsAppUrl } from '../data/products';

export default function ProductCard({ product }) {
  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      cursor: 'default',
      position: 'relative',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'var(--red)';
        e.currentTarget.style.boxShadow = '0 12px 40px var(--red-glow)';
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
          position: 'absolute', top: 12, left: 12, zIndex: 2,
          background: 'var(--red)', color: '#fff',
          fontFamily: 'var(--font-condensed)', fontSize: 11, fontWeight: 700,
          letterSpacing: 2, textTransform: 'uppercase',
          padding: '3px 10px',
        }}>
          {product.badge}
        </div>
      )}

      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 220 }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(6,6,6,0.6) 0%, transparent 50%)',
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3 style={{
          fontFamily: 'var(--font-condensed)', fontSize: 20, fontWeight: 700,
          letterSpacing: 1, lineHeight: 1.2, color: 'var(--white)',
        }}>
          {product.name}
        </h3>

        {/* Price */}
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--red)',
          letterSpacing: 1,
        }}>
          {formatPrice(product.price)}
        </div>

        {/* Specs */}
        <ul style={{ listStyle: 'none', flex: 1 }}>
          {product.specs.map((spec, i) => (
            <li key={i} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '5px 0',
              borderBottom: i < product.specs.length - 1 ? '1px solid var(--border)' : 'none',
              fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--grey-light)',
            }}>
              <span style={{ width: 5, height: 5, background: 'var(--red)', borderRadius: '50%', flexShrink: 0 }} />
              {spec}
            </li>
          ))}
        </ul>

        {/* WhatsApp button */}
        <a
          href={buildWhatsAppUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: 'var(--red)', color: '#fff',
            padding: '13px 0',
            fontFamily: 'var(--font-condensed)', fontSize: 15, fontWeight: 700,
            letterSpacing: 2, textTransform: 'uppercase',
            transition: 'background 0.2s, transform 0.1s',
            marginTop: 8,
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <MessageCircle size={16} />
          Commander sur WhatsApp
        </a>
      </div>
    </div>
  );
}
