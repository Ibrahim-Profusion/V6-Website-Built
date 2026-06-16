# Partners LP v2 — Handoff Update for Sultan

**From:** Ibrahim's Claude session
**To:** Sultan (and Sultan's Claude if delegated)
**Updated:** June 15, 2026
**Page:** `partners-lp-v2.html` (Ibrahim's local copy — not yet deployed at the time of writing)
**Status:** Hero rebuilt, form wired, Calendly removed entirely, page restructured. Awaiting Sultan to add an Email node to the n8n workflow. Awaiting Ibrahim to push the file live.

---

## TL;DR

We followed your tracking spec exactly. The page architecture changed significantly since your original brief — Ibrahim trimmed aggressively after cold-traffic ads converted at 0%. Three things you need to know up front:

1. **Calendly is gone.** Removed entirely — section, embed, widget script, UTM passthrough, Schedule event listener, all of it. The form is now the only conversion path.
2. **The form is 3 steps, asks 6 things total:** trade, company, service area, sales team size, name, email, phone. We deliberately do not ask the installer when they're free — your team initiates the call when it's convenient for you.
3. **The only thing you need to do** is add an Email node to the existing n8n workflow so Ibrahim gets CC'd on every lead. Details at the bottom.

---

## What Followed Your Brief Exactly

### Pixel + webhook tracking (unchanged from your spec)

- **Pixel ID:** `2004926816821571` (already site-wide, untouched)
- **Webhook URL:** `https://n8n.srv1571611.hstgr.cloud/webhook/website-lead`
- **Event ID dedup pattern:** generated as `web-{Date.now()}-{Math.random().toString(36).slice(2)}`, passed in BOTH the `fbq('track', 'Lead', {}, { eventID })` call AND the webhook POST body's `event_id` field
- **`fbclid` capture:** read from URL on page load, persisted to `localStorage` as `pf_fbclid` so back/forward navigation doesn't lose attribution
- **`_fbp` capture:** read from cookie at submit time

### Webhook payload schema

```json
{
  "name": "<full name>",
  "email": "<email>",
  "phone": "<phone>",
  "trade": "HVAC|Windows|Insulation|Roofing|Solar|Other",
  "service_area": "<towns/counties text>",
  "sales_team_size": "1|2-5|6+",
  "company": "<company name>",
  "fbclid": "<URL fbclid or localStorage fallback, empty if absent>",
  "fbp": "<_fbp cookie value, empty if absent>",
  "event_id": "<same eventID used in fbq call>",
  "page_url": "<window.location.href>",
  "utm_source": "<from URL, empty if absent>",
  "utm_medium": "<from URL, empty if absent>",
  "utm_campaign": "<from URL, empty if absent>",
  "utm_content": "<from URL, empty if absent>",
  "utm_term": "<from URL, empty if absent>"
}
```

**Bonus fields beyond your original spec (additive — your existing flow can ignore them or use them):**
- `sales_team_size` — replaces what your brief called `crews`. We changed the question to "How big is your sales team?" because sales-team size predicts how much appointment volume the contractor's funnel can absorb (a much better partnership-qualifier signal than install crew size, which only describes post-sale delivery capacity).
- `company` — collected in Step 2 of the form
- `utm_*` — passed through for attribution

### Form on-page (not in an iframe)

The form submit happens on `profusion.solutions` so the Meta Pixel can see it. That was the whole point of your brief. **Calendly is no longer present** so this is now the sole conversion path.

---

## What's New / Changed Beyond Your Brief

### Calendly fully removed (significant departure from your brief)

Your brief had Calendly as the existing conversion path and the form was being added as a trackable alternative. Over multiple iterations, Ibrahim chose to:
- Remove the Calendly embed and the entire `BOOK` section
- Remove the Calendly widget script
- Remove the UTM-passthrough-to-Calendly JS
- Remove the `calendly.event_scheduled` listener that fired `fbq('track', 'Schedule')`

**Why:** Ibrahim wanted full operational control of when the call happens. With Calendly, the installer self-books a time slot that may or may not align with when Ibrahim's team can take the call. The form-only path means the lead comes in, Ibrahim's team calls at their convenience within one business day. Simpler.

**Operational impact for you:** the `Schedule` event no longer fires anywhere. The `Lead` event is the only conversion event Meta sees from this page. If you had any Meta campaigns optimizing against `Schedule` for the Calendly-era page, switch optimization target to `Lead`.

### Page architecture — major restructure

Your brief said "keep what's already good — keep: the '30-to-1' math, the Intel Package section, the lead-vs-appointment comparison, testimonials, the no-show guarantee, the FAQ, BBB/Google badges. You're adding the offer-up-top + the trackable form + tracking code — not rebuilding the page."

Ibrahim overruled this after the initial build. His reasoning:
- The 30-to-1 PAIN section is pessimistic ("your world is broken") and didn't motivate. Installers are tired at end of day; they want to see what they're being offered, not hear about their pain.
- Prime Marketing Systems' page (`primemarketingsystems.com/contractor-trial/hvac`) is highly condensed — one offer, one form, one CTA, three proof beats. Ours had six proof beats stacked which diluted everything.
- Long pages don't survive an installer's attention span after a workday.

**Final section list (9 sections, down from ~13):**

1. **HERO** — offer headline (`Your first 3 appointments are free.`) + form (right column)
2. **TRUST STRIP** — Google 4.7 · BBB Accredited · 89% sit · 58% close
3. **MATH** — the insinuation: `3 free × 58% close = ?`
4. **DIFFERENCE** — typical lead vs ProFusion appointment (US column expanded with intel-package wins)
5. **SCARCITY** — 5 launch states + one-per-trade-per-territory
6. **VOICES** — Puma + Team Sunshine testimonials
7. **GUARANTEE** — no-show protection
8. **FAQ** — 3 questions (pricing, why-different, exclusivity)
9. **FINAL CTA + FOOTER**

**Sections cut from your "keep" list:**
- `PAIN` (30-to-1 funnel viz) — replaced by `MATH`
- `PROMISE` ("Not a lead. An appointment." + 90/70/200 stats) — stats absorbed into Trust strip and Math
- `INTEL PACKAGE` (7-bullet magazine spread) — 2 strongest bullets folded into the Difference table's US column
- `RISKWALL` (first-3-free + $0 narrative) — redundant with the new hero, which already leads with the same offer

**Other cuts:** Trades band, both Cinematic Bands, Scarcity territory grid trimmed from 11 states to 5 launch territories (RI/NH/VT/ME/MD), FAQ trimmed from 5 questions to 3, BOOK section (Calendly) removed.

### The MATH section (Ibrahim's strongest narrative move)

Conceptual goal: hand the installer two numbers and let them multiply themselves. Don't make the claim — let them draw it. Hormozi insinuation pattern.

Layout: 3-cell equation. Cream background, big serif numbers.

```
[Eyebrow]      BEFORE YOU PAY US A DOLLAR
[H2]           Three free appointments. 58% close rate.

  ┌────────┐    ┌────────┐    ┌────────┐
  │   3    │  × │  58%   │ =  │   ?    │
  │        │    │        │    │        │
  │ Free   │    │ Avg    │    │ You    │
  │ appts  │    │ close  │    │ do the │
  │ on us  │    │ rate   │    │ math   │
  └────────┘    └────────┘    └────────┘
                                (navy bg, green ?)

[Closer]   That's how confident we are. If the work doesn't earn itself in
           three appointments, you walk. No retainers. No contracts. No obligation.
```

**Numbers confirmed by Ibrahim:** the 58% close rate and 89% sit rate are ProFusion's actual production numbers (not aspirational). Earlier versions of the page had `~70%` close and `90%+` show as placeholders; those have been replaced with the real figures.

### Hero rebuild

**New hero:**
- Eyebrow: `For installation partners · RI · NH · VT · ME · MD`
- H1: **`Your first 3 appointments are free.`**
- Sub: `No retainers. No setup fees. No contracts. Pay only when the homeowner shows. One partner per trade, per territory.`
- Scarcity strip with pulsing green dot
- **Quick-pick trade chips:** `HVAC →` `Windows →` `Insulation →` `Roofing →` `Solar →` — each click selects the matching trade in the form, auto-advances to Step 2, and smooth-scrolls to the form. Skip-Step-1 shortcut.
- Below the trade chips: a slim 4-up trade photo strip (hidden on mobile)
- **Right column: the form card**, with green accent bar across the top, ambient green glow, drop shadow, 3-step progress, and an inline trust strip at the bottom (`★ 4.7 Google · BBB Accredited`)

### Form mechanics (current state — 3 steps)

- **Step 1** — Trade picker (6 buttons: HVAC, Windows, Insulation, Roofing, Solar, Other). Auto-advances 220ms after selection.
- **Step 2** — Company name, Service area, Sales team size (1 / 2–5 / 6+)
- **Step 3** — Name, Email, Phone, Submit

Submit button copy: **`Claim my 3 free appointments`**

**What we deliberately do NOT ask:**
- When they're free for a call. We tried adding a "preferred call time" field; Ibrahim removed it because the team controls when calls happen. Faster form = better conversion, and the team's calendar is the constraint, not the installer's preference.
- Install crew size. We tried that originally per your brief; renamed to sales team size because sales team capacity is what gates appointment volume.

**Validation:** native HTML5 + custom JS. Inline field-level error messages. Email regex + phone digit-count check.

**Submit handler order:**
1. Validate step 3
2. Generate `eventId`
3. Fire `fbq('track', 'Lead', {}, { eventID })`
4. POST payload to webhook with `keepalive: true`
5. On HTTP 200 → show success state. On non-200 or network error → show retry banner ("We couldn't submit your details just now. Please try again, or call (516) 613-3990.") and re-enable the submit button. **The pixel event fires regardless of webhook success** — so Meta sees the conversion even if the webhook fails. The retry banner is for the user only.

**Success state:**
- Green checkmark icon
- "Got it. We'll call you."
- "A ProFusion partnerships rep will give you a call within one business day to confirm your trade and territory."
- "Saving your slot · First come, first served"

### Mid-page CTAs

Every mid-page CTA button on the page (after Difference, after Scarcity, after Voices, the closing CTA, the nav CTA) anchors to `#lead-form`. There are zero remaining `#book` anchors — all gone with Calendly.

### Sticky-nav anchor scroll fix

The site nav is `position: sticky; top: 0` and roughly 80px tall. Anchor clicks were landing behind the nav. Fixed with `scroll-margin-top: 96px` on `#lead-form`, plus a JS click handler that programmatically calls `scrollIntoView({behavior: 'smooth', block: 'start'})` for `#lead-form`. The handler also focuses the first interactable element of the active form step, so even on desktop where the form is already in view, the user gets unmistakable visual feedback that the click "worked."

---

## What You Need To Do

### Action item: add an Email node to the n8n workflow

Ibrahim wants to be CC'd on every lead by email. Cleanest path is for you to add an Email node to the existing `website-lead` workflow.

**Recipient:** `ibrahim@profusion.solutions`

**Suggested subject line:**
```
🔥 New {{ $json.trade }} lead in {{ $json.service_area }} — {{ $json.name }}
```

**Suggested body (include all fields so Ibrahim can act without logging in anywhere):**

```
Name:           {{ $json.name }}
Email:          {{ $json.email }}
Phone:          {{ $json.phone }}
Trade:          {{ $json.trade }}
Service area:   {{ $json.service_area }}
Sales team:     {{ $json.sales_team_size }}
Company:        {{ $json.company }}

— Source —
Page:           {{ $json.page_url }}
fbclid:         {{ $json.fbclid }}
utm_source:     {{ $json.utm_source }}
utm_campaign:   {{ $json.utm_campaign }}
utm_medium:     {{ $json.utm_medium }}
utm_content:    {{ $json.utm_content }}
```

That's it. Should be a 2-minute task in the n8n editor.

### Heads-up: change in Meta optimization target

Since the `Schedule` event no longer fires (no Calendly), if you had any Meta campaigns optimizing against Schedule conversions on this page, switch them to optimize for `Lead`. Lead is now the only conversion event Meta sees from this page.

---

## How to Test the Flow End-to-End

1. **Meta Events Manager → ProFusion Web dataset → Test Events** — enter the page URL.
2. **Open the page in incognito**, fill the form with test data → confirm a `Lead` event appears in Test Events with the matching `eventID`.
3. **Confirm your side received the POST** — HTTP 200 response, Telegram alert fires (and once you add the Email node, the email arrives at `ibrahim@profusion.solutions` with the sales team size in the body).
4. **Open the page with `?fbclid=test123`** appended to the URL → submit → confirm `fbclid: "test123"` is in the POST body.

---

## Reference Info (for any Claude continuing this work)

### File location
`/Users/ibrahim/Desktop/ProFusion Home Solutions/Website/V6-Build/partners-lp-v2.html`

Single file, ~2350 lines. All CSS is in `<style>` in `<head>`. All JS is in one `<script>` block at the bottom of `<body>`.

### Live URL (not yet showing the new build at time of writing)
`https://www.profusion.solutions/partners-lp-v2.html`

### Key DOM IDs

| ID | What it is |
|---|---|
| `#lead-form` | The form card (anchor target for all CTAs) |
| `#lead-form-el` | The `<form>` element inside the card |
| `#lead-form-success` | The thank-you state (hidden by default, revealed by `.is-visible`) |
| `#lead-form-trust` | The inline trust strip at the bottom of the form card |
| `#lead-step-counter` | The "Step X of 3" element |
| `#lead-progress` | The 3-bar progress indicator |
| `#field-trade` | Hidden input holding selected trade value |
| `#field-sales-team` | Hidden input holding selected sales-team-size value |
| `#field-company`, `#field-area`, `#field-name`, `#field-email`, `#field-phone` | Text/email/tel inputs |
| `#lead-submit` | Submit button |
| `#form-submit-error` | Retry banner shown if webhook POST fails |
| `#math` | The Math section |
| `#faq` | The FAQ section |

### Key class names

| Class | What it controls |
|---|---|
| `.hero-form-card` | The white form card (right column of hero) |
| `.hero-quick-trade` | The 5 trade chips in the hero left column |
| `.trade-pick-btn` | The 6 trade buttons inside form Step 1 |
| `.sales-team-pick-btn` | The 3 sales-team-size buttons inside form Step 2 |
| `.form-step` | A form step container (one of 3) — `.is-active` is the visible one |
| `.form-input` | All text/email/tel inputs |
| `.math-eq`, `.math-cell`, `.math-num` | The MATH section equation cells |

### Tracking script

The whole tracking script (UTM capture, fbclid persistence, anchor click handler, form mechanics, submit handler, success state) lives in **one `<script>` block** at the bottom of `<body>`. Look for the comment header:
`<!-- ─── Tracking: UTM capture · fbclid persistence · anchor handler · lead form submit ── -->`

Reading that one block gives you the full conversion flow.

---

## Open Questions / Future Decisions

1. **Confirmed empirical numbers as of June 2026**: 89% sit rate, 58% close rate. Update these in both the Trust strip and the Math section if production numbers shift.
2. **Should the lead notification go anywhere besides email?** Telegram already fires on the existing webhook. Email is the current ask. If Ibrahim wants Slack/SMS too, n8n can fan out.
3. **Web3Forms parallel backup** — currently paused. We can re-wire it as an independent email path that POSTs in parallel with the n8n webhook, so leads survive if either backend goes down. Needs Ibrahim's Web3Forms access key.
4. **The `Lead` event currently fires with an empty params object** `fbq('track', 'Lead', {}, { eventID })`. If you want to enrich the Pixel event with `content_name` (trade), `content_category` (service area), or a `value`, easy to add to the existing call — just say the word.
5. **Live deployment** — the page wasn't deployed at time of writing. Ibrahim is testing locally. The live URL still shows the old build (with Calendly).

---

## Summary in One Paragraph

We honored your tracking spec exactly (Pixel ID, webhook URL, payload schema, `eventID` dedup, `fbclid` + `_fbp` capture). The form lives on-page so the Pixel can see the `Lead` event — that's intact. The page architecture diverged from your brief because Ibrahim wanted aggressive trimming after seeing zero conversions on cold ad traffic; several of your "keep" sections (Pain, Intel Package, Riskwall) were cut, and a new `MATH` section was added that hands the installer `3 × 58% = ?` as an insinuation. **Calendly was removed entirely** — section, embed, widget script, UTM passthrough, Schedule event listener, all of it. The form is now the only conversion path. The form asks 6 things across 3 steps: trade, company, service area, sales team size (1/2-5/6+ — replaces what your brief called `crews`), name, email, phone. We deliberately don't ask the installer when they're free — the team controls when calls happen. Only thing you need to do is add an Email node to the n8n workflow that CCs `ibrahim@profusion.solutions` on every lead. If you had any Meta campaigns optimizing against the `Schedule` event from this page, switch the optimization target to `Lead`.

— End of handoff —
