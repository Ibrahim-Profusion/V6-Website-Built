# CLAUDE.md — Profusion Website (A2P CTA Fix)

> **For Ibrahim:** save this file as `CLAUDE.md` in the root of the website project, then open the project in Claude. It contains everything needed for this one task. Read the whole file before changing anything.

---

## Your role

You're fixing the Profusion Home Solutions marketing website (https://profusion.solutions) so our Twilio **A2P 10DLC** SMS campaign can pass carrier review. This is one focused compliance task — not a redesign.

## Why this matters (context you need)

Profusion sends SMS to customers: appointment reminders, invoice/payment reminders, and customer-support replies. To send those texts legally through US carriers, we must register an **A2P 10DLC campaign** with The Campaign Registry (TCR). Our campaign was **REJECTED** with this exact reason:

> "The campaign submission has been reviewed and rejected due to issues verifying the Call to Action (CTA) provided for the campaign."

**"CTA" means the opt-in.** TCR's reviewer visited our website to verify *how* people consent to receive texts — and couldn't find compliant consent language. Until this is fixed and the campaign is approved, our SMS automations can be blocked. **This is a revenue-critical fix. Treat it as urgent.**

## Root cause (what's broken)

1. The lead form at `/get-my-score.html` collects a phone number but has **no SMS consent disclosure** — nothing saying the user agrees to receive texts, no message/data-rates notice, no STOP/HELP, no link to our policies. Consent is only implied by submitting. Carriers reject this.
2. The site footer does **not** link to the Privacy Policy or Terms of Service. Reviewers expect both linked site-wide.

## What's already correct — DO NOT touch

- `/privacy` is live, complete, and CTIA-compliant. **Do not edit its content.**
- `/terms` is live, complete (New York governing law). **Do not edit its content.**
- Your job is only to **add** consent UI and links. You are not rewriting any policy.

---

## Tasks

### Task 1 — Add SMS consent to the opt-in form (`/get-my-score.html`)

Add this block directly **above the "Get my report" submit button**, after the phone field:

```html
<label style="display:flex; gap:8px; align-items:flex-start; font-size:13px; line-height:1.45; margin:14px 0; text-align:left; color:#444;">
  <input type="checkbox" name="sms_consent" value="yes" style="margin-top:3px; flex-shrink:0;">
  <span>
    By checking this box, I agree to receive recurring text messages from
    Profusion Home Solutions about my home energy report, appointment scheduling,
    billing, and account updates at the phone number provided. Consent is not a
    condition of purchase. Message frequency varies. Message &amp; data rates may apply.
    Reply STOP to opt out, HELP for help. See our
    <a href="/privacy" target="_blank">Privacy Policy</a> and
    <a href="/terms" target="_blank">Terms of Service</a>.
  </span>
</label>
```

**Rules (these are why it got rejected — follow exactly):**
- Checkbox must be **unchecked by default**. A pre-checked consent box is a TCR violation.
- Consent must stay **optional** — the form must still submit and deliver the report if the box is unchecked / no phone is given. (Phone is already optional; keep it that way.)
- If the form posts to GHL or a CRM, also map this checkbox to an "SMS consent" field if one exists — but the **visible disclosure on the page** is what the reviewer checks.

### Task 2 — Add Privacy + Terms links to the footer (every page)

Add to the global/site-wide footer so it appears on the homepage and all pages:

```html
<a href="/privacy">Privacy Policy</a> &middot; <a href="/terms">Terms of Service</a>
```

### Task 3 — Any other phone-collecting form

If other forms collect a phone number (contact page, "For Installers", popups/modals), add the **same consent block** from Task 1 to each one.

---

## Compliance checklist — the consent disclosure MUST include all of these

- [ ] Business name: "Profusion Home Solutions"
- [ ] What messages they'll receive (appointments, billing, account/support)
- [ ] "Message frequency varies"
- [ ] "Message & data rates may apply"
- [ ] "Reply STOP to opt out, HELP for help"
- [ ] Working links to Privacy Policy (`/privacy`) and Terms (`/terms`)
- [ ] "Consent is not a condition of purchase"
- [ ] Checkbox unchecked by default

## Stack note

The snippets are plain HTML with inline styles so they work anywhere. If the site is React / Next / Webflow / WordPress / a GHL funnel / etc., **adapt the markup to that system** — the requirements in the checklist are what matter, not the exact HTML. Match the site's existing fonts/colors so it looks native.

## Definition of done — verify on the LIVE site before telling Sultan

1. Open https://profusion.solutions/get-my-score.html → consent checkbox + full disclosure visible above the submit button; both policy links click through and open correctly.
2. Open the homepage → Privacy Policy + Terms links visible in the footer and working.
3. Checkbox is **unchecked** on load, and the form still submits when it's left unchecked.
4. Changes are **deployed live** (not just local). The reviewer checks the live page.
5. Tell Sultan it's live. He then resubmits the A2P campaign in GHL.

> ⚠️ **Sequencing:** the website must be live **before** Sultan resubmits. If he resubmits while the old page is still up, it gets rejected again for the same reason.
