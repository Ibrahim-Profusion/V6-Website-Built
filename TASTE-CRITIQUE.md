# /taste-skill critique — ProFusion V6-Build

**Audited:** 86 canonical pages against the **`taste-skill`** lens (`~/.claude/skills/taste-skill/SKILL.md`) and the **`gpt-tasteskill`** lens (`~/.claude/skills/gpt-tasteskill/SKILL.md`).
**Reference docs:** `PRODUCT.md` (brand truth) + `DESIGN.md` (system spec) — **always senior to /taste rules when they conflict.**
**Date:** 2026-05-06.

---

## What /taste asks vs. what ProFusion is

The two `/taste` skills are tuned for SaaS dashboards and React/Tailwind product UIs. ProFusion is a static-HTML editorial brand site. **Most /taste rules transfer; a few directly contradict PRODUCT.md.**

**Where /taste and PRODUCT.md agree** (these become the audit lenses below):
- Reject AI tells (Inter font, pure #000, gradient text on H1, neon glows, Lila/AI-purple).
- No filler verbs ("Elevate / Seamless / Unleash / Synergy / Leverage").
- No generic Jane-Doe / Acme Corp content.
- No Lorem ipsum or Unsplash placeholders.
- 2-3 line hero H1 iron rule (PRODUCT.md tone rules implicitly enforce it via "conversational headlines").
- Anti-card-overuse / no generic 3-equal-cards feature row.
- Performance hygiene (animate transform/opacity, no scroll listeners, no `h-screen`).

**Where /taste and PRODUCT.md disagree** — defer to PRODUCT.md:
- /gpt-taste **mandates** bento grids; PRODUCT.md **bans** them. → No bento.
- /taste **mandates** Framer Motion + spring physics + perpetual micro-animations on every card; PRODUCT.md **mandates** *one* motion moment per page. → One motion moment.
- /taste **bans** serif fonts on dashboards; ProFusion is editorial, not a dashboard. → Source Serif 4 + Instrument Serif italic stay.
- /taste recommends `picsum.photos` placeholders; PRODUCT.md says *"clearly-marked illustrated placeholders age better than bad stock."* → Keep illustrated placeholders.

The findings below only flag where /taste and PRODUCT.md agree, or where /taste catches something PRODUCT.md doesn't explicitly cover.

---

## TL;DR — the headline finding

Site-wide, **ProFusion is in surprisingly good shape on /taste.** The brand discipline already enforced by PRODUCT.md (anti-pitch, plain English, Geist-not-Inter, blue+green not Lila) closes most of /taste's anti-slop checklist by default.

The remaining issues cluster into three buckets:

1. **The 3-equal-cards grid pattern is the dominant slop.** 67 pages, 134 instances. Every problem-page upgrade-grid, every program-page rebate grid, every state-page service grid uses `grid-template-columns: repeat(3, 1fr)` with identically-styled white rounded cards. This is the textbook AI feature-row.
2. **Hero pill-chips floating on H1 text** on 18 pages (every problem + state + installer page) — `/gpt-taste` calls this out by name as a banned hero pattern.
3. **A handful of named hygiene issues** — pure `#000` in one place on the homepage, mono-as-decoration on prose labels, gradient-text H1 emphasis on legacy pages (overlap with /impeccable findings).

None of these change the overall verdict: the brand is intact, the writing is on-voice, the visual system has restraint. The fixes are mechanical and well-bounded.

---

## Severity legend

- **🔴 HIGH** — visible to every visitor, breaks a /taste anti-slop rule that PRODUCT.md also implies.
- **🟡 MED** — pattern-level slop; not catastrophic, but accumulates.
- **🟢 LOW** — engineering hygiene; affects performance/maintainability rather than visible taste.

---

## Cross-cutting findings

### 🔴 HIGH-T1 · The 3-equal-cards grid pattern (67 pages, 134 instances)

**The rule:** /gpt-tasteskill §7 and /taste-skill §3 Rule 4 both call this out:
> *"NO 3-Column Card Layouts: The generic '3 equal cards horizontally' feature row is BANNED. Use a 2-column Zig-Zag, asymmetric grid, or horizontal scrolling approach instead."*
>
> *"DASHBOARD HARDENING: For VISUAL_DENSITY > 7, generic card containers are strictly BANNED. Use logic-grouping via border-t, divide-y, or purely negative space."*

PRODUCT.md echoes this implicitly: *"Identical card grids. Same-sized cards with icon + heading + text, repeated endlessly"* — listed as an absolute ban in /impeccable's shared design laws.

**Distribution:**
| Family | Pages with 3-col card grid | Total instances |
|---|---|---|
| Top-level | 3 / 6 | 8 |
| Categories | 0 / 5 | 0 ✓ |
| Problems | **6 / 6** | 6 |
| States | 0 / 11 | 0 ✓ |
| Programs | **58 / 58** | 120 |

**Where it's used:**
- `problems/*.html` `.upgrade-grid` — three rebate-related upgrade cards in a row, each white, rounded 20px, padded 32px, with title + description + meta line. Textbook.
- `programs/*.html` — multiple instances per page: rebate-amount cards, eligibility-tier cards, "what counts" cards.
- `index.html` — three instances, **but contextually defensible:**
  - Line 910 `.idx2-steps-list` — three columns of *text*, separated by **vertical hairlines, not cards**. The CSS comment explicitly notes *"no cards (avoids the 3-equal-cards ban while honoring the user's request for horizontal arrangement)."* ✓ This is the right way to do "three things horizontally" under /taste.
  - Line 1005, 1236 — verify in context; likely also hairline-separated, not card-boxed.

**The fix pattern.** For every 3-equal-card grid, replace with one of these:

1. **Hairline-separated columns** (the homepage's `idx2-steps-list` solution). Three columns of text/imagery with `border-right: 1px solid var(--gray-200)`, no card backgrounds, no rounded corners. Reads as one continuous block, not three disconnected boxes.
2. **2-up zig-zag** for content-rich items (image left / text right, alternating). Especially strong for the problem upgrade-cards: each upgrade gets its own stripe with imagery and prose.
3. **Asymmetric 2-fr / 1-fr / 1-fr grid** when one item deserves more weight than the others.
4. **Numbered list** (`<ol>` with leading numerics) when the items are sequential or ranked. Removes the "all equal" message and replaces it with hierarchy.

**Recommendation:** treat 3-col card removal as **the single most leveraged visual pivot** in Sprint 3 (template migration). Migrating problems/ + programs/ from 3-card to hairline-column or zig-zag is the highest-impact visual change available — it kills the most prominent AI tell on the site.

---

### 🔴 HIGH-T2 · Hero chip-pills floating on H1 text (18 pages)

**The rule:** /gpt-tasteskill §3:
> *"BANNED IN HERO: Do NOT use arbitrary floating stamp/badge icons on the text. Do NOT use pill-tags under the hero. Do NOT place raw data/stats in the hero."*

**Where it's violated:**
- All 6 `problems/*.html` pages use `.problem-chip` — pill containing icon + label + timestamp directly above the H1.
- All 11 `states/*.html` pages use `.state-pill` — pill containing dot + "Last verified: April 17, 2026" timestamp directly above the H1.
- `our-installers.html` uses `.inst-chip` — pill containing badge + "Last verified" timestamp above the H1.

**Caveat — this is an arguable case.** These chips carry *real, functional content* (the verification timestamp), not decorative branding. The /gpt-taste rule is aimed at decorative pills like `[ NEW ]` or `[ AI POWERED ]` that signal nothing. ProFusion's chips signal data freshness on a rebate-data site, which matters.

**Three options, in order of preference:**

1. **Move the timestamp to the bottom of the hero**, below the CTAs, as a small mono caption: *`Last verified · April 17, 2026 · BGE rate filing.`* Same data, no longer floating on the H1 like a badge.
2. **Inline the timestamp into the lede paragraph's first sentence:** *"Verified April 17, 2026 — Massachusetts remains one of the most rebate-friendly states in America. …"* (replace em-dash with colon per /impeccable HIGH-1).
3. **Keep the chip but drop the icon and the rounded-pill background.** Render as a hairline mono caption: `LAST VERIFIED · APR 17, 2026`. No pill, no icon, no shadow. Mono uppercase, color `var(--gray-400)`, sitting 16px above the H1. Stops being a "stamp badge."

**Strong preference for option 3 across all 18 pages.** It preserves the data, kills the floating-badge AI tell, and matches the homepage's quiet-mono trust-signaling pattern.

---

### 🔴 HIGH-T3 · Pure `#000` in `index.html`

**The rule:** /taste §7 and DESIGN.md both:
> *"NO Pure Black: Never use #000000. Use Off-Black, Zinc-950, or Charcoal."*

**Hit:** `index.html:410` — `.idx2-hero-figure--video .idx2-hero-figure-inner { background: #000; }`. This is the fallback color behind the hero video while it loads. While the video is playing, it's invisible; on slow connections or with JS disabled, a viewer briefly sees pure black before the video paints.

**Fix:** one-line. Replace `#000` with `var(--ink)` (`#0A1020`) or with the brand's near-black (`#0A2E5C` Public Trust Blue Deep — that would be on-brand for a fade-in moment).

```css
.idx2-hero-figure--video .idx2-hero-figure-inner {
  aspect-ratio: 3 / 4;
  background: var(--ink);   /* was #000 */
}
```

---

### 🟡 MED-T4 · Mono used decoratively on prose labels

**The rule:** /taste §3 Rule 1, /gpt-taste §6, and DESIGN.md "Mono-for-Numbers Rule":
> *"Geist Mono is reserved for numeric data and code-like labels. It is not a decoration font."*

This was already flagged in /impeccable MED-9; /taste agrees. Re-listing because /taste places it under "AI tells: typography" — meaning even outside the brand-spec rule, it's a generic-AI-output signature that visitors register subliminally.

**Fix:** see /impeccable HIGH-9. Audit every mono usage against the test *"is the content a number, a year, a percentage, a dollar amount, or a code-like enum (LIVE/EXPIRED/PASSED)?"* If yes, keep mono. If no, switch to Geist sans.

---

### 🟡 MED-T5 · Worked-example block as a label/value table

This was /impeccable MED-5. /taste re-flags it through /taste-skill §3 Rule 4 ("Anti-Card Overuse") and §7 (data presentation slop). The mono label-value rows on programs/* and states/* pages register as "spec-sheet AI output" to the same eye that registers 3-equal-cards.

**Fix:** see /impeccable MED-5 — render the worked example as the handyman explaining it, with one earned mono callout for the final figure.

---

### 🟡 MED-T6 · Numbers on the homepage stat strip are slightly too round

**The rule:** /taste §7 "The 'Jane Doe' Effect":
> *"NO Fake Numbers: Avoid predictable outputs like 99.99%, 50%, or basic phone numbers. Use organic, messy data (47.2%, +1 (312) 847-1928)."*

Today's stat strip:
```
10,000+    4,000+    $30M+    11    40+
```

The `+` suffix saves these from being fake-precision. But "10,000" and "4,000" both round-to-thousand reads as marketing-rounded rather than organic. /taste would prefer:

```
10,847    4,231    $32.4M    11    47
Homes     Homes    Incentives  States  Vetted
scored    upgraded captured    active  installer
                                       partners
```

(numbers illustrative, not real data — pull the actual current values from the system).

**Decide on principle:** is this a *brand stat* (which gets rounded for legibility) or a *real-time stat* (which gets specific for credibility)? PRODUCT.md says *"Numbers when they earn their place. A real dollar figure or a year is sharper than an adjective."* — that argues for specifics. The current treatment is mid-aggressive rounding; pull it one notch toward specificity.

**Lighter fix if you want to keep the round numbers:** drop the `+` suffix (which signals "we don't actually know") and add a small `aria-live="polite"` mono caption underneath: *"Updated quarterly · Q2 2026."* The freshness signal does the work that the `+` was trying to do (without admitting the rounding).

---

### 🟡 MED-T7 · Hero CTA legibility on legacy pages

**The rule:** /gpt-taste §3:
> *"Button Contrast: Buttons must be perfectly legible. Dark background = white text. Light background = dark text. Invisible text is a failure."*

The homepage's `idx2-cta` is dark ink background + white text + rounded pill ✓. Most legacy pages use `btn btn-primary` which is similarly dark blue + white text ✓. **Spot-check `btn-secondary` on white-on-white risks** — `problems/heating-bill.html:114` has `<a href="../index.html#problems" class="btn btn-secondary">Back to problems</a>` and several state pages have similar. Verify the secondary button has a visible boundary on white surfaces (hairline border or filled gray). If it's a borderless white-on-white button relying purely on text color for affordance, /taste would flag it.

**Action:** open shared.css, find `.btn-secondary`, verify it's not white-bg + light-color-text without a hairline border. If it is, add `border: 1px solid var(--gray-200)` or change the background to `var(--gray-50)`.

---

### 🟡 MED-T8 · Performance hygiene — animations on layout properties

**The rule:** /taste §5 Performance Guardrails:
> *"Hardware Acceleration: Never animate top, left, width, or height. Animate exclusively via transform and opacity."*

The homepage idx2 system follows this discipline correctly (transform + opacity only on the dial animation). **Spot-check legacy pages.** Several have `transition: width 0.6s ease` patterns on funnel-bars (`our-installers.html:75`) — that's animating width. Convert to `transform: scaleX()` with a CSS custom property carrying the percent.

```css
/* Before — bad */
.funnel-bar { transition: width 0.6s ease; width: 100%; }
.funnel-bar.is-in { width: 75%; }

/* After — good */
.funnel-bar { transition: transform 0.6s var(--ease-out); transform-origin: left; transform: scaleX(0); }
.funnel-bar.is-in { transform: scaleX(0.75); }
```

Same audit for any expanding/collapsing elements (FAQ accordions, expanding meta strips). If they animate `height: 0 → auto`, switch to `max-height` with a generous limit and ease-out, or use `grid-template-rows: 0fr → 1fr` (the modern technique that avoids paint thrashing).

---

### 🟢 LOW-T9 · Z-index hygiene

**The rule:** /taste §5:
> *"Z-Index Restraint: NEVER spam arbitrary z-50 or z-10 unprompted. Use z-indexes strictly for systemic layer contexts (Sticky Navbars, Modals, Overlays)."*

The homepage uses `z-index: 100` (nav), `z-index: 200` (skip-link). Legacy pages have a few scattered `z-index: 5` / `z-index: 10` instances inside cards and chips that don't appear to need them (no overlapping siblings). Audit and remove unnecessary ones during template migration; keep only for nav, modals (none today), and the dial readout overlay.

---

### 🟢 LOW-T10 · Inline `<style>` per page

(Repeats /impeccable LOW-10 — /taste implicitly agrees: *"Production-Ready Cleanliness: Code must be extremely clean, visually striking, memorable, and meticulously refined in every detail."*)

---

## Page-class observations through the /taste lens

### `index.html` — clears the bar with two cosmetic notes

- ✅ Hero is editorial-split (text left, video right), 2-line H1, conversational copy, organic-ish stats. /taste's recommended hero architectures are exactly what's already shipped.
- ✅ No 3-equal-cards in card form (3-col steps are hairline-separated text).
- ✅ Type stack is Geist + Geist Mono + Source Serif 4 + Instrument Serif — none banned by /taste.
- ✅ Color palette is Public Trust Blue + Savings Green + Warm Peach + neutrals — no Lila, no neon.
- ✅ One motion moment (the dial), single anchor of elevation, no perpetual-loops.
- 🔴 One pure `#000` (HIGH-T3, line 410). Trivial fix.
- 🟡 The five-stat strip's round numbers (MED-T6). Decide between rounded-with-`+` or specific.

---

### `get-my-score.html`

Brand-true (`gms-` prefix). Spot-check for `secondary-button` legibility (MED-T7). Otherwise clears.

---

### `our-installers.html`

- 🔴 Inst-chip floating on hero H1 (HIGH-T2).
- 🔴 Gradient-text on H1 emphasis (overlap with /impeccable HIGH-3).
- 🟡 Funnel-bar animates `width` (MED-T8). Convert to `transform: scaleX`.
- 🟡 Italic-as-decoration in funnel-foot (overlap with /impeccable HIGH-3).
- The funnel viz itself is **not** banned by /taste — it's a clear data-vis pattern, not a decorative AI tell. Keep the structure; restyle with the brand system.

---

### `problems/*.html` (6 pages)

- 🔴 problem-chip on hero H1 (HIGH-T2, ×6).
- 🔴 `.upgrade-grid` is the 3-equal-cards anti-pattern (HIGH-T1, ×6). **This is the single biggest /taste fix on the site by visitor-impact.**
- 🟡 secondary-button legibility check (MED-T7).
- ✅ Headlines are short, conversational, on-voice. No hero floating-stamp icons beyond the chip.

---

### `categories/*.html` (5 pages)

Already clean on most /taste rules. ✅ No 3-card grids found in family. ✅ No hero chips. Bigger issues are /impeccable's brand-system migration debt; /taste is mostly OK here.

---

### `states/*.html` (11 pages)

- 🔴 state-pill on hero H1 (HIGH-T2, ×11).
- 🟡 Worked-example label/value table (MED-T5, on the state pages that include a worked example).
- ✅ No 3-card grids found in family.
- The state-hero photography (`state-hero-img`) when delivered should be documentary-editorial per PRODUCT.md, not Unsplash stock — that's a real pivot point. /taste's anti-Unsplash rule reinforces /impeccable's directive to ship illustrated placeholders rather than bad stock.

---

### `programs/*.html` (58 pages)

- 🔴 3-equal-card rebate grids on every page (HIGH-T1, ×120 instances). **This is the single biggest /taste-blocker for the program template.**
- 🟡 Worked-example tables (MED-T5).
- 🟡 Mono on prose labels (MED-T4).
- ✅ No hero chips on programs/ (they use a `program-hero` block without the floating-pill pattern).
- ✅ Headlines short and on-voice.

---

## Recommended remediation order

This /taste critique is **complementary to** the /impeccable critique. Where they overlap, do the work once — the outcome lands both audits. Where /taste flags things /impeccable doesn't, those go into the same sprints as parallel sub-tasks.

### Sprint 1 (already planned for /impeccable hygiene) — add these:
- **HIGH-T3** swap `#000` to `var(--ink)` in `index.html:410`. One-line edit.
- **HIGH-T2** decide on the timestamp-chip pattern (option 3 recommended above) and apply to all 18 chip-bearing pages mechanically. Pure CSS change — kill `.problem-chip`, `.state-pill`, `.inst-chip` rounded-pill backgrounds, repurpose as quiet mono captions above H1.

### Sprint 2 (top 6 page migrations) — taste sub-tasks:
- **MED-T7** verify secondary-button legibility while migrating each page.
- **MED-T8** convert any width/height animations to transform during migration.

### Sprint 3 (template migrations: categories, states, problems) — taste sub-tasks:
- **HIGH-T1** kill the 3-equal-card pattern in problems/upgrade-grid. Replace with hairline-separated 3-col text OR 2-up zig-zag with imagery. **This is the biggest single visual upgrade in the sprint.**
- **HIGH-T2** retire problem-chip + state-pill in favor of the quiet-mono caption pattern.
- **MED-T6** decide on stat-strip number specificity (homepage stat band).

### Sprint 4 (programs/ batch migration) — taste sub-tasks:
- **HIGH-T1** kill the 3-equal-rebate-card grid across all 58 program pages. Same fix pattern: hairline-separated, or 2-up zig-zag, or numbered list. This is mechanical once the template lift is done.
- **MED-T4** mono-decoration cleanup on program meta labels.
- **MED-T5** worked-example tables → conversational paragraph + earned mono callout.

---

## Where /taste tries to push the project off-brand (do NOT follow)

Listing these explicitly so future runs of `/taste` against this codebase don't get pulled the wrong direction.

1. **Bento grids.** /gpt-taste mandates them. PRODUCT.md bans them: *"Don't build a bento grid. Asymmetric tile grids with rounded-square icon tiles signal 'AI made this.'"* → Defer to PRODUCT.md.
2. **Perpetual micro-animations on every card** ("Pulse, Typewriter, Float, Shimmer, Carousel"). /taste mandates them; PRODUCT.md says *"One moment of motion per page. Everything else holds still."* → Defer to PRODUCT.md.
3. **No Serif fonts on dashboards.** Doesn't apply — ProFusion is editorial, not a dashboard. Source Serif 4 + Instrument Serif italic stay.
4. **Random Python-RNG layout selection.** /gpt-taste prescribes deterministic random layout choice via prompt-character-count modulo. ProFusion has a fixed visual system codified in DESIGN.md. → Defer to DESIGN.md.
5. **shadcn/ui customization.** N/A — ProFusion is plain HTML+CSS.
6. **Magnetic buttons / liquid glass / spring physics.** /taste features-bag. ProFusion is restraint-first; the only motion is the dial. → Defer to PRODUCT.md.

The /taste rules listed in the cross-cutting findings above are the ones that **survive that filter** — i.e., they're aligned with PRODUCT.md and add fresh signal.

---

## What /taste confirms is already strong

1. **Type stack.** Geist + Geist Mono + Source Serif 4 + Instrument Serif — none of /taste's banned fonts (Inter forbidden ×, weak default fonts ×). Brand-true and taste-correct simultaneously.
2. **Color palette.** Two committed accents (blue + green), warm peach as a single grace note, tinted neutrals — no Lila, no neon, no oversaturation. Clears /taste color rules cleanly.
3. **Headline economy.** Every audited H1 fits the 2-3 line iron rule. No "wall of text" hero, no 6-line wrapped catastrophes.
4. **Anti-pitch discipline.** No urgency banners, no "JOIN 50,000+ HOMEOWNERS" social-proof manipulation, no countdown timers, no testimonial slideshows. /taste's "Empty / Loading / Error states must be designed" rule is N/A here (no app UI), but the brand's restraint-first stance is exactly what /taste pushes for in editorial content.
5. **Restraint on motion.** One choreographed moment (the dial) is far closer to /taste's premium-spring-physics ideal than the crypto-bro-style perpetual-everything pattern that /taste ostensibly mandates but which most premium sites correctly ignore. ProFusion is on the right side of this trade.
6. **No broken Unsplash links, no Acme/Nexus, no Lorem ipsum, no Jane Doe avatars.** Site-wide content is real or marked-as-placeholder. Clears /taste's content-slop section.

---

*Critique generated against `taste-skill` and `gpt-tasteskill`. Conflicts with PRODUCT.md/DESIGN.md were resolved in favor of the project specs. Run `/taste` per page during Sprints 3 and 4 as a QA gate alongside `/impeccable critique`.*
