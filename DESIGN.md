---
version: "1.0.0"
name: "DIRTTIME"
description: "Dark, high-contrast landing site for the DIRTTIME iOS motorcycle maintenance app. Voice is direct and utilitarian — rider-first, not corporate. Visual system: near-black surfaces, single warm orange accent, typographic contrast between geometric display (Space Grotesk) and neutral body (Inter)."

colors:
  bg: "#050505"
  bg-elevated: "#0D0D0D"
  bg-card: "#111111"
  surface: "#161616"
  border: "rgba(255, 255, 255, 0.08)"
  border-hover: "rgba(255, 255, 255, 0.15)"
  text: "#FFFFFF"
  text-secondary: "rgba(255, 255, 255, 0.65)"
  text-tertiary: "rgba(255, 255, 255, 0.40)"
  accent: "#FF6600"
  accent-hover: "#FF7711"
  accent-glow: "rgba(255, 102, 0, 0.40)"
  accent-wash: "rgba(255, 102, 0, 0.08)"
  accent-wash-strong: "rgba(255, 102, 0, 0.20)"
  status-ok: "#02EE60"
  status-warn: "#F59E0B"
  status-error: "#D41414"

typography:
  display-xl:
    fontFamily: "Space Grotesk"
    fontSize: "80px"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  display-lg:
    fontFamily: "Space Grotesk"
    fontSize: "48px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  display-md:
    fontFamily: "Space Grotesk"
    fontSize: "44px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  display-sm:
    fontFamily: "Space Grotesk"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  heading-md:
    fontFamily: "Space Grotesk"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.3
  heading-sm:
    fontFamily: "Space Grotesk"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.4
  heading-xs:
    fontFamily: "Space Grotesk"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: "Inter"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: "Inter"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.1em"
  button:
    fontFamily: "Inter"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.2

rounded:
  sm: "8px"
  md: "12px"
  lg: "20px"
  xl: "32px"
  full: "9999px"

spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  7: "28px"
  8: "32px"
  9: "36px"
  10: "40px"
  12: "48px"
  14: "56px"
  18: "72px"
  20: "80px"
  25: "100px"
  30: "120px"

components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.text}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "16px 28px"
  button-secondary:
    backgroundColor: "rgba(255, 255, 255, 0.06)"
    textColor: "{colors.text}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "16px 28px"
  nav-cta:
    backgroundColor: "{colors.text}"
    textColor: "{colors.bg}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: "10px 18px"
  header-shell:
    backgroundColor: "rgba(13, 13, 13, 0.85)"
    rounded: "{rounded.full}"
    padding: "10px 10px 10px 18px"
  card-feature:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.lg}"
    padding: "32px 28px"
  card-content:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.xl}"
    padding: "48px"
  card-tip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
    padding: "24px"
  badge:
    backgroundColor: "{colors.accent-wash}"
    textColor: "{colors.accent}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "8px 16px 8px 10px"
  section-label:
    textColor: "{colors.accent}"
    typography: "{typography.label}"
  faq-item:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "20px 24px"
  step-number:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.text}"
    typography: "{typography.heading-sm}"
    rounded: "{rounded.full}"
    size: "56px"
---

## Overview

DIRTTIME is an iOS maintenance tracker for dirt bikes. The marketing site's job is to look like a tool made by riders, not a SaaS pitch. The visual system leans on:

- **A single accent.** One warm orange (`{colors.accent}`) carries every call-to-action, active state, and brand moment. There are no secondary accents — if something needs to stand out, it uses the accent or nothing.
- **Dark-only.** The page is always dark. `color-scheme: dark` is declared on `<html>` so native UI (scrollbars, form controls) matches.
- **Typographic contrast.** Space Grotesk for anything that reads as a "statement" (hero, section titles, numbers, card headings), Inter for anything that reads as "copy."
- **Depth through layering, not drama.** Elevation is built from near-black surface tiers and 1px low-opacity borders — not heavy shadows. Shadows are reserved for the product mockup, hover states, and the accent glow.

**Voice:** Active, second person, short. Title Case for headings and buttons. Numerals for counts. Ends loading states with `…`, not `...`.

## Colors

### Surfaces
A five-tier stack from deepest (`{colors.bg}`) to most elevated (`{colors.surface}`). Each tier is only ~5–10% lighter than the previous — the jumps are subtle. Cards do not use a different hue; they use the next tier up.

| Token | Value | Use |
|---|---|---|
| `{colors.bg}` | `#050505` | Page background |
| `{colors.bg-elevated}` | `#0D0D0D` | Header shell, hover states on dark surfaces |
| `{colors.bg-card}` | `#111111` | Feature cards, content cards, mobile menu |
| `{colors.surface}` | `#161616` | Inner surfaces (FAQ rows, tip cards, form containers, date pills) |
| `{colors.border}` | `rgba(255,255,255,0.08)` | All resting borders |
| `{colors.border-hover}` | `rgba(255,255,255,0.15)` | Border on hover/focus of interactive cards |

### Text
Three-tier ramp on a dark base. Secondary is the default for body copy; primary is reserved for headings and strong emphasis; tertiary is metadata only.

| Token | Value | Use |
|---|---|---|
| `{colors.text}` | `#FFFFFF` | Headings, primary copy, strong emphasis |
| `{colors.text-secondary}` | `rgba(255,255,255,0.65)` | Body copy, nav links at rest, card descriptions |
| `{colors.text-tertiary}` | `rgba(255,255,255,0.40)` | Timestamps, footer meta, section dividers |

### Accent
One color, three presentations: solid, glow, and wash. The wash variants are used for pill backgrounds, icon backplates, and the hero badge — so the accent appears everywhere the eye needs anchoring without shouting.

| Token | Value | Use |
|---|---|---|
| `{colors.accent}` | `#FF6600` | Primary CTAs, logo word, step numbers, section labels, active nav, accent headings |
| `{colors.accent-hover}` | `#FF7711` | Hover on solid-accent surfaces |
| `{colors.accent-glow}` | `rgba(255,102,0,0.40)` | Drop shadows on CTAs, ambient glow behind hero phones |
| `{colors.accent-wash}` | `rgba(255,102,0,0.08)` | Badge/icon backplate fills |
| `{colors.accent-wash-strong}` | `rgba(255,102,0,0.20)` | Badge borders |

### Status
Used only inside content (FAQ answers, maintenance-status explanations). These map to the app's in-product status system and should not bleed into marketing chrome.

| Token | Value | Use |
|---|---|---|
| `{colors.status-ok}` | `#02EE60` | "OK" status |
| `{colors.status-warn}` | `#F59E0B` | "Due Soon" status |
| `{colors.status-error}` | `#D41414` | "Overdue" status |

## Typography

Two families. **Space Grotesk** for display, **Inter** for body. Both loaded from Google Fonts with `preconnect` and `display=swap`. Never mix weights within a family across the same visual role — display uses 700 for titles, 600 for subheadings and card headings; body uses 500 for labels/nav and 400 for prose.

- **Hero title (`display-xl`)** — Fluid: `clamp(2.75rem, 8vw, 5rem)`. Tight tracking (`-0.03em`), tight line height (`1.05`). This is the only time line-height goes below `1.1`.
- **Section title (`display-md`)** — Fluid: `clamp(1.75rem, 4vw, 2.75rem)`. Used once per section, centered, preceded by a `section-label`.
- **Page header H1 (`display-lg`)** — Fluid: `clamp(2rem, 5vw, 3rem)`. For legal/support pages.
- **Section label** — 12px, 700 weight, `letter-spacing: 0.1em`, uppercase, accent-colored. Precedes every section title.
- **Body copy** — 16px/1.6 on Inter 400. Never below 14px except for `caption` metadata.
- **Numerals** — When showing counts or comparing numbers, apply `font-variant-numeric: tabular-nums`.
- **Punctuation** — `…` not `...`, curly quotes `" "` not straight, non-breaking space before units (`10&nbsp;MB`).
- **Headings** — Use `text-wrap: balance` to avoid widows.

## Layout

- **Container** — Max width `1120px`, horizontal padding `24px` (mobile `16px`).
- **Section rhythm** — Default vertical padding is `100px` top/bottom at desktop, `72px` at `≤768px`, `48px` at `≤480px`. Dense sections (showcase, CTA) use `80px`.
- **Grid** — Features and steps are 3-column at desktop, 2-column at `≤900px` (features only), single-column at `≤768px`.
- **Spacing scale** — Use only values from the `spacing` scale in frontmatter. Prefer the larger step when in doubt — the site reads as calm, not dense.
- **Safe area** — Full-bleed layouts respect `env(safe-area-inset-*)` where they hit the edge (none currently, but required for any future mobile-native embeds).
- **Scroll** — `scroll-behavior: smooth` at the document level; anchored headings need `scroll-margin-top` to clear the fixed header.

## Elevation & Depth

Elevation is built in two orthogonal axes: **surface tier** (how much lighter than bg) and **shadow** (used sparingly for floating elements). Borders carry most of the depth cues.

| Layer | Source | Use |
|---|---|---|
| `surface-0` | `{colors.bg}` | Page body |
| `surface-1` | `{colors.bg-elevated}` | Floating header, hover on dark rows |
| `surface-2` | `{colors.bg-card}` | Resting cards |
| `surface-3` | `{colors.surface}` | Inset elements inside cards |
| `shadow-sm` | `0 4px 20px rgba(255,255,255,0.15)` | Nav CTA hover (subtle white halo) |
| `shadow-md` | `0 8px 24px {colors.accent-glow}` | Step number badges |
| `shadow-lg` | `0 12px 32px {colors.accent-glow}` | Primary CTA hover |
| `shadow-card` | `0 20px 50px -20px rgba(0,0,0,0.6)` | Feature-card hover, screenshot rows |
| `shadow-phone` | `0 60px 100px -30px rgba(0,0,0,0.8)` | iPhone mockup stack |
| `glow-hero` | `radial-gradient({colors.accent-glow}, transparent 60%)` blurred 80px | Ambient glow behind hero phones |

Hover states raise cards by `translateY(-6px)` and promote `{colors.border}` to `{colors.border-hover}`. Buttons raise by `translateY(-2px)` and gain a glow shadow. Never use both on the same element.

## Shapes

Five-step radius scale. The defining move of the system is **the full-pill header and CTAs** against **medium-radius cards** — the pills carry brand, the cards carry content.

| Token | Value | Use |
|---|---|---|
| `{rounded.sm}` | `8px` | Small inline elements, logo img |
| `{rounded.md}` | `12px` | Buttons, FAQ rows, tip cards, icon backplates |
| `{rounded.lg}` | `20px` | Feature cards, screenshots, mobile menu, contact card |
| `{rounded.xl}` | `32px` | Large content cards (legal, feedback, CTA) |
| `{rounded.full}` | `9999px` | Header shell, nav links, nav CTA, badges, date pills, step numbers |

Rule: if a surface contains block text, use `lg` or `xl`. If it's a pill-shaped control or tag, use `full`. `md` is for buttons and inline rows.

## Components

All components reference tokens — never hardcode a color, radius, or font. See the `components` block in the frontmatter for the mapping.

- **Button — Primary** — Solid accent fill, white text, `{rounded.md}`, glow shadow on hover, `translateY(-2px)` on hover.
- **Button — Secondary** — `rgba(255,255,255,0.06)` fill, 1px border `{colors.border}`, white text. Borders promote to `border-hover` on hover.
- **Nav CTA (App Store)** — Inverted: white fill, black text, pill shape. Reserved for the single strongest action on the page.
- **Header shell** — Floating pill, `rgba(13,13,13,0.85)` with `backdrop-filter: blur(24px) saturate(180%)`. Fixed, top-anchored, `border-radius: {rounded.full}`.
- **Feature card** — `{colors.bg-card}` fill, `{rounded.lg}`, 48×48 icon backplate in `{colors.accent-wash}` with accent-colored 24px stroke icon.
- **Content card (legal, feedback)** — `{colors.bg-card}`, `{rounded.xl}`, `padding: 48px`. Contains the full legal / FAQ body.
- **FAQ row** — `{colors.surface}` background, `{rounded.md}`, `+` toggle in `{colors.accent}` that rotates 45° when expanded.
- **Badge (hero "Available on iOS")** — `{colors.accent-wash}` fill, `{colors.accent-wash-strong}` border, accent text, pulsing accent dot.
- **Section label** — Small, uppercase, tracked, accent-colored. Always precedes a `section-title`.
- **Step number** — 56×56 circle, solid accent, Space Grotesk 700, always shadowed with `{colors.accent-glow}`.
- **Screenshot carousel** — 200px-wide thumbnails, `{rounded.lg}`, infinite marquee with edge mask-image fade. Pauses on hover. Disabled under `prefers-reduced-motion`.
- **iPhone mockup** — Linear-gradient shell (`#1A1A1A → #0A0A0A`), 44px outer radius, 34px screen radius, 12px bezel. Three-phone stack with perspective, main phone floats, side phones are scaled and rotated.

## Do's and Don'ts

**Do**
- Use `{colors.accent}` for every CTA and only for CTAs, active nav, section labels, and the one accent word in the hero title.
- Use `{colors.accent-wash}` (the 8% version) whenever the accent needs to be present but quiet — badges, icon backplates, hover washes.
- Pair every `section-title` with a `section-label` above it.
- Use Space Grotesk for numerals in UI chrome (step numbers, widget preview, stat readouts). It has the geometric feel the brand wants.
- Raise cards on hover with `translateY(-6px)` + `border-hover` only. Don't also add a shadow — the card already has one from its siblings.
- Honor `prefers-reduced-motion`: marquees stop, transitions collapse to `0.01ms`.
- Keep copy in active voice and Title Case for headings/buttons. Use numerals for all counts ("8 deployments", not "eight").

**Don't**
- Don't introduce a second accent color. If something needs to feel different from the accent, use white, a text tier, or a status color — not a new hue.
- Don't use `#FF6B35` or any other orange that isn't `{colors.accent}`. There is one orange.
- Don't use `rgba(0,0,0,...)` for borders — borders are always white with opacity.
- Don't apply hover transforms to text links, only to cards, buttons, and the nav CTA.
- Don't use `transition: all` — list properties explicitly. The easing is always `var(--ease-out)` or `var(--ease-spring)`.
- Don't use `outline: none` without a `:focus-visible` replacement. The default focus ring is `2px solid {colors.accent}` with `2px` offset.
- Don't hardcode font sizes, radii, or spacing values. If the scale doesn't cover a case, extend the scale — don't one-off it.
- Don't use status colors (`{colors.status-*}`) in marketing chrome. They belong inside educational content that references app UI.
- Don't put shadows on resting cards. Shadows indicate floating elements (phone, hover states, glowing CTAs).
- Don't use `…` as `...` or curly quotes as straight quotes. Typography is a brand surface.
