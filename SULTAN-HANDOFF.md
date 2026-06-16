# Partners LP v2 — Handoff Update for Sultan

**From:** Ibrahim's Claude session
**To:** Sultan (and Sultan's Claude if delegated)
**Date:** June 15, 2026
**Page:** `partners-lp-v2.html` (Ibrahim's local copy — not yet deployed at the time of writing)
**Status:** Hero rebuilt, form wired, page restructured. Awaiting Sultan to add an Email node to the n8n workflow. Awaiting Ibrahim to push the file live.

---

## TL;DR

We followed your brief for the **tracking and form mechanics** exactly. We **diverged from your brief on page architecture** because Ibrahim watched the ads go live, saw ~35–40 visitors convert zero times, and wanted ruthless trimming + a stronger offer hook. The trim cut several sections you listed under "keep what's already good" — `PAIN` (30-to-1), `INTEL PACKAGE`, `RISKWALL`. We added a new `MATH` section that hands the installer the inputs (3 free × ~70% close) and lets them do the multiplication themselves. The hero now leads with the offer "Your first 3 appointments are free." rather than the original "You went into business to install. Not to chase."

The **only thing you need to do** is add an Email node to the existing n8n workflow so Ibrahim gets CC'd on every lead. Details at the bottom.

---

## What Followed Your Brief Exactly

### Pixel + webhook tracking (unchanged from your spec)

- **Pixel ID:** `2004926816821571` (already site-wide, untouched)
- **Webhook URL:** `https://n8n.srv1571611.hstgr.cloud/webhook/website-lead`
- **Event ID dedup pattern:** generated as `web-{Date.now()}-{Math.random().toString(36).slice(2)}`, passed in BOTH the `fbq('track', 'Lead', {}, { eventID })` call AND the webhook POST body's `event_id` field
- **`fbclid` capture:** read from URL on page load, persisted to `localStorage` as `pf_fbclid` so back/forward navigation doesn't lose attribution
- **`_fbp` capture:** read from cookie at submit time
- **Calendly `Schedule` event:** kept your existing handler — still fires `fbq('track', 'Schedule')` when a slot is booked via the inline Calendly embed

### Webhook payload schema (all your required fields + extras)

```json
{
  "name": "<full name>",
  "email": "<email>",
  "phone": "<phone>",
  "trade": "HVAC|Windows|Insulation|Roofing|Solar|Other",
  "service_area": "<towns/counties text>",
  "crews": "1|2-3|4+",
  "fbclid": "<URL fbclid or localStorage fallback, empty if absent>",
  "fbp": "<_fbp cookie value, empty if absent>",
  "event_id": "<same eventID used in fbq call>",
  "page_url": "<window.location.href>",
  "company": "<company name — bonus field not in original spec>",
  "utm_source": "<from URL, empty if absent>",
  "utm_medium": "<from URL, empty if absent>",
  "utm_campaign": "<from URL, empty if absent>",
  "utm_content": "<from URL, empty if absent>",
  "utm_term": "<from URL, empty if absent>"
}
```

Note the **bonus fields** beyond your spec: `company` (collected in Step 2 of the form), and the five `utm_*` fields (passed through for attribution). These are additive — your existing flow can ignore them or use them, your call.

### Form on-page (not in an iframe)

The form submit happens on `profusion.solutions` so the Meta Pixel can see it. That was the whole point of your brief. Calendly is still embedded as the secondary path; we did not remove it.

---

## What's New / Changed Beyond Your Brief

### Page architecture — major restructure

Your brief said "keep what's already good — keep: the '30-to-1' math, the Intel Package section, the lead-vs-appointment comparison, testimonials (Puma, Team Sunshine), the no-show guarantee, the FAQ, BBB/Google badges. You're adding the offer-up-top + the trackable form + tracking code — not rebuilding the page."

Ibrahim overruled this after the initial build. His reasoning (paraphrased):
- The 30-to-1 PAIN section is pessimistic ("your world is broken") and doesn't motivate. Installers are tired at end of day; they don't want to hear about their pain, they want to see what they're being offered.
- Prime Marketing Systems' page (`primemarketingsystems.com/contractor-trial/hvac`) is highly condensed — one offer, one form, one CTA, three proof beats. Ours had six proof beats stacked which diluted everything.
- Long pages don't survive an installer's attention span after a workday.

**Final section list (10 sections, down from ~13):**

1. **HERO** — offer headline (`Your first 3 appointments are free.`) + form (right column)
2. **TRUST STRIP** — Google 4.7 · BBB Accredited · 90%+ show · ~70% close
3. **MATH** (new) — see below
4. **DIFFERENCE** — typical lead vs ProFusion appointment (US column expanded with intel-package wins)
5. **SCARCITY** — 5 launch states + one-per-trade-per-territory
6. **VOICES** — Puma + Team Sunshine testimonials
7. **GUARANTEE** — no-show protection
8. **BOOK** — Calendly inline embed (secondary path)
9. **FAQ** — 3 questions (pricing, why-different, exclusivity)
10. **FINAL CTA + FOOTER**

**Sections cut from your "keep" list (in case you want to push back with Ibrahim):**
- `PAIN` (30-to-1 funnel viz) — replaced by `MATH`
- `PROMISE` ("Not a lead. An appointment." + 90/70/200 stats) — stats absorbed into Trust strip and Math
- `INTEL PACKAGE` (7-bullet magazine spread) — 2 strongest bullets folded into the Difference table's US column
- `RISKWALL` (first-3-free + $0 narrative) — redundant with the new hero, which already leads with the same offer

**Other cuts (these were lower-stakes):**
- Trades band (text strip listing 6 trades)
- Both Cinematic Bands ("handshake at the door" + "calendar already filling") — full-bleed photo interstitials
- Scarcity territory grid trimmed from 11 states (MA/RI/CT/NH/ME/VT/NY/NJ/MD/MI/FL) to the 5 launch territories (RI/NH/VT/ME/MD) — matches the ads
- FAQ trimmed from 5 questions to 3

### The new MATH section (Ibrahim's strongest idea)

Conceptual goal: hand the installer two numbers and let them multiply themselves. Don't make the claim — let them draw it. Hormozi insinuation pattern.

Layout: 3-cell equation. Cream background, big serif numbers.

```
[Eyebrow]      BEFORE YOU PAY US A DOLLAR
[H2]           Three free appointments. ~70% close rate.

  ┌────────┐    ┌────────┐    ┌────────┐
  │   3    │  × │ ~70%   │ =  │   ?    │
  │        │    │        │    │        │
  │ Free   │    │ Avg    │    │ You    │
  │ appts  │    │ close  │    │ do the │
  │ on us  │    │ rate   │    │ math   │
  └────────┘    └────────┘    └────────┘
                                (navy bg, green ?)

[Closer]   That's how confident we are. If the work doesn't earn itself in
           three appointments, you walk. No retainers. No contracts. No obligation.
```

The installer sees `3 × 0.7 = ~2` in their head and lands on "I'd close ~2 deals before paying a dollar." That's the entire pitch.

**Important caveat for you:** the ~70% close rate was already on the live page (from the old `PROMISE` section). If that number is aspirational rather than empirically validated, Ibrahim may want to soften it (e.g., "industry-leading close rates" without a specific number, or "~60% close" if that's more accurate). Same concern for "90%+ show" in the trust strip. Both numbers were already on the page — but they're now in a much more prominent position so the accuracy bar is higher. Worth a check.

### Hero rebuild — what changed

**Old hero (your brief):**
- H1: "You went into business to install. Not to chase."
- Sub: about engaging homeowners on their behalf
- Primary CTA: "See if your area is still open" → `#book` (Calendly section)
- Right column: 2x2 grid of 4 trade photo tiles (Solar / HVAC / Insulation / Windows)

**New hero:**
- Eyebrow: `For installation partners · RI · NH · VT · ME · MD`
- H1: **`Your first 3 appointments are free.`**
- Sub: `No retainers. No setup fees. No contracts. Pay only when the homeowner shows. One partner per trade, per territory.`
- Scarcity strip: pulsing green dot + `Limited launch territories. One partner per trade.`
- **Quick-pick trade chips** (new — Ibrahim addition):
  `HVAC →` `Windows →` `Insulation →` `Roofing →` `Solar →`
  Each chip click selects the matching trade in the form, auto-advances to Step 2, and smooth-scrolls to the form. Skip-Step-1 shortcut.
- Secondary link: `Prefer to book a time? Pick a slot ↓` → `#book`
- Below the form pointer: a slim 4-up trade photo strip (the original photos, repurposed). Hidden on mobile so the form takes priority.
- **Right column: the form card**, with green accent bar across the top, ambient green glow, drop shadow, 3-step progress, and an inline trust strip at the bottom (`★ 4.7 Google · BBB Accredited`).

### Form mechanics

**3 steps**, all in the same on-page form card.
- **Step 1** — Trade picker (6 buttons: HVAC, Windows, Insulation, Roofing, Solar, Other). Auto-advances 220ms after selection.
- **Step 2** — Company name (text), Service area (text), Crews (radio: 1 / 2–3 / 4+)
- **Step 3** — Name (text), Email (email), Phone (tel), Submit button

Submit button copy: **`Claim my 3 free appointments`**

**Validation:** native HTML5 + custom JS. Inline field-level error messages. Email regex + phone digit-count check.

**Submit handler order:**
1. Validate step 3
2. Generate `eventId`
3. Fire `fbq('track', 'Lead', {}, { eventID })`
4. POST payload to webhook with `keepalive: true`
5. On HTTP 200 → show success state. On non-200 or network error → show retry banner ("We couldn't submit your details just now. Please try again, or call (516) 613-3990.") and re-enable the submit button. **Note: the pixel event fires regardless of webhook success** — so Meta sees the conversion even if the webhook fails. The retry banner is for the user only.

**Success state (Ibrahim addition):**
- Green checkmark icon
- "Got it. We'll be in touch."
- "A ProFusion partnerships rep will call you within one business day to confirm your trade and territory."
- **Calendly handoff box** (new — Ibrahim addition): green CTA `Lock a 30-min slot now →` that scrolls to the `#book` Calendly section. Lets high-intent installers self-book immediately instead of waiting 24h for the callback.
- Meta line: "Saving your slot · First come, first served"

### Calendly section — demoted to secondary

- Heading now: `Prefer to book a time directly? Pick a time that works.`
- Sub-copy: "Already filled the form above? Skip this — we'll call you. Want to lock a time right now? Pick a slot below..."
- Embed URL: `https://calendly.com/ibrahim-profusion/30min?hide_event_type_details=1&hide_gdpr_banner=1`
- UTM passthrough preserved — your existing JS appends UTM params to `data-url` before widget.js loads
- `Schedule` event firing preserved

We tried switching the URL to `/15min` per Ibrahim's earlier preference (he wanted a lower-friction time commitment), but Ibrahim doesn't have a 15-min event configured at that slug, so the iframe was rendering blank. Reverted to `/30min`. **When Ibrahim creates a 15-min event in his Calendly, we should swap the URL** in two places (the `data-url` attribute and the fallback link below the embed).

### Mid-page CTAs all funnel to the form

Every mid-page CTA button on the page (after Difference, after Scarcity, after Voices, the closing CTA, the nav CTA) now anchors to `#lead-form` rather than `#book`. The only `#book` anchor left is the hero's deliberate secondary link. This concentrates traffic into the trackable form rather than the un-trackable Calendly iframe.

### Sticky-nav anchor scroll fix

The site nav is `position: sticky; top: 0` and roughly 80px tall. Anchor clicks were landing behind the nav (target's top edge at viewport `y=0` is hidden by the nav). Fixed with `scroll-margin-top: 96px` on `#lead-form` and `#book`, plus a JS click handler in the tracking script that programmatically calls `scrollIntoView({behavior: 'smooth', block: 'start'})` for these two anchors. The handler also focuses the first interactable element of the active form step on `#lead-form` clicks, so even on desktop where the form is already in view, the user gets unmistakable visual feedback that the click "worked."

---

## What You Need To Do

### Action item: add an Email node to the n8n workflow

Ibrahim wants to be CC'd on every lead by email. Cleanest path is for you to add an Email node to the existing `website-lead` workflow.

**Recipient:** `ibrahim@profusion.solutions`

**Suggested subject line:**
`🔥 New partner lead: {{ $json.trade }} in {{ $json.service_area }} — {{ $json.name }}`

**Suggested body (include all fields so Ibrahim can act without logging in anywhere):**

```
Name:        {{ $json.name }}
Email:       {{ $json.email }}
Phone:       {{ $json.phone }}
Trade:       {{ $json.trade }}
Service area: {{ $json.service_area }}
Crews:       {{ $json.crews }}
Company:     {{ $json.company }}

— Source —
Page:        {{ $json.page_url }}
fbclid:      {{ $json.fbclid }}
utm_source:  {{ $json.utm_source }}
utm_campaign: {{ $json.utm_campaign }}
utm_medium:  {{ $json.utm_medium }}
utm_content: {{ $json.utm_content }}
```

That's it. Should be a 2-minute task in the n8n editor.

---

## How to Test the Flow End-to-End

This is the test protocol from your original brief, slightly updated:

1. **Meta Events Manager → ProFusion Web dataset → Test Events** — enter the page URL.
2. **Open the page in incognito**, submit the form with test data → confirm a `Lead` event appears in Test Events with the matching `eventID`.
3. **Confirm your side received the POST** — HTTP 200 response, Telegram alert fires (and once you add the Email node, the email arrives at `ibrahim@profusion.solutions`).
4. **Open the page with `?fbclid=test123`** appended to the URL → submit → confirm `fbclid: "test123"` is in the POST body.
5. **Click the "Lock a 30-min slot now →" button** in the success state → confirm it scrolls to Calendly → book a test slot → confirm `Schedule` event fires in Test Events and Calendly's notification reaches Ibrahim.

---

## Reference Info (for any Claude continuing this work)

### File location
`/Users/ibrahim/Desktop/ProFusion Home Solutions/Website/V6-Build/partners-lp-v2.html`

Single file, ~2570 lines. All CSS is in `<style>` in `<head>`. All JS is at the bottom of `<body>` (before the Calendly widget script).

### Live URL (not yet showing the new build at time of writing)
`https://www.profusion.solutions/partners-lp-v2.html`

### Key DOM IDs

| ID | What it is |
|---|---|
| `#lead-form` | The form card (anchor target for primary CTAs) |
| `#lead-form-el` | The `<form>` element inside the card |
| `#lead-form-success` | The thank-you state (hidden by default, revealed by `.is-visible`) |
| `#lead-form-trust` | The inline trust strip at the bottom of the form card |
| `#lead-step-counter` | The "Step X of 3" element |
| `#lead-progress` | The 3-bar progress indicator |
| `#field-trade` | Hidden input holding selected trade value |
| `#field-crews` | Hidden input holding selected crew-count value |
| `#field-company`, `#field-area`, `#field-name`, `#field-email`, `#field-phone` | Text/email/tel inputs |
| `#lead-submit` | Submit button |
| `#form-submit-error` | Retry banner shown if webhook POST fails |
| `#book` | The Calendly section (anchor target for secondary CTAs) |
| `#math` | The Math section |
| `#faq` | The FAQ section |

### Key class names

| Class | What it controls |
|---|---|
| `.hero-form-card` | The white form card (right column of hero) |
| `.hero-quick-trade` | The 5 trade chips in the hero left column |
| `.trade-pick-btn` | The 6 trade buttons inside form Step 1 |
| `.crew-pick-btn` | The 3 crew-count buttons inside form Step 2 |
| `.form-step` | A form step container (one of 3) — `.is-active` is the visible one |
| `.form-input` | All text/email/tel inputs |
| `.math-eq`, `.math-cell`, `.math-num` | The new MATH section equation cells |
| `.hero-form-success-btn` | The "Lock a 30-min slot now →" green button in the success state |

### Tracking script

The whole tracking script (UTM passthrough, fbclid persistence, anchor click handler, form mechanics, submit handler, success state, Calendly Schedule event listener) lives in **one `<script>` block** at the bottom of `<body>`. Look for the comment header:
`<!-- ─── Tracking: UTM passthrough · fbclid persistence · lead form · Calendly schedule ── -->`

Reading that one block gives you the full conversion flow.

### Dead CSS (cleanup deferred)

The CSS for the cut sections (`.pain`, `.promise`, `.intel`, `.riskwall`, `.band`) was removed during the page restructure. The `.trades-band` CSS still exists as dead code (1 rule + 1 media query) in case the trades-band section is ever brought back; it has no performance impact.

---

## Open Questions / Future Decisions

1. **Are the ~70% close rate and 90%+ show rate numbers empirically backed?** If not, soften the claims. They're in much more prominent positions now (Math section + Trust strip).
2. **15-min Calendly event** — when Ibrahim creates a `/15min` event, swap the embed URL and the fallback link. Will reduce time-commitment friction further.
3. **Web3Forms parallel backup** — currently paused. We can re-wire it as an independent email path that POSTs in parallel with the n8n webhook, so leads survive if either backend goes down. Needs Ibrahim's Web3Forms access key.
4. **The `Lead` event currently fires with an empty params object** `fbq('track', 'Lead', {}, { eventID })`. If you want to enrich the Pixel event with `content_name` (trade), `content_category` (service area), or a `value`, easy to add to the existing call — just say the word.
5. **Live deployment** — the page wasn't deployed at time of writing. Ibrahim is testing locally. The live URL still shows the old build.

---

## Summary in One Paragraph

We honored your tracking spec exactly (Pixel ID, webhook URL, payload schema, `eventID` dedup, `fbclid` + `_fbp` capture, `Schedule` event preservation). The form lives on-page so the Pixel can see the `Lead` event — that's intact. The page architecture diverged from your brief because Ibrahim wanted aggressive trimming after seeing zero conversions on cold ad traffic; several of your "keep" sections (Pain, Intel Package, Riskwall) were cut, and a new `MATH` section was added that hands the installer `3 × ~70% = ?` as an insinuation. Mid-page CTAs all funnel to the form rather than Calendly. Calendly is still embedded as the secondary path, and after form submit a new handoff CTA lets the user self-book immediately instead of waiting on a callback. Only thing you need to do is add an Email node to the n8n workflow that CCs `ibrahim@profusion.solutions` on every lead.

— End of handoff —
