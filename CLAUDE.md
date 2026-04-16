# Pivot Studio — Proposal Site Template

This project is a reusable template for generating client proposal sites. Each proposal is a single-page, mobile-first document presenting deliverables, timeline, and pricing with clean editorial design and subtle scroll animations.

---

## Tech Stack

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS v4** — config lives entirely in `app/globals.css` via `@theme inline`
- **Framer Motion** — scroll-triggered animations only, no decorative flourishes
- **shadcn/ui** — used minimally for base component primitives

---

## Design System

### Philosophy
- Mobile-first, single-column layout that reads like a well-designed document
- Color used sparingly — brand blue appears only as an accent, never as a background
- Typography drives hierarchy; ornamentation is minimal
- Every section should be immediately scannable

### Color Tokens
Defined in `app/globals.css` under `@theme inline`. Use these Tailwind utilities everywhere:

| Token | Utility | Role |
|---|---|---|
| `--color-navy` | `text-navy`, `bg-navy` | Brand blue — eyebrows, numbers, dashes, CTA, prices |
| `--color-navy-light` | `bg-navy-light` | Hover state for navy buttons |
| `--color-parchment` | `bg-parchment` | Page background (warm off-white) |
| `--color-ink` | `text-ink` | Primary text (near-black) |
| `--color-ink-muted` | `text-ink-muted` | Body copy, secondary text |
| `--color-rule` | `border-rule` | Horizontal rules and dividers |

To adjust the brand blue for a new client, change only `--color-navy` and `--color-navy-light` in `globals.css`. Everything else inherits automatically.

### Typography
- **Font:** Geist Sans via `next/font/google` — set as `--font-sans`, no serif or display fonts
- **Hero h1:** `text-[2.6rem] sm:text-6xl font-bold leading-[1.1] text-ink`
- **Section h2:** `text-4xl font-semibold text-ink`
- **Eyebrow label:** `text-[0.7rem] tracking-[0.16em] uppercase font-semibold text-navy` — always use the `<Eyebrow>` component
- **Body copy:** `text-[0.9375rem] leading-relaxed text-ink-muted`
- **Small/meta text:** `text-xs text-ink-muted`

### Spacing
- Page container: `max-w-2xl mx-auto px-6`
- Section inner padding: `py-10`
- Eyebrow-to-h2 gap: `space-y-1` (tight — they belong together)
- Eyebrow+h2 block to body copy: `space-y-5`
- Bullet list gap: `space-y-4`
- Between major sections: controlled by `pb-14` on each `<Reveal>` wrapper

### Border Radius
Set to `0.25rem` (nearly square) — keeps the aesthetic clean and document-like, not app-like.

---

## Component Patterns

### `<Eyebrow>`
Small all-caps label that sits above every section heading. Always navy. Always paired with an h2 in a `space-y-1` wrapper.

```tsx
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.7rem] tracking-[0.16em] uppercase font-semibold text-navy">
      {children}
    </p>
  );
}
```

### `<Rule>`
A full-width horizontal divider using `border-rule`. Used to open every section. Animates in via `fadeIn` variant.

```tsx
function Rule() {
  return <motion.hr variants={fadeIn} className="border-0 border-t border-rule" />;
}
```

### `<Reveal>` + `<FI>`
`Reveal` is a scroll-triggered stagger container — wrap each section in it. `FI` (Fade Item) is the animated child — wrap each discrete element inside a `Reveal`.

```tsx
<Reveal className="pb-14">
  <FI><Rule /></FI>
  <FI><Eyebrow>Label</Eyebrow></FI>
  ...
</Reveal>
```

### Section Header Pattern
Every section (except the hero) follows this structure inside a `py-10 space-y-5` div:

```tsx
<FI>
  <div className="space-y-1">
    <Eyebrow>Section label</Eyebrow>
    <h2 className="text-4xl font-semibold text-ink">Section title.</h2>
  </div>
</FI>
<FI>
  <p className="text-[0.9375rem] leading-relaxed text-ink-muted">Body copy...</p>
</FI>
```

### Bullet List Pattern
Em-dash bullets with navy dash and muted body text. Used in deliverable and retainer sections.

```tsx
<ul className="space-y-4 pt-1">
  {bullets.map((bullet, i) => (
    <FI key={i}>
      <li className="flex gap-4">
        <span className="text-navy shrink-0 mt-[2px] select-none">—</span>
        <span className="text-[0.9375rem] leading-relaxed text-ink-muted">{bullet}</span>
      </li>
    </FI>
  ))}
</ul>
```

### Deliverable Section Pattern
Each deliverable has: a ghost number (top-right, `font-black text-navy/30`), eyebrow label, h2 title, itemized price in navy, and bullet list.

```tsx
<FI className="flex items-start justify-between gap-4">
  <div className="space-y-1">
    <Eyebrow>{label}</Eyebrow>
    <h2 className="text-4xl font-semibold text-ink">{title}</h2>
    <p className="text-lg font-semibold text-navy pt-1">{price}</p>
  </div>
  <span className="text-4xl sm:text-5xl font-black text-navy/30 leading-none shrink-0 mt-1">
    {number}
  </span>
</FI>
```

### Animation Variants
Defined once at the top of `page.tsx` and shared across all components:

```tsx
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45 } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
```

`useInView` is called inside `Reveal` with `{ once: true, margin: "-64px 0px" }` — animations fire once as the section enters the viewport.

---

## Page Structure

For a new proposal, replicate these sections in order:

1. **Sticky Header** — Logo (left) + date or client name (right)
2. **Hero** — Eyebrow metadata · Bold h1 · Framing paragraph · Rule
3. **Deliverables** — Numbered sections (01, 02, 03...), each with label/title/price/bullets
4. **Timeline** — Week-by-week grid with daily communication callout
5. **Investment** — Price box (with payment split) + itemized recap list
6. **Retainer Upsell** — Optional section with ongoing service bullets + monthly price card
7. **CTA** — Heading + body copy + contact modal (SMS/call)
8. **Footer** — Logo + "Prepared for [Client] · [Date]"

---

## Adapting for a New Proposal

1. **Brand color:** Update `--color-navy` and `--color-navy-light` in `globals.css`
2. **Logo:** Drop the Pivot Studio logo into `public/` and update the `<Image>` src in the header
3. **Deliverables:** Update the `deliverables` array — each entry takes `number`, `title`, `label`, `price`, and `bullets[]`
4. **Timeline:** Update the `weeks` array
5. **Pricing:** Update individual deliverable prices and the total in the Investment section
6. **Phone number:** Update the `PHONE` constant in `CTASection`
7. **Footer date:** Update the date string in the footer and header

---

## Scaling to Multiple Proposals

The intended long-term structure is one repo, one deploy, one proposal per route:

```
app/
  proposals/
    higa-hvac/page.tsx
    next-client/page.tsx
  page.tsx  ← Pivot Studio landing page (future)
```

Shared components (`Eyebrow`, `Rule`, `Reveal`, `FI`) should live in `components/proposal/` once a second proposal is added. Each `page.tsx` is then just a data file — import the components, swap the content.

URL privacy: proposals are public by default. Use an obfuscated slug (e.g. `/proposals/client-name-x9k2`) if the client relationship warrants it, or add Next.js middleware for token-based protection.

---

## Content Guidelines

- **Eyebrow labels** name the category (e.g. "Lead Generation & Qualification")
- **H2 titles** are short and punchy — ideally a sentence fragment or single strong statement
- **Bullets** lead with outcomes, not features — what does the client gain, not what will be built
- **Prices** are shown per-deliverable and totaled in the Investment section
- **Payment split** is 50% at kickoff, 50% at launch by default
