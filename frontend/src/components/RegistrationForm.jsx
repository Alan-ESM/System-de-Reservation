import { useState } from 'react';
import { motion } from 'framer-motion';
import { registerGuest } from '../utils/api';
import { generatePDF } from '../utils/generatePDF';

export default function RegistrationForm() {
  const [form, setForm] = useState({ firstName: '', lastName: '', city: 'Douala' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setMsg('Remplissez tous les champs');
      setMsgType('error');
      return;
    }

    setLoading(true);
    try {
      const res = await registerGuest(form.firstName, form.lastName, form.city);
      await generatePDF(res.id, form.firstName, form.lastName, res.qr_data);
      setMsg('Enregistre. PDF telecharge');
      setMsgType('success');
      setForm({ firstName: '', lastName: '', city: 'Douala' });
      setTimeout(() => setMsg(''), 3000);
    } catch (e) {
      setMsg('Erreur: ' + e.message);
      setMsgType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-dark-cream to-dark-gray px-4 py-20 mt-16"
    >
      <div className="max-w-md mx-auto">
        <motion.div className="bg-dark-gray/90 rounded-2xl p-8 shadow-2xl border-2 border-gold" whileHover={{ borderColor: '#d4af37' }}>
          <h1 className="text-3xl font-bold text-gold mb-8 text-center">Enregistrement</h1>

          <form onSubmit={submit} className="space-y-6">
            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <input
                type="text"
                name="firstName"
                placeholder="Prenom"
                value={form.firstName}
                onChange={handle}
                className="w-full bg-dark-gray/50 text-cream px-4 py-3 rounded-lg border-2 border-transparent hover:border-gold focus:border-gold outline-none transition placeholder-cream/50"
                required
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                value={form.lastName}
                onChange={handle}
                className="w-full bg-dark-gray/50 text-cream px-4 py-3 rounded-lg border-2 border-transparent hover:border-gold focus:border-gold outline-none transition placeholder-cream/50"
                required
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <select
                name="city"
                value={form.city}
                onChange={handle}
                className="w-full bg-dark-gray/50 text-cream px-4 py-3 rounded-lg border-2 border-transparent hover:border-gold focus:border-gold outline-none transition"
              >
                <option value="Douala">Douala</option>
                <option value="Yaounde">Yaounde</option>
              </select>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gold hover:bg-gold/90 text-dark-gray font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Traitement...' : 'Enregistrer'}
            </motion.button>
          </form>

          {msg && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 text-center font-semibold ${msgType === 'success' ? 'text-gold' : 'text-white'}`}
            >
              {msg}
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
