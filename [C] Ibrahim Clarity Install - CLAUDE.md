# Install Brief — Microsoft Clarity tracking script (CLAUDE.md)

**For: Ibrahim's Claude / dev session. Hand this whole file over.**
Add the Microsoft Clarity analytics script to the Profusion website so we get **heatmaps, scroll-depth maps, and session recordings** of visitors (especially on the paid-ad landing page `partners-lp-v2`). This is read-only analytics — it changes nothing about how the site looks or behaves.

---

## The script to add (paste verbatim)
```html
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "x8qu9o19km");
</script>
```
(Clarity project ID: `x8qu9o19km`)

## Where it goes
- Inside the **`<head>`** of **every public page** — site-wide. Same treatment you gave the `facebook-domain-verification` meta tag (the ~105 HTML files). At minimum it MUST be on **`partners-lp-v2`** (the paid-traffic landing page) and the homepage, but site-wide is correct.
- Place it in the **static `<head>`** (e.g., right alongside the Meta Pixel script). It must be hard-coded in the head — **not injected dynamically after load**, same rule as the verification tag.
- It can sit next to the Meta Pixel — both are head scripts and don't conflict.

## ⚠️ Critical: DEPLOY after adding
The tag does nothing until it's **live on production**. Past pattern here: changes get made in the local build but the deploy is **manual** and lags — that's what held up the domain verification. So: **add the script → deploy/publish → confirm it's actually live.**

**Bundle it with the other pending deploy** (the form/page fixes) so one deploy ships everything.

## How to verify it's working
1. After deploying, open `view-source:https://www.profusion.solutions/partners-lp-v2` and Ctrl+F for **`clarity.ms`** — if the script is there, it's live.
2. In the Clarity dashboard (clarity.microsoft.com), the project status flips to "receiving data" and recordings/heatmaps appear within **~1–2 hours** of real traffic.
3. Clarity also has an "I installed the code, why am I not seeing data?" troubleshooter if needed.

## Don't
- Don't change anything else on the page — this is purely additive.
- Don't worry about privacy/PII — Clarity **masks typed input by default**, so it won't record people's names/emails/phones in the form, just their interactions.

That's it: paste the script into `<head>` site-wide, deploy, confirm `clarity.ms` is in the live source. Questions → Sultan.
