import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { RoosterSVG } from '../../components/brand/RoosterSVG';
import { PhoneFrame } from '../../components/layout/PhoneFrame';

/* ── OTP single box ──────────────────────────────────────── */
interface OtpBoxProps {
  value: string;
  onValueChange: (v: string) => void;
  onBackspace: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  autoFocus?: boolean;
}

function OtpBox({ value, onValueChange, onBackspace, inputRef, autoFocus }: OtpBoxProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      {/* Box */}
      <motion.div
        animate={{
          boxShadow: focused
            ? '0 0 0 3px #FFB400, 4px 4px 0 #111111'
            : value
              ? '4px 4px 0 #E31C23'
              : '4px 4px 0 #111111',
          borderColor: focused ? '#FFB400' : '#111111',
        }}
        transition={{ duration: 0.15 }}
        style={{
          width: 64,
          height: 72,
          border: '3px solid #111111',
          background: value ? '#111111' : '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'text',
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Fill animation when digit typed */}
        <AnimatePresence>
          {value && (
            <motion.div
              key="fill"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.2, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              style={{
                fontFamily: 'Anton',
                fontSize: 36,
                color: '#FFB400',
                userSelect: 'none',
                lineHeight: 1,
              }}
            >
              {value}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cursor blink when focused + empty */}
        {focused && !value && (
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
            style={{
              width: 2,
              height: 28,
              background: '#FFB400',
              borderRadius: 1,
            }}
          />
        )}
      </motion.div>

      {/* Hidden real input */}
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="number"
        inputMode="numeric"
        maxLength={1}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => {
          const digit = e.target.value.replace(/\D/g, '').slice(-1);
          onValueChange(digit);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Backspace' && !value) onBackspace();
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          cursor: 'text',
          fontSize: 1,
        }}
      />
    </div>
  );
}

/* ── Phone step ──────────────────────────────────────────── */
function PhoneStep({ onSend }: { onSend: (phone: string) => void }) {
  const [phone, setPhone] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 9) onSend(phone);
  };

  return (
    <motion.div
      key="phone"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ padding: '28px 24px 32px' }}
    >
      {/* Header */}
      <div style={{ marginBottom: 36, textAlign: 'right' }}>
        <div
          style={{
            fontFamily: 'Anton',
            fontSize: 11,
            letterSpacing: 3,
            color: '#8A8580',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          STEP 01 / 02
        </div>
        <h2
          style={{
            fontFamily: 'Cairo',
            fontWeight: 900,
            fontSize: 30,
            color: '#111111',
            lineHeight: 1.2,
            transform: 'skewX(-4deg)',
            display: 'inline-block',
            marginBottom: 8,
          }}
        >
          أدخل رقم جوالك
        </h2>
        <p
          style={{
            fontFamily: 'Cairo',
            fontWeight: 700,
            fontSize: 15,
            color: '#8A8580',
            lineHeight: 1.6,
          }}
        >
          راح نرسل لك رمز تحقق لمرة واحدة
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Phone input row */}
        <div
          style={{
            display: 'flex',
            gap: 0,
            marginBottom: 28,
            direction: 'ltr',
          }}
        >
          {/* Country code block */}
          <motion.div
            style={{
              border: '3px solid #111111',
              borderRight: 'none',
              background: '#111111',
              color: '#F7F2E9',
              fontFamily: 'Anton',
              fontSize: 18,
              padding: '0 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              flexShrink: 0,
              boxShadow: focused ? '5px 5px 0 #FFB400' : '5px 5px 0 #111111',
              transition: 'box-shadow 0.2s',
            }}
          >
            <span style={{ fontSize: 18 }}>🇸🇦</span>
            <span>+966</span>
          </motion.div>

          {/* Number input */}
          <motion.div
            animate={{
              boxShadow: focused ? '5px 5px 0 #FFB400' : '5px 5px 0 #111111',
            }}
            style={{ flex: 1, position: 'relative' }}
          >
            <input
              ref={inputRef}
              type="tel"
              inputMode="numeric"
              placeholder="5X XXX XXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                width: '100%',
                height: '100%',
                minHeight: 56,
                border: '3px solid #111111',
                background: '#FFFFFF',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 20,
                letterSpacing: 2,
                padding: '0 14px',
                outline: 'none',
                color: '#111111',
              }}
            />
          </motion.div>
        </div>

        {/* Keyboard hint — subtle */}
        <AnimatePresence>
          {focused && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{
                marginBottom: 20,
                display: 'flex',
                gap: 6,
                justifyContent: 'center',
              }}
            >
              {['1','2','3','4','5','6','7','8','9','0'].map((k) => (
                <div
                  key={k}
                  style={{
                    width: 26,
                    height: 30,
                    background: '#F0EBE3',
                    border: '1.5px solid #CCC8C0',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 11,
                    color: '#111111',
                    boxShadow: '0 2px 0 #C5C0B8',
                  }}
                >
                  {k}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Send button */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.96 }}
          disabled={phone.length < 9}
          style={{
            width: '100%',
            padding: '16px 0',
            background: phone.length >= 9 ? '#E31C23' : '#CCC8C0',
            color: '#F7F2E9',
            border: '3px solid #111111',
            fontFamily: 'Cairo',
            fontWeight: 900,
            fontSize: 20,
            cursor: phone.length >= 9 ? 'pointer' : 'not-allowed',
            boxShadow: phone.length >= 9 ? '5px 5px 0 #111111' : 'none',
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
        >
          إرسال رمز التحقق ←
        </motion.button>
      </form>
    </motion.div>
  );
}

/* ── OTP step ────────────────────────────────────────────── */
function OtpStep({ phone, onBack }: { phone: string; onBack: () => void }) {
  const [, setLocation] = useLocation();
  const [digits, setDigits] = useState(['', '', '', '']);
  const [success, setSuccess] = useState(false);
  const refs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const setDigit = (i: number, val: string) => {
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 3) {
      setTimeout(() => refs[i + 1].current?.focus(), 30);
    }
  };

  const handleBackspace = (i: number) => {
    if (i > 0) {
      setTimeout(() => refs[i - 1].current?.focus(), 30);
    }
  };

  useEffect(() => {
    if (digits.every((d) => d !== '')) {
      setSuccess(true);
      setTimeout(() => setLocation('/app/home'), 600);
    }
  }, [digits, setLocation]);

  return (
    <motion.div
      key="otp"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ padding: '28px 24px 32px' }}
    >
      {/* Back */}
      <button
        onClick={onBack}
        style={{
          fontFamily: 'Cairo',
          fontWeight: 700,
          fontSize: 14,
          color: '#8A8580',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        → رجوع
      </button>

      {/* Header */}
      <div style={{ marginBottom: 36, textAlign: 'right' }}>
        <div
          style={{
            fontFamily: 'Anton',
            fontSize: 11,
            letterSpacing: 3,
            color: '#8A8580',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          STEP 02 / 02
        </div>
        <h2
          style={{
            fontFamily: 'Cairo',
            fontWeight: 900,
            fontSize: 28,
            color: '#111111',
            lineHeight: 1.2,
            transform: 'skewX(-4deg)',
            display: 'inline-block',
            marginBottom: 8,
          }}
        >
          رمز التحقق
        </h2>
        <p
          style={{
            fontFamily: 'Cairo',
            fontWeight: 700,
            fontSize: 14,
            color: '#8A8580',
            lineHeight: 1.6,
          }}
        >
          أرسلنا رمزاً لـ +966 {phone}
        </p>
      </div>

      {/* OTP boxes */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          marginBottom: 36,
          direction: 'ltr',
        }}
      >
        {digits.map((d, i) => (
          <OtpBox
            key={i}
            value={d}
            onValueChange={(v) => setDigit(i, v)}
            onBackspace={() => handleBackspace(i)}
            inputRef={refs[i]}
            autoFocus={i === 0}
          />
        ))}
      </div>

      {/* Hint */}
      <p
        style={{
          textAlign: 'center',
          fontFamily: 'Cairo',
          fontWeight: 700,
          fontSize: 14,
          color: '#8A8580',
          marginBottom: 28,
        }}
      >
        أدخل أي ٤ أرقام للمتابعة
      </p>

      {/* Progress bar / success indicator */}
      <div
        style={{
          height: 6,
          background: '#EDE8E0',
          border: '2px solid #111111',
          overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{ width: `${(digits.filter(Boolean).length / 4) * 100}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          style={{
            height: '100%',
            background: success ? '#4ADE80' : '#E31C23',
          }}
        />
      </div>

      {/* Success flash */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontFamily: 'Cairo',
              fontWeight: 900,
              fontSize: 18,
              color: '#4ADE80',
            }}
          >
            ✓ تم التحقق! جاري التوجيه...
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resend */}
      <div style={{ textAlign: 'center', marginTop: 28 }}>
        <button
          style={{
            fontFamily: 'Cairo',
            fontWeight: 700,
            fontSize: 14,
            color: '#8A8580',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          لم تستلم الرمز؟ إعادة إرسال
        </button>
      </div>
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function AppLogin() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');

  const handleSend = (p: string) => {
    setPhone(p);
    setStep('otp');
  };

  return (
    <PhoneFrame bg="#F7F2E9">
      <div dir="rtl" style={{ minHeight: '100%', background: '#F7F2E9', position: 'relative', overflow: 'hidden' }}>
        {/* Halftone */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(17,17,17,.065) 1px, transparent 1.2px)',
            backgroundSize: '14px 14px',
            pointerEvents: 'none',
          }}
        />

        {/* Top mascot bar */}
        <div
          style={{
            background: '#111111',
            borderBottom: '3px solid #111111',
            padding: '20px 24px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            position: 'relative',
          }}
        >
          <div style={{ width: 48, height: 48, flexShrink: 0 }}>
            <RoosterSVG className="w-full h-full" />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'Cairo',
                fontWeight: 900,
                fontSize: 22,
                color: '#F7F2E9',
                transform: 'skewX(-4deg)',
                display: 'inline-block',
              }}
            >
              تشيكنييز
            </div>
            <div
              style={{
                fontFamily: 'Cairo',
                fontWeight: 700,
                fontSize: 13,
                color: '#8A8580',
              }}
            >
              سجل دخولك واطلب الآن
            </div>
          </div>

          {/* Step dots */}
          <div style={{ marginRight: 'auto', display: 'flex', gap: 6 }}>
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  width: i === (step === 'phone' ? 0 : 1) ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === (step === 'phone' ? 0 : 1) ? '#FFB400' : 'rgba(255,255,255,.2)',
                  transition: 'width 0.3s, background 0.3s',
                }}
              />
            ))}
          </div>
        </div>

        {/* Step content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <AnimatePresence mode="wait">
            {step === 'phone' ? (
              <PhoneStep key="phone" onSend={handleSend} />
            ) : (
              <OtpStep key="otp" phone={phone} onBack={() => setStep('phone')} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </PhoneFrame>
  );
}
