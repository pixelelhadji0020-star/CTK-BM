import React, { useState, useEffect, useRef } from 'react';
import { getProducts, saveProducts, defaultProducts, CATEGORIES, formatPrice } from '../data/products';
import { Plus, Pencil, Trash2, X, Check, Lock, LogOut, Package, RefreshCw, ImagePlus } from 'lucide-react';

const ADMIN_PASSWORD = 'ctkbm2024';

const emptyForm = {
  id: '', category: 'telephones', name: '',
  price: '', images: [], specs: ['', '', '', '', ''], badge: '',
};

// Convertit un fichier image en base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function GoldInput({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{
        fontFamily: 'var(--font-condensed)', fontSize: 11,
        letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)',
      }}>
        {label}
      </label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          background: 'var(--black)', border: '1px solid var(--border)',
          color: 'var(--white)', padding: '11px 14px', fontSize: 14,
          borderRadius: 6, outline: 'none', transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--gold)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
      />
    </div>
  );
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('telephones');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saved, setSaved] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (authenticated) setProducts(getProducts());
  }, [authenticated]);

  function persist(updated) {
    saveProducts(updated);
    setProducts(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleLogin() {
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setPasswordInput('');
    }
  }

  // Upload depuis la galerie
  async function handleImagePick(e) {
  const files = Array.from(e.target.files || []);
  if (!files.length) return;
  setImageLoading(true);
  try {
    const newBase64s = await Promise.all(files.map(fileToBase64));
    setForm(f => ({
      ...f,
      images: [...(f.images || []), ...newBase64s].slice(0, 4),
    }));
  } catch {
    alert("Erreur lors du chargement des images.");
  }
  setImageLoading(false);
  e.target.value = '';
}

  function handleSubmit() {
  if (!form.name || !form.price || !form.images?.length) return;
  const product = {
    ...form,
    price: Number(form.price),
    specs: form.specs.filter(s => s.trim()),
    badge: form.badge.trim() || null,
    id: editing ? form.id : `${form.category}-${Date.now()}`,
  };
  const updated = editing
    ? products.map(p => p.id === product.id ? product : p)
    : [...products, product];
  persist(updated);
  setShowForm(false);
  setForm(emptyForm);
  setEditing(false);
}
  function handleEdit(product) {
    setForm({
      ...product,
      price: String(product.price),
      specs: [...product.specs, '', '', '', '', ''].slice(0, 5),
      badge: product.badge || '',
    });
    setEditing(true);
    setShowForm(true);
    setActiveCategory(product.category);
  }

  function handleDelete(id) {
    persist(products.filter(p => p.id !== id));
    setDeleteConfirm(null);
  }

  const filtered = products.filter(p => p.category === activeCategory);

  // ── LOGIN SCREEN ──────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: 16,
        background: 'var(--black)',
        backgroundImage: 'radial-gradient(ellipse 600px 400px at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)',
      }}>
        <div style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 16, padding: '40px 28px',
          width: '100%', maxWidth: 380,
          animation: 'fadeUp 0.4s ease',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{
              width: 52, height: 52,
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
              borderRadius: 12, display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 auto 16px',
            }}>
              <Lock size={22} color="#000" />
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, letterSpacing: 3 }}>
              ADMIN PANEL
            </h1>
            <p style={{ color: 'var(--grey)', fontSize: 13, marginTop: 4 }}>CTK&BM</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <GoldInput label="Mot de passe" value={passwordInput}
              onChange={setPasswordInput} type="password" placeholder="••••••••" />
            {passwordError && (
              <p style={{ color: '#e05252', fontSize: 12, fontFamily: 'var(--font-condensed)', letterSpacing: 1 }}>
                Mot de passe incorrect
              </p>
            )}
            <button onClick={handleLogin}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{
                background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                color: '#000', padding: '13px', marginTop: 6, borderRadius: 8,
                fontFamily: 'var(--font-condensed)', fontSize: 15,
                fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.target.style.opacity = '0.85'}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >
              Connexion
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── ADMIN DASHBOARD ───────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)' }}>

      {/* Header */}
      <div style={{
        background: 'var(--deep)', borderBottom: '1px solid var(--border)',
        padding: '14px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
        flexWrap: 'wrap', gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: 3 }}>
            CTK<span style={{
              background: 'linear-gradient(90deg,var(--gold),var(--gold-light))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>&</span>BM
            <span style={{ fontFamily: 'var(--font-condensed)', fontSize: 12, letterSpacing: 3, color: 'var(--grey)', marginLeft: 8 }}>ADMIN</span>
          </span>
          {saved && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)',
              padding: '3px 10px', borderRadius: 99,
              fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: 2, color: 'var(--gold-light)',
              animation: 'fadeIn 0.3s ease',
            }}>
              <Check size={11} /> Sauvegardé
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => persist(defaultProducts)} style={{
            display: 'flex', alignItems: 'center', gap: 5,
            border: '1px solid var(--border)', color: 'var(--grey)',
            padding: '7px 12px', borderRadius: 6,
            fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: 1,
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--grey)'; }}
          >
            <RefreshCw size={12} /> Réinitialiser
          </button>
          <button onClick={() => setAuthenticated(false)} style={{
            display: 'flex', alignItems: 'center', gap: 5,
            border: '1px solid var(--border)', color: 'var(--grey)',
            padding: '7px 12px', borderRadius: 6,
            fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: 1,
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#e05252'; e.currentTarget.style.color = '#e05252'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--grey)'; }}
          >
            <LogOut size={12} /> Déconnexion
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '28px 16px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 28 }}>
          {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
            <div key={key} onClick={() => setActiveCategory(key)} style={{
              background: 'var(--card)',
              border: `1px solid ${activeCategory === key ? 'var(--gold)' : 'var(--border)'}`,
              borderRadius: 10, padding: '16px',
              cursor: 'pointer', transition: 'border-color 0.2s',
              background: activeCategory === key ? 'rgba(201,168,76,0.05)' : 'var(--card)',
            }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 28,
                color: activeCategory === key ? 'var(--gold-light)' : 'var(--white)',
              }}>
                {products.filter(p => p.category === key).length}
              </div>
              <div style={{
                fontFamily: 'var(--font-condensed)', fontSize: 10,
                letterSpacing: 2, color: 'var(--grey)', textTransform: 'uppercase',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs + Add */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 20,
          flexWrap: 'wrap', gap: 10,
        }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
              <button key={key} onClick={() => setActiveCategory(key)} style={{
                padding: '8px 16px', borderRadius: 8,
                fontFamily: 'var(--font-condensed)', fontSize: 13,
                letterSpacing: 1.5, textTransform: 'uppercase',
                background: activeCategory === key
                  ? 'linear-gradient(90deg, var(--gold), var(--gold-light))'
                  : 'transparent',
                color: activeCategory === key ? '#000' : 'var(--grey)',
                border: `1px solid ${activeCategory === key ? 'transparent' : 'var(--border)'}`,
                transition: 'all 0.2s',
              }}>
                {icon} {label}
              </button>
            ))}
          </div>
          <button onClick={() => {
            setForm({ ...emptyForm, category: activeCategory });
            setEditing(false); setShowForm(true);
          }} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
            color: '#000', padding: '10px 20px', borderRadius: 8,
            fontFamily: 'var(--font-condensed)', fontSize: 14,
            fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
            transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <Plus size={16} /> Ajouter
          </button>
        </div>

        {/* Product list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '60px 0',
              border: '2px dashed var(--border)', borderRadius: 12,
              color: 'var(--grey)',
              fontFamily: 'var(--font-condensed)', fontSize: 14, letterSpacing: 2,
            }}>
              <Package size={28} style={{ margin: '0 auto 10px', opacity: 0.3 }} />
              Aucun produit — Cliquez sur « Ajouter »
            </div>
          ) : filtered.map(product => (
            <div key={product.id} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 14,
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <img src={product.image} alt={product.name} style={{
                width: 58, height: 58, objectFit: 'cover',
                borderRadius: 8, flexShrink: 0,
                border: '1px solid var(--border)',
              }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: 'var(--font-condensed)', fontSize: 15, fontWeight: 700,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {product.name}
                  {product.badge && (
                    <span style={{
                      marginLeft: 8, background: 'var(--gold)', color: '#000',
                      fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase',
                      padding: '2px 6px', borderRadius: 3,
                      fontFamily: 'var(--font-condensed)',
                    }}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 17,
                  background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  marginTop: 2,
                }}>
                  {formatPrice(product.price)}
                </div>
                <div style={{ color: 'var(--grey)', fontSize: 11, marginTop: 2 }}>
                  {product.specs.slice(0, 2).join(' · ')}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => handleEdit(product)} style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  border: '1px solid var(--border)', color: 'var(--grey-light)',
                  padding: '7px 12px', borderRadius: 6,
                  fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: 1,
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--grey-light)'; }}
                >
                  <Pencil size={12} /> Modifier
                </button>
                {deleteConfirm === product.id ? (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => handleDelete(product.id)} style={{
                      background: '#e05252', color: '#fff', padding: '7px 12px',
                      borderRadius: 6, fontSize: 11,
                      fontFamily: 'var(--font-condensed)', letterSpacing: 1,
                    }}>
                      Confirmer
                    </button>
                    <button onClick={() => setDeleteConfirm(null)} style={{
                      border: '1px solid var(--border)', color: 'var(--grey)',
                      padding: '7px 10px', borderRadius: 6,
                    }}>
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirm(product.id)} style={{
                    border: '1px solid var(--border)', color: 'var(--grey)',
                    padding: '7px 10px', borderRadius: 6, transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#e05252'; e.currentTarget.style.color = '#e05252'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--grey)'; }}
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FORM MODAL ── */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          padding: 0, animation: 'fadeIn 0.2s ease',
        }}
          onClick={e => e.target === e.currentTarget && setShowForm(false)}
        >
          {/* Bottom sheet sur mobile, centré sur desktop */}
          <div style={{
            background: 'var(--deep)', borderTop: '1px solid var(--border)',
            borderRadius: '16px 16px 0 0',
            width: '100%', maxWidth: 520,
            maxHeight: '92svh', overflowY: 'auto',
            animation: 'fadeUp 0.3s ease',
          }}>
            {/* Drag handle */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
              <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--border)' }} />
            </div>

            {/* Modal header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 20px 16px',
              position: 'sticky', top: 0, background: 'var(--deep)', zIndex: 2,
              borderBottom: '1px solid var(--border)',
            }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: 2 }}>
                {editing ? 'MODIFIER' : 'AJOUTER'}
              </h2>
              <button onClick={() => setShowForm(false)} style={{ color: 'var(--grey)', padding: 4 }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Catégorie */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{
                  fontFamily: 'var(--font-condensed)', fontSize: 11,
                  letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)',
                }}>Catégorie</label>
                <select value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  style={{
                    background: 'var(--black)', border: '1px solid var(--border)',
                    color: 'var(--white)', padding: '11px 14px', fontSize: 14,
                    borderRadius: 6, outline: 'none',
                  }}>
                  {Object.entries(CATEGORIES).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <GoldInput label="Nom du produit *" value={form.name}
                onChange={v => setForm(f => ({ ...f, name: v }))}
                placeholder="Ex: iPhone 15 Pro" />

              <GoldInput label="Prix (FCFA) *" value={form.price}
                onChange={v => setForm(f => ({ ...f, price: v }))}
                type="number" placeholder="Ex: 650000" />

              {/* IMAGE — bouton galerie + URL */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{
                  fontFamily: 'var(--font-condensed)', fontSize: 11,
                  letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)',
                }}>Image *</label>

                {/* Bouton principal galerie */}
                <input
                  ref={fileInputRef} type="file"
                  accept="image/*"
                  onChange={handleImagePick}
                  style={{ display: 'none' }}
                />
                <button onClick={() => fileInputRef.current?.click()} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  background: imageLoading ? 'rgba(201,168,76,0.1)' : 'rgba(201,168,76,0.08)',
                  border: '2px dashed rgba(201,168,76,0.4)',
                  color: imageLoading ? 'var(--grey)' : 'var(--gold-light)',
                  padding: '18px', borderRadius: 10,
                  fontFamily: 'var(--font-condensed)', fontSize: 15,
                  letterSpacing: 1.5, textTransform: 'uppercase',
                  transition: 'all 0.2s', width: '100%',
                  minHeight: 60,
                }}
                  onMouseEnter={e => { if (!imageLoading) e.currentTarget.style.background = 'rgba(201,168,76,0.14)'; }}
                  onMouseLeave={e => { if (!imageLoading) e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; }}
                >
                  <ImagePlus size={20} />
                  {imageLoading ? 'Chargement...' : 'Choisir depuis la galerie'}
                </button>

                {/* Séparateur OU */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                  <span style={{ color: 'var(--grey)', fontSize: 11, fontFamily: 'var(--font-condensed)', letterSpacing: 2 }}>OU</span>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                </div>

                {/* URL manuelle */}
                <input type="text" value={form.image.startsWith('data:') ? '' : form.image}
                  onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                  placeholder="Coller un lien URL d'image..."
                  style={{
                    background: 'var(--black)', border: '1px solid var(--border)',
                    color: 'var(--white)', padding: '11px 14px', fontSize: 13,
                    borderRadius: 6, outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />

                {/* Preview */}
                {form.image && (
                  <div style={{ position: 'relative' }}>
                    <img src={form.image} alt="aperçu" style={{
                      width: '100%', height: 160, objectFit: 'cover',
                      borderRadius: 8, border: '1px solid var(--border)',
                    }} onError={e => e.target.style.display = 'none'} />
                    <button onClick={() => setForm(f => ({ ...f, image: '' }))} style={{
                      position: 'absolute', top: 8, right: 8,
                      background: 'rgba(0,0,0,0.7)', color: '#fff',
                      borderRadius: '50%', width: 28, height: 28,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              <GoldInput label="Badge (optionnel)" value={form.badge}
                onChange={v => setForm(f => ({ ...f, badge: v }))}
                placeholder="Ex: Nouveau, Premium..." />

              {/* Specs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{
                  fontFamily: 'var(--font-condensed)', fontSize: 11,
                  letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)',
                }}>
                  Caractéristiques (jusqu'à 5)
                </label>
                {form.specs.map((spec, i) => (
                  <input key={i} type="text" value={spec}
                    onChange={e => {
                      const specs = [...form.specs];
                      specs[i] = e.target.value;
                      setForm(f => ({ ...f, specs }));
                    }}
                    placeholder={`Caractéristique ${i + 1}`}
                    style={{
                      background: 'var(--black)', border: '1px solid var(--border)',
                      color: 'var(--white)', padding: '10px 14px', fontSize: 13,
                      borderRadius: 6, outline: 'none', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                ))}
              </div>

              {/* Submit */}
              <div style={{ display: 'flex', gap: 10, paddingBottom: 8 }}>
                <button onClick={handleSubmit}
                  disabled={!form.name || !form.price || !form.image}
                  style={{
                    flex: 1,
                    background: (!form.name || !form.price || !form.image)
                      ? 'var(--border)'
                      : 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                    color: (!form.name || !form.price || !form.image) ? 'var(--grey)' : '#000',
                    padding: '14px', borderRadius: 8,
                    fontFamily: 'var(--font-condensed)', fontSize: 15,
                    fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'opacity 0.2s',
                    cursor: (!form.name || !form.price || !form.image) ? 'not-allowed' : 'pointer',
                  }}
                >
                  <Check size={16} />
                  {editing ? 'Enregistrer' : 'Ajouter'}
                </button>
                <button onClick={() => setShowForm(false)} style={{
                  border: '1px solid var(--border)', color: 'var(--grey)',
                  padding: '14px 18px', borderRadius: 8,
                  fontFamily: 'var(--font-condensed)', fontSize: 13,
                }}>
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
