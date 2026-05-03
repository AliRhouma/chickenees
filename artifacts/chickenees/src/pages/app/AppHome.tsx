import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneFrame } from '../../components/layout/PhoneFrame';
import { AppBottomNav } from '../../components/layout/AppBottomNav';
import { useCart } from '../../context/CartContext';
import { user } from '../../data/user';
import { products } from '../../data/products';

/* ── Category icons ─────────────────────────────────────── */
const catEmoji: Record<string, string> = {
  دجاج: '🍗', رابز: '🌯', وجبات: '🍱', حلى: '🍰', مشروبات: '🥤',
};

const categories = [
  { label: 'دجاج', cat: 'chicken' },
  { label: 'رابز', cat: 'wraps' },
  { label: 'وجبات', cat: 'meals' },
  { label: 'حلى', cat: 'desserts' },
  { label: 'مشروبات', cat: 'drinks' },
];

const lastOrder = {
  items: ['دبل باكت', 'ليمون نعناع'],
  total: 66,
  date: 'قبل يومين',
};

const bestsellerIds = [3, 1, 8, 2, 7];
const bestsellers = bestsellerIds.map(id => products.find(p => p.id === id)!).filter(Boolean);

/* ── Loyalty progress ───────────────────────────────────── */
const SILVER_MAX = user.pointsToNext + user.points;
const progress = user.points / SILVER_MAX;

/* ── Notification data ──────────────────────────────────── */
const notifications = [
  {
    id: 1, unread: true,
    icon: '🎉', iconBg: '#E31C23',
    title: 'طلبك #1042 وصل!',
    subtitle: 'تمّ التوصيل بنجاح — استمتع بالقرمشة!',
    time: 'منذ ساعتين',
    tag: 'تم التوصيل',
    tagColor: '#E31C23',
    link: '/app/orders',
  },
  {
    id: 2, unread: true,
    icon: '🛵', iconBg: '#111111',
    title: 'طلبك في الطريق إليك',
    subtitle: 'المندوب في طريقه · طلب #1042',
    time: 'منذ 3 ساعات',
    tag: 'قيد التوصيل',
    tagColor: '#111111',
    link: '/app/tracking',
  },
  {
    id: 3, unread: false,
    icon: '✅', iconBg: '#111111',
    title: 'تم قبول طلبك #1042',
    subtitle: 'جاري التحضير في المطبخ الآن 🍳',
    time: 'منذ 3.5 ساعة',
    tag: 'جاري التحضير',
    tagColor: '#111111',
    link: '/app/tracking',
  },
  {
    id: 4, unread: false,
    icon: '⭐', iconBg: '#FFB400',
    title: '+20 نقطة مكتسبة!',
    subtitle: 'رصيدك الآن 240 نقطة — استبدل الآن',
    time: 'أمس',
    tag: 'نقاط',
    tagColor: '#FFB400',
    link: '/app/rewards',
  },
  {
    id: 5, unread: false,
    icon: '🔥', iconBg: '#E31C23',
    title: 'عرض خاص لك اليوم فقط!',
    subtitle: 'خصم 15% على وجبة دبل باكت · كود: CRUNCH10',
    time: 'قبل يومين',
    tag: 'عرض',
    tagColor: '#E31C23',
    link: '/app/menu',
  },
];

const UNREAD_COUNT = notifications.filter(n => n.unread).length;

/* ── Component ──────────────────────────────────────────── */
export default function AppHome() {
  const { addToCart } = useCart();
  const [, setLocation] = useLocation();
  const [showNotifs, setShowNotifs] = useState(false);
  const [readAll, setReadAll] = useState(false);

  const handleAdd = (id: number) => addToCart(id);
  const unreadCount = readAll ? 0 : UNREAD_COUNT;

  return (
    <PhoneFrame bg="#F7F2E9">
      <div dir="rtl" style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F7F2E9', position: 'relative' }}>

        {/* ── Scrollable body ─────────────────────────────── */}
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>

          {/* Top bar */}
          <div style={{ background: '#111111', padding: '18px 18px 20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(rgba(255,255,255,.10) 1px, transparent 1.2px)',
              backgroundSize: '14px 14px', pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 22, color: '#F7F2E9', display: 'inline-block', transform: 'skewX(-4deg)' }}>
                  مرحباً {user.name.split(' ')[0]} 👋
                </div>
                <div style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 13, color: '#FFB400', marginTop: 2 }}>
                  جاهز للقرمشة اليوم؟
                </div>
              </div>

              {/* Notification bell — now a button */}
              <button
                onClick={() => { setShowNotifs(true); setReadAll(true); }}
                style={{
                  width: 40, height: 40,
                  background: 'rgba(255,255,255,.08)',
                  border: '2px solid rgba(255,255,255,.15)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', position: 'relative',
                  padding: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7F2E9" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 01-3.46 0"/>
                </svg>
                {/* Unread dot — animates away after open */}
                <AnimatePresence>
                  {unreadCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      style={{
                        position: 'absolute', top: 4, right: 5,
                        width: 16, height: 16, borderRadius: '50%',
                        background: '#E31C23', border: '2px solid #111111',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Anton', fontSize: 9, color: '#F7F2E9',
                        lineHeight: 1,
                      }}
                    >
                      {unreadCount}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          <div style={{ padding: '16px 16px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* ── Loyalty banner ──────────────────────────── */}
            <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}>
              <Link href="/app/rewards">
                <div style={{
                  background: '#E31C23', border: '3px solid #111111',
                  padding: '16px 18px', boxShadow: '5px 5px 0 #111111',
                  position: 'relative', overflow: 'hidden', cursor: 'pointer',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(rgba(17,17,17,.12) 1px, transparent 1.2px)',
                    backgroundSize: '10px 10px', pointerEvents: 'none',
                  }} />
                  <div style={{
                    position: 'absolute', top: 10, left: 12,
                    background: '#FFB400', color: '#111111',
                    fontFamily: 'Anton', fontSize: 9, letterSpacing: 2,
                    padding: '2px 7px', border: '1.5px solid #111111',
                    transform: 'rotate(-4deg)',
                  }}>LOYALTY</div>

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <div>
                        <div style={{ fontFamily: 'Anton', fontSize: 28, color: '#F7F2E9', lineHeight: 1 }}>
                          {user.points} <span style={{ fontFamily: 'Cairo', fontSize: 13 }}>نقطة</span>
                        </div>
                        <div style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 12, color: 'rgba(247,242,233,.75)', marginTop: 3 }}>
                          {user.pointsToNext} نقطة للوصول إلى الذهبي 🥇
                        </div>
                      </div>
                      <div style={{
                        background: '#111111', color: '#FFB400',
                        fontFamily: 'Anton', fontSize: 13, letterSpacing: 1,
                        padding: '6px 12px', border: '2px solid rgba(255,255,255,.2)',
                        boxShadow: '3px 3px 0 rgba(0,0,0,.3)', transform: 'skewX(-6deg)',
                      }}>
                        <span style={{ display: 'inline-block', transform: 'skewX(6deg)' }}>🥈 فضي</span>
                      </div>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,.25)', height: 8, border: '1.5px solid rgba(0,0,0,.3)', position: 'relative' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ duration: 1.1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ position: 'absolute', top: 0, right: 0, height: '100%', background: 'linear-gradient(90deg, #FFB400, #FFD060)' }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                      <span style={{ fontFamily: 'Cairo', fontSize: 10, color: 'rgba(247,242,233,.6)' }}>فضي ←</span>
                      <span style={{ fontFamily: 'Cairo', fontSize: 10, color: 'rgba(247,242,233,.6)' }}>→ ذهبي</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.section>

            {/* ── Re-order card ───────────────────────────── */}
            <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <h2 style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 16, color: '#111111', display: 'inline-block', transform: 'skewX(-4deg)' }}>
                  أعد طلبك السابق
                </h2>
                <Link href="/app/orders">
                  <span style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 12, color: '#E31C23' }}>كل الطلبات ←</span>
                </Link>
              </div>
              <div style={{
                background: '#FFFFFF', border: '3px solid #111111',
                padding: '14px 16px', boxShadow: '4px 4px 0 #111111',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{ width: 44, height: 44, background: '#111111', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🍗</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 14, color: '#111111', marginBottom: 2 }}>
                    {lastOrder.items.join(' + ')}
                  </div>
                  <div style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 12, color: '#8A8580' }}>
                    {lastOrder.total} ر.س · {lastOrder.date}
                  </div>
                </div>
                <button
                  onClick={() => {
                    lastOrder.items.forEach((_, i) => {
                      if (i === 0) addToCart(1);
                      if (i === 1) addToCart(14);
                    });
                    setLocation('/app/cart');
                  }}
                  style={{
                    background: '#111111', color: '#F7F2E9',
                    border: '2px solid #111111',
                    fontFamily: 'Cairo', fontWeight: 900, fontSize: 12,
                    padding: '8px 12px', cursor: 'pointer',
                    boxShadow: '3px 3px 0 #E31C23',
                    flexShrink: 0, whiteSpace: 'nowrap',
                  }}
                >
                  إعادة الطلب ←
                </button>
              </div>
            </motion.section>

            {/* ── Categories grid ──────────────────────────── */}
            <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <h2 style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 16, color: '#111111', display: 'inline-block', transform: 'skewX(-4deg)' }}>
                  التصنيفات
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {categories.slice(0, 4).map((c, i) => (
                  <Link key={c.cat} href={`/app/menu?cat=${c.cat}`}>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      style={{
                        background: i % 4 === 0 ? '#E31C23' : i % 4 === 1 ? '#111111' : i % 4 === 2 ? '#FFB400' : '#F7F2E9',
                        color: i % 4 === 2 || i % 4 === 3 ? '#111111' : '#F7F2E9',
                        border: '3px solid #111111', padding: '14px 16px',
                        boxShadow: '4px 4px 0 #111111',
                        display: 'flex', alignItems: 'center', gap: 10,
                        cursor: 'pointer', position: 'relative', overflow: 'hidden',
                      }}
                    >
                      <div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: 'radial-gradient(rgba(17,17,17,.07) 1px, transparent 1.2px)',
                        backgroundSize: '10px 10px', pointerEvents: 'none',
                      }} />
                      <span style={{ fontSize: 28, lineHeight: 1 }}>{catEmoji[c.label]}</span>
                      <span style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 16, transform: 'skewX(-4deg)', display: 'inline-block', position: 'relative', zIndex: 1 }}>
                        {c.label}
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </div>
              <Link href="/app/menu?cat=drinks" style={{ display: 'block', marginTop: 10 }}>
                <motion.div
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: '#F7F2E9', color: '#111111',
                    border: '3px solid #111111', padding: '14px 16px',
                    boxShadow: '4px 4px 0 #111111',
                    display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  <span style={{ fontSize: 28 }}>{catEmoji['مشروبات']}</span>
                  <span style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 16, transform: 'skewX(-4deg)', display: 'inline-block' }}>مشروبات</span>
                  <span style={{ marginRight: 'auto', fontFamily: 'Anton', fontSize: 11, letterSpacing: 2, color: '#8A8580' }}>3 خيارات →</span>
                </motion.div>
              </Link>
            </motion.section>

            {/* ── Bestsellers horizontal scroll ────────────── */}
            <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <h2 style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 16, color: '#111111', display: 'inline-block', transform: 'skewX(-4deg)' }}>
                  الأكثر مبيعاً 🔥
                </h2>
                <Link href="/app/menu">
                  <span style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 12, color: '#E31C23' }}>الكل ←</span>
                </Link>
              </div>
              <div style={{ display: 'flex', gap: 12, overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 8, scrollSnapType: 'x mandatory' }}>
                {bestsellers.map((p, i) => {
                  const bgs = ['#E31C23', '#111111', '#FFB400', '#E31C23', '#111111'];
                  const fgs = ['#F7F2E9', '#F7F2E9', '#111111', '#F7F2E9', '#F7F2E9'];
                  return (
                    <div
                      key={p.id}
                      style={{
                        flexShrink: 0, width: 150, scrollSnapAlign: 'start',
                        border: '3px solid #111111', background: bgs[i % bgs.length],
                        color: fgs[i % fgs.length], boxShadow: '4px 4px 0 #111111',
                        overflow: 'hidden', cursor: 'pointer',
                      }}
                      onClick={() => setLocation(`/app/product/${p.id}`)}
                    >
                      <div style={{ height: 100, overflow: 'hidden', borderBottom: '2px solid #111111', position: 'relative' }}>
                        <img src={p.image} alt={p.nameAr} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.15) saturate(1.2) sepia(0.15)' }} />
                        <div style={{ position: 'absolute', inset: 0, background: bgs[i % bgs.length], opacity: 0.15, mixBlendMode: 'multiply', pointerEvents: 'none' }} />
                      </div>
                      <div style={{ padding: '10px 10px 12px' }}>
                        <div style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 13, marginBottom: 6, lineHeight: 1.3 }}>{p.nameAr}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontFamily: 'Anton', fontSize: 18 }}>{p.price}</span>
                          <motion.button
                            whileTap={{ scale: 0.88 }}
                            onClick={(e) => { e.stopPropagation(); handleAdd(p.id); }}
                            style={{
                              width: 28, height: 28,
                              background: fgs[i % fgs.length], color: bgs[i % bgs.length],
                              border: '2px solid ' + fgs[i % fgs.length],
                              fontFamily: 'Anton', fontSize: 18,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              cursor: 'pointer', lineHeight: 1, flexShrink: 0,
                            }}
                          >+</motion.button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          </div>
        </div>

        {/* ── Bottom nav ──────────────────────────────────── */}
        <AppBottomNav />

        {/* ── Notification bottom sheet ────────────────────── */}
        <AnimatePresence>
          {showNotifs && (
            <>
              {/* Dim overlay */}
              <motion.div
                key="notif-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setShowNotifs(false)}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(17,17,17,.55)',
                  zIndex: 40,
                }}
              />

              {/* Panel */}
              <motion.div
                key="notif-panel"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 320 }}
                style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  zIndex: 50,
                  background: '#F7F2E9',
                  borderTop: '3px solid #111111',
                  borderLeft: '3px solid #111111',
                  borderRight: '3px solid #111111',
                  maxHeight: '80%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  boxShadow: '0 -6px 32px rgba(0,0,0,.18)',
                }}
              >
                {/* Handle bar */}
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4, flexShrink: 0 }}>
                  <div style={{ width: 44, height: 4, background: '#111111', borderRadius: 2, opacity: 0.25 }} />
                </div>

                {/* Header */}
                <div style={{
                  padding: '12px 18px 14px',
                  borderBottom: '2.5px solid #111111',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  flexShrink: 0,
                  background: '#111111',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      fontFamily: 'Anton', fontSize: 18, letterSpacing: 1,
                      color: '#F7F2E9', transform: 'skewX(-6deg)',
                    }}>
                      الإشعارات
                    </div>
                    <div style={{
                      background: '#E31C23', color: '#F7F2E9',
                      fontFamily: 'Anton', fontSize: 11,
                      padding: '2px 8px', border: '1.5px solid #F7F2E9',
                      transform: 'skewX(-6deg)',
                    }}>
                      {notifications.length} جديد
                    </div>
                  </div>
                  <button
                    onClick={() => setShowNotifs(false)}
                    style={{
                      width: 32, height: 32,
                      background: 'rgba(247,242,233,.12)',
                      border: '2px solid rgba(247,242,233,.25)',
                      color: '#F7F2E9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', fontSize: 18, lineHeight: 1,
                      borderRadius: '50%',
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* Notification list */}
                <div style={{ overflowY: 'auto', flex: 1, WebkitOverflowScrolling: 'touch' }}>
                  {notifications.map((n, i) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.22, delay: i * 0.055 }}
                      onClick={() => { setShowNotifs(false); setLocation(n.link); }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 12,
                        padding: '14px 18px',
                        borderBottom: i < notifications.length - 1 ? '1.5px solid rgba(17,17,17,.1)' : 'none',
                        background: n.unread && !readAll ? 'rgba(227,28,35,.05)' : 'transparent',
                        position: 'relative',
                        cursor: 'pointer',
                      }}
                    >
                      {/* Unread accent stripe */}
                      {n.unread && !readAll && (
                        <div style={{
                          position: 'absolute', right: 0, top: 0, bottom: 0,
                          width: 3, background: '#E31C23',
                        }} />
                      )}

                      {/* Icon circle */}
                      <div style={{
                        width: 42, height: 42, flexShrink: 0,
                        background: n.iconBg,
                        border: '2.5px solid #111111',
                        boxShadow: '3px 3px 0 #111111',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 20,
                      }}>
                        {n.icon}
                      </div>

                      {/* Text */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 3 }}>
                          <span style={{
                            fontFamily: 'Cairo', fontWeight: 900, fontSize: 13,
                            color: '#111111', lineHeight: 1.3,
                          }}>
                            {n.title}
                          </span>
                          <span style={{
                            fontFamily: 'Cairo', fontWeight: 700, fontSize: 10,
                            color: '#8A8580', flexShrink: 0,
                            direction: 'rtl',
                          }}>
                            {n.time}
                          </span>
                        </div>
                        <div style={{
                          fontFamily: 'Cairo', fontWeight: 600, fontSize: 11,
                          color: '#8A8580', lineHeight: 1.4,
                          marginBottom: 6,
                        }}>
                          {n.subtitle}
                        </div>
                        {/* Tag badge */}
                        <div style={{
                          display: 'inline-flex',
                          background: n.tagColor === '#FFB400' ? '#FFB400' : n.tagColor,
                          color: n.tagColor === '#FFB400' ? '#111111' : '#F7F2E9',
                          fontFamily: 'Anton', fontSize: 9, letterSpacing: 1.5,
                          padding: '2px 8px', border: '1.5px solid #111111',
                          transform: 'skewX(-6deg)',
                        }}>
                          <span style={{ display: 'inline-block', transform: 'skewX(6deg)' }}>{n.tag}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Bottom padding for scroll */}
                  <div style={{ height: 20 }} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </PhoneFrame>
  );
}
