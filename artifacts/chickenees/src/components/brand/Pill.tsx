import React from 'react';
import { cn } from '@/lib/utils';

export const Pill = ({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span 
      className={cn("px-4 py-1.5 rounded-full bg-[#111111] text-[#F7F2E9] font-mono text-sm tracking-widest uppercase border-2 border-[#111111]", className)}
      {...props}
    >
      {children}
    </span>
  );
};
