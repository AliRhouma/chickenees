import React from 'react';
import { AppBottomNav } from '../../components/layout/AppBottomNav';
import { Badge } from '../../components/brand/Badge';
import { BrandButton } from '../../components/brand/BrandButton';
import { AppBackButton } from '../../components/layout/AppBackButton';
import { branches } from '../../data/branches';

export default function AppBranches() {
  return (
    <div className="h-[100dvh] bg-[#F7F2E9] flex flex-col overflow-hidden" dir="rtl">
      <div className="bg-[#111111] text-[#F7F2E9] p-4 pt-safe border-b-[3px] border-[#111111] flex justify-between items-center flex-shrink-0">
        <h1 className="font-cairo font-black text-2xl skew-word">فروعنا</h1>
        <AppBackButton to="/app/home" theme="dark" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {branches.map(branch => (
          <div key={branch.id} className="bg-white border-[3px] border-[#111111] p-5 shadow-[5px_5px_0_#111111]">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-cairo font-black text-2xl skew-word">{branch.nameAr}</h3>
              <Badge variant={branch.isOpen ? 'cream' : 'ink'} className={branch.isOpen ? '!text-[#111111]' : ''}>
                {branch.isOpen ? 'مفتوح الآن' : 'مغلق'}
              </Badge>
            </div>
            <div className="space-y-2 font-cairo font-bold text-lg text-[#8A8580] mb-6">
              <p>📍 {branch.city} - {branch.street}</p>
              <p>⏰ أوقات العمل: {branch.hours}</p>
            </div>
            <a href="#" onClick={e => e.preventDefault()} className="block">
              <BrandButton variant="ghost" className="w-full">
                احصل على الاتجاهات 🗺️
              </BrandButton>
            </a>
          </div>
        ))}
      </div>

      <AppBottomNav />
    </div>
  );
}
