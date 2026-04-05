import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Zoom } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom'; // 핀치 줌 필수 CSS

// 이미지 import
import img1 from '../assets/gallery/photo1.jpeg';
import img2 from '../assets/gallery/photo2.jpeg';
import img3 from '../assets/gallery/photo3.jpeg';
import img4 from '../assets/gallery/photo4.jpeg';
import img5 from '../assets/gallery/photo5.jpeg';
import img6 from '../assets/gallery/photo6.jpeg';
import img7 from '../assets/gallery/photo7.jpeg';
import img8 from '../assets/gallery/photo8.jpeg';
import img9 from '../assets/gallery/photo9.jpeg';
import img10 from '../assets/gallery/photo10.jpeg';
import img11 from '../assets/gallery/photo11.jpeg';
import img12 from '../assets/gallery/photo12.jpg';
import img13 from '../assets/gallery/photo13.jpeg';

const images = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <div className="w-full px-4">
      
      {/* 1. 메인 갤러리 (작은 화면용 슬라이더) */}
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
              onClick={() => setSelectedIndex(index)} // 터치 시 모달 열기
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

      {/* 2. 확대 보기 모달 (핀치 줌 적용) */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
            onClick={() => setSelectedIndex(null)} 
          >
            {/* 닫기 버튼 */}
            <button 
              className="absolute top-5 right-5 text-white/70 text-4xl font-light z-50 hover:text-white transition"
              onClick={() => setSelectedIndex(null)}
            >
              &times;
            </button>

            {/* 모달 내부 줌 슬라이더 */}
            <div 
              className="w-full h-full flex items-center" 
              onClick={(e) => e.stopPropagation()}
            >
              <Swiper
                modules={[Navigation, Pagination, A11y, Zoom]}
                zoom={{ maxRatio: 3 }} // 최대 3배까지 핀치 줌 허용
                initialSlide={selectedIndex}
                spaceBetween={20}
                slidesPerView={1}
                navigation={true}
                pagination={{ clickable: true, type: 'fraction' }}
                className="w-full h-full"
              >
                {images.map((src, index) => (
                  <SwiperSlide key={index}>
                    {/* Swiper 줌 기능 충돌을 막기 위해 컨테이너에 임의의 크기나 패딩을 주지 않습니다 */}
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