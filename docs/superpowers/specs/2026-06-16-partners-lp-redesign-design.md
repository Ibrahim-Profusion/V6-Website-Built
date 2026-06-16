# Partners LP v2 — Redesign Design Spec

**Date:** 2026-06-16
**Target file:** `partners-lp-v2.html` (single self-contained page; deploys via Vercel)
**Status:** Approved in brainstorm; ready for implementation plan
**Register:** brand / cold-traffic B2B installer acquisition (Meta ads)

---

## 1. Why this redesign

The page converts cold installer traffic from Meta ads. A review found it reads as "all over the place." The owner confirmed all four diagnosed problems:

1. **Two competing front doors** — the hero form vs. a standalone Calendly "book a call" section.
2. **The offer repeats ~5×** — "3 free, no risk" restated in hero, math, guarantee, FAQ, close.
3. **Inconsistent CTAs & tone** — five different button labels for ~two actions; hard-sell tactics (billboard math, urgency theater) sitting on a premium look.
4. **Scattered flow** — 12 sections, irregular background rhythm, no clear arc.

Root cause (per the project's own `SINEK-HORMOZI-FRAMEWORK.md`): Hormozi conversion tactics leaked into the **surface/voice**, where the framework says only the **structure** should be Hormozi and the **voice** should be the plain-spoken handyman brand from `PRODUCT.md`.

## 2. Locked decisions (from brainstorm)

| Decision | Choice |
|---|---|
| Primary action | **Form-first.** The 3-step form is the only conversion. |
| Calendly | **Removed entirely** (already gone from the live file). Success state just confirms; no booking path. |
| Tone | **"Hormozi bones, handyman skin."** Keep offer-first structure, real risk-reversal; strip gimmicks; render every surface in the calm `PRODUCT.md` voice. |
| Offer | **Keep** "first 3 appointments free, pay only when they show" (ad message-match). |
| Brand colors | **Keep** navy `#0F1830` + green `#1FA452`. |
| Fonts | **Open.** Keep Geist + Instrument Serif; **add Source Serif 4** for reading passages. |
| Scope | **This page only.** Do not touch sibling partner pages. |
| Layout direction | **Approach B — sticky-form split** (desktop pinned rail; mobile form-hero + follow-bar). |

## 3. Narrative architecture — 8 beats

Down from 12 sections. The form is no longer a section; it is a persistent fixture (right rail on desktop, hero + follow-bar on mobile). Calm white canvas with exactly **one navy moment** and **one cream moment** so the background stops ping-ponging.

| # | Beat | Background | Job |
|---|---|---|---|
| 1 | **Hero** | white | Offer headline + plain promise. Form sits beside it (right rail). Carries the no-show seed: "pay only when they show." |
| 2 | **Why the first three are free** | white | The kept "3 free" message in handyman prose (replaces the billboard math). Confidence + insinuation + "you walk." |
| 3 | **Trust band** | white | 4.7 Google · BBB · 90% show · 58% close. Thin scannable strip, not a section. |
| 4 | **The guarantee** | **navy** | No-show risk reversal, stated once, early and heavy. The page's single dark anchor. |
| 5 | **The difference** | white | A typical lead vs. a ProFusion appointment. Kills "another lead company." |
| 6 | **Voices** | **cream** | One or two real partner quotes. The single warm moment. |
| 7 | **FAQ** | white | Three questions that close the skeptic's open loops. One reinforces the no-show promise. |
| 8 | **Close** | white | One quiet line that points back to the form. No re-pitch. |

Risk-reversal is now **distributed, not buried**: hero promise (beat 1) → navy guarantee (beat 4) → FAQ echo (beat 7).

### Removed / folded
- **Math "= ?" billboard** — substance kept as beat 2 prose; device deleted.
- **"One per territory" section** — deleted. (Residual: one light line in the hero sub + FAQ.)
- **Standalone Calendly section** — already gone; do not reintroduce.
- **Duplicate scarcity** (hero pill + section) — the pulsing/animated scarcity pill is removed.
- **Five CTA labels** → one (see §5).

## 4. Form mechanics (the core interaction)

The existing 3-step form's **fields, validation, and tracking are preserved**. Only placement and styling change.

### Desktop — pinned rail
- Page body is a 2-column split inside the existing `~1280px` container: **left** narrative (~58–62%), **right** form (~38–42%, ~380–420px). The split applies above **920px**.
- The form card uses `position: sticky; top: [nav height + ~16px]` so it holds its position while the narrative scrolls past, from hero through the close, releasing naturally at the footer.
- The navy guarantee (beat 4) and cream voices (beat 6) are **panels within the left column**, not full-bleed bands.

### Mobile (`≤ 920px`) — form-hero + follow-bar
- Single column. The form **is the hero** (full-width, directly under a short offer headline).
- A slim **sticky bottom follow-bar** ("Claim my 3 free appointments →") slides in after the user scrolls past the hero form; tapping it scrolls back and focuses step 1. It hides whenever the form or footer is in view. Slide-in respects `prefers-reduced-motion` (appears without animating).

### Success state — confirm only
- On submit: fire Meta Pixel `Lead` (with `eventID` dedup) and POST to the n8n webhook, exactly as today.
- The card flips to a clean confirmation: "Got it. We'll be in touch. A ProFusion rep calls within one business day. First come, first served."
- **No booking step, no Calendly, no third path.**

### Tracking to preserve / remove
- **Preserve:** Meta Pixel `PageView` + `Lead` (eventID), n8n webhook POST, UTM + `fbclid`/`gclid` capture and `localStorage` persistence.
- **Remove (dead after Calendly):** the UTM→Calendly passthrough block and the `calendly.event_scheduled` → `fbq('Schedule')` message listener, plus the Calendly widget `<script>` if still present.

## 5. Visual & voice system ("handyman skin")

### Type — three faces, three jobs
- **Geist** (sans): headlines on UI, buttons, labels, the form, all numbers.
- **Instrument Serif** (display): two or three earned display moments only. Punctuation, not decoration. (Upright, never italic per existing convention.)
- **Source Serif 4** (NEW, reading): the "talking to you" passages — beat 2, longer FAQ answers. Load alongside the existing Google Fonts link.

### Color — calm by default
- **White** canvas almost everywhere.
- **Green** `#1FA452` — single accent: the CTA and one or two emphases per view.
- **Navy** `#0F1830` — one anchor only (beat 4, the guarantee).
- **Cream** `#EFE6D4`-range — one warm moment (beat 6, voices).
- No `#000`/`#fff` purity (keep the existing tinted-neutral approach); preserve the a11y work already in the file (`prefers-reduced-motion` block, `:focus-visible` rings).

### Motion — restrained
- Functional only: form step transitions, button press/hover feedback, the mobile follow-bar slide-in. All respect `prefers-reduced-motion`. No scroll theater, no perpetual loops.

### One CTA label
- Every button on the page reads **"Claim my 3 free appointments"** and every one scrolls to / focuses the same form (the pinned rail on desktop, the hero form on mobile).

### Voice rules (from `PRODUCT.md`)
- Plain English, peer-to-peer, no jargon ("appointment" never "lead"). Numbers only when they earn their place. No em dashes in copy. No urgency/scarcity theater.

### Beat 2 copy (the kept "3 free" message — reference draft)
> **Eyebrow:** Before you pay us a dollar
> **Display (Instrument Serif):** Three free, because we've run the numbers.
> **Body (Source Serif 4):** Installers close about 58 of every 100 appointments we send. So your first three are on us. Run that out, and most partners have booked a job before we've charged a cent. If the work doesn't earn itself in those three, you walk. No retainers, no contracts, no hard feelings.

## 6. Section-by-section build notes

- **Nav:** sticky top; logo + one CTA ("Claim my 3 free appointments") that focuses the form. Keep slim.
- **Hero (beat 1):** left column = eyebrow (states, as "where we operate," + one light "one partner per trade, per territory" line) + H1 ("Your first 3 appointments are free.") + sub (offer stack + "pay only when they show") + the **4 trade images grouped** (2×2 / gallery, not a thin strip) to signal the trades served. **No quick-trade chips** (cut). Right column = the form card (sticky rail).
- **Beat 2:** per §5 copy. Plain prose, no billboard cells.
- **Trust band (beat 3):** Google 4.7 + BBB + 90% show + **58% close**. Change the live trust strip's ~70% to 58%.
- **Guarantee (beat 4):** navy panel. "If a confirmed homeowner doesn't show, you don't pay." The one dark moment.
- **Difference (beat 5):** keep the two-column "typical lead vs. ProFusion appointment" compare; the "us" column may carry the green emphasis (full border, never a side-stripe).
- **Voices (beat 6):** cream panel; 1–2 quotes, anonymized as-is (open item 11.2).
- **FAQ (beat 7):** three `<details>` items; one reinforces the no-show promise.
- **Close (beat 8):** one quiet line + the single CTA.

## 7. Responsive & accessibility (carry forward + extend)

- Mobile-first; tuned for a phone at evening light per `PRODUCT.md`.
- Preserve the existing `prefers-reduced-motion: reduce` reset and `:focus-visible` rings; extend them to the new follow-bar and sticky rail.
- Sticky rail must not trap focus or overlap content on short viewports; at/below 920px it returns to normal flow (form becomes the hero).
- WCAG 2.1 AA: body contrast ≥ 4.5:1, UI ≥ 3:1; verify green-on-white and white-on-navy.
- Form keeps inline field errors, the network-failure retry banner, and ARIA (`role="group"` + `aria-pressed` pickers, `aria-live` success, progress semantics).

## 8. Out of scope
- Sibling partner pages (`partner-landing-page.html`, `partners-lp.html`).
- Backend, webhook, or pixel-config changes (reuse existing endpoints/IDs).
- New photography or net-new testimonials (use existing assets; anonymized quotes stay).

## 9. Success criteria
- One primary action; one CTA label; the form reachable from any scroll position.
- 8 beats, calm background rhythm (one navy, one cream).
- No billboard math, no repeated offer, no Calendly, no urgency theater.
- The "3 free" argument preserved in plain handyman voice directly under the hero.
- A11y and tracking behavior at least as good as the current file.

## 10. Reference mockups
Visual-companion screens (persisted in `.superpowers/brainstorm/245-1781620645/content/`): `current-audit.html`, `approaches.html`, `architecture-v2.html`, `form-mechanics-v2.html`, `type-voice.html`.

## 11. Resolved decisions (spec review, 2026-06-16)
1. **Close rate: 58%.** Use 58% in beat 2 and the trust band. The live trust strip shows ~70% — change it to 58%.
2. **Testimonials:** keep anonymized ("CEO, Puma Home Services").
3. **Hero trade images:** use all 4 existing trade images (solar, HVAC, insulation, windows), grouped to signal the trades served (2×2 grid or gallery, not a thin strip).
4. **Territory exclusivity:** keep one light "one partner per trade, per territory" line in the hero sub + FAQ; no dedicated section.
5. **Quick-trade chips:** cut from the hero (redundant with the always-adjacent form trade picker).
6. **Hero H1/sub + beat 2 wording:** draft in implementation from the §5 reference copy (58% close); owner fine-tunes.
