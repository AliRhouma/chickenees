import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

interface AppBackButtonProps {
  to: string;
  /** 'dark' = placed on black header (cream icon), 'light' = placed on cream bg (dark icon) */
  theme?: 'dark' | 'light';
}

/**
 * RTL-aware back button.
 * Arrow points → (right) because in Arabic layout "back" = returning toward the reading start.
 */
export function AppBackButton({ to, theme = 'dark' }: AppBackButtonProps) {
  const [, setLocation] = useLocation();

  const isDark = theme === 'dark';

  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={() => setLocation(to)}
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: isDark ? 'rgba(255,255,255,.12)' : 'rgba(17,17,17,.07)',
        border: `2px solid ${isDark ? 'rgba(255,255,255,.22)' : 'rgba(17,17,17,.18)'}`,
        color: isDark ? '#F7F2E9' : '#111111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: 0,
        flexShrink: 0,
        boxShadow: isDark ? '0 2px 8px rgba(0,0,0,.25)' : '2px 2px 0 rgba(17,17,17,.1)',
      }}
      aria-label="رجوع"
    >
      {/* Chevron-right for RTL back */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </motion.button>
  );
}
