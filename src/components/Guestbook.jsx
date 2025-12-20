import { useState, useEffect } from 'react';
import { db } from '../firebase'; // 방금 만든 설정 파일 import
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

export default function Guestbook() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  // 1. 방명록 데이터 실시간으로 가져오기
  useEffect(() => {
    // 'guestbook'이라는 컬렉션(폴더)에서 날짜 내림차순(최신순)으로 가져옴
    const q = query(collection(db, 'guestbook'), orderBy('timestamp', 'desc'));
    
    // onSnapshot은 데이터가 바뀔 때마다 자동으로 실행됩니다 (실시간)
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe(); // 컴포넌트 꺼질 때 연결 해제
  }, []);

  // 2. 메시지 저장하기
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return alert("이름과 내용을 입력해주세요!");

    try {
      await addDoc(collection(db, 'guestbook'), {
        name: name,
        text: text,
        timestamp: serverTimestamp(), // 서버 시간으로 저장
      });
      // 입력창 비우기
      setName('');
      setText('');
      alert("축하 메시지가 등록되었습니다! 🎉");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* 입력 폼 */}
      <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-xl shadow-sm mb-8 border border-gray-100">
        <div className="mb-3">
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200 text-sm"
            maxLength={10}
          />
        </div>
        <div className="mb-3">
          <textarea
            placeholder="축하의 한마디를 남겨주세요 (50자 이내)"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200 text-sm h-20 resize-none"
            maxLength={50}
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-white text-[#3b1e1e] font-bold py-3 rounded-lg hover:bg-[#f0f0f0] transition shadow-sm"
        >
          축하 메시지 남기기 💌
        </button>
      </form>

      {/* 메시지 리스트 */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-hide">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-10">
            아직 작성된 메시지가 없습니다.<br/>첫 번째 축하를 남겨주세요!
          </p>
        ) : (
          messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative"
            >
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-gray-800 text-sm">{msg.name}</span>
                <span className="text-[10px] text-gray-400">
                  {/* 타임스탬프가 있으면 날짜 변환, 없으면(방금 막 쓴거) '방금 전' */}
                  {msg.timestamp ? new Date(msg.timestamp.toDate()).toLocaleDateString() : '방금 전'}
                </span>
              </div>
              <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}