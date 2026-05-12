# Homepage Principles — ProFusion V6-Build

> **What this document is:** the canonical reference for how every page on the ProFusion website should look, sound, and feel. Distilled from `index.html` (the homepage) — every principle, pattern, and discipline that was applied when building it.
>
> **How to use it:** when migrating any other page (`states/*`, `problems/*`, `categories/*`, `programs/*`, `our-installers.html`, `sample-report.html`, etc.) to match the homepage, follow this document. If the page contradicts anything here, the page is wrong.
>
> **Audience:** developers, AI agents, designers, anyone editing the site. Self-contained — you don't need to read PRODUCT.md or DESIGN.md to follow it.
>
> **Senior docs (if you want the full context):** `PRODUCT.md` (brand truth), `DESIGN.md` (visual system spec), `IMPECCABLE-CRITIQUE.md` and `TASTE-CRITIQUE.md` (audits of what's currently broken on legacy pages).

---

## 0. The single most important rule

**Copy the homepage's HTML and CSS as your starting point.** Don't build pages from scratch. Open `index.html`, identify the closest matching section, copy that block, and adapt the content. Every shortcut in this document is a paraphrase of "do what the homepage does."

If you're ever uncertain, the homepage is the answer. If the homepage doesn't show you the answer, this document does. If neither does, ask before inventing.

---

## 0a. The never-quote-the-install-price rule

**Never reveal or estimate the dollar cost of a project to homeowners on any page.** This is a hard rule. Cost-talk on a website kills the conversation before an installer ever gets one. Homeowners self-disqualify on a number that's already wrong for their specific home, and they leave.

What's allowed:
- Rebate amounts ("$75/window", "30% project rebate", "$5,000 home-battery bonus")
- Annual savings, payback periods, multi-year savings totals
- Percentage discounts, percentage rate hedges
- Program caps ("up to $16,000", "$25,000 HEAT Loan ceiling")
- Comfort/quality/property-value benefits (qualitative)
- "No money down" / "no homeowner expense for eligible households" / "designed to fully cover the work" framings

What's banned:
- Any per-unit install price ("$500-$1,000 per window installed", "$13,500-$15,000 installation")
- "Total project cost" rows in worked-example tables
- "Installed cost", "net cost", "out-of-pocket total", "total before rebate"
- Cost comparisons between products ("Triple-pane adds 30-50% to the per-window cost")
- Any dollar figure that anchors the homeowner's mental price tag

When in doubt, frame in terms of what the homeowner gets back, not what they put in. The Score and the installer conversation are where pricing happens, not the website.

---

## 1. The North Star — the voice the page must carry

**The Trusted Handyman, Engineering-Backed.**

The wise, weathered guy in the neighborhood who's seen 1,200 homes. He's done the math. He explains things plainly enough that a five-year-old gets it. He doesn't pitch, doesn't push, doesn't talk down.

Under the hood: engineers. Real underlying scoring model, real utility tariffs synced weekly, six audit gates per installer.
On the surface: the trusted neighbor who looks at your house and tells you, in plain English, what to do first and why.

**Tagline:** *"Built for the house. Felt in the home."*

**What the voice sounds like:** Norm Abram from This Old House with better web design. The Wirecutter writer who tested 47 vacuums and tells you which one to buy. A guru, not a salesman.

**What the voice does NOT sound like:** a consultant. A SaaS landing page. A solar-installer call script. An AI assistant. A government efficiency portal. A hand-drawn rope-logo Etsy cabin.

---

## 2. The Flow Grammar — Why → How → What

Every page narrative — at homepage scale, at sub-page scale — opens with **Why** (belief, observation, the homeowner's situation), then **How** (the method, the gates, the ranked plan), then **What** (the deliverable, the action, the next step).

The product enters as the natural answer to a question we've already raised — never as the opening pitch.

**Concrete example from the homepage:**

| Section | What it does |
|---|---|
| Hero | *Why* — "Know exactly what your home needs." |
| Stats | Earn quick trust before asking for anything |
| How It Works | *How* — three steps, no pitch |
| Vetting | *How* — the installer side of the same answer |
| Score (the dial) | *What* — the deliverable in motion |
| Problems | Where you actually live |
| Service Area | Where we work |
| Final CTA | *Why* again — "Drop your address." |

**Apply at sub-page scale.** A problem page does not need a dial; a state page does not need a vetting section. But every page should still open with Why (the homeowner's situation), pivot to How (what helps), and close with What (the next step). Same grammar, different scale.

---

## 3. Class prefix and scoping

Every CSS class on a page-specific block is prefixed with `idx2-` (homepage and homepage-derived sections). When you migrate a sub-page, **keep using `idx2-` for any pattern lifted from the homepage** — don't invent a new prefix and don't strip the prefix.

If a page absolutely needs its own scope (e.g. `get-my-score.html` uses `gms-`), that scope inherits all the same rules as `idx2-`; the prefix is just a namespace, not a different design system.

> A future cleanup pass will rename `idx2-` to `pf-` site-wide. Until then, `idx2-` is the canonical prefix. Don't pre-emptively rename — it'll create migration noise.

---

## 4. Color discipline

### The palette (defined as CSS variables in `shared.css`)

| Variable | Hex | Role | Where allowed |
|---|---|---|---|
| `--ink` | `#0A1020` | Body text, headlines | Default text color everywhere |
| `--blue-700` | `#1A4F90` | **Public Trust Blue** — brand spine | H1/H2 emphasis (`em`), primary CTA, italic emphasis when meaning is identity-related |
| `--blue-900` | `#0A2E5C` | Hero gradient anchor, dark sections | Footer stripe, CTA hover |
| `--blue-500` | `#2E6DB8` | Map active gradient endpoint | Never on body text |
| `--blue-50` | `#EAF3FC` | Chip / eyebrow background variant | Info callout backgrounds |
| `--green-500` | `#3AB44A` | **Savings Green** — "good news" register | Savings totals, rebate stack callouts, eyebrow dot, post-upgrade grade |
| `--green-700` | `#2E9A3D` | Green eyebrow text, "good" badge text | Earned, never decorative |
| `--green-50` | `#EEFAF0` | Green-good badge background | Callout fill for positive outcomes |
| `--peach-hero` | `#FFE7CC` | Warm Peach Hero | **Only** on hero illustration backdrop and the dial's final-state glow. Nowhere else. |
| `--peach-deeper` | `#FFD4A8` | Warm Peach Deeper | Same restriction |
| `--alert-red` | `#B91C1C` | Pre-upgrade grade letter, rising bill counter | Never decoratively |
| `--alert-red-tint` | `#FEE8E8` | Red badge background | Only |
| `--gray-50` | `#F5F7FB` | Single tonal break | Used once or twice per page max |
| `--gray-100` | `#E8ECF3` | Hairline borders | Card and divider borders |
| `--gray-200` | `#D6DCE7` | Hover-state borders | Slightly darker |
| `--gray-400` | `#8891A5` | Meta text, captions | |
| `--gray-600` | `#4A5266` | Subhead, secondary body | |
| `--gray-700` | (used in homepage) | Body prose | Source Serif 4 paragraphs |
| `--gray-800` | `#1E2434` | Nav links, body intensifications | |
| `--white` | `#FFFFFF` | Canvas default | |

### The named color rules (non-negotiable)

**The Earned Accent Rule.** Public Trust Blue, Savings Green, and the blue-to-green gradient italic each appear in **three places or fewer per page**. A treatment used everywhere has zero gravity. The gradient italic earns its three slots: hero h1, transformation result, final CTA. Everywhere else, italic serif drops to flat Public Trust Blue.

**The One Tonal Break Rule.** White is the canvas. Gray-50 is the only tonal break, and it appears **once or twice per page, never eight times**. Chained alternation reads as a Wordpress theme.

**The Warm Peach Reservation.** Warm Peach Hero and Warm Peach Deeper appear **only** on the hero illustration backdrop and the dial's final-state glow. Nowhere else, ever.

**Never use `#000` or `#fff` directly outside the canvas.** `var(--ink)` is the black; `var(--white)` is the canvas; tint every neutral toward the brand.

---

## 5. Typography system

### The fonts (loaded once in `<head>`, shared by every page)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&display=swap" rel="stylesheet">
```

| Variable | Family | Use for |
|---|---|---|
| `var(--display)` | Geist | Headlines, body short-form, UI, default |
| `var(--mono)` | Geist Mono | Numbers and code-like labels only |
| `var(--serif-body)` | Source Serif 4 | Long-form passages where the handyman is "talking to you" |
| `var(--serif)` | Instrument Serif italic | Two-or-three earned phrases per page max |

### The type roles (already coded as `.idx2-*` classes — copy them)

| Class | Family | Size | Use for |
|---|---|---|---|
| `.idx2-h1` | Geist 600 | `clamp(36px, 5.0vw, 64px)` | Hero h1 only |
| `.idx2-h2` | Geist 600 | `clamp(28px, 3.2vw, 42px)` | Section h2 |
| `.idx2-prose` | Source Serif 4 400 | `clamp(18px, 1.4vw, 21px)` | Long-form passages, the handyman explaining something. **Three or fewer per page.** |
| `.idx2-lede` | Geist 400 | `clamp(17px, 1.3vw, 19px)` | Section ledes that don't need the "handyman talking" weight |
| `.idx2-body` | Geist 400 | `16px` | Default body, everything shorter and structural |
| `.idx2-eyebrow` | Geist Mono 600 | `11px` | Section labels — uppercase + green dot prefix |

### The named typography rules (non-negotiable)

**The Mono-for-Numbers Rule.** Geist Mono is reserved for numeric data and code-like labels. **It is not a decoration font.** No mono on body copy, section titles, or "spec sheet" framings. If you want something to feel "engineered," reach for Source Serif 4 instead. Mono only when the substance is genuinely a number, a year, a percentage, a dollar amount, or a code-like enum (`LIVE`, `EXPIRED`, `PASSED`).

**The Earned Italic Rule.** Instrument Serif italic appears at most three times in a single section, and at most a dozen times on the entire page. It is a hand on the shoulder, not a recurring decoration.

**The Long-Form Serif Rule.** Source Serif 4 is reserved for passages 40+ words where the voice is "the handyman explaining something." It is **not** for short labels or UI affordances. Two or three placements per page max.

**The Body Line Length Rule.** Body and lead paragraph max-width: 640px on Geist (~56ch), 620px on Source Serif 4 (~56ch). On wide layouts, the column never expands to fill.

### Color emphasis on headlines (not italics)

When you want to emphasize a phrase inside an `<h1>` or `<h2>`, wrap it in `<em>` and let the CSS handle it:

```html
<h1 class="idx2-h1">
  Know exactly <em>what your home needs.</em>
</h1>
```

```css
.idx2-h1 em {
  font-style: normal;        /* NOT italic */
  color: var(--blue-700);    /* Public Trust Blue */
  letter-spacing: -0.02em;
}
```

**Don't use italic serif on H1/H2 emphasis.** Color does the work.
**Don't use `background-clip: text` gradient on emphasis.** Outside the three earned gradient slots (hero, dial result, final CTA), it's banned.

---

## 6. Spacing tokens

Defined once at the top of the homepage's `<style>` block:

```css
:root {
  --idx2-section: 120px;          /* default vertical section padding */
  --idx2-section-tight: 88px;     /* tightened section padding (e.g. stats band) */
  --idx2-container: 1240px;       /* default container max-width */
  --idx2-narrow: 920px;           /* narrow container for prose blocks */
}
```

**Section padding default:** `padding: var(--idx2-section) 32px;` — vertical 120px, horizontal 32px.
**Hero padding:** `padding: 140px 32px 96px;` (more top breathing room because of the fixed nav).
**Tightened sections (e.g. stats band):** `padding: var(--idx2-section-tight) 32px;`

**The eyebrow-to-h2 distance:** 24px. The h2-to-lede distance: 14-16px. The lede-to-content distance: 32px. **Don't drift these.** Same rhythm everywhere.

---

## 7. Elevation rules

**Flat by default.** Cards, callouts, eyebrows, badges, nav, the stat strip, the service map, the final CTA: **all flat at rest.**

**Lift on state.** Shadows appear on hover, focus, or as a state-change response.

**The Two-Anchor Rule.** Only **two** elements on the entire page carry resting elevation: the hero figure (the deliverable in a slim white frame) and the dial container. Elevating a third element steals weight from the two that earn it.

A 1px hairline border (`var(--gray-100)`) does the visual separation work that a shadow would do in a weaker system.

**Shadow vocabulary (use sparingly):**

```css
/* Hairline lift on hover — almost imperceptible at rest */
box-shadow: 0 1px 2px rgba(10, 16, 32, 0.04), 0 1px 3px rgba(10, 16, 32, 0.05);

/* Card hover end-state, primary CTA elevated focus */
box-shadow: 0 6px 20px -6px rgba(10, 16, 32, 0.10), 0 2px 6px rgba(10, 16, 32, 0.06);

/* Structural anchor — reserved for hero figure and dial */
box-shadow: 0 16px 36px -12px rgba(10, 16, 32, 0.10), 0 4px 10px -4px rgba(10, 16, 32, 0.05);
```

---

## 8. Motion discipline

**The One Motion Moment Rule.** **One choreographed animation per page.** On the homepage, that's the score dial scrolling input-by-input. Every other section is intentionally still.

On a sub-page, the one motion moment should be whatever is the page's signature: a scroll-driven counter on a worked example, a reveal on a funnel viz, etc. **One.** Not two. Not "subtle stagger on every section."

### Hard motion rules

- **Animate `transform` and `opacity` only.** Never animate `width`, `height`, `top`, `left`, `padding`, `margin`. (If you need a bar that grows, use `transform: scaleX()` with `transform-origin: left`.)
- **Use ease-out exponential curves.** `cubic-bezier(0.2, 0.9, 0.3, 1)` is the default. No bounce, no elastic. Bounce reads as 2014 app.
- **Respect `prefers-reduced-motion`.** Wrap any scroll-driven animation in a media query check; paint the final state immediately if the user has reduced motion.
- **Never use `window.addEventListener('scroll')`.** Use ScrollTrigger (GSAP, already loaded via CDN) or `IntersectionObserver`.
- **Hover transitions:** 220ms (`var(--idx2-quick)`) is the default. Never longer than 400ms on hover.

---

## 9. Section pattern (apply to every section on every page)

```html
<section class="idx2-{name}" aria-label="{semantic label}">
  <div class="idx2-{name}-inner">

    <div class="idx2-{name}-head">
      <span class="idx2-eyebrow">The Method</span>
      <h2 class="idx2-h2">Conversational headline. <em>With color emphasis.</em></h2>
      <p class="idx2-lede">
        One or two sentence lede that the handyman would actually say out loud.
      </p>
    </div>

    <!-- the section's actual content -->

  </div>
</section>
```

**Every section has:** an eyebrow, an h2, a lede. **In that order.** Same vertical rhythm site-wide.

**Some sections have a `prose` paragraph instead of a `lede`** — when the voice is the handyman explaining something at length, swap `.idx2-lede` for `.idx2-prose`. Max three `.idx2-prose` placements per page.

---

## 10. Component recipes

These are the patterns to copy verbatim from the homepage. Don't re-implement; lift.

### Eyebrow (the green-dot mono uppercase label)

```html
<span class="idx2-eyebrow">The Method</span>
```

```css
.idx2-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--mono); font-size: 11px; font-weight: 600;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--green-700);
  margin-bottom: 24px;
}
.idx2-eyebrow::before {
  content: ''; width: 6px; height: 6px;
  background: var(--green-500); border-radius: 50%;
  animation: idx2-pulse 2.4s infinite;
}
```

**One per section.** Drop on hero where the section is the page (the page is its own context).

### Primary CTA (the dark blue pill button)

```html
<a href="get-my-score.html" class="idx2-cta">
  Get my report
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
    <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  </svg>
</a>
```

CSS already in `index.html` lines 304-326 — copy verbatim. Padding 18px 32px, full pill radius (`100px`), Public Trust Blue background, white text. Earned shadow at rest (the only resting elevation outside the two anchors). Translates `-2px` on hover; arrow translates `+4px`. Do not modify.

### Secondary affordance (text link with chevron)

```html
<a href="sample-report.html" class="idx2-link">
  See a sample report
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
    <path d="M1 5.5h8M6 1.5l3 4-3 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
</a>
```

No background, no border, no shadow. Public Trust Blue text. On hover, the gap between text and chevron grows from 6px to 10px. That's the only animation.

### Editorial card (default)

White background, hairline border, 20px radius, 32px padding, **flat at rest**, hairline-lifts on hover.

```css
.editorial-card {
  background: var(--white);
  border: 1px solid var(--gray-100);
  border-radius: 20px;
  padding: 32px;
  transition: border-color var(--idx2-quick), transform var(--idx2-quick);
}
.editorial-card:hover {
  border-color: var(--gray-200);
  transform: translateY(-2px);
}
```

**Inside a gray-50 section, the card stays white.** The contrast is the design.

### What NOT to use as a card

**Three identically-styled cards in a row** is banned (the AI feature-row anti-pattern). If you want three things horizontally, use **hairline-separated text columns** (no card backgrounds, no rounded corners, just a `border-right: 1px solid var(--gray-200)` between them). The homepage's "Three steps" section is the template — copy it.

```css
/* Three columns, hairline separated, no cards */
.three-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid var(--gray-200);
  padding-top: 48px;
}
.three-columns > * {
  padding: 0 36px;
  border-right: 1px solid var(--gray-200);
}
.three-columns > *:last-child { border-right: none; }
```

### Eyebrow chip alternative (replaces the banned "pill on hero" pattern)

Legacy pages put a rounded pill badge ("Last verified: April 17, 2026") above the H1. **Don't do this.** Replace with a quiet mono caption above the h2:

```html
<div class="idx2-section-head">
  <span class="idx2-meta">LAST VERIFIED · APR 17, 2026</span>
  <span class="idx2-eyebrow">Massachusetts · Programs</span>
  <h2 class="idx2-h2">The Commonwealth's <em>rebate stack</em>, updated.</h2>
  <p class="idx2-lede">…</p>
</div>
```

```css
.idx2-meta {
  display: block;
  font-family: var(--mono); font-size: 10px; font-weight: 500;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--gray-400);
  margin-bottom: 12px;
}
```

No pill background, no icon, no shadow. Mono uppercase, color `var(--gray-400)`. Stops being a "stamp badge."

### Stats grid (5-up at desktop, 2-up at tablet, 1-up at mobile)

Copy from `index.html` lines 510-589 verbatim. Hairline-bordered, mono numerics, `font-feature-settings: "tnum"`, no card backgrounds inside.

### Trust badges row (Google + BBB)

Copy from `index.html` lines 1719-1764 verbatim. Hairline divider between badges. Quiet, beneath the numeric grid. **Don't add a third badge.** The rule is two earned signals, not a wall of logos.

---

## 11. Copy rules

### Em-dash ban

**No em dashes (`—`) in user copy. Anywhere.** Use:
- **Comma** for clause-level breaks
- **Period + capitalized clause** for stronger breaks
- **Colon** when introducing a list or expansion
- **Parentheses** for genuine asides

If you find an em-dash, it's wrong. Replace mechanically.

### Conversational headlines

Questions, declarations, observations the handyman would say out loud.

| Do | Don't |
|---|---|
| *"Before you say yes to a heat pump, talk to someone who's seen 1,200 of them."* | *"Discover the Power of Heat Pump Optimization."* |
| *"Three steps. No pitch. No pressure."* | *"Our Three-Step Customer Acquisition Funnel."* |
| *"Drop your address. We'll do the math."* | *"Generate Your Personalized Energy Score Today."* |

### CTA phrasing — canonical

The primary CTA on every page is **"Get my report"**. Not "Get my Score," not "Get my Home Efficiency Score," not "Generate my Score." The deliverable is a four-page report. Use the noun for the deliverable.

The secondary affordance is **"See a sample report"** when the destination is `sample-report.html`. Use page-specific link text otherwise.

### Plain-English-or-translated rule

Every technical term gets translated inline in the same sentence:
> *"Heat pump (it's a magic box that pulls warm air out of cold air)."*

No glossary. No footnote. No "see definitions."

### Anti-pitch

**Never** use:
- Urgency ("Limited time! Only 5 spots left!")
- Scarcity ("Don't miss out!")
- Social-proof manipulation ("JOIN 50,000+ HOMEOWNERS!")
- Countdown timers
- Testimonial slideshows
- Fake reviews
- Pre-checked consent boxes

The handyman doesn't need to convince you of anything. He just tells you what he sees.

### Reading level

Body copy targets **Grade 6** reading level. The wise neighbor explains things plainly enough that a five-year-old gets the gist. Run any new copy through a Hemingway-style read; if it scores Grade 9+, it's too dense.

---

## 12. Photography rules

### Direction

**Documentary editorial.** Late-afternoon golden hour. Real homes, real seasons, real people doing real work. Slight 35mm film grain. Shallow depth of field.

### Always allowed

- Real homeowner doing something with their hands (holding a report, adjusting a thermostat, walking out to the porch).
- Real installer at a real job site (with a clipboard, on a roof, at a heat pump).
- A real home in real weather (snow on a Vermont colonial, autumn leaves on a Massachusetts ranch, summer haze on a Florida ranch).
- A clearly-marked illustrated placeholder (watercolor, line drawing) when real photography isn't ready yet.

### Never

- Smiling family in front of perfect house (HomeAdvisor cliché).
- Crossed-arms contractor pose (sales-y stock).
- Modern-glass-house surveillance imagery.
- Generic Unsplash architecture photography.
- AI-generated faces, especially close-ups.
- Solar-installer marketing-style hero shots.

### Canvas color

Warmth comes from the things *inside* the photograph (golden light, wood grain, autumn leaves) — **not** from a tinted background. The canvas around the photograph stays white.

---

## 13. Score IP rule (legal, non-negotiable)

The Home Efficiency Score is computed on an underlying numeric range of **400-800**. That range is intellectual property.

**Never expose the 400-800 numbers on a public page.** Always present the Score as:
- A letter grade (D, C, B, A — and now also D-F for failing-condition homes if applicable)
- A position on the arc gauge
- A descriptive band ("Among the top 20% of New England homes")

If you see `400`, `800`, or any number in that range exposed in user copy or in a UI element, remove it. The dial on the homepage uses letter grades only — that's the canonical pattern.

---

## 14. Accessibility floor

- **WCAG 2.1 AA minimum.** Body text contrast 4.5:1; large text and UI 3:1.
- **`aria-label` on every SVG and figure.** Meaningful, not decorative ("US map: 11 active service-area states highlighted in Public Trust Blue. Remaining states coming soon").
- **`aria-live="polite"` on counters** that scrub during scroll. Don't announce on every tick — announce once at scrub end.
- **`aria-hidden="true"` on decorative SVGs** (chevrons inside CTAs, icons that have a text label next to them).
- **Keyboard navigation works everywhere.** Anything scroll-driven must also reach its final state via keyboard scroll. Nothing requires hover or pointer.
- **`prefers-reduced-motion` respected.** The dial paints its final state immediately under reduced-motion.
- **Color-blind safety.** Any state distinguishable by color must also be distinguished by shape, weight, position, or label. The Score gauge uses both a letter and an arc position. The map uses both color and tooltip text.
- **Skip-link** at the top of every page.
- **Font sizes:** body never below 16px on mobile. UI controls minimum 44×44px touch target.

---

## 15. Anti-patterns — do not ship

A page with any of these is wrong. Migration sweeps should explicitly look for and remove them.

| Anti-pattern | Why it's banned | Fix |
|---|---|---|
| **Em-dash in user copy** (—) | DESIGN.md banned, voice rule | Comma, colon, period, or parens |
| **3-equal-card grid** (3 white cards in a row, identical icon+title+text) | AI feature-row cliché; /taste banned | Hairline-separated columns, OR 2-up zig-zag, OR numbered list |
| **Hero pill-chip floating on H1** (`.problem-chip`, `.state-pill`) | /gpt-taste banned hero stamp/badge | Quiet mono caption above eyebrow |
| **Gradient text on H1 emphasis** (`background-clip: text` outside the 3 earned slots) | DESIGN.md "Don't apply gradient italic outside the three earned slots" | Flat `var(--blue-700)` |
| **Italic serif as decoration** (in funnel-foots, problem-chip-ts, helper notes) | Earned Italic Rule | Drop the italic; let weight do the work |
| **Mono on prose labels** (descriptions, taglines, helper text in mono) | Mono-for-Numbers Rule | Switch to Geist sans |
| **Pure `#000` or `#fff`** outside canvas | DESIGN.md "tint every neutral toward the brand" | `var(--ink)` or `var(--white)` |
| **Side-stripe accent borders** (`border-left: 4px solid` colored) | DESIGN.md banned | Full hairline border, leading numerics, or icon prefix |
| **Worked-example as label/value spec table** (mono columns, `Time / Input / Output / Cost`) | NORAD-console anti-pattern | Conversational paragraph + one earned mono callout for the final figure |
| **Bento grids** (asymmetric tile grids with rounded-square icon tiles) | "AI made this" signal | Editorial-split, hairline columns, or 2-up zig-zag |
| **Perpetual micro-animations** (pulse on every avatar, shimmer on every card) | One Motion Moment Rule | One choreographed moment; everything else still |
| **CTA other than "Get my report"** as primary | Brand consistency | Replace with "Get my report" |
| **Score 400-800 numeric range exposed** | IP rule | Letter grade + arc position only |
| **Stock smiling family / crossed-arms contractor** | Anti-reference | Documentary editorial or illustrated placeholder |
| **"Last verified: April 17, 2026" stale chip** (or any pre-pivot timestamp) | Trust signal goes negative when stale | Auto-bound timestamp, or remove |
| **`var(--serif)` (Instrument Serif) used everywhere** | Instrument Serif italic is the earned-grace-note font, max ~12 instances/page | Drop most uses; let Geist or Source Serif 4 do the work |
| **"Generate my Score" / "Get my Home Efficiency Score" CTA copy** | Pre-pivot phrasing | "Get my report" |
| **`Engineer Next Door` brand voice** | Pre-pivot voice | "Trusted Handyman, Engineering-Backed" |
| **Animating `width`, `height`, `top`, `left`, `padding`, `margin`** | Paint thrash | `transform`, `opacity` only |
| **`window.addEventListener('scroll')`** | Performance trap | GSAP ScrollTrigger or IntersectionObserver |

---

## 16. Page templates (the 5 shapes a sub-page can be)

Every page in the site fits one of these templates. Identify which one your page is, then build from the template.

### A. Standalone editorial page
Used for: `sample-report.html`, `our-installers.html`, `how-our-score-guides-you.html`, `contact.html`.

**Flow:** Hero (with conversational H1, no chip-pill, optional photo or deliverable) → Long-form passage (Source Serif 4) explaining the page's subject → One structural anchor (the deliverable, the funnel, the form) → Final CTA back to homepage.

**Sections:** 3-5. Don't pad with filler.

### B. Category page
Used for: `categories/heating-cooling.html`, `categories/solar.html`, `categories/insulation.html`, `categories/windows-doors.html`, `categories/energy-storage.html`.

**Flow:** Hero → Why this category matters (one Source Serif 4 paragraph) → List of programs in this category (NOT 3-equal cards — use a vertical list with hairline dividers, or 2-up grid) → Final CTA.

**Sections:** 3-4.

### C. State page
Used for: `states/massachusetts.html`, etc. (11 instances).

**Flow:** Hero with 3 state-specific stat callouts (e.g., "$8,500 max heat pump rebate") → List of programs available in this state → One worked example in **prose form** (not a label/value table) → Related states cross-link → Final CTA.

**Sections:** 4-5.

### D. Problem page
Used for: `problems/heating-bill.html`, etc. (6 instances).

**Flow:** Hero with per-problem accent color (using a `--problem-accent` CSS var) → Lede → Upgrade list (**hairline columns or zig-zag, NOT 3-equal cards**) → Context paragraph (Source Serif 4) → Final CTA.

**Sections:** 4. Per-problem accent color is the signature; everything else is shared.

### E. Program page (the most complex)
Used for: `programs/masssave-heat-pump.html`, etc. (58 instances).

**Flow:** Hero with program name + max-rebate stat → Program details (Source Serif 4 explaining what it covers) → Worked example in **prose form** → Timeline (hairline-separated steps, not card grid) → FAQ (`<details>` accordion, not modal) → Related programs → Final CTA.

**Sections:** 5-6.

---

## 17. The shared chrome (copy verbatim, do not modify per-page)

These elements are identical on every page. Copy from `index.html` and don't tweak:

- **`<head>`** font preconnect + Google Fonts link (the Geist + Geist Mono + Source Serif 4 + Instrument Serif loader)
- **`<link rel="stylesheet" href="shared.css">`** (always; never inline these tokens)
- **The `idx2-nav` block** (slim glass pill, dropdowns, brand mark, `Get my report` CTA)
- **The `<footer>` block** (offices, link list, legal)

If you find yourself editing the nav or the footer per-page, stop. Those are shared. Edit them once in the canonical location and propagate.

---

## 18. Quick migration checklist

When migrating a legacy page, run this checklist top to bottom:

**Setup**
- [ ] Open the legacy page and the homepage side by side.
- [ ] Identify which of the 5 templates (Section 16) the page fits.
- [ ] Open `index.html` and copy the closest matching section's HTML+CSS as the starting point.

**Class system**
- [ ] All page-specific classes use `idx2-` prefix (or page-specific scope like `gms-`, never generic `section-`, `card-`, `hero-`).
- [ ] No inline `<style>` blocks for patterns that exist in `shared.css` — use the shared classes.

**Structure**
- [ ] Every section has eyebrow → h2 → lede in that order.
- [ ] Section padding uses `var(--idx2-section)` or `var(--idx2-section-tight)`.
- [ ] Container max-width uses `var(--idx2-container)` or `var(--idx2-narrow)`.

**Typography**
- [ ] Headlines use `.idx2-h1` / `.idx2-h2`.
- [ ] Long-form passages (40+ words, "handyman explaining") use `.idx2-prose` (Source Serif 4). Max 3 per page.
- [ ] Section ledes use `.idx2-lede` (Geist).
- [ ] Mono only on numbers, percentages, dates, dollar amounts, code-like enums.
- [ ] Italic serif (Instrument Serif) appears 3 or fewer times per section, ~12 max per page.
- [ ] Headline emphasis (`<em>` inside `<h1>` / `<h2>`) renders in `var(--blue-700)` flat color, NOT italic.

**Color**
- [ ] No `#000` or `#fff` literal — use `var(--ink)` / `var(--white)`.
- [ ] Public Trust Blue and Savings Green each appear ≤3 times per page.
- [ ] Warm peach (`var(--peach-hero)` / `var(--peach-deeper)`) appears nowhere except hero or dial glow.
- [ ] Gray-50 (`var(--gray-50)`) tonal break appears 1-2 times per page max.

**Components**
- [ ] No 3-equal-card grids — use hairline columns or 2-up zig-zag.
- [ ] No hero pill-chips floating on H1 — use quiet mono caption.
- [ ] No gradient text on H1 emphasis (outside the 3 earned hero/dial/final-CTA slots).
- [ ] No italic serif as decoration in helper labels, taglines, or descriptions.
- [ ] No worked-example label/value tables — render as prose paragraph + earned mono final figure.
- [ ] No side-stripe accent borders.
- [ ] Cards flat at rest, hairline border, hover-only lift. Max 2 anchored elevations per page.

**Copy**
- [ ] Zero em-dashes in user copy. (Run search-replace; double-check the title and meta description.)
- [ ] Primary CTA reads "Get my report".
- [ ] No filler verbs (Elevate, Seamless, Unleash, Synergy, Leverage, Best-in-class).
- [ ] Conversational headlines (questions, observations) — not consultant-speak.
- [ ] Technical terms translated inline in the same sentence.
- [ ] No urgency/scarcity/social-proof manipulation.
- [ ] Reading level ≤ Grade 6 on body copy.
- [ ] Score numeric range (400-800) never exposed.

**Motion**
- [ ] One choreographed motion moment per page max.
- [ ] All animations on `transform` or `opacity` only — no `width`, `height`, `top`, `left`.
- [ ] Ease-out exponential curves; no bounce, no elastic.
- [ ] `prefers-reduced-motion` paints final state immediately.

**Accessibility**
- [ ] Skip-link present at top.
- [ ] Every SVG has `aria-label` (meaningful) or `aria-hidden="true"` (decorative).
- [ ] Counters with `aria-live="polite"`.
- [ ] Body text contrast ≥ 4.5:1; UI ≥ 3:1.
- [ ] Touch targets ≥ 44×44px.
- [ ] Keyboard-only navigation reaches every interactive element.

**Imagery**
- [ ] Documentary editorial only, or clearly-marked illustrated placeholder.
- [ ] No smiling-family, crossed-arms, or modern-glass-house stock.
- [ ] Photo backgrounds stay neutral; warmth comes from inside the photo.

**Shared chrome**
- [ ] Nav block copied verbatim from `index.html`.
- [ ] Footer block copied verbatim from `index.html`.
- [ ] Font loader in `<head>` copied verbatim.

**Final**
- [ ] Page renders cleanly at 320px (mobile-first), 768px (tablet), 1280px (desktop).
- [ ] Lighthouse a11y score ≥ 95.
- [ ] No console errors.
- [ ] No horizontal scrollbar at any viewport width.

---

## 19. Where the canonical answers live

When this document doesn't cover something, the source of truth is:

| Question | Source |
|---|---|
| What's the brand voice? | `PRODUCT.md` § Brand Personality |
| What hex is Public Trust Blue? | `DESIGN.md` § Colors (or `shared.css` `:root`) |
| How is the dial built? | `index.html` lines ~1900-2000 |
| What's the sample report content? | `index.html` § 6 (Karen W. Havener / Worcester) |
| Why was X decided? | `IMPECCABLE-CRITIQUE.md` and `TASTE-CRITIQUE.md` audits |

When in doubt, the homepage is the answer. The homepage is the canonical reference for everything that isn't explicitly written down.

---

*Last updated: 2026-05-09. If this document and the homepage disagree, update this document — don't change the homepage. The homepage is the artifact; this document is the description of it.*
