import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { heroVideos } from '../assets/media';

export default function HeroSection() {
  const nav = useNavigate();
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVideoIndex((i) => (i + 1) % heroVideos.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const title = 'Confirmation de presence';

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20"
    >
      <video key={heroVideos[videoIndex]} autoPlay muted playsInline className="absolute inset-0 -z-10 h-full w-full object-cover">
        <source src={heroVideos[videoIndex]} type="video/mp4" />
      </video>

      <div className="absolute inset-0 -z-10 bg-black/55" />

      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="mb-6 flex max-w-[22rem] flex-wrap justify-center gap-x-2 gap-y-1 text-center leading-none sm:max-w-4xl"
      >
        {title.split('').map((char, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            className="bg-gradient-to-r from-gold via-cream to-gold bg-clip-text text-[clamp(2.2rem,11vw,6rem)] font-black text-transparent md:text-8xl"
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mb-8 max-w-2xl text-center text-xl text-cream md:text-2xl"
      >
        Enregistrement d'invites simple, rapide et elegant
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="flex flex-col gap-4 sm:flex-row"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => nav('/inscription')}
          className="rounded-lg bg-gold px-8 py-4 font-bold text-dark-gray shadow-lg transition hover:bg-gold/90 hover:shadow-gold/50"
        >
          S'enregistrer
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => nav('/invites')}
          className="rounded-lg border-2 border-gold bg-transparent px-8 py-4 font-bold text-gold transition hover:bg-gold/10"
        >
          Voir les invites
        </motion.button>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-10 text-cream"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </motion.section>
  );
}
