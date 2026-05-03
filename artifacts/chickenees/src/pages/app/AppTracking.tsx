import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { AppBottomNav } from '../../components/layout/AppBottomNav';
import { BrandButton } from '../../components/brand/BrandButton';
import { RoosterSVG } from '../../components/brand/RoosterSVG';
import { AppBackButton } from '../../components/layout/AppBackButton';

const trackingSteps = ['تم استلام طلبك', 'جاري التحضير 🔥', 'الطلب في الطريق 🛵', 'تم التوصيل ✅'];

export default function AppTracking() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < trackingSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const isComplete = currentStep === trackingSteps.length - 1;

  return (
    <div className="h-[100dvh] bg-[#F7F2E9] flex flex-col relative overflow-hidden" dir="rtl">
      
      <div className="bg-[#111111] text-[#F7F2E9] p-6 pt-safe rounded-b-[30px] border-b-[4px] border-[#E31C23] z-10">
        <div className="flex justify-between items-center mb-2">
          <h1 className="font-cairo font-black text-2xl skew-word">تتبع الطلب</h1>
          <AppBackButton to="/app/home" theme="dark" />
        </div>
        <p className="font-mono text-[#FFB400] text-xl tracking-widest text-center">#2848</p>
      </div>

      <div className="flex-1 p-6 relative z-10 flex flex-col">
        
        {/* Rooster Mascot Animation */}
        <div className="flex justify-center mb-10 mt-4">
          <div className={`transition-transform duration-500 ${isComplete ? 'scale-110' : 'animate-bounce'}`}>
            <div className="relative" style={{width: 160, height: 160}}>
              <div className="absolute rounded-full" style={{
                inset: '8% 12%',
                background: '#111111',
                boxShadow: isComplete ? '8px 8px 0 #FFB400' : '8px 8px 0 #E31C23',
              }}></div>
              <div className="absolute" style={{inset: '0'}}>
                <RoosterSVG />
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white border-[3px] border-[#111111] p-6 shadow-[6px_6px_0_#111111] relative">
          <div className="absolute top-10 bottom-10 right-9 w-1 bg-[#EFE8DA] z-0" />
          <div className="absolute top-10 right-9 w-1 bg-[#E31C23] z-0 transition-all duration-1000" style={{
            height: `${(currentStep / (trackingSteps.length - 1)) * 100}%`,
            bottom: 'auto'
          }} />

          <div className="space-y-8 relative z-10">
            {trackingSteps.map((step, index) => {
              const isActive = index === currentStep;
              const isPast = index < currentStep;

              return (
                <div key={index} className={`flex items-center gap-4 ${isActive || isPast ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-8 h-8 rounded-full border-[3px] border-[#111111] flex items-center justify-center shrink-0
                    ${isPast ? 'bg-[#111111] text-[#FFB400]' : isActive ? 'bg-[#E31C23]' : 'bg-white'}
                    ${isActive ? 'pulse' : ''}
                  `}>
                    {isPast && <span className="text-sm font-black">✓</span>}
                  </div>
                  <span className={`font-cairo font-black text-xl ${isActive ? 'text-[#E31C23] skew-word' : ''}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {isComplete && (
          <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4">
            <p className="font-cairo font-bold text-2xl mb-6">بالعافية عليك! 🍗</p>
            <Link href="/app/home">
              <BrandButton variant="red" className="w-full">العودة للرئيسية</BrandButton>
            </Link>
          </div>
        )}
      </div>

      <AppBottomNav />
    </div>
  );
}
