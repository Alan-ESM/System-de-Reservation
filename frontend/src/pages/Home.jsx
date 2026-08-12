import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import PhotoCarousel from '../components/PhotoCarousel';
import TeamSection from '../components/TeamSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TeamSection />
      <PhotoCarousel />
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-gray-900 border-t border-gray-700 py-8 text-center text-gray-400"
      >
        <p>2026 Confirmation de presence. A la ceremonie funerairaire <h>D'Essomba Audia Maryline </h>.</p>
      </motion.footer>
    </>
  );
}
