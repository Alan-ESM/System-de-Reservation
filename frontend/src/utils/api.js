const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const registerGuest = async (firstName, lastName, city) => {
  const res = await fetch(`${API_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, city })
  });
  if (!res.ok) throw new Error('Erreur enregistrement');
  return res.json();
};

export const getGuests = async (city = null) => {
  const q = city ? `?city=${encodeURIComponent(city)}` : '';
  const res = await fetch(`${API_URL}/api/guests${q}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Erreur récupération');
  return res.json();
};

export const getGuest = async (id) => {
  const res = await fetch(`${API_URL}/api/guest/${id}`);
  if (!res.ok) throw new Error('Invité non trouvé');
  return res.json();
};