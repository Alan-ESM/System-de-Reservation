// frontend/src/components/Navbar.jsx (adapté couleurs)
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const nav = useNavigate();
  const loc = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { path: '/', label: 'Accueil' },
    { path: '/register', label: 'Enregistrement' },
    { path: '/guests', label: 'Invités' },
    { path: '/photos', label: 'Galerie' }
  ];

  const isActive = (path) => loc.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full bg-dark-gray/95 backdrop-blur border-b-2 border-gold z-50"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => nav('/')}
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-cream cursor-pointer"
        >
          EventFlow
        </motion.div>

        <button
          className="hidden sm:hidden lg:hidden text-cream"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <div className="hidden lg:flex gap-8">
          {links.map(l => (
            <motion.button
              key={l.path}
              whileHover={{ scale: 1.1 }}
              onClick={() => nav(l.path)}
              className={`font-semibold transition ${isActive(l.path) ? 'text-gold border-b-2 border-gold' : 'text-cream hover:text-gold'}`}
            >
              {l.label}
            </motion.button>
          ))}
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-16 left-0 right-0 bg-dark-gray/95 flex flex-col gap-4 p-6 lg:hidden border-b border-gold"
          >
            {links.map(l => (
              <button
                key={l.path}
                onClick={() => {
                  nav(l.path);
                  setOpen(false);
                }}
                className={`font-semibold text-left ${isActive(l.path) ? 'text-gold' : 'text-cream'}`}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}