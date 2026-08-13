import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { registerGuest } from '../utils/api';
import { generatePDF } from '../utils/generatePDF';

export default function Register() {
  const [form, setForm] = useState({ firstName: '', lastName: '', city: 'Douala' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
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
      setMsg('✓ Enregistré! PDF téléchargé');
      setMsgType('success');
      setForm({ firstName: '', lastName: '', city: 'Douala' });
      setTimeout(() => setMsg(''), 3000);
    } catch (e) {
      setMsg('✗ Erreur: ' + e.message);
      setMsgType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-br from-dark-cream to-dark-gray px-4 py-20 mt-16"
      >
        <div className="mx-auto max-w-md">
          <motion.div
            className="rounded-2xl border-2 border-gold bg-dark-gray/90 p-8 shadow-2xl"
            whileHover={{ borderColor: '#d4af37', boxShadow: '0 0 30px rgba(212, 175, 55, 0.2)' }}
          >
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-cream"
            >
              Enregistrement
            </motion.h1>

            <form onSubmit={submit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <label className="block text-sm font-semibold text-gold">Prénom</label>
                <motion.input
                  whileHover={{ scale: 1.02 }}
                  type="text"
                  name="firstName"
                  placeholder="Entrez votre prénom"
                  value={form.firstName}
                  onChange={handle}
                  className="w-full rounded-lg border-2 border-transparent bg-dark-gray/50 px-4 py-3 text-cream placeholder-cream/50 outline-none transition hover:border-gold focus:border-gold"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <label className="block text-sm font-semibold text-gold">Nom</label>
                <motion.input
                  whileHover={{ scale: 1.02 }}
                  type="text"
                  name="lastName"
                  placeholder="Entrez votre nom"
                  value={form.lastName}
                  onChange={handle}
                  className="w-full rounded-lg border-2 border-transparent bg-dark-gray/50 px-4 py-3 text-cream placeholder-cream/50 outline-none transition hover:border-gold focus:border-gold"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <label className="block text-sm font-semibold text-gold">Ville</label>
                <motion.select
                  whileHover={{ scale: 1.02 }}
                  name="city"
                  value={form.city}
                  onChange={handle}
                  className="w-full rounded-lg border-2 border-transparent bg-dark-gray/50 px-4 py-3 text-cream outline-none transition hover:border-gold focus:border-gold"
                >
                  <option value="Douala">Douala</option>
                  <option value="Yaoundé">Yaoundé</option>
                </motion.select>
              </motion.div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full rounded-lg bg-gold py-3 font-bold text-dark-gray transition hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-gold/50"
              >
                {loading ? 'Traitement...' : 'Enregistrer'}
              </motion.button>
            </form>

            {msg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-6 rounded-lg p-4 text-center font-semibold ${
                  msgType === 'success'
                    ? 'bg-green-900/30 text-green-300 border border-green-500'
                    : 'bg-red-900/30 text-red-300 border border-red-500'
                }`}
              >
                {msg}
              </motion.div>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center text-sm text-cream/60"
          >
            Vos données sont sécurisées et utilisées uniquement pour l'événement
          </motion.p>
        </div>
      </motion.section>
    </>
  );
}
