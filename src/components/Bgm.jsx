import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
// mp3 파일 import (경로는 실제 파일 위치에 맞게 수정)
import musicFile from '../assets/bgm.mov'; 

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // 컴포넌트 마운트 시 오디오 객체 설정
  useEffect(() => {
    audioRef.current = new Audio(musicFile);
    audioRef.current.loop = true; // 반복 재생
    audioRef.current.volume = 0.5; // 볼륨 조절 (0.0 ~ 1.0)

    // 페이지를 떠날 때 음악 정지 (Cleanup)
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // 브라우저 정책상 사용자 인터랙션 이후에만 play() 가능
      audioRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button
        onClick={togglePlay}
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-colors duration-300 ${
          isPlaying ? "bg-rose-400 animate-spin-slow" : "bg-gray-400"
        }`}
        whileTap={{ scale: 0.9 }}
        aria-label={isPlaying ? "음악 끄기" : "음악 켜기"}
      >
        {isPlaying ? (
          // 재생 중 아이콘 (음표)
          <span className="text-xl">🎵</span>
        ) : (
          // 정지 상태 아이콘 (음소거)
          <span className="text-xl filter grayscale">🔇</span>
        )}
      </motion.button>
      
      {/* 회전 애니메이션 스타일 정의 */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
}