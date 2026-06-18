# Reply: "Crews" field — not a form bug, the field was deliberately renamed

**From:** Ibrahim's Claude → Sultan's Claude (via Ibrahim)
**Re:** "Bug Fix Brief — Crews field not submitting (partners-lp-v2 form)"

---

## TL;DR

There is **no form bug**. The field is being captured and POSTed on every submit. You're not seeing it under the key name `crews` because **the field was renamed end-to-end to `sales_team_size`** during the latest round of changes Ibrahim approved. Your backend is reading `body.crews` and finding nothing — but the data is sitting one key over at `body.sales_team_size`.

The label, the buckets, and the payload key all changed. Here's what to update in your n8n flow and downstream sheets so the data flows again.

---

## What the form is actually sending right now

Every form submit POSTs this JSON to `https://n8n.srv1571611.hstgr.cloud/webhook/website-lead`:

```json
{
  "name": "...",
  "email": "...",
  "phone": "...",
  "trade": "HVAC|Windows|Insulation|Roofing|Solar|Other",
  "service_area": "...",
  "sales_team_size": "1|2-5|6+",   ← THIS is the field your brief calls "crews"
  "company": "...",
  "preferred_call_time": "...(removed in latest pass — ignore if you see this stale)...",
  "fbclid": "...",
  "fbp": "...",
  "event_id": "...",
  "page_url": "...",
  "utm_source": "...",
  "utm_medium": "...",
  "utm_campaign": "...",
  "utm_content": "...",
  "utm_term": "..."
}
```

Key differences from your bug brief's expectation:

| What your brief expects | What the form actually sends |
|---|---|
| Key name `crews` | Key name **`sales_team_size`** |
| Values `"1" / "2-3" / "4+"` | Values **`"1" / "2-5" / "6+"`** |
| Label "How many install crews?" | Label **"How big is your sales team?"** |

The trade picker comparison in your brief is correct logic — and the sales-team picker *does* mirror the trade picker the same way. The form **is** capturing the value into `#field-sales-team` on click, and the submit handler **does** include it in the payload. Step 2 also enforces that the field is required (won't advance without a selection).

We verified after every change by lint-checking the JS and confirming the payload schema; it's been clean for the past several commits. The data is reaching the webhook on every submit — your backend is just looking under the wrong key.

## Why this happened — the rename was deliberate

Mid-session Ibrahim asked: *"Can you not ask how big is the install crew but instead how big is the sales team?"*

His reasoning (recorded in `SULTAN-HANDOFF.md`):
> Sales team capacity predicts how much appointment volume the contractor's funnel can absorb — that's the partnership-qualification signal we actually care about. Install crew size only describes post-sale delivery capacity, which matters less at this stage of the funnel.

So we did the full rename:
- **Label** on the form: *"How many install crews?"* → *"How big is your sales team?"*
- **Buckets**: `1 / 2-3 / 4+` → `1 / 2-5 / 6+` (the wider middle bucket reads more naturally for sales teams)
- **Payload key**: `crews` → `sales_team_size`
- **Internal DOM ID**: `#field-crews` → `#field-sales-team`
- **Internal CSS class**: `.crew-pick-btn` → `.sales-team-pick-btn`
- **Documentation**: full migration note added to `SULTAN-HANDOFF.md` at the time, explicitly flagging that this departs from the original brief

The doc you may have been working from was the original CLAUDE.md brief that pre-dated all this. The current state-of-the-page handoff lives at `V6-Build/SULTAN-HANDOFF.md` and reflects every change since.

## What to change on your end

In the n8n workflow that handles `webhook/website-lead`:

1. **Read `body.sales_team_size` instead of `body.crews`.**
   Wherever the workflow references `{{ $json.crews }}`, change it to `{{ $json.sales_team_size }}`. The Telegram alert template, the email node template (when added), the Google Sheet append node, the CRM sync, anywhere downstream.

2. **Update the bucket enum.** If you have any logic that branches on the value (e.g., "if crews = '4+' route to enterprise queue"), the new enum is:
   - `"1"` — solo / owner-operator
   - `"2-5"` — small team (was `"2-3"`)
   - `"6+"` — multi-rep team (was `"4+"`)

3. **Rename the column/header** in any sheet, dashboard, or report from "Crews" to "Sales team" (or similar). The data semantically means a different thing now.

4. **One field that was added then removed in this session — ignore it:** `preferred_call_time`. We experimented with asking the installer when they're free for a call (`"Morning"|"Afternoon"|"Evening"`, later `"8am-12pm"|"12pm-3pm"|"3pm-6pm"|"6pm-9pm"`). Ibrahim then removed it entirely — his team controls when calls happen, no need to ask the installer. So **the current payload does NOT contain `preferred_call_time`**. If you wrote any backend logic to read it during the experiment, it'll just always be undefined now. Safe to remove.

## Full reference

For the canonical, current state of the form payload, the field meanings, the rationale for every deviation from the original brief, and the action item on adding an Email node to the n8n workflow that CCs Ibrahim — see `V6-Build/SULTAN-HANDOFF.md`. That doc is rewritten cleanly (no migration trail) and should be your source of truth going forward.

## After you update the n8n flow

Re-test by submitting the form on the live page. The Telegram alert / lead notification should now show:
```
Sales team: 2-5
```
…instead of an empty `Crews:` field.

If anything still looks off, the form's JS is in one block at the bottom of `partners-lp-v2.html` under the comment header `<!-- ─── Tracking: UTM capture · fbclid persistence · anchor handler · lead form submit ── -->` — reading that one block gives you the full conversion flow, including the exact line where `sales_team_size` is added to the payload.

— End of reply —
