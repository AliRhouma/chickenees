import { Children, cloneElement, isValidElement, ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
  bg?: string;
}

/* The phone chrome sits inside a 100dvh viewport with 24px top+bottom padding
   (48px total). The chrome itself is capped at 844px. Notch + home-bar each
   take 28px (56px total). So the usable content height is:
     min(100dvh - 48px,  844px) - 56px  =  min(100dvh - 104px,  788px)

   We compute this once here and pass it as a concrete CSS string to both the
   phone-content wrapper AND the injected page-div style, removing any need
   for percentage or flex-grow height cascading.                              */
const CONTENT_H = 'min(calc(100dvh - 104px), 788px)';
const CHROME_H  = 'min(calc(100dvh - 48px),  844px)';

export function PhoneFrame({ children, bg = '#F7F2E9' }: PhoneFrameProps) {
  /* Inject a concrete height + display:flex into every child page-div so its
     own internal flex column (scrollable-area + bottom-nav) always resolves
     correctly — no relative percentage ambiguity.                            */
  const filledChildren = Children.map(children, child => {
    if (!isValidElement(child)) return child;
    const el = child as React.ReactElement<{ style?: React.CSSProperties }>;
    return cloneElement(el, {
      style: {
        ...el.props.style,
        /* Explicit sizing — overrides any position/height set by the page  */
        position: 'relative' as const,
        width: '100%',
        height: CONTENT_H,
        flexShrink: 0,
        overflow: 'hidden',
      },
    });
  });

  return (
    <div
      className="phone-frame-outer"
      style={{
        height: '100dvh',
        background: '#E8E2D8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        boxSizing: 'border-box',
      }}
    >
      <div
        className="phone-frame-inner"
        style={{
          width: '100%',
          maxWidth: 430,
          height: CHROME_H,
          background: bg,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,.28), 0 0 0 1px rgba(0,0,0,.1)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Notch ─────────────────────────────────────────── */}
        <div
          className="phone-notch"
          style={{
            flexShrink: 0,
            height: 28,
            background: '#111111',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            position: 'relative',
          }}
        >
          <div style={{ width: 80, height: 12, background: '#222222', borderRadius: 8, border: '1.5px solid #333' }} />
          <div style={{ position: 'absolute', left: 14, fontFamily: 'Anton', fontSize: 10, letterSpacing: 1, color: '#F7F2E9' }}>
            9:41
          </div>
          <div style={{ position: 'absolute', right: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
            {[3, 5, 7, 9].map(h => (
              <div key={h} style={{ width: 3, height: h, background: '#F7F2E9', borderRadius: 1 }} />
            ))}
            <div style={{ width: 14, height: 7, borderRadius: 2, border: '1.5px solid #F7F2E9', marginLeft: 4, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 1, left: 1, right: 1, bottom: 1, background: '#F7F2E9', borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* ── Page content — explicit height, no percentage magic ── */}
        <div
          className="phone-content"
          style={{
            flexShrink: 0,
            height: CONTENT_H,
            background: bg,
            overflow: 'hidden',
          }}
        >
          {filledChildren}
        </div>

        {/* ── Home indicator ────────────────────────────────── */}
        <div
          className="phone-home-bar"
          style={{
            flexShrink: 0,
            height: 28,
            background: bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: '1px solid rgba(17,17,17,.08)',
            zIndex: 20,
          }}
        >
          <div style={{ width: 120, height: 5, background: '#111111', borderRadius: 3, opacity: 0.3 }} />
        </div>
      </div>
    </div>
  );
}
