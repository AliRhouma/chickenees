import React from 'react';
import { cn } from '@/lib/utils';

interface StickerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'circle' | 'rect' | 'tag';
  children: React.ReactNode;
}

export const Sticker = ({ variant = 'circle', children, className, style, ...props }: StickerProps) => {
  if (variant === 'circle') {
    return (
      <div 
        className={cn("sticker-wiggle", className)} 
        style={{
          width:120, height:120, borderRadius:'50%', background:'#E31C23', color:'#F7F2E9',
          border:'3px solid #111', boxShadow:'5px 5px 0 #111',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:'Cairo', fontWeight:900, fontSize:22, textAlign:'center',
          ...style
        }}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (variant === 'rect') {
    return (
      <div 
        className={cn("", className)}
        style={{
          padding:'14px 22px', background:'#FFB400', color:'#111111',
          border:'3px solid #111', boxShadow:'5px 5px 0 #111',
          transform:'rotate(6deg)', borderRadius:14,
          fontFamily:'Cairo', fontWeight:900, fontSize:22,
          ...style
        }}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div 
      className={cn("", className)}
      style={{
        padding:'10px 18px', background:'#111111', color:'#F7F2E9',
        fontFamily:'Anton', fontSize:18, letterSpacing:2,
        transform:'skewX(-8deg)', boxShadow:'4px 4px 0 #E31C23',
        border:'2px solid #111',
        ...style
      }}
      {...props}
    >
      <span style={{display:'inline-block', transform:'skewX(8deg)'}}>{children}</span>
    </div>
  );
};
