---
title: 'Plecky part 1: a plectrum with rock hair'
date: '2026-10-31 12:00'
author: 'acidjunk'
category: ['Computerz', 'Music']
tags: ["Computerz","Music","plecky","gamedev","godot","rust","bass"]
thumbnail: '/images/posts/plecky-a-plectrum-with-rock-hair/gallery.png'
status: 'published'
---

*This is part 1 of a series. Part 2: [MIDI, calibration, iPad and Windows](/plecky-midi-calibration-ipad-and-windows/). Part 3: [LAN party, stars and Android](/plecky-lan-party-stars-and-android/).*

I have wanted to make a music game for ages. I play bass, I write rock and metal riffs that mostly end up in a folder called "submissions", and I love two games in particular, from a music point of view: [140](https://store.steampowered.com/app/242820/140/), the tiny platformer where everything moves on the beat, and the music levels in Rayman Legends. So this weekend I finally started working on my own musical game engine. Meet **Plecky**: a bass plectrum with rock hair and fists, who wants to become the fastest plectrum of all time.

![All Plecky avatars in the in-game gallery](/images/posts/plecky-a-plectrum-with-rock-hair/gallery.png)

Full disclosure: I am the composer, director and play tester here. The coding is done by Claude Code, while I bang on the bass and complain about the jump height. More on how that works below.

## The story

The story is simple, it's a game:

- Plecky starts at the bottom: slow rock at **70 BPM**.
- Every world is a bit faster and a bit heavier: stoner, grunge, metal, thrash...
- The end boss tempo is somewhere north of **180 or 200 BPM**. The fastest plectrum alive.
- On the way you collect **gig tickets**. They unlock higher levels, power ups and new plectrum looks.

## Two kinds of levels

**Type A** are platform levels in the spirit of 140. The music is built from loops (stems) that I record. Each checkpoint you pass adds or swaps a layer, so the song grows while you play: drums, then bass, then rhythm guitar, then lead. Most levels have four checkpoints, max eight. Platforms and blocks move on the beat, so you basically jump on the music.

**Type B** are rhythm levels, think Guitar Hero but with 2 to 6 lanes. A chart in 16ths or 32nds tells the game which note goes where, and you hit them with the keyboard (or later a MIDI instrument, see part 2). Bonus: this could actually be useful for music education. Practicing plectrum or drumstick speed with a game is a lot more fun than with a metronome.

## Getting grilled before writing code

I started with a written brief (`plecky.md`) and one important line in it: *grill me about game engine design choices before you start*. I had a vague idea about writing a custom engine in Rust, because Unity and Unreal feel way too heavy for a small 2D game that has to start fast.

That grilling turned into 17 questions, and some answers surprised me:

- **Engine or game?** Both, but the game first. I want content within weeks, not an engine hobby project. So no engine from scratch.
- **Godot?** I had lumped it in with Unity and Unreal. It deserved a second look: it starts fast, it's open source and it's great at 2D.
- **Rust?** Yes, but I'm a beginner. So keep the Rust part small and well bounded.

The result: **Godot 4.7 for gameplay and rendering, plus a Rust GDExtension (via [godot-rust](https://godot-rust.github.io/)) for everything that has to be on time.**

### Where the Rust line is

For future me, because I will forget the why:

| Layer | What lives there |
|---|---|
| Godot + GDScript | scenes, rendering, shaders, menus, player movement, level loading, playing the stems |
| Rust `plecky_core` | the **Conductor** (song position, beats, bars, loops), level and chart parsing, the **Judge** (hit windows), MIDI input |
| Rust `plecky_tools` | a CLI for click tracks, chart checks, stem analysis |

Some findings from the investigation that drove this:

- Godot mixes audio in fixed 512 frame chunks, so its raw audio position jumps in ~11 ms steps. Every rhythm game fixes that the same way: anchor a monotonic clock when playback starts and correct it slowly against the audio. That's pure math, perfect for Rust.
- `AudioServer.get_output_latency()` returns **0** on CoreAudio. So you need a calibration screen on every device anyway. More on that in part 2.
- Letting Rust do the actual mixing sounds cool, but in godot-rust today that's either unsound on the audio thread or adds latency on the main thread. Not a fight for my first Rust crate.
- I wanted to rig Plecky in Rive. There's no solid Rive runtime for Godot with iOS support yet, so the character is rigged in Godot itself.
- Levels are drawn in [LDtk](https://ldtk.io/), loaded by our own small runtime loader. Nice side effect: edit the level in LDtk and it reloads while the music keeps playing.

The first spike (milestone 0) measured all of it on my Mac mini: song position jitter of 0.002 ms per frame, zero backwards steps, zero resyncs even through a one second stall, and the game starts in about 300 ms. Good enough for me!

## The level structure

Adding a level is adding a folder:

```
game/levels/<slug>/level.toml     bpm, loop length, stems, checkpoints
game/levels/<slug>/geometry.ldtk  the platforms, drawn in LDtk
game/levels/<slug>/stems/*.wav    48 kHz loops, all exactly the same length
game/levels/<slug>/chart.txt      Type B only: the notes
```

The first real level, Slow Rock, runs on six 70 BPM bass takes I recorded. Each checkpoint swaps to the next take:

```toml
[level]
type = "A"
title = "Slow Rock"
bpm = 70
loop_bars = 8
palette = "dusk"

[music]
stems = ["stems/bass1.wav", "stems/bass2.wav", "stems/bass3.wav",
         "stems/bass4.wav", "stems/bass5.wav", "stems/bass6.wav"]
start = ["stems/bass1.wav"]
transition = "instant"
death = { effect = "duck", depth_db = -12, beats = 1 }

[[checkpoint]]
id = 1
unmute = ["stems/bass2.wav"]
mute = ["stems/bass1.wav"]
```

When you die the music doesn't stop. It ducks for one beat and you respawn on the next one. Nothing kills the groove.

![Slow Rock with the bot playing](/images/posts/plecky-a-plectrum-with-rock-hair/slowrock.png)

The graphics are still placeholder blocks, I know. Blue blocks switch on the beat, red bars hurt, green is the gig at the end. There is also a bot that plays every level, which is how the screenshots in these posts are made (and how the regression tests check nothing broke).

## Plecky himself

This is where I had the most fun. The plan was to draw four Plecky variants and pick one. That idea didn't survive one evening: of course you want to dress up your plectrum. So it became a **parts library**: body shapes, finishes, hair, eyes, mouths, hands, feet, accessories and decals. A Python script (`make_plecky.py`) composes them into SVGs, and there are now **19 presets in 8 genres**: rock, grunge, metal, thrash, stoner, goth, funk and reggae.

Here they are, straight out of the game:

![Plecky avatars dancing in the gallery](/images/posts/plecky-a-plectrum-with-rock-hair/avatars.gif)

And as plain SVGs, the way the generator writes them:

<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:12px;background:#16151a;padding:16px;border-radius:8px;margin:1.5rem 0">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/rock-rocker.svg" alt="Rocker" title="Rocker">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/rock-toon.svg" alt="Toon" title="Toon">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/rock-rockabilly.svg" alt="Rockabilly" title="Rockabilly">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/grunge-grunge.svg" alt="Grunge" title="Grunge">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/grunge-flannel.svg" alt="Flannel" title="Flannel">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/grunge-thrift.svg" alt="Thrift" title="Thrift">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/metal-metal.svg" alt="Metal" title="Metal">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/metal-corpse.svg" alt="Corpse Paint" title="Corpse Paint">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/metal-doom.svg" alt="Doom" title="Doom">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/trash-thrash.svg" alt="Thrash" title="Thrash">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/trash-pit.svg" alt="Pit" title="Pit">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/stoner-desert.svg" alt="Desert" title="Desert">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/stoner-fuzz.svg" alt="Fuzz" title="Fuzz">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/goth-goth.svg" alt="Goth" title="Goth">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/goth-victorian.svg" alt="Victorian" title="Victorian">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/funk-funk.svg" alt="Funk" title="Funk">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/funk-disco.svg" alt="Disco" title="Disco">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/raggea-reggae.svg" alt="Reggae" title="Reggae">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/raggea-dub.svg" alt="Dub" title="Dub">
<img src="/images/posts/plecky-a-plectrum-with-rock-hair/avatars/acid-vigo.svg" alt="Vigo" title="Vigo">
</div>

(Yes, the genre ids in the code are `trash` and `raggea`. That's my spelling and the code kept it. Respect.)

The last one, **Vigo**, was made by Vigo, co-producer of this game. The generator also writes a `template.svg` with the ten named layers (body, hair, eyes, hands, feet...) and guides for the pivots. Draw over it in any vector tool, save it as `custom/<genre>-<name>.svg`, run the script and your drawing is in the game, animated like the rest.

### The rig: no animation files at all

The rig is a Godot `Skeleton2D` with bones for body, hair, eyes, mouth, hands and feet. The SVG parts are rasterized at runtime, so a new combination is just a new set of textures at level start.

The fun part: there are no animation clips. Every pose is calculated each frame from the **beat** and what Plecky is doing. Idle: a little squash on every beat, the foot taps the off-beat, eyes blink on the downbeat. Running: a footfall on every beat. The more music layers are active, the harder he moves. And when you die, all parts fly apart with gravity and spin. Because it's all driven by the song position, Plecky stays on the grid at 70 BPM and at 185 BPM without a single extra keyframe.

### Customizer

Of course a gallery with presets wasn't enough either. Press C and you can swap every part yourself, or hit R for a random Plecky:

![The Plecky customizer](/images/posts/plecky-a-plectrum-with-rock-hair/customizer.png)

## A menu like it's 1994

For the menus I wanted that Capcom / Team17 / Worms feel: slanted panels, chunky condensed font (Barlow Condensed), the selected avatar dancing on a little stage. Crisp HD though, no pixel fonts.

![The Plecky main menu](/images/posts/plecky-a-plectrum-with-rock-hair/menu.png)

## Cheat sheet

For future me, the stuff to remember from week one:

```bash
scripts/build-rust.sh                      # build the GDExtension into game/bin/macos
scripts/run.sh                             # menu
scripts/run.sh --level=a01-slow-rock-70    # straight into a level
scripts/run.sh --gallery                   # avatar gallery
python3 scripts/make_plecky.py             # regenerate avatars (+ your custom/ drawings)
python3 scripts/regress.py                 # headless regression: Rust tests + bot through every level
```

Screenshots without playing:

```bash
scripts/run.sh --settings=shot --gallery --seconds=4 --screenshot=/tmp/gallery.png
scripts/run.sh --settings=shot --gallery --seconds=5 --frames=/tmp/frames:12:40,90,1200,170
```

`--settings=shot` uses a separate settings file, so your own save stays untouched.

Next week: MIDI, a calibration screen, a stack of new levels and getting this thing on my iPad. See [part 2](/plecky-midi-calibration-ipad-and-windows/).
