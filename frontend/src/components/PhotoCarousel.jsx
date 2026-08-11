import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { carouselPhotos } from '../assets/media';
import 'swiper/css';
import 'swiper/css/effect-fade';

export default function PhotoCarousel() {
  return (
    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} className="py-20 bg-gradient-to-b from-dark-cream to-dark-gray">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-bold text-gold mb-12 text-center">
          Galerie
        </motion.h2>
        <Swiper modules={[Autoplay, EffectFade]} effect="fade" autoplay={{ delay: 5000, disableOnInteraction: false }} loop className="h-96 rounded-2xl overflow-hidden border-4 border-gold">
          {carouselPhotos.map((p) => (
            <SwiperSlide key={p.id}>
              <div className="relative w-full h-full overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-dark-gray via-dark-gray/80 to-transparent">
                  <h3 className="text-gold text-3xl font-bold">{p.title}</h3>
                  <p className="text-cream mt-2 text-lg">{p.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
}
