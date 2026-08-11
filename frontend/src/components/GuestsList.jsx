import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getGuests } from '../utils/api';
import { staggerContainer, staggerItem } from '../animations/variants';

export default function GuestsList() {
  const [guests, setGuests] = useState([]);
  const [counts, setCounts] = useState({ douala: 0, yaounde: 0 });
  const [filter, setFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getGuests();
        setGuests(res.guests);
        setCounts(res.counts);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
    const interval = setInterval(fetch, 2000);
    return () => clearInterval(interval);
  }, []);

  const filtered = filter ? guests.filter((g) => g.city === filter) : guests;
  const grouped = { Douala: [], Yaounde: [] };
  filtered.forEach((g) => {
    if (grouped[g.city]) grouped[g.city].push(g);
  });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-dark-cream to-dark-gray px-4 py-20 mt-16"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gold mb-8 text-center">Liste des invites</h1>

        <div className="flex gap-4 justify-center mb-8 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setFilter(null)}
            className={`px-6 py-2 rounded-lg font-bold transition ${!filter ? 'bg-gold text-dark-gray' : 'bg-dark-gray/50 text-cream hover:bg-dark-gray/70 border border-gold'}`}
          >
            Tous ({filtered.length})
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setFilter('Douala')}
            className={`px-6 py-2 rounded-lg font-bold transition ${filter === 'Douala' ? 'bg-gold text-dark-gray' : 'bg-dark-gray/50 text-cream hover:bg-dark-gray/70 border border-gold'}`}
          >
            Douala ({counts.douala})
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setFilter('Yaounde')}
            className={`px-6 py-2 rounded-lg font-bold transition ${filter === 'Yaounde' ? 'bg-gold text-dark-gray' : 'bg-dark-gray/50 text-cream hover:bg-dark-gray/70 border border-gold'}`}
          >
            Yaounde ({counts.yaounde})
          </motion.button>
        </div>

        {loading ? (
          <div className="text-center text-cream">Chargement...</div>
        ) : (
          <div className="space-y-8">
            {['Douala', 'Yaounde'].map(
              (city) =>
                grouped[city].length > 0 && (
                  <motion.div key={city} variants={staggerContainer} initial="hidden" whileInView="visible">
                    <h2 className="text-2xl font-bold text-gold mb-4 border-b-2 border-gold pb-2">{city}</h2>
                    <div className="space-y-2">
                      {grouped[city].map((g) => (
                        <motion.div
                          key={g.id}
                          variants={staggerItem}
                          whileHover={{ scale: 1.02, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                          className="bg-dark-gray/50 text-cream p-4 rounded-lg flex justify-between items-center border border-gold/50 hover:border-gold transition cursor-pointer"
                        >
                          <span className="font-mono text-sm text-gold min-w-12">{String(g.id).padStart(3, '0')}</span>
                          <span className="font-semibold flex-1">{g.first_name} {g.last_name}</span>
                          <span className="text-xs text-cream/60">{new Date(g.created_at).toLocaleTimeString('fr-FR')}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )
            )}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 p-6 bg-dark-gray/50 rounded-lg border-2 border-gold text-center"
        >
          <p className="text-cream mb-2">Total d'invites</p>
          <motion.p key={filtered.length} initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="text-5xl font-bold text-gold">
            {filtered.length}
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}
