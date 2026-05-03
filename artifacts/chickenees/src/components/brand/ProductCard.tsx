import { cn } from '@/lib/utils';
import { BrandButton } from './BrandButton';
import { Badge } from './Badge';

interface ProductCardProps {
  product: {
    id: number;
    nameAr: string;
    price: number;
    badge?: string;
    image?: string;
  };
  colorIndex?: number;
  onAdd?: (id: number) => void;
  onClick?: () => void;
  className?: string;
}

const cardColors = [
  { bg: '#E31C23', color: '#F7F2E9' },
  { bg: '#111111', color: '#F7F2E9' },
  { bg: '#EFE8DA', color: '#111111' },
  { bg: '#FFB400', color: '#111111' },
];

export const ProductCard = ({ product, colorIndex = 0, onAdd, onClick, className }: ProductCardProps) => {
  const theme = cardColors[colorIndex % cardColors.length];
  const isDark = theme.bg === '#111111' || theme.bg === '#E31C23';

  return (
    <div
      className={cn('relative border-[3px] border-[#111111] flex flex-col overflow-hidden transition-transform duration-200', className)}
      style={{
        background: theme.bg,
        color: theme.color,
        boxShadow: '5px 5px 0 #111111',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translate(-3px,-3px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '9px 9px 0 #111111';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = '';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '5px 5px 0 #111111';
      }}
    >
      {/* Food image — framed with ink border at top */}
      {product.image && (
        <div
          className="w-full border-b-[3px] border-[#111111] overflow-hidden relative"
          style={{ height: 180 }}
        >
          {/* Photo with unified warm-retro filter */}
          <img
            src={product.image}
            alt={product.nameAr}
            className="w-full h-full object-cover"
            loading="lazy"
            style={{
              filter: 'contrast(1.18) saturate(1.25) sepia(0.18) brightness(0.92)',
            }}
          />
          {/* Brand-color tint overlay — ties image to card palette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: theme.bg,
              opacity: 0.18,
              mixBlendMode: 'multiply',
            }}
          />
          {/* Halftone dot overlay on image — consistent with brand graphic language */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(17,17,17,.55) 1px, transparent 1.2px)',
              backgroundSize: '10px 10px',
              opacity: 0.35,
            }}
          />
        </div>
      )}

      {/* Halftone overlay on the color section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          top: product.image ? 180 : 0,
          backgroundImage: isDark
            ? 'radial-gradient(rgba(255,255,255,.14) 1px, transparent 1.2px)'
            : 'radial-gradient(rgba(17,17,17,.08) 1px, transparent 1.2px)',
          backgroundSize: '14px 14px',
        }}
      />

      {/* Card body */}
      <div className="relative z-10 p-5 flex flex-col flex-1">
        {/* Badge + price row */}
        <div className="flex justify-between items-start mb-3">
          {product.badge ? (
            <Badge variant={product.badge === 'hot' ? 'yellow' : product.badge === 'new' ? 'ink' : 'cream'}>
              {product.badge === 'hot' ? '🔥 HOT' : product.badge === 'bestseller' ? 'الأكثر مبيعاً' : 'جديد'}
            </Badge>
          ) : (
            <span />
          )}
          <span
            className="font-black leading-none"
            style={{ fontFamily: 'Anton', fontSize: 28, letterSpacing: 1 }}
          >
            {product.price}
            <span
              style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 14, marginRight: 3 }}
            >
              {' '}ر.س
            </span>
          </span>
        </div>

        {/* Product name */}
        <h3
          className="font-black leading-tight mb-4"
          style={{ fontFamily: 'Cairo', fontWeight: 900, fontSize: 22 }}
        >
          {product.nameAr}
        </h3>

        {/* Add button */}
        {onAdd && (
          <div
            className="mt-auto pt-3"
            style={{ borderTop: `2px dashed ${isDark ? 'rgba(255,255,255,.4)' : 'rgba(17,17,17,.3)'}` }}
          >
            <BrandButton
              variant={theme.bg === '#111111' ? 'red' : 'primary'}
              className="w-full text-center block"
              onClick={() => onAdd(product.id)}
              data-testid={`button-add-product-${product.id}`}
            >
              أضف للسلة ←
            </BrandButton>
          </div>
        )}
      </div>
    </div>
  );
};
