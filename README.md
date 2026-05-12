# ProFusion v5 — Problem-First Homepage

## What changed from v4

1. **Homepage restructured around homeowner problems, not solutions.** The old solutions grid ("What are you looking to upgrade?") is gone as the primary entry point. It's replaced by six problem-first buttons — "My heating bill is insane," "Cold, drafty rooms," "Want solar, don't know where to start," "Planning to sell soon," "Just bought this place," "My AC is dying." Each maps to a dedicated problem page under `/problems/`. The old solution-first path still exists via the nav mega-dropdown and a demoted chip strip below the problem buttons.

2. **Plumbing & Electrical category removed.** The mega-dropdown column and the category page are gone. Windows & Doors replaces its slot in the navigation and is now populated with all six states' window programs.

3. **Windows & Doors programs added.**
   - MA: MassSave ENERGY STAR Windows ($75/window, single-pane replacement only)
   - RI: RI Energy ENERGY STAR Windows ($3-4/sq ft standard, WAP for income-qualified)
   - ME, NH, VT, CT: Windows bundled into state Weatherization Assistance Programs (linked to each state page)

4. **Federal-expired callouts consolidated.** The "federal 25C and 25D tax credits expired" data-callout on every state and category page is removed. Replaced with a single dedicated explainer at `/2026-changes.html` that covers the full set of 2026 changes (federal expiry, MassSave cap drop, R-410A delisting, Clean Heat RI increase, NE Heat Pump Accelerator launch, Vermont 90% weatherization). Linked from every page's Company footer column.

5. **"Last verified: April 17, 2026" timestamps** added to every state page hero, the homepage hero pill, both new Windows programs, all six problem pages, and the 2026-changes page.

6. **FICO-style percentile on HES card.** The sample card in the hero now reads: "Your 612 beats 34% of New England homes" below the score ring — a credit-score-style social proof line.

7. **Counter numbers rounded** to remove fake specificity: 4,283 → 4,200+ ; $62M → $60M+ ; 94% → "9 in 10" ; average per household → $14,000+.

8. **Minor content fixes.**
   - Testimonial name: Gourishetty V. → Elizabeth E. (still Worcester, MA)
   - "Chapter One / Chapter Two / Chapter Three" section numbering removed
   - Renter/landlord-consent language removed from ME and VT heat pump program eligibility
   - Business-model disclosure line ("We're not installers, and we're not a lead-gen site...") removed from "How it works"
   - Gas-to-heat-pump worked example added to each of the six state pages

9. **States strip moved** from a dedicated homepage section to a minimal above-footer row.

## Structure

```
v5-build/
├── index.html              Homepage (problem-first)
├── 2026-changes.html       NEW — single page explaining all 2026 changes
├── shared.css              Single stylesheet
├── logo.png                Transparent brand logo
├── README.md               This file
├── IMAGE-INVENTORY.md      Every image slot documented
├── states/                 6 state pages — each now has a gas-to-heat-pump
│                           worked example; MA and RI also show their windows
│                           programs in the program list
├── categories/             5 category overview pages (Plumbing & Electrical
│                           removed in v5)
├── problems/               NEW — 6 problem-first landing pages
│                           (heating-bill, drafty, solar, selling, new-home, ac-dying)
├── programs/               18 program deep-dives (16 from v4 + 2 new Windows programs)
└── images/                 Empty — drop real photos here
```

## To preview

1. Double-click index.html — opens in any browser
2. Or: `python3 -m http.server 8000` in this folder, then open localhost:8000
3. Or: drag the folder to netlify.com/drop for an instant live URL

## Key UX behaviors (v5)

- Landing on the homepage shows hero (HES sample card with percentile) → six problem buttons → demoted solutions chips → How it works → Stats → Testimonial → Final CTA → states strip → footer
- Hovering "Programs" in nav still opens the mega-dropdown showing all five categories with state-level detail
- Clicking a problem button goes to a dedicated landing page at `/problems/*.html`
- Each problem page surfaces 2-3 relevant upgrades + a short "context" section
- 2026 program changes are consolidated at `/2026-changes.html` rather than repeated across state pages

## Data sources (April 2026)

All figures verified April 17, 2026. Primary sources:
- MassSave.com (official MA 2026 rebate pages)
- CleanHeatRI.com + energy.ri.gov
- EfficiencyMaine.com (Triennial Plan VI)
- NHSaves.com
- EfficiencyVermont.com
- EnergizeCT.com
- One Big Beautiful Bill Act (Public Law 119-21)
- National Grid RI / RI Energy utility rebate pages
- Federal WAP program documentation (DOE)

## Changelog summary

- Files modified from v4: 29 (shared nav, footer, dropdown, federal-expired removal, timestamps)
- Files added in v5: 9 (6 problem pages, 2 windows programs, 1 explainer)
- Files deleted: 1 (categories/plumbing-electrical.html)
