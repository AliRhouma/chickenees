import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneFrame } from '../../components/layout/PhoneFrame';
import { AppBottomNav } from '../../components/layout/AppBottomNav';
import { AppBackButton } from '../../components/layout/AppBackButton';
import { useCart } from '../../context/CartContext';
import { addresses } from '../../data/addresses';

const paymentMethods = [
  { id: 'apple', label: 'Apple Pay', icon: '' },
  { id: 'mada',  label: 'مدى',       icon: '💳' },
  { id: 'cash',  label: 'كاش',       icon: '💵' },
];

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

export default function AppCheckout() {
  const { total, subtotal, deliveryFee, discount, items, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('apple');
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      clearCart();
      setLocation('/app/order/2848');
    }, 2200);
  };

  return (
    <PhoneFrame bg="#F7F2E9">
      <div dir="rtl" style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F7F2E9', position: 'relative' }}>

        {/* ── Loading overlay ─────────────────────────── */}
        <AnimatePresence>
          {confirming && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute', inset: 0, zIndex: 100,
                background: '#E31C23',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 20,
              }}
            >
              {/* Halftone */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(rgba(255,255,255,.12) 1px, transparent 1.2px)',
                backgroundSize: '14px 14px', pointerEvents: 'none',
              }} />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: 64, height: 64,
                  border: '5px solid rgba(247,242,233,.25)',
                  borderTop: '5px solid #F7F2E9',
                  borderRadius: '50%',
                  position: 'relative', zIndex: 1,
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontFamily: 'Cairo', fontWeight: 900, fontSize: 20, color: '#F7F2E9',
                  transform: 'skewX(-4deg)', display: 'inline-block', position: 'relative', zIndex: 1,
                }}
              >
                جاري تأكيد طلبك...
              </motion.div>
              <div style={{
                fontFamily: 'Anton', fontSize: 11, letterSpacing: 3, color: 'rgba(247,242,233,.5)',
                textTransform: 'uppercase', position: 'relative', zIndex: 1,
              }}>
                PROCESSING ORDER
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div style={{
          background: '#111111', color: '#F7F2E9', borderBottom: '3px solid #111111',
          padding: '16px 18px', flexShrink: 0, position: 'relative', zIndex: 1,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,.09) 1px, transparent 1.2px)',
            backgroundSize: '14px 14px', pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 22, transform: 'skewX(-4deg)', display: 'inline-block' }}>
              إتمام الطلب
            </h1>
            <AppBackButton to="/app/cart" theme="dark" />
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '18px 16px 8px' }}>

          {/* ── Address ─────────────────────────────────── */}
          <SectionHeader label="📍 عنوان التوصيل" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {addresses.map(addr => {
              const active = selectedAddress === addr.id;
              return (
                <motion.div
                  key={addr.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedAddress(addr.id)}
                  style={{
                    border: `3px solid ${active ? '#111111' : '#D0CAC0'}`,
                    background: active ? '#FFB400' : '#FFFFFF',
                    padding: '14px 16px',
                    boxShadow: active ? '4px 4px 0 #111111' : 'none',
                    display: 'flex', alignItems: 'center', gap: 12,
                    cursor: 'pointer',
                    transition: 'background 0.15s, border-color 0.15s, box-shadow 0.15s',
                  }}
                >
                  {/* Radio */}
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    border: `2.5px solid ${active ? '#111111' : '#B0A890'}`,
                    background: active ? '#111111' : 'transparent',
                    flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.15s, border-color 0.15s',
                  }}>
                    {active && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFB400' }} />}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 15, color: '#111111', lineHeight: 1.2 }}>
                      {addr.label}
                    </div>
                    <div style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 12, color: active ? '#4A3800' : '#8A8580', marginTop: 2 }}>
                      {addr.detail}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Delivery time (static) ──────────────────── */}
          <div style={{
            background: '#111111', color: '#F7F2E9',
            border: '3px solid #111111', padding: '13px 16px',
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: '4px 4px 0 #E31C23', marginBottom: 24,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(rgba(255,255,255,.07) 1px, transparent 1.2px)',
              backgroundSize: '10px 10px', pointerEvents: 'none',
            }} />
            <span style={{ fontSize: 28, flexShrink: 0 }}>🛵</span>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 15, lineHeight: 1.1 }}>
                أقرب وقت ممكن
              </div>
              <div style={{ fontFamily: 'Anton', fontSize: 18, color: '#FFB400', letterSpacing: 1, marginTop: 2 }}>
                25 – 35 دقيقة
              </div>
            </div>
          </div>

          {/* ── Payment ─────────────────────────────────── */}
          <SectionHeader label="💳 طريقة الدفع" />
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            {paymentMethods.map(pm => {
              const active = selectedPayment === pm.id;
              return (
                <motion.div
                  key={pm.id}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setSelectedPayment(pm.id)}
                  style={{
                    flex: 1, padding: '14px 8px',
                    border: `3px solid ${active ? '#111111' : '#D0CAC0'}`,
                    background: active ? '#111111' : '#FFFFFF',
                    color: active ? '#F7F2E9' : '#6A6560',
                    boxShadow: active ? '4px 4px 0 #E31C23' : 'none',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontSize: pm.id === 'apple' ? 0 : 22, height: 28, display: 'flex', alignItems: 'center' }}>
                    {pm.id === 'apple'
                      ? <span style={{ color: active ? '#F7F2E9' : '#111111' }}><AppleIcon /></span>
                      : pm.icon}
                  </div>
                  <div style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 13, textAlign: 'center', direction: pm.id === 'apple' ? 'ltr' : 'rtl' }}>
                    {pm.label}
                  </div>
                  {active && (
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      style={{
                        width: 16, height: 16, borderRadius: '50%',
                        background: '#E31C23', border: '2px solid #F7F2E9',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Anton', fontSize: 10, color: '#F7F2E9',
                      }}
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* ── Order summary (collapsible) ──────────────── */}
          <div style={{ marginBottom: 16 }}>
            <motion.div
              whileTap={{ scale: 0.99 }}
              onClick={() => setSummaryOpen(o => !o)}
              style={{
                background: '#FFFFFF', border: '3px solid #111111',
                padding: '14px 16px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                cursor: 'pointer',
                boxShadow: summaryOpen ? '4px 4px 0 #111111' : '2px 2px 0 #111111',
              }}
            >
              <span style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 15, color: '#111111', transform: 'skewX(-4deg)', display: 'inline-block' }}>
                ملخص الطلب ({items.length} {items.length === 1 ? 'صنف' : 'أصناف'})
              </span>
              <motion.span
                animate={{ rotate: summaryOpen ? 180 : 0 }}
                style={{ fontSize: 12, color: '#8A8580' }}
              >
                ▼
              </motion.span>
            </motion.div>

            <AnimatePresence initial={false}>
              {summaryOpen && (
                <motion.div
                  key="summary"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ background: '#FFFFFF', border: '3px solid #111111', borderTop: '1.5px dashed rgba(17,17,17,.15)', padding: '12px 16px' }}>
                    {items.map(item => (
                      <div key={item.productId} style={{
                        display: 'flex', justifyContent: 'space-between',
                        fontFamily: 'Cairo', fontWeight: 700, fontSize: 13, color: '#4A4540',
                        padding: '4px 0', borderBottom: '1px dashed rgba(17,17,17,.08)',
                      }}>
                        <span>{item.nameAr} × {item.quantity}</span>
                        <span style={{ fontFamily: 'Anton', fontSize: 14 }}>{item.price * item.quantity} ر.س</span>
                      </div>
                    ))}
                    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {[
                        { l: 'المجموع', v: subtotal },
                        { l: 'التوصيل', v: deliveryFee },
                        ...(discount > 0 ? [{ l: 'خصم كود', v: -discount }] : []),
                      ].map(r => (
                        <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Cairo', fontWeight: 700, fontSize: 12, color: r.v < 0 ? '#4ADE80' : '#8A8580' }}>
                          <span>{r.l}</span>
                          <span style={{ fontFamily: 'Anton', fontSize: 13 }}>{Math.abs(r.v)} ر.س</span>
                        </div>
                      ))}
                      <div style={{
                        display: 'flex', justifyContent: 'space-between', paddingTop: 8,
                        borderTop: '2px solid #111111', fontFamily: 'Cairo', fontWeight: 900,
                        fontSize: 16, color: '#111111',
                      }}>
                        <span>الإجمالي</span>
                        <span style={{ fontFamily: 'Anton', color: '#E31C23' }}>{total} ر.س</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Sticky confirm CTA ───────────────────────── */}
        <div style={{
          flexShrink: 0, padding: '12px 16px',
          background: '#F7F2E9', borderTop: '3px solid #111111',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(17,17,17,.055) 1px, transparent 1.2px)',
            backgroundSize: '10px 10px', pointerEvents: 'none',
          }} />
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleConfirm}
            disabled={confirming}
            style={{
              width: '100%', padding: '16px 0',
              background: '#E31C23', color: '#F7F2E9',
              border: '3px solid #111111', boxShadow: '5px 5px 0 #111111',
              fontFamily: 'Cairo', fontWeight: 900, fontSize: 18, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
              position: 'relative', zIndex: 1, transform: 'skewX(-3deg)',
            }}
          >
            <span style={{ display: 'inline-block', transform: 'skewX(3deg)' }}>تأكيد الطلب 🚀</span>
            <span style={{ display: 'inline-block', transform: 'skewX(3deg)', opacity: 0.6, fontSize: 14 }}>·</span>
            <span style={{ display: 'inline-block', transform: 'skewX(3deg)', fontFamily: 'Anton', fontSize: 22 }}>
              {total} ر.س
            </span>
          </motion.button>
        </div>

        <AppBottomNav />
      </div>
    </PhoneFrame>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 15, color: '#111111', marginBottom: 10, display: 'inline-block', transform: 'skewX(-4deg)' }}>
      {label}
    </div>
  );
}
