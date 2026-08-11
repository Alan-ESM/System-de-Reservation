import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const storePath = path.join(root, '..', 'database', 'guests.json');

export const cities = ['Douala', 'Yaoundé'];

const sortGuests = (guests) =>
  [...guests].sort((a, b) => {
    const cityDiff = cities.indexOf(a.city) - cities.indexOf(b.city);
    return cityDiff || a.id - b.id;
  });

const ensureStore = async () => {
  await mkdir(path.dirname(storePath), { recursive: true });
  try {
    await readFile(storePath, 'utf8');
  } catch {
    await writeFile(storePath, '[]\n', 'utf8');
  }
};

export const normalizeCity = (city) => {
  const value = String(city ?? '').trim();
  return cities.includes(value) ? value : null;
};

export async function readGuests() {
  await ensureStore();
  const raw = await readFile(storePath, 'utf8');
  const guests = raw.trim() ? JSON.parse(raw) : [];
  return sortGuests(Array.isArray(guests) ? guests : []);
}

export async function writeGuests(guests) {
  await ensureStore();
  await writeFile(storePath, `${JSON.stringify(sortGuests(guests), null, 2)}\n`, 'utf8');
}

export async function addGuest({ firstName, lastName, city }) {
  const normalizedCity = normalizeCity(city);
  if (!normalizedCity) throw new Error('Invalid city');

  const guests = await readGuests();
  const id = guests.reduce((max, guest) => Math.max(max, guest.id), 0) + 1;
  const created_at = new Date().toISOString();
  const guest = {
    id,
    first_name: firstName.trim().slice(0, 100),
    last_name: lastName.trim().slice(0, 100),
    city: normalizedCity,
    qr_data: JSON.stringify({
      id,
      firstName: firstName.trim().slice(0, 100),
      lastName: lastName.trim().slice(0, 100),
      city: normalizedCity
    }),
    created_at
  };

  guests.push(guest);
  await writeGuests(guests);
  return guest;
}

export async function getGuestById(id) {
  const guests = await readGuests();
  return guests.find((guest) => guest.id === id) ?? null;
}
