import { supabase } from '../lib/supabase';

export const defaultProducts = [
  {
    id: 'ph-1', category: 'telephones',
    name: 'Samsung Galaxy S24 Ultra', price: 650000,
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80'],
    specs: ['6.8" QHD+ Dynamic AMOLED','12 Go RAM / 256 Go','Quad caméra 200MP','Snapdragon 8 Gen 3','Batterie 5000 mAh'],
    badge: 'Nouveau',
  },
  {
    id: 'ph-2', category: 'telephones',
    name: 'iPhone 15 Pro Max', price: 750000,
    images: ['https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600&q=80'],
    specs: ['6.7" Super Retina XDR','8 Go RAM / 256 Go','Triple caméra 48MP','Puce A17 Pro','Titane naturel'],
    badge: 'Top vente',
  },
  {
    id: 'ph-3', category: 'telephones',
    name: 'Tecno Camon 30 Pro', price: 185000,
    images: ['https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80'],
    specs: ['6.77" AMOLED 144Hz','8 Go RAM / 256 Go','Caméra 50MP','Dimensity 8050','Batterie 5000 mAh'],
    badge: null,
  },
  {
    id: 'vt-1', category: 'voitures',
    name: 'Toyota Corolla 2022', price: 9500000,
    images: ['https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=600&q=80'],
    specs: ['Essence 1.8L hybride','Automatique CVT','5 places','28 000 km','Blanc nacré'],
    badge: 'Occasion',
  },
  {
    id: 'vt-2', category: 'voitures',
    name: 'Mercedes GLE 400d', price: 32000000,
    images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80'],
    specs: ['Diesel 3.0L 330ch','9G-TRONIC','4MATIC AWD','15 000 km','Cuir Nappa'],
    badge: 'Premium',
  },
  {
    id: 'vt-3', category: 'voitures',
    name: 'Renault Duster 2021', price: 7800000,
    images: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&q=80'],
    specs: ['Essence 1.3L 130ch','Manuelle 6 vitesses','5 places','42 000 km','SUV 4x2'],
    badge: null,
  },
  {
    id: 'ch-1', category: 'chaussures',
    name: 'Nike Air Force 1 Low', price: 45000,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'],
    specs: ['Cuir pleine fleur','Semelle Air-Sole','Pointures: 38–46','Blanc/Blanc','Unisexe'],
    badge: 'Classique',
  },
  {
    id: 'ch-2', category: 'chaussures',
    name: 'Adidas Yeezy Boost 350', price: 95000,
    images: ['https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80'],
    specs: ['Primeknit Stretch','Semelle Boost','Pointures: 38–46','Coloris Zebra','Homme / Femme'],
    badge: 'Édition limitée',
  },
  {
    id: 'ch-3', category: 'chaussures',
    name: 'Derby Cuir Premium', price: 38000,
    images: ['https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80'],
    specs: ['Cuir véritable','Goodyear welt','Pointures: 39–45','Marron cognac','Homme'],
    badge: null,
  },
];

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) { console.error('getProducts:', error); return []; }
  return data;
}

export async function addProduct(product) {
  const { error } = await supabase.from('products').insert([product]);
  if (error) throw error;
}

export async function updateProduct(product) {
  const { error } = await supabase.from('products').update(product).eq('id', product.id);
  if (error) throw error;
}

export async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}

export async function seedProducts() {
  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });
  if (count === 0) {
    const { error } = await supabase.from('products').insert(defaultProducts);
    if (error) console.error('Seed error:', error);
  }
}

export function formatPrice(price) {
  return new Intl.NumberFormat('fr-SN', {
    style: 'currency', currency: 'XOF', minimumFractionDigits: 0,
  }).format(price).replace('XOF', 'FCFA');
}

export const WHATSAPP_NUMBER = '221771018557';

export function buildWhatsAppUrl(product) {
  const msg = `Bonjour CTK&BM ! 👋

Je suis intéressé(e) par :
*${product.name}*
💰 Prix : ${formatPrice(product.price)}

Caractéristiques :
${product.specs.map(s => `• ${s}`).join('\n')}

Merci de me donner plus d'informations. 🙏`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export const CATEGORIES = {
  telephones: { label: 'Téléphones', icon: '📱' },
  voitures:   { label: 'Voitures',   icon: '🚗' },
  chaussures: { label: 'Chaussures', icon: '👟' },
};
