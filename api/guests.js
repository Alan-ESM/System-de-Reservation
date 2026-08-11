import { supabase, normalizeCity } from './_supabase.js';

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const city = normalizeCity(searchParams.get('city'));

    let query = supabase.from('guests').select('id, first_name, last_name, city, created_at, qr_data');
    if (city) query = query.eq('city', city);

    const { data, error } = await query.order('city', { ascending: true }).order('id', { ascending: true });
    if (error) throw error;

    const all = supabase.from('guests').select('city', { count: 'exact', head: false });
    const { data: allGuests } = await all;

    return json({
      success: true,
      guests: data ?? [],
      total: (data ?? []).length,
      counts: {
        douala: (allGuests ?? []).filter((g) => g.city === 'Douala').length,
        yaounde: (allGuests ?? []).filter((g) => g.city === 'Yaounde').length
      }
    });
  } catch {
    return json({ error: 'Server error' }, 500);
  }
}
