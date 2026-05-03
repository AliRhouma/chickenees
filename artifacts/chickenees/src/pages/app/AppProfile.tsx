import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneFrame } from '../../components/layout/PhoneFrame';
import { AppBottomNav } from '../../components/layout/AppBottomNav';
import { AppBackButton } from '../../components/layout/AppBackButton';
import { user } from '../../data/user';
import { addresses } from '../../data/addresses';

/* ── Settings row component ─────────────────────────────── */
function SettingsRow({
  icon, label, right, onClick, danger = false,
}: {
  icon: string; label: string; right?: React.ReactNode; onClick?: () => void; danger?: boolean;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        background: '#FFFFFF', border: '2.5px solid #111111',
        padding: '14px 14px', boxShadow: '3px 3px 0 #111111',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.1s, box-shadow 0.1s',
      }}
      onMouseEnter={e => {
        if (onClick) {
          (e.currentTarget as HTMLDivElement).style.transform = 'translate(-1px,-1px)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '4px 4px 0 ' + (danger ? '#E31C23' : '#111111');
        }
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = '';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '3px 3px 0 #111111';
      }}
    >
      <span style={{ fontSize: 20, flexShrink: 0, width: 24, textAlign: 'center' }}>{icon}</span>
      <span style={{
        fontFamily: 'Cairo', fontWeight: 900, fontSize: 15,
        color: danger ? '#E31C23' : '#111111', flex: 1,
      }}>
        {label}
      </span>
      {right ?? (
        onClick && !danger && (
          <span style={{ color: '#8A8580', fontSize: 14 }}>←</span>
        )
      )}
    </motion.div>
  );
}

/* ── Custom toggle ──────────────────────────────────────── */
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <motion.div
      onClick={() => onChange(!on)}
      style={{
        width: 44, height: 24, borderRadius: 12,
        background: on ? '#E31C23' : '#D0CAC0',
        border: '2px solid #111111',
        position: 'relative', cursor: 'pointer',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <motion.div
        animate={{ x: on ? 20 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          position: 'absolute', top: 2, right: 2,
          width: 16, height: 16, borderRadius: '50%',
          background: '#F7F2E9', border: '1.5px solid rgba(0,0,0,.15)',
        }}
      />
    </motion.div>
  );
}

/* ── Logout confirm modal ───────────────────────────────── */
function LogoutModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute', inset: 0, zIndex: 200,
        background: 'rgba(17,17,17,.7)', backdropFilter: 'blur(3px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        style={{
          background: '#F7F2E9', border: '4px solid #111111',
          boxShadow: '6px 6px 0 #E31C23',
          padding: '26px 22px', textAlign: 'center', width: '100%',
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 12 }}>👋</div>
        <h3 style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 20, color: '#111111', marginBottom: 8, transform: 'skewX(-4deg)', display: 'inline-block' }}>
          تسجيل الخروج؟
        </h3>
        <p style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 14, color: '#6A6560', marginBottom: 22 }}>
          هل أنت متأكد أنك تريد تسجيل الخروج؟
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <motion.button whileTap={{ scale: 0.95 }} onClick={onCancel} style={{
            flex: 1, padding: '12px 0',
            background: '#FFFFFF', color: '#111111',
            border: '2.5px solid #111111', fontFamily: 'Cairo', fontWeight: 900, fontSize: 15,
            cursor: 'pointer',
          }}>
            إلغاء
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={onConfirm} style={{
            flex: 1, padding: '12px 0',
            background: '#E31C23', color: '#F7F2E9',
            border: '2.5px solid #111111', fontFamily: 'Cairo', fontWeight: 900, fontSize: 15,
            cursor: 'pointer', boxShadow: '3px 3px 0 #111111',
          }}>
            خروج
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Addresses sheet ────────────────────────────────────── */
function AddressSheet({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute', inset: 0, zIndex: 200,
        background: 'rgba(17,17,17,.7)', backdropFilter: 'blur(3px)',
        display: 'flex', alignItems: 'flex-end',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#F7F2E9', border: '3px solid #111111', borderBottom: 'none',
          boxShadow: '0 -5px 0 #E31C23', width: '100%', padding: '20px 18px 28px',
        }}
      >
        <div style={{ width: 40, height: 4, background: '#D0CAC0', borderRadius: 2, margin: '0 auto 18px' }} />
        <h3 style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 18, color: '#111111', marginBottom: 14, transform: 'skewX(-4deg)', display: 'inline-block' }}>
          عناويني المحفوظة
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {addresses.map(addr => (
            <div key={addr.id} style={{
              background: '#FFFFFF', border: '2.5px solid #111111',
              padding: '12px 14px', boxShadow: '3px 3px 0 #111111',
              display: 'flex', alignItems: 'flex-start', gap: 12,
            }}>
              <span style={{ fontSize: 20 }}>{addr.label.split(' ')[1] ?? '📍'}</span>
              <div>
                <div style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 14, color: '#111111' }}>{addr.label}</div>
                <div style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 12, color: '#8A8580', marginTop: 2 }}>{addr.detail}</div>
              </div>
            </div>
          ))}
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={onClose} style={{
          width: '100%', padding: '13px 0', marginTop: 18,
          background: '#111111', color: '#F7F2E9',
          border: '2.5px solid #111111', fontFamily: 'Cairo', fontWeight: 900, fontSize: 15,
          cursor: 'pointer',
        }}>
          إغلاق
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function AppProfile() {
  const [, setLocation] = useLocation();
  const [notifOn, setNotifOn] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);

  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <PhoneFrame bg="#F7F2E9">
      <div dir="rtl" style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F7F2E9', position: 'relative' }}>

        {/* Modals */}
        <AnimatePresence>
          {showLogout && (
            <LogoutModal
              onConfirm={() => { setShowLogout(false); setLocation('/app/login'); }}
              onCancel={() => setShowLogout(false)}
            />
          )}
          {showAddresses && <AddressSheet onClose={() => setShowAddresses(false)} />}
        </AnimatePresence>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>

          {/* ── Profile hero ─────────────────────────── */}
          <div style={{
            background: '#111111', borderBottom: '3px solid #111111',
            padding: '20px 20px 28px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(rgba(255,255,255,.09) 1px, transparent 1.2px)',
              backgroundSize: '14px 14px', pointerEvents: 'none',
            }} />
            {/* Back button row */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
              <AppBackButton to="/app/home" theme="dark" />
            </div>

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>

              {/* Avatar */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  width: 88, height: 88, borderRadius: '50%',
                  background: '#FFB400', border: '4px solid #111111',
                  boxShadow: '5px 5px 0 #E31C23',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <span style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 32, color: '#111111', lineHeight: 1, paddingTop: 4 }}>
                  {initials}
                </span>
              </motion.div>

              {/* Name + phone */}
              <div style={{ textAlign: 'center' }}>
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 22, color: '#F7F2E9', transform: 'skewX(-3deg)', display: 'inline-block' }}
                >
                  {user.name}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'rgba(247,242,233,.5)', marginTop: 4, direction: 'ltr' }}
                >
                  {user.phone}
                </motion.div>
              </div>

              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
                style={{ display: 'flex', gap: 8 }}
              >
                {[
                  { label: `🥈 ${user.tier}`, bg: '#FFFFFF', color: '#111111' },
                  { label: `عضو منذ ${user.memberSince}`, bg: 'rgba(255,255,255,.08)', color: 'rgba(247,242,233,.7)' },
                ].map(b => (
                  <div key={b.label} style={{
                    background: b.bg, color: b.color,
                    fontFamily: 'Cairo', fontWeight: 900, fontSize: 11,
                    padding: '5px 10px', border: '2px solid rgba(255,255,255,.15)',
                    transform: 'skewX(-5deg)',
                  }}>
                    <span style={{ display: 'inline-block', transform: 'skewX(5deg)' }}>{b.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div style={{ padding: '18px 16px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* ── Points wallet card ───────────────────── */}
            <Link href="/app/rewards">
              <motion.div
                whileHover={{ y: -2, boxShadow: '7px 7px 0 #111111' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: '#E31C23', border: '3px solid #111111',
                  boxShadow: '5px 5px 0 #111111', padding: '16px 18px',
                  cursor: 'pointer', position: 'relative', overflow: 'hidden',
                  transition: 'box-shadow 0.15s',
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'radial-gradient(rgba(255,255,255,.10) 1px, transparent 1.2px)',
                  backgroundSize: '10px 10px', pointerEvents: 'none',
                }} />
                {/* POINTS sticker */}
                <div style={{
                  position: 'absolute', top: 10, left: 14,
                  background: '#FFB400', color: '#111111',
                  fontFamily: 'Anton', fontSize: 8, letterSpacing: 2,
                  padding: '2px 6px', border: '1.5px solid #111111',
                  transform: 'rotate(-3deg)',
                }}>
                  LOYALTY
                </div>
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 14, color: 'rgba(247,242,233,.8)', marginBottom: 2 }}>
                      محفظة النقاط
                    </div>
                    <div style={{ fontFamily: 'Anton', fontSize: 40, color: '#F7F2E9', lineHeight: 1 }}>
                      {user.points}
                      <span style={{ fontFamily: 'Cairo', fontSize: 16, fontWeight: 700 }}> نقطة</span>
                    </div>
                    <div style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 12, color: 'rgba(247,242,233,.6)', marginTop: 3 }}>
                      🥈 فضي · {user.pointsToNext} للذهبي
                    </div>
                  </div>
                  <div style={{
                    background: '#111111', color: '#FFB400',
                    fontFamily: 'Anton', fontSize: 11, letterSpacing: 1,
                    padding: '8px 14px', border: '2px solid rgba(255,255,255,.15)',
                    boxShadow: '3px 3px 0 rgba(0,0,0,.3)', transform: 'skewX(-6deg)',
                  }}>
                    <span style={{ display: 'inline-block', transform: 'skewX(6deg)' }}>استبدل ←</span>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* ── Settings group label ─────────────────── */}
            <div>
              <div style={{ fontFamily: 'Anton', fontSize: 10, letterSpacing: 3, color: '#8A8580', textTransform: 'uppercase', marginBottom: 10 }}>
                الحساب
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <SettingsRow icon="📍" label="عناويني" onClick={() => setShowAddresses(true)}
                  right={
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 12, color: '#8A8580' }}>{addresses.length} عناوين</span>
                      <span style={{ color: '#8A8580', fontSize: 14 }}>←</span>
                    </div>
                  }
                />
                <SettingsRow icon="💳" label="طرق الدفع" onClick={() => {}}
                  right={
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 12, color: '#8A8580' }}>Apple Pay</span>
                      <span style={{ color: '#8A8580', fontSize: 14 }}>←</span>
                    </div>
                  }
                />
              </div>
            </div>

            {/* ── Preferences group ────────────────────── */}
            <div>
              <div style={{ fontFamily: 'Anton', fontSize: 10, letterSpacing: 3, color: '#8A8580', textTransform: 'uppercase', marginBottom: 10 }}>
                التفضيلات
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <SettingsRow
                  icon="🔔"
                  label="الإشعارات"
                  right={<Toggle on={notifOn} onChange={setNotifOn} />}
                />
                <SettingsRow
                  icon="🌐"
                  label="اللغة"
                  right={<span style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 13, color: '#8A8580' }}>العربية</span>}
                />
              </div>
            </div>

            {/* ── App group ────────────────────────────── */}
            <div>
              <div style={{ fontFamily: 'Anton', fontSize: 10, letterSpacing: 3, color: '#8A8580', textTransform: 'uppercase', marginBottom: 10 }}>
                التطبيق
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <SettingsRow icon="ℹ️" label="عن التطبيق" onClick={() => {}}
                  right={
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#8A8580', letterSpacing: 1 }}>v1.0.0</span>
                      <span style={{ color: '#8A8580', fontSize: 14 }}>←</span>
                    </div>
                  }
                />
                <SettingsRow icon="🚪" label="تسجيل الخروج" onClick={() => setShowLogout(true)} danger />
              </div>
            </div>

            {/* ── App version footer ───────────────────── */}
            <div style={{ textAlign: 'center', paddingTop: 8 }}>
              <div style={{
                fontFamily: 'Anton', fontSize: 11, letterSpacing: 3, color: '#D0CAC0',
                textTransform: 'uppercase',
              }}>
                v1.0.0 · تشيكنييز
              </div>
              <div style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 11, color: '#D0CAC0', marginTop: 4 }}>
                جميع الحقوق محفوظة © 2026
              </div>
            </div>

          </div>
        </div>

        <AppBottomNav />
      </div>
    </PhoneFrame>
  );
}
