import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

import Gallery from './components/Gallery';
import Map from './components/Map';
import Account from './components/Account';
import thumbnail from './assets/thumbnail.png';

export default function App() {
  

  const KAKAO_KEY = "b0498ba04cb6edfe173bb1b92b6ff58d"; 


  useEffect(() => {
    // 1-1. 앱 켜지면 꽃가루 펑! 🎉
    const duration = 3 * 1000;
    confetti({ particleCount: 150, spread: 60, origin: { y: 0.6 } });

    // 1-2. 카카오 SDK 초기화
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_KEY);
        console.log("Kakao Initialized:", window.Kakao.isInitialized());
      }
    } else {
      console.error("Kakao SDK가 로드되지 않았습니다. index.html을 확인하세요.");
    }
  }, []);

  const shareKakao = () => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      const realImageUrl = new URL(thumbnail, window.location.href).href;
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '지열 & 채린 결혼합니다 💍',
          description: '2026년 07월 04일 토요일 오후 12시 10분\n삼산월드컨벤션 센터',
          // 주의: 로컬(localhost) 테스트 중에는 이미지가 안 보일 수 있습니다.
          // 배포 후에는 실제 이미지 주소를 넣어야 친구들에게 잘 보입니다.
          imageUrl: realImageUrl, 
          link: {
            mobileWebUrl: window.location.href, // 현재 접속한 주소 자동 사용
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '청첩장 보러가기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } else {
      alert("카카오 키가 올바르지 않거나 SDK가 로드되지 않았습니다.");
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden font-sans pb-20">
      
      {/* 1. 메인 커버 */}
      <section className="h-screen flex flex-col justify-center items-center relative bg-wedding-pink">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <p className="text-sm tracking-[0.3em] text-gray-500 mb-6">WEDDING INVITATION</p>
          <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">지열 & 채린</h1>
          <div className="w-12 h-[1px] bg-gray-400 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 mb-1">2026년 07월 04일 토요일</p>
          <p className="text-gray-500">오후 12시 10분</p>
        </motion.div>
        
        {/* 장식용 원 */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </section>

      {/* 2. 인사말 */}
      <Section title="초대합니다">
        <div className="flex flex-col items-center text-center">
          
          {/* 상단 멘트 */}
          <p className="leading-9 text-gray-600 text-sm mb-8 break-keep">
            빛나는 꿈을 가진 사람을 만나<br/>
            앞으로 같은 꿈을 꾸며<br/>
            함께 이루어 가려고 합니다.<br/>
            <br/>
            귀한 걸음 하시어 따뜻한 격려로<br/>
            저희의 앞날을 응원해 주시면<br/>
            더 없는 기쁨으로 간직 하겠습니다.
          </p>

          {/* 이름 영역 (강조) */}
          <div className="bg-gray-50 px-8 py-4 rounded-lg border border-gray-100 w-full max-w-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-xs">신랑</span>
              <span className="font-serif text-lg font-bold text-gray-800">승지열</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-xs">신부</span>
              <span className="font-serif text-lg font-bold text-gray-800">김채린</span>
            </div>
          </div>

        </div>
      </Section>

      {/* 3. 갤러리 */}
      <Section title="우리의 순간들" bg="bg-[#fcfafb]">
        <Gallery />
      </Section>

      {/* 4. 오시는 길 */}
      <Section title="오시는 길">
        <Map />
      </Section>

      {/* 5. 마음 전하실 곳 */}
      <Section title="마음 전하실 곳" bg="bg-[#fcfafb]">
        <Account />
      </Section>

      {/* 6. 공유하기 (카톡 버튼) */}
      <footer className="py-12 bg-gray-50 text-center">
        <button 
          onClick={shareKakao}
          className="bg-[#FAE100] text-[#3B1E1E] px-8 py-3 rounded-full font-bold shadow-md hover:bg-yellow-300 transition flex items-center gap-2 mx-auto"
        >
          {/* 카카오 아이콘 SVG */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.48 3 2 6.48 2 10.77C2 13.56 3.84 16.03 6.64 17.42C6.46 18.06 6.09 19.39 6.03 19.64C5.97 19.95 6.29 20.15 6.54 19.98C6.58 19.95 9.77 17.85 11.26 16.89C11.5 16.91 11.75 16.92 12 16.92C17.52 16.92 22 13.44 22 9.15C22 4.86 17.52 3 12 3Z" />
          </svg>
          카카오톡으로 공유하기
        </button>
        <p className="text-xs text-gray-300 mt-8">Designed by Ji</p>
      </footer>

    </div>
  );
}

// 섹션 공통 컴포넌트
function Section({ title, children, bg = "bg-white" }) {
  return (
    <motion.section 
      className={`py-16 px-6 ${bg}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-10">
        <h2 className="text-xl font-serif text-gray-800 font-bold inline-block border-b border-gray-300 pb-2">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}