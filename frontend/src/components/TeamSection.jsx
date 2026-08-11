import { motion } from 'framer-motion';

export default function TeamSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7 }}
      className="bg-gradient-to-b from-dark-cream to-dark-gray px-4 py-20"
    >
      <div className="mx-auto max-w-3xl rounded-3xl border-2 border-gold bg-dark-gray/80 p-8 text-center shadow-2xl shadow-black/30 sm:p-12">
        <h2 className="text-3xl font-black text-cream sm:text-5xl">Essomba Audia Maryline</h2>
      </div>
    </motion.section>
  );
}
