import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MarketingNav } from '../../components/layout/MarketingNav';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { ProductCard } from '../../components/brand/ProductCard';
import { ProductModal } from '../../components/brand/ProductModal';
import { products } from '../../data/products';

type Product = typeof products[number];

const categories = [
  { id: 'all',      label: 'الكل',      emoji: '★' },
  { id: 'chicken',  label: 'دجاج',      emoji: '🍗' },
  { id: 'wraps',    label: 'رابز',      emoji: '🌯' },
  { id: 'meals',    label: 'وجبات',     emoji: '🍱' },
  { id: 'desserts', label: 'حلى',       emoji: '🍰' },
  { id: 'drinks',   label: 'مشروبات',   emoji: '🥤' },
];

const countByCategory = (cat: string) =>
  cat === 'all' ? products.length : products.filter(p => p.category === cat).length;

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [tabsStuck, setTabsStuck] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Detect when tabs become sticky
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      ([entry]) => setTabsStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-73px 0px 0px 0px' }
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter(p => p.category === activeCategory);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
  };

  return (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F7F2E9' }}
    >
      <MarketingNav />

      {/* ── PAGE HERO ─────────────────────────────────── */}
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
        {/* Halftone */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(rgba(255,255,255,.10) 1px, transparent 1.2px)',
            backgroundSize: '14px 14px',
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
            THE FULL LINEUP
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
            القائمة
          </h1>
          <p
            style={{
              fontFamily: 'Cairo',
              fontWeight: 700,
              fontSize: 18,
              color: '#8A8580',
              maxWidth: 420,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            {products.length} صنف. كل يوم طازج. الاختيار لك.
          </p>
        </div>
      </section>

      {/* Sticky sentinel — sits right above tabs */}
      <div ref={sentinelRef} style={{ height: 1 }} />

      {/* ── STICKY CATEGORY TABS ──────────────────────── */}
      <div
        ref={tabsRef}
        style={{
          position: 'sticky',
          top: 72, // nav height
          zIndex: 40,
          background: tabsStuck ? '#F7F2E9' : '#F7F2E9',
          borderBottom: `3px solid ${tabsStuck ? '#111111' : 'transparent'}`,
          boxShadow: tabsStuck ? '0 4px 0 rgba(17,17,17,.08)' : 'none',
          transition: 'border-color .2s, box-shadow .2s',
          padding: '14px 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 20px',
                  fontFamily: 'Cairo',
                  fontWeight: 900,
                  fontSize: 16,
                  border: '3px solid #111111',
                  cursor: 'pointer',
                  background: isActive ? '#E31C23' : '#F7F2E9',
                  color: isActive ? '#F7F2E9' : '#111111',
                  boxShadow: isActive ? '4px 4px 0 #111111' : 'none',
                  transform: isActive ? 'skewX(-8deg) translateY(-3px)' : 'skewX(-8deg)',
                  transition: 'all .15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#FFB400';
                    e.currentTarget.style.boxShadow = '4px 4px 0 #111111';
                    e.currentTarget.style.transform = 'skewX(-8deg) translateY(-2px)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#F7F2E9';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'skewX(-8deg)';
                  }
                }}
              >
                <span style={{ display: 'inline-block', transform: 'skewX(8deg)', lineHeight: 1 }}>
                  <span style={{ marginLeft: 4 }}>{cat.emoji}</span>
                  {cat.label}
                  <span
                    style={{
                      marginRight: 6,
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 11,
                      fontWeight: 400,
                      opacity: 0.6,
                    }}
                  >
                    {' '}({countByCategory(cat.id)})
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── PRODUCT GRID ──────────────────────────────── */}
      <section
        style={{
          flex: 1,
          background: '#F7F2E9',
          padding: '48px 24px 72px',
          position: 'relative',
        }}
      >
        {/* Halftone */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(rgba(17,17,17,.055) 1px, transparent 1.2px)',
            backgroundSize: '14px 14px',
          }}
        />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Result count */}
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12,
              letterSpacing: 2,
              color: '#8A8580',
              textTransform: 'uppercase',
              marginBottom: 28,
              textAlign: 'center',
            }}
          >
            {filteredProducts.length} نتيجة
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 24,
              }}
              className="menu-grid"
            >
              {filteredProducts.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  colorIndex={i}
                  onClick={() => setSelectedProduct(p)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 0',
                fontFamily: 'Cairo',
                fontWeight: 700,
                fontSize: 22,
                color: '#8A8580',
              }}
            >
              لا توجد منتجات في هذا القسم حالياً.
            </div>
          )}
        </div>
      </section>

      <MarketingFooter />

      {/* ── PRODUCT MODAL ─────────────────────────────── */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
