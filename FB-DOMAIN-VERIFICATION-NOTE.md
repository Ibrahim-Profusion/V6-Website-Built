# Facebook Domain Verification — Status Note

**From:** Ibrahim's Claude → Sultan's Claude (via Ibrahim)
**Domain being verified:** `profusion.solutions`
**Meta-issued content string:** `fammpop5unwn3fwt7czrtf1148x4lg`
**Status:** Tag inserted into 105 HTML files in Ibrahim's local build. Verification keeps failing on Meta's side. **Most likely root cause flagged below — read that first.**

---

## What was done (on our end)

We inserted the standard Meta verification tag into the `<head>` of every public HTML file in Ibrahim's local `V6-Build/` directory, positioned right after the viewport meta and before the title:

```html
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="facebook-domain-verification" content="fammpop5unwn3fwt7czrtf1148x4lg" />
<title>...</title>
```

**Coverage — 105 files total:**
- 16 root pages (`index.html`, `partners-lp-v2.html`, `about-us.html`, `contact.html`, `careers.html`, `for-installers.html`, `get-my-score.html`, `how-our-score-guides-you.html`, `our-customers.html`, `our-installers.html`, `partner-landing-page.html`, `partners-lp.html`, `privacy.html`, `sample-report.html`, `terms.html`, `2026-changes.html`)
- 56 `programs/*.html` subpages
- 11 `utility-programs/*.html` subpages
- 11 `states/*.html` subpages
- 6 `problems/*.html` subpages
- 5 `categories/*.html` subpages

Skipped: `archive/` (deprecated old content), `.superpowers/brainstorm/` (internal design scratch).

Tag placement and content string were verified file-by-file with grep — no drift, no duplicates, no missing files.

---

## The most likely reason verification is failing

**The updated files almost certainly aren't deployed to the live domain yet.**

Ibrahim has been testing locally for this whole rebuild. Earlier in the session when I loaded `https://www.profusion.solutions/partners-lp-v2.html` to debug something else, the live URL was **still serving the old build** — the pre-rebuild hero copy ("You went into business to install. Not to chase.") was showing, not the new "Your first 3 appointments are free." headline that's been in his local files for a while.

If `partners-lp-v2.html` is stale on production, `index.html` and the rest of the site are almost certainly stale too. Meta's crawler is fetching the *pre-tag* HTML on every verification attempt, finding nothing, and failing.

### First thing to check — confirm whether the tag is actually live

Open these in a browser (these are `view-source:` URLs that show the raw HTML Facebook will see):

```
view-source:https://www.profusion.solutions/
view-source:https://profusion.solutions/
```

Hit Cmd+F (or Ctrl+F) and search for `facebook-domain-verification`. 

- **If it's not there →** deployment hasn't happened. Push the local V6-Build to production. Verification will only succeed after this.
- **If it IS there →** see the secondary checklist below.

---

## Secondary checklist — if the tag IS in the live source but Meta still fails

Run through these in order:

### 1. Domain string mismatch
Meta treats `profusion.solutions` and `www.profusion.solutions` as **different domains**. The string entered in Meta's Domain verification UI must exactly match the canonical domain.
- What does DNS resolve to? (`dig profusion.solutions` vs `dig www.profusion.solutions`)
- What does your hosting redirect canonicalize to?
- If users hit `www.` but you claimed the bare apex, add the `www.` redirect target as a separate verified domain or change the claimed domain to match.

### 2. CDN / proxy stripping meta tags
Some platforms rewrite the `<head>` and can drop "unknown" meta tags:
- Cloudflare Workers / Pages with HTML rewriters
- Vercel / Netlify edge functions
- WordPress security plugins (Wordfence, etc.)
- Server-side optimization plugins ("HTML minifiers" that drop "unrecognized" tags)

Test with raw curl from outside any CDN:
```bash
curl -sL https://www.profusion.solutions/ | grep facebook-domain-verification
```

If grep returns nothing but the meta tag is in your source files, something in the delivery pipeline is stripping it.

### 3. Crawler being blocked
Meta's crawler uses `facebookexternalhit` user-agent (and a few related ones). Check:
- `robots.txt` — is `facebookexternalhit` disallowed anywhere?
- Cloudflare "Bot Fight Mode" or "Super Bot Fight Mode" — sometimes blocks legitimate scrapers
- Web application firewall (WAF) rules
- Rate limiting from Meta's IP range

Test with curl masquerading as Meta:
```bash
curl -A "facebookexternalhit/1.1" -sL https://www.profusion.solutions/ | grep facebook-domain-verification
```

If this returns nothing while a normal curl returns the tag, your host is blocking Meta specifically.

### 4. HTTPS / certificate issues
Meta fails silently if it can't establish a clean TLS handshake.
- Run `https://www.profusion.solutions/` through https://www.ssllabs.com/ssltest/
- Look for any cert warnings, mixed-content errors, or expired chain links

### 5. Meta caches old failures
After fixing whatever was wrong, wait 5–10 minutes before re-triggering verification. Meta sometimes caches a failed crawl and re-uses it for a few minutes.

### 6. Try one of Meta's other verification methods
Meta supports three verification paths for the same domain:
1. **Meta tag** (what we're using)
2. **DNS TXT record** (add a TXT record `facebook-domain-verification = fammpop5unwn3fwt7czrtf1148x4lg`)
3. **HTML file upload** (drop a specific file at the root)

**The DNS TXT record path is the most reliable** because it doesn't depend on the website rendering, CDN, host, or deployment. If the meta-tag path keeps failing for environment reasons, switching to DNS TXT is a 60-second job and basically always works.

---

## Reference info

- **Source file location (Ibrahim's local):** `/Users/ibrahim/Desktop/ProFusion Home Solutions/Website/V6-Build/`
- **Tag insertion script:** Inserted programmatically via Python, after every `<meta name="viewport" ...>` line. Idempotent (skips files where tag is already present). If files are added later, re-running the script is safe.
- **Tag count verified:** 105/105 files contain the tag (grep confirmed). Zero missed, zero duplicates.

If Sultan's Meta Business Manager shows a different content string than `fammpop5unwn3fwt7czrtf1148x4lg`, the tag in our files won't match — that string is generated uniquely per domain claim, and if the domain was re-claimed or re-attempted, Meta may have issued a new string and the old one is no longer valid. Check the current value in Meta's UI against what's in our files.

— End of note —
