import { Link } from 'wouter';
import { MarketingNav } from '../../components/layout/MarketingNav';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { Marquee } from '../../components/brand/Marquee';
import { BrandButton } from '../../components/brand/BrandButton';
import { ProductCard } from '../../components/brand/ProductCard';
import { RoosterSVG } from '../../components/brand/RoosterSVG';
import { products } from '../../data/products';

const featured = products.slice(0, 3);

const voiceCards = [
  {
    bg: '#F7F2E9',
    color: '#111111',
    shadow: '8px 8px 0 #E31C23',
    label: '100% FRESH',
    title: 'دجاج طازج، ما يمزح',
    body: 'كل يوم الصبح نستلم دجاج طازج مباشرة. ما نلمس المجمد — مبدأ مو برومو.',
    rotate: '-1deg',
  },
  {
    bg: '#FFB400',
    color: '#111111',
    shadow: '8px 8px 0 #111111',
    label: 'SECRET RECIPE',
    title: 'قرمشة خيالية',
    body: 'خلطتنا السرية محمية أكثر من الخزينة. النتيجة؟ طبقة كرانشي ما تصدق.',
    rotate: '1.5deg',
    lift: true,
  },
  {
    bg: '#E31C23',
    color: '#F7F2E9',
    shadow: '8px 8px 0 #111111',
    label: 'WILD SAUCES',
    title: 'صوصات تجنن',
    body: 'سبعة صوصات. من الكلاسيك الهادي للمولع نار. كل لقمة لها شخصيتها.',
    rotate: '-0.5deg',
  },
];

export default function Homepage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F7F2E9' }}>
      <MarketingNav />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: '#F7F2E9',
          borderBottom: '3px solid #111111',
          minHeight: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Halftone bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(17,17,17,.07) 1px, transparent 1.2px)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* Decorative ink blobs */}
        <div
          className="absolute"
          style={{
            top: '-80px', left: '-80px',
            width: 340, height: 340,
            background: '#111111',
            borderRadius: '50%',
            opacity: 0.04,
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: '-60px', right: '-60px',
            width: 260, height: 260,
            background: '#E31C23',
            borderRadius: '50%',
            opacity: 0.06,
          }}
        />

        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-6"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Text col (RTL: renders on right) */}
          <div style={{ paddingBlock: '52px 44px' }}>
            {/* Eyebrow tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#FFB400',
                border: '2px solid #111111',
                padding: '4px 14px',
                fontFamily: 'Anton',
                fontSize: 14,
                letterSpacing: 2,
                boxShadow: '3px 3px 0 #111111',
                marginBottom: 28,
                transform: 'skewX(-8deg)',
              }}
            >
              <span style={{ transform: 'skewX(8deg)' }}>★ CRUNCH MODE ON ★</span>
            </div>

            {/* Main headline */}
            <h1
              style={{
                fontFamily: 'Cairo',
                fontWeight: 900,
                fontSize: 'clamp(56px, 7vw, 96px)',
                lineHeight: 1.05,
                color: '#111111',
                marginBottom: 12,
                transform: 'skewX(-4deg)',
              }}
            >
              كريسبي
            </h1>
            <h1
              style={{
                fontFamily: 'Cairo',
                fontWeight: 900,
                fontSize: 'clamp(56px, 7vw, 96px)',
                lineHeight: 1.05,
                color: '#111111',
                marginBottom: 32,
                display: 'inline-block',
                position: 'relative',
                transform: 'skewX(-4deg)',
              }}
            >
              على مزاجك
              {/* Yellow underline */}
              <span
                style={{
                  position: 'absolute',
                  right: 0, left: 0, bottom: -10,
                  height: 12,
                  background: '#FFB400',
                  transform: 'skewX(-10deg)',
                  zIndex: -1,
                }}
              />
            </h1>

            {/* Tagline */}
            <p
              style={{
                fontFamily: 'Cairo',
                fontWeight: 700,
                fontSize: 20,
                color: '#8A8580',
                maxWidth: 440,
                lineHeight: 1.7,
                marginBottom: 44,
                marginTop: 20,
              }}
            >
              أقوى دجاج مقلي في المنطقة. وصفة سرية، قرمشة ما تمزح، وطعم يخليك ترجع كل يوم.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <Link href="/app">
                <BrandButton
                  variant="red"
                  className="btn-wobble"
                  style={{ fontSize: 18, padding: '18px 36px' }}
                >
                  اطلب الآن ←
                </BrandButton>
              </Link>
              <Link href="/menu">
                <BrandButton
                  variant="ghost"
                  className="btn-wobble"
                  style={{ fontSize: 18, padding: '18px 36px' }}
                >
                  شاهد القائمة
                </BrandButton>
              </Link>
            </div>

            {/* Social proof strip */}
            <div
              style={{
                marginTop: 48,
                display: 'flex',
                gap: 32,
                alignItems: 'center',
                borderTop: '2px dashed rgba(17,17,17,.2)',
                paddingTop: 28,
              }}
            >
              {[
                { num: '+50K', label: 'طلب شهرياً' },
                { num: '4.9★', label: 'تقييم العملاء' },
                { num: '3', label: 'فروع نشطة' },
              ].map(s => (
                <div key={s.num}>
                  <div
                    style={{
                      fontFamily: 'Anton',
                      fontSize: 28,
                      color: '#E31C23',
                      letterSpacing: 1,
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Cairo',
                      fontWeight: 700,
                      fontSize: 13,
                      color: '#8A8580',
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mascot col (RTL: renders on left) */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBlock: '52px',
            }}
          >
            <div style={{ position: 'relative', width: 380, height: 380 }}>
              {/* Ink circle backdrop */}
              <div
                style={{
                  position: 'absolute',
                  inset: '5%',
                  background: '#111111',
                  borderRadius: '50%',
                  boxShadow: '14px 14px 0 #E31C23',
                  backgroundImage:
                    'radial-gradient(rgba(255,255,255,.13) 1px, transparent 1.2px)',
                  backgroundSize: '14px 14px',
                }}
              />
              {/* Yellow ring accent */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '50%',
                  border: '4px dashed #FFB400',
                  opacity: 0.5,
                }}
              />
              {/* Rooster — bounce in, then float */}
              <div
                className="mascot-bounce mascot-float"
                style={{ position: 'absolute', inset: 0 }}
              >
                <RoosterSVG className="w-full h-full" />
              </div>

              {/* HOT sticker */}
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  background: '#E31C23',
                  color: '#F7F2E9',
                  fontFamily: 'Anton',
                  fontSize: 13,
                  letterSpacing: 2,
                  padding: '6px 12px',
                  border: '2px solid #111111',
                  boxShadow: '3px 3px 0 #111111',
                  transform: 'rotate(-12deg)',
                }}
              >
                ★ HOT!
              </div>

              {/* كريسبي sticker */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 20,
                  right: -10,
                  background: '#FFB400',
                  color: '#111111',
                  fontFamily: 'Cairo',
                  fontWeight: 900,
                  fontSize: 14,
                  padding: '6px 14px',
                  border: '2px solid #111111',
                  boxShadow: '3px 3px 0 #111111',
                  transform: 'rotate(8deg)',
                }}
              >
                كريسبي!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE BAND ─────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 20, marginBlock: '-2px' }}>
        <Marquee />
      </div>

      {/* ── FEATURED PRODUCTS ────────────────────────────── */}
      <section
        style={{
          background: '#F7F2E9',
          borderBottom: '3px solid #111111',
          padding: '80px 0',
          position: 'relative',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(17,17,17,.06) 1px, transparent 1.2px)',
            backgroundSize: '14px 14px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 48,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 12,
                  letterSpacing: 3,
                  color: '#8A8580',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                TOP SELLERS
              </div>
              <h2
                style={{
                  fontFamily: 'Cairo',
                  fontWeight: 900,
                  fontSize: 52,
                  lineHeight: 1,
                  transform: 'skewX(-6deg)',
                  display: 'inline-block',
                }}
              >
                الأكثر{' '}
                <span style={{ color: '#E31C23' }}>طلباً</span>
              </h2>
            </div>
            <Link href="/menu">
              <BrandButton variant="ghost" className="btn-wobble">
                كل القائمة ←
              </BrandButton>
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 28,
            }}
          >
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} colorIndex={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND STORY STRIP ────────────────────────────── */}
      <section
        style={{
          background: '#111111',
          padding: '88px 0',
          borderBottom: '3px solid #111111',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Halftone on dark */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,.10) 1px, transparent 1.2px)',
            backgroundSize: '14px 14px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span
              style={{
                fontFamily: 'Anton',
                fontSize: 12,
                letterSpacing: 4,
                color: '#FFB400',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 14,
              }}
            >
              WHY CHICKENEES
            </span>
            <h2
              style={{
                fontFamily: 'Cairo',
                fontWeight: 900,
                fontSize: 56,
                color: '#F7F2E9',
                display: 'inline-block',
                transform: 'skewX(-6deg)',
              }}
            >
              ليش تشيكنييز؟
            </h2>
          </div>

          {/* Voice cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              alignItems: 'start',
            }}
          >
            {voiceCards.map((card, i) => (
              <div
                key={i}
                style={{
                  background: card.bg,
                  color: card.color,
                  border: '3px solid #111111',
                  boxShadow: card.shadow,
                  padding: '36px 32px',
                  transform: `rotate(${card.rotate}) ${card.lift ? 'translateY(-16px)' : ''}`,
                  position: 'relative',
                }}
              >
                {/* Label */}
                <div
                  style={{
                    fontFamily: 'Anton',
                    fontSize: 11,
                    letterSpacing: 3,
                    marginBottom: 16,
                    opacity: card.bg === '#E31C23' ? 0.7 : 0.5,
                    textTransform: 'uppercase',
                  }}
                >
                  {card.label}
                </div>
                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'Cairo',
                    fontWeight: 900,
                    fontSize: 30,
                    lineHeight: 1.15,
                    marginBottom: 14,
                    transform: 'skewX(-5deg)',
                    display: 'inline-block',
                  }}
                >
                  {card.title}
                </h3>
                {/* Body */}
                <p
                  style={{
                    fontFamily: 'Cairo',
                    fontWeight: 700,
                    fontSize: 16,
                    lineHeight: 1.7,
                    opacity: card.bg === '#E31C23' ? 0.9 : 0.75,
                  }}
                >
                  {card.body}
                </p>
                {/* Halftone corner dot */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#111111',
                    opacity: 0.12,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────── */}
      <section
        style={{
          background: '#E31C23',
          borderBottom: '3px solid #111111',
          padding: '72px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#111 1px, transparent 1.2px)',
            backgroundSize: '14px 14px',
            opacity: 0.15,
          }}
        />
        <div className="relative z-10">
          <h2
            style={{
              fontFamily: 'Cairo',
              fontWeight: 900,
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: '#111111',
              marginBottom: 32,
              transform: 'skewX(-5deg)',
              display: 'inline-block',
            }}
          >
            جوعان؟{' '}
            <span style={{ color: '#FFB400' }}>لا تستنى!</span>
          </h2>
          <br />
          <Link href="/app">
            <BrandButton
              variant="yellow"
              className="btn-wobble pulse"
              style={{ fontSize: 20, padding: '20px 48px' }}
            >
              اطلب دليڤري الحين 🛵
            </BrandButton>
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
