import { useState, useEffect } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneFrame } from '../../components/layout/PhoneFrame';
import { AppBottomNav } from '../../components/layout/AppBottomNav';
import { AppBackButton } from '../../components/layout/AppBackButton';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';

const categories = [
  { id: 'all',      label: 'الكل ★',     emoji: '' },
  { id: 'chicken',  label: 'دجاج',        emoji: '🍗' },
  { id: 'wraps',    label: 'رابز',         emoji: '🌯' },
  { id: 'meals',    label: 'وجبات',        emoji: '🍱' },
  { id: 'desserts', label: 'حلى',          emoji: '🍰' },
  { id: 'drinks',   label: 'مشروبات',      emoji: '🥤' },
];

export default function AppMenu() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const initialCat = params.get('cat') ?? 'all';
  const [activeCat, setActiveCat] = useState(initialCat);
  const [, setLocation] = useLocation();
  const { addToCart } = useCart();

  useEffect(() => {
    const p = new URLSearchParams(search);
    const cat = p.get('cat') ?? 'all';
    setActiveCat(cat);
  }, [search]);

  const filtered = activeCat === 'all'
    ? products
    : products.filter(p => p.category === activeCat);

  return (
    <PhoneFrame bg="#F7F2E9">
      <div dir="rtl" style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F7F2E9' }}>

        {/* ── Sticky header ──────────────────────────────── */}
        <div style={{
          background: '#111111', borderBottom: '3px solid #111111',
          flexShrink: 0, position: 'relative', zIndex: 10,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,.09) 1px, transparent 1.2px)',
            backgroundSize: '14px 14px', pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', zIndex: 1, padding: '14px 16px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h1 style={{
                fontFamily: 'Cairo', fontWeight: 900, fontSize: 26, color: '#F7F2E9',
                display: 'inline-block', transform: 'skewX(-4deg)',
              }}>
                المنيو
              </h1>
              <AppBackButton to="/app/home" theme="dark" />
            </div>

            {/* Search bar (visual only) */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,255,255,.08)',
              border: '2px solid rgba(255,255,255,.15)',
              padding: '9px 14px',
              marginBottom: 14,
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="rgba(247,242,233,.5)" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 14, color: 'rgba(247,242,233,.4)' }}>
                ابحث عن صنف...
              </span>
            </div>

            {/* Category chips */}
            <div style={{ position: 'relative' }}>
              <div style={{
                display: 'flex', gap: 8, overflowX: 'auto',
                WebkitOverflowScrolling: 'touch', paddingBottom: 10,
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(247,242,233,.35) transparent',
              }}>
              {categories.map(cat => {
                const isActive = activeCat === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => setActiveCat(cat.id)}
                    style={{
                      flexShrink: 0,
                      padding: '6px 14px',
                      border: '2px solid ' + (isActive ? '#FFB400' : 'rgba(255,255,255,.2)'),
                      background: isActive ? '#FFB400' : 'transparent',
                      color: isActive ? '#111111' : 'rgba(247,242,233,.7)',
                      fontFamily: 'Cairo', fontWeight: 900, fontSize: 13,
                      cursor: 'pointer',
                      transform: 'skewX(-6deg)',
                      boxShadow: isActive ? '3px 3px 0 #E31C23' : 'none',
                      transition: 'background 0.18s, border-color 0.18s, box-shadow 0.18s',
                    }}
                  >
                    <span style={{ display: 'inline-block', transform: 'skewX(6deg)', whiteSpace: 'nowrap' }}>
                      {cat.emoji} {cat.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            {/* Fade hint — more chips to the left (RTL scroll direction) */}
            <div style={{
              position: 'absolute', top: 0, left: 0, bottom: 0,
              width: 44, pointerEvents: 'none', zIndex: 1,
              background: 'linear-gradient(to right, #111111 0%, transparent 100%)',
            }} />
          </div>
        </div>
        </div>

        {/* ── Scrollable product list ─────────────────────── */}
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '12px 16px 16px' }}>

          {/* Result count */}
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: 2, color: '#8A8580', textTransform: 'uppercase', marginBottom: 12 }}>
            {filtered.length} نتيجة
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              {filtered.map((p) => (
                <ProductRow
                  key={p.id}
                  product={p}
                  onAdd={() => addToCart(p.id)}
                  onClick={() => setLocation(`/app/product/${p.id}`)}
                />
              ))}

              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 0', fontFamily: 'Cairo', fontWeight: 700, color: '#8A8580' }}>
                  لا توجد منتجات في هذا التصنيف
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom nav ──────────────────────────────────── */}
        <AppBottomNav />
      </div>
    </PhoneFrame>
  );
}

/* ── Single product row ─────────────────────────────────── */
function ProductRow({
  product,
  onAdd,
  onClick,
}: {
  product: typeof products[number];
  onAdd: () => void;
  onClick: () => void;
}) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 800);
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        display: 'flex', gap: 0,
        border: '3px solid #111111',
        background: '#FFFFFF',
        boxShadow: '4px 4px 0 #111111',
        overflow: 'hidden', cursor: 'pointer',
        transition: 'box-shadow 0.15s, transform 0.15s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translate(-2px,-2px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '6px 6px 0 #E31C23';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = '';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '4px 4px 0 #111111';
      }}
    >
      {/* Image */}
      <div style={{ width: 90, flexShrink: 0, position: 'relative', borderLeft: '3px solid #111111' }}>
        <img
          src={product.image}
          alt={product.nameAr}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            filter: 'contrast(1.15) saturate(1.2) sepia(0.12)' }}
        />
        {/* Halftone over image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(17,17,17,.45) 1px, transparent 1.2px)',
          backgroundSize: '8px 8px', opacity: 0.25, pointerEvents: 'none',
        }} />
        {product.badge && (
          <div style={{
            position: 'absolute', top: 6, right: 0,
            background: product.badge === 'hot' ? '#E31C23' : product.badge === 'new' ? '#111111' : '#FFB400',
            color: product.badge === 'bestseller' ? '#111111' : '#F7F2E9',
            fontFamily: 'Cairo', fontWeight: 900, fontSize: 9,
            padding: '2px 6px', border: '1.5px solid #111111',
          }}>
            {product.badge === 'hot' ? '🔥' : product.badge === 'new' ? 'جديد' : '⭐'}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, padding: '12px 12px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 15, color: '#111111', lineHeight: 1.2 }}>
          {product.nameAr}
        </div>
        {product.descAr && (
          <div style={{
            fontFamily: 'Cairo', fontWeight: 700, fontSize: 11, color: '#8A8580', lineHeight: 1.5,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {product.descAr}
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 6 }}>
          <span style={{ fontFamily: 'Anton', fontSize: 20, color: '#111111', lineHeight: 1 }}>
            {product.price} <span style={{ fontFamily: 'Cairo', fontSize: 11, fontWeight: 700 }}>ر.س</span>
          </span>

          {/* Add button */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            animate={added ? { scale: [1, 1.3, 1], background: '#4ADE80' } : { scale: 1, background: '#111111' }}
            transition={{ duration: 0.3 }}
            onClick={handleAdd}
            style={{
              width: 34, height: 34,
              background: '#111111', color: '#F7F2E9',
              border: '2px solid #111111',
              fontFamily: 'Anton', fontSize: 22, lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
              boxShadow: '2px 2px 0 #E31C23',
            }}
          >
            {added ? '✓' : '+'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
