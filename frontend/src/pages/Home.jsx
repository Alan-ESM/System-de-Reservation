// frontend/src/pages/Home.jsx
import HeroSection from '../components/HeroSection';
import PhotoCarousel from '../components/PhotoCarousel';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <PhotoCarousel />
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-gray-900 border-t border-gray-700 py-8 text-center text-gray-400"
      >
        <p>© 2024 EventFlow. Gestion d'événements simplifiée.</p>
      </motion.footer>
    </>
  );
}