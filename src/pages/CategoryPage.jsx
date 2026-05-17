import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getProducts, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!CATEGORIES[category]) return;
    getProducts().then(all => {
      setProducts(all.filter(p => p.category === category));
      setLoading(false);
    });
  }, [category]);

  if (!CATEGORIES[category]) return <Navigate to="/" replace />;
  const { label } = CATEGORIES[category];

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--black)' }}>

      {/* Header section */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        padding: '52px 24px 40px',
        background: 'var(--deep)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Texte décoratif en fond */}
        <div style={{
          position: 'absolute', right: -10, top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(80px, 20vw, 160px)',
          color: 'rgba(255,255,255,0.025)',
          letterSpacing: -4, userSelect: 'none',
          pointerEvents: 'none', lineHeight: 1,
          whiteSpace: 'nowrap',
        }}>
          {label.toUpperCase()}
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb */}
          <div style={{
            fontFamily: 'var(--font-condensed)', fontSize: 11,
            letterSpacing: 3, textTransform: 'uppercase',
            color: 'var(--grey)', marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span>CTK&BM</span>
            <span style={{ color: 'var(--border)' }}>›</span>
            <span style={{ color: 'var(--gold)' }}>Section {label}</span>
          </div>

          {/* Titre */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 10vw, 72px)',
            letterSpacing: 3, lineHeight: 1,
            color: 'var(--white)',
          }}>
            {label.toUpperCase()}
          </h1>

          {/* Trait décoratif */}
          <div style={{
            marginTop: 16,
            width: 48, height: 2,
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
            borderRadius: 2,
          }} />
        </div>
      </div>

      {/* Produits */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 60px' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '3px solid var(--border)', borderTopColor: 'var(--gold)',
              animation: 'spin 0.8s linear infinite',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : products.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 0',
            color: 'var(--grey)',
          }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 18,
              letterSpacing: 3, textTransform: 'uppercase',
              marginBottom: 10,
            }}>
              Aucun produit disponible
            </div>
            <div style={{
              width: 40, height: 1,
              background: 'var(--border)',
              margin: '0 auto',
            }} />
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: 20,
          }}>
            {products.map((product, i) => (
              <div key={product.id} style={{ animation: `fadeUp 0.4s ${i * 0.06}s both` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
