import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { RoosterSVG } from '../../components/brand/RoosterSVG';
import { BrandButton } from '../../components/brand/BrandButton';
import { user } from '../../data/user';

export default function AppWelcome() {
  const [, setLocation] = useLocation();
  const [phone, setPhone] = useState(user.phone);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation('/app/home');
  };

  return (
    <div className="min-h-screen bg-[#F7F2E9] flex flex-col relative overflow-hidden" dir="rtl">
      {/* Background Halftone */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(17,17,17,.08) 1px, transparent 1.2px)',
        backgroundSize: '14px 14px'
      }}/>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        
        <div className="mb-12 relative" style={{width: 200, height: 200}}>
          <div className="absolute rounded-full" style={{
            inset: '8% 12%',
            background: '#111111',
            boxShadow: '10px 10px 0 #E31C23',
            backgroundImage: 'radial-gradient(rgba(255,255,255,.14) 1px, transparent 1.2px)',
            backgroundSize: '10px 10px'
          }}>
          </div>
          <div className="absolute" style={{inset: '0'}}>
            <RoosterSVG />
          </div>
        </div>

        <div className="text-center w-full max-w-sm">
          <h1 className="font-cairo font-black text-5xl mb-2 skew-word">
            أهلاً بك <span className="underline-yellow">في تشيكنييز</span>
          </h1>
          <p className="font-cairo font-bold text-[#8A8580] mb-10 text-lg">سجل دخولك واطلب اللي يرضي جوعك</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input 
                type="tel" 
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-white border-[3px] border-[#111111] p-4 font-mono text-xl text-center shadow-[5px_5px_0_#111111] focus:outline-none focus:shadow-[5px_5px_0_#E31C23] transition-shadow"
                dir="ltr"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-cairo font-bold text-[#8A8580]">رقم الجوال</span>
            </div>

            <BrandButton type="submit" variant="red" className="w-full text-xl py-4">
              دخول
            </BrandButton>
          </form>
          
          <button onClick={handleLogin} className="mt-8 font-cairo font-bold text-[#8A8580] underline hover:text-[#111111]">
            تخطي وتسجيل الدخول كزائر
          </button>
        </div>
      </div>
    </div>
  );
}
