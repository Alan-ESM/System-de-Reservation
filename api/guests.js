import { createClient } from '@supabase/supabase-js';

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');
    
    let q = sb.from('guests').select('id, first_name, last_name, city, created_at');
    
    if (city && ['Douala', 'Yaoundé'].includes(city)) {
      q = q.eq('city', city);
    }
    
    const { data, error } = await q.order('city', { ascending: true }).order('id', { ascending: true });
    
    if (error) throw error;
    
    return Response.json({ 
      success: true, 
      guests: data,
      total: data.length,
      counts: {
        douala: data.filter(g => g.city === 'Douala').length,
        yaounde: data.filter(g => g.city === 'Yaoundé').length
      }
    }, { 
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });
  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}