import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getProducts, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const all = getProducts();
    setProducts(all.filter(p => p.category === category));
  }, [category]);

  if (!CATEGORIES[category]) return <Navigate to="/" replace />;

  const { label, icon } = CATEGORIES[category];

  return (
    <div style={{ paddingTop: 68 }}>
      {/* Category Hero */}
      <div style={{
        background: 'var(--deep)',
        borderBottom: '1px solid var(--border)',
        padding: '60px 0 48px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -40, top: '50%', transform: 'translateY(-50%)',
          fontFamily: 'var(--font-display)', fontSize: '18vw',
          color: 'rgba(255,255,255,0.015)', letterSpacing: -10, userSelect: 'none',
          lineHeight: 1,
        }}>
          {label.toUpperCase()}
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            fontFamily: 'var(--font-condensed)', fontSize: 12, letterSpacing: 4,
            textTransform: 'uppercase', color: 'var(--red)', marginBottom: 10,
          }}>
            {icon} Catalogue
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 90px)',
            letterSpacing: 2, lineHeight: 1,
          }}>
            {label.toUpperCase()}
          </h1>
          <p style={{ color: 'var(--grey)', marginTop: 12, fontFamily: 'var(--font-body)', fontSize: 14 }}>
            {products.length} produit{products.length !== 1 ? 's' : ''} disponible{products.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="container" style={{ padding: '60px 24px' }}>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
            <p style={{ color: 'var(--grey)', fontFamily: 'var(--font-condensed)', fontSize: 18, letterSpacing: 2 }}>
              Aucun produit disponible pour le moment
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 28,
          }}>
            {products.map((product, i) => (
              <div key={product.id} style={{ animation: `fadeUp 0.5s ${i * 0.07}s both` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
