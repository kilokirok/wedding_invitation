import { useState } from 'react';

// 아코디언 컴포넌트 (내부에서만 사용)
function AccountItem({ title, name, account, bank }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${bank} ${account}`);
    alert("계좌번호가 복사되었습니다! ✨");
  };

  return (
    <div className="border-b last:border-0 border-gray-100">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center py-4 px-2 hover:bg-gray-50 transition"
      >
        <span className="font-medium text-gray-700">{title}</span>
        <span className="text-sm text-gray-400">{isOpen ? "▲" : "▼"}</span>
      </button>
      
      {isOpen && (
        <div className="pb-4 px-2 bg-gray-50 rounded-lg mb-2 flex justify-between items-center">
          <div className="text-sm">
            <p className="text-gray-500 mb-1">{bank}</p>
            <p className="font-bold text-gray-800">{account}</p>
            <p className="text-gray-500 text-xs mt-1">예금주: {name}</p>
          </div>
          <button 
            onClick={handleCopy}
            className="bg-white border border-gray-300 px-3 py-1 rounded text-xs font-bold text-gray-600 shadow-sm active:bg-gray-100"
          >
            복사
          </button>
        </div>
      )}
    </div>
  );
}

export default function Account() {
  return (
    <div className="w-full px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
        <AccountItem title="신랑측 마음 전하실 곳" name="승지열" bank="국민은행" account="28510204372742" />
        <AccountItem title="신부측 마음 전하실 곳" name="김채린" bank="우리은행" account="999-8888-7777" />
      </div>
    </div>
  );
}