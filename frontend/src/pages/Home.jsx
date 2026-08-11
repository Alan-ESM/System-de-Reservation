import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import TeamSection from '../components/TeamSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TeamSection />
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-gray-900 border-t border-gray-700 py-8 text-center text-gray-400"
      >
        <p>2024 Confirmation de presence. Gestion d'evenements simplifiee.</p>
      </motion.footer>
    </>
  );
}
