import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const nav = useNavigate();
  const loc = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { path: '/', label: 'Accueil' },
    { path: '/inscription', label: 'Enregistrement' },
    { path: '/invites', label: 'Invites' }
  ];

  const isActive = (path) => loc.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 z-50 w-full border-b-2 border-gold bg-dark-gray/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <motion.div
          whileHover={{ scale: 1.03 }}
          onClick={() => nav('/')}
          className="max-w-[14rem] cursor-pointer bg-gradient-to-r from-gold to-cream bg-clip-text text-2xl font-bold leading-tight text-transparent sm:max-w-none"
        >
          Confirmation de presence
        </motion.div>

        <button className="lg:hidden text-cream" onClick={() => setOpen(!open)}>
          {open ? 'Fermer' : 'Menu'}
        </button>

        <div className="hidden gap-8 lg:flex">
          {links.map((l) => (
            <motion.button
              key={l.path}
              whileHover={{ scale: 1.1 }}
              onClick={() => nav(l.path)}
              className={`font-semibold transition ${isActive(l.path) ? 'border-b-2 border-gold text-gold' : 'text-cream hover:text-gold'}`}
            >
              {l.label}
            </motion.button>
          ))}
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-0 right-0 top-16 flex flex-col gap-4 border-b border-gold bg-dark-gray/95 p-6 lg:hidden"
          >
            {links.map((l) => (
              <button
                key={l.path}
                onClick={() => {
                  nav(l.path);
                  setOpen(false);
                }}
                className={`text-left font-semibold ${isActive(l.path) ? 'text-gold' : 'text-cream'}`}
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
