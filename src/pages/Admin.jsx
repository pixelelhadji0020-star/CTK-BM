import React, { useState, useEffect } from 'react';
import { getProducts, saveProducts, defaultProducts, CATEGORIES, formatPrice } from '../data/products';
import { Plus, Pencil, Trash2, X, Check, Lock, LogOut, Package, RefreshCw } from 'lucide-react';

const ADMIN_PASSWORD = 'ctkbm2024';

const emptyForm = {
  id: '',
  category: 'telephones',
  name: '',
  price: '',
  image: '',
  specs: ['', '', '', '', ''],
  badge: '',
};

function Input({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontFamily: 'var(--font-condensed)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--grey)' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          background: 'var(--black)', border: '1px solid var(--border)', color: 'var(--white)',
          padding: '10px 14px', fontSize: 14,
          outline: 'none', transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--red)'}
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

  useEffect(() => {
    if (authenticated) {
      setProducts(getProducts());
    }
  }, [authenticated]);

  function handleLogin() {
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setPasswordInput('');
    }
  }

  function persist(updated) {
    saveProducts(updated);
    setProducts(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleSubmit() {
    if (!form.name || !form.price || !form.image) return;
    const cleanSpecs = form.specs.filter(s => s.trim());
    const product = {
      ...form,
      price: Number(form.price),
      specs: cleanSpecs,
      badge: form.badge.trim() || null,
      id: editing ? form.id : `${form.category}-${Date.now()}`,
    };
    let updated;
    if (editing) {
      updated = products.map(p => p.id === product.id ? product : p);
    } else {
      updated = [...products, product];
    }
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
    const updated = products.filter(p => p.id !== id);
    persist(updated);
    setDeleteConfirm(null);
  }

  function handleReset() {
    persist(defaultProducts);
  }

  const filtered = products.filter(p => p.category === activeCategory);

  if (!authenticated) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--black)',
        backgroundImage: 'radial-gradient(ellipse 600px 400px at 50% 50%, rgba(230,48,48,0.07) 0%, transparent 70%)',
      }}>
        <div style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          padding: 48, width: '100%', maxWidth: 400,
          animation: 'fadeUp 0.5s ease',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              width: 56, height: 56, background: 'var(--red)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
              clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
            }}>
              <Lock size={22} color="#fff" />
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, letterSpacing: 4 }}>
              ADMIN PANEL
            </h1>
            <p style={{ color: 'var(--grey)', fontSize: 13, marginTop: 6 }}>CTK&BM — Accès restreint</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input
              label="Mot de passe"
              value={passwordInput}
              onChange={setPasswordInput}
              type="password"
              placeholder="••••••••"
            />
            {passwordError && (
              <p style={{ color: 'var(--red)', fontSize: 12, fontFamily: 'var(--font-condensed)', letterSpacing: 1 }}>
                Mot de passe incorrect
              </p>
            )}
            <button
              onClick={handleLogin}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{
                background: 'var(--red)', color: '#fff',
                padding: '14px', marginTop: 8,
                fontFamily: 'var(--font-condensed)', fontSize: 15, fontWeight: 700,
                letterSpacing: 2, textTransform: 'uppercase',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.target.style.background = 'var(--red-dark)'}
              onMouseLeave={e => e.target.style.background = 'var(--red)'}
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)', paddingTop: 0 }}>
      {/* Admin Header */}
      <div style={{
        background: 'var(--deep)', borderBottom: '1px solid var(--border)',
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: 3,
          }}>
            CTK<span style={{ color: 'var(--red)' }}>&</span>BM
            <span style={{ fontFamily: 'var(--font-condensed)', fontSize: 13, letterSpacing: 3, color: 'var(--grey)', marginLeft: 12 }}>
              ADMIN
            </span>
          </div>
          {saved && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.3)',
              padding: '4px 12px',
              fontFamily: 'var(--font-condensed)', fontSize: 12, letterSpacing: 2, color: '#25D366',
              animation: 'fadeIn 0.3s ease',
            }}>
              <Check size={12} />
              Sauvegardé
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={handleReset}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              border: '1px solid var(--border)', color: 'var(--grey)',
              padding: '8px 14px',
              fontFamily: 'var(--font-condensed)', fontSize: 12, letterSpacing: 1,
              transition: 'all 0.2s',
            }}
            title="Remettre les produits par défaut"
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--grey)'; e.currentTarget.style.color = 'var(--white)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--grey)'; }}
          >
            <RefreshCw size={13} /> Réinitialiser
          </button>
          <button
            onClick={() => setAuthenticated(false)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              border: '1px solid var(--border)', color: 'var(--grey)',
              padding: '8px 14px',
              fontFamily: 'var(--font-condensed)', fontSize: 12, letterSpacing: 1,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'var(--red)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--grey)'; }}
          >
            <LogOut size={13} /> Déconnexion
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 24px' }}>
        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 36,
        }}>
          {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
            <div key={key} style={{
              background: 'var(--card)', border: `1px solid ${activeCategory === key ? 'var(--red)' : 'var(--border)'}`,
              padding: '20px 24px',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
              onClick={() => setActiveCategory(key)}
            >
              <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: key === activeCategory ? 'var(--red)' : 'var(--white)' }}>
                {products.filter(p => p.category === key).length}
              </div>
              <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 12, letterSpacing: 2, color: 'var(--grey)', textTransform: 'uppercase' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Category tabs + Add button */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 28, flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
              <button key={key} onClick={() => setActiveCategory(key)} style={{
                padding: '8px 20px',
                fontFamily: 'var(--font-condensed)', fontSize: 14, letterSpacing: 2, textTransform: 'uppercase',
                background: activeCategory === key ? 'var(--red)' : 'transparent',
                color: activeCategory === key ? '#fff' : 'var(--grey)',
                border: '1px solid',
                borderColor: activeCategory === key ? 'var(--red)' : 'var(--border)',
                transition: 'all 0.2s',
              }}>
                {icon} {label}
              </button>
            ))}
          </div>
          <button
            onClick={() => { setForm({ ...emptyForm, category: activeCategory }); setEditing(false); setShowForm(true); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'var(--red)', color: '#fff',
              padding: '10px 22px',
              fontFamily: 'var(--font-condensed)', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.target.style.background = 'var(--red-dark)'}
            onMouseLeave={e => e.target.style.background = 'var(--red)'}
          >
            <Plus size={16} /> Ajouter
          </button>
        </div>

        {/* Products table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '60px 0',
              border: '2px dashed var(--border)',
              color: 'var(--grey)', fontFamily: 'var(--font-condensed)', fontSize: 16, letterSpacing: 2,
            }}>
              <Package size={32} style={{ marginBottom: 12, opacity: 0.4, display: 'block', margin: '0 auto 12px' }} />
              Aucun produit — Cliquez sur « Ajouter »
            </div>
          ) : filtered.map(product => (
            <div key={product.id} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              padding: '16px 20px',
              display: 'flex', alignItems: 'center', gap: 16,
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(230,48,48,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              {/* Image */}
              <img src={product.image} alt={product.name} style={{
                width: 64, height: 64, objectFit: 'cover', flexShrink: 0,
              }} />

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 16, fontWeight: 700 }}>
                  {product.name}
                  {product.badge && (
                    <span style={{
                      marginLeft: 8, background: 'var(--red)', color: '#fff',
                      fontSize: 10, letterSpacing: 1, textTransform: 'uppercase',
                      padding: '2px 7px', fontFamily: 'var(--font-condensed)',
                    }}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div style={{ color: 'var(--red)', fontFamily: 'var(--font-display)', fontSize: 18, marginTop: 2 }}>
                  {formatPrice(product.price)}
                </div>
                <div style={{ color: 'var(--grey)', fontSize: 12, marginTop: 2 }}>
                  {product.specs.slice(0, 2).join(' · ')}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => handleEdit(product)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    border: '1px solid var(--border)', color: 'var(--grey-light)',
                    padding: '8px 14px',
                    fontFamily: 'var(--font-condensed)', fontSize: 12, letterSpacing: 1,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--white)'; e.currentTarget.style.color = 'var(--white)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--grey-light)'; }}
                >
                  <Pencil size={13} /> Modifier
                </button>
                {deleteConfirm === product.id ? (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={() => handleDelete(product.id)}
                      style={{
                        background: 'var(--red)', color: '#fff',
                        padding: '8px 12px', fontSize: 12,
                        fontFamily: 'var(--font-condensed)', letterSpacing: 1,
                      }}
                    >
                      Confirmer
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      style={{
                        border: '1px solid var(--border)', color: 'var(--grey)',
                        padding: '8px 10px',
                      }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(product.id)}
                    style={{
                      border: '1px solid var(--border)', color: 'var(--grey)',
                      padding: '8px 10px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'var(--red)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--grey)'; }}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24,
          animation: 'fadeIn 0.2s ease',
        }}
          onClick={e => e.target === e.currentTarget && setShowForm(false)}
        >
          <div style={{
            background: 'var(--deep)', border: '1px solid var(--border)',
            width: '100%', maxWidth: 560,
            maxHeight: '90vh', overflowY: 'auto',
            animation: 'fadeUp 0.3s ease',
          }}>
            {/* Modal header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '20px 24px', borderBottom: '1px solid var(--border)',
              position: 'sticky', top: 0, background: 'var(--deep)', zIndex: 2,
            }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, letterSpacing: 2 }}>
                {editing ? 'MODIFIER LE PRODUIT' : 'AJOUTER UN PRODUIT'}
              </h2>
              <button onClick={() => setShowForm(false)} style={{ color: 'var(--grey)' }}>
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Category */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontFamily: 'var(--font-condensed)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--grey)' }}>
                  Catégorie
                </label>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  style={{
                    background: 'var(--black)', border: '1px solid var(--border)', color: 'var(--white)',
                    padding: '10px 14px', fontSize: 14, outline: 'none',
                  }}
                >
                  {Object.entries(CATEGORIES).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <Input label="Nom du produit *" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Ex: iPhone 15 Pro" />
              <Input label="Prix (FCFA) *" value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} type="number" placeholder="Ex: 650000" />
              <Input label="URL de l'image *" value={form.image} onChange={v => setForm(f => ({ ...f, image: v }))} placeholder="https://..." />
              <Input label="Badge (optionnel)" value={form.badge} onChange={v => setForm(f => ({ ...f, badge: v }))} placeholder="Ex: Nouveau, Premium..." />

              {/* Specs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontFamily: 'var(--font-condensed)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--grey)' }}>
                  Caractéristiques (jusqu'à 5)
                </label>
                {form.specs.map((spec, i) => (
                  <input
                    key={i}
                    type="text"
                    value={spec}
                    onChange={e => {
                      const specs = [...form.specs];
                      specs[i] = e.target.value;
                      setForm(f => ({ ...f, specs }));
                    }}
                    placeholder={`Caractéristique ${i + 1}`}
                    style={{
                      background: 'var(--black)', border: '1px solid var(--border)', color: 'var(--white)',
                      padding: '9px 14px', fontSize: 13, outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--red)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                ))}
              </div>

              {/* Preview image */}
              {form.image && (
                <div>
                  <label style={{ fontFamily: 'var(--font-condensed)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--grey)', display: 'block', marginBottom: 8 }}>
                    Aperçu image
                  </label>
                  <img src={form.image} alt="" style={{ width: '100%', height: 160, objectFit: 'cover', border: '1px solid var(--border)' }}
                    onError={e => e.target.style.display = 'none'} />
                </div>
              )}

              {/* Submit */}
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button
                  onClick={handleSubmit}
                  style={{
                    flex: 1, background: 'var(--red)', color: '#fff',
                    padding: '14px',
                    fontFamily: 'var(--font-condensed)', fontSize: 15, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'background 0.2s',
                    opacity: (!form.name || !form.price || !form.image) ? 0.5 : 1,
                  }}
                  disabled={!form.name || !form.price || !form.image}
                  onMouseEnter={e => { if (form.name && form.price && form.image) e.target.style.background = 'var(--red-dark)'; }}
                  onMouseLeave={e => e.target.style.background = 'var(--red)'}
                >
                  <Check size={16} />
                  {editing ? 'Enregistrer les modifications' : 'Ajouter le produit'}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  style={{
                    border: '1px solid var(--border)', color: 'var(--grey)',
                    padding: '14px 20px',
                    fontFamily: 'var(--font-condensed)', fontSize: 14, letterSpacing: 1,
                  }}
                >
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
