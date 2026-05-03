import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { PhoneFrame } from '../../components/layout/PhoneFrame';
import { AppBottomNav } from '../../components/layout/AppBottomNav';
import { AppBackButton } from '../../components/layout/AppBackButton';

/* ── Steps ──────────────────────────────────────────────── */
const STEPS = [
  { label: 'تم استلام طلبك', icon: '✓', detail: 'تلقينا طلبك بنجاح!' },
  { label: 'جاري التحضير', icon: '🔥', detail: 'الشيف يشتغل عليه الحين' },
  { label: 'الطلب في الطريق', icon: '🛵', detail: 'السائق على الطريق' },
  { label: 'تم التوصيل', icon: '✅', detail: 'وصل الطلب، بالعافية!' },
];

const STEP_INTERVAL = 5000;   // advance step every 5 s
const START_SECONDS = 25 * 60; // 25:00 countdown

/* ── Confetti particle ──────────────────────────────────── */
const CONFETTI_COLORS = ['#E31C23', '#FFB400', '#111111', '#F7F2E9', '#4ADE80'];

function ConfettiPiece({ index }: { index: number }) {
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
  const size = 6 + (index % 5) * 2;
  const x0 = 30 + ((index * 37) % 280);
  const yFinal = 200 + ((index * 53) % 200);
  const rot = (index * 73) % 720 - 360;
  const delay = (index * 0.04) % 0.6;
  const isRect = index % 3 !== 0;

  return (
    <motion.div
      initial={{ x: x0, y: -20, opacity: 1, rotate: 0, scale: 1 }}
      animate={{ x: x0 + ((index % 2 === 0 ? 1 : -1) * ((index * 17) % 60)), y: yFinal, opacity: 0, rotate: rot, scale: 0.5 }}
      transition={{ duration: 1.4 + delay, delay, ease: [0.2, 0, 0.8, 1] }}
      style={{
        position: 'absolute', top: 0, left: 0,
        width: isRect ? size * 1.6 : size,
        height: isRect ? size * 0.6 : size,
        borderRadius: isRect ? 2 : '50%',
        background: color,
        pointerEvents: 'none', zIndex: 200,
      }}
    />
  );
}

/* ── Delivery marker along SVG path ────────────────────── */
function MapSection({ step }: { step: number }) {
  const progress = step >= 2 ? (step >= 3 ? 1 : 0.6) : (step >= 1 ? 0.15 : 0.05);

  return (
    <div style={{
      background: '#111111', border: '3px solid #111111',
      boxShadow: '5px 5px 0 #E31C23', position: 'relative', overflow: 'hidden',
      height: 140,
    }}>
      {/* Halftone */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,.09) 1.5px, transparent 1.5px)',
        backgroundSize: '12px 12px', pointerEvents: 'none',
      }} />

      {/* Road SVG */}
      <svg width="100%" height="100%" viewBox="0 0 380 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
        {/* Road */}
        <path d="M40 100 Q110 40 200 70 Q290 100 340 50" stroke="#2A2A2A" strokeWidth="18" fill="none" strokeLinecap="round"/>
        {/* Road dashes */}
        <path d="M40 100 Q110 40 200 70 Q290 100 340 50" stroke="#FFB400" strokeWidth="2" fill="none" strokeDasharray="14 10" strokeLinecap="round"/>
        {/* Filled progress */}
        <motion.path
          d="M40 100 Q110 40 200 70 Q290 100 340 50"
          stroke="#E31C23"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </svg>

      {/* Restaurant pin */}
      <div style={{ position: 'absolute', bottom: 38, left: 22, fontSize: 22, filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,.5))' }}>
        📍
      </div>
      <div style={{
        position: 'absolute', bottom: 24, left: 14,
        fontFamily: 'Anton', fontSize: 8, letterSpacing: 1, color: '#FFB400',
      }}>
        تشيكنييز
      </div>

      {/* Customer pin */}
      <div style={{ position: 'absolute', top: 26, right: 20, fontSize: 20, filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,.5))' }}>
        🏠
      </div>

      {/* Animated motorcycle */}
      <motion.div
        animate={{
          offsetDistance: `${progress * 100}%`,
        }}
        initial={{ offsetDistance: '5%' }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'absolute',
          offsetPath: 'path("M40 100 Q110 40 200 70 Q290 100 340 50")',
          fontSize: 22,
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,.8))',
          transform: 'translateY(-14px)',
        }}
      >
        🛵
      </motion.div>

      {/* Status chip */}
      <div style={{
        position: 'absolute', top: 10, right: 10,
        background: step >= 2 ? '#E31C23' : '#3A3A3A',
        color: '#F7F2E9', fontFamily: 'Cairo', fontWeight: 900, fontSize: 10,
        padding: '3px 8px', border: '1.5px solid rgba(255,255,255,.2)',
        transition: 'background 0.4s',
      }}>
        {step >= 3 ? 'وصل ✅' : step >= 2 ? 'في الطريق 🛵' : 'يتحضر 🔥'}
      </div>
    </div>
  );
}

/* ── Rating stars ───────────────────────────────────────── */
function RatingStars({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
      {[1, 2, 3, 4, 5].map(s => (
        <motion.button
          key={s}
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.2 }}
          onClick={() => onChange(s)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 32, filter: s <= value ? 'none' : 'grayscale(1) opacity(0.35)',
            transition: 'filter 0.2s',
          }}
        >
          ⭐
        </motion.button>
      ))}
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function AppOrder({ params }: { params?: { id?: string } }) {
  const orderId = params?.id ?? '2848';
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(START_SECONDS);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const motoControls = useAnimation();

  /* Countdown timer */
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(t => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  /* Step auto-advance */
  useEffect(() => {
    if (currentStep >= STEPS.length - 1) return;
    const id = setTimeout(() => {
      setCurrentStep(s => s + 1);
    }, STEP_INTERVAL);
    return () => clearTimeout(id);
  }, [currentStep]);

  /* Completion effects */
  useEffect(() => {
    if (currentStep === STEPS.length - 1) {
      setTimeout(() => {
        setShowConfetti(true);
        setTimeout(() => setShowModal(true), 800);
      }, 400);
    }
  }, [currentStep]);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  const isComplete = currentStep === STEPS.length - 1;

  /* Connector fill height per step */
  const connectorFill = currentStep / (STEPS.length - 1);

  return (
    <PhoneFrame bg="#F7F2E9">
      <div dir="rtl" style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F7F2E9', position: 'relative' }}>

        {/* ── Confetti layer ───────────────────────────── */}
        <AnimatePresence>
          {showConfetti && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 150, pointerEvents: 'none', overflow: 'hidden' }}>
              {Array.from({ length: 40 }, (_, i) => (
                <ConfettiPiece key={i} index={i} />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* ── Completion modal ─────────────────────────── */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute', inset: 0, zIndex: 160,
                background: 'rgba(17,17,17,.75)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 24,
              }}
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.1 }}
                style={{
                  background: '#F7F2E9', border: '4px solid #111111',
                  boxShadow: '8px 8px 0 #E31C23',
                  padding: '28px 24px', textAlign: 'center', width: '100%',
                  position: 'relative',
                }}
              >
                {/* Sticker */}
                <div style={{
                  position: 'absolute', top: -16, right: 20,
                  background: '#FFB400', color: '#111111',
                  fontFamily: 'Anton', fontSize: 11, letterSpacing: 2,
                  padding: '4px 10px', border: '2.5px solid #111111',
                  transform: 'rotate(-3deg)',
                }}>
                  DELIVERED!
                </div>

                <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
                <h2 style={{
                  fontFamily: 'Cairo', fontWeight: 900, fontSize: 26, color: '#111111',
                  transform: 'skewX(-4deg)', display: 'inline-block', marginBottom: 6,
                }}>
                  شكرًا لك!
                </h2>
                <p style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 14, color: '#6A6560', marginBottom: 22, lineHeight: 1.6 }}>
                  بالعافية عليك يا أحمد 🍗<br/>كيف كانت تجربتك؟
                </p>

                <RatingStars value={rating} onChange={setRating} />

                {rating > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 13, color: '#8A8580', marginTop: 10 }}
                  >
                    {rating === 5 ? 'ممتاز، نشكر تقييمك! 🙌' : rating >= 3 ? 'شكرًا! سنتحسن أكثر 💪' : 'آسفين! سنعوضك 🙏'}
                  </motion.div>
                )}

                <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModal(false)}
                    style={{
                      flex: 1, padding: '12px 0',
                      border: '2.5px solid #111111', background: '#FFFFFF',
                      fontFamily: 'Cairo', fontWeight: 900, fontSize: 14,
                      cursor: 'pointer',
                    }}
                  >
                    إغلاق
                  </motion.button>
                  <Link href="/app/home">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      style={{
                        flex: 1, padding: '12px 0',
                        border: '2.5px solid #111111', background: '#E31C23',
                        color: '#F7F2E9',
                        fontFamily: 'Cairo', fontWeight: 900, fontSize: 14,
                        cursor: 'pointer', boxShadow: '3px 3px 0 #111111',
                      }}
                    >
                      الرئيسية ←
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Header ──────────────────────────────────── */}
        <div style={{
          background: '#111111', color: '#F7F2E9',
          borderBottom: '3px solid #111111', padding: '14px 18px',
          flexShrink: 0, position: 'relative', zIndex: 1,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,.09) 1px, transparent 1.2px)',
            backgroundSize: '14px 14px', pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{
                fontFamily: 'Cairo', fontWeight: 900, fontSize: 18,
                transform: 'skewX(-4deg)', display: 'inline-block',
              }}>
                {isComplete ? 'تم التوصيل ✅' : 'طلبك في الطريق 🛵'}
              </h1>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: 2, color: '#FFB400', marginTop: 2 }}>
                #{orderId}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Countdown */}
            {!isComplete && (
              <div style={{ textAlign: 'left' }}>
                <motion.div
                  key={`${mins}:${secs}`}
                  initial={{ opacity: 0.6, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ fontFamily: 'Anton', fontSize: 28, color: '#E31C23', lineHeight: 1, direction: 'ltr' }}
                >
                  {mins}:{secs}
                </motion.div>
                <div style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 10, color: 'rgba(247,242,233,.5)', direction: 'rtl' }}>
                  الوقت المتبقي
                </div>
              </div>
            )}
            {isComplete && (
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{ fontSize: 36 }}
              >
                🎉
              </motion.div>
            )}
            <AppBackButton to="/app/home" theme="dark" />
            </div>
          </div>
        </div>

        {/* ── Scrollable body ─────────────────────────── */}
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '16px 16px 16px' }}>

          {/* ── Map section ────────────────────────────── */}
          <div style={{ marginBottom: 18 }}>
            <MapSection step={currentStep} />
          </div>

          {/* ── Step tracker ────────────────────────────── */}
          <div style={{
            background: '#FFFFFF', border: '3px solid #111111',
            boxShadow: '5px 5px 0 #111111', padding: '18px 16px',
            marginBottom: 16, position: 'relative',
          }}>
            {/* Connector track (vertical) */}
            <div style={{
              position: 'absolute',
              top: 36, bottom: 36,
              right: 30,
              width: 4,
              background: 'rgba(17,17,17,.1)',
            }} />
            {/* Connector fill */}
            <motion.div
              style={{
                position: 'absolute',
                top: 36,
                right: 30,
                width: 4,
                background: '#E31C23',
                originY: 0,
              }}
              animate={{ height: `calc(${connectorFill * 100}% - 72px)` }}
              initial={{ height: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, position: 'relative', zIndex: 1 }}>
              {STEPS.map((step, i) => {
                const isPast = i < currentStep;
                const isActive = i === currentStep;
                const isFuture = i > currentStep;

                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    {/* Dot */}
                    <div style={{ flexShrink: 0, width: 32, height: 32, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {isActive && (
                        <motion.div
                          animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.3, 0.8] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                          style={{
                            position: 'absolute', inset: 0,
                            borderRadius: '50%', background: '#E31C23',
                          }}
                        />
                      )}
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        border: `3px solid ${isPast ? '#111111' : isActive ? '#E31C23' : '#D0CAC0'}`,
                        background: isPast ? '#111111' : isActive ? '#E31C23' : '#F7F2E9',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 1, position: 'relative',
                        transition: 'background 0.3s, border-color 0.3s',
                      }}>
                        {isPast && (
                          <motion.span
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                            style={{ color: '#FFB400', fontWeight: 900, fontSize: 13, lineHeight: 1 }}
                          >
                            ✓
                          </motion.span>
                        )}
                        {isActive && (
                          <span style={{ fontSize: 14 }}>{step.icon}</span>
                        )}
                        {isFuture && (
                          <span style={{ fontSize: 12, opacity: 0.4 }}>{i + 1}</span>
                        )}
                      </div>
                    </div>

                    {/* Label */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: 'Cairo', fontWeight: 900,
                        fontSize: isActive ? 16 : 14,
                        color: isPast ? '#111111' : isActive ? '#E31C23' : '#B0A890',
                        transition: 'color 0.3s, font-size 0.3s',
                        transform: isActive ? 'skewX(-4deg)' : 'none',
                        display: 'inline-block',
                      }}>
                        {step.label}
                        {isActive && <span style={{ marginRight: 4, fontSize: 14 }}>{step.icon}</span>}
                      </div>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 11, color: '#8A8580', marginTop: 2 }}
                        >
                          {step.detail}
                        </motion.div>
                      )}
                    </div>

                    {/* Time stamp */}
                    {isPast && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        style={{ fontFamily: 'Anton', fontSize: 11, letterSpacing: 1, color: '#8A8580', flexShrink: 0 }}
                      >
                        {`${9 + i}:${(15 + i * 8) % 60}`.replace(/\b(\d)\b/, '0$1')}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Branch info card ────────────────────────── */}
          <div style={{
            background: '#FFFFFF', border: '3px solid #111111',
            boxShadow: '4px 4px 0 #111111', padding: '14px 16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 16,
          }}>
            <div>
              <div style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 14, color: '#111111' }}>
                🏪 فرع الملقا
              </div>
              <div style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 12, color: '#8A8580', marginTop: 2 }}>
                حي الملقا، شارع الأمير محمد
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.93 }}
              style={{
                padding: '9px 14px',
                background: '#111111', color: '#F7F2E9',
                border: '2px solid #111111',
                fontFamily: 'Cairo', fontWeight: 900, fontSize: 13,
                cursor: 'pointer', boxShadow: '3px 3px 0 #E31C23',
              }}
            >
              📞 اتصل
            </motion.button>
          </div>

          {/* ── Order summary (collapsed) ────────────────── */}
          <div>
            <motion.div
              whileTap={{ scale: 0.99 }}
              onClick={() => setSummaryOpen(o => !o)}
              style={{
                background: '#FFFFFF', border: '3px solid #111111',
                padding: '13px 16px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                cursor: 'pointer', boxShadow: summaryOpen ? '4px 4px 0 #111111' : '2px 2px 0 #111111',
              }}
            >
              <span style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 14, color: '#111111', transform: 'skewX(-4deg)', display: 'inline-block' }}>
                تفاصيل الطلب #{ orderId}
              </span>
              <motion.span animate={{ rotate: summaryOpen ? 180 : 0 }} style={{ fontSize: 11, color: '#8A8580' }}>
                ▼
              </motion.span>
            </motion.div>
            <AnimatePresence initial={false}>
              {summaryOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ background: '#FFFFFF', border: '3px solid #111111', borderTop: '1.5px dashed rgba(17,17,17,.15)', padding: '12px 16px' }}>
                    {[
                      { name: 'كرنشي وينجز', qty: 1, price: 32 },
                      { name: 'ليمون نعناع', qty: 2, price: 14 },
                    ].map(item => (
                      <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Cairo', fontWeight: 700, fontSize: 13, color: '#4A4540', padding: '5px 0', borderBottom: '1px dashed rgba(17,17,17,.08)' }}>
                        <span>{item.name} × {item.qty}</span>
                        <span style={{ fontFamily: 'Anton', fontSize: 14 }}>{item.price * item.qty} ر.س</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: 'Cairo', fontWeight: 900, fontSize: 16, color: '#111111', paddingTop: 8, borderTop: '2px solid #111111' }}>
                      <span>الإجمالي</span>
                      <span style={{ fontFamily: 'Anton', color: '#E31C23' }}>60 ر.س</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <AppBottomNav />
      </div>
    </PhoneFrame>
  );
}
