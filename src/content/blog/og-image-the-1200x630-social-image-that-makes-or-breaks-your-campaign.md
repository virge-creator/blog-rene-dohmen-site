---
title: 'og:image: The 1200x630 Social Image That Makes or Breaks Your Campaign'
date: '2026-05-31 14:00'
author: 'acidjunk'
category: ['Computerz']
tags: ["Computerz","marketing","seo","javascript","tutorial"]
thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
status: 'published'
---

You spent three weeks on the campaign. The copy is tight, the landing page converts, the ad budget is approved. Then someone pastes the link into the company Slack and it shows up as a sad grey box with a truncated URL and no image. First impression, blown, in the one channel where your audience actually trusts the messenger.

That grey box is an `og:image` problem. And the fix is almost always the same magic number: **1200 x 630 pixels**. This post goes deep on why that number, what the tags actually need to say, where every platform crops differently, and the operational stuff nobody tells you until a campaign is already live.

## What og:image actually is

Open Graph is a tiny protocol Facebook published back in 2010 that the entire web quietly standardised on. When any "unfurler" — Slack, LinkedIn, WhatsApp, iMessage, Discord, Telegram, X, Facebook — sees a link, it fetches the HTML, reads a handful of `<meta>` tags from the `<head>`, and builds a preview card. The single most important one is the image:

```html
<meta property="og:image" content="https://example.com/campaign/launch-og.png" />
```

Note `property=`, not `name=`. Open Graph tags use `property`; the standard SEO `<meta name="description">` uses `name`. Mixing them up is the #1 reason a tag silently does nothing.

## Why 1200 x 630 specifically

The ratio is **1.91:1**. That's the aspect ratio Facebook and LinkedIn render large link previews at, and 1200x630 is the smallest size that stays crisp on high-DPI screens without being wastefully huge.

- **Minimum** to get a *large* card (not a tiny thumbnail) on Facebook/LinkedIn is 600x315. Anything smaller gets demoted to a small square thumbnail next to the text.
- **1200x630** is the sweet spot: it's 2x the minimum, so it looks sharp on retina displays, and it's universally accepted.
- **Going bigger** (e.g. 2400x1260, same ratio) is fine and looks great on 4K, but watch your file size — see the limits below.

If you remember one number for the rest of your career, make it 1200x630.

## The full tag set (not just the one)

A robust, campaign-grade head looks like this:

```html
<!-- Core Open Graph -->
<meta property="og:title" content="Spring Launch: 40% Faster Onboarding" />
<meta property="og:description" content="See how teams cut setup time in half." />
<meta property="og:image" content="https://example.com/og/spring-launch.png" />
<meta property="og:image:secure_url" content="https://example.com/og/spring-launch.png" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Dashboard showing onboarding time dropping from 4 hours to 2." />
<meta property="og:url" content="https://example.com/spring-launch" />
<meta property="og:type" content="website" />

<!-- X / Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Spring Launch: 40% Faster Onboarding" />
<meta name="twitter:description" content="See how teams cut setup time in half." />
<meta name="twitter:image" content="https://example.com/og/spring-launch.png" />
```

A few things that bite people:

- **Use absolute URLs.** `og:image` must be a fully-qualified `https://` URL. Relative paths (`/og/image.png`) work in your browser and break in every unfurler. This is the single most common mistake.
- **Declare width and height.** `og:image:width`/`height` let platforms reserve layout space and, crucially, render the preview *immediately* on first share instead of showing a blank box while they re-fetch to measure the image. For a campaign launch where the first shares matter most, this is the difference between a great first impression and a grey rectangle.
- **`twitter:card = summary_large_image`** is what gives you the big banner on X. Without it you get the small square. X will fall back to the `og:` tags if you omit the `twitter:` ones, but being explicit avoids surprises.
- **`og:image:alt`** is accessibility, not decoration. Screen readers in some clients announce it.

## Every platform crops differently — design for the safe zone

This is the part that ruins beautiful designs. Everyone consumes the *same* 1200x630 file, but they display it at different ratios and crop toward the centre:

| Platform | Card ratio | Effective behaviour |
|----------|-----------|---------------------|
| Facebook / LinkedIn feed | ~1.91:1 | Shows the full image |
| X (summary_large_image) | ~2:1 | Trims a sliver top and bottom |
| Slack | ~1.91:1 but width-limited | Often scaled down small; text must be large |
| WhatsApp / iMessage | small square-ish | **Centre-crops hard** — edges disappear |
| Discord | ~1.91:1 | Shows full, but compresses aggressively |

The rule that survives all of them: **keep logos, headlines and your CTA inside a centred "safe zone" of roughly 1080x540**, leaving ~60px of breathing room on every edge. Treat the outer band as bleed that might get eaten.

And make the text *big*. A 28px font that looks fine in your design tool is unreadable when Slack renders the card at 360px wide on someone's laptop. Aim for headline text that's legible when the whole image is the size of a postage stamp — because on mobile, it will be.

## File format and size

- **PNG** for anything with text, logos, or sharp edges (most campaign images). **JPG** for photographic backgrounds where you want a smaller file.
- **No SVG.** Unfurlers won't render it. No animated GIF either — you'll get a frozen first frame at best.
- **WebP** is risky — some scrapers still choke on it. For a campaign you cannot afford to debug, stick to PNG/JPG.
- **Keep it under 5MB**, and honestly under ~1MB is wise. WhatsApp historically refused to fetch images over ~300KB on some clients, silently showing nothing. Compress with something like `pngquant` or `oxipng` before you ship.

## The thing that will actually waste your launch day: caching

Every major platform **scrapes once and caches aggressively** — Facebook and LinkedIn can hold a preview for *days to a week*. So the classic disaster is: you push the page with a placeholder or wrong image, it gets shared internally, the scrapers cache the bad version, and now your big external announcement shows the wrong card to everyone — and there's no "refresh" button for your audience.

Mitigations, in order of importance:

1. **Get the image right before the URL is ever shared.** Once a URL is cached wrong, you're playing catch-up.
2. **Re-scrape manually** after fixing:
   - Facebook/WhatsApp: [Sharing Debugger](https://developers.facebook.com/tools/debug/) → "Scrape Again"
   - LinkedIn: [Post Inspector](https://www.linkedin.com/post-inspector/)
   - X: the Card Validator (now mostly just re-share to test)
   - Slack: there's no public tool; appending a harmless `?v=2` query string forces a fresh unfurl.
3. **Version the image filename or add a query param** when you change it mid-campaign: `spring-launch.png?v=2`. Many caches key on the full URL, so a new query string = a new fetch. (Note: this does *not* reliably bust Facebook's cache, which keys on the page URL — use the debugger there.)

## Marketing-campaign-specific gotchas

This is where the engineering meets the spreadsheet:

- **UTM parameters don't change the card.** `?utm_source=newsletter` points at the same page, so it unfurls with the same `og:image`. If you want a *different* card per channel, you need a different *page* (or server-side logic that varies the tag by query param — most scrapers do pass query strings through).
- **Per-landing-page images beat one global image.** A generic site-wide og:image is a missed opportunity. Each campaign landing page should have its own purpose-built card with the offer in it.
- **Don't put a phone number or a time-limited price in the image** unless you're prepared to re-scrape when it changes — cached cards will show stale info long after you've updated the page.
- **A/B testing card images is hard** precisely because of caching — you can't reliably show two cards for one URL. Test at the *page* level instead.
- **Track clicks, not the image.** The card click goes to `og:url`. Make sure that URL carries your campaign tracking, and that it matches the canonical page so analytics don't fragment.

## Generating them at scale

If you ship dozens of campaign pages, hand-designing each card in Figma doesn't scale. The modern move is **dynamic OG image generation**: render an image on the fly from a template plus some text.

- **Vercel's `@vercel/og`** (built on `satori`) turns JSX/HTML + CSS into a 1200x630 PNG at the edge. You give it a title and it stamps a branded card. This pairs beautifully with a Next.js app — which, incidentally, is what powers a lot of campaign sites these days.
- **Cloudinary / imgix** can compose text over a base image via URL parameters, so `.../l_text:Arial_60:Spring%20Launch/base.png` *is* your og:image.
- For a static site (this blog is Astro), you can pre-generate cards at build time with `satori` + `resvg` and write one PNG per post into the output.

A minimal mental model of the dynamic approach:

```
/api/og?title=Spring+Launch  ->  satori renders JSX  ->  1200x630 PNG  ->  set as og:image
```

The win: every page gets a unique, on-brand, perfectly-sized card with zero manual design work, and you never ship a grey box again.

## A pre-flight checklist

Before any campaign URL goes near a "Share" button:

- [ ] Image is exactly 1200x630 (or a 1.91:1 multiple)
- [ ] `og:image` is an absolute `https://` URL
- [ ] `og:image:width` and `:height` are declared
- [ ] `twitter:card` is `summary_large_image`
- [ ] Logo, headline and CTA sit inside the centred 1080x540 safe zone
- [ ] Headline is legible at thumbnail size
- [ ] File is PNG/JPG, under ~1MB
- [ ] Validated in the Facebook Debugger **and** LinkedIn Post Inspector
- [ ] Scraped fresh *before* the first real share

Get those eight right and your link looks like a million bucks everywhere it lands. Get the first one wrong and it doesn't matter how good the campaign is — the first thing anyone sees is a grey box.

To create problemz for solutions, right? This is one of those problems that's invisible until it's embarrassing, and trivial once you know the number. 1200x630. Write it on your monitor.
