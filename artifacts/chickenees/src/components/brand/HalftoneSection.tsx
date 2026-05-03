import React from 'react';
import { cn } from '@/lib/utils';

interface HalftoneSectionProps extends React.HTMLAttributes<HTMLElement> {
  dark?: boolean;
}

export const HalftoneSection = ({ dark = false, children, className, style, ...props }: HalftoneSectionProps) => {
  return (
    <section 
      className={cn("relative py-24", className)} 
      style={{
        background: dark ? '#111111' : '#F7F2E9',
        color: dark ? '#F7F2E9' : '#111111',
        ...style
      }}
      {...props}
    >
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage: dark 
          ? 'radial-gradient(rgba(255,255,255,.14) 1px, transparent 1.2px)'
          : 'radial-gradient(rgba(17,17,17,.08) 1px, transparent 1.2px)',
        backgroundSize:'14px 14px'
      }}/>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {children}
      </div>
    </section>
  );
};
