import { useState } from 'react'; // 상태 관리 추가
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion'; // 애니메이션 추가

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

// 사진 데이터
const images = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11
];

export default function Gallery() {
  // 클릭된 이미지를 저장할 상태 (null이면 닫힘, 이미지가 있으면 열림)
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="w-full px-4">
      {/* 1. 기존 슬라이더 */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        className="rounded-none md:rounded-xl shadow-lg aspect-[3/4]"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div 
              className="w-full h-full cursor-pointer"
              onClick={() => setSelectedImage(src)} // 클릭 시 해당 이미지를 상태에 저장
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

      {/* 2. 확대 보기 모달 (Lightbox) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)} // 배경 누르면 닫기
          >
            {/* 닫기 버튼 */}
            <button 
              className="absolute top-5 right-5 text-white/80 text-4xl font-light hover:text-white transition"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>

            {/* 확대된 이미지 */}
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Full view"
              className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()} // 이미지를 눌렀을 땐 닫히지 않게 (선택사항)
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}