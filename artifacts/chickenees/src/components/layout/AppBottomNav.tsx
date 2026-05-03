import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

/* ── SVG Icons ─────────────────────────────────────────── */
function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#E31C23' : '#8A8580'} strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
      <path d="M9 21V12h6v9"/>
    </svg>
  );
}
function MenuIcon({ active }: { active: boolean }) {
  const c = active ? '#E31C23' : '#8A8580';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="none">
      <rect x="3" y="5"   width="18" height="2.5" rx="1" fill={c}/>
      <rect x="3" y="10.8" width="14" height="2.5" rx="1" fill={c}/>
      <rect x="3" y="16.5" width="10" height="2.5" rx="1" fill={c}/>
    </svg>
  );
}
function CartSVG({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#E31C23' : '#8A8580'} strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  );
}
function StarIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24"
      fill={active ? '#E31C23' : 'none'}
      stroke={active ? '#E31C23' : '#8A8580'} strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}
function UserIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#E31C23' : '#8A8580'} strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

const tabs = [
  { href: '/app/home',    Icon: HomeIcon, label: 'الرئيسية', isCart: false },
  { href: '/app/menu',    Icon: MenuIcon, label: 'المنيو',    isCart: false },
  { href: '/app/cart',    Icon: CartSVG,  label: 'السلة',     isCart: true  },
  { href: '/app/rewards', Icon: StarIcon, label: 'نقاطي',    isCart: false },
  { href: '/app/profile', Icon: UserIcon, label: 'حسابي',    isCart: false },
];

export function AppBottomNav() {
  const [location] = useLocation();
  const { itemCount, bumpCount } = useCart();
  const [bumping, setBumping] = useState(false);
  const prevBump = useRef(bumpCount);

  useEffect(() => {
    if (bumpCount !== prevBump.current) {
      prevBump.current = bumpCount;
      setBumping(true);
      const t = setTimeout(() => setBumping(false), 450);
      return () => clearTimeout(t);
    }
  }, [bumpCount]);

  const activeIdx = tabs.findIndex(t => location.startsWith(t.href));

  return (
    <nav
      style={{
        background: '#F7F2E9',
        borderTop: '3px solid #111111',
        display: 'flex',
        flexShrink: 0,
        position: 'relative',
      }}
      dir="rtl"
    >
      {/* Sliding red top indicator */}
      {activeIdx >= 0 && (
        <motion.div
          layoutId="bottom-nav-indicator"
          style={{
            position: 'absolute',
            top: 0,
            height: 3,
            background: '#E31C23',
            width: `${100 / tabs.length}%`,
            right: `${(activeIdx / tabs.length) * 100}%`,
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        />
      )}

      {tabs.map((tab, i) => {
        const isActive = location.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 2px 8px',
              textDecoration: 'none',
              position: 'relative',
              gap: 3,
            }}
          >
            {/* Icon — with cart bump */}
            <div style={{ position: 'relative' }}>
              {tab.isCart ? (
                <motion.div
                  animate={bumping ? { scale: [1, 1.35, 0.9, 1.05, 1] } : { scale: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <tab.Icon active={isActive} />
                </motion.div>
              ) : (
                <tab.Icon active={isActive} />
              )}

              {/* Cart badge */}
              {tab.isCart && (
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.div
                      key="badge"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                      style={{
                        position: 'absolute',
                        top: -5,
                        right: -7,
                        minWidth: 16,
                        height: 16,
                        borderRadius: 8,
                        background: '#E31C23',
                        border: '2px solid #F7F2E9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'Anton',
                        fontSize: 8,
                        color: '#F7F2E9',
                        padding: '0 2px',
                        zIndex: 2,
                      }}
                    >
                      {itemCount > 9 ? '9+' : itemCount}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* Label */}
            <span
              style={{
                fontFamily: 'Cairo',
                fontWeight: isActive ? 900 : 700,
                fontSize: 10,
                lineHeight: 1,
                color: isActive ? '#E31C23' : '#8A8580',
                transition: 'color 0.2s',
              }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

/* Keep old default export alias for any existing imports */
export default AppBottomNav;
export { AppBottomNav as AppBottomNavLegacy };
