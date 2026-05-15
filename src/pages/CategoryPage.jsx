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
  const { label, icon } = CATEGORIES[category];

  const Spinner = () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        border: '3px solid var(--border)', borderTopColor: 'var(--gold)',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ paddingTop: 60 }}>
      <div style={{
        background: 'var(--deep)', borderBottom: '1px solid var(--border)',
        padding: '48px 16px 36px', textAlign: 'center',
      }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>{icon}</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 12vw, 80px)', letterSpacing: 3, lineHeight: 1 }}>
          {label.toUpperCase()}
        </h1>
        {!loading && (
          <p style={{ color: 'var(--grey)', marginTop: 10, fontFamily: 'var(--font-condensed)', fontSize: 14, letterSpacing: 1 }}>
            {products.length} produit{products.length !== 1 ? 's' : ''} disponible{products.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="container" style={{ padding: '40px 16px 60px' }}>
        {loading ? <Spinner /> : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--grey)', fontFamily: 'var(--font-condensed)', fontSize: 16, letterSpacing: 2 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
            Aucun produit disponible
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 20 }}>
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
