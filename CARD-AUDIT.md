# Card-Pattern Audit — MED-6 (Sprint 5)

_Generated as part of Sprint 5 deferred-items work. Documents the current state and proposes a 3-variant convergence per DESIGN.md._

---

## Current state — 18 distinct card-like class signatures

Cards on the site fall into these named families today. Some are nearly identical (just different classnames); some are genuinely different visual patterns.

| Class | Used on | Pattern |
|---|---|---|
| `.program-block` | states/* (program list) | white card · 32px pad · hairline · shadow-sm at rest, shadow-md on hover |
| `.state-coverage-card` | categories/* (state coverage grid) | white card · 28px pad · hairline · 20px radius · shadow-md on hover |
| `.cat-diagram-card` | categories/* (diagram blocks) | white card · 32px pad · hairline · shadow-md on hover |
| `.context-card` | new program overview pages (3-stat grid) | white card · 28px pad · hairline · 16px radius |
| `.rebates-card` | program pages (rebate list) | white card · 40px pad · hairline · shadow-sm at rest |
| `.pairs-card` | program pages (Pairs With section) | white card · 24px pad · hairline · 12px radius (was side-stripe, now hairline) |
| `.gate-card` | our-installers (six gates) | white card · 32px pad · hairline · flat at rest, hover lift |
| `.funnel-frame` | our-installers (funnel viz) | white card · 32px pad · hairline · shadow-lg AT REST (page anchor) |
| `.guarantee-card` | our-installers (guarantee block) | white card · 40px pad · hairline · shadow-md at rest |
| `.guarantee-block` | (legacy duplicate of guarantee-card) | similar |
| `.example-card` | how-our-score-guides-you | white card · 32px pad · hairline · flat at rest, hover lift |
| `.contact-method` | contact.html | white card · 28px pad · hairline · flat at rest |
| `.contact-promise` | contact.html | white card · 36px pad · hairline · shadow-lg AT REST (page anchor) |
| `.gms-form-card` | get-my-score.html | white card · 40px pad · hairline · shadow-md at rest |
| `.upgrade-card` | problems/* (upgrade grid) | white card · 32px pad · hairline · 20px radius · flat at rest |
| `.problem-chip` | problems/* (header chip) | white pill · 8px pad · hairline · shadow-sm |
| `.idx2-stat` | index.html (stats band) | white card · 24px pad · hairline · 16px radius · flat |
| `.idx2-step` | index.html (steps section) | white card · 32px pad · hairline · 20px radius · flat at rest |

**Patterns within the variation:**
- All are white background with hairline border (`1px solid var(--gray-100)`)
- Padding ranges from 24px → 40px (4 distinct values)
- Border radius: 12px, 16px, 20px, 28px (4 distinct values)
- Most are flat at rest with hover lift; a handful carry resting `shadow-sm` or `shadow-md`; only TWO earn `shadow-lg` at rest (`.funnel-frame`, `.contact-promise`) — the two-anchor rule is honored.

---

## Proposed 3-variant convergence

Per DESIGN.md spec, converge to:

### **`.pf-card`** (Editorial Card — default)
```css
.pf-card {
  background: white;
  border: 1px solid var(--gray-100);
  border-radius: 20px;       /* the "md" radius */
  padding: 32px;
  box-shadow: none;          /* flat at rest */
  transition: transform 0.3s, box-shadow 0.3s;
}
.pf-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
```
**Use for:** the default everywhere. Replaces `.gate-card`, `.example-card`, `.contact-method`, `.upgrade-card`, `.context-card`, `.state-coverage-card`, `.pairs-card`, `.cat-diagram-card`, `.idx2-step`. (~12 of the 18 today.)

### **`.pf-card.is-anchor`** (Feature Card — page anchor)
```css
.pf-card.is-anchor {
  padding: 44px;
  border-radius: 28px;       /* the "lg" radius */
  box-shadow: var(--shadow-lg);
}
```
**Use for:** the ONE element per page that carries resting elevation. Replaces `.funnel-frame`, `.contact-promise`. Two pages currently have an anchor; that's the two-anchor rule and stays exactly two.

### **`.pf-card.is-data`** (Data Card — for stats)
```css
.pf-card.is-data {
  padding: 24px 28px;
  border-radius: 16px;       /* tighter than default */
}
.pf-card.is-data .pf-card-num {
  font-family: var(--mono);
  font-weight: 600;
}
```
**Use for:** stats blocks. Replaces `.idx2-stat`, `.context-card-num` wrapper. Keeps mono numerics; tighter padding density when the card is mostly a number.

---

## What this would look like to migrate

**Phase 1 — Add the 3 canonical classes to shared.css** under "CARD COMPONENTS." Roughly 20 lines of CSS.

**Phase 2 — Migrate the named cards.** Each existing card classname stays as a class on the element (for any per-page overrides), but the rendering happens through `.pf-card`. So:

```html
<!-- BEFORE -->
<div class="state-coverage-card">…</div>

<!-- AFTER -->
<div class="pf-card state-coverage-card">…</div>
```

The `.state-coverage-card` rule then only contains its UNIQUE bits (e.g., the abbr-state-program internal grid). The shared visual treatment (border, radius, padding, shadow) lives on `.pf-card`.

**Phase 3 — Audit and remove the no-longer-needed visual rules** from each card-specific class. Cleanup, not rendering changes.

---

## Estimate to migrate

- **Phase 1:** 30 minutes (write the 3 canonical classes + add to shared.css)
- **Phase 2:** 2-3 hours (touch ~50 HTML files, scriptable but per-card decisions on which existing classes to keep vs. drop)
- **Phase 3:** 1-2 hours (clean up shared.css of duplicate visual rules)

**Total: ~half a day of focused work.**

---

## Why I didn't migrate in this session

Card consolidation is a structural change. While the visual outcome should be identical (same backgrounds, borders, padding, shadows), there's risk:

1. **Selector specificity changes.** Moving styles from `.gate-card` to `.pf-card` could subtly change cascade behavior on pages that rely on more-specific selectors.
2. **Per-page overrides.** Some pages use `.gate-card` not just for visual styling but for layout (e.g., the funnel uses `.funnel-frame` to control its data viz container).
3. **Test surface is large.** Each of the 18 card variants needs a visual diff against pre-migration to confirm nothing shifted.

Best done with you in the room, page by page, eyeballing each card after migration. Plus this work is purely structural cleanup — the visual outcome to a visitor is identical to the current state. **It's debt, not a visible bug.**

---

## Recommendation

Defer to a focused half-day session. The work is real but not urgent — the site is launchable in its current state. The dividend is paid in maintainability: future card additions become one `.pf-card` instance instead of inventing a 19th variant.
