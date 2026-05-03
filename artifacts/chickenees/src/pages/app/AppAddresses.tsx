import React, { useState } from 'react';
import { AppBottomNav } from '../../components/layout/AppBottomNav';
import { BrandButton } from '../../components/brand/BrandButton';
import { AppBackButton } from '../../components/layout/AppBackButton';
import { addresses as initialAddresses } from '../../data/addresses';

export default function AppAddresses() {
  const [addrList, setAddrList] = useState(initialAddresses);
  const [isAdding, setIsAdding] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newDetail, setNewDetail] = useState('');

  const handleDelete = (id: number) => {
    setAddrList(curr => current => curr.filter(a => a.id !== id));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel || !newDetail) return;
    setAddrList([...addrList, { id: Date.now(), label: newLabel, detail: newDetail }]);
    setIsAdding(false);
    setNewLabel('');
    setNewDetail('');
  };

  return (
    <div className="h-[100dvh] bg-[#F7F2E9] flex flex-col overflow-hidden" dir="rtl">
      <div className="bg-[#111111] text-[#F7F2E9] p-4 pt-safe border-b-[3px] border-[#111111] flex justify-between items-center flex-shrink-0">
        <h1 className="font-cairo font-black text-2xl skew-word">عناوين التوصيل</h1>
        <AppBackButton to="/app/profile" theme="dark" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {addrList.map(addr => (
          <div key={addr.id} className="bg-white border-[3px] border-[#111111] p-4 shadow-[5px_5px_0_#111111] flex justify-between items-start">
            <div>
              <h3 className="font-cairo font-black text-xl mb-1">{addr.label}</h3>
              <p className="font-cairo font-bold text-[#8A8580]">{addr.detail}</p>
            </div>
            <button 
              onClick={() => handleDelete(addr.id)}
              className="text-[#E31C23] font-cairo font-black text-sm border-2 border-[#E31C23] px-2 py-1 hover:bg-[#E31C23] hover:text-[#F7F2E9]"
            >
              حذف
            </button>
          </div>
        ))}

        {!isAdding ? (
          <BrandButton variant="ghost" className="w-full py-4 border-dashed" onClick={() => setIsAdding(true)}>
            + إضافة عنوان جديد
          </BrandButton>
        ) : (
          <div className="bg-[#FFB400] border-[3px] border-[#111111] p-5 shadow-[6px_6px_0_#111111]">
            <h3 className="font-cairo font-black text-xl mb-4">عنوان جديد</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <input 
                type="text" 
                placeholder="اسم العنوان (مثال: العمل)" 
                value={newLabel}
                onChange={e => setNewLabel(e.target.value)}
                className="w-full bg-white border-2 border-[#111111] p-3 font-cairo font-bold focus:outline-none focus:border-[#E31C23]"
              />
              <input 
                type="text" 
                placeholder="التفاصيل (الحي، الشارع، المبنى)" 
                value={newDetail}
                onChange={e => setNewDetail(e.target.value)}
                className="w-full bg-white border-2 border-[#111111] p-3 font-cairo font-bold focus:outline-none focus:border-[#E31C23]"
              />
              <div className="flex gap-2">
                <BrandButton type="submit" variant="primary" className="flex-1">حفظ</BrandButton>
                <BrandButton type="button" variant="ghost" onClick={() => setIsAdding(false)}>إلغاء</BrandButton>
              </div>
            </form>
          </div>
        )}

      </div>

      <AppBottomNav />
    </div>
  );
}
