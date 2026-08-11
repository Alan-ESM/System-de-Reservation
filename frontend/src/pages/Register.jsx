import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { registerGuest } from '../utils/api';
import { generatePDF } from '../utils/generatePDF';

export default function Register() {
  const [form, setForm] = useState({ firstName: '', lastName: '', city: 'Douala' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim()) return setMsg('Remplissez tous les champs');
    setLoading(true);
    try {
      const res = await registerGuest(form.firstName, form.lastName, form.city);
      await generatePDF(res.id, form.firstName, form.lastName, res.qr_data);
      setMsg('Enregistre. PDF telecharge');
      setForm({ firstName: '', lastName: '', city: 'Douala' });
    } catch (e) {
      setMsg('Erreur: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="min-h-screen bg-white px-4 py-24">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border border-gold bg-white p-8 shadow-xl">
            <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">Enregistrement</h1>
            <form onSubmit={submit} className="space-y-6">
              <input name="firstName" placeholder="Prenom" value={form.firstName} onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gold" required />
              <input name="lastName" placeholder="Nom" value={form.lastName} onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gold" required />
              <select name="city" value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gold">
                <option value="Douala">Douala</option>
                <option value="Yaounde">Yaounde</option>
              </select>
              <button type="submit" disabled={loading} className="w-full rounded-lg bg-gold py-3 font-bold text-gray-900 transition hover:bg-gold/90 disabled:opacity-50">
                {loading ? 'Traitement...' : 'Enregistrer'}
              </button>
            </form>
            {msg && <p className="mt-4 text-center font-semibold text-gray-900">{msg}</p>}
          </div>
        </div>
      </motion.section>
    </>
  );
}
