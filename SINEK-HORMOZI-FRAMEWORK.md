# The Sinek-Hormozi Hybrid Framework
*How ProFusion builds high-converting landing pages and marketing.*

**Author note for any Claude reading this:** "Sinek-Hormozi" is not a published framework. It's our internal name for a hybrid we apply: Simon Sinek's WHY-first principles run as the brand voice and trust layer, while Alex Hormozi's offer-first principles run the conversion layer. The two thinkers actually disagree about what should lead — Sinek says lead with purpose, Hormozi says lead with offer. We use them at different layers of the same page. This document explains the blend, the decision rules, and worked examples from the `partners-lp-v2.html` build so you can apply the same framework when extending the site, building new landing pages, writing emails, or scripting ads.

---

## TL;DR

- **Hormozi runs the structure.** Hierarchy of every page is offer-first, proof-second, scarcity-third, risk-reversal-fourth. CTAs are specific and action-verbed. Pages get aggressively trimmed until every section earns its keep.
- **Sinek runs the voice.** The brand says *we exist so installers can install, not chase.* That's the WHY. It shows up in tone, word choice, and what we refuse to talk about (we don't pitch "marketing services"; we talk about the installer's day on the truck).
- **Cold traffic → Hormozi forward.** Warm traffic / brand pages → Sinek forward.
- **The two work together when:** the OFFER (Hormozi) is the proof that we mean the WHY (Sinek). Free appointments aren't a discount — they're how we prove we believe what we say about installers' time.

---

## Part 1 — The Sinek Layer (Brand voice, trust, WHY)

### What Sinek brings

Simon Sinek's core idea: **people don't buy what you do; they buy why you do it.** His Golden Circle frames every business as WHY → HOW → WHAT, but argues that most companies communicate WHAT → HOW → WHY (backwards). The companies that inspire trust and loyalty lead with WHY.

For a B2B installer-acquisition page, the WHY work isn't the headline — it's the *substrate*. It shows up in:

- **What we choose to talk about.** We talk about the installer's calendar, their truck, their chasing-vs-installing time. We don't talk about "marketing automation" or "lead generation funnels." That's a WHY-driven editorial choice.
- **What we refuse to talk about.** We don't pitch services. We don't claim to be a marketing agency. We don't talk about ourselves more than the installer.
- **Tone of voice.** Direct, plainspoken, no jargon. Treats the installer as a peer, not a prospect.
- **Trust signals.** "One partner per trade, per territory" isn't just scarcity — it's a values statement. We're telling installers we won't oversell their market because we believe their margin matters.
- **The riskwall narrative (cut from this build but worth keeping in mind):** "Most lead companies hide behind retainers. They have to. We don't need to." That's the WHY in narrative form — explaining why our offer is possible.

### Sinek moves in the current build

| Move | Where it lives | Why it's Sinek |
|---|---|---|
| Brand voice — installer-as-peer | All section copy, FAQ answers | Tone choice rooted in WHY |
| "You walk in. They're ready." | Difference table (US column) | Reframes the value as the installer's experience, not the service |
| "One partner per trade, per territory" | Scarcity section, FAQ #3, eyebrow chip | Constraint rooted in values, not just scarcity tactic |
| "If we don't earn your business by then, we don't deserve it." | (Cut from this build but retained in voice) | WHY made operational |
| Choosing NOT to use the word "leads" anywhere we control | Throughout — we say "appointments" | A WHY-driven vocabulary distinction. Leads are commodities; appointments are commitments. |

### Sinek principles to apply to any new copy

1. **Start every section by asking: "what's the WHY behind this?"** Not "what does this section say." Why does it exist on the page. If you can't answer, cut it.
2. **Audit vocabulary.** Words like "lead," "automation," "funnel," "agency," "client acquisition" — all WHAT-words. Replace with WHY-words: "appointment," "homeowner," "calendar," "partner," "your truck."
3. **Refuse to compete on features.** Sinek's classic example: Apple doesn't sell faster computers, they sell the belief that you think different. ProFusion doesn't sell "better leads," we sell the belief that installers should be installing.
4. **Make the WHY visible in policy.** "One per territory" isn't a marketing slogan — it's an actual operational rule. WHY needs to show up in what you DO, not just what you SAY. (Hormozi calls this "make the offer match the promise.")

---

## Part 2 — The Hormozi Layer (Conversion, offer, structure)

### What Hormozi brings

Alex Hormozi's core framework is the **Value Equation**:

```
            Dream Outcome × Perceived Likelihood
Value  =  ─────────────────────────────────────────
              Time Delay × Effort & Sacrifice
```

To maximize perceived value on a landing page, you push UP on the numerator (bigger outcome, more believable) and DOWN on the denominator (faster, easier). Every section of a high-converting page is doing one of these four moves. If a section isn't, cut it.

Hormozi's secondary moves we use heavily:
- **Risk reversal** — take the risk off the customer's plate. ("First 3 free. No retainers. No contracts. You walk if it doesn't earn itself.")
- **Insinuation > Direct Claim** — hand them the inputs and let them do the math. The customer who concluded a thing themselves believes it stronger than a thing you told them.
- **Real scarcity > Fake urgency** — actual constraints (one partner per trade per area) build credibility; fake countdowns destroy it.
- **Specific numbers > Vague claims** — "58% close" beats "industry-leading conversion."
- **Pre-handle objections** — the FAQ is not for SEO; it's for closing the skeptical buyer's last open loop.
- **Sell the result, not the process** — don't pitch how the sausage is made.

### Hormozi moves in the current build

| Move | Where it lives | What it does |
|---|---|---|
| Offer above the fold | Hero H1: "Your first 3 appointments are free." | Dream Outcome made instantly clear — message-match with the ads |
| Stack the offer | Hero sub: "No retainers. No setup fees. No contracts. Pay only when the homeowner shows." | Drives effort/sacrifice toward zero |
| **Insinuation** (the purest Hormozi move on the page) | Math section: `3 × 58% = ?` with "You do the math" | We hand the installer the multiplication; they conclude they'd close ~2 deals before paying us a dollar. Customer-concluded > vendor-claimed. |
| Risk reversal | Hero sub + Guarantee section + FAQ #1 | Removes "what if I sign up and it sucks" objection |
| Real scarcity | "One partner per trade, per territory" + 5 launch states | Drives perceived likelihood (this is exclusive) and urgency (your competitor could take it) |
| Specific numbers | Trust strip (4.7, 89%, 58%) + Math section | Beats any "industry-leading" claim |
| Pre-handle objections | FAQ ("I've been burned by lead companies — why is this different?") | Closes the skeptical-installer loop |
| Sell the result | Difference table US column: "You walk in. They're ready." | Outcome language, not process language |
| Trade chips in hero | `HVAC →` `Windows →` etc. | Reduces effort/sacrifice (skip Step 1 of the form) |
| Form submit dedup with `eventID` | Tracking script | Hormozi: attribution → optimization → better ROAS |
| Calendly handoff in success state | "Lock a 30-min slot now →" | Removes time delay between intent and booked meeting |

### Hormozi principles to apply to any new section

1. **Every section should do one of: increase outcome, increase likelihood, decrease time, decrease effort.** If it doesn't, it's decoration. Cut.
2. **Lead with the offer, not the philosophy.** Cold-traffic landing pages have ~3 seconds of attention. The hero has to answer "what's in it for me?" before "who are you?"
3. **Stack the offer with zeros.** No retainers. No setup. No contracts. No obligation. Each zero is a friction removed.
4. **Insinuate, don't claim.** When you have two true numbers that imply a great conclusion, present both numbers separately and let the customer multiply. The conclusion is more durable.
5. **Risk reversal is mandatory.** "What's the worst case for the customer?" If the answer isn't "they spent some time," fix it.
6. **Real scarcity only.** Fake countdowns and "only 3 left" lies destroy trust. Genuine constraints (territory exclusivity, capacity limits) build it.
7. **CTAs are verbs about the offer.** "Claim my 3 free appointments" beats "Get started" beats "Learn more."
8. **Specific > vague.** Numbers, names, dates. "200+ partners onboarded" beats "many partners." "Puma Home Services" beats "a leading installer."
9. **Pre-handle the next objection.** The skeptical installer is thinking "I've been burned before." Put that exact question in the FAQ with a clean answer.
10. **Cut the process pitch.** Don't tell them how you'll generate the appointments. Tell them what walking into the appointment feels like.

---

## Part 3 — The Decision Rules

When the two thinkers conflict, which wins? Depends on the layer of the page and the traffic temperature.

### Rule 1: The page hierarchy is Hormozi. The voice is Sinek.

The order of sections — what comes first, what proof comes next, where scarcity sits — is a Hormozi call. The words you use inside each section are a Sinek call.

**Example:** The Hero structure is Hormozi (offer → sub → scarcity → social proof → CTA). The Hero copy ("Your first 3 appointments are free. Pay only when the homeowner shows. One partner per trade, per territory.") is Sinek-flavored — note the absence of "leads," "conversions," "ROI," or "agency." It speaks the installer's language.

### Rule 2: Traffic temperature decides which one leads.

| Traffic | Lead with | Why |
|---|---|---|
| **Cold** (Meta ads, Google ads, first touch) | Hormozi | They don't know us. They have 3 seconds. Offer first. |
| **Warm** (retargeting, email, second touch) | Hybrid | Offer still featured, but the WHY narrative gets more room because they're already curious about who we are |
| **Hot** (referral, direct, returning visitor) | Sinek | They already trust the offer; they want to know if we're the people they want to be in business with |

The current `partners-lp-v2` is a cold-traffic page (Meta ads). That's why we cut the WHY-heavy Riskwall narrative and led with the bare offer. If we built `partners-warm.html` for retargeting, we'd put the Riskwall narrative back near the top.

### Rule 3: When in doubt, ask "what would a tired installer at 6pm care about?"

Sinek's WHY work matters to people who have headspace to philosophize. Hormozi's offer work matters to people who are tired, skeptical, and have been burned. Cold-traffic landing pages are reading the second person.

This is the rule that drove the page restructure. The original page had a Sinek-strong hero ("You went into business to install. Not to chase.") which is *beautiful* and would convert *warm* traffic. But the Meta ads were driving cold contractor traffic getting ~35–40 page visits and zero conversions. Tired installer at 6pm doesn't want to be philosophized at. They want to see "free" and the form.

### Rule 4: Sinek edits the copy. Hormozi edits the structure.

When you're about to ship something, do two passes:

**Pass 1 (Hormozi):** Section-by-section, ask "what value-equation move does this section make?" If a section doesn't move outcome ↑, likelihood ↑, time ↓, or effort ↓ — cut it or rewrite it.

**Pass 2 (Sinek):** Word-by-word, ask "would I say this to an installer I respect?" Hunt for jargon, marketing-speak, "we-talk" instead of "you-talk." Replace.

---

## Part 4 — Anti-Patterns We Don't Allow

Things both thinkers would reject (or that the current build was structured to avoid):

### Anti-patterns from a Hormozi lens

1. **"Learn more" CTAs.** Tells the user nothing about what they'll get. Replace with verb + specific outcome.
2. **Three competing CTAs on one screen.** Decision fatigue. Pick one primary; demote the rest.
3. **Stats without a story.** "89% sit rate" alone is a brag. "58% close rate × 3 free appointments = ?" is an offer.
4. **Pain sections that just describe the customer's misery.** This is why we cut the original 30-to-1 PAIN section. Pessimistic framing without an immediate reversal feels like the page is rubbing salt in. Hormozi's pain is *loss aversion* (what you're losing by not acting), not depression.
5. **Long preambles before the offer.** Cold traffic gives you ~3 seconds. If the offer isn't above the fold, it's invisible.
6. **Calendly-only conversion path.** Pixel can't see inside the iframe. We learned this the hard way; it's the whole reason the on-page form exists.
7. **Generic testimonials ("they were great!").** Specific names, specific outcomes, specific timeframes ("Called us within 7 days of going live").
8. **Fake urgency.** Countdown timers, "only 2 spots left" lies. Destroys trust faster than no urgency at all.

### Anti-patterns from a Sinek lens

1. **Talking about ourselves before talking about the installer.** Every "we" should be followed by "you" within a sentence or two. The page is about them.
2. **Pitching the HOW.** Avoid section like "How it works: 1. We do X. 2. We do Y." Replace with what the *installer experiences* when X and Y happen.
3. **Using the customer's enemy as our language.** "Lead generation" is the language of the agencies that have burned them. We don't use it.
4. **Aspirational claims without lived-experience proof.** Don't say "transform your business" without a Puma Home Services quote next to it.
5. **Polished-but-empty brand language.** "Empower," "elevate," "transform," "revolutionize" — all dead words. Cut.
6. **Treating the customer as a prospect, not a peer.** Tone should be "two operators talking shop," not "agency pitching their book."

---

## Part 5 — How the Two Thinkers Combine on Specific Page Elements

This section is a worked example reference. If you're editing the page or building a new one, look at how the moves stack.

### The Hero

- **Hormozi structure:** offer → sub → scarcity → quick-pick chips (skip Step 1) → form card
- **Sinek voice:** "Your first 3 appointments are free." (not "Free lead generation trial"). "Pay only when the homeowner shows." (not "Pay-per-conversion model"). Vocabulary is installer-native.
- **Combined effect:** The offer is unmistakable in 1 second (Hormozi). The language signals "we know your world" in the same second (Sinek). Cold traffic that finished reading the H1 already trusts us a little.

### The Math Section

- **Hormozi structure:** Insinuation. Two numbers presented, multiplication operator visible, customer concludes the result.
- **Sinek voice:** Eyebrow says "Before you pay us a dollar." That's a WHY statement — it positions the offer as an act of confidence, not a discount. The closer line: "If the work doesn't earn itself in three appointments, you walk." That's WHY made operational.
- **Combined effect:** The math gets them to a number (~2 deals). The voice gets them to a feeling (these people believe in their own product).

### The Difference Table

- **Hormozi structure:** Pre-handle the objection ("how is this different from the lead company that burned me?") with a side-by-side compare.
- **Sinek voice:** US column ends with "You walk in. They're ready." That's not feature-language; it's a description of how the installer's *day* will feel. Pure Sinek WHY-payoff.

### The FAQ

- **Hormozi structure:** Three questions, each closing a specific objection (pricing, skepticism, exclusivity).
- **Sinek voice:** Question #2 — "I've been burned by lead companies before — why is this different?" — uses the customer's exact mental phrasing. That's empathetic listening, not marketing.

### The Form

- **Hormozi structure:** 3 steps. Trivial first step (one click on trade). Effort/sacrifice minimized.
- **Sinek voice:** Step 3 microcopy: "We'll call you on this number within one business day." Not "We'll reach out shortly." A specific promise from a peer.

### The Calendly Handoff in Success State

- **Hormozi structure:** Cuts time delay between intent and booked appointment. "Or skip the wait — Lock a 30-min slot now →"
- **Sinek voice:** "Or skip the wait" treats the installer like a busy operator who values their time. Not "Want to expedite your onboarding?" — which would be agency-speak.

---

## Part 6 — Applying The Framework To New Work

### Building a new landing page

1. **Define the OFFER first.** Before any copy, write the one-line offer in this format: "Get [dream outcome] for [low/no risk] with [time to value]. [Stack of zeros]. [Real scarcity]." If you can't write this line, you don't have a page yet.
2. **Define the WHY.** Why does ProFusion exist for this audience? One sentence. This becomes the voice substrate.
3. **Sketch the section order (Hormozi).** Hero → Trust → [the right proof beat for THIS audience] → Differentiator → Voices → Scarcity → Risk reversal → Conversion → FAQ → Close.
4. **Write the copy (Sinek).** Audit every section for installer-vocabulary, not marketing-vocabulary.
5. **Pass 1 audit (Hormozi):** does every section move the value equation? Cut anything that doesn't.
6. **Pass 2 audit (Sinek):** would I say this to a peer? Cut jargon.
7. **Ship and test against cold traffic.** Conversion data is the tiebreaker when Sinek and Hormozi instincts conflict.

### Writing a marketing email

- **Subject line: Hormozi.** Specific, outcome-oriented, no clever wordplay. "Your first 3 appointments are free" beats "A note from the ProFusion team."
- **First line: Hormozi.** Restate or sharpen the offer. The first line of the body has to earn the open.
- **Middle: Sinek.** Brief WHY narrative — why this offer exists, why we can make it.
- **CTA: Hormozi.** Specific, verb-led. "Claim my 3 free appointments →" not "Sign up today."
- **PS: Sinek.** A peer-to-peer line that acknowledges the human, not the funnel. "P.S. — I know you've been pitched before. The 3 free appointments are how we prove this is different."

### Writing an ad script (Meta video ad)

- **Hook (3 seconds): Hormozi.** Specific outcome or pain reversal. "Stop paying for leads that go nowhere." or "What if your first 3 appointments were free?"
- **Body (15 seconds): Sinek.** WHY narrative — quick. "You went into business to install. Not to chase." (yes, the line we cut from the page — it's still the right line for an ad.)
- **Proof (5 seconds): Hormozi.** One specific number or one specific testimonial. Not both.
- **CTA (3 seconds): Hormozi.** Specific action. "Tap below to claim yours."

### Editing existing copy

Before changing a line, ask:
- Is this Hormozi work (structure / offer / proof / CTA) or Sinek work (voice / WHY / tone)?
- Am I making it more specific (Hormozi ✓) or more general (cut)?
- Am I making it more peer-language (Sinek ✓) or more marketing-language (cut)?

---

## Part 7 — Things to Get Right About Each Thinker (so we don't strawman them)

**Sinek isn't anti-conversion.** He's not saying "don't sell." He's saying that brands that lead with WHY *outperform* brands that lead with WHAT — over time, on retention, on brand equity, on word-of-mouth. Hormozi-style conversion tactics work great on cold-traffic landing pages. But if every touch point screams the offer and never says why, you build a brand of mercenaries, not advocates.

**Hormozi isn't anti-brand.** Read past the Twitter quotes and he talks constantly about over-delivery, integrity, and "make your product so good that people refer it." That's a Sinek-shaped statement at heart. He's just impatient with brand-work that doesn't *also* move the value equation.

The hybrid works because the two thinkers are operating at different timescales. Sinek is playing the infinite game (brand). Hormozi is playing the finite game (this acquisition cycle). A real business has to do both, on the same page, on the same day.

---

## Reference: The 10 Principles We Hold Constant

If everything else is contextual, these 10 are not.

1. **Lead with the offer on cold traffic.** Always.
2. **Sell the result, not the process.** Always.
3. **Specific > vague.** Always.
4. **Real scarcity > fake urgency.** Always.
5. **Risk reversal is mandatory.** Always.
6. **Insinuate when the math is good; don't claim it.** Always.
7. **Use the customer's vocabulary, not the industry's.** Always.
8. **Every section earns its keep or gets cut.** Always.
9. **One primary CTA per screen.** Always.
10. **Match the channel.** Cold landing pages = Hormozi-forward. Brand pages = Sinek-forward. Don't put a brand page at the end of a paid ad.

— End of framework doc —
