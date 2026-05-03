import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'wouter';
import { MarketingNav } from '../../components/layout/MarketingNav';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { RoosterSVG } from '../../components/brand/RoosterSVG';
import { BrandButton } from '../../components/brand/BrandButton';

/* ── Scroll-fade wrapper ───────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  y = 32,
  x = 0,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  x?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Count-up stat ─────────────────────────────────────── */
function CountStat({
  target,
  suffix = '',
  prefix = '',
  label,
  color = '#E31C23',
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  color?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = Date.now();
    const frame = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [inView, target]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div
        style={{
          fontFamily: 'Anton',
          fontSize: 'clamp(56px, 8vw, 88px)',
          color,
          letterSpacing: 1,
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {prefix}{count.toLocaleString('ar-SA')}{suffix}
      </div>
      <div
        style={{
          fontFamily: 'Cairo',
          fontWeight: 900,
          fontSize: 18,
          color: '#8A8580',
          lineHeight: 1.4,
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ── Voice section card ────────────────────────────────── */
function VoiceSection({
  chapter,
  title,
  body,
  bg,
  color,
  accent,
  mascotSide,
  index,
}: {
  chapter: string;
  title: string;
  body: string;
  bg: string;
  color: string;
  accent: string;
  mascotSide: 'right' | 'left' | 'none';
  index: number;
}) {
  const isDark = bg === '#111111';
  return (
    <section
      style={{
        background: bg,
        color,
        borderBottom: '3px solid #111111',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Halftone */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: isDark
            ? 'radial-gradient(rgba(255,255,255,.10) 1px, transparent 1.2px)'
            : 'radial-gradient(rgba(17,17,17,.07) 1px, transparent 1.2px)',
          backgroundSize: '14px 14px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: mascotSide !== 'none' ? '1fr auto' : '1fr',
          gap: 48,
          alignItems: 'center',
        }}
      >
        {/* Text */}
        <FadeIn delay={0} y={28} x={mascotSide === 'left' ? -24 : 24}>
          <div>
            {/* Chapter label */}
            <div
              style={{
                fontFamily: 'Anton',
                fontSize: 12,
                letterSpacing: 4,
                color: accent,
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              {String(index + 1).padStart(2, '0')} / 03 — {chapter}
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: 'Cairo',
                fontWeight: 900,
                fontSize: 'clamp(36px, 5vw, 60px)',
                lineHeight: 1.15,
                marginBottom: 24,
                display: 'inline-block',
                transform: 'skewX(-5deg)',
              }}
            >
              {title}
            </h2>

            {/* Yellow underline accent */}
            <div
              style={{
                height: 6,
                width: 80,
                background: accent,
                marginBottom: 28,
                transform: 'skewX(-12deg)',
              }}
            />

            {/* Body */}
            <p
              style={{
                fontFamily: 'Cairo',
                fontWeight: 700,
                fontSize: 18,
                lineHeight: 1.85,
                color: isDark ? 'rgba(247,242,233,.75)' : '#4A4540',
                maxWidth: 580,
              }}
            >
              {body}
            </p>
          </div>
        </FadeIn>

        {/* Mascot */}
        {mascotSide !== 'none' && (
          <FadeIn delay={0.15} y={20}>
            <div style={{ position: 'relative', width: 220, height: 220, flexShrink: 0 }}>
              <div
                style={{
                  position: 'absolute',
                  inset: '8%',
                  background: isDark ? '#F7F2E9' : '#111111',
                  borderRadius: '50%',
                  border: `3px solid ${isDark ? '#F7F2E9' : '#111111'}`,
                  boxShadow: `8px 8px 0 ${accent}`,
                  backgroundImage: isDark
                    ? 'radial-gradient(rgba(17,17,17,.08) 1px, transparent 1.2px)'
                    : 'radial-gradient(rgba(255,255,255,.14) 1px, transparent 1.2px)',
                  backgroundSize: '12px 12px',
                }}
              />
              <div style={{ position: 'absolute', inset: 0 }}>
                <RoosterSVG className="w-full h-full" />
              </div>
              {/* Rotate label */}
              <div
                style={{
                  position: 'absolute',
                  bottom: -8,
                  right: mascotSide === 'right' ? -8 : 'auto',
                  left: mascotSide === 'left' ? -8 : 'auto',
                  background: accent,
                  color: accent === '#FFB400' ? '#111111' : '#F7F2E9',
                  fontFamily: 'Anton',
                  fontSize: 10,
                  letterSpacing: 2,
                  padding: '4px 8px',
                  border: '2px solid #111111',
                  transform: 'rotate(-10deg)',
                }}
              >
                {index === 0 ? '★ FRESH' : index === 1 ? '🔥 HOT' : '✓ LEGIT'}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────── */
const storySections = [
  {
    chapter: 'القصة',
    title: 'بدأنا بقرمشة واحدة',
    body: 'في 2024، جلسنا حول طاولة وقلنا: الدجاج المقلي الصح مو موجود هنا. الناس تشتري تجميد ومنتهي. قررنا نغير هذا. بدأنا بمطبخ صغير، خلطة سرية من الجدة، وحلم يجنن: نسوي أفضل قرمشة في المنطقة.',
    bg: '#F7F2E9',
    color: '#111111',
    accent: '#FFB400',
    mascotSide: 'right' as const,
  },
  {
    chapter: 'الفلسفة',
    title: 'القرمشة مش بس أكل',
    body: 'القرمشة الحقيقية تحتاج صبر. دجاج طازج يومي ما نلمس المجمد. تتبيلة ٢٤ ساعة. قلي بدرجة حرارة محسوبة لثانية بثانية. كل هذا عشان اللحظة اللي تكسر الطبقة الخارجية بسنك. هذي اللحظة إحنا نعيش لها.',
    bg: '#111111',
    color: '#F7F2E9',
    accent: '#E31C23',
    mascotSide: 'left' as const,
  },
  {
    chapter: 'المستقبل',
    title: 'القادم أعظم',
    body: 'ثلاثة فروع اليوم، والمنطقة كلها بكرة. نبني تشيكنييز كبراند يمثل جيل جديد من المطاعم العربية — جريئة، واثقة، وما تعتذر عن جودتها. إذا أنت هنا معنا من البداية، انت من الأوائل.',
    bg: '#E31C23',
    color: '#F7F2E9',
    accent: '#FFB400',
    mascotSide: 'none' as const,
  },
];

export default function AboutPage() {
  return (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F7F2E9' }}
    >
      <MarketingNav />

      {/* ── HERO ──────────────────────────────────────── */}
      <section
        style={{
          background: '#F7F2E9',
          borderBottom: '3px solid #111111',
          padding: '64px 24px 56px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(17,17,17,.07) 1px, transparent 1.2px)',
            backgroundSize: '16px 16px',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 40,
            alignItems: 'center',
          }}
        >
          {/* Text */}
          <FadeIn y={36}>
            <div
              style={{
                fontFamily: 'Anton',
                fontSize: 12,
                letterSpacing: 4,
                color: '#8A8580',
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              OUR STORY
            </div>
            <h1
              style={{
                fontFamily: 'Cairo',
                fontWeight: 900,
                fontSize: 'clamp(48px, 7vw, 86px)',
                lineHeight: 1.05,
                marginBottom: 20,
              }}
            >
              <span style={{ display: 'block', transform: 'skewX(-5deg)', color: '#111111' }}>
                كرنش
              </span>
              <span
                style={{
                  display: 'block',
                  transform: 'skewX(-5deg)',
                  color: '#E31C23',
                  position: 'relative',
                }}
              >
                إز آن آرت
                <span
                  style={{
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    bottom: -10,
                    height: 10,
                    background: '#FFB400',
                    transform: 'skewX(-10deg)',
                    zIndex: -1,
                  }}
                />
              </span>
            </h1>
            <p
              style={{
                fontFamily: 'Cairo',
                fontWeight: 700,
                fontSize: 19,
                color: '#6A6560',
                maxWidth: 520,
                lineHeight: 1.75,
                marginTop: 20,
              }}
            >
              تشيكنييز مش مجرد مطعم. إحنا بيان. نثبت كل يوم إن الأكل البسيط يصير فن لما تعطيه الاهتمام اللي يستحقه.
            </p>
          </FadeIn>

          {/* Mascot hero */}
          <FadeIn delay={0.2} y={20}>
            <div
              className="mascot-bounce mascot-float"
              style={{ position: 'relative', width: 300, height: 300 }}
            >
              {/* Ink circle */}
              <div
                style={{
                  position: 'absolute',
                  inset: '6%',
                  background: '#111111',
                  borderRadius: '50%',
                  boxShadow: '12px 12px 0 #E31C23',
                  backgroundImage: 'radial-gradient(rgba(255,255,255,.13) 1px, transparent 1.2px)',
                  backgroundSize: '12px 12px',
                }}
              />
              {/* Dashed ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-6px',
                  borderRadius: '50%',
                  border: '4px dashed #FFB400',
                  opacity: 0.5,
                }}
              />
              <div style={{ position: 'absolute', inset: 0 }}>
                <RoosterSVG className="w-full h-full" />
              </div>
              {/* Big label sticker */}
              <div
                style={{
                  position: 'absolute',
                  top: -16,
                  left: -16,
                  background: '#E31C23',
                  color: '#F7F2E9',
                  fontFamily: 'Anton',
                  fontSize: 13,
                  letterSpacing: 2,
                  padding: '6px 14px',
                  border: '2px solid #111111',
                  boxShadow: '4px 4px 0 #111111',
                  transform: 'rotate(-12deg)',
                }}
              >
                SINCE 2024
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── STORY SECTIONS ──────────────────────────────── */}
      {storySections.map((section, i) => (
        <VoiceSection key={i} {...section} index={i} />
      ))}

      {/* ── STATS STRIP ─────────────────────────────────── */}
      <section
        style={{
          background: '#111111',
          borderTop: '3px solid #111111',
          borderBottom: '3px solid #111111',
          padding: '72px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,.09) 1px, transparent 1.2px)',
            backgroundSize: '14px 14px',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto' }}>
          <FadeIn>
            <div
              style={{
                fontFamily: 'Anton',
                fontSize: 12,
                letterSpacing: 4,
                color: '#FFB400',
                textTransform: 'uppercase',
                textAlign: 'center',
                marginBottom: 48,
              }}
            >
              BY THE NUMBERS
            </div>
          </FadeIn>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 32,
              alignItems: 'start',
            }}
            className="stats-grid"
          >
            <CountStat target={5} suffix="+" label="فروع قادمة" color="#E31C23" />
            <CountStat target={100} suffix="K+" label="زبون سعيد" color="#FFB400" />
            <CountStat target={2024} suffix="" label="سنة التأسيس" color="#F7F2E9" />
            <CountStat target={7} suffix="" label="صوصات حصرية" color="#E31C23" />
          </div>

          {/* Dividers between stats */}
        </div>
      </section>

      {/* ── MANIFESTO QUOTE ─────────────────────────────── */}
      <FadeIn y={24}>
        <section
          style={{
            background: '#FFB400',
            borderBottom: '3px solid #111111',
            padding: '60px 24px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(17,17,17,.12) 1px, transparent 1.2px)',
              backgroundSize: '10px 10px',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
            <div
              style={{
                fontFamily: 'Anton',
                fontSize: 64,
                color: 'rgba(17,17,17,.12)',
                lineHeight: 0.8,
                marginBottom: 16,
              }}
            >
              "
            </div>
            <blockquote
              style={{
                fontFamily: 'Cairo',
                fontWeight: 900,
                fontSize: 'clamp(22px, 3.5vw, 34px)',
                color: '#111111',
                lineHeight: 1.5,
                transform: 'skewX(-4deg)',
                display: 'inline-block',
              }}
            >
              اللي يأكل بدون قرمشة ما عاش.
            </blockquote>
            <div
              style={{
                marginTop: 20,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 12,
                letterSpacing: 2,
                color: 'rgba(17,17,17,.5)',
                textTransform: 'uppercase',
              }}
            >
              — مؤسسو تشيكنييز، ٢٠٢٤
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── CTA ─────────────────────────────────────────── */}
      <FadeIn y={20}>
        <section
          style={{
            background: '#F7F2E9',
            padding: '72px 24px',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(17,17,17,.06) 1px, transparent 1.2px)',
              backgroundSize: '14px 14px',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2
              style={{
                fontFamily: 'Cairo',
                fontWeight: 900,
                fontSize: 'clamp(32px, 5vw, 52px)',
                color: '#111111',
                marginBottom: 32,
                display: 'inline-block',
                transform: 'skewX(-5deg)',
              }}
            >
              مقتنع؟{' '}
              <span style={{ color: '#E31C23', position: 'relative' }}>
                جرب الحين
                <span
                  style={{
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    bottom: -8,
                    height: 8,
                    background: '#FFB400',
                    transform: 'skewX(-10deg)',
                    zIndex: -1,
                  }}
                />
              </span>
            </h2>
            <br />
            <Link href="/app">
              <BrandButton variant="red" style={{ fontSize: 20, padding: '18px 48px' }}>
                اطلب الحين ←
              </BrandButton>
            </Link>
          </div>
        </section>
      </FadeIn>

      <MarketingFooter />
    </div>
  );
}
