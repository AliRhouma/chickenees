# تشيكنييز · CHICKENEES — Page-Building Rules

> **Brand Bible Companion · v1.0**
> A practical ruleset for building any new page (landing, menu, campaign, social, app screen) in the Chickenees identity. Read top-to-bottom once, then keep it open while building.

---

## 0 · The One-Sentence Rule

**Loud. Crispy. Tilted ‎-8°‎. Cream base, ink lines, red accent, yellow spark.**

If a page doesn't feel like a fried-chicken poster having fun, you've drifted.

---

## 1 · Page Skeleton

Every Chickenees page follows this stack from top to bottom:

1. **Sticky nav** — cream bg, 2px ink border-bottom
2. **Hero / cover** — cream bg, halftone overlay, tilted slogan band
3. **Marquee strip** — ink bg, white text, infinite horizontal scroll
4. **Content blocks** — alternating cream / ink backgrounds
5. **CTA banner** — red bg, yellow accent text, 4px ink borders top + bottom
6. **Footer** — ink bg, cream text, yellow section headings

Direction is **RTL** by default. The mascot logo sits on the **right** in the nav (start side). Order buttons sit on the **left** (end side).

```html
<html lang="ar" dir="rtl">
```

---

## 2 · Colors — The Four-Color Law

Only four colors. No tints. No gradients (except inside SVG illustrations). No hue-shifts.

| Token | Hex | Role | % of page |
|-------|-----|------|-----------|
| `--cream` | `#F7F2E9` | Base / background | **55%** |
| `--ink` | `#111111` | Type / borders / dark blocks | **25%** |
| `--red` | `#E31C23` | Accents / CTAs / energy | **15%** |
| `--yellow` | `#FFB400` | Spark / spice / highlight | **5%** |

### CSS tokens (always declare these first)

```css
:root{
  --cream:#F7F2E9;
  --ink:#111111;
  --red:#E31C23;
  --yellow:#FFB400;
}
```

### Pairing rules

- **Cream + Ink** — default body (always readable)
- **Ink + Red** — high-energy banners, CTAs
- **Red + Cream** — packaging, menu cards
- **Yellow + Ink** — pricing chips, "HOT" tags, never as a base
- **Red + Yellow** — only inside illustrations, never as full-page combo (clashes)

❌ Never use red text on yellow, ink on red without high contrast, or yellow as a body background.

---

## 3 · Typography — Two Fonts, One Attitude

```css
font-family: 'Cairo', system-ui, sans-serif;     /* Arabic + body */
font-family: 'Anton', sans-serif;                /* Latin display */
font-family: 'JetBrains Mono', monospace;        /* Tech meta only */
```

### Weights
- **Display / Headings** → Cairo `900` (Black) only
- **Body** → Cairo `600`–`700` (never `400` for paragraphs — they look weak)
- **Captions / meta** → JetBrains Mono `600`, uppercase, `letter-spacing: 1.5px`

### Type scale

| Token | Size | Line-height | Tracking |
|-------|------|------|----------|
| `display` | 128px / 8rem | .92 | -2px |
| `h1` | 72px / 4.5rem | .95 | -1.5px |
| `h2` | 48px / 3rem | 1.0 | -1px |
| `h3` | 28px / 1.75rem | 1.1 | -.5px |
| `body` | 16px | 1.6 | 0 |
| `caption` | 12px | 1.4 | +1.5px |

### The Skew Rule

Display words and key Arabic terms are **always skewed ‎-8°‎**:

```css
.headline-word{
  display: inline-block;
  transform: skewX(-8deg);
}
```

Apply skew to **single words or short phrases only** — never to full paragraphs or body copy.

### The Underline-Highlight

For one emphasized word per headline, layer a yellow skewed bar behind it:

```css
.underline{ position:relative; display:inline-block; }
.underline::after{
  content:""; position:absolute; left:0; right:0; bottom:-6px;
  height:10px; background:var(--yellow);
  transform:skewX(-12deg); z-index:-1;
}
```

Limit: **one underline-highlight per hero**.

---

## 4 · Backgrounds — Cream Default, Halftone Always

### Default body

```css
body{ background: var(--cream); }
```

### The halftone dot overlay (use everywhere)

This is the brand's signature texture. Apply to **every section** as an atmospheric layer.

```css
/* On cream */
.halftone-light{
  background-image: radial-gradient(rgba(17,17,17,.08) 1px, transparent 1.2px);
  background-size: 14px 14px;
}
/* On ink */
.halftone-dark{
  background-image: radial-gradient(rgba(255,255,255,.14) 1px, transparent 1.2px);
  background-size: 14px 14px;
}
```

Apply via `::before` pseudo-element on a section, never directly on `body`.

### Diagonal red bands

A signature device: a **‎-6° rotated red strip** containing scrolling slogan text. Use **once per page max** — usually in the hero.

```css
.band{
  position: absolute;
  top: 140px; left: -100px; right: -100px;
  height: 90px;
  background: var(--red);
  transform: rotate(-6deg);
  border-top: 3px solid var(--ink);
  border-bottom: 3px solid var(--ink);
  overflow: hidden;
}
```

### Other allowed patterns
- **Diagonal stripes** (red + ink, ‎-12°‎, 26px stripe) — packaging mockups only
- **Action lines** — radial red lines, mascot containers only
- **Icon scatter** — bolts/stars/flames on ink bg — sticker sheets, hero accents
- **Bolt burst** — single bolt centered on yellow halftone — promo tiles only

❌ Never use **gradients**, **photos as backgrounds** (frame them inside cards instead), or **noise textures**.

---

## 5 · Borders, Shadows, and the Hard Stack

The brand's depth language is **flat 2D with hard offset shadows** — never soft or blurred.

### Border standard

```css
border: 2px solid var(--ink);   /* small cards, badges, buttons */
border: 3px solid var(--ink);   /* big cards, banners, stickers */
border: 4px solid var(--ink);   /* full-bleed dividers */
```

### The hard shadow system

```css
/* Default */
box-shadow: 5px 5px 0 var(--ink);

/* Hero / featured */
box-shadow: 6px 6px 0 var(--red);

/* Hover state — increase offset, never blur */
box-shadow: 9px 9px 0 var(--ink);
transform: translate(-3px, -3px);
```

**Shadow is always solid color, no blur, no opacity.** The offset direction stays consistent (down-right) across the whole page.

❌ No `rgba(0,0,0,.1) 0 4px 12px`. No `blur()`. No `drop-shadow()` outside SVG.

---

## 6 · Buttons — The Skewed Stack

The brand button is **skewed ‎-8°‎ with a hard offset shadow that grows on hover**.

```html
<button class="btn-primary">
  <span>اطلب الآن ←</span>
</button>
```

```css
.btn-primary{
  background: var(--ink);
  color: var(--cream);
  padding: 16px 30px;
  font-family: 'Cairo';
  font-weight: 900;
  font-size: 16px;
  border: 2px solid var(--ink);
  box-shadow: 5px 5px 0 var(--red);
  transform: skewX(-8deg);
  cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease;
}
.btn-primary span{
  display: inline-block;
  transform: skewX(8deg);   /* counter-skew the text */
}
.btn-primary:hover{
  transform: skewX(-8deg) translate(-3px, -3px);
  box-shadow: 8px 8px 0 var(--red);
}
```

### Variants
- **Primary** — ink bg, cream text, red shadow
- **Red** — red bg, cream text, ink shadow
- **Yellow** — yellow bg, ink text, ink shadow (use for "ADD TO CART", price chips)
- **Ghost** — transparent bg, ink border, red shadow, ink text

### The Counter-Skew Rule

Whenever a parent has `skewX(-8deg)`, the inner text/icon **must** apply `skewX(8deg)` to read straight. Forgetting this is the single most visible mistake.

---

## 7 · Stickers — The Energy Patches

Stickers are **rotated, hard-bordered, bold-typography badges** dropped into compositions for energy. Always:

- Rotated between **‎-15°‎ and ‎+15°‎**
- Bordered `3px solid var(--ink)`
- Hard offset shadow `5px 5px 0 var(--ink)`
- Filled with a single brand color (red, yellow, or ink)

### Three sticker shapes

```css
/* Circle — short emotive words: CRISPY!, NEW! */
.sticker-circle{
  width: 120px; height: 120px;
  border-radius: 50%;
  background: var(--red); color: var(--cream);
  border: 3px solid var(--ink);
  box-shadow: 5px 5px 0 var(--ink);
  transform: rotate(-8deg);
  font-family: 'Cairo'; font-weight: 900; font-size: 22px;
  display: flex; align-items: center; justify-content: center;
}

/* Rounded rect — hot/spice tags */
.sticker-rect{
  padding: 14px 22px;
  background: var(--yellow); color: var(--ink);
  border: 3px solid var(--ink);
  box-shadow: 5px 5px 0 var(--ink);
  transform: rotate(6deg);
  border-radius: 14px;
  font-family: 'Cairo'; font-weight: 900; font-size: 22px;
}

/* Slanted tag — Anton font, English slogans */
.sticker-tag{
  padding: 10px 18px;
  background: var(--ink); color: var(--cream);
  font-family: 'Anton'; font-size: 18px; letter-spacing: 2px;
  transform: skewX(-8deg);
  border: 2px solid var(--ink);
  box-shadow: 4px 4px 0 var(--red);
}
```

### Sticker placement rules

- **Maximum 2 stickers** per hero composition
- Stickers **overlap** the main element (mascot, food image) — never floating in empty space
- Place them at corners — top-left + bottom-right, or top-right + bottom-left
- Mix shapes: never two circles, never two rectangles in one block

### Wiggle animation (optional but on-brand)

```css
@keyframes wiggle{
  0%,100%{ transform: rotate(-14deg) translateY(0); }
  50%{ transform: rotate(-10deg) translateY(-6px); }
}
.sticker-circle{ animation: wiggle 4s ease-in-out infinite; }
```

---

## 8 · Cards — The Halftone Block

Product cards, info cards, anything boxed.

```css
.card{
  background: var(--ink);   /* or red, cream, yellow */
  color: var(--cream);
  border: 3px solid var(--ink);
  padding: 22px;
  position: relative;
  overflow: hidden;
}
/* Halftone overlay using currentColor */
.card::before{
  content:""; position: absolute; inset: 0; opacity: .2;
  pointer-events: none;
  background-image: radial-gradient(currentColor 1px, transparent 1.2px);
  background-size: 12px 12px;
}
.card:hover{ transform: translate(-4px,-4px); }
```

### Card grid color rotation

When 4 cards sit side by side, **rotate their backgrounds** in this order:

1. Red
2. Ink
3. Cream
4. Yellow

This creates the brand's signature rainbow strip without any single card dominating.

### Card anatomy
- Lightning bolt icon top-left (`24×24`)
- Big Anton number (price, count) — `font-size: 96px; line-height: 1`
- Small caps Latin name — Anton, `letter-spacing: 1.5px`
- Bold Cairo Arabic name — `font-size: 26px; font-weight: 900`
- "Add to cart" row separated by **dashed top border** (`border-top: 2px dashed currentColor`)

---

## 9 · Marquees — The Endless Slogan Strip

Use **once per page**, between major sections, to inject motion and rhythm.

```html
<div class="marquee">
  <div class="marquee-track">
    <span>كريسبي على مزاجك · CRUNCH MODE ON · ★ HOT & CRISPY · </span>
    <span aria-hidden="true">[duplicate the same content]</span>
  </div>
</div>
```

```css
.marquee{
  background: var(--ink); color: var(--cream);
  padding: 22px 0; overflow: hidden;
  border-top: 3px solid var(--ink);
  border-bottom: 3px solid var(--ink);
}
.marquee-track{
  display: flex; gap: 60px; white-space: nowrap;
  font-family: 'Anton'; font-size: 48px; letter-spacing: 3px;
  animation: slide 28s linear infinite;
}
@keyframes slide{
  from{ transform: translateX(0); }
  to{ transform: translateX(-50%); }
}
```

### Marquee composition
- Mix **Arabic + Latin** slogans
- Separate with **red dots** (12px circles) and **yellow stars**
- Always **duplicate the content** inside the track for seamless looping
- Speed: **24–28s** per full loop. Faster = chaotic, slower = sleepy

---

## 10 · Mascot — The Cool Rooster

The white rooster with sunglasses, red mohawk, yellow beak, red wattle.

### Sizes
- **Min print**: 24mm
- **Min digital**: 32px
- **Hero**: 60–88% of mascot container width
- **Logo lockup**: 42–54px next to wordmark

### Variants
1. **Full color** — cream / light bg
2. **Mono white** — on ink or red bg
3. **Mono ink** — on yellow or cream bg
4. **Outline** — playful contexts only

### Mascot container

Always set the mascot inside a **black circle with halftone overlay** plus a **red drop-disc**:

```css
.mascot-bg{
  position: absolute; inset: 8% 12%;
  background: var(--ink);
  border-radius: 50%;
  box-shadow: 14px 14px 0 var(--red);
}
.mascot-bg::before{
  content: ""; position: absolute; inset: 0; border-radius: 50%;
  background-image: radial-gradient(rgba(255,255,255,.14) 1px, transparent 1.2px);
  background-size: 14px 14px;
}
```

### Speed lines (manga effect)

Add red SVG speed lines on either side of the mascot, especially in hero blocks:

```html
<svg class="speed s1" style="color:var(--red)">
  <use href="#speedlines"/>
</svg>
```

❌ Never recolor the mascot freely. Never add accessories (hats, scarves, etc.). Never stretch.

---

## 11 · Icons — The Six Glyphs

The brand has **six approved iconographic shapes** — don't introduce others.

| Icon | Use |
|------|-----|
| ⚡ Bolt | Energy, "fast", section dividers, card top-left |
| ★ Spark / 4-point star | Decorative, list bullets, between slogans |
| ● Dot | Separator in marquees, ratio bars |
| ⟶ Speed lines | Mascot accents only |
| → Arrow | "Add to cart", nav, CTAs |
| 🔥 Flame | "Spicy" tagging |

All icons are **inline SVG**, **24–32px**, with `2-3px` ink strokes when bordered. Never use icon-font libraries (Font Awesome, etc.).

---

## 12 · Animation — Five Motions, No More

Use sparingly. Every motion serves readability or invites action.

### A · Pulse (call attention)

```css
@keyframes pulse{
  0%,100%{ transform: scale(1); }
  50%{ transform: scale(1.2); }
}
.pulse{ animation: pulse 2s ease-in-out infinite; }
```

Use on: order CTA dot, notification badges. **One per page max.**

### B · Skew Wobble (hover state)

```css
.btn:hover{
  transform: skewX(-12deg) translate(-3px,-3px);
}
```

Default skew ‎-8°‎ → hover skew ‎-12°‎. Use on every primary button.

### C · Marquee (continuous scroll)

24–28s per loop, `linear`, infinite. **Never pauses on hover.**

### D · Sticker wiggle (optional)

```css
@keyframes wiggle{
  0%,100%{ transform: rotate(-14deg); }
  50%{ transform: rotate(-10deg) translateY(-6px); }
}
```

4–5s ease-in-out infinite. Stagger directions if two stickers are visible.

### E · Spin ring (mascot containers)

```css
@keyframes spin{ to{ transform: rotate(360deg); } }
.ring{ animation: spin 30s linear infinite; }
```

Slow rotations on dashed rings around the mascot in feature sections. Inner ring spins reverse.

### Animation budget per page

- **Hero** — 1 marquee + 1 wiggle + 1 hover state = max
- **Body sections** — 1 motion per section
- ❌ **No** scroll-triggered fades. **No** parallax. **No** elastic eases. **No** typewriter effects.

---

## 13 · Layout & Spacing

- **Page max-width**: `1280px` (content) / `1480px` (full-width docs)
- **Section padding**: `100px` top/bottom on desktop, `60px` mobile
- **Spacing scale**: `8 / 14 / 22 / 32 / 60 / 100px` — pick from this scale, don't invent values
- **Grid**: 12-column on desktop, collapses to 1 on mobile
- **Asymmetry encouraged** — let the band rotate, let stickers tilt, let the mascot break out of its container

### Breakpoints

```css
@media (max-width: 900px) { /* tablet */ }
@media (max-width: 520px) { /* mobile */ }
```

On mobile: cards stack 1-column, marquee font shrinks to 32px, hero band moves to bottom.

---

## 14 · Voice & Copy Rules

- **Arabic-first.** Always lead with Arabic, English supports.
- **Short sentences.** 7 words max for hero copy.
- **Casual register.** Speak like a friend, not a manager.

### Brand vocabulary (rotate, don't overuse)

- كريسبي · *crispy*
- على مزاجك · *on your vibe*
- مقرمش · *crunchy*
- كرنش مود · *Crunch Mode*
- بيضرب · *it slaps*
- HOT & CRISPY
- CRUNCH IS AN ART
- CRUNCH MODE ON

❌ Avoid: "نتشرف بزيارتكم", "أعلى معايير الجودة", "نسعى لإرضاء", any corporate Arabic. ❌ Avoid English jargon: "premium experience", "world-class", "elevated".

---

## 15 · The 10-Point Pre-Launch Checklist

Before any page ships:

- [ ] Cream background, ink type
- [ ] Halftone dot overlay on every section
- [ ] At least one ‎-8°‎ skewed display word
- [ ] One yellow underline-highlight per hero
- [ ] Hard shadows only (no blur, anywhere)
- [ ] Mascot present, on its black halftone disc
- [ ] One marquee, between 24–28s
- [ ] 1–2 stickers max in hero, rotated
- [ ] Counter-skew applied to all skewed-button text
- [ ] RTL layout, Arabic primary copy

---

## 16 · Quick-Reference Snippet Library

### A · Section header

```html
<span class="section-tag"><span>★ FRIED CHICKEN ★</span></span>
<h2>كريسبي <em>على مزاجك</em></h2>
```

### B · Hero composition

```
[ Sticky nav ]
[ Cream hero with halftone ]
   ├── -6° rotated red band (slogan marquee)
   ├── Big skewed display headline (Arabic)
   ├── Lede paragraph
   ├── Primary button + ghost link
   └── Mascot on black disc + 2 stickers + speed lines
[ Black marquee strip ]
```

### C · Product card grid

```
[ Section: cream bg, halftone ]
   ├── Tag · H2 · Lede
   └── 4 cards in row [ red | ink | cream | yellow ]
```

### D · CTA banner

```
[ Red full-bleed, halftone, 4px ink top+bottom borders ]
   ├── H2 with ink-block "ON" highlight
   ├── Lede
   └── Cream button with ink shadow
```

### E · Footer

```
[ Ink bg ]
   ├── 4-column grid: brand · menu · about · social
   ├── Yellow uppercase headings (JetBrains Mono)
   ├── Cream link list
   └── Bottom bar: copyright · slogan
```

---

## 17 · Common Mistakes (Catch These in Review)

| Mistake | Fix |
|---------|-----|
| Soft `box-shadow` with blur | Replace with hard `Npx Npx 0 var(--color)` |
| Skewed button text reads slanted | Add `transform: skewX(8deg)` on inner `<span>` |
| Three or more stickers in hero | Cut to 2 max |
| Photo of food as section background | Frame inside a card with ink border |
| Generic body font (Inter, Roboto) | Switch to Cairo 600/700 |
| Yellow used as page background | Move yellow to accents only |
| Marquee paused on hover | Remove `:hover { animation-play-state: paused }` |
| Mascot recolored or accessorized | Restore official variant |
| Gradient anywhere | Replace with flat color from the four-color palette |
| Centered hero with symmetric layout | Break the grid — let the band rotate, let things overlap |

---

## End

> This file is the source of truth. If a designer asks "should I add a gradient?" — section 4. If they ask "how skewed?" — section 3. If they ask "can I add a third sticker?" — section 7. Keep it on hand. Keep it crispy.
>
> **— Chickenees Brand Team, 2026**
