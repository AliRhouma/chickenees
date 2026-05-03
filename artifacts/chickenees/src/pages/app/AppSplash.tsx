import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { RoosterSVG } from '../../components/brand/RoosterSVG';
import { PhoneFrame } from '../../components/layout/PhoneFrame';

function LoadingDots() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
      {[0, 0.18, 0.36].map((delay, i) => (
        <motion.span
          key={i}
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#FFB400',
            display: 'inline-block',
          }}
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -8, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export default function AppSplash() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const t = setTimeout(() => setLocation('/app/login'), 2200);
    return () => clearTimeout(t);
  }, [setLocation]);

  return (
    <PhoneFrame bg="#111111">
      <div
        dir="rtl"
        style={{
          minHeight: '100%',
          background: '#111111',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Halftone background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,.07) 1px, transparent 1.2px)',
            backgroundSize: '14px 14px',
            pointerEvents: 'none',
          }}
        />

        {/* Red diagonal accent — top-right */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 160,
            height: 160,
            background: '#E31C23',
            transform: 'rotate(45deg)',
            opacity: 0.18,
          }}
        />
        {/* Yellow diagonal accent — bottom-left */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            position: 'absolute',
            bottom: -40,
            left: -40,
            width: 120,
            height: 120,
            background: '#FFB400',
            transform: 'rotate(45deg)',
            opacity: 0.15,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
          {/* Mascot — spring bounce in */}
          <motion.div
            initial={{ scale: 0.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.05 }}
            style={{ position: 'relative', width: 200, height: 200 }}
          >
            {/* Ink circle */}
            <div
              style={{
                position: 'absolute',
                inset: '6%',
                borderRadius: '50%',
                background: '#1E1E1E',
                border: '3px solid rgba(255,255,255,.12)',
                boxShadow: '0 0 0 8px rgba(227,28,35,.18), 8px 8px 0 #E31C23',
                backgroundImage: 'radial-gradient(rgba(255,255,255,.10) 1px, transparent 1.2px)',
                backgroundSize: '12px 12px',
              }}
            />
            {/* Spinning dashed ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: -6,
                borderRadius: '50%',
                border: '3px dashed rgba(255,180,0,.4)',
              }}
            />
            {/* Mascot SVG */}
            <div style={{ position: 'absolute', inset: 0 }}>
              <RoosterSVG className="w-full h-full" />
            </div>
          </motion.div>

          {/* Wordmark — fade up */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ textAlign: 'center' }}
          >
            <div
              style={{
                fontFamily: 'Cairo',
                fontWeight: 900,
                fontSize: 44,
                color: '#F7F2E9',
                letterSpacing: -1,
                lineHeight: 1,
                transform: 'skewX(-5deg)',
                display: 'inline-block',
              }}
            >
              تشيكنييز
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              style={{
                fontFamily: 'Anton',
                fontSize: 11,
                letterSpacing: 4,
                color: '#FFB400',
                textTransform: 'uppercase',
                marginTop: 6,
              }}
            >
              CRUNCH IS AN ART
            </motion.div>
          </motion.div>

          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }}
          >
            <LoadingDots />
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
}
