import React from 'react';
import { Link, useLocation } from 'wouter';
import { RoosterSVG } from '../brand/RoosterSVG';
import { BrandButton } from '../brand/BrandButton';

export const MarketingNav = () => {
  const [location] = useLocation();

  const links = [
    { href: '/', label: 'الرئيسية' },
    { href: '/menu', label: 'المنيو' },
    { href: '/about', label: 'عن تشيكنييز' },
    { href: '/locations', label: 'فروعنا' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#F7F2E9] border-b-2 border-[#111111] px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center border-2 border-[#111111] shadow-[4px_4px_0_#E31C23] overflow-hidden p-1">
            <RoosterSVG />
          </div>
          <span className="font-cairo font-black text-2xl skew-word">تشيكنييز</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-cairo font-bold text-lg">
          {links.map(link => (
            <Link key={link.href} href={link.href} className="hover:text-[#E31C23] transition-colors relative">
              {link.label}
              {location === link.href && (
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#FFB400] transform skew-x-[-12deg]" />
              )}
            </Link>
          ))}
        </div>

        <Link href="/app" className="inline-block">
          <BrandButton variant="primary" data-testid="link-order-now">
            اطلب الآن ←
          </BrandButton>
        </Link>
      </div>
    </nav>
  );
};
