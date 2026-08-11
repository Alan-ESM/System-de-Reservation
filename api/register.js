import { supabase, normalizeCity } from './_supabase.js';

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });

export async function POST(req) {
  try {
    const { firstName, lastName, city } = await req.json();
    const fn = String(firstName ?? '').trim().slice(0, 100);
    const ln = String(lastName ?? '').trim().slice(0, 100);
    const normalizedCity = normalizeCity(city);

    if (!fn || !ln || !normalizedCity) return json({ error: 'Missing fields' }, 400);

    const qr_data = JSON.stringify({ firstName: fn, lastName: ln, city: normalizedCity });
    const { data, error } = await supabase
      .from('guests')
      .insert([{ first_name: fn, last_name: ln, city: normalizedCity, qr_data }])
      .select('id, qr_data, created_at')
      .single();

    if (error) throw error;

    return json({ success: true, id: data.id, qr_data: data.qr_data, created_at: data.created_at }, 201);
  } catch {
    return json({ error: 'Server error' }, 500);
  }
}
