import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { getProducts, seedProducts, CATEGORIES, WHATSAPP_NUMBER } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ prenom: '', nom: '', telephone: '', vehicule: '' });

  useEffect(() => {
    async function init() {
      try {
        await seedProducts();
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Erreur:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const byCategory = Object.keys(CATEGORIES).reduce((acc, key) => {
    acc[key] = Array.isArray(products) ? products.filter(p => p.category === key).slice(0, 3) : [];
    return acc;
  }, {});

  function handleWhatsApp(e) {
    e.preventDefault();
    const { prenom, nom, telephone, vehicule } = formData;
    if (!prenom || !nom || !telephone || !vehicule) return;
    const msg = `Bonjour CTK&BM ! 🚗 Recherche Véhicule sous 48h :\n\nPrénom : ${prenom}\nNom : ${nom}\nTéléphone : ${telephone}\nVéhicule : ${vehicule}`;
    window.open(`https://wa.me/221776729740?text=${encodeURIComponent(msg)}`, '_blank');
  }

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      
      {/* SECTION HERO AVEC LOGO CENTRAL */}
      <section style={{
        position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '120px 24px 60px 24px', overflow: 'hidden', background: '#0a0a0a'
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.05,
          backgroundImage: 'url("/logo-ctkbm.png")', backgroundPosition: 'center',
          backgroundSize: 'contain', backgroundRepeat: 'no-repeat', pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 800, textAlign: 'center' }}>
          
          {/* AFFICHAGE DU LOGO DANS LA PREMIÈRE SECTION */}
          <img 
            src="/logo-ctkbm.png" 
            alt="CTK & BM" 
            style={{
              maxWidth: '200px',
              height: 'auto',
              marginBottom: 28,
              filter: 'drop-shadow(0px 10px 30px rgba(0,0,0,0.7))'
            }}
          />

          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 7vw, 68px)',
            lineHeight: 1.05, letterSpacing: -1, marginBottom: 20, textTransform: 'uppercase'
          }}>
            L'Équilibre Parfait<br/>Du Style & De La Puissance
          </h1>
          <p style={{
            color: 'var(--grey)', fontSize: 'clamp(15px, 2.2vw, 18px)',
            maxWidth: 540, margin: '0 auto 40px auto', lineHeight: 1.6
          }}>
            Votre univers exclusif à Dakar : Véhicules d'exception, Smartphones haut de gamme et Sneakers de collection.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#catalogue" style={{
              background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
              color: '#000', padding: '16px 36px', borderRadius: 99,
              fontFamily: 'var(--font-condensed)', fontSize: 14, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none'
            }}>
              Explorer le catalogue
            </a>
          </div>
        </div>
      </section>

      {/* CATALOGUE */}
      <section id="catalogue" style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--grey)' }}>Chargement...</p>
        ) : (
          Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
            <div key={key} style={{ marginBottom: 80 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 4vw, 32px)', letterSpacing: 1, textTransform: 'uppercase' }}>
                  <span style={{ marginRight: 12, fontSize: '0.8em' }}>{icon}</span>{label}
                </h2>
                <Link to={`/categorie/${key}`} style={{ color: 'var(--gold)', textDecoration: 'none', fontFamily: 'var(--font-condensed)', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Voir tout <ArrowRight size={14} />
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 28 }}>
                {byCategory[key]?.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          ))
        )}
      </section>

      {/* FORMULAIRE 48H */}
      <section id="apropos" style={{ padding: '100px 24px', background: 'var(--card-bg)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--font-condensed)', color: 'var(--gold)', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>Service Premium</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 42px)', letterSpacing: 1, marginTop: 10, marginBottom: 16, textTransform: 'uppercase' }}>
            Recherche sur mesure sous 48H
          </h2>
          <p style={{ color: 'var(--grey)', fontSize: 15, lineHeight: 1.6, marginBottom: 40 }}>
            Vous cherchez un modèle précis ? Laissez vos détails. Notre équipe s'engage à localiser et vous proposer votre véhicule idéal sous 48 heures chronomètre en main.
          </p>

          <form onSubmit={handleWhatsApp} style={{ display: 'flex', flexDirection: 'column', gap: 20, textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-grid">
              <div>
                <input type="text" placeholder="Prénom" required value={formData.prenom} onChange={e => setFormData({...formData, prenom: e.target.value})} style={{ width: '100%', padding: '14px 18px', background: 'var(--bg)', border: '1px solid var(--border)', color: '#fff', borderRadius: 4, fontSize: 14 }} />
              </div>
              <div>
                <input type="text" placeholder="Nom" required value={formData.nom} onChange={e => setFormData({...formData, nom: e.target.value})} style={{ width: '100%', padding: '14px 18px', background: 'var(--bg)', border: '1px solid var(--border)', color: '#fff', borderRadius: 4, fontSize: 14 }} />
              </div>
            </div>
            <input type="tel" placeholder="Votre numéro WhatsApp" required value={formData.telephone} onChange={e => setFormData({...formData, telephone: e.target.value})} style={{ width: '100%', padding: '14px 18px', background: 'var(--bg)', border: '1px solid var(--border)', color: '#fff', borderRadius: 4, fontSize: 14 }} />
            <textarea placeholder="Détails du véhicule (Marque, Modèle, Année, Couleur...)" required value={formData.vehicule} onChange={e => setFormData({...formData, vehicule: e.target.value})} style={{ width: '100%', padding: '14px 18px', background: 'var(--bg)', border: '1px solid var(--border)', color: '#fff', borderRadius: 4, fontSize: 14, minHeight: 120, resize: 'none' }} />
            
            <button type="submit" style={{
              background: 'linear-gradient(90deg, var(--gold), var(--gold-light))', color: '#000',
              padding: '16px', border: 'none', borderRadius: 4, fontFamily: 'var(--font-condensed)',
              fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
            }}>
              <MessageCircle size={16} /> Lancer la recherche
            </button>
          </form>
        </div>
      </section>

      <style>{`
        @media (max-width: 560px) {
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
