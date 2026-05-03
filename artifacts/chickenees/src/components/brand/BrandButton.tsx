import React from 'react';
import { cn } from '@/lib/utils';

interface BrandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'red' | 'yellow' | 'ghost';
  children: React.ReactNode;
}

export const BrandButton = ({ variant = 'primary', className, children, ...props }: BrandButtonProps) => {
  let bg = '#111111';
  let color = '#F7F2E9';
  let shadowColor = '#E31C23';
  let border = '2px solid #111111';

  if (variant === 'red') {
    bg = '#E31C23';
    color = '#F7F2E9';
    shadowColor = '#111111';
  } else if (variant === 'yellow') {
    bg = '#FFB400';
    color = '#111111';
    shadowColor = '#111111';
  } else if (variant === 'ghost') {
    bg = 'transparent';
    color = '#111111';
    shadowColor = '#E31C23';
  }

  return (
    <button 
      {...props}
      className={cn("", className)}
      style={{
        background: bg, color, border,
        padding: '16px 30px', fontFamily: 'Cairo', fontWeight: 900, fontSize: 16,
        boxShadow: `5px 5px 0 ${shadowColor}`,
        transform: 'skewX(-8deg)', cursor: 'pointer', transition: 'transform .15s, box-shadow .15s',
        ...props.style
      }} 
      onMouseEnter={e => { 
        e.currentTarget.style.transform='skewX(-8deg) translate(-3px,-3px)'; 
        e.currentTarget.style.boxShadow=`8px 8px 0 ${shadowColor}`; 
      }} 
      onMouseLeave={e => { 
        e.currentTarget.style.transform='skewX(-8deg)'; 
        e.currentTarget.style.boxShadow=`5px 5px 0 ${shadowColor}`; 
      }}
    >
      <span style={{display:'inline-block', transform:'skewX(8deg)'}}>{children}</span>
    </button>
  );
};
