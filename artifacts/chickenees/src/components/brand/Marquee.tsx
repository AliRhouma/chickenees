export const Marquee = () => (
  <div
    style={{
      overflow: 'hidden',
      transform: 'rotate(-2deg)',
      margin: '0 -40px',
      position: 'relative',
      zIndex: 10,
    }}
  >
    <div
      style={{
        background: '#111111',
        color: '#F7F2E9',
        padding: '20px 0',
        borderTop: '3px solid #111111',
        borderBottom: '3px solid #111111',
        overflow: 'hidden',
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          gap: '64px',
          whiteSpace: 'nowrap',
          fontFamily: 'Anton',
          fontSize: '44px',
          letterSpacing: '3px',
          alignItems: 'center',
        }}
      >
        <MarqueeContent />
        <MarqueeContent aria-hidden />
      </div>
    </div>
  </div>
);

const Dot = () => (
  <span
    style={{
      width: 12,
      height: 12,
      background: '#E31C23',
      borderRadius: '50%',
      display: 'inline-block',
      flexShrink: 0,
    }}
  />
);

const Star = () => (
  <span style={{ color: '#FFB400' }}>★</span>
);

function MarqueeContent({ 'aria-hidden': ariaHidden }: { 'aria-hidden'?: boolean }) {
  return (
    <span
      aria-hidden={ariaHidden}
      style={{ display: 'flex', gap: '64px', alignItems: 'center' }}
    >
      <span>كريسبي على مزاجك</span>
      <Dot />
      <span>CRUNCH MODE ON</span>
      <Star />
      <span>HOT &amp; CRISPY</span>
      <Dot />
      <span>تشيكنييز</span>
      <Star />
      <span>CRUNCH IS AN ART</span>
      <Dot />
      <span>القرمشة على أصولها</span>
      <Star />
    </span>
  );
}
