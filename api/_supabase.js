import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error('Missing Supabase env vars');
}

export const supabase = createClient(url, key);
export const cities = ['Douala', 'Yaounde'];
export const normalizeCity = (city) => {
  const value = String(city ?? '').trim();
  return cities.includes(value) ? value : null;
};
