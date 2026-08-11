import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://bpquqbasjkeudqlozzak.supabase.co';
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_FaY7EAdWhxx43V95U5YCtg_gEEpzt3f';

if (!url || !key) {
  throw new Error('Missing Supabase env vars');
}

export const supabase = createClient(url, key);
export const cities = ['Douala', 'Yaounde'];
export const normalizeCity = (city) => {
  const value = String(city ?? '').trim();
  return cities.includes(value) ? value : null;
};
