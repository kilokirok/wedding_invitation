import { useEffect } from 'react';
import mapImage from '../assets/map_sketch.png'; 

export default function Map() {
  // 삼산월드컨벤션센터 좌표 및 정보
  const location = {
    name: "삼산월드컨벤션센터",
    address: "인천 부평구 체육관로 60 (삼산동 458-1)",
    tel: "032-508-3355",
    lat: 37.5076337, 
    lng: 126.7373807,
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mx-4">
      {/* 1. 약도 이미지 영역 */}
      <div className="w-full bg-gray-100 rounded-lg mb-6 overflow-hidden relative flex items-center justify-center">

        <img src={mapImage} alt="약도" className="w-full h-full object-cover" />
      </div>
      
      {/* 2. 텍스트 정보 */}
      <div className="text-center mb-6">
        <h3 className="font-serif font-bold text-xl mb-2 text-gray-800">{location.name}</h3>
        <p className="text-gray-600 text-sm mb-1">{location.address}</p>
        <p className="text-gray-400 text-xs">{location.tel}</p>
      </div>

      {/* 3. 지도 앱 연결 버튼 */}
      <div className="flex gap-2 justify-center mb-8">
        <a 
          href={`https://map.naver.com/v5/search/${encodeURIComponent(location.name)}`} 
          target="_blank" 
          rel="noreferrer"
          className="flex-1 bg-[#03C75A] text-white py-3 rounded-lg text-sm font-bold text-center hover:opacity-90 transition shadow-sm"
        >
          네이버 지도
        </a>
        <a 
          href={`https://map.kakao.com/link/to/${encodeURIComponent(location.name)},${location.lat},${location.lng}`} 
          target="_blank" 
          rel="noreferrer"
          className="flex-1 bg-[#FAE100] text-[#3B1E1E] py-3 rounded-lg text-sm font-bold text-center hover:opacity-90 transition shadow-sm"
        >
          카카오맵
        </a>
        {/* 티맵 수정됨: API 키 없이 앱을 바로 엽니다 */}
        <a 
          href={`tmap://route?goalname=${encodeURIComponent(location.name)}&goalx=${location.lng}&goaly=${location.lat}`} 
          className="flex-1 bg-[#F5446F] text-white py-3 rounded-lg text-sm font-bold text-center hover:opacity-90 transition shadow-sm"
        >
          티맵
        </a>
      </div>

      {/* 4. 교통편 안내 */}
      <div className="text-left bg-gray-50 p-5 rounded-lg text-sm space-y-4 text-gray-700">
        <div>
          <strong className="block text-gray-900 mb-1">🚇 지하철</strong>
          <p>7호선 <span className="text-green-600 font-bold">삼산체육관역</span> 3번 출구 (도보 5분)</p>
          <p>7호선 <span className="text-green-600 font-bold">굴포천역</span> 8번 출구 (도보 10분)</p>
        </div>
        <div>
          <strong className="block text-gray-900 mb-1">🚌 버스</strong>
          <p>삼산체육관 정류장 하차</p>
          <p className="text-xs text-gray-500 mt-1">간선 24, 67-1, 79, 87 / 광역 1200, 9300</p>
        </div>
        <div>
          <strong className="block text-gray-900 mb-1">🚗 자가용/주차</strong>
          <p>네비게이션: '삼산월드체육관' 또는 '삼산월드컨벤션센터' 검색</p>
          <p className="text-blue-600 font-bold mt-1">🅿️ 주차 2시간 무료</p>
        </div>
      </div>
    </div>
  );
}