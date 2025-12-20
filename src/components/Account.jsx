import { useState } from 'react';

// 개별 계좌 한 줄을 보여주는 컴포넌트 (복사 기능 포함)
function AccountRow({ name, relation, bank, account }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(`${bank} ${account}`);
    alert("계좌번호가 복사되었습니다! ✨");
  };

  return (
    <div className="flex justify-between items-center py-3 border-b last:border-0 border-gray-100">
      <div className="text-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-gray-700">{name}</span>
          <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{relation}</span>
        </div>
        <div className="flex gap-2 text-gray-600">
          <span>{bank}</span>
          <span className="font-mono">{account}</span>
        </div>
      </div>
      <button 
        onClick={handleCopy}
        className="bg-white border border-gray-200 px-3 py-1.5 rounded text-xs text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm"
      >
        복사
      </button>
    </div>
  );
}

// 아코디언 컴포넌트 (토글)
function AccountGroup({ title, accounts }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b last:border-0 border-gray-100">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center py-4 px-4 hover:bg-gray-50 transition"
      >
        <span className="font-medium text-gray-700">{title}</span>
        <span className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {/* 열렸을 때 나오는 계좌 목록 */}
      {isOpen && (
        <div className="px-4 pb-4 bg-gray-50/50">
          {accounts.map((acc, index) => (
            <AccountRow 
              key={index}
              name={acc.name}
              relation={acc.relation}
              bank={acc.bank}
              account={acc.account}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Account() {
  // 1. 신랑측 계좌 목록
  const groomAccounts = [
    { name: "승영현", relation: "아버지", bank: "농협은행", account: "123-1234-1234-11" },
    { name: "김은희", relation: "어머니", bank: "신한은행", account: "110-123-456789" },
    { name: "승지열", relation: "신랑", bank: "국민은행", account: "28510204372742" },
  ];

  // 2. 신부측 계좌 목록
  const brideAccounts = [
    { name: "김치곤", relation: "아버지", bank: "NH농협", account: "659-02-018032" },
    { name: "정수민", relation: "어머니", bank: "하나은행", account: "123-456789-00107" },
    { name: "김채린", relation: "신부", bank: "국민은행", account: "92717976341" },
  ];

  return (
    <div className="w-full px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <AccountGroup title="신랑측 마음 전하실 곳" accounts={groomAccounts} />
        <AccountGroup title="신부측 마음 전하실 곳" accounts={brideAccounts} />
      </div>
    </div>
  );
}