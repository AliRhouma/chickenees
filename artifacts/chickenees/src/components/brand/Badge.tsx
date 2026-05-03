import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'ink' | 'red' | 'yellow' | 'cream';
  skewed?: boolean;
}

export const Badge = ({ variant = 'ink', skewed = true, className, children, ...props }: BadgeProps) => {
  let bg = '#111111';
  let color = '#F7F2E9';

  if (variant === 'red') { bg = '#E31C23'; color = '#F7F2E9'; }
  else if (variant === 'yellow') { bg = '#FFB400'; color = '#111111'; }
  else if (variant === 'cream') { bg = '#F7F2E9'; color = '#111111'; }

  return (
    <span 
      className={cn("inline-block border-2 border-ink px-3 py-1 font-cairo font-bold text-sm shadow-[3px_3px_0_#111111]", className)}
      style={{
        background: bg, 
        color,
        transform: skewed ? 'skewX(-8deg)' : 'none'
      }}
      {...props}
    >
      <span style={{ display: 'inline-block', transform: skewed ? 'skewX(8deg)' : 'none' }}>
        {children}
      </span>
    </span>
  );
};
