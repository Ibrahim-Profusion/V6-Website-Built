# /impeccable critique — ProFusion V6-Build

**Audited:** 86 canonical pages (index, 5 categories, 11 states, 6 problems, 58 programs, 5 standalone) plus 8 dormant `index-*` variants.
**Reference:** `PRODUCT.md` (Trusted Handyman, Engineering-Backed) + `DESIGN.md` (white canvas, two committed accents, named rules).
**Date:** 2026-05-06.

---

## TL;DR — the headline finding

The site has **two design systems coexisting in production**.

- **New system (`idx2-` / `gms-` prefix):** `index.html`, `get-my-score.html`. Aligned with PRODUCT.md, DESIGN.md, every named rule.
- **Legacy system (no prefix, generic class names):** the other 84 pages. Pre-pivot voice, banned visual patterns, em-dashes in copy, italic-as-decoration, gradient-text on emphasis, fragmented CTA phrasing.

That schism is the only finding that matters until it's resolved — every other issue below is a symptom of it. The homepage is brand-true; click any link off the homepage and you fall into the old website.

**The single most leveraged action: migrate the legacy pages to the `idx2-`-style system, starting with the 10 pages real visitors land on first** (problems/, get-my-score → already done, sample-report, our-installers, how-our-score-guides-you, the four state hubs that drive the most search traffic). The 58 program pages can stay legacy for one more sprint as long as they don't link off-homepage from `idx2` surfaces (right now they do, via the nav dropdown).

---

## Severity legend

- **🔴 HIGH** — visible to every visitor, breaks brand or named DESIGN.md rule.
- **🟡 MED** — visible on most pages, weakens brand consistency but doesn't break it.
- **🟢 LOW** — engineering / hygiene; not visible day-one but accrues debt.

---

## Cross-cutting findings (apply across multiple pages)

### 🔴 HIGH-1 · Em-dashes in user-visible copy (1,012 instances across 85 pages)

**Status:** DESIGN.md → *"Don't put em dashes in copy or component prose. Use commas, colons, semicolons, periods, parentheses."* PRODUCT.md tone rules → same. Both files explicit.

**Distribution:**
| Family | Pages | Em-dashes | Avg/page |
|---|---|---|---|
| Top-level (index/get-my-score/sample/etc.) | 6 | 18 | 3.0 |
| Categories (5) | 5 | 18 | 3.6 |
| Problems (6) | 6 | 30 | 5.0 |
| States (11) | 11 | 89 | 8.1 |
| **Programs (58)** | **58** | **857** | **14.8** |

**Worst offenders:** every `programs/windows-doors-*.html` and `programs/insulation-*.html` carries 25–38 em-dashes. These are template-generated and nearly identical in structure.

**Fix:** mechanical search/replace, but context-aware:
- ` — ` (space-em-space) at clause break → comma + space, OR period + capitalized clause, depending on whether the second clause stands alone.
- ` — ` introducing a parenthetical → ` (` ... `)`.
- ` — ` listing utilities/products in a list → comma.
- Title em-dashes (e.g. `Sample Report — ProFusion …`) → middle dot ` · ` or pipe ` | ` (already used elsewhere as the title separator).

**Recommend:** write a small script that walks the HTML, skips `<style>`, `<script>`, and `<!-- -->` regions, and produces a side-by-side diff per page for human review before committing. Don't blanket-replace blind; some are inside code/regex/data and shouldn't change.

---

### 🔴 HIGH-2 · CTA phrasing varies four ways

```
 90 × "Generate my Score"
 26 × "Get my Score"
  7 × "Get my Home Efficiency Score"
   ... (homepage standardizes on "Get my report")
```

The handyman doesn't say four different things for the same action. Pick one — the homepage already did: **"Get my report"** (it tracks the actual deliverable, the four-page report, and is plainer English than "Score"). Sweep all 123 CTAs to that string.

Secondary affordance phrasing on the homepage is **"See a sample report"**. Where legacy pages currently say "See sample report" / "View sample" / "Sample report", standardize.

---

### 🔴 HIGH-3 · Banned visual patterns on legacy pages

DESIGN.md has named bans. Legacy pages violate three of them constantly:

1. **Gradient italic via `background-clip: text`** outside the three earned slots.
   - `our-installers.html:19` — `.inst-h1 em` uses `linear-gradient(135deg, var(--blue-700), var(--green-500)); -webkit-background-clip: text;` on the page H1. Per DESIGN.md → *"Don't apply gradient italic outside the three earned slots (hero h1, Transformation result, final CTA)."* This is a sub-page hero, not the homepage hero. Drop to flat `var(--blue-700)`.
   - Multiple other legacy pages do the same on H1/H2 emphasis. Audit & flatten.

2. **Italic serif as recurring decoration** (Earned Italic Rule violation).
   - `our-installers.html` `funnel-foot`, `funnel-num`, `funnel-disclaimer`, `inst-body p em` all render in `var(--serif)` italic. That's italic-serif used as a *type style*, not as punctuation. Rule: **at most three italic moments per section, max one dozen per page.** The funnel section alone exceeds that.
   - Same problem on every program page (italic eyebrow timestamps, italic chip labels, italic helper notes).

3. **Side-stripe accent borders** — spot-check the program pages. The category-badge variant (`program-category-badge.green`) looks fine, but several worked-example and timeline blocks use `border-left: 4px solid var(--blue-700)` patterns. DESIGN.md → *"Don't use side-stripe borders."* Replace with full hairline borders, leading numerics, or icon prefixes.

**Fix:** create a page-level lint script that greps for these patterns and reports occurrences. Add to a pre-commit hook so they don't reappear.

---

### 🔴 HIGH-4 · Stale "Last verified: April 17, 2026" timestamps on 23 pages

Today is 2026-05-06. Three weeks stale. The "freshness chip" is *the* trust signal on data-heavy pages — when it's stale, it does the opposite of what it's supposed to do.

Either:
- **(a) Auto-bind it.** Replace static timestamps with a single shared component that reads from a `data-last-verified` attribute or, better, a build-time injection. One file to update per data refresh.
- **(b) Drop it from pages where it isn't actually being maintained.** A timestamp that's never updated is worse than no timestamp.

**Strong preference for (a).** Trust signals only work when they're true; the chip is doing real work on the program pages where rebate amounts move.

---

### 🟡 MED-5 · Worked-example block reads like a spec sheet

`states/massachusetts.html:118-128`, `programs/masssave-heat-pump.html`, and several others render the worked-example as a **mono-font label-value table**:

```
Installed cost (3-ton ducted, R-32)              $24,000
MassSave whole-home rebate (3 tons × $2,650)    −$7,950
Sizing bonus (Manual J-sized 90-120%)             −$500
NE Heat Pump Accelerator bonus (2026)             −$650
HEAT Loan financing (0% APR, 7-year term)    covers remainder
Net before financing                           ~$14,900
```

DESIGN.md → *"Don't render evidence as a spec sheet. … No 'Time / Input / Output / Cost' tables as the centerpiece of a section. The math is real and important, but the surface should never feel like a NORAD console."*

This block is exactly that. The math is doing real work — keep it — but **render it as the handyman explaining it**:

> *Three-ton ducted heat pump in Natick costs about $24,000 installed. MassSave's whole-home rebate covers $7,950 (three tons at $2,650 each). Size it correctly — Manual J at 90-120% of heating load — and you pick up another $500. The new NE Heat Pump Accelerator bonus adds $650 in 2026. Out of pocket: roughly $14,900, financed at 0% over seven years through the HEAT Loan.*

Same numbers, conversational form. One earned mono callout for the final figure (`~$14,900`). Use this pattern on all 58 program pages — it's the single most brand-defining swap on the legacy side.

---

### 🟡 MED-6 · Card patterns proliferate

Different page templates invent different card types:

- `funnel-frame` / `gate-card` (our-installers)
- `program-block` / `program-card-link` / `worked-example` (states + programs)
- `problem-chip` / `upgrade-card` / `context-section` (problems)
- `state-fact` / `state-pill` (states)
- `idx2-stat` / `idx2-step` / `idx2-problem-card` (homepage)

DESIGN.md spec is two corner-radius classes (`md` 20px, `lg` 28px), white background, hairline border, flat at rest. The legacy cards mostly comply on radius and border but each invents its own padding rhythm and internal grid. **Converge to three card variants:**

1. **Editorial card** (`pad: 32px`, `rounded.md`, hairline, no shadow at rest). Default.
2. **Feature card** (`pad: 44px`, `rounded.lg`, hairline, shadow-lg only at the two structural anchors per page). For Promises / hero figures.
3. **Data card** (`pad: 28px 32px`, `rounded.md`, hairline, mono numerics). For stat blocks & worked-examples *when the conversational form is genuinely worse* — which on most pages is "never."

**Audit by family:** consolidate `funnel-frame`, `gate-card`, `program-block`, `worked-example`, `upgrade-card` into one or two canonical cards in `shared.css`. Today's count is north of 15 distinct card signatures.

---

### 🟡 MED-7 · Two-anchor elevation rule violated by legacy pages

DESIGN.md → *"Only two elements on the entire page carry resting elevation: the hero cartoon (shadow-lg) and the Transformation report card (shadow-lg). Elevating a third element steals weight from the two that earn it."*

`problems/heating-bill.html:135-138` puts `box-shadow: 0 24px 48px -16px rgba(10, 16, 32, 0.18)` on the problem-hero image. That's shadow-lg. But the hero image *is already the visual anchor*; on this template there's no Transformation tile. So one anchor is fine — except `funnel-frame` (our-installers), `program-block` (states/programs), and `worked-example` (programs) also lift at rest. Four elevated elements on some pages.

**Fix:** flat-by-default everywhere. Reserve shadow-lg for *one* anchor per page (the hero figure or the Transformation tile, whichever is present). Cards lift on hover only.

---

### 🟡 MED-8 · Fonts loaded inconsistently per page

- Homepage loads `Geist + Geist Mono + Instrument Serif + Source Serif 4` ✓ (matches DESIGN.md).
- `our-installers.html:10` loads `Geist + Geist Mono + Instrument Serif` only — **missing Source Serif 4**. Long-form passages on that page fall back to Georgia.
- Most program pages: same pattern. Long-form passages render in Georgia (a generic system fallback), which is *not* the brand voice.

**Fix:** Move font loading into `shared.css` via `@import` (or a single shared `<link>` snippet that every page references). One source of truth, one set of fonts, no per-page divergence.

**Bonus:** the homepage loads weights `400;500;600;700` of Geist + `400;500;600` of Source Serif 4. That's six axes. Audit which weights are actually used — DESIGN.md spec uses 400, 500, 600 only. If 700 isn't in the spec, drop it from the load list (~15KB saving on first paint).

---

### 🟡 MED-9 · Mono used decoratively on legacy pages

DESIGN.md → *"The Mono-for-Numbers Rule. Geist Mono is reserved for numeric data and code-like labels. It is not a decoration font."*

Violations on legacy pages:
- `inst-chip-ts` (timestamp in mono — fine, it's a date) ✓
- `funnel-bar-drop` ("dropped at this gate" descriptor in mono) ✗ — that's prose, not a number.
- `cities-label` / `program-category-badge` / `funnel-header-meta` — labels in mono uppercase. Some are arguably "code-like" (`MASSACHUSETTS · PROGRAMS`), some are not. Rule of thumb: **if the content is a noun phrase or a sentence fragment, drop mono.** Reserve mono for: timestamps, dollar amounts, percentages, years, status enums (e.g. `LIVE`, `EXPIRED`).

---

### 🟢 LOW-10 · Inline `<style>` blocks per page

Most legacy pages carry 100-300 lines of inline `<style>`. Some of it is page-unique (the funnel, the dial), but a lot is duplicated copy-paste of patterns that should live in `shared.css`. As components consolidate (HIGH-3, MED-6), pull recurring styles up to `shared.css` and shrink page-level CSS to genuine page-specifics only.

**Today's count:** ~31KB of inline CSS aggregated across program pages alone. Half of that is the same `.program-block`, `.section-eyebrow`, `.cta-strip`, `.btn` patterns repeated 58 times. Lifting them centralizes maintenance and shrinks first-byte payload by ~50% on those pages.

---

### 🟢 LOW-11 · Eight `index-*.html` variants in repo

`index-apple.html`, `index-apple-2.html`, `index-pre-v2-backup.html`, `index-spacex-light.html`, `index-v2.html`, `index-whoop.html`, `index2.html`, `2026-changes.html`. These are exploration / backup files, not published pages.

**Fix:** move them to an `archive/` directory or delete them. Today they're indexable by search engines if anyone links to them, and they bloat any future "find all pages" sweep. Keep `index-pre-v2-backup.html` only if you genuinely need a rollback path; otherwise git history is your backup.

---

### 🟢 LOW-12 · Footer is hardcoded on every page

Every page has its own `<footer>` block with the offices, the office maps, the link list. ~80 lines of identical HTML duplicated 86 times. If you ever need to add a fourth office, change the legal entity name, or update an office address, that's 86 file edits.

**Fix:** when migrating pages to the new system, extract the footer into a single shared partial. If you're not running a build step, at minimum render the footer via a small client-side fetch + insert (`<div id="footer-mount"></div>` + a `footer.html` partial) — graceful degradation as long as the JS loads. Long-term: a static-site generator (Eleventy, Astro, Hugo) ends this category of debt.

---

## Page-class findings

### `index.html` (homepage) — **the bar**

**Verdict:** brand-true. PRODUCT.md and DESIGN.md compliance is high. Zero em-dashes in user copy. Class system fully migrated. One motion moment honored. Two-anchor elevation honored (hero figure + score dial section). Score IP rule honored (letter grades only).

**Minor cleanup:**
- The CSS comment header at line 18 still says `index2.html` — purely cosmetic, but the file is now `index.html`, so update the header to match. Same for the comment block at line 102 *("hero lede, §2 problem passage, §6 deliverable caption, §8 final CTA lede")* — verify these section indexes still line up with current order (Hero → Stats → Steps → Vetting → Score → Problems → Map → Final).
- Line 1719: `<!-- Trust badges: Google rating + BBB rating. Quiet, beneath the stats. -->` — the BBB shield is hand-built SVG (lines 1746-1758). If/when ProFusion gets a real BBB-issued logo asset, swap to that and drop the synthetic one (the brand prefers earned signals over stylized facsimiles).
- The `idx2-` prefix is now misnamed (it was scoped for `index2.html` while it was a parallel file). On the next pass, rename `idx2-` → `pf-` (or `home-`, or just drop the prefix entirely now that the file is `index.html`). Mechanical change, but worth one focused commit.

---

### `get-my-score.html` — **also brand-true**

`gms-` prefix, recently updated, voice and visuals match. One em-dash in copy (`Last verified: April —` style or similar) — sweep with HIGH-1.

---

### `sample-report.html` — **legacy, high-priority migration**

This is the page the homepage hero says "See a sample report" — it's the bridge between landing and conversion. Today:

- Old class system (`sr-`, `nav-`, `simple-`).
- 10 em-dashes in user copy.
- Title still uses em-dash (`Sample Report — ProFusion …`). Replace with middle-dot.
- Page renders the report itself as four full-bleed page mocks. The mocks are decent design but use the old type system — display headlines in old proportions, no Source Serif 4 long-form, the engineering-spec-sheet treatment shows up in a "Reasoning" section.
- Recommend: rebuild this page top-to-bottom as the second migration target after the problems/ family. The hero of this page should be the same `idx2-stats-hero`-style figure (the four-page deliverable), and the body should be a long-form Source Serif 4 walkthrough of what each section means in plain English.

---

### `our-installers.html` — **legacy, narrative-rich, second-priority migration**

This page tells the vetting story (1-in-4 funnel, six gates). It's content-rich and brand-defining. Today:

- Old class system (`inst-`, `funnel-`, `gate-`).
- Gradient-text on H1 emphasis (HIGH-3). Drop to flat blue.
- Funnel viz uses italic-as-decoration in 4+ places (HIGH-3).
- 3 em-dashes (low for the page-class average — copy is reasonably clean here, voice was already pretty good).
- The funnel block itself is a strong visual idea. Keep the structure, restyle to `idx2-` system: white card, hairline, no shadow at rest, mono only on the percent/count, italic only on the punchline ("*1 in 4 make it through*").

---

### `how-our-score-guides-you.html` — **legacy, voice-strong, low migration cost**

2 em-dashes in copy, no banned visual patterns flagged in the audit. Probably the easiest migration: copy the `idx2-` page-shell, lift this page's existing copy into it, restyle the inline blocks. Half a day.

---

### `contact.html` — **legacy, simple page, easy migration**

1 em-dash, no banned patterns, simple structure. Migrate alongside `how-our-score-guides-you.html`.

---

### `categories/*.html` (5 pages) — **template family, batch-migrate**

Five pages, similar shape: hero + program list. Average 3.6 em-dashes, no banned visual patterns flagged. **Treat as a single template migration** — one pass produces five aligned pages.

---

### `problems/*.html` (6 pages) — **template family, batch-migrate, brand-critical**

These are entry points from the homepage's "What's going on at home" section. Six pages, similar shape: chip + h1 + lede + upgrade-grid + context. Average 5.0 em-dashes per page. Each currently uses `--problem-tint` and `--problem-accent` CSS vars per page (line 99 of heating-bill) — a nice touch, keep that pattern.

**Recommendation: migrate this family before the program pages.** The homepage links to all six, they're high-traffic, and the structural shape is consistent enough to migrate as a single template pass.

---

### `states/*.html` (11 pages) — **template family, batch-migrate, second wave**

11 pages, average 8.1 em-dashes. The state hub is a long-form anchor for the program pages it links to. Recommend migrating the four highest-traffic states first (MA, NY, CT, MI by intuition — confirm with analytics) as a second wave after problems/.

State-specific finding: every state page has a `state-hero-img` referencing `../images/state-hero-{state}.png`. Confirm those exist; the description in DESIGN.md ("documentary editorial, golden-hour, real homes, real seasons") is the bar to hit. Stock photography fails here.

---

### `programs/*.html` (58 pages) — **template family, last wave, mechanical migration**

58 pages, average **14.8 em-dashes** per page (worst page hits 38). The em-dash density is so high because the template has many "X — Y, Z" enumerations of utility companies, eligibility tiers, and rebate stack components. These rewrites are formulaic:

- *"administered jointly by the state's utilities — Eversource, National Grid, Berkshire Gas …"* → *"administered jointly by the state's utilities: Eversource, National Grid, Berkshire Gas, …"* (em-dash → colon)
- *"Federal 25C tax credit EXPIRED Dec 31, 2025 — no longer available."* → *"Federal 25C tax credit: EXPIRED Dec 31, 2025. No longer available."* (em-dash → period+capitalized clause)

A first pass can be scripted (em-dash followed by a list of 2+ proper nouns → colon; em-dash at end of a clause → period). A second human pass handles the residual.

These pages are the lowest priority for a *visual* migration (low traffic per page, even if collectively meaningful) but the **highest priority for the mechanical em-dash sweep** because that single change closes 80% of the brand-violation count site-wide.

---

## Recommended remediation order

This is a four-sprint plan. Each sprint is bounded, shippable, and reduces the brand-debt load by a measurable amount.

### Sprint 1 — site-wide hygiene (1-2 days)
1. **HIGH-1** mechanical em-dash sweep (script-assisted, human-reviewed). Closes ~1,000 instances.
2. **HIGH-2** CTA phrasing standardization to *"Get my report"* across all 123 instances.
3. **HIGH-4** stale-timestamp fix (auto-bind or remove). 23 pages.
4. **LOW-11** archive/delete the 8 dormant `index-*.html` variants.

After Sprint 1: legacy pages still look legacy, but they no longer break PRODUCT.md/DESIGN.md *copy* rules. The brand-debt is now purely visual.

### Sprint 2 — top 6 standalone page migrations (3-4 days)
1. `sample-report.html` — bridge page from homepage hero.
2. `problems/*.html` (6 pages, batched as template).
3. `our-installers.html`.
4. `how-our-score-guides-you.html` + `contact.html` (small, batched).

After Sprint 2: every link off the homepage lands on a brand-aligned page.

### Sprint 3 — template migrations (3-4 days)
1. `categories/*.html` (5 pages).
2. `states/*.html` — top 4 by traffic, then the remaining 7.

After Sprint 3: the four "high-altitude" page families (homepage, problems, categories, states) are all on the new system.

### Sprint 4 — programs/ batch migration (2-3 days)
58 pages, mechanical migration via a single template lift. Em-dashes already swept in Sprint 1; visual rebuild is the only remaining work, and the structural shape is uniform enough that one template change ships all 58.

After Sprint 4: 100% migrated.

---

## What NOT to change

A few things the audit confirmed are working — don't touch them:

- **The dial animation on `index.html`.** Single motion moment, four-stage grade morph, image-stack crossfade. Brand-true and unique to this site.
- **The Karen W. Havener / Worcester sample report on `index.html` §6.** Concrete, not stock; the names blur on render but the math is real. Keep this exact pattern when you migrate `sample-report.html`.
- **The trust badges (Google + BBB) in the stats section.** Quiet, hairline-divided, beneath the numbers. This is the right pattern for trust signaling on a page that rejects testimonial slideshows. Don't add a third badge.
- **The 11-state US map on `index.html` §7.** Real geography, color-distinguished active vs. coming-soon, hover tooltips. Solves the original "tile grid felt like a SaaS bento" problem cleanly.
- **The "no urgency, no scarcity, no testimonial spotlights" discipline.** Site-wide, this holds. No countdown timers, no "JOIN 50,000+ HOMEOWNERS" banners, no rotating testimonials. PRODUCT.md anti-pitch principle is intact, even on the legacy pages. That's the most important thing the brand could have right.

---

*Critique generated against PRODUCT.md (Trusted Handyman, Engineering-Backed) and DESIGN.md (white canvas, two committed accents, named rules). For per-page granularity, run `/impeccable critique <path>` with this doc as context.*
