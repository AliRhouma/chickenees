import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  nameAr: string;
  price: number;
  badge?: string;
  descAr?: string;
  image?: string;
  category: string;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const badgeLabel = (badge?: string) => {
  if (!badge) return null;
  if (badge === 'hot') return { text: '🔥 HOT', bg: '#FFB400', color: '#111111' };
  if (badge === 'bestseller') return { text: 'الأكثر مبيعاً', bg: '#111111', color: '#F7F2E9' };
  if (badge === 'new') return { text: '✦ جديد', bg: '#E31C23', color: '#F7F2E9' };
  return null;
};

const categoryLabel: Record<string, string> = {
  chicken: 'دجاج',
  wraps: 'رابز',
  meals: 'وجبات',
  desserts: 'حلى',
  drinks: 'مشروبات',
};

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { toast } = useToast();

  // Lock body scroll while open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const badge = product ? badgeLabel(product.badge) : null;

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(17,17,17,0.72)',
              zIndex: 100,
              cursor: 'pointer',
            }}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 101,
              width: '92vw',
              maxWidth: 560,
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#F7F2E9',
              border: '3px solid #111111',
              boxShadow: '10px 10px 0 #E31C23',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Image */}
            {product.image && (
              <div
                style={{
                  position: 'relative',
                  height: 240,
                  flexShrink: 0,
                  borderBottom: '3px solid #111111',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={product.image}
                  alt={product.nameAr}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.18) saturate(1.25) sepia(0.18) brightness(0.92)',
                  }}
                />
                {/* Halftone overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(rgba(17,17,17,.5) 1px, transparent 1.2px)',
                    backgroundSize: '10px 10px',
                    opacity: 0.3,
                    pointerEvents: 'none',
                  }}
                />
                {/* Category chip */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 14,
                    right: 14,
                    background: '#111111',
                    color: '#FFB400',
                    fontFamily: 'Anton',
                    fontSize: 12,
                    letterSpacing: 2,
                    padding: '4px 12px',
                    border: '2px solid #111111',
                  }}
                >
                  {categoryLabel[product.category] ?? product.category}
                </div>
              </div>
            )}

            {/* Body */}
            <div style={{ padding: '28px 28px 32px', flex: 1 }}>
              {/* Badge */}
              {badge && (
                <div
                  style={{
                    display: 'inline-block',
                    background: badge.bg,
                    color: badge.color,
                    fontFamily: 'Cairo',
                    fontWeight: 900,
                    fontSize: 13,
                    padding: '3px 12px',
                    border: '2px solid #111111',
                    boxShadow: '3px 3px 0 #111111',
                    marginBottom: 14,
                    transform: 'skewX(-8deg)',
                  }}
                >
                  <span style={{ display: 'inline-block', transform: 'skewX(8deg)' }}>
                    {badge.text}
                  </span>
                </div>
              )}

              {/* Name + price row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 16,
                  gap: 12,
                }}
              >
                <h2
                  style={{
                    fontFamily: 'Cairo',
                    fontWeight: 900,
                    fontSize: 32,
                    lineHeight: 1.2,
                    flex: 1,
                  }}
                >
                  {product.nameAr}
                </h2>
                <div
                  style={{
                    fontFamily: 'Anton',
                    fontSize: 36,
                    color: '#E31C23',
                    letterSpacing: 1,
                    flexShrink: 0,
                    lineHeight: 1,
                  }}
                >
                  {product.price}
                  <span
                    style={{
                      fontFamily: 'Cairo',
                      fontWeight: 900,
                      fontSize: 16,
                      color: '#8A8580',
                      marginRight: 4,
                    }}
                  >
                    {' '}ر.س
                  </span>
                </div>
              </div>

              {/* Dashed divider */}
              <div
                style={{
                  borderTop: '2px dashed rgba(17,17,17,.2)',
                  marginBottom: 20,
                }}
              />

              {/* Description */}
              {product.descAr && (
                <p
                  style={{
                    fontFamily: 'Cairo',
                    fontWeight: 700,
                    fontSize: 17,
                    color: '#4A4540',
                    lineHeight: 1.8,
                    marginBottom: 28,
                  }}
                >
                  {product.descAr}
                </p>
              )}

              {/* CTA row */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <button
                  onClick={() => {
                    toast({
                      title: `✓ أُضيف للسلة`,
                      description: `${product.nameAr} — ${product.price} ر.س`,
                    });
                    onClose();
                  }}
                  style={{
                    flex: 1,
                    background: '#E31C23',
                    color: '#F7F2E9',
                    border: '3px solid #111111',
                    padding: '16px 24px',
                    fontFamily: 'Cairo',
                    fontWeight: 900,
                    fontSize: 18,
                    boxShadow: '5px 5px 0 #111111',
                    cursor: 'pointer',
                    transform: 'skewX(-8deg)',
                    transition: 'transform .15s, box-shadow .15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'skewX(-8deg) translate(-3px,-3px)';
                    e.currentTarget.style.boxShadow = '8px 8px 0 #111111';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'skewX(-8deg)';
                    e.currentTarget.style.boxShadow = '5px 5px 0 #111111';
                  }}
                >
                  <span style={{ display: 'inline-block', transform: 'skewX(8deg)' }}>
                    أضف للسلة ←
                  </span>
                </button>

                {/* Close */}
                <button
                  onClick={onClose}
                  style={{
                    width: 52,
                    height: 52,
                    flexShrink: 0,
                    background: '#111111',
                    color: '#F7F2E9',
                    border: '3px solid #111111',
                    fontFamily: 'Cairo',
                    fontWeight: 900,
                    fontSize: 20,
                    cursor: 'pointer',
                    boxShadow: '4px 4px 0 #E31C23',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform .15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
                  aria-label="إغلاق"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
