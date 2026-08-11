// frontend/src/components/PhotoCarousel.jsx (adapté)
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-fade';

const photos = [
  { id: 1, title: 'Photographe', desc: 'Captured moments', img: '/images/carousel/image1.jpg' },
  { id: 2, title: 'Vidéographe', desc: 'Motion stories', img: '/images/carousel/image2.jpg' },
  { id: 3, title: 'Designer', desc: 'Creative vision', img: '/images/carousel/image3.jpg' },
  { id: 4, title: 'Créatif', desc: 'Innovation', img: '/images/carousel/image4.jpg' },
  { id: 5, title: 'Production', desc: 'Excellence', img: '/images/carousel/image5.jpeg' },
];

export default function PhotoCarousel() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-gradient-to-b from-dark-cream to-dark-gray"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gold mb-12 text-center"
        >
          Notre Équipe Créative
        </motion.h2>

        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="h-96 rounded-2xl overflow-hidden border-4 border-gold"
        >
          {photos.map(p => (
            <SwiperSlide key={p.id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-full h-full overflow-hidden"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-dark-gray via-dark-gray/80 to-transparent"
                >
                  <h3 className="text-gold text-3xl font-bold">{p.title}</h3>
                  <p className="text-cream mt-2 text-lg">{p.desc}</p>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
}