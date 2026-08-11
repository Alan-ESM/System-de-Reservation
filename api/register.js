import { createClient } from '@supabase/supabase-js';

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function POST(req) {
  try {
    const { firstName, lastName, city } = await req.json();
    
    if (!firstName?.trim() || !lastName?.trim() || !city?.trim()) {
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }
    
    if (!['Douala', 'Yaoundé'].includes(city)) {
      return Response.json({ error: 'Invalid city' }, { status: 400 });
    }
    
    const fn = firstName.trim().substring(0, 100);
    const ln = lastName.trim().substring(0, 100);
    const qrData = JSON.stringify({ firstName: fn, lastName: ln, city });
    
    const { data, error } = await sb
      .from('guests')
      .insert([{ first_name: fn, last_name: ln, city, qr_data: qrData }])
      .select('id, qr_data, created_at')
      .single();
    
    if (error) throw error;
    
    return Response.json({ success: true, id: data.id, qr_data: data.qr_data }, { status: 201 });
  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}