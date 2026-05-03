import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PhoneFrame } from '../../components/layout/PhoneFrame';
import { AppBottomNav } from '../../components/layout/AppBottomNav';
import { AppBackButton } from '../../components/layout/AppBackButton';
import { user } from '../../data/user';
import { rewards, Reward } from '../../data/rewards';

/* ── Constants ──────────────────────────────────────────── */
const TIER_MAX = user.points + user.pointsToNext; // 500
const BENEFITS = [
  '✓ أولوية في التوصيل',
  '✓ ضعف النقاط في عروض الجمعة',
  '✓ هدية في يوم ميلادك 🎂',
];

/* ── Animated count-up / count-down number ──────────────── */
function CountNumber({
  target, duration = 1200,
}: { target: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>();
  const startRef = useRef<number>();
  const fromRef = useRef(0);

  useEffect(() => {
    fromRef.current = display;
    startRef.current = undefined;
    const from = fromRef.current;
    const diff = target - from;
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const pct = Math.min((ts - startRef.current) / duration, 1);
      const ease = 1 - Math.pow(1 - pct, 3);
      setDisplay(Math.round(from + diff * ease));
      if (pct < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return <>{display}</>;
}

/* ── Confetti burst ─────────────────────────────────────── */
function fireConfetti() {
  const colors = ['#E31C23', '#FFB400', '#F7F2E9', '#111111'];
  confetti({ particleCount: 80, spread: 80, origin: { x: 0.5, y: 0.55 }, colors, startVelocity: 36, gravity: 0.9 });
  setTimeout(() =>
    confetti({ particleCount: 40, spread: 120, origin: { x: 0.3, y: 0.5 }, colors, startVelocity: 28 }), 200);
  setTimeout(() =>
    confetti({ particleCount: 40, spread: 120, origin: { x: 0.7, y: 0.5 }, colors, startVelocity: 28 }), 350);
}

/* ── Reward card ────────────────────────────────────────── */
function RewardCard({
  reward, userPoints, redeemed, onRedeem,
}: { reward: Reward; userPoints: number; redeemed: boolean; onRedeem: () => void }) {
  const canRedeem = userPoints >= reward.points && !redeemed;
  const shortfall = reward.points - userPoints;

  return (
    <motion.div
      layout
      whileHover={canRedeem ? { y: -3, boxShadow: '6px 6px 0 #E31C23' } : {}}
      style={{
        background: redeemed ? '#4ADE80' : canRedeem ? '#FFFFFF' : '#EFE8DA',
        border: `3px solid ${redeemed ? '#111111' : canRedeem ? '#111111' : '#C8C0B0'}`,
        boxShadow: redeemed ? '5px 5px 0 #111111' : canRedeem ? '4px 4px 0 #111111' : 'none',
        padding: '14px 12px',
        display: 'flex', flexDirection: 'column', gap: 8,
        transition: 'box-shadow 0.2s',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Halftone on available cards */}
      {canRedeem && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(17,17,17,.04) 1px, transparent 1.2px)',
          backgroundSize: '10px 10px', pointerEvents: 'none',
        }} />
      )}

      {/* Redeemed ribbon */}
      {redeemed && (
        <div style={{
          position: 'absolute', top: 8, left: -2,
          background: '#111111', color: '#FFB400',
          fontFamily: 'Anton', fontSize: 9, letterSpacing: 2,
          padding: '3px 8px', transform: 'rotate(-2deg)',
          boxShadow: '2px 2px 0 #E31C23',
        }}>
          ✓ REDEEMED
        </div>
      )}

      {/* Emoji + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{reward.emoji}</span>
        <div>
          <div style={{
            fontFamily: 'Cairo', fontWeight: 900, fontSize: 14,
            color: redeemed ? '#111111' : canRedeem ? '#111111' : '#8A8580',
            lineHeight: 1.2,
          }}>
            {reward.nameAr}
          </div>
          <div style={{
            fontFamily: 'Anton', fontSize: 10, letterSpacing: 2,
            color: '#8A8580', textTransform: 'uppercase',
          }}>
            {reward.nameEn}
          </div>
        </div>
      </div>

      {/* Points cost */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 4,
          fontFamily: 'Anton', fontSize: 20,
          color: redeemed ? '#111111' : canRedeem ? '#E31C23' : '#B0A890',
        }}>
          {reward.points}
          <span style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 11, color: '#8A8580' }}>نقطة</span>
        </div>

        {/* Button */}
        {redeemed ? (
          <div style={{
            background: '#111111', color: '#FFB400',
            fontFamily: 'Cairo', fontWeight: 900, fontSize: 12,
            padding: '6px 12px', border: '2px solid #111111',
          }}>
            تم ✓
          </div>
        ) : canRedeem ? (
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={onRedeem}
            style={{
              background: '#E31C23', color: '#F7F2E9',
              border: '2.5px solid #111111',
              fontFamily: 'Cairo', fontWeight: 900, fontSize: 13,
              padding: '8px 14px', cursor: 'pointer',
              boxShadow: '3px 3px 0 #111111',
              transform: 'skewX(-4deg)',
            }}
          >
            <span style={{ display: 'inline-block', transform: 'skewX(4deg)' }}>استبدل</span>
          </motion.button>
        ) : (
          <div style={{
            background: 'rgba(17,17,17,.08)', color: '#8A8580',
            border: '2px solid #C8C0B0',
            fontFamily: 'Cairo', fontWeight: 700, fontSize: 11,
            padding: '6px 10px', textAlign: 'center',
          }}>
            تحتاج {shortfall} نقطة
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Redeem modal ───────────────────────────────────────── */
function RedeemModal({ reward, onClose }: { reward: Reward; onClose: () => void }) {
  const code = `CR-${7000 + reward.id * 211}`;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute', inset: 0, zIndex: 200,
        background: 'rgba(17,17,17,.72)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        initial={{ scale: 0.65, opacity: 0, y: 32 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        style={{
          background: '#F7F2E9', border: '4px solid #111111',
          boxShadow: '8px 8px 0 #E31C23',
          padding: '28px 22px', textAlign: 'center',
          width: '100%', position: 'relative',
        }}
      >
        {/* Sticker top-right */}
        <div style={{
          position: 'absolute', top: -14, right: 16,
          background: '#FFB400', color: '#111111',
          fontFamily: 'Anton', fontSize: 10, letterSpacing: 2,
          padding: '4px 10px', border: '2.5px solid #111111',
          transform: 'rotate(3deg)',
        }}>
          REDEEMED!
        </div>

        <div style={{ fontSize: 52, marginBottom: 10 }}>🎉</div>

        <h2 style={{
          fontFamily: 'Cairo', fontWeight: 900, fontSize: 22, color: '#111111',
          transform: 'skewX(-4deg)', display: 'inline-block', marginBottom: 6,
        }}>
          تم الاستبدال!
        </h2>
        <p style={{
          fontFamily: 'Cairo', fontWeight: 700, fontSize: 14, color: '#6A6560',
          lineHeight: 1.6, marginBottom: 18,
        }}>
          {reward.emoji} {reward.nameAr}<br/>
          <span style={{ fontSize: 12 }}>{reward.desc}</span>
        </p>

        {/* Code box */}
        <div style={{
          background: '#111111', border: '3px solid #111111',
          padding: '14px 0', marginBottom: 22,
          boxShadow: '4px 4px 0 #E31C23',
        }}>
          <div style={{
            fontFamily: 'Anton', fontSize: 11, letterSpacing: 3,
            color: 'rgba(247,242,233,.5)', marginBottom: 4,
          }}>
            كود المكافأة
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
            style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 26,
              letterSpacing: 4, color: '#FFB400', direction: 'ltr',
            }}
          >
            {code}
          </motion.div>
        </div>

        <p style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 12, color: '#8A8580', marginBottom: 20 }}>
          صالح لمدة 30 يوم · مرة واحدة فقط
        </p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          style={{
            width: '100%', padding: '14px 0',
            background: '#111111', color: '#F7F2E9',
            border: '3px solid #111111', boxShadow: '4px 4px 0 #E31C23',
            fontFamily: 'Cairo', fontWeight: 900, fontSize: 16,
            cursor: 'pointer', transform: 'skewX(-3deg)',
          }}
        >
          <span style={{ display: 'inline-block', transform: 'skewX(3deg)' }}>
            رائع، شكراً! 🍗
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function AppRewards() {
  const [points, setPoints] = useState(user.points);
  const [redeemed, setRedeemed] = useState<number[]>([]);
  const [activeModal, setActiveModal] = useState<Reward | null>(null);
  const [justRedeemed, setJustRedeemed] = useState<number[]>([]);

  const progress = points / TIER_MAX;

  const handleRedeem = useCallback((reward: Reward) => {
    if (points < reward.points) return;
    setPoints(p => p - reward.points);
    setRedeemed(r => [...r, reward.id]);
    setJustRedeemed(r => [...r, reward.id]);
    fireConfetti();
    setTimeout(() => setActiveModal(reward), 300);
  }, [points]);

  /* Sort: redeemable first, then by points cost */
  const sortedRewards = [...rewards].sort((a, b) => {
    const aCanRedeem = points >= a.points && !redeemed.includes(a.id);
    const bCanRedeem = points >= b.points && !redeemed.includes(b.id);
    if (aCanRedeem && !bCanRedeem) return -1;
    if (!aCanRedeem && bCanRedeem) return 1;
    return a.points - b.points;
  });

  const redeemedRewards = rewards.filter(r => redeemed.includes(r.id));

  return (
    <PhoneFrame bg="#F7F2E9">
      <div dir="rtl" style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F7F2E9', position: 'relative' }}>

        {/* ── Modal ───────────────────────────────────── */}
        <AnimatePresence>
          {activeModal && (
            <RedeemModal reward={activeModal} onClose={() => setActiveModal(null)} />
          )}
        </AnimatePresence>

        {/* ── Scrollable body ─────────────────────────── */}
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>

          {/* ── Hero header ─────────────────────────── */}
          <div style={{
            background: '#111111', borderBottom: '3px solid #111111',
            padding: '20px 20px 24px', position: 'relative', overflow: 'hidden',
          }}>
            {/* Halftone */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(rgba(255,255,255,.10) 1px, transparent 1.2px)',
              backgroundSize: '14px 14px', pointerEvents: 'none',
            }} />

            {/* Top row: back button + LOYALTY sticker */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{
                background: '#FFB400', color: '#111111',
                fontFamily: 'Anton', fontSize: 9, letterSpacing: 2,
                padding: '3px 8px', border: '2px solid rgba(255,255,255,.3)',
                transform: 'rotate(-3deg)',
              }}>
                LOYALTY
              </div>
              <AppBackButton to="/app/home" theme="dark" />
            </div>

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Anton', fontSize: 11, letterSpacing: 4,
                color: 'rgba(247,242,233,.4)', textTransform: 'uppercase', marginBottom: 4,
              }}>
                رصيد النقاط
              </div>

              {/* Big points number */}
              <div style={{
                fontFamily: 'Anton', fontSize: 76, lineHeight: 1,
                color: '#FFB400',
                textShadow: '4px 4px 0 #E31C23',
                transform: 'skewX(-5deg)', display: 'inline-block',
              }}>
                <CountNumber target={points} duration={1100} />
              </div>
              <div style={{
                fontFamily: 'Cairo', fontWeight: 900, fontSize: 16,
                color: 'rgba(247,242,233,.7)', marginTop: 2, marginBottom: 18,
              }}>
                نقطة مكتسبة
              </div>

              {/* Tier card */}
              <div style={{
                background: 'rgba(255,255,255,.06)',
                border: '2px solid rgba(255,255,255,.12)',
                padding: '14px 16px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 22 }}>🥈</span>
                    <div>
                      <div style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 15, color: '#F7F2E9' }}>
                        {user.tier} · فضي
                      </div>
                      <div style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 11, color: 'rgba(247,242,233,.5)' }}>
                        {user.pointsToNext} نقطة للذهبي
                      </div>
                    </div>
                  </div>
                  <div style={{
                    background: '#FFB400', color: '#111111',
                    fontFamily: 'Anton', fontSize: 11, letterSpacing: 1,
                    padding: '5px 10px', border: '2px solid rgba(255,255,255,.2)',
                    transform: 'skewX(-6deg)',
                    boxShadow: '3px 3px 0 rgba(0,0,0,.3)',
                  }}>
                    <span style={{ display: 'inline-block', transform: 'skewX(6deg)' }}>🥇 {user.tierNext}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ background: 'rgba(0,0,0,.3)', height: 10, border: '1.5px solid rgba(0,0,0,.2)', position: 'relative', marginBottom: 6 }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{
                      position: 'absolute', top: 0, right: 0,
                      height: '100%',
                      background: 'linear-gradient(90deg, #FFB400, #FFD060)',
                    }}
                  />
                  {/* Milestone dot at 100% */}
                  <div style={{
                    position: 'absolute', top: '50%', left: 0,
                    transform: 'translate(-50%, -50%)',
                    width: 14, height: 14, borderRadius: '50%',
                    background: '#FFD060', border: '2px solid #FFB400',
                    boxShadow: '0 0 6px #FFB400',
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Cairo', fontSize: 10, color: 'rgba(247,242,233,.45)' }}>0</span>
                  <span style={{ fontFamily: 'Anton', fontSize: 10, color: 'rgba(247,242,233,.45)', letterSpacing: 1, direction: 'ltr', display: 'inline-block' }}>
                    {points} / {TIER_MAX}
                  </span>
                  <span style={{ fontFamily: 'Cairo', fontSize: 10, color: 'rgba(247,242,233,.45)' }}>{TIER_MAX}</span>
                </div>
              </div>

              {/* Benefits list */}
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'right' }}>
                {BENEFITS.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.12 }}
                    style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 13, color: 'rgba(247,242,233,.75)' }}
                  >
                    {b}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: '18px 16px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* ── My redeemed rewards ─────────────────── */}
            <AnimatePresence>
              {redeemedRewards.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <SectionLabel label="مكافآتك 🎁" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {redeemedRewards.map(r => (
                      <RewardCard
                        key={r.id}
                        reward={r}
                        userPoints={points}
                        redeemed
                        onRedeem={() => {}}
                      />
                    ))}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* ── Available rewards ──────────────────── */}
            <section>
              <SectionLabel label="المكافآت المتاحة ⭐" />
              <motion.div
                layout
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}
              >
                <AnimatePresence>
                  {sortedRewards
                    .filter(r => !redeemed.includes(r.id))
                    .map(r => (
                      <motion.div
                        key={r.id}
                        layout
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.25 }}
                      >
                        <RewardCard
                          reward={r}
                          userPoints={points}
                          redeemed={false}
                          onRedeem={() => handleRedeem(r)}
                        />
                      </motion.div>
                    ))}
                </AnimatePresence>
              </motion.div>
            </section>

            {/* ── How to earn points ─────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                background: '#FFB400', border: '3px solid #111111',
                boxShadow: '5px 5px 0 #111111', padding: '16px 18px',
                transform: 'rotate(-1deg)', position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(rgba(17,17,17,.08) 1px, transparent 1.2px)',
                backgroundSize: '10px 10px', pointerEvents: 'none',
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontFamily: 'Anton', fontSize: 13, letterSpacing: 2, color: '#111111',
                  textTransform: 'uppercase', marginBottom: 6,
                }}>
                  كيف تكسب نقاطك؟
                </div>
                <div style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 14, color: '#111111', lineHeight: 1.65 }}>
                  كل <strong>10 ريال</strong> تصرفها = <strong>1 نقطة</strong> 🔥<br />
                  كلما طلبت أكثر، زادت نقاطك وتقدر تستبدلها بوجبات مجانية!
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        <AppBottomNav />
      </div>
    </PhoneFrame>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{
      fontFamily: 'Cairo', fontWeight: 900, fontSize: 17, color: '#111111',
      marginBottom: 12, display: 'inline-block', transform: 'skewX(-4deg)',
    }}>
      {label}
    </div>
  );
}
