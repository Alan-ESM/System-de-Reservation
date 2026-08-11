import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { getGuests, subscribeGuests } from '../utils/api';

export default function GuestsList() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const res = await getGuests();
      setGuests(res.guests);
      setLoading(false);
    };
    fetch();
    return subscribeGuests(fetch);
  }, []);

  const exportList = () => {
    const rows = [['ID', 'Nom', 'Prenom'], ...guests.map((g) => [g.id, g.last_name, g.first_name])];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invites.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Navbar />
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="min-h-screen bg-white px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-center text-4xl font-bold text-gray-900">Liste des invites</h1>
          <div className="mb-8 flex justify-center">
            <button onClick={exportList} className="rounded-lg border border-gold bg-white px-6 py-3 font-bold text-gray-900 transition hover:bg-gold">
              Exporter la liste
            </button>
          </div>
          {loading ? (
            <div className="text-center text-gray-900">Chargement...</div>
          ) : (
            <div className="space-y-2">
              {guests.map((g) => (
                <div key={g.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-gray-900 shadow-sm">
                  <span className="min-w-12 font-mono text-sm text-gray-900">{String(g.id).padStart(3, '0')}</span>
                  <span className="flex-1 font-semibold">{g.first_name} {g.last_name}</span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-12 rounded-lg border border-gold bg-white p-6 text-center">
            <p className="mb-2 text-gray-700">Total d'invites</p>
            <p className="text-5xl font-bold text-gray-900">{guests.length}</p>
          </div>
        </div>
      </motion.section>
    </>
  );
}
