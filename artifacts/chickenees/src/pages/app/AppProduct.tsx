import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneFrame } from '../../components/layout/PhoneFrame';
import { AppBottomNav } from '../../components/layout/AppBottomNav';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../hooks/use-toast';
import { products } from '../../data/products';

/* ── Brand color palette per product id ─────────────────── */
const heroBgs = ['#E31C23', '#111111', '#FFB400', '#E31C23', '#111111',
                 '#FFB400', '#E31C23', '#111111', '#FFB400', '#E31C23',
                 '#111111', '#FFB400', '#E31C23', '#111111', '#FFB400'];
const heroFgs = ['#F7F2E9', '#F7F2E9', '#111111', '#F7F2E9', '#F7F2E9',
                 '#111111', '#F7F2E9', '#F7F2E9', '#111111', '#F7F2E9',
                 '#F7F2E9', '#111111', '#F7F2E9', '#F7F2E9', '#111111'];

const englishNames: Record<number, string> = {
  1: 'Double Bucket', 2: 'Super Strips', 3: 'Crunchy Wings',
  4: 'Spicy Wrap', 5: 'Classic Wrap', 6: 'Cheese Wrap',
  7: 'Family Meal', 8: 'Group Meal', 9: 'Crunchy Meal',
  10: 'Chocolate Melt', 11: 'Ice Cream Scoop', 12: 'Crunchy Cookies',
  13: 'Pepsi', 14: 'Lemon Mint', 15: 'Karak Tea',
};

/* ── Chip selector ──────────────────────────────────────── */
function ChipGroup({
  label, options, value, onChange,
}: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 14, color: '#111111', marginBottom: 10, transform: 'skewX(-4deg)', display: 'inline-block' }}>
        {label}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {options.map(opt => {
          const active = value === opt;
          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.92 }}
              onClick={() => onChange(opt)}
              style={{
                padding: '8px 16px',
                border: `2.5px solid ${active ? '#111111' : '#CCCCCC'}`,
                background: active ? '#111111' : '#FFFFFF',
                color: active ? '#F7F2E9' : '#6A6560',
                fontFamily: 'Cairo', fontWeight: 900, fontSize: 14,
                cursor: 'pointer',
                boxShadow: active ? '3px 3px 0 #E31C23' : 'none',
                transform: active ? 'skewX(-4deg)' : 'none',
                transition: 'background 0.15s, border-color 0.15s, box-shadow 0.15s',
              }}
            >
              <span style={{ display: 'inline-block', transform: active ? 'skewX(4deg)' : 'none' }}>
                {opt}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function AppProduct({ params }: { params: { id: string } }) {
  const id = parseInt(params?.id ?? '1', 10);
  const product = products.find(p => p.id === id) ?? products[0];
  const bg = heroBgs[(id - 1) % heroBgs.length];
  const fg = heroFgs[(id - 1) % heroFgs.length];

  const [spicy, setSpicy] = useState('عادي');
  const [side, setSide] = useState('بطاطس');
  const [drink, setDrink] = useState('بيبسي');
  const [qty, setQty] = useState(1);

  const { addToCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const lineTotal = product.price * qty;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product.id);
    toast({
      title: `${product.nameAr} أُضيف للسلة ✓`,
      description: `${spicy} · ${side} · ${drink} · الكمية: ${qty}`,
      duration: 2500,
    });
    setLocation('/app/cart');
  };

  return (
    <PhoneFrame bg="#F7F2E9">
      <div dir="rtl" style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F7F2E9' }}>

        {/* ── Scrollable body ─────────────────────────── */}
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>

          {/* Hero image block */}
          <div style={{ position: 'relative', height: 240, background: bg, overflow: 'hidden', borderBottom: '3px solid #111111' }}>
            {/* Halftone */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `radial-gradient(${fg === '#F7F2E9' ? 'rgba(255,255,255,.12)' : 'rgba(17,17,17,.10)'} 1px, transparent 1.2px)`,
              backgroundSize: '14px 14px', pointerEvents: 'none',
            }} />

            {/* Large product name as the "image" */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 8, padding: 24,
            }}>
              <div style={{ fontSize: 56, lineHeight: 1 }}>
                {product.category === 'chicken' ? '🍗' : product.category === 'wraps' ? '🌯' :
                 product.category === 'meals' ? '🍱' : product.category === 'desserts' ? '🍰' : '🥤'}
              </div>
              <div style={{
                fontFamily: 'Cairo', fontWeight: 900,
                fontSize: 'clamp(22px, 6vw, 32px)',
                color: fg, textAlign: 'center', lineHeight: 1.15,
                transform: 'skewX(-5deg)', display: 'inline-block',
              }}>
                {product.nameAr}
              </div>
              {product.badge && (
                <div style={{
                  background: product.badge === 'hot' ? '#FFB400' : product.badge === 'new' ? '#F7F2E9' : '#E31C23',
                  color: '#111111',
                  fontFamily: 'Anton', fontSize: 11, letterSpacing: 2,
                  padding: '4px 10px', border: '2px solid #111111',
                  boxShadow: '3px 3px 0 rgba(0,0,0,.3)',
                  transform: 'rotate(-3deg)',
                }}>
                  {product.badge === 'hot' ? '🔥 HOT' : product.badge === 'new' ? 'NEW' : '★ BEST'}
                </div>
              )}
            </div>

            {/* Diagonal accent */}
            <div style={{
              position: 'absolute', bottom: -20, right: -20,
              width: 80, height: 80, background: 'rgba(0,0,0,.12)',
              transform: 'rotate(45deg)',
            }} />

            {/* Back button — top RIGHT in RTL */}
            <button
              onClick={() => setLocation('/app/menu')}
              style={{
                position: 'absolute', top: 14, right: 14,
                width: 36, height: 36,
                background: 'rgba(0,0,0,.35)', border: '2px solid rgba(255,255,255,.3)',
                borderRadius: '50%', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#FFFFFF', backdropFilter: 'blur(4px)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
          </div>

          {/* Product info */}
          <div style={{ padding: '20px 18px 100px' }}>

            {/* Name + price row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <div>
                <h1 style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 24, color: '#111111', lineHeight: 1.1, transform: 'skewX(-4deg)', display: 'inline-block' }}>
                  {product.nameAr}
                </h1>
                <div style={{ fontFamily: 'Anton', fontSize: 11, letterSpacing: 3, color: '#8A8580', textTransform: 'uppercase', marginTop: 4 }}>
                  {englishNames[product.id] ?? ''}
                </div>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'Anton', fontSize: 32, color: '#E31C23', lineHeight: 1 }}>
                  {product.price}
                </div>
                <div style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 12, color: '#8A8580' }}>ر.س</div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: '2px dashed rgba(17,17,17,.12)', margin: '14px 0' }} />

            {/* Description */}
            <p style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 14, color: '#4A4540', lineHeight: 1.75, marginBottom: 22 }}>
              {product.descAr}
            </p>

            {/* Divider */}
            <div style={{ borderTop: '3px solid #111111', margin: '0 0 20px', position: 'relative' }}>
              <span style={{
                position: 'absolute', top: -11, right: 0,
                background: '#FFB400', color: '#111111',
                fontFamily: 'Anton', fontSize: 10, letterSpacing: 2, padding: '2px 8px',
                border: '2px solid #111111',
              }}>
                CUSTOMIZE
              </span>
            </div>

            {/* Customizations */}
            <ChipGroup
              label="مستوى الحرارة 🌶️"
              options={['عادي', 'حار', 'ناار 🔥']}
              value={spicy}
              onChange={setSpicy}
            />
            <ChipGroup
              label="الطرف"
              options={['بطاطس', 'سلطة', 'رايس']}
              value={side}
              onChange={setSide}
            />
            <ChipGroup
              label="المشروب"
              options={['بيبسي', 'ليمون', 'بدون']}
              value={drink}
              onChange={setDrink}
            />

            {/* Divider */}
            <div style={{ borderTop: '2px dashed rgba(17,17,17,.12)', margin: '4px 0 20px' }} />

            {/* Quantity */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 14, color: '#111111', transform: 'skewX(-4deg)', display: 'inline-block' }}>
                الكمية
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '3px solid #111111', background: '#FFFFFF' }}>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{
                    width: 40, height: 40, background: qty === 1 ? '#EEE8E0' : '#111111',
                    color: qty === 1 ? '#8A8580' : '#F7F2E9',
                    border: 'none', borderLeft: '3px solid #111111',
                    fontFamily: 'Anton', fontSize: 22, cursor: qty === 1 ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  −
                </motion.button>
                <motion.div
                  key={qty}
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.18 }}
                  style={{ width: 44, textAlign: 'center', fontFamily: 'Anton', fontSize: 22, color: '#111111' }}
                >
                  {qty}
                </motion.div>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setQty(q => Math.min(10, q + 1))}
                  style={{
                    width: 40, height: 40, background: '#E31C23',
                    color: '#F7F2E9',
                    border: 'none', borderRight: '3px solid #111111',
                    fontFamily: 'Anton', fontSize: 22, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  +
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Sticky Add to Cart ───────────────────────── */}
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
            onClick={handleAdd}
            style={{
              width: '100%', padding: '16px 0',
              background: '#E31C23', color: '#F7F2E9',
              border: '3px solid #111111',
              fontFamily: 'Cairo', fontWeight: 900, fontSize: 18,
              cursor: 'pointer', boxShadow: '5px 5px 0 #111111',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 16, position: 'relative', zIndex: 1,
              transform: 'skewX(-3deg)',
            }}
          >
            <span style={{ display: 'inline-block', transform: 'skewX(3deg)' }}>
              أضف للسلة
            </span>
            <span style={{ display: 'inline-block', transform: 'skewX(3deg)', opacity: 0.6, fontSize: 14 }}>·</span>
            <motion.span
              key={lineTotal}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: 'inline-block', transform: 'skewX(3deg)', fontFamily: 'Anton', fontSize: 22 }}
            >
              {lineTotal} ر.س
            </motion.span>
          </motion.button>
        </div>

        <AppBottomNav />
      </div>
    </PhoneFrame>
  );
}
