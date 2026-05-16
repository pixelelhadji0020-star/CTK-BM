import React, { useEffect, useState, useRef } from 'react';
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
    const msg = `Bonjour CTK&BM ! 🚗

Je souhaite trouver un véhicule spécifique.

👤 Prénom : ${prenom}
👤 Nom : ${nom}
📞 Téléphone : ${telephone}
🚘 Véhicule souhaité : ${vehicule}

Merci de me recontacter dans les 48h. 🙏`;
    window.open(`https://wa.me/221776729740?text=${encodeURIComponent(msg)}`, '_blank');
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexDirection: 'column', gap: 16,
      background: 'var(--black)',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: '3px solid var(--border)', borderTopColor: 'var(--gold)',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ fontFamily: 'var(--font-condensed)', fontSize: 13, letterSpacing: 3, color: 'var(--grey)', textTransform: 'uppercase' }}>
        Chargement...
      </p>
    </div>
  );

  return (
    <div>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100svh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '80px 20px 60px',
        position: 'relative', overflow: 'hidden',
        background: 'var(--black)',
      }}>
        {/* Logo géant en arrière-plan */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', zIndex: 0,
        }}>
          <img src="/logo.png" alt=""
            style={{
              width: 'min(70vw, 480px)', height: 'min(70vw, 480px)',
              objectFit: 'cover', borderRadius: '50%',
              opacity: 0.06,
              filter: 'grayscale(100%)',
            }}
            onError={e => e.target.style.display = 'none'}
          />
        </div>

        {/* Radial gold glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse 65% 55% at 50% 55%, rgba(201,168,76,0.09) 0%, transparent 70%)',
        }} />

        {/* Contenu */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 560, width: '100%' }}>

          {/* Logo visible centré */}
          <div style={{
            display: 'flex', justifyContent: 'center', marginBottom: 24,
            animation: 'fadeUp 0.5s 0.05s both',
          }}>
            <div style={{
              width: 90, height: 90, borderRadius: '50%',
              border: '2px solid rgba(201,168,76,0.4)',
              overflow: 'hidden',
              boxShadow: '0 0 32px rgba(201,168,76,0.15)',
            }}>
              <img src="/logo.png" alt="CTK&BM" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => e.target.style.display = 'none'} />
            </div>
          </div>

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid rgba(201,168,76,0.35)',
            background: 'rgba(201,168,76,0.06)',
            padding: '5px 16px', borderRadius: 99, marginBottom: 20,
            animation: 'fadeUp 0.5s 0.1s both',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold-light)' }}>
              Business & Trading — Dakar
            </span>
          </div>

          {/* Titre */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 16vw, 96px)',
            lineHeight: 0.95, letterSpacing: 2, marginBottom: 8,
            animation: 'fadeUp 0.6s 0.2s both',
          }}>
            CTK<span style={{
              background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>&</span>BM
          </h1>

          {/* Sous-titre */}
          <p style={{
            fontFamily: 'var(--font-condensed)', fontSize: 14,
            letterSpacing: 4, textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: 16,
            animation: 'fadeUp 0.6s 0.25s both',
          }}>
            Business & Trading
          </p>

          <p style={{
            color: 'var(--grey-light)', fontSize: 'clamp(14px, 3.5vw, 16px)',
            lineHeight: 1.75, maxWidth: 360, margin: '0 auto 32px',
            animation: 'fadeUp 0.6s 0.3s both',
          }}>
            Téléphones, voitures et chaussures de qualité — trouvez ce que vous cherchez et commandez directement sur WhatsApp.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: 12, justifyContent: 'center',
            flexWrap: 'wrap', animation: 'fadeUp 0.6s 0.4s both',
          }}>
            <a href="#catalogue" onClick={e => { e.preventDefault(); document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                color: '#000', padding: '14px 28px', borderRadius: 99,
                fontFamily: 'var(--font-condensed)', fontSize: 15,
                fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
                transition: 'opacity 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Voir le catalogue <ArrowRight size={15} />
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour CTK&BM !")}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid rgba(201,168,76,0.35)',
                background: 'rgba(201,168,76,0.06)',
                color: 'var(--gold-light)', padding: '14px 28px', borderRadius: 99,
                fontFamily: 'var(--font-condensed)', fontSize: 15,
                fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.06)'}
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          animation: 'fadeIn 1s 1s both',
        }}>
          <div style={{
            width: 1, height: 36,
            background: 'linear-gradient(to bottom, var(--gold), transparent)',
          }} />
          <span style={{ fontFamily: 'var(--font-condensed)', fontSize: 9, letterSpacing: 3, color: 'var(--grey)', textTransform: 'uppercase' }}>
            Scroll
          </span>
        </div>
      </section>

      {/* ── CATALOGUE ── */}
      <div id="catalogue" />
      {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
        byCategory[key].length > 0 && (
          <section key={key} style={{ padding: '64px 0' }}>
            <div className="container">
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-end', marginBottom: 28,
                borderBottom: '1px solid var(--border)', paddingBottom: 16,
              }}>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-condensed)', fontSize: 11,
                    letterSpacing: 4, textTransform: 'uppercase',
                    color: 'var(--gold)', marginBottom: 4,
                  }}>
                    {icon} Sélection
                  </div>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(30px, 7vw, 50px)', letterSpacing: 2,
                  }}>
                    {label.toUpperCase()}
                  </h2>
                </div>
                <Link to={`/categorie/${key}`} style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontFamily: 'var(--font-condensed)', fontSize: 13,
                  letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)',
                  transition: 'gap 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '5px'}
                >
                  Tout voir <ArrowRight size={14} />
                </Link>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                gap: 20,
              }}>
                {byCategory[key].map((product, i) => (
                  <div key={product.id} style={{ animation: `fadeUp 0.5s ${i * 0.08}s both` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      ))}

      {/* ── SECTION À PROPOS ── */}
      <section id="apropos" style={{
        padding: '80px 20px',
        background: 'var(--deep)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{
              fontFamily: 'var(--font-condensed)', fontSize: 11,
              letterSpacing: 4, textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: 10,
            }}>
              🚗 Service exclusif
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 7vw, 56px)', letterSpacing: 2, marginBottom: 16,
            }}>
              TROUVEZ VOTRE VÉHICULE
            </h2>
            <p style={{
              color: 'var(--grey-light)', fontSize: 15, lineHeight: 1.8,
              maxWidth: 500, margin: '0 auto',
            }}>
              Vous cherchez un véhicule précis ? Remplissez le formulaire ci-dessous. Notre équipe s'engage à vous trouver le véhicule de vos rêves en <strong style={{ color: 'var(--gold-light)' }}>moins de 48h</strong>.
            </p>
          </div>

          {/* Formulaire */}
          <div style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 20, padding: 'clamp(24px, 5vw, 48px)',
            maxWidth: 560, margin: '0 auto',
          }}>
            {/* Icône */}
            <div style={{
              width: 60, height: 60, borderRadius: 16,
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, marginBottom: 28,
            }}>🚗</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Prénom + Nom */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { key: 'prenom', label: 'Prénom', placeholder: 'Votre prénom' },
                  { key: 'nom', label: 'Nom', placeholder: 'Votre nom' },
                ].map(({ key, label, placeholder }) => (
                  <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{
                      fontFamily: 'var(--font-condensed)', fontSize: 11,
                      letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)',
                    }}>{label}</label>
                    <input
                      type="text" placeholder={placeholder}
                      value={formData[key]}
                      onChange={e => setFormData(f => ({ ...f, [key]: e.target.value }))}
                      style={{
                        background: 'var(--black)', border: '1px solid var(--border)',
                        color: 'var(--white)', padding: '11px 14px', fontSize: 14,
                        borderRadius: 8, outline: 'none', transition: 'border-color 0.2s',
                        width: '100%',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                ))}
              </div>

              {/* Téléphone */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{
                  fontFamily: 'var(--font-condensed)', fontSize: 11,
                  letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)',
                }}>Téléphone</label>
                <input
                  type="tel" placeholder="+221 77 000 00 00"
                  value={formData.telephone}
                  onChange={e => setFormData(f => ({ ...f, telephone: e.target.value }))}
                  style={{
                    background: 'var(--black)', border: '1px solid var(--border)',
                    color: 'var(--white)', padding: '11px 14px', fontSize: 14,
                    borderRadius: 8, outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* Véhicule */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{
                  fontFamily: 'var(--font-condensed)', fontSize: 11,
                  letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)',
                }}>Véhicule souhaité</label>
                <textarea
                  placeholder="Ex: Toyota Land Cruiser 2020, noir, automatique..."
                  rows={3}
                  value={formData.vehicule}
                  onChange={e => setFormData(f => ({ ...f, vehicule: e.target.value }))}
                  style={{
                    background: 'var(--black)', border: '1px solid var(--border)',
                    color: 'var(--white)', padding: '11px 14px', fontSize: 14,
                    borderRadius: 8, outline: 'none', transition: 'border-color 0.2s',
                    resize: 'vertical',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* Garantie 48h */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: 'rgba(201,168,76,0.06)',
                border: '1px solid rgba(201,168,76,0.2)',
                padding: '12px 16px', borderRadius: 10,
              }}>
                <span style={{ fontSize: 18 }}>⏱️</span>
                <span style={{ fontFamily: 'var(--font-condensed)', fontSize: 13, color: 'var(--gold-light)', letterSpacing: 1 }}>
                  Réponse garantie en moins de 48h
                </span>
              </div>

              {/* Bouton */}
              <button onClick={handleWhatsApp} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                color: '#000', padding: '15px',
                borderRadius: 10,
                fontFamily: 'var(--font-condensed)', fontSize: 16,
                fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                transition: 'opacity 0.2s, transform 0.15s',
                marginTop: 4,
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <MessageCircle size={18} /> Envoyer sur WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANNIÈRE BAS ── */}
      <section style={{
        background: 'linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 50%, var(--gold-light) 100%)',
        padding: '48px 20px', textAlign: 'center',
      }}>
        <div className="container">
          <p style={{
            fontFamily: 'var(--font-condensed)', fontSize: 12,
            letterSpacing: 4, textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.55)', marginBottom: 10,
          }}>Service client 7j/7</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(26px, 7vw, 52px)',
            color: '#000', letterSpacing: 2, marginBottom: 22,
          }}>
            UNE QUESTION ? ON EST LÀ.
          </h2>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour CTK&BM ! J'ai une question.")}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: '#000', color: 'var(--gold-light)',
              padding: '14px 30px', borderRadius: 99,
              fontFamily: 'var(--font-condensed)', fontSize: 15,
              fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.
