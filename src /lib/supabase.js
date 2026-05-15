import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(url, key);

/**
 * Upload une image (File ou base64 string) dans Supabase Storage
 * Retourne l'URL publique
 */
export async function uploadImage(fileOrBase64, filename) {
  let blob;

  if (typeof fileOrBase64 === 'string' && fileOrBase64.startsWith('data:')) {
    // Convertit base64 → Blob
    const res = await fetch(fileOrBase64);
    blob = await res.blob();
  } else {
    blob = fileOrBase64;
  }

  // Nom unique pour éviter les collisions
  const ext = blob.type.split('/')[1] || 'jpg';
  const path = `${Date.now()}_${filename || 'photo'}.${ext}`;

  const { error } = await supabase.storage
    .from('products')
    .upload(path, blob, { contentType: blob.type, upsert: false });

  if (error) throw error;

  const { data } = supabase.storage
    .from('products')
    .getPublicUrl(path);

  return data.publicUrl;
}

/**
 * Supprime une image du Storage à partir de son URL publique
 */
export async function deleteImage(url) {
  try {
    const path = url.split('/products/')[1];
    if (!path) return;
    await supabase.storage.from('products').remove([path]);
  } catch {
    // Non bloquant
  }
}
