import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://bpquqbasjkeudqlozzak.supabase.co';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_FaY7EAdWhxx43V95U5YCtg_gEEpzt3f';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const selectGuests = 'id,first_name,last_name,city,created_at,qr_data';

const normalizeGuest = (g) => ({
  ...g,
  city: g.city === 'Yaound\u00e9' ? 'Yaounde' : g.city
});

export const registerGuest = async (firstName, lastName, city) => {
  const first = firstName.trim().slice(0, 100);
  const last = lastName.trim().slice(0, 100);
  const cleanCity = city === 'Yaound\u00e9' ? 'Yaounde' : city;
  const { data, error } = await supabase
    .from('guests')
    .insert({
      first_name: first,
      last_name: last,
      city: cleanCity,
      qr_data: ''
    })
    .select(selectGuests)
    .single();

  if (error) throw new Error(error.message);
  const qrData = `ID: "${data.id}"\nNom: "${last}"\nPrenom: "${first}"\nVille: "${cleanCity}"`;
  await supabase.from('guests').update({ qr_data: qrData }).eq('id', data.id);
  return { success: true, id: data.id, qr_data: qrData, created_at: data.created_at };
};

export const getGuests = async (city = null) => {
  const cleanCity = city === 'Yaound\u00e9' ? 'Yaounde' : city;
  let query = supabase.from('guests').select(selectGuests).order('created_at', { ascending: false });
  if (cleanCity) query = query.eq('city', cleanCity);

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  const guests = (data || []).map(normalizeGuest);
  const counts = guests.reduce(
    (acc, guest) => {
      if (guest.city === 'Douala') acc.douala += 1;
      if (guest.city === 'Yaounde') acc.yaounde += 1;
      return acc;
    },
    { douala: 0, yaounde: 0 }
  );

  return { success: true, guests, total: guests.length, counts };
};

export const getGuest = async (id) => {
  const { data, error } = await supabase.from('guests').select(selectGuests).eq('id', id).single();
  if (error) throw new Error(error.message);
  return { success: true, guest: normalizeGuest(data) };
};

export const subscribeGuests = (callback) => {
  const channel = supabase
    .channel('guests-realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'guests' }, callback)
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
