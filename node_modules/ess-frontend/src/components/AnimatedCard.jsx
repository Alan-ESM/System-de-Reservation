// frontend/src/components/AnimatedCard.jsx
'use client';
import { motion } from 'framer-motion';

export default function AnimatedCard({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
      transition={{ duration: 0.5, delay }}
      className={`p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 transition ${className}`}
    >
      {children}
    </motion.div>
  );
}