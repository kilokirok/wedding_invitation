import { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import imageCompression from 'browser-image-compression'; // 압축 도구

export default function PhotoUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(""); // 진행 상태 메시지

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    let successCount = 0;

    // 압축 옵션 설정
    const options = {
      maxSizeMB: 1, // 최대 1MB 넘지 않게 (보통 300~500KB로 됨)
      maxWidthOrHeight: 1920, // FHD 화질 유지 (웹용으로 충분)
      useWebWorker: true, // 속도 향상
    };

    try {
      // 선택된 모든 파일 반복 처리
      const uploadPromises = Array.from(files).map(async (file, index) => {
        try {
          setProgress(`${index + 1}번째 사진 압축 중...`);
          
          // 1. 이미지 압축
          const compressedFile = await imageCompression(file, options);
          
          // 2. 파일명 중복 방지 (날짜_랜덤_이름)
          const uniqueName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${file.name}`;
          const storageRef = ref(storage, `guest_photos/${uniqueName}`);

          // 3. Firebase 업로드
          await uploadBytes(storageRef, compressedFile);
          successCount++;
        } catch (err) {
          console.error("개별 파일 업로드 실패:", err);
        }
      });

      // 모든 업로드가 끝날 때까지 대기
      await Promise.all(uploadPromises);

      alert(`사진 ${successCount}장이 성공적으로 전송되었습니다! \n소중한 추억 감사합니다 📸`);
      e.target.value = null; // 입력창 초기화
    } catch (error) {
      console.error("전체 업로드 프로세스 에러:", error);
      alert("업로드 중 문제가 발생했습니다.");
    } finally {
      setUploading(false);
      setProgress("");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 mb-16">
      <div className="bg-[#fcfafb] p-6 rounded-xl border border-gray-100 text-center shadow-sm">
        <h3 className="font-serif text-lg text-gray-800 mb-2">사진 공유</h3>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          결혼식에서 찍은 예쁜 사진들을 공유해 주세요.<br/>
          보내주신 사진은 소중히 간직하겠습니다.
        </p>

        <label 
          className={`
            block w-full py-4 px-4 rounded-lg border-2 border-dashed border-gray-300 
            bg-white transition flex flex-col items-center justify-center gap-2 cursor-pointer
            ${uploading ? 'opacity-70 cursor-wait bg-gray-50' : 'hover:border-yellow-400 hover:bg-yellow-50'}
          `}
        >
          <input 
            type="file" 
            multiple // 여러 장 선택 가능
            accept="image/*" // 이미지만 허용
            onChange={handleImageUpload} 
            disabled={uploading}
            className="hidden" 
          />
          
          {uploading ? (
            <>
              {/* 로딩 스피너 */}
              <div className="w-8 h-8 border-4 border-gray-200 border-t-yellow-400 rounded-full animate-spin mb-1"></div>
              <span className="font-bold text-gray-600 text-sm">업로드 중입니다...</span>
              <span className="text-xs text-gray-400">{progress}</span>
            </>
          ) : (
            <>
              <span className="text-3xl">📷</span>
              <span className="font-bold text-gray-700">사진 올리기</span>
              <span className="text-xs text-gray-400">(여러 장 선택 가능)</span>
            </>
          )}
        </label>
      </div>
    </div>
  );
}