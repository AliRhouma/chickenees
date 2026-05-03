import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MarketingNav } from '../../components/layout/MarketingNav';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { RoosterSVG } from '../../components/brand/RoosterSVG';
import { branches } from '../../data/branches';

/* ── Scroll-fade wrapper ──────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Styled CSS "map" placeholder ────────────────────── */
function MapPlaceholder() {
  return (
    <div
      style={{
        position: 'relative',
        background: '#1A1A1A',
        border: '3px solid #111111',
        boxShadow: '8px 8px 0 #E31C23',
        overflow: 'hidden',
        height: '100%',
        minHeight: 420,
      }}
    >
      {/* Street grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,180,0,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,180,0,.18) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Halftone dot texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,.07) 1px, transparent 1.2px)',
          backgroundSize: '10px 10px',
        }}
      />
      {/* "Roads" */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        preserveAspectRatio="none"
      >
        {/* Horizontal roads */}
        <rect x="0" y="30%" width="100%" height="6" fill="rgba(255,180,0,.35)" rx="2" />
        <rect x="0" y="58%" width="100%" height="10" fill="rgba(255,180,0,.55)" rx="3" />
        <rect x="0" y="78%" width="100%" height="4" fill="rgba(255,180,0,.25)" rx="2" />
        {/* Vertical roads */}
        <rect x="22%" y="0" width="4" height="100%" fill="rgba(255,180,0,.25)" rx="2" />
        <rect x="50%" y="0" width="8" height="100%" fill="rgba(255,180,0,.5)" rx="3" />
        <rect x="74%" y="0" width="4" height="100%" fill="rgba(255,180,0,.25)" rx="2" />
        {/* Blocks */}
        <rect x="5%" y="10%" width="14%" height="18%" fill="rgba(255,255,255,.04)" rx="2" />
        <rect x="25%" y="10%" width="22%" height="18%" fill="rgba(255,255,255,.06)" rx="2" />
        <rect x="54%" y="10%" width="18%" height="18%" fill="rgba(255,255,255,.04)" rx="2" />
        <rect x="5%" y="35%" width="14%" height="20%" fill="rgba(255,255,255,.06)" rx="2" />
        <rect x="25%" y="35%" width="22%" height="20%" fill="rgba(255,255,255,.04)" rx="2" />
        <rect x="54%" y="35%" width="18%" height="20%" fill="rgba(255,255,255,.06)" rx="2" />
        <rect x="76%" y="35%" width="19%" height="20%" fill="rgba(255,255,255,.04)" rx="2" />
        <rect x="5%" y="62%" width="14%" height="14%" fill="rgba(255,255,255,.04)" rx="2" />
        <rect x="25%" y="62%" width="22%" height="14%" fill="rgba(255,255,255,.06)" rx="2" />
        <rect x="54%" y="62%" width="18%" height="14%" fill="rgba(255,255,255,.04)" rx="2" />
      </svg>

      {/* Branch pins */}
      {[
        { x: '30%', y: '52%', color: '#E31C23', label: 'العليا' },
        { x: '62%', y: '28%', color: '#FFB400', label: 'الخبر' },
        { x: '18%', y: '70%', color: '#F7F2E9', label: 'جدة' },
      ].map((pin) => (
        <div
          key={pin.label}
          style={{
            position: 'absolute',
            left: pin.x,
            top: pin.y,
            transform: 'translate(-50%, -100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Pin label */}
          <div
            style={{
              background: pin.color,
              color: pin.color === '#F7F2E9' ? '#111111' : '#F7F2E9',
              fontFamily: 'Cairo',
              fontWeight: 900,
              fontSize: 11,
              padding: '2px 8px',
              border: '2px solid #111111',
              whiteSpace: 'nowrap',
              boxShadow: '2px 2px 0 #111111',
            }}
          >
            {pin.label}
          </div>
          {/* Pin needle */}
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: `10px solid ${pin.color}`,
            }}
          />
        </div>
      ))}

      {/* Watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Anton',
          fontSize: 11,
          letterSpacing: 3,
          color: 'rgba(255,255,255,.25)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        CHICKENEES LOCATIONS MAP
      </div>

      {/* Top label */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          background: '#E31C23',
          color: '#F7F2E9',
          fontFamily: 'Anton',
          fontSize: 11,
          letterSpacing: 2,
          padding: '4px 10px',
          border: '2px solid #111111',
        }}
      >
        🗺 KSA
      </div>
    </div>
  );
}

/* ── Branch card ─────────────────────────────────────── */
function BranchCard({
  branch,
  index,
}: {
  branch: (typeof branches)[number];
  index: number;
}) {
  return (
    <FadeIn delay={index * 0.1}>
      <div
        style={{
          border: '3px solid #111111',
          background: '#F7F2E9',
          boxShadow: '6px 6px 0 #111111',
          overflow: 'hidden',
          transition: 'transform .2s, box-shadow .2s',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translate(-3px,-3px)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '10px 10px 0 #E31C23';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.transform = '';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '6px 6px 0 #111111';
        }}
      >
        {/* Color band */}
        <div
          style={{
            background: branch.mapColor,
            height: 8,
            borderBottom: '3px solid #111111',
          }}
        />

        <div style={{ padding: '24px 24px 20px' }}>
          {/* Header row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 12,
              gap: 12,
            }}
          >
            <h3
              style={{
                fontFamily: 'Cairo',
                fontWeight: 900,
                fontSize: 26,
                lineHeight: 1.1,
                transform: 'skewX(-6deg)',
                display: 'inline-block',
              }}
            >
              {branch.nameAr}
            </h3>
            {/* Status pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 12px',
                border: '2px solid #111111',
                background: branch.isOpen ? '#111111' : '#F7F2E9',
                color: branch.isOpen ? '#F7F2E9' : '#8A8580',
                fontFamily: 'Cairo',
                fontWeight: 900,
                fontSize: 13,
                flexShrink: 0,
                boxShadow: branch.isOpen ? '3px 3px 0 #E31C23' : 'none',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: branch.isOpen ? '#4ADE80' : '#8A8580',
                  display: 'inline-block',
                }}
              />
              {branch.isOpen ? 'مفتوح الآن' : 'مغلق حالياً'}
            </div>
          </div>

          {/* Desc */}
          <p
            style={{
              fontFamily: 'Cairo',
              fontWeight: 700,
              fontSize: 15,
              color: '#4A4540',
              marginBottom: 16,
              lineHeight: 1.6,
            }}
          >
            {branch.desc}
          </p>

          {/* Dashed divider */}
          <div
            style={{
              borderTop: '2px dashed rgba(17,17,17,.15)',
              marginBottom: 16,
            }}
          />

          {/* Info rows */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              marginBottom: 16,
            }}
          >
            {[
              { icon: '📍', text: `${branch.city} — ${branch.street}` },
              { icon: '⏰', text: `أوقات العمل: ${branch.hours}` },
              { icon: '📞', text: branch.phone },
            ].map((row) => (
              <div
                key={row.icon}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: 'Cairo',
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#6A6560',
                }}
              >
                <span style={{ fontSize: 16, flexShrink: 0 }}>{row.icon}</span>
                {row.text}
              </div>
            ))}
          </div>

          {/* Feature chips */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {branch.features.map((f) => (
              <span
                key={f}
                style={{
                  fontFamily: 'Cairo',
                  fontWeight: 900,
                  fontSize: 12,
                  padding: '3px 10px',
                  border: '2px solid #111111',
                  background: '#FFB400',
                  color: '#111111',
                  transform: 'skewX(-6deg)',
                }}
              >
                <span style={{ display: 'inline-block', transform: 'skewX(6deg)' }}>{f}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Page ────────────────────────────────────────────── */
export default function LocationsPage() {
  return (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F7F2E9' }}
    >
      <MarketingNav />

      {/* Hero */}
      <section
        style={{
          background: '#111111',
          borderBottom: '3px solid #111111',
          padding: '56px 24px 52px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,.10) 1px, transparent 1.2px)',
            backgroundSize: '14px 14px',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              fontFamily: 'Anton',
              fontSize: 12,
              letterSpacing: 4,
              color: '#FFB400',
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            FIND US NEAR YOU
          </div>
          <h1
            style={{
              fontFamily: 'Cairo',
              fontWeight: 900,
              fontSize: 'clamp(52px, 8vw, 88px)',
              color: '#F7F2E9',
              lineHeight: 1,
              display: 'inline-block',
              transform: 'skewX(-6deg)',
              marginBottom: 18,
            }}
          >
            فروعنا
          </h1>
          <p
            style={{
              fontFamily: 'Cairo',
              fontWeight: 700,
              fontSize: 18,
              color: '#8A8580',
              maxWidth: 380,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            {branches.length} فروع. في قلب المملكة. حياك الله.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section
        style={{
          flex: 1,
          padding: '64px 24px 80px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(17,17,17,.055) 1px, transparent 1.2px)',
            backgroundSize: '14px 14px',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            alignItems: 'start',
          }}
          className="locations-layout"
        >
          {/* Branch cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 11,
                letterSpacing: 3,
                color: '#8A8580',
                textTransform: 'uppercase',
                marginBottom: 4,
              }}
            >
              {branches.filter(b => b.isOpen).length} مفتوح الآن ·{' '}
              {branches.filter(b => !b.isOpen).length} مغلق
            </div>
            {branches.map((branch, i) => (
              <BranchCard key={branch.id} branch={branch} index={i} />
            ))}
          </div>

          {/* Map — sticky */}
          <FadeIn delay={0.15} y={16}>
            <div style={{ position: 'sticky', top: 100 }}>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 11,
                  letterSpacing: 3,
                  color: '#8A8580',
                  textTransform: 'uppercase',
                  marginBottom: 12,
                }}
              >
                BRANCH MAP
              </div>
              <MapPlaceholder />
              {/* Legend */}
              <div
                style={{
                  marginTop: 16,
                  display: 'flex',
                  gap: 16,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {branches.map((b) => (
                  <div
                    key={b.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontFamily: 'Cairo',
                      fontWeight: 700,
                      fontSize: 13,
                      color: '#4A4540',
                    }}
                  >
                    <span
                      style={{
                        width: 12,
                        height: 12,
                        background: b.mapColor,
                        border: '2px solid #111111',
                        display: 'inline-block',
                        flexShrink: 0,
                      }}
                    />
                    {b.nameAr}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Coming soon band */}
      <section
        style={{
          background: '#FFB400',
          borderTop: '3px solid #111111',
          borderBottom: '3px solid #111111',
          padding: '36px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(17,17,17,.1) 1px, transparent 1.2px)',
            backgroundSize: '10px 10px',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span
            style={{
              fontFamily: 'Anton',
              fontSize: 13,
              letterSpacing: 3,
              color: '#111111',
              opacity: 0.6,
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 8,
            }}
          >
            COMING SOON
          </span>
          <p
            style={{
              fontFamily: 'Cairo',
              fontWeight: 900,
              fontSize: 24,
              color: '#111111',
              transform: 'skewX(-5deg)',
              display: 'inline-block',
            }}
          >
            فروع جديدة في طريقها — الدمام · مكة · أبوظبي 🚀
          </p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
