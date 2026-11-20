---
title: 'Plecky part 4: Coco, worlds and a jetpack'
date: '2026-11-20 12:00'
author: 'acidjunk'
category: ['Computerz', 'Music']
tags: ["Computerz","Music","plecky","gamedev","godot","rust","ios","testflight"]
thumbnail: '/images/posts/plecky-coco-worlds-and-a-jetpack/coco.png'
status: 'published'
---

*Part 4 of the Plecky series. Part 1: [a plectrum with rock hair](/plecky-a-plectrum-with-rock-hair/). Part 2: [MIDI, calibration, iPad and Windows](/plecky-midi-calibration-ipad-and-windows/). Part 3: [LAN party, stars and Android](/plecky-lan-party-stars-and-android/).*

By now Plecky has a rhythm of its own. Every week a whole batch of amendments and bug fixes comes out of it. Last weekend alone was 30 commits: a dog, a glitter guitar, a jetpack, fireworks, seven new levels and a menu with worlds. Writing the code is no longer the slow part. **Testing it is.** And that's where the kids come in.

![Plecky's new title screen](/images/posts/plecky-coco-worlds-and-a-jetpack/title.png)

## The bot tests everything. Except the fun.

Since part 1 there's a bot that plays every level, and a regression suite that runs it all headless: does the level load, can it be finished, does the music stay on the beat, does Coco stay on screen, does LAN still sync. Every new level has to pass before it's committed. The five new levels from this week all passed on the first try.

That's great, and it catches a lot. But "the bot can finish it" is not the same as "this is a good level". The bot doesn't laugh, doesn't get frustrated, doesn't hold the iPad the wrong way and doesn't notice that something looks off. It will happily finish a level that's boring, unfair, or ugly. To make levels that are *really good*, you need people playing them. Preferably small people with very strong opinions.

Some things from the last week that no test would ever have found:

- **Coco barked the moment a level started.** Technically fine, just odd. Now he waits at the first checkpoint, and every bark falls on a beat.
- **An ear the wrong way round** on Coco in some poses. And then: "a collar please", and "sleeker, a less bulbous muzzle: it's a fast little dog".
- **The menu panels looked jagged.** Slanted polygons without antialiasing. They're rounded slabs now.
- **You couldn't pick an avatar by tapping it** on the iPad. "People expect that, the left and right pads are a keyboard idea."
- **On the iPhone the touch controls covered the level** when it started on the ground floor. The camera now lifts the level clear of them.
- **You kept having to rotate the device**, because the build only allowed one landscape orientation per device. The setting was under the wrong key.
- **The placeholder music raced** at the fast tempos once the lead came in. Now it calms down above 130 BPM.
- **The HUD sat over the play area** on the iPad's 4:3 screen.

None of these are hard to fix. They're just impossible to see without playing it, on the actual device, with someone next to you saying "that's weird".

## Builds straight to the iPad and iPhone

This is the part I'm most happy about. Getting a new build onto the devices used to mean a cable and Xcode. Now it goes through **TestFlight**, fully from the terminal:

```bash
scripts/ios-archive.sh            # release export, Xcode archive, upload to App Store Connect
scripts/asc.py builds --wait      # wait until Apple has processed it
scripts/asc.py testflight         # newest build to the internal group "Band", with release notes
```

`asc.py` talks to the App Store Connect API (Python standard library only, the JWT is signed with the system openssl). The group is called "Band", of course. A few minutes after the upload, the iPads and the iPhone show "new build available", over the air. Tap update, play, complain, repeat. No cables, no Xcode, no "can I borrow your iPad for a second".

Honestly, that loop **rocks**. It turns testing from a chore into something that just happens on the couch. And the same script can do the store listing, the screenshots, the privacy form and the submission later on. The only thing the API can't do is create the app record, that's one click on the website.

Android runs too now (the NDK finally got installed, and Plecky starts on the emulator), but it doesn't have this nice over-the-air loop yet.

## The test list for this week

So here's what the kids and I need to play this week. Everything below is built, passes the regression, and needs human eyes.

### Coco: is he actually fun?

![Plecky and Coco in Slow Rock, with the glitter guitar out of reach on the right](/images/posts/plecky-coco-worlds-and-a-jetpack/coco.png)

**Coco** is a comic-strip Jack Russell who waits at the first checkpoint and follows you from then on. He can't die; if he's left behind he poofs away and pops up next to you. His back is a platform: jump on him, jump again, and you go about 20% higher. Fall into a pit while Coco stands nearby and you zap onto his back instead of dying.

To test:

- Is it easy enough to **land on him**? The first version ran away right when you tried. He should hold still now.
- Does he **get in the way** or poof too often?
- Is it clear that you need him? The glitter guitar in his levels is out of reach without him.
- Does he **look right** in the game? He started as drawings (`make_coco.py`), went through three directions and a few rounds of corrections:

<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;background:#f4efe6;padding:16px;border-radius:8px;margin:1.5rem 0">
<img src="/images/posts/plecky-coco-worlds-and-a-jetpack/coco/russell-sit.svg" alt="Coco sitting" title="Sit">
<img src="/images/posts/plecky-coco-worlds-and-a-jetpack/coco/russell-stand.svg" alt="Coco standing" title="Stand">
<img src="/images/posts/plecky-coco-worlds-and-a-jetpack/coco/russell-run_a.svg" alt="Coco running" title="Run">
<img src="/images/posts/plecky-coco-worlds-and-a-jetpack/coco/russell-jump.svg" alt="Coco jumping" title="Jump">
<img src="/images/posts/plecky-coco-worlds-and-a-jetpack/coco/russell-bark.svg" alt="Coco barking" title="Bark">
<img src="/images/posts/plecky-coco-worlds-and-a-jetpack/coco/russell-brace.svg" alt="Coco bracing with Plecky on his back" title="Brace">
<img src="/images/posts/plecky-coco-worlds-and-a-jetpack/coco/russell-poof.svg" alt="Coco poofing away" title="Poof">
</div>

### The glitter guitar: too hard?

![The glitter guitar high above Medley](/images/posts/plecky-coco-worlds-and-a-jetpack/guitar.png)

A golden guitar hidden in some levels, 1000 points and a riff when you grab it. In **Medley** it needs the highest jump in the game: hop, hop onto Coco, and the third jump of the **jump chain** from his back (three quick jumps in a row go higher than two). Measured, it works with 12 px to spare. The question is whether a kid will ever figure that out. The bot never tries.

### The jetpack: fun or chaos?

![Plecky flying with the jetpack in Sprint](/images/posts/plecky-coco-worlds-and-a-jetpack/jet.png)

In Sprint you pick up a jetpack: ten seconds of flight on the jump button, tap to hover, hold to climb. After the first test it also got a prize: a glitter guitar way above the screen, only reachable by flying. To test: is ten seconds enough, and does anyone find that guitar?

### Stars and fireworks

![Gig reached, with fireworks behind the card](/images/posts/plecky-coco-worlds-and-a-jetpack/gig.png)

Platform levels now end with the same star card as the rhythm levels, with fireworks behind it: "boom, made it". One star for the gig, one for every ticket, one for no deaths. To test: does that rule feel fair, or is three stars impossible?

### The new levels: too fast?

![Medley: pillars over a pit, Coco running below](/images/posts/plecky-coco-worlds-and-a-jetpack/medley.png)

**Medley** (130 BPM) has every element in one level. **Ska** (170 BPM, now Mosh) is built around the trampoline. And five more to fill the worlds:

| Level | BPM | What it's about |
|---|---|---|
| Purple B | 100 | slides, ice, movers, Coco and the guitar |
| Grinder | 200 | spikes and chasms |
| Blastbeat | 215 | waves of beat blocks and movers |
| Necro | 230 | catapults and kill zones |
| Circle Pit | 180 | five trampolines, a catapult, the guitar over a pad |

The bot finishes all of them, but the bot has perfect reflexes. At 230 BPM I'm not sure a human can. That's exactly what we need to find out. Behind every platform level there are now trippy **parallax backgrounds** as well, which get crazier the further you get. Too crazy is a real option.

### Worlds and the tutorial

![The worlds carousel](/images/posts/plecky-coco-worlds-and-a-jetpack/worlds.png)

With 18 platform levels the old list didn't fit anymore, so the menu became a map of **worlds**: Tutorial, Rock, Metal, Blues Rock, Death Metal, Thrash Metal and Bonus, each with its own look and emblem. The rhythm levels got their own entrance: **JAM**. Worlds open one after the other, and inside a world a level opens with the tickets you collected there.

![The level cards of the Tutorial world](/images/posts/plecky-coco-worlds-and-a-jetpack/levels.png)

<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:12px;background:#16151a;padding:16px;border-radius:8px;margin:1.5rem 0">
<img src="/images/posts/plecky-coco-worlds-and-a-jetpack/worlds/tutorial.svg" alt="Tutorial" title="Tutorial">
<img src="/images/posts/plecky-coco-worlds-and-a-jetpack/worlds/rock.svg" alt="Rock" title="Rock">
<img src="/images/posts/plecky-coco-worlds-and-a-jetpack/worlds/metal.svg" alt="Metal" title="Metal">
<img src="/images/posts/plecky-coco-worlds-and-a-jetpack/worlds/blues.svg" alt="Blues Rock" title="Blues Rock">
<img src="/images/posts/plecky-coco-worlds-and-a-jetpack/worlds/death.svg" alt="Death Metal" title="Death Metal">
<img src="/images/posts/plecky-coco-worlds-and-a-jetpack/worlds/thrash.svg" alt="Thrash Metal" title="Thrash Metal">
<img src="/images/posts/plecky-coco-worlds-and-a-jetpack/worlds/bonus.svg" alt="Bonus" title="Bonus">
<img src="/images/posts/plecky-coco-worlds-and-a-jetpack/worlds/jam.svg" alt="Jam" title="Jam">
</div>

The second tutorial level (Metal) now shows every element once, each announced by a **hint sign**: "HOLD JUMP TO GO HIGHER", "RED BARS KILL", "COCO! JUMP ON HIS BACK". Eighteen of them.

![A hint sign in Metal, with Coco waiting](/images/posts/plecky-coco-worlds-and-a-jetpack/hint.png)

To test:

- Do the hints make sense to someone who has **never played** it? I wrote them, so I'm the worst person to judge.
- Are the ticket gates too strict? Getting stuck in a world because you're two tickets short is no fun.
- Is the menu easy on touch? It also works with keyboard, gamepad and mouse, the footer shows the controls for whatever you used last.

## Where we are after four weeks

- 18 platform levels in 7 worlds, from 70 to 230 BPM, plus 5 rhythm levels in JAM
- a dog, a glitter guitar, a jetpack and fireworks
- macOS, Windows, iPad, iPhone and Android, with TestFlight builds over the air
- LAN play for up to eight
- a bot that plays every level, and a family that plays them for real

The code keeps coming, every week. What makes the difference now is the couch: playing it, laughing about it, and saying "that's weird". Then the next build lands on the iPad and we do it again.
