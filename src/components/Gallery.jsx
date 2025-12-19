import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// 임시 사진 데이터 (나중에 본인 사진 경로로 바꾸세요)
const images = [
  "https://picsum.photos/800/1200?random=1",
  "https://picsum.photos/800/1200?random=2",
  "https://picsum.photos/800/1200?random=3",
  "https://picsum.photos/800/1200?random=4",
];

export default function Gallery() {
  return (
    <div className="w-full px-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="rounded-xl shadow-lg"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img 
              src={src} 
              alt={`Wedding Photo ${index + 1}`} 
              className="w-full h-[500px] object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <p className="text-center text-xs text-gray-400 mt-2">좌우로 넘겨보세요</p>
    </div>
  );
}