import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
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


// 임시 사진 데이터 (나중에 본인 사진 경로로 바꾸세요)
const images = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11
];

export default function Gallery() {
  return (
    <div className="w-full px-4">
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
             {/* object-cover: 사진이 영역에 꽉 차게 (잘릴 수 있음) 
                 object-contain: 사진이 다 보이게 (여백 생길 수 있음) */}
            <img 
              src={src} 
              alt={`Wedding Photo ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <p className="text-center text-xs text-gray-400 mt-2">좌우로 넘겨보세요</p>
    </div>
  );
}