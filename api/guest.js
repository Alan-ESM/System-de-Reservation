import { supabase } from './_supabase.js';

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get('id'));
    if (!Number.isFinite(id)) return json({ error: 'Guest not found' }, 404);

    const { data, error } = await supabase.from('guests').select('id, first_name, last_name, city, created_at, qr_data').eq('id', id).single();
    if (error || !data) return json({ error: 'Guest not found' }, 404);

    return json({ success: true, guest: data });
  } catch {
    return json({ error: 'Server error' }, 500);
  }
}
