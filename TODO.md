# Proposal Site — TODO

## Scalability (Next Steps)
- [ ] Refactor into multi-proposal structure: move current page to `app/proposals/higa-hvac/page.tsx`
- [ ] Extract shared components (`Eyebrow`, `Rule`, `Reveal`, `FI`, bullet list, section header) into `components/proposal/`
- [ ] Create a typed `ProposalData` interface so each new proposal is just a data file
- [ ] Consider a simple template file (`app/proposals/_template/page.tsx`) as a starting point for new clients

## Security / Privacy
- [ ] Decide on URL privacy strategy — plain slug (`/proposals/client-name`) vs. obfuscated slug (`/proposals/client-name-x9k2`) to prevent casual discovery
- [ ] If needed, add Next.js middleware for simple password or token-based protection on proposal routes

## Polish
- [ ] Add Open Graph meta tags per proposal (client name, date) for clean link previews when sharing
- [ ] Confirm logo filename convention — currently `pivott-light.png` has a typo; rename to `pivot-light.png` when convenient and update the reference in `page.tsx`
- [ ] Wire up a real domain and deploy to Vercel

## Higa HVAC — Specific
- [ ] Replace `$[X]` retainer pricing placeholders if any remain after client review
- [ ] Follow up after sending — retainer upsell is the natural next conversation
