# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Chickenees Prototype (`artifacts/chickenees`)

Full 15-page Arabic RTL investor demo for تشيكنييز (fried chicken brand).

**Stack**: React + Vite + Tailwind + Framer Motion + Wouter + canvas-confetti  
**Design system**: #F7F2E9 cream / #111111 ink / #E31C23 red / #FFB400 yellow. Hard 5px offset shadows, halftone dot overlays, skewX(-6deg) display text. No gradients.  
**Layout**: PhoneFrame (max-w 430px centered) for all /app/* pages. Mobile app pages contain AppBottomNav inside the frame.

### PhoneFrame architecture
PhoneFrame uses `min(calc(100dvh - 48px), 844px)` as explicit chrome height (no `height: 100%` percentages). Notch + home-bar are flex siblings (28px each, `flex-shrink:0`) flanking phone-content. Phone-content also uses an explicit `min(calc(100dvh - 104px), 788px)` height. `cloneElement` injects this same concrete height directly into every child page-div's inline style so their own `flex: 1` scrollable + `flex-shrink:0` AppBottomNav distributes correctly without any cascading-percentage ambiguity. Page root divs use `flex: 1` (NOT `height: 100%`) as their own style.

### Page map
| # | Route | Page |
|---|-------|------|
| 1 | `/` | Homepage |
| 2 | `/menu` | MenuPage |
| 3 | `/locations` | LocationsPage |
| 4 | `/about` | AboutPage |
| 5 | `/app` | AppSplash |
| 6 | `/app/login` | AppLogin |
| 7 | `/app/home` | AppHome |
| 8 | `/app/menu` | AppMenu |
| 9 | `/app/product/:id` | AppProduct |
| 10 | `/app/cart` | AppCart |
| 11 | `/app/checkout` | AppCheckout |
| 12 | `/app/order/:id` | AppOrder (live tracker + confetti) |
| 13 | `/app/rewards` | AppRewards (loyalty + redeem) |
| 14 | `/app/orders` | AppOrders (history + reorder) |
| 15 | `/app/profile` | AppProfile (settings + logout modal) |

### Data files (`src/data/`)
- `products.ts` — menu items
- `addresses.ts` — 3 saved addresses
- `orders.ts` — mock order history (used in AppOrders inline too)
- `rewards.ts` — loyalty rewards catalog
- `user.ts` — user profile (أحمد العتيبي, Silver tier, 240 pts)
- `branches.ts` — restaurant locations

### Context
- `CartContext` — addToCart, removeFromCart, clearCart, itemCount, bumpCount
