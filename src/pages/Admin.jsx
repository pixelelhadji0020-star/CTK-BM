import React, { useState, useEffect, useRef } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct, defaultProducts, CATEGORIES, formatPrice } from '../data/products';
import { uploadImage, deleteImage } from '../lib/supabase';
import { Plus, Pencil, Trash2, X, Check, Lock, LogOut, Package, RefreshCw, ImagePlus } from 'lucide-react';

const ADMIN_PASSWORD = 'ctkbm2024';

const emptyForm = {
  id: '', category: 'telephones', name: '',
  price: '', images: [], _pendingFiles: [], specs: ['', '', '', '', ''], badge: '',
};

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
    if (authenticated) reload();
  }, [authenticated]);

  async function reload() {
    const data = await getProducts();
    setProducts(data);
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

  async function handleImagePick(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const currentTotal = (form.images?.length || 0) + (form._pendingFiles?.length || 0);
    if (currentTotal >= 4) return;
    setImageLoading(true);
    try {
      const allowed = files.slice(0, 4 - currentTotal);
      const previews = await Promise.all(allowed.map(fileToBase64));
      const entries = allowed.map((file, i) => ({ preview: previews[i], file }));
      setForm(f => ({
        ...f,
        _pendingFiles: [...(f._pendingFiles || []), ...entries],
      }));
    } catch {
      alert("Erreur lors du chargement des images.");
    }
    setImageLoading(false);
    e.target.value = '';
  }

  async function handleSubmit() {
    const totalImages = (form.images?.length || 0) + (form._pendingFiles?.length || 0);
    if (!form.name || !form.price || totalImages === 0) return;

    setImageLoading(true);
    try {
      let newUrls = [];
      if (form._pendingFiles?.length) {
        newUrls = await Promise.all(
          form._pendingFiles.map(({ file, preview }) =>
            uploadImage(file || preview, file?.name || 'photo')
          )
        );
      }

      const allImages = [...(form.images || []), ...newUrls];

      const product = {
        id: editing ? form.id : `${form.category}-${Date.now()}`,
        category: form.category,
        name: form.name,
        price: Number(form.price),
        images: allImages,
        specs: form.specs.filter(s => s.trim()),
        badge: form.badge.trim() || null,
      };

      if (editing) {
        await updateProduct(product);
      } else {
        await addProduct(product);
      }

      await reload();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      setShowForm(false);
      setForm(emptyForm);
      setEditing(false);
    } catch (e) {
      alert('Erreur upload ou sauvegarde : ' + e.message);
    }
    setImageLoading(false);
  }

  function handleEdit(product) {
    setForm({
      ...product,
      images: product.images || (product.image ? [product.image] : []),
      _pendingFiles: [],
      price: String(product.price),
      specs: [...product.specs, '', '', '', '', ''].slice(0, 5),
      badge: product.badge || '',
    });
    setEditing(true);
    setShowForm(true);
    setActiveCategory(product.category);
  }

  async function handleDelete(id) {
    try {
      const product = products.find(p => p.id === id);
      if (product?.images?.length) {
        await Promise.all(product.images.map(deleteImage));
      }
      await deleteProduct(id);
      await reload();
    } catch (e) {
      alert('Erreur : ' + e.message);
    }
    setDeleteConfirm(null);
  }

  async function handleReset() {
    if (!confirm('Réinitialiser tous les produits ? Les images uploadées seront supprimées.')) return;
    try {
      for (const p of products) {
        if (p.images?.length) await Promise.all(p.images.map(deleteImage));
        await deleteProduct(p.id);
      }
      for (const p of defaultProducts) await addProduct(p);
      await reload();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      alert('Erreur : ' + e.message);
    }
  }

  const filtered = products.filter(p => p.category === activeCategory);
  const totalPending = (form.images?.length || 0) + (form._pendingFiles?.length || 0);
  const canSubmit = form.name && form.price && totalPending > 0;

  // ── LOGIN ─────────────────────────────────────────────────────
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
            <button
              onClick={handleLogin}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{
                background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                color: '#000', padding: '13px', marginTop: 6, borderRadius: 8,
                fontFamily: 'var(--font-condensed)', fontSize: 15,
                fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Connexion
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ─────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)' }}>

      {/* Header */}
      <div style={{
        background: 'var(--deep)', borderBottom: '1px solid var(--border)',
        padding: '14px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50, flexWrap: 'wrap', gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: 3 }}>
            CTK
            <span style={{
              background: 'linear-gradient(90deg,var(--gold),var(--gold-light))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>&</span>
            BM
            <span style={{ fontFamily: 'var(--font-condensed)', fontSize: 12, letterSpacing: 3, color: 'var(--grey)', marginLeft: 8 }}>
              ADMIN
            </span>
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
          <button onClick={handleReset} style={{
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
              background: activeCategory === key ? 'rgba(201,168,76,0.05)' : 'var(--card)',
              border: `1px solid ${activeCategory === key ? 'var(--gold)' : 'var(--border)'}`,
              borderRadius: 10, padding: '16px',
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 28,
                color: activeCategory === key ? 'var(--gold-light)' : 'var(--white)',
              }}>
                {products.filter(p => p.category === key).length}
              </div>
              <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 10, letterSpacing: 2, color: 'var(--grey)', textTransform: 'uppercase' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs + Add */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
              <button key={key} onClick={() => setActiveCategory(key)} style={{
                padding: '8px 16px', borderRadius: 8,
                fontFamily: 'var(--font-condensed)', fontSize: 13,
                letterSpacing: 1.5, textTransform: 'uppercase',
                background: activeCategory === key ? 'linear-gradient(90deg, var(--gold), var(--gold-light))' : 'transparent',
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
            setEditing(false);
            setShowForm(true);
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
              color: 'var(--grey)', fontFamily: 'var(--font-condensed)', fontSize: 14, letterSpacing: 2,
            }}>
              <Package size={28} style={{ margin: '0 auto 10px', opacity: 0.3, display: 'block' }} />
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
              <img src={product.images?.[0]} alt={product.name} style={{
                width: 58, height: 58, objectFit: 'cover',
                borderRadius: 8, flexShrink: 0, border: '1px solid var(--border)',
              }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.name}
                  {product.badge && (
                    <span style={{
                      marginLeft: 8, background: 'var(--gold)', color: '#000',
                      fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase',
                      padding: '2px 6px', borderRadius: 3, fontFamily: 'var(--font-condensed)',
                    }}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 17,
                  background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginTop: 2,
                }}>
                  {formatPrice(product.price)}
                </div>
                <div style={{ color: 'var(--grey)', fontSize: 11, marginTop: 2 }}>
                  {product.specs?.slice(0, 2).join(' · ')}
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
                      borderRadius: 6, fontSize: 11, fontFamily: 'var(--font-condensed)', letterSpacing: 1,
                    }}>
                      Confirmer
                    </button>
                    <button onClick={() => setDeleteConfirm(null)} style={{
                      border: '1px solid var(--border)', color: 'var(--grey)', padding: '7px 10px', borderRadius: 6,
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
          animation: 'fadeIn 0.2s ease',
        }}
          onClick={e => e.target === e.currentTarget && setShowForm(false)}
        >
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
                <label style={{ fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>
                  Catégorie
                </label>
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

              {/* IMAGES */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>
                  Photos * (max 4) — {totalPending}/4
                </label>

                <input ref={fileInputRef} type="file" accept="image/*" multiple
                  onChange={handleImagePick} style={{ display: 'none' }} />

                {/* Aperçus */}
                {totalPending > 0 && (
                  <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>

                    {/* URLs Supabase déjà enregistrées */}
                    {form.images?.map((src, i) => (
                      <div key={`saved-${i}`} style={{ position: 'relative', flexShrink: 0 }}>
                        <img src={src} alt="" style={{
                          width: 80, height: 80, objectFit: 'cover', borderRadius: 8,
                          border: i === 0 && !form._pendingFiles?.length ? '2px solid var(--gold)' : '1px solid var(--border)',
                        }} />
                        <button onClick={() => setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))} style={{
                          position: 'absolute', top: -6, right: -6,
                          background: '#e05252', color: '#fff', borderRadius: '50%',
                          width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <X size={11} />
                        </button>
                        {i === 0 && (
                          <div style={{
                            position: 'absolute', bottom: 4, left: 4,
                            background: 'var(--gold)', color: '#000',
                            fontSize: 8, fontFamily: 'var(--font-condensed)',
                            letterSpacing: 1, padding: '1px 5px', borderRadius: 3,
                          }}>PRINCIPALE</div>
                        )}
                      </div>
                    ))}

                    {/* Fichiers locaux en attente d'upload */}
                    {form._pendingFiles?.map((entry, i) => (
                      <div key={`pending-${i}`} style={{ position: 'relative', flexShrink: 0 }}>
                        <img src={entry.preview} alt="" style={{
                          width: 80, height: 80, objectFit: 'cover', borderRadius: 8,
                          border: '1px solid rgba(201,168,76,0.5)', opacity: 0.85,
                        }} />
                        <div style={{
                          position: 'absolute', inset: 0, borderRadius: 8,
                          background: 'rgba(0,0,0,0.3)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{
                            fontSize: 9, color: 'var(--gold-light)',
                            fontFamily: 'var(--font-condensed)', letterSpacing: 1,
                            background: 'rgba(0,0,0,0.6)', padding: '2px 5px', borderRadius: 3,
                          }}>LOCAL</span>
                        </div>
                        <button onClick={() => setForm(f => ({ ...f, _pendingFiles: f._pendingFiles.filter((_, idx) => idx !== i) }))} style={{
                          position: 'absolute', top: -6, right: -6,
                          background: '#e05252', color: '#fff', borderRadius: '50%',
                          width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <X size={11} />
                        </button>
                      </div>
                    ))}

                    {/* Bouton + ajouter */}
                    {totalPending < 4 && (
                      <button onClick={() => fileInputRef.current?.click()} style={{
                        width: 80, height: 80, flexShrink: 0,
                        border: '2px dashed rgba(201,168,76,0.35)', borderRadius: 8,
                        color: 'var(--gold)',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, gap: 4,
                        fontFamily: 'var(--font-condensed)', letterSpacing: 1,
                        background: 'rgba(201,168,76,0.04)',
                      }}>
                        <ImagePlus size={18} /> Ajouter
                      </button>
                    )}
                  </div>
                )}

                {/* Bouton principal si aucune image */}
                {totalPending === 0 && (
                  <button onClick={() => fileInputRef.current?.click()} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    background: 'rgba(201,168,76,0.08)',
                    border: '2px dashed rgba(201,168,76,0.4)',
                    color: imageLoading ? 'var(--grey)' : 'var(--gold-light)',
                    padding: '20px', borderRadius: 10,
                    fontFamily: 'var(--font-condensed)', fontSize: 15,
                    letterSpacing: 1.5, textTransform: 'uppercase',
                    width: '100%', minHeight: 60,
                  }}>
                    <ImagePlus size={20} />
                    {imageLoading ? 'Chargement...' : 'Choisir depuis la galerie'}
                  </button>
                )}

                {/* OU URL */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                  <span style={{ color: 'var(--grey)', fontSize: 11, fontFamily: 'var(--font-condensed)', letterSpacing: 2 }}>OU URL</span>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input type="text" id="urlInput" placeholder="Coller un lien URL..."
                    style={{
                      flex: 1, background: 'var(--black)', border: '1px solid var(--border)',
                      color: 'var(--white)', padding: '10px 14px', fontSize: 13,
                      borderRadius: 6, outline: 'none',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && e.target.value.trim() && totalPending < 4) {
                        setForm(f => ({ ...f, images: [...(f.images || []), e.target.value.trim()] }));
                        e.target.value = '';
                      }
                    }}
                  />
                  <button onClick={() => {
                    const input = document.getElementById('urlInput');
                    if (input?.value.trim() && totalPending < 4) {
                      setForm(f => ({ ...f, images: [...(f.images || []), input.value.trim()] }));
                      input.value = '';
                    }
                  }} style={{
                    background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)',
                    color: 'var(--gold)', padding: '10px 14px', borderRadius: 6,
                    fontFamily: 'var(--font-condensed)', fontSize: 12, letterSpacing: 1,
                  }}>
                    + Ajouter
                  </button>
                </div>
              </div>

              <GoldInput label="Badge (optionnel)" value={form.badge}
                onChange={v => setForm(f => ({ ...f, badge: v }))}
                placeholder="Ex: Nouveau, Premium..." />

              {/* Specs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>
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
                <button onClick={handleSubmit} disabled={!canSubmit || imageLoading}
                  style={{
                    flex: 1,
                    background: canSubmit ? 'linear-gradient(90deg, var(--gold), var(--gold-light))' : 'var(--border)',
                    color: canSubmit ? '#000' : 'var(--grey)',
                    padding: '14px', borderRadius: 8,
                    fontFamily: 'var(--font-condensed)', fontSize: 15,
                    fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    cursor: canSubmit ? 'pointer' : 'not-allowed',
                    transition: 'opacity 0.2s',
                    opacity: imageLoading ? 0.7 : 1,
                  }}
                >
                  <Check size={16} />
                  {imageLoading ? 'Upload en cours...' : editing ? 'Enregistrer' : 'Ajouter'}
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
