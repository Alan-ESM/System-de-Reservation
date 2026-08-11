import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { carouselPhotos } from '../assets/media';
import 'swiper/css';
import 'swiper/css/effect-fade';

export default function PhotosCarousel() {
  return (
    <>
      <Navbar />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-black pt-16"
      >
        <div className="h-screen flex flex-col">
          <Swiper modules={[Autoplay, EffectFade]} effect="fade" autoplay={{ delay: 5000, disableOnInteraction: false }} className="flex-1 w-full">
            {carouselPhotos.map((p) => (
              <SwiperSlide key={p.id} className="relative h-full">
                <motion.div whileHover={{ scale: 1.05 }} className="relative w-full h-full overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40" />
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent"
                  >
                    <h3 className="text-white text-4xl font-bold">{p.title}</h3>
                    <p className="text-gray-300 mt-2 text-lg">{p.desc}</p>
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.section>
    </>
  );
}
