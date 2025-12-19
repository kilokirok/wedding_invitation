export default function Map() {
  // 예식장 주소 및 이름 (수정 필요)
  const location = {
    name: "서울 신라호텔",
    lat: 37.556, // 위도 (구글맵에서 우클릭하면 확인 가능)
    lng: 127.005 // 경도
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
      {/* 약도 이미지 자리 (없으면 지도 캡쳐해서 넣으세요) */}
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm">
        약도 이미지 (assets 폴더에 넣고 연결)
      </div>
      
      <div className="text-center mb-6">
        <h3 className="font-bold text-lg mb-1">{location.name}</h3>
        <p className="text-gray-500 text-sm">서울 중구 동호로 249</p>
      </div>

      <div className="flex gap-2 justify-center">
        {/* 네이버 지도 연결 */}
        <a 
          href={`https://map.naver.com/v5/search/${location.name}`} 
          target="_blank" 
          rel="noreferrer"
          className="flex-1 bg-[#03C75A] text-white py-3 rounded-lg text-sm font-bold text-center hover:opacity-90 transition"
        >
          네이버 지도
        </a>
        
        {/* 카카오맵 연결 */}
        <a 
          href={`https://map.kakao.com/link/search/${location.name}`} 
          target="_blank" 
          rel="noreferrer"
          className="flex-1 bg-[#FAE100] text-black py-3 rounded-lg text-sm font-bold text-center hover:opacity-90 transition"
        >
          카카오맵
        </a>
      </div>
    </div>
  );
}