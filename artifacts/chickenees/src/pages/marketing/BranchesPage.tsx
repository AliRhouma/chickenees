import React from 'react';
import { MarketingNav } from '../../components/layout/MarketingNav';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { HalftoneSection } from '../../components/brand/HalftoneSection';
import { Badge } from '../../components/brand/Badge';
import { branches } from '../../data/branches';

export default function BranchesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MarketingNav />

      <HalftoneSection className="pt-20 pb-16 text-center">
        <h1 className="font-cairo font-black text-7xl mb-6 skew-word">
          فروعنا <span className="underline-yellow">القريبة</span>
        </h1>
        <p className="font-cairo font-bold text-2xl text-[#8A8580] max-w-2xl mx-auto">
          تبي تزورنا؟ شوف أقرب فرع لك وحياك الله.
        </p>
      </HalftoneSection>

      <HalftoneSection className="py-12 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Branch List */}
          <div className="space-y-6">
            {branches.map(branch => (
              <div key={branch.id} className="border-[3px] border-[#111111] bg-[#F7F2E9] p-6 shadow-[6px_6px_0_#111111] transition-transform hover:-translate-y-1 hover:shadow-[9px_9px_0_#E31C23]">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-cairo font-black text-2xl skew-word">{branch.nameAr}</h3>
                  <Badge variant={branch.isOpen ? 'cream' : 'ink'} className={branch.isOpen ? '!text-[#111111]' : ''}>
                    {branch.isOpen ? 'مفتوح الآن' : 'مغلق'}
                  </Badge>
                </div>
                <div className="space-y-2 font-cairo font-bold text-lg text-[#8A8580]">
                  <p>📍 {branch.city} - {branch.street}</p>
                  <p>⏰ أوقات العمل: {branch.hours}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="border-[4px] border-[#111111] bg-[#111111] shadow-[8px_8px_0_#E31C23] h-[600px] flex items-center justify-center relative overflow-hidden sticky top-32">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px, transparent 1.2px)',
              backgroundSize: '20px 20px'
            }} />
            <div className="font-cairo font-black text-4xl text-[#F7F2E9] skew-word z-10 text-center">
              <span className="block text-6xl mb-4">📍</span>
              خريطة الفروع
            </div>
          </div>

        </div>
      </HalftoneSection>

      <MarketingFooter />
    </div>
  );
}
