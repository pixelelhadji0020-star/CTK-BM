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
        console.error('Erreur chargement:', err);
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
    if (!prenom || !nom || !telephone || !vehicule) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    const msg = `Bonjour CTK&BM ! 🚗 Recherche Véhicule sous 48h :\n\nPrénom : ${prenom}\nNom : ${nom}\nTéléphone : ${telephone}\nVéhicule souhaité : ${vehicule}`;
    window.open(`https://wa.me/221776729740?text=${encodeURIComponent(msg)}`, '_blank');
  }

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      
      {/* PREMIÈRE SECTION (HERO SECTION CORRIGÉE AVEC LOGO) */}
      <section style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 20px 60px 20px',
        background: 'radial-gradient(circle at center, rgba(20,20,20,0.4) 0%, #0a0a0a 100%)',
        overflow: 'hidden'
      }}>
        {/* Logo d'arrière-plan en filigrane pour l'ambiance premium */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: '600px',
          height: '100%',
          backgroundImage: 'url("/logo-ctkbm.png")',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          opacity: 0.04,
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <div style={{ zIndex: 1, maxWidth: 800 }}>
          {/* Image du Logo principale bien visible au centre */}
          <img 
            src="/logo-ctkbm.png" 
            alt="CTK & BM" 
            style={{
              maxWidth: '220px',
              height: 'auto',
              marginBottom: 24,
              filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.6))'
            }}
          />

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 6vw, 64px)',
            letterSpacing: 2,
            lineHeight: 1.1,
            marginBottom: 16,
            textTransform: 'uppercase'
          }}>
            L'Équilibre Parfait du Style & de la Puissance
          </h1>
          
          <p style={{
            color: 'var(--grey)',
            fontSize: 'clamp(15px, 2.5vw, 19px)',
            maxWidth: 550,
            margin: '0 auto 36px auto',
            lineHeight: 1.6
          }}>
            Votre univers exclusif à Dakar : Véhicules d'exception, Smartphones haut de gamme et Sneakers de collection.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#catalogue" style={{
              background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
              color: '#000', padding: '14px 32px', borderRadius: 4,
              fontFamily: 'var(--font-condensed)', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: 1.5, textDecoration: 'none'
            }}>
              Explorer le catalogue
            </a>
            <a href="#apropos" style={{
              border: '1px solid var(--border)', color: '#fff',
              padding: '14px 32px', borderRadius: 4,
              fontFamily: 'var(--font-condensed)', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: 1.5, textDecoration: 'none',
              background: 'rgba(255,255,255,0.02)'
            }}>
              Commande personnalisée
            </a>
          </div>
        </div>
      </section>

      {/* SECTION CATALOGUE / MENU */}
      <section id="catalogue" style={{ padding: '60px 20px', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 36, textAlign: 'center',
          marginBottom: 40, letterSpacing: 2
        }}>
          NOTRE MENU PRODUITS
        </h2>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--grey)' }}>Chargement des articles...</p>
        ) : (
          Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
            <div key={key} style={{ marginBottom: 60 }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: '1px solid var(--border)', paddingBottom: 12, marginBottom: 24
              }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span>{icon}</span> {label}
                </h3>
                <Link to={`/categorie/${key}`} style={{
                  color: 'var(--gold)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
                  fontFamily: 'var(--font-condensed)', fontSize: 14, fontWeight: 700, textTransform: 'uppercase'
                }}>
                  Voir tout <ArrowRight size={14} />
                </Link>
              </div>

              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24
              }}>
                {byCategory[key]?.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* SECTION À PROPOS & RECHERCHE DE VÉHICULE (48H GUARANTEE) */}
      <section id="apropos" style={{
        background: 'var(--card-bg)', borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)', padding: '80px 20px'
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 32, letterSpacing: 2, marginBottom: 16
          }}>
            RECHERCHE DE VÉHICULE SUR MESURE
          </h2>
          <p style={{ color: 'var(--grey)', fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
            Vous cherchez un modèle automobile précis introuvable sur le marché ? Laissez-nous vos coordonnées. 
            CTK & BM s'engage à vous trouver le véhicule idéal sous un délai garanti de <strong>48 heures</strong>.
          </p>

          <form onSubmit={handleWhatsApp} style={{
            display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left',
            background: 'var(--bg)', padding: 28, borderRadius: 8, border: '1px solid var(--border)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--grey)', marginBottom: 6, textTransform: 'uppercase' }}>Prénom</label>
                <input type="text" required value={formData.prenom}
                  onChange={e => setFormData({ ...formData, prenom: e.target.value })}
                  style={{ width: '100%', padding: 12, background: 'var(--card-bg)', border: '1px solid var(--border)', color: '#fff', borderRadius: 4 }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--grey)', marginBottom: 6, textTransform: 'uppercase' }}>Nom</label>
                <input type="text" required value={formData.nom}
                  onChange={e => setFormData({ ...formData, nom: e.target.value })}
                  style={{ width: '100%', padding: 12, background: 'var(--card-bg)', border: '1px solid var(--border)', color: '#fff', borderRadius: 4 }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--grey)', marginBottom: 6, textTransform: 'uppercase' }}>Numéro de téléphone</label>
              <input type="tel" required placeholder="Ex: +221 77..." value={formData.telephone}
                onChange={e => setFormData({ ...formData, telephone: e.target.value })}
                style={{ width: '100%', padding: 12, background: 'var(--card-bg)', border: '1px solid var(--border)', color: '#fff', borderRadius: 4 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--grey)', marginBottom: 6, textTransform: 'uppercase' }}>Quel véhicule recherchez-vous ?</label>
              <textarea required placeholder="Ex: BMW X5 M-Sport 2023, Noir, Toit ouvrant..." value={formData.vehicule}
                onChange={e => setFormData({ ...formData, vehicule: e.target.value })}
                style={{ width: '100%', padding: 12, background: 'var(--card-bg)', border: '1px solid var(--border)', color: '#fff', borderRadius: 4, minHeight: 100, resize: 'vertical' }}
              />
            </div>

            <button type="submit" style={{
              background: 'linear-gradient(90deg, var(--gold), var(--gold-light))', color: '#000',
              padding: '14px', border: 'none', borderRadius: 4, fontFamily: 'var(--font-condensed)',
              fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 8
            }}>
              <MessageCircle size={18} /> Lancer la recherche sous 48h
            </button>
          </form>
        </div>
      </section>

      {styleTag}
    </div>
  );
}

// Balise Style isolée pour garder la propreté du code
const styleTag = (
  <style>{`
    @media (max-width: 560px) {
      .form-row {
        grid-template-columns: 1fr !important;
      }
    }
  `}</style>
);
