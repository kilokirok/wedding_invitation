import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// 이미지 import (기존과 동일)
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

const images = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12
];

export default function Gallery() {
  // 이제 src가 아니라 '몇 번째 사진인지(index)'를 저장합니다.
  // null이면 닫힌 상태, 숫자가 있으면 그 순서의 사진이 열린 상태입니다.
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
              onClick={() => setSelectedIndex(index)} // 클릭 시 인덱스 저장
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
        사진을 터치하면 크게 볼 수 있어요
      </p>

      {/* 2. 확대 보기 모달 (여기에도 Swiper를 넣음) */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
            onClick={() => setSelectedIndex(null)} // 배경 누르면 닫기
          >
            {/* 닫기 버튼 */}
            <button 
              className="absolute top-5 right-5 text-white/70 text-4xl font-light z-50 hover:text-white transition"
              onClick={() => setSelectedIndex(null)}
            >
              &times;
            </button>

            {/* 모달 내부 슬라이더 */}
            {/* 배경 클릭 이벤트 전파 방지 (e.stopPropagation)를 위해 div로 감쌈 */}
            <div 
              className="w-full h-full flex items-center" 
              onClick={(e) => e.stopPropagation()}
            >
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                initialSlide={selectedIndex} // 클릭했던 그 사진부터 시작!
                spaceBetween={20}
                slidesPerView={1}
                navigation={true} // 화살표 표시
                pagination={{ clickable: true, type: 'fraction' }} // "1 / 11" 형태의 쪽수 표시
                className="w-full h-full"
              >
                {images.map((src, index) => (
                  <SwiperSlide key={index} className="flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center p-4">
                      <img 
                        src={src} 
                        alt={`Detail View ${index + 1}`} 
                        className="max-w-full max-h-full object-contain shadow-2xl"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swiper 기본 화살표 색상을 흰색으로 변경하는 스타일 */}
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