import { useState, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneFrame } from '../../components/layout/PhoneFrame';
import { AppBottomNav } from '../../components/layout/AppBottomNav';
import { AppBackButton } from '../../components/layout/AppBackButton';
import { RoosterSVG } from '../../components/brand/RoosterSVG';
import { useCart } from '../../context/CartContext';

/* ── Animated number ────────────────────────────────────── */
function AnimatedNumber({ value }: { value: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        style={{ display: 'inline-block' }}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

/* ── Cart item row ──────────────────────────────────────── */
function CartItemRow({
  item,
  onInc,
  onDec,
  onRemove,
}: {
  item: { productId: number; nameAr: string; quantity: number; price: number };
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
}) {
  const emojis: Record<number, string> = {
    1:'🍗', 2:'🍗', 3:'🍗', 4:'🌯', 5:'🌯', 6:'🌯',
    7:'🍱', 8:'🍱', 9:'🍱', 10:'🍰', 11:'🍰', 12:'🍰',
    13:'🥤', 14:'🥤', 15:'🥤',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background: '#FFFFFF',
        border: '3px solid #111111',
        boxShadow: '4px 4px 0 #111111',
        overflow: 'hidden',
        marginBottom: 12,
      }}
    >
      <div style={{ display: 'flex', gap: 0 }}>
        {/* Emoji thumb */}
        <div style={{
          width: 72, flexShrink: 0,
          background: '#111111',
          borderLeft: '3px solid #111111',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32,
        }}>
          {emojis[item.productId] ?? '🍗'}
        </div>

        {/* Info */}
        <div style={{ flex: 1, padding: '12px 12px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <div style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 15, color: '#111111', lineHeight: 1.2 }}>
              {item.nameAr}
            </div>
            {/* Remove X */}
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={onRemove}
              style={{
                width: 24, height: 24, flexShrink: 0,
                background: 'rgba(227,28,35,.1)', border: '1.5px solid #E31C23',
                borderRadius: '50%', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#E31C23', fontSize: 14, fontWeight: 900, lineHeight: 1,
              }}
            >
              ×
            </motion.button>
          </div>

          {/* Price + qty row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'Anton', fontSize: 18, color: '#E31C23' }}>
              <AnimatedNumber value={item.price * item.quantity} />
              <span style={{ fontFamily: 'Cairo', fontSize: 11, fontWeight: 700, color: '#8A8580', marginRight: 3 }}>ر.س</span>
            </div>

            {/* Qty controls */}
            <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #111111', gap: 0 }}>
              <motion.button whileTap={{ scale: 0.85 }} onClick={onDec} style={{
                width: 30, height: 30, background: '#111111', color: '#F7F2E9',
                border: 'none', cursor: 'pointer', fontFamily: 'Anton', fontSize: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>−</motion.button>
              <motion.div
                key={item.quantity}
                initial={{ scale: 1.25 }} animate={{ scale: 1 }}
                transition={{ duration: 0.15 }}
                style={{ width: 32, textAlign: 'center', fontFamily: 'Anton', fontSize: 16, color: '#111111' }}
              >
                {item.quantity}
              </motion.div>
              <motion.button whileTap={{ scale: 0.85 }} onClick={onInc} style={{
                width: 30, height: 30, background: '#E31C23', color: '#F7F2E9',
                border: 'none', cursor: 'pointer', fontFamily: 'Anton', fontSize: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>+</motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function AppCart() {
  const { items, updateQuantity, removeFromCart, total, subtotal, deliveryFee, discount, applyPromo, itemCount } = useCart();
  const [, setLocation] = useLocation();
  const [promoCode, setPromoCode] = useState('');
  const [promoStatus, setPromoStatus] = useState<'idle' | 'success' | 'fail'>('idle');
  const shakeRef = useRef<HTMLDivElement>(null);

  const handlePromo = () => {
    const ok = applyPromo(promoCode.trim());
    setPromoStatus(ok ? 'success' : 'fail');
    if (!ok) {
      setTimeout(() => setPromoStatus('idle'), 2000);
    }
  };

  /* ── Empty state ───────────────────────────────── */
  if (items.length === 0) {
    return (
      <PhoneFrame bg="#F7F2E9">
        <div dir="rtl" style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F7F2E9' }}>
          <div style={{
            background: '#111111', color: '#F7F2E9', borderBottom: '3px solid #111111',
            padding: '16px 18px', flexShrink: 0, position: 'relative',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(rgba(255,255,255,.09) 1px, transparent 1.2px)',
              backgroundSize: '14px 14px', pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 22, transform: 'skewX(-4deg)', display: 'inline-block' }}>
                السلة
              </h1>
              <AppBackButton to="/app/menu" theme="dark" />
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 120, height: 120, marginBottom: 24 }}
            >
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                background: '#111111', border: '3px solid #111111',
                boxShadow: '6px 6px 0 #E31C23', position: 'relative', overflow: 'hidden',
              }}>
                <RoosterSVG className="w-full h-full" />
              </div>
            </motion.div>
            <h2 style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 24, color: '#111111', transform: 'skewX(-4deg)', display: 'inline-block', marginBottom: 8 }}>
              سلتك فاضية 😅
            </h2>
            <p style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 15, color: '#8A8580', marginBottom: 28, lineHeight: 1.6 }}>
              الجوع كافر! ارجع للمنيو وطلب لك شي يروقك.
            </p>
            <Link href="/app/menu">
              <motion.button whileTap={{ scale: 0.95 }} style={{
                background: '#E31C23', color: '#F7F2E9',
                border: '3px solid #111111', fontFamily: 'Cairo', fontWeight: 900, fontSize: 18,
                padding: '14px 32px', cursor: 'pointer', boxShadow: '5px 5px 0 #111111',
                transform: 'skewX(-4deg)',
              }}>
                <span style={{ display: 'inline-block', transform: 'skewX(4deg)' }}>تصفح المنيو ←</span>
              </motion.button>
            </Link>
          </div>
          <AppBottomNav />
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame bg="#F7F2E9">
      <div dir="rtl" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F7F2E9' }}>

        {/* Header */}
        <div style={{
          background: '#111111', color: '#F7F2E9',
          borderBottom: '3px solid #111111', padding: '16px 18px',
          flexShrink: 0, position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,.09) 1px, transparent 1.2px)',
            backgroundSize: '14px 14px', pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 22, transform: 'skewX(-4deg)', display: 'inline-block' }}>
              السلة
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                background: '#E31C23', color: '#F7F2E9',
                fontFamily: 'Anton', fontSize: 12, letterSpacing: 1,
                padding: '4px 10px', border: '2px solid rgba(255,255,255,.2)',
                transform: 'skewX(-6deg)',
              }}>
                <span style={{ display: 'inline-block', transform: 'skewX(6deg)' }}>
                  {itemCount} {itemCount === 1 ? 'صنف' : 'أصناف'}
                </span>
              </div>
              <AppBackButton to="/app/menu" theme="dark" />
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '16px 16px 0' }}>

          {/* Items list */}
          <AnimatePresence initial={false}>
            {items.map(item => (
              <CartItemRow
                key={item.productId}
                item={item}
                onInc={() => updateQuantity(item.productId, item.quantity + 1)}
                onDec={() => updateQuantity(item.productId, item.quantity - 1)}
                onRemove={() => removeFromCart(item.productId)}
              />
            ))}
          </AnimatePresence>

          {/* Promo code */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 13, color: '#111111', marginBottom: 8, transform: 'skewX(-4deg)', display: 'inline-block' }}>
              كود الخصم
            </div>
            <div style={{ display: 'flex', gap: 0 }}>
              <motion.div
                ref={shakeRef}
                animate={promoStatus === 'fail'
                  ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
                  : { x: 0 }
                }
                transition={{ duration: 0.45 }}
                style={{ flex: 1 }}
              >
                <input
                  value={promoCode}
                  onChange={e => { setPromoCode(e.target.value.toUpperCase()); setPromoStatus('idle'); }}
                  placeholder="CRUNCH10"
                  disabled={promoStatus === 'success'}
                  style={{
                    width: '100%', padding: '12px 14px',
                    border: `2.5px solid ${promoStatus === 'success' ? '#4ADE80' : promoStatus === 'fail' ? '#E31C23' : '#111111'}`,
                    borderLeft: 'none',
                    background: promoStatus === 'success' ? 'rgba(74,222,128,.08)' : '#FFFFFF',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 14, letterSpacing: 2,
                    color: '#111111', outline: 'none',
                    transition: 'border-color 0.2s',
                    direction: 'ltr',
                  }}
                />
              </motion.div>
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={handlePromo}
                disabled={promoStatus === 'success' || !promoCode}
                style={{
                  padding: '0 16px',
                  background: promoStatus === 'success' ? '#4ADE80' : '#111111',
                  color: '#F7F2E9',
                  border: '2.5px solid #111111',
                  fontFamily: 'Cairo', fontWeight: 900, fontSize: 14,
                  cursor: promoStatus === 'success' ? 'default' : 'pointer',
                  flexShrink: 0, whiteSpace: 'nowrap',
                  transition: 'background 0.2s',
                }}
              >
                <AnimatePresence mode="wait">
                  {promoStatus === 'success' ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      ✓ مطبق
                    </motion.span>
                  ) : (
                    <motion.span key="apply">تطبيق</motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
            <AnimatePresence>
              {promoStatus === 'fail' && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 12, color: '#E31C23', marginTop: 6 }}
                >
                  ✗ الكود غير صحيح. جرب CRUNCH10
                </motion.div>
              )}
              {promoStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 12, color: '#4ADE80', marginTop: 6 }}
                >
                  ✓ خصم 10٪ تم تطبيقه!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary card */}
          <div style={{
            background: '#FFFFFF', border: '3px solid #111111',
            boxShadow: '5px 5px 0 #111111', padding: '16px 16px',
            marginBottom: 16,
          }}>
            <div style={{
              fontFamily: 'Cairo', fontWeight: 900, fontSize: 16, color: '#111111',
              marginBottom: 12, paddingBottom: 10,
              borderBottom: '2px dashed rgba(17,17,17,.15)',
              transform: 'skewX(-4deg)', display: 'inline-block',
            }}>
              ملخص الطلب
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'المجموع الفرعي', value: subtotal, color: '#4A4540' },
                { label: 'رسوم التوصيل', value: deliveryFee, color: '#4A4540' },
                ...(discount > 0 ? [{ label: 'خصم الكود 10٪', value: -discount, color: '#4ADE80' }] : []),
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 14, color: row.color }}>
                    {row.label}
                  </span>
                  <span style={{ fontFamily: 'Anton', fontSize: 16, color: row.color }}>
                    {row.value > 0 ? '' : '- '}<AnimatedNumber value={Math.abs(row.value)} />
                    <span style={{ fontFamily: 'Cairo', fontSize: 11, fontWeight: 700 }}> ر.س</span>
                  </span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '3px solid #111111', marginTop: 12, paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 18, color: '#111111', transform: 'skewX(-4deg)', display: 'inline-block' }}>
                الإجمالي
              </span>
              <span style={{ fontFamily: 'Anton', fontSize: 28, color: '#E31C23' }}>
                <AnimatedNumber value={total} />
                <span style={{ fontFamily: 'Cairo', fontSize: 13, fontWeight: 700, color: '#8A8580' }}> ر.س</span>
              </span>
            </div>
          </div>
        </div>

        {/* Sticky CTA */}
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
            onClick={() => setLocation('/app/checkout')}
            style={{
              width: '100%', padding: '16px 0',
              background: '#111111', color: '#F7F2E9',
              border: '3px solid #111111', boxShadow: '5px 5px 0 #E31C23',
              fontFamily: 'Cairo', fontWeight: 900, fontSize: 18, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
              position: 'relative', zIndex: 1, transform: 'skewX(-3deg)',
            }}
          >
            <span style={{ display: 'inline-block', transform: 'skewX(3deg)' }}>إتمام الطلب</span>
            <span style={{ display: 'inline-block', transform: 'skewX(3deg)', opacity: 0.5 }}>·</span>
            <motion.span key={total} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'inline-block', transform: 'skewX(3deg)', fontFamily: 'Anton', fontSize: 22 }}>
              {total} ر.س
            </motion.span>
          </motion.button>
        </div>

        <AppBottomNav />
      </div>
    </PhoneFrame>
  );
}
