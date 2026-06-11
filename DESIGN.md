# Design

## Theme

Warm, photo-led, editorial wellness. Near-white body with peach and blush panels carrying warmth; product imagery does the heavy emotional lifting. Black ink, ember pink-orange CTA gradient, dark footer. Strategy: **Committed** — saturated warmth (one ember gradient + warm-cream panels) carries 30–50% of the page; black is the action color.

## Color

### Surface
- `--bg` `#FFFFFF` — body
- `--bg-warm` `#FBF6F0` — section alt (very warm cream)
- `--peach` `#FAE9D6` — peach panel
- `--blush` `#FDE2D9` — blush panel
- `--cream-card` `#F7F2EA` — image-card surface for portrait cards
- `--hairline` `#EAE6E0` — warm hairline
- `--hairline-strong` `#DBD5CB`

### Text
- `--ink` `#15131A` — primary text, footer bg's text base
- `--ink-soft` `#2A2630` — secondary heading
- `--muted` `#6B6770` — body secondary
- `--faint` `#9A9499` — captions, supporting

### Action
- `--ember-1` `#F77E5C` — ember pink-orange
- `--ember-2` `#E5413B` — ember red
- `--rose` `#F08FB1` — soft rose pull
- `--rose-deep` `#D45A82`

### Dark surfaces (footer, CTA banner type, dark inset cards)
- `--dark` `#0F0D12` — footer / dark surface
- `--dark-soft` `#1A1720`
- `--dark-edge` `#2A2630`
- `--dark-text` `#F4F1EC`
- `--dark-muted` `#9A9499`

### Category pill tones (3-up grid)
- `--tone-care` `#7BCB87` — Healthcare
- `--tone-flow` `#F08FB1` — Service / Receptionist
- `--tone-reach` `#F4A85E` — Outbound

### Gradients
- `--grad-ember: linear-gradient(135deg, #F77E5C 0%, #E5413B 60%, #C72A3A 100%)` — main CTA banner
- `--grad-blush: linear-gradient(135deg, #FDE2D9 0%, #F8C7BC 50%, #F4A8AD 100%)` — product reveal panel
- `--grad-peach: radial-gradient(120% 80% at 50% 0%, #FAE9D6 0%, #F4D2B3 60%, #E9B391 100%)` — soft hero halo
- `--grad-cream: linear-gradient(180deg, #FBF6F0 0%, #F4ECDF 100%)`

## Typography

- **Display + body**: `Inter` (variable, 400 / 500 / 600). `font-feature-settings: "cv11", "ss01", "ss03"`. The reference uses an editorial humanist serif for the manifesto pull-quote — closest free pair: keep Inter for everything, but use **Instrument Serif** as the optional pull-quote / decorative voice if needed later.
- **Mono**: `JetBrains Mono` (400 / 500) — captions, mock labels, tiny eyebrows. Used sparingly.

Headlines centered. `clamp(2rem, 5vw, 3.5rem)` for section H2s, weight 500, tracking -0.02em. Hero overlay text in white at the bottom of the image card, weight 500, larger: `clamp(2.5rem, 5.5vw, 4rem)`. No tracked uppercase eyebrows above sections; small mono caption text for "Categories" / "Features" / "Testimonials" stays below the headline only when needed.

## Layout

- Max content width 1180px, 24px gutters → 48px ≥1024px.
- Section rhythm 80–120px vertical, varies.
- Card radii: image cards 24–32px (large rounded), inner mocks 16px, pills full-round, banners 28–32px.
- Hairlines on cards: 1px `--hairline`. Shadows minimal: `0 1px 0 rgba(15,17,21,0.04)` for floating chrome, no deep drop shadows.

## Components

- `ui/PhotoPlaceholder` — warm-gradient placeholder that fills an image card. Variants by hue (peach / blush / ember / cream / dark). Optional caption tag in the corner ("hero.jpg") so we know where to drop the real asset. Renders an Image when `src` is passed.
- `ui/ImageCard` — rounded image card with optional gradient text overlay at the bottom (for hero) or top (for category cards).
- `ui/Chip` — pill badge (kept from current build, used everywhere).
- `ui/Button` — kept; primary becomes the ember-gradient CTA on banner contexts, solid black otherwise. Outline + ghost unchanged.
- `ui/Accordion` — used in FAQ.
- `ui/DotsField` — the LED-style dot pattern (concentric circles) for the CTA banner.
- `ui/SectionHeading` — centered H2 + optional one-line description.

## Sections

- `Hero` — full-width photo card with white overlay headline at bottom; CTA chips inside the card (optional).
- `Manifesto` — centered short paragraph, large-ish display text with hairline italics or emphasis terms.
- `Categories` — 3 photo cards in a row, each with a colored pill badge and short caption above.
- `ProductReveal` — soft pink/peach panel with a product photo and a "buy/connect" chip overlay.
- `Features` — 5 horizontal image+copy cards in a vertical stack. Left column: photo. Right column: title + body + 2-3 tiny stat chips.
- `Testimonials` — centered quote card with a soft rose backdrop.
- `CtaBanner` — wide ember-gradient banner with a dot field on the right and CTA on the left.
- `FaqAndCall` — 2-col: small dark "Book a 20-minute call" CTA + FAQ accordion.
- `Footer` — dark, brand wordmark + social row + link columns + small trust strip at the bottom.

## Motion

- Default ease `cubic-bezier(0.22, 1, 0.36, 1)`.
- Section entrances: 12–16px rise + opacity, 0.55–0.7s, once on intersection.
- Photo hover: gentle 1.02 scale on category cards (only).
- CTA dot field: subtle pulse on individual dots (stagger).
- All motion respects `prefers-reduced-motion`.

## Accessibility

- All photo overlays meet 4.5:1 against caption text (use 60–70% black overlay gradient at the bottom of hero card; never rely on photo luminosity).
- Pill badges use color + label, never color alone.
- Accordion is keyboard-navigable with proper aria.
- Buttons have visible focus rings (2px ink, 2px offset on light; 2px white on ember/dark).
