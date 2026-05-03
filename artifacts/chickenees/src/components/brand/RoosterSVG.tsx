import React from 'react';

export const RoosterSVG = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 240 260">
    {/* Mohawk */}
    <path d="M120 8 L100 45 L80 22 L72 60 L52 38 L48 78 L34 60 L40 100 Q70 75 120 70 Q170 75 200 100 L206 60 L192 78 L188 38 L168 60 L160 22 L140 45 Z" fill="#E31C23" stroke="#111" strokeWidth="3" strokeLinejoin="round"/>
    {/* Body */}
    <ellipse cx="120" cy="135" rx="78" ry="74" fill="#FFFFFF" stroke="#111" strokeWidth="4"/>
    {/* Wing */}
    <path d="M50 150 Q60 195 110 205 L110 175 Q70 165 50 150Z" fill="#F2F2F2"/>
    {/* Sunglasses frame */}
    <rect x="38" y="118" width="164" height="6" fill="#111"/>
    <rect x="50" y="124" width="64" height="34" rx="6" fill="#111" stroke="#111" strokeWidth="3"/>
    <rect x="126" y="124" width="64" height="34" rx="6" fill="#111" stroke="#111" strokeWidth="3"/>
    {/* Lens */}
    <path d="M58 130 L78 130 L70 152 L52 152 Z" fill="#3A3A3A"/>
    <path d="M134 130 L154 130 L146 152 L128 152 Z" fill="#3A3A3A"/>
    {/* Lens glint */}
    <circle cx="68" cy="135" r="2.5" fill="#FFFFFF"/>
    <circle cx="144" cy="135" r="2.5" fill="#FFFFFF"/>
    {/* Beak */}
    <path d="M100 168 Q120 162 140 168 L132 188 Q120 196 108 188 Z" fill="#FFB400" stroke="#111" strokeWidth="3" strokeLinejoin="round"/>
    <line x1="100" y1="178" x2="140" y2="178" stroke="#111" strokeWidth="2.5"/>
    {/* Wattle */}
    <path d="M108 196 Q112 220 124 222 Q136 220 132 196 Q120 200 108 196Z" fill="#E31C23" stroke="#111" strokeWidth="3" strokeLinejoin="round"/>
  </svg>
);
