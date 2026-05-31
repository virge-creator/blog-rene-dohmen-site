---
title: 'og:image: Nail the 1200x630 or Lose the Click'
date: '2026-05-31 14:00'
author: 'acidjunk'
category: ['Computerz']
tags: ["Computerz","marketing","seo","javascript","tutorial"]
thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
status: 'published'
---

Three weeks on the campaign. Tight copy, page that converts, budget approved. Then someone drops the link in Slack and it unfurls as a sad grey box with a chopped-off URL and no image. 💀

That's an `og:image` fail. And here's the thing nobody wants to hear: **the image is the campaign.** Before anyone reads a word of your copy, they see a card. Nail the card or none of the rest matters. So let's nail it.

## The number: 1200 x 630

Memorize it. Write it on your monitor. Ratio is **1.91:1**, and 1200x630 is the smallest size that stays crisp on retina and works literally everywhere. Smaller than 600x315 and Facebook/LinkedIn demote you to a tiny thumbnail. Don't get demoted.

## The tags that actually matter

```html
<meta property="og:image" content="https://example.com/og/launch.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:title" content="Spring Launch: 40% Faster Onboarding" />
<meta property="og:url" content="https://example.com/spring-launch" />
<meta name="twitter:card" content="summary_large_image" />
```

Three ways people shoot themselves in the foot, every single time:

- **`property`, not `name`.** Open Graph uses `property=`. Get it wrong and the tag does nothing, silently.
- **Absolute `https://` URL.** A relative `/og/launch.png` works in your browser and dies in every unfurler. This is the #1 bug.
- **Declare width + height.** It makes the card render *instantly* on the first share instead of flashing a blank box while the scraper re-measures. On launch day, first impressions are the only impressions.

And `twitter:card = summary_large_image` is what gets you the big banner on X instead of a sad little square.

## Design for the crop, not for Figma

Everyone eats the same 1200x630, but they crop differently, and WhatsApp/iMessage centre-crop *hard*. So: **keep your logo, headline and CTA inside a centred ~1080x540 safe zone.** Treat the outer edge as bleed that might vanish.

And make the text BIG. That 28px headline that looks fine in your design tool is mush when Slack renders the card at 360px wide. If it's not legible at thumbnail size, it's not legible.

PNG for text/logos, JPG for photos. No SVG, no WebP (scrapers choke). Keep it under ~1MB or WhatsApp may just refuse to fetch it.

## The trap that actually ruins launch day: caching

Platforms scrape **once** and cache for *days*. So the classic disaster: you ship a placeholder, it gets shared internally, the bad card gets cached, and your big external announcement shows garbage to everyone with no refresh button.

The fix is discipline: **get the image right before the URL is ever shared.** Then force a re-scrape:

- Facebook/WhatsApp → [Sharing Debugger](https://developers.facebook.com/tools/debug/), hit "Scrape Again"
- LinkedIn → [Post Inspector](https://www.linkedin.com/post-inspector/)
- Slack → no tool; slap a `?v=2` on the URL to force a fresh unfurl

One more marketing gotcha: UTM params don't change the card: same page, same image. Want a different card per channel? You need a different page.

## Doing it at scale

Hand-cropping a card per landing page doesn't scale. Generate them: **`@vercel/og`** (satori) turns JSX into a 1200x630 PNG at the edge, Cloudinary stamps text over a base image via URL params, and for a static site you pre-render one PNG per page at build time. Unique on-brand card, zero manual design, never a grey box again.

## Ship-check

- [ ] Exactly 1200x630
- [ ] `og:image` is an absolute `https://` URL
- [ ] width + height declared, `twitter:card=summary_large_image`
- [ ] logo/headline/CTA inside the centred safe zone, text legible at thumbnail size
- [ ] PNG/JPG, under ~1MB
- [ ] re-scraped fresh in the FB Debugger **before** the first real share

Six lines. The campaign lives or dies on whether you do them. To create problemz for solutions, right? This one's invisible until it's embarrassing, and trivial once you know the number. 1200x630. Go.
