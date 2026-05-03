import React from 'react';
import { Link } from 'wouter';
import { RoosterSVG } from '../brand/RoosterSVG';
import { branches } from '../../data/branches';

export const MarketingFooter = () => {
  return (
    <footer className="bg-[#111111] text-[#F7F2E9] border-t-[4px] border-[#111111]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-full bg-[#F7F2E9] flex items-center justify-center p-1 border-2 border-[#E31C23]">
                <RoosterSVG />
              </div>
              <span className="font-cairo font-black text-3xl skew-word text-[#F7F2E9]">تشيكنييز</span>
            </div>
            <p className="font-cairo font-bold text-lg text-[#8A8580] leading-relaxed">
              كريسبي على مزاجك.<br/>أعلى جودة، أقوى قرمشة.
            </p>
          </div>

          <div>
            <h4 className="font-mono uppercase tracking-[1.5px] text-[#FFB400] mb-6">روابط سريعة</h4>
            <ul className="space-y-4 font-cairo font-bold text-lg">
              <li><Link href="/" className="hover:text-[#FFB400] transition-colors">الرئيسية</Link></li>
              <li><Link href="/menu" className="hover:text-[#FFB400] transition-colors">المنيو</Link></li>
              <li><Link href="/about" className="hover:text-[#FFB400] transition-colors">عن تشيكنييز</Link></li>
              <li><Link href="/app" className="text-[#E31C23] hover:text-[#FFB400] transition-colors">تطبيق الطلبات</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono uppercase tracking-[1.5px] text-[#FFB400] mb-6">فروعنا</h4>
            <ul className="space-y-4 font-cairo font-bold text-lg">
              {branches.map(branch => (
                <li key={branch.id} className="text-[#8A8580]">
                  <span className="text-[#F7F2E9] block">{branch.nameAr}</span>
                  {branch.city} - {branch.street}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono uppercase tracking-[1.5px] text-[#FFB400] mb-6">تواصل معنا</h4>
            <ul className="space-y-4 font-cairo font-bold text-lg text-[#8A8580]">
              <li><a href="#" className="hover:text-[#FFB400] transition-colors">إنستقرام</a></li>
              <li><a href="#" className="hover:text-[#FFB400] transition-colors">تويتر (X)</a></li>
              <li><a href="#" className="hover:text-[#FFB400] transition-colors">تيك توك</a></li>
            </ul>
          </div>

        </div>
      </div>
      
      <div className="border-t-2 border-[#333] py-6 text-center font-mono text-[#8A8580] text-sm uppercase tracking-[1.5px]">
        © 2026 تشيكنييز · CRUNCH IS AN ART
      </div>
    </footer>
  );
};
