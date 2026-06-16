# Partners LP v2 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `partners-lp-v2.html` as a form-first, sticky-split landing page ("Hormozi bones, handyman skin") per the approved spec, fixing the four diagnosed problems (two front doors, repeated offer, inconsistent CTAs/tone, scattered flow).

**Architecture:** One self-contained HTML file. The body becomes a 2-column split — narrative beats on the left, the existing 3-step form pinned in a sticky right rail — collapsing at ≤920px to a single-column form-hero plus a sticky bottom follow-bar. Eight narrative beats on a calm white canvas with exactly one navy moment (guarantee) and one cream moment (voices). The form's fields, validation, Meta-Pixel `Lead` event, and n8n webhook are preserved as-is; all Calendly code is removed; copy is rewritten in the plain handyman voice with one CTA label.

**Tech Stack:** Vanilla HTML/CSS/JS. Geist + Instrument Serif + **Source Serif 4** (Google Fonts). Meta Pixel + n8n webhook (unchanged). Verified in the browser via the Claude Preview server (ruby httpd serving a `/tmp` copy on port 8137).

**Spec:** `docs/superpowers/specs/2026-06-16-partners-lp-redesign-design.md` — the source of truth for all copy, beats, and decisions. Read it before starting.

---

## File structure

- **Modify:** `partners-lp-v2.html` — the whole page (`<head>` fonts, the `<style>` block, the `<body>` markup, the trailing `<script>`).
- **Reuse in place (do not rewrite logic):** the 3-step form markup (`#lead-form-el`, the trade/crew pickers, `#lead-form-success`) and the tracking `<script>` (UTM/fbclid capture, multi-step controller, pixel `Lead`, webhook POST).
- **Backup:** `partners-lp-v2.html.bak` already exists (pre-redesign safety copy).
- **Preview harness:** `.claude/launch.json` already defines `profusion-static` serving `/tmp/profusion-v6-copy` on `:8137`.

### Preview verification helper (used by every task)

The preview serves a **copy**, so re-sync after each change. Deep-scroll screenshots don't composite reliably and `innerWidth` can read 0 — prefer `preview_snapshot` / `preview_eval` (computed styles) for assertions, and screenshots only for top-of-viewport or section-hoisted checks (memory: hoist a section to `body` top + scroll 0 to capture it).

```bash
# Re-sync edited file (+ assets/logo if the temp copy is fresh) before previewing:
SRC="/Users/ibrahim/Desktop/ProFusion Home Solutions/Website/V6-Build"
DST="/tmp/profusion-v6-copy"
mkdir -p "$DST"; rsync -a "$SRC/images/" "$DST/images/" 2>/dev/null; cp "$SRC/logo.png" "$DST/" 2>/dev/null
cp "$SRC/partners-lp-v2.html" "$DST/partners-lp-v2.html"
```
Then `preview_start {name:"profusion-static"}`, `preview_eval` to navigate to `http://localhost:8137/partners-lp-v2.html`, and assert.

---

## Task 0: Branch, baseline, preview sanity

**Files:** none modified (setup only)

- [ ] **Step 1: Create the work branch** (never build on the `main`/deploy branch)

```bash
cd "/Users/ibrahim/Desktop/ProFusion Home Solutions/Website/V6-Build"
git checkout -b redesign/partners-lp-sticky-split
```

- [ ] **Step 2: Confirm the backup exists**

Run: `ls -la partners-lp-v2.html.bak`
Expected: file present (pre-redesign copy). If missing: `cp partners-lp-v2.html partners-lp-v2.html.bak`.

- [ ] **Step 3: Sync + start preview, screenshot the current page as the "before" baseline**

Use the sync helper above, `preview_start {name:"profusion-static"}`, navigate, `preview_screenshot`. Save mentally as the before-state for comparison.
Expected: current 9-section page renders.

- [ ] **Step 4: Commit the branch point** (no file change yet; tag the starting state)

```bash
git commit --allow-empty -m "chore: start partners-lp sticky-split redesign"
```

---

## Task 1: Add Source Serif 4 + reading token

**Files:** Modify `partners-lp-v2.html` (`<head>` Google Fonts link; `:root` in `<style>`)

- [ ] **Step 1: Add Source Serif 4 to the Google Fonts link**

Find the existing `<link href="https://fonts.googleapis.com/css2?family=Geist...">` and add the Source Serif 4 family. Replace the `family=` query to include:

```
&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600
```

- [ ] **Step 2: Add the reading-serif CSS variable**

In `:root`, after the existing `--display`/`--sans`/`--mono` vars, add:

```css
  --serif-read: 'Source Serif 4', Georgia, 'Times New Roman', serif;
```

- [ ] **Step 3: Verify the font loads**

Sync + preview. Run `preview_network` (filter for `Source+Serif`) OR `preview_eval`:

```js
document.fonts.check("16px 'Source Serif 4'")
```
Expected: network shows the font request 200; `document.fonts.check` returns `true` after load.

- [ ] **Step 4: Commit**

```bash
git add partners-lp-v2.html
git commit -m "feat(lp): load Source Serif 4 + add --serif-read token"
```

---

## Task 2: Page-split skeleton — sticky rail CSS + DOM restructure

This is the structural core. The whole content area (between nav and footer) becomes one grid: `.lp-narrative` (left) + `.lp-rail` (right, sticky). The existing form card moves into `.lp-rail`. Narrative beats become children of `.lp-narrative`. Navy/cream beats are column-width panels, not full-bleed.

**Files:** Modify `partners-lp-v2.html` (`<style>` + `<body>`)

- [ ] **Step 1: Add the split layout CSS** (in the `<style>` block, near the container rules)

```css
/* ── Sticky-split shell ───────────────────────────────── */
.lp-split {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 48px;
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(360px, 1fr);
  gap: 56px;
  align-items: start;
}
.lp-narrative { min-width: 0; display: flex; flex-direction: column; }
.lp-rail { position: sticky; top: 96px; align-self: start; }
@media (max-width: 920px) {
  .lp-split { grid-template-columns: 1fr; gap: 0; padding: 0 24px; }
  .lp-rail { position: static; top: auto; order: -1; margin-bottom: 32px; }
}
@media (max-width: 640px) { .lp-split { padding: 0 20px; } }
```

Notes: `top: 96px` clears the sticky nav (matches existing `scroll-margin-top: 96px`). On mobile the rail un-pins and `order: -1` makes the form the hero.

- [ ] **Step 2: Restructure the body into the split**

Wrap the content between `<nav>` and `<footer>` in `<div class="lp-split">`. Put the existing form card (`#lead-form` and everything inside it — keep its markup and IDs intact) inside `<aside class="lp-rail">`. Put the narrative beats inside `<div class="lp-narrative">` in this order (each beat is added/relocated in later tasks): hero copy (beat 1), beat 2, trust (3), guarantee (4), difference (5), voices (6), faq (7), close (8). For THIS task, move the existing hero-left copy into `.lp-narrative` and the form into `.lp-rail`; leave the other existing sections (`math`, `trust`, `difference`, `scarcity`, `voices`, `guarantee`, `faq`, `closing-cta`) temporarily in place below — they get folded/restyled in Tasks 4-9.

- [ ] **Step 3: Verify the split + sticky on desktop, stack on mobile**

Sync + preview at desktop width. `preview_eval`:

```js
(() => {
  const s = document.querySelector('.lp-split');
  const rail = document.querySelector('.lp-rail');
  return { cols: getComputedStyle(s).gridTemplateColumns, railPos: getComputedStyle(rail).position };
})()
```
Expected desktop: two track widths returned; `railPos === "sticky"`.
Then `preview_resize {preset:"mobile"}` + re-eval: one column; `railPos === "static"`.
Scroll test (desktop): `preview_eval` set `window.scrollTo(0,1000)`, then read the rail's `getBoundingClientRect().top` — it should stay ~96 (pinned), not scroll off.

- [ ] **Step 4: Commit**

```bash
git add partners-lp-v2.html
git commit -m "feat(lp): sticky-split shell — narrative left, pinned form rail right"
```

---

## Task 3: Hero (beat 1) — copy, 4 trade images, cut quick-trade chips

**Files:** Modify `partners-lp-v2.html` (`.lp-narrative` hero block + `<style>`)

- [ ] **Step 1: Set the hero copy** (top of `.lp-narrative`)

Keep H1 "Your first 3 appointments are free." (Instrument Serif, green "free."). Eyebrow = "For installation partners · RI · NH · VT · ME · MD". Sub keeps the offer stack + "Pay only when the homeowner shows." and the single light line "One partner per trade, per territory." (per spec §11.4). Remove the animated `.hero-scarcity` pill.

- [ ] **Step 2: Remove the quick-trade chips** (spec §11.5)

Delete the `.hero-quick-trades` block from the markup AND its event handler in the `<script>` (the `data-quick-trade` listener). The form's Step-1 trade picker in the rail replaces it.

- [ ] **Step 3: Add the 4 trade images as a 2×2 group** (spec §11.3)

Replace the old `.hero-photo-strip` with a 2×2 grid using the existing 4 images (`trade-solar`, `trade-hvac`, `trade-insulation`, `trade-windows`, each `.webp` with `.jpg` fallback and the existing alt text). CSS:

```css
.hero-trades { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 32px; max-width: 460px; }
.hero-trades figure { margin: 0; position: relative; aspect-ratio: 4/3; border-radius: 14px; overflow: hidden; background: var(--gray-100); }
.hero-trades img { width: 100%; height: 100%; object-fit: cover; display: block; }
.hero-trades figcaption { position: absolute; left: 8px; bottom: 8px; padding: 3px 9px; background: rgba(255,255,255,0.92); border-radius: 100px; font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--navy); font-weight: 700; }
@media (max-width: 640px) { .hero-trades { max-width: 100%; } }
```

Caption each with its trade name (signals "we work with these trades").

- [ ] **Step 4: Verify**

Sync + preview. `preview_eval` assert: `.hero-quick-trades` is `null`, `.hero-scarcity` is `null`, `.hero-trades img` length === 4. Screenshot the hero (top of viewport) to eyeball.
Expected: clean hero, 2×2 trade images, form in the rail.

- [ ] **Step 5: Commit**

```bash
git add partners-lp-v2.html
git commit -m "feat(lp): hero copy, 2x2 trade images, drop quick-trade chips + scarcity pill"
```

---

## Task 4: Beat 2 — "Why the first three are free" (replaces the math billboard)

**Files:** Modify `partners-lp-v2.html` (remove `.math` section; add beat 2 to `.lp-narrative`); `<style>`

- [ ] **Step 1: Delete the `.math` section** (`<section class="math" id="math">…</section>`) and its `.math-*` CSS rules.

- [ ] **Step 2: Add beat 2 markup** right under the hero block in `.lp-narrative`:

```html
<section class="beat beat-why">
  <p class="beat-eyebrow">Before you pay us a dollar</p>
  <h2 class="beat-h">Three free, because we&rsquo;ve run the numbers.</h2>
  <p class="beat-read">Installers close about 58 of every 100 appointments we send. So your first three are on us. Run that out, and most partners have booked a job before we&rsquo;ve charged a cent. If the work doesn&rsquo;t earn itself in those three, you walk. No retainers, no contracts, no hard feelings.</p>
</section>
```

- [ ] **Step 3: Add beat + reading-prose CSS** (reusable across beats)

```css
.beat { padding: 64px 0; border-top: 1px solid var(--gray-100); }
.beat:first-child { border-top: none; }
.beat-eyebrow { font-family: var(--mono); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--green-700); margin: 0 0 16px; }
.beat-h { font-family: var(--display); font-weight: 400; font-size: clamp(30px, 3.4vw, 46px); line-height: 1.06; letter-spacing: -0.02em; color: var(--navy); margin: 0 0 20px; }
.beat-read { font-family: var(--serif-read); font-size: 19px; line-height: 1.6; color: var(--gray-700); max-width: 62ch; margin: 0; }
```

- [ ] **Step 4: Verify**

Sync + preview. `preview_eval`: assert `#math` is `null`; assert `.beat-why .beat-read` exists and its computed `font-family` contains `Source Serif`. Screenshot the beat (hoist to top if needed).
Expected: plain-prose beat 2 in Source Serif 4; no billboard.

- [ ] **Step 5: Commit**

```bash
git add partners-lp-v2.html
git commit -m "feat(lp): replace math billboard with plain-voice 'why three free' beat"
```

---

## Task 5: Trust band (beat 3) — 70→58, thin strip

**Files:** Modify `partners-lp-v2.html` (`.trust` section → into `.lp-narrative`; copy fix)

- [ ] **Step 1: Fix the close-rate number.** In the trust markup change the close-rate stat from `~70%` to `58%` (spec §11.1). Keep 4.7 Google, BBB, 90% show.

- [ ] **Step 2: Relocate + restyle** the existing `.trust` strip as beat 3 inside `.lp-narrative` (a thin bordered band, not a boxed section). Keep the existing logo SVGs/markup; adjust to sit as a horizontal strip within the column width.

- [ ] **Step 3: Verify**

Sync + preview. `grep -c '70%' partners-lp-v2.html` for the trust area should be 0 (no stray 70). `preview_snapshot` shows "4.7", "BBB", "90%", "58%". 
Expected: one consistent close number (58%).

- [ ] **Step 4: Commit**

```bash
git add partners-lp-v2.html
git commit -m "feat(lp): trust band as thin strip; close rate 70→58 (consistent)"
```

---

## Task 6: Guarantee (beat 4) — moved up, navy anchor

**Files:** Modify `partners-lp-v2.html` (`.guarantee` → beat 4 navy panel in `.lp-narrative`); `<style>`

- [ ] **Step 1: Relocate** the guarantee to beat 4 position (right after the trust band) in `.lp-narrative`.

- [ ] **Step 2: Restyle as the one navy moment.** A navy panel (column-width), white text, green emphasis. Keep the shield badge from the earlier polish. Copy: "If a confirmed homeowner doesn't show, you don't pay." + the existing detail line. Use full borders/rounded panel (never a side-stripe).

```css
.beat-guarantee { background: var(--navy); color: var(--white); border-radius: 24px; padding: 48px; border-top: none; margin: 64px 0; }
.beat-guarantee .beat-h { color: var(--white); }
.beat-guarantee .beat-read { color: rgba(255,255,255,0.78); }
.beat-guarantee .hl-green { color: var(--green); }
```

- [ ] **Step 3: Verify**

Sync + preview. Hoist `.beat-guarantee` to top + screenshot; confirm navy panel, white text, badge, green emphasis, readable contrast. `preview_eval` check `getComputedStyle(document.querySelector('.beat-guarantee')).backgroundColor` is the navy rgb.
Expected: single dark anchor, high up.

- [ ] **Step 4: Commit**

```bash
git add partners-lp-v2.html
git commit -m "feat(lp): guarantee moved up as the one navy anchor"
```

---

## Task 7: Difference (beat 5) — keep compare, restyle in-column

**Files:** Modify `partners-lp-v2.html` (`.difference` → beat 5 in `.lp-narrative`)

- [ ] **Step 1: Relocate** the existing `.difference` two-column compare ("A typical lead" vs "A ProFusion appointment") into `.lp-narrative` as beat 5. Keep the list content.

- [ ] **Step 2: Restyle** to fit the column: the two columns stack within the narrative width (they're already 2-col; ensure they collapse gracefully at the column's width). The "us" column keeps green emphasis via a **full** border (never a side-stripe). White background.

- [ ] **Step 3: Verify**

Sync + preview. `preview_snapshot` shows both column labels and the check/x list items. Confirm no `border-left`/`border-right > 1px` accent introduced (`grep -nE 'border-(left|right): *[2-9]' partners-lp-v2.html` → none).

- [ ] **Step 4: Commit**

```bash
git add partners-lp-v2.html
git commit -m "feat(lp): difference compare as beat 5, full-border 'us' emphasis"
```

---

## Task 8: Voices (beat 6) — cream moment, anonymized

**Files:** Modify `partners-lp-v2.html` (`.voices` → beat 6 in `.lp-narrative`)

- [ ] **Step 1: Relocate** the existing `.voices` testimonials into `.lp-narrative` as beat 6. Keep both quotes anonymized exactly as-is ("CEO, Puma Home Services" / "CEO, Team Sunshine") per spec §11.2.

- [ ] **Step 2: Restyle as the one cream moment** — a cream-background panel (column-width, rounded), quotes in Instrument Serif. This is the only cream beat on the page.

```css
.beat-voices { background: var(--cream); border-radius: 24px; padding: 44px; border-top: none; margin: 64px 0; }
```

- [ ] **Step 3: Verify**

Sync + preview. `preview_snapshot` shows both quotes + attributions. Hoist + screenshot: warm cream panel reads distinct from the white beats.

- [ ] **Step 4: Commit**

```bash
git add partners-lp-v2.html
git commit -m "feat(lp): voices as the one cream moment (beat 6)"
```

---

## Task 9: FAQ (beat 7) + Close (beat 8) + remove scarcity + unify CTAs

**Files:** Modify `partners-lp-v2.html` (`.faq`, `.closing-cta`, remove `.scarcity`; all CTA labels)

- [ ] **Step 1: Delete the `.scarcity` section** (`<section class="scarcity">…</section>`) and its `.scarcity-*`/`.territories`/`.territory` CSS. (Exclusivity now lives only as the light hero line + an FAQ item.)

- [ ] **Step 2: Relocate FAQ** as beat 7 in `.lp-narrative`. Keep three `<details>` items; ensure one reinforces the no-show promise (the existing pricing/why-different/exclusivity set works — keep exclusivity Q as the light territory mention per §11.4). Plain voice, no em dashes.

- [ ] **Step 3: Relocate the closing CTA** as beat 8 — one quiet line + the single button. Remove the phone "btn-secondary" alt-path (form is the only action); the close CTA scrolls to / focuses the form.

- [ ] **Step 4: Unify every CTA label.** Every button/link that triggers conversion (nav CTA, beat CTAs, close CTA) reads exactly **"Claim my 3 free appointments"** and targets the form (`href="#lead-form"` → existing scroll-to-and-focus handler; on mobile the follow-bar handles reach). Remove the old varied labels ("Get 3 free appointments", "See open territories", "Lock in your area", "Pick a time").

- [ ] **Step 5: Verify**

Sync + preview. `preview_eval`:

```js
[...document.querySelectorAll('a.nav-cta, a.btn-primary, .closing-cta a.btn-primary')].map(a => a.textContent.trim())
```
Expected: every entry is "Claim my 3 free appointments". Assert `.scarcity` is `null`. `preview_snapshot` shows FAQ (3 items) + close.

- [ ] **Step 6: Commit**

```bash
git add partners-lp-v2.html
git commit -m "feat(lp): FAQ + close beats, remove scarcity section, one CTA label everywhere"
```

---

## Task 10: Mobile follow-bar + sticky behavior polish

**Files:** Modify `partners-lp-v2.html` (`<style>` + trailing `<script>`)

- [ ] **Step 1: Add the follow-bar markup** just before `</body>`:

```html
<div class="mobile-cta-bar" id="mobile-cta-bar" hidden>
  <a href="#lead-form" class="mobile-cta-bar-btn">Claim my 3 free appointments
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true"><path d="M1 6h13M10 1l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
  </a>
</div>
```

- [ ] **Step 2: Add follow-bar CSS** (visible only ≤920px)

```css
.mobile-cta-bar { display: none; }
@media (max-width: 920px) {
  .mobile-cta-bar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 90; display: block; padding: 12px 16px calc(12px + env(safe-area-inset-bottom)); background: rgba(255,255,255,0.92); backdrop-filter: saturate(180%) blur(12px); -webkit-backdrop-filter: saturate(180%) blur(12px); border-top: 1px solid var(--gray-100); transform: translateY(120%); transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
  .mobile-cta-bar.is-visible { transform: translateY(0); }
  .mobile-cta-bar-btn { display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; padding: 15px; background: var(--green); color: var(--white); font-family: var(--sans); font-weight: 600; font-size: 16px; border-radius: 100px; }
}
@media (prefers-reduced-motion: reduce) { .mobile-cta-bar { transition: none; } }
```

- [ ] **Step 3: Add follow-bar JS** (in the trailing IIFE; uses IntersectionObserver, no scroll listener)

```js
// Mobile follow-bar: show after the form leaves view, hide near form/footer
(function () {
  var bar = document.getElementById('mobile-cta-bar');
  var form = document.getElementById('lead-form');
  var footer = document.querySelector('.footer');
  if (!bar || !form || !('IntersectionObserver' in window)) return;
  var formVisible = true, footerVisible = false;
  function sync() {
    var show = !formVisible && !footerVisible && window.matchMedia('(max-width: 920px)').matches;
    bar.hidden = false;
    bar.classList.toggle('is-visible', show);
  }
  new IntersectionObserver(function (e) { formVisible = e[0].isIntersecting; sync(); }, { threshold: 0.15 }).observe(form);
  new IntersectionObserver(function (e) { footerVisible = e[0].isIntersecting; sync(); }, { threshold: 0.01 }).observe(footer);
})();
```

The existing `#lead-form` anchor handler already scrolls-to-and-focuses Step 1, so the bar's `href="#lead-form"` reuses it.

- [ ] **Step 4: Verify**

Sync + preview. `preview_resize {preset:"mobile"}`, navigate. `preview_eval`: scroll to ~1500px, then read `document.getElementById('mobile-cta-bar').classList.contains('is-visible')` → `true`. Scroll back to 0 → `false`. Resize desktop → bar `display:none`. Tap test: `preview_click {selector:'.mobile-cta-bar-btn'}` then assert step-1 form is in view / focused.
Expected: bar appears mid-scroll on mobile only, hides at form/footer, jumps to the form on tap.

- [ ] **Step 5: Commit**

```bash
git add partners-lp-v2.html
git commit -m "feat(lp): mobile follow-bar (IntersectionObserver, reduced-motion safe)"
```

---

## Task 11: Remove dead Calendly plumbing; confirm tracking intact

**Files:** Modify `partners-lp-v2.html` (trailing `<script>`)

- [ ] **Step 1: Remove residual Calendly JS** if present: the UTM→Calendly `data-url` passthrough block and the `window.addEventListener('message', … 'calendly.event_scheduled' … fbq('Schedule'))` listener, and any Calendly widget `<script src>`. (The Calendly section markup is already gone.)

- [ ] **Step 2: Confirm the form's success state is confirm-only** — "Got it. We'll be in touch." + "calls within one business day" + "First come, first served". No booking link.

- [ ] **Step 3: Verify tracking preserved**

`grep -nE 'calendly' partners-lp-v2.html` → 0 results. `grep -c "fbq('track', 'Lead'" partners-lp-v2.html` → ≥1. `grep -c 'WEBHOOK_URL' partners-lp-v2.html` → ≥1. Sync + preview, submit the form with test data via `preview_fill`/`preview_click`, then `preview_console_logs` (no errors) and confirm the success state shows.
Expected: Lead pixel + webhook still fire; zero Calendly references; success state confirms only.

- [ ] **Step 4: Commit**

```bash
git add partners-lp-v2.html
git commit -m "chore(lp): strip dead Calendly plumbing; keep Lead pixel + webhook"
```

---

## Task 12: A11y, reduced-motion, responsive cross-check + finalize

**Files:** Modify `partners-lp-v2.html` as needed (fixes found during checks)

- [ ] **Step 1: Reduced-motion + focus** — confirm the existing `@media (prefers-reduced-motion: reduce)` reset still covers the new follow-bar (Task 10 added an explicit guard) and that `:focus-visible` rings apply to the new CTAs and trade-image links. Add rings if any new interactive element lacks one.

- [ ] **Step 2: Contrast + structure audit**

```bash
grep -nE 'border-(left|right): *[2-9]' partners-lp-v2.html   # expect: none (no side-stripes)
grep -c '&mdash;' partners-lp-v2.html                          # expect: 0 in visible copy
```
`preview_eval` a quick contrast spot-check on white-on-navy (guarantee) and green-on-white (CTAs) — both ≥ 4.5:1 for text.

- [ ] **Step 3: Breakpoint sweep** — `preview_resize` at 1280, 920, 640, 380. At each: no horizontal scroll (`document.documentElement.scrollWidth <= clientWidth`), form reachable, beats stack cleanly, follow-bar correct (mobile only). Screenshot 1280 + 390 for the record.

- [ ] **Step 4: Full-page smoke** — load top-to-bottom, `preview_console_logs {level:"error"}` → none. Submit once → success. Reduced-motion emulation (`preview_eval` matchMedia or devtools) → no perpetual motion, follow-bar appears without animating.

- [ ] **Step 5: Final commit + summary**

```bash
git add partners-lp-v2.html
git commit -m "polish(lp): a11y + responsive cross-check across 1280/920/640/380"
```

- [ ] **Step 6: Handoff** — report what changed, attach 1280 + mobile screenshots, and stop for human review before any merge to `main`/deploy. Do NOT merge or push without explicit approval.

---

## Self-review (completed against the spec)

- **Spec coverage:** §3 beats 1-8 → Tasks 3,4,5,6,7,8,9 (close in 9); §4 form mechanics → Tasks 2 (desktop pin) + 10 (mobile bar) + 11 (success/tracking); §5 type → Task 1, voice/CTA → Tasks 4 & 9, color → Tasks 6 (navy) & 8 (cream); removed items (math/scarcity/Calendly/quick-chips) → Tasks 4, 9, 11, 3; §7 a11y/responsive → Task 12; §11 resolved decisions (58%, anonymized, 4 images, light territory, cut chips) → Tasks 5, 8, 3, 3/9, 3. No uncovered requirement.
- **Placeholder scan:** none — every code step shows real CSS/JS/HTML; copy comes from spec §5/§11.
- **Type/name consistency:** class names used consistently across tasks (`.lp-split`, `.lp-narrative`, `.lp-rail`, `.beat`, `.beat-read`, `.beat-guarantee`, `.beat-voices`, `.mobile-cta-bar`/`.is-visible`); IDs reused from the existing file (`#lead-form`, `#lead-form-el`) are not renamed.

## Out of scope (do not do here)
Sibling partner pages; backend/webhook/pixel-config changes; new photography or testimonials; committing to or merging into `main` without approval.
