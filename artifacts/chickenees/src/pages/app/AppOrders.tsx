import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneFrame } from '../../components/layout/PhoneFrame';
import { AppBottomNav } from '../../components/layout/AppBottomNav';
import { AppBackButton } from '../../components/layout/AppBackButton';
import { useCart } from '../../context/CartContext';

/* ── Mock orders ────────────────────────────────────────── */
const ORDERS = [
  {
    id: '#2848', date: 'منذ لحظات', total: 60, status: 'قيد التوصيل', active: true,
    items: [{ name: 'كرنشي وينجز', qty: 1, price: 32 }, { name: 'ليمون نعناع', qty: 2, price: 14 }],
    address: 'المنزل 🏠 — حي الملقا، الرياض', payment: 'Apple Pay',
  },
  {
    id: '#2847', date: 'قبل يومين', total: 78, status: 'تم التوصيل', active: false,
    items: [{ name: 'دبل باكت', qty: 1, price: 56 }, { name: 'ليمون نعناع', qty: 1, price: 14 }, { name: 'حلى مجاني', qty: 1, price: 8 }],
    address: 'العمل 💼 — برج المملكة', payment: 'مدى',
  },
  {
    id: '#2812', date: 'قبل أسبوع', total: 45, status: 'تم التوصيل', active: false,
    items: [{ name: 'سوبر ستريس', qty: 2, price: 24 }],
    address: 'المنزل 🏠 — حي الملقا، الرياض', payment: 'كاش',
  },
  {
    id: '#2789', date: 'قبل أسبوعين', total: 124, status: 'تم التوصيل', active: false,
    items: [{ name: 'وجبة عيلة', qty: 1, price: 89 }, { name: 'كرنشي وينجز', qty: 1, price: 32 }],
    address: 'منزل الوالدة ❤️ — حي العليا', payment: 'Apple Pay',
  },
];

const productIds: Record<string, number> = {
  'دبل باكت': 1, 'سوبر ستريس': 2, 'كرنشي وينجز': 3,
  'سبايسي راب': 4, 'كلاسيك راب': 5, 'وجبة عيلة': 7,
  'ليمون نعناع': 14,
};

const statusColors: Record<string, { bg: string; color: string }> = {
  'تم التوصيل': { bg: '#4ADE80', color: '#111111' },
  'قيد التوصيل': { bg: '#E31C23', color: '#F7F2E9' },
  'جاري التحضير': { bg: '#FFB400', color: '#111111' },
  'ملغي': { bg: '#D0CAC0', color: '#111111' },
};

/* ── Order detail modal ─────────────────────────────────── */
function OrderModal({ order, onClose, onReorder }: {
  order: typeof ORDERS[0]; onClose: () => void; onReorder: () => void;
}) {
  const sc = statusColors[order.status] ?? { bg: '#D0CAC0', color: '#111111' };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute', inset: 0, zIndex: 200,
        background: 'rgba(17,17,17,.7)',
        backdropFilter: 'blur(3px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        padding: '0',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#F7F2E9', border: '3px solid #111111',
          borderBottom: 'none',
          boxShadow: '0 -6px 0 #E31C23',
          width: '100%', maxHeight: '88%',
          overflowY: 'auto', WebkitOverflowScrolling: 'touch',
          padding: '20px 18px 28px',
        }}
      >
        {/* Drag handle */}
        <div style={{ width: 40, height: 4, background: '#D0CAC0', borderRadius: 2, margin: '0 auto 18px' }} />

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 20, fontWeight: 700, color: '#111111', letterSpacing: 2 }}>
              {order.id}
            </div>
            <div style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 12, color: '#8A8580', marginTop: 2 }}>
              {order.date}
            </div>
          </div>
          <div style={{
            background: sc.bg, color: sc.color,
            fontFamily: 'Cairo', fontWeight: 900, fontSize: 12,
            padding: '5px 12px', border: '2px solid #111111',
            boxShadow: '2px 2px 0 rgba(0,0,0,.2)',
            transform: 'skewX(-6deg)',
          }}>
            <span style={{ display: 'inline-block', transform: 'skewX(6deg)' }}>{order.status}</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '2px dashed rgba(17,17,17,.15)', marginBottom: 16 }} />

        {/* Items */}
        <div style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 13, color: '#111111', marginBottom: 10, transform: 'skewX(-4deg)', display: 'inline-block' }}>
          الأصناف
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {order.items.map((item, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: '#FFFFFF', border: '2px solid #111111',
              padding: '10px 12px',
            }}>
              <span style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 14 }}>
                {item.name} <span style={{ color: '#8A8580', fontSize: 12 }}>× {item.qty}</span>
              </span>
              <span style={{ fontFamily: 'Anton', fontSize: 16, color: '#E31C23' }}>
                {item.price * item.qty} ر.س
              </span>
            </div>
          ))}
        </div>

        {/* Info rows */}
        {[
          { label: '📍 العنوان', value: order.address },
          { label: '💳 الدفع', value: order.payment },
        ].map(row => (
          <div key={row.label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 0', borderTop: '1px dashed rgba(17,17,17,.12)',
          }}>
            <span style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 13, color: '#8A8580' }}>{row.label}</span>
            <span style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 13, color: '#111111', textAlign: 'left', maxWidth: '55%' }}>{row.value}</span>
          </div>
        ))}

        {/* Total */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 0', borderTop: '2px solid #111111', marginTop: 4,
        }}>
          <span style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 17, color: '#111111' }}>الإجمالي</span>
          <span style={{ fontFamily: 'Anton', fontSize: 26, color: '#E31C23' }}>
            {order.total} <span style={{ fontFamily: 'Cairo', fontSize: 13, fontWeight: 700, color: '#8A8580' }}>ر.س</span>
          </span>
        </div>

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onReorder}
          style={{
            width: '100%', padding: '15px 0', marginTop: 16,
            background: '#E31C23', color: '#F7F2E9',
            border: '3px solid #111111', boxShadow: '4px 4px 0 #111111',
            fontFamily: 'Cairo', fontWeight: 900, fontSize: 17,
            cursor: 'pointer', transform: 'skewX(-3deg)',
          }}
        >
          <span style={{ display: 'inline-block', transform: 'skewX(3deg)' }}>
            إعادة الطلب ↺
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ── Order card ─────────────────────────────────────────── */
function OrderCard({ order, onClick, onReorder }: {
  order: typeof ORDERS[0]; onClick: () => void; onReorder: () => void;
}) {
  const sc = statusColors[order.status] ?? { bg: '#D0CAC0', color: '#111111' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, boxShadow: '6px 6px 0 #E31C23' }}
      style={{
        background: '#FFFFFF', border: '3px solid #111111',
        boxShadow: '4px 4px 0 #111111',
        overflow: 'hidden', cursor: 'pointer',
        transition: 'box-shadow 0.2s',
      }}
    >
      {/* Card header */}
      <div
        onClick={onClick}
        style={{
          background: order.active ? '#111111' : '#F7F2E9',
          borderBottom: '2px dashed rgba(17,17,17,.15)',
          padding: '10px 14px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
      >
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontWeight: 700,
          fontSize: 14, letterSpacing: 2,
          color: order.active ? '#FFB400' : '#111111',
        }}>
          {order.id}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 11, color: order.active ? 'rgba(247,242,233,.5)' : '#8A8580' }}>
            {order.date}
          </span>
          <div style={{
            background: sc.bg, color: sc.color,
            fontFamily: 'Cairo', fontWeight: 900, fontSize: 10,
            padding: '3px 8px', border: `1.5px solid ${order.active ? 'rgba(255,255,255,.2)' : '#111111'}`,
            transform: 'skewX(-6deg)',
          }}>
            <span style={{ display: 'inline-block', transform: 'skewX(6deg)' }}>{order.status}</span>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div onClick={onClick} style={{ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'Cairo', fontWeight: 900, fontSize: 14, color: '#111111',
            lineHeight: 1.4, marginBottom: 4,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {order.items.map(i => i.name).join(' + ')}
          </div>
          <div style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 12, color: '#8A8580' }}>
            {order.items.length} {order.items.length === 1 ? 'صنف' : 'أصناف'}
          </div>
        </div>
        <div style={{ textAlign: 'left', flexShrink: 0, paddingRight: 12 }}>
          <div style={{ fontFamily: 'Anton', fontSize: 22, color: '#E31C23', lineHeight: 1 }}>{order.total}</div>
          <div style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 11, color: '#8A8580' }}>ر.س</div>
        </div>
      </div>

      {/* Reorder button */}
      {!order.active && (
        <div style={{ padding: '0 14px 14px', borderTop: '1px solid rgba(17,17,17,.06)' }}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={e => { e.stopPropagation(); onReorder(); }}
            style={{
              width: '100%', padding: '10px 0',
              background: 'transparent', color: '#111111',
              border: '2px solid #111111',
              fontFamily: 'Cairo', fontWeight: 900, fontSize: 14,
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F7F2E9'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
          >
            إعادة الطلب ↺
          </motion.button>
        </div>
      )}
      {order.active && (
        <div style={{ padding: '0 14px 14px' }}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={e => { e.stopPropagation(); onClick(); }}
            style={{
              width: '100%', padding: '10px 0',
              background: '#E31C23', color: '#F7F2E9',
              border: '2px solid #111111',
              fontFamily: 'Cairo', fontWeight: 900, fontSize: 14,
              cursor: 'pointer', boxShadow: '2px 2px 0 #111111',
            }}
          >
            تتبع الطلب 🛵 ←
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function AppOrders() {
  const [tab, setTab] = useState<'active' | 'past'>('past');
  const [modalOrder, setModalOrder] = useState<typeof ORDERS[0] | null>(null);
  const { addToCart } = useCart();
  const [, setLocation] = useLocation();

  const activeOrders = ORDERS.filter(o => o.active);
  const pastOrdersList = ORDERS.filter(o => !o.active);
  const displayed = tab === 'active' ? activeOrders : pastOrdersList;

  const handleReorder = (order: typeof ORDERS[0]) => {
    order.items.forEach(item => {
      const pid = productIds[item.name];
      if (pid) for (let i = 0; i < item.qty; i++) addToCart(pid);
    });
    setModalOrder(null);
    setLocation('/app/cart');
  };

  return (
    <PhoneFrame bg="#F7F2E9">
      <div dir="rtl" style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F7F2E9', position: 'relative' }}>

        {/* Modal */}
        <AnimatePresence>
          {modalOrder && (
            <OrderModal
              order={modalOrder}
              onClose={() => setModalOrder(null)}
              onReorder={() => handleReorder(modalOrder)}
            />
          )}
        </AnimatePresence>

        {/* Header */}
        <div style={{
          background: '#111111', color: '#F7F2E9',
          borderBottom: '3px solid #111111', padding: '16px 18px 0',
          flexShrink: 0, position: 'relative', zIndex: 1,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,.09) 1px, transparent 1.2px)',
            backgroundSize: '14px 14px', pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h1 style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 22, transform: 'skewX(-4deg)', display: 'inline-block' }}>
              طلباتي
            </h1>
            <AppBackButton to="/app/home" theme="dark" />
          </div>

          {/* Tab switcher */}
          <div style={{ display: 'flex', position: 'relative', zIndex: 1 }}>
            {([['active', 'الحالية'], ['past', 'المكتملة']] as const).map(([id, label]) => {
              const isActive = tab === id;
              const hasActive = id === 'active' && activeOrders.length > 0;
              return (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  style={{
                    flex: 1, padding: '11px 0',
                    background: 'none', border: 'none',
                    borderBottom: `3px solid ${isActive ? '#E31C23' : 'transparent'}`,
                    fontFamily: 'Cairo', fontWeight: 900, fontSize: 15,
                    color: isActive ? '#F7F2E9' : 'rgba(247,242,233,.4)',
                    cursor: 'pointer', position: 'relative',
                    transition: 'color 0.15s, border-color 0.15s',
                  }}
                >
                  {label}
                  {hasActive && (
                    <span style={{
                      position: 'absolute', top: 8, right: 'calc(50% - 28px)',
                      width: 8, height: 8, borderRadius: '50%',
                      background: '#E31C23', border: '1.5px solid #111111',
                    }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable list */}
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '16px 16px 16px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: tab === 'active' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              {displayed.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🛵</div>
                  <div style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 18, color: '#111111', marginBottom: 6 }}>
                    {tab === 'active' ? 'ما عندك طلبات حالية' : 'ما عندك طلبات سابقة'}
                  </div>
                  <div style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 14, color: '#8A8580' }}>
                    اطلب الحين! 🍗
                  </div>
                </div>
              ) : (
                displayed.map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <OrderCard
                      order={order}
                      onClick={() => setModalOrder(order)}
                      onReorder={() => handleReorder(order)}
                    />
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <AppBottomNav />
      </div>
    </PhoneFrame>
  );
}
