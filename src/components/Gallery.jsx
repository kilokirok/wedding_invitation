import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Zoom } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom'; 

// 👇 기존의 수많은 import img1... 삭제하고 아래 2줄로 대체!
const imageModules = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp}', { 
  eager: true, 
  import: 'default' 
});
const images = Object.values(imageModules);

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <div className="w-full px-4">
      {/* 1. 메인 갤러리 */}
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="rounded-none md:rounded-xl shadow-lg aspect-[3/4]"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div 
              className="w-full h-full cursor-pointer"
              onClick={() => setSelectedIndex(index)} 
            >
              <img 
                src={src} 
                alt={`Wedding Photo ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <p className="text-center text-xs text-gray-400 mt-2">
        사진을 터치해서 크게 볼 수 있어요
      </p>

      {/* 2. 확대 보기 모달 */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
            onClick={() => setSelectedIndex(null)} 
          >
            <button 
              className="absolute top-5 right-5 text-white/70 text-4xl font-light z-50 hover:text-white transition"
              onClick={() => setSelectedIndex(null)}
            >
              &times;
            </button>

            <div 
              className="w-full h-full flex items-center" 
              onClick={(e) => e.stopPropagation()}
            >
              <Swiper
                modules={[Navigation, Pagination, A11y, Zoom]}
                zoom={{ maxRatio: 2 }} // 👈 아까 말씀하신 최대 확대치 설정 (현재 2배)
                initialSlide={selectedIndex}
                spaceBetween={20}
                slidesPerView={1}
                navigation={true}
                pagination={{ clickable: true, type: 'fraction' }}
                className="w-full h-full"
              >
                {images.map((src, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-zoom-container">
                      <img 
                        src={src} 
                        alt={`Detail View ${index + 1}`} 
                        className="object-contain max-h-screen max-w-full"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          opacity: 0.7;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          opacity: 1;
        }
        .swiper-pagination-fraction {
          color: white;
          bottom: 20px;
        }
      `}</style>
    </div>
  );
}