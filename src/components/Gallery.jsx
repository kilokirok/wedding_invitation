import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Zoom } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom'; // 핀치 줌 필수 CSS

// 이미지 import
import img1 from '../assets/gallery/photo1.jpg';
import img2 from '../assets/gallery/photo2.jpg';
import img3 from '../assets/gallery/photo3.jpg';
import img4 from '../assets/gallery/photo4.jpg';
import img5 from '../assets/gallery/photo5.jpg';
import img6 from '../assets/gallery/photo6.jpg';
import img7 from '../assets/gallery/photo7.jpg';
import img8 from '../assets/gallery/photo8.jpg';
import img9 from '../assets/gallery/photo9.jpg';
import img10 from '../assets/gallery/photo10.jpg';
import img11 from '../assets/gallery/photo11.jpg';
import img12 from '../assets/gallery/photo12.jpg';
import img13 from '../assets/gallery/photo13.jpg';
import img14 from '../assets/gallery/photo14.jpeg';
import img15 from '../assets/gallery/photo15.jpeg';
import img16 from '../assets/gallery/photo16.jpeg';
import img17 from '../assets/gallery/photo17.jpeg';
import img18 from '../assets/gallery/photo18.jpeg';
import img19 from '../assets/gallery/photo19.jpeg';
import img20 from '../assets/gallery/photo20.jpeg';
import img21 from '../assets/gallery/photo21.jpeg';
import img22 from '../assets/gallery/photo22.jpeg';
import img23 from '../assets/gallery/photo23.jpeg';
import img24 from '../assets/gallery/photo24.jpeg';
import img25 from '../assets/gallery/photo25.jpeg';

// 💡 여기서 순서 정하기
const images = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22, img23, img24, img25
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <div className="w-full px-4">
      
      {/* 1. 메인 갤러리 (3열 그리드 형식으로 변경) */}
      <div className="grid grid-cols-3 gap-2">
        {images.map((src, index) => (
          <div 
            key={index}
            // aspect-square로 1:1 정사각형 썸네일 생성. 모서리를 살짝 둥글게(rounded-md) 처리했습니다.
            className="aspect-square cursor-pointer overflow-hidden rounded-md relative group"
            onClick={() => setSelectedIndex(index)} // 터치/클릭 시 모달 열기
          >
            <img 
              src={src} 
              alt={`Wedding Photo ${index + 1}`} 
              // object-cover로 정사각형 비율에 맞춰 예쁘게 잘리게 하고, 호버 시 살짝 확대되는 애니메이션 추가
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
      
      <p className="text-center text-xs text-gray-400 mt-4 mb-2">
        사진을 터치해서 크게 볼 수 있어요
      </p>

      {/* 2. 확대 보기 모달 (기존 기능 완벽 유지) */}
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
                zoom={{ maxRatio: 2 }} // 최대 2배 확대
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
                      {/* 상세 보기에서는 잘리는 부분 없이 원본 비율 그대로(object-contain) 보여줍니다 */}
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