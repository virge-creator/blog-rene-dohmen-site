---
title: 'Plecky part 3: LAN party, stars and Android'
date: '2026-11-14 12:00'
author: 'acidjunk'
category: ['Computerz', 'Music']
tags: ["Computerz","Music","plecky","gamedev","godot","rust","multiplayer","android","ios"]
thumbnail: '/images/posts/plecky-lan-party-stars-and-android/result.png'
status: 'published'
---

*Part 3 of the Plecky series. Part 1: [a plectrum with rock hair](/plecky-a-plectrum-with-rock-hair/). Part 2: [MIDI, calibration, iPad and Windows](/plecky-midi-calibration-ipad-and-windows/). Part 4: [Coco, worlds and a jetpack](/plecky-coco-worlds-and-a-jetpack/).*

Week three of Plecky. Two kids in the house means only one thing: we want to play together. So this week Plecky got LAN play, a result screen with stars that bounce in, four new crazy levels, my 185 BPM metal takes and a first go at Android.

## LAN play: the band on one Wi-Fi

Up to eight players on the same network. One hosts, the others join. The host picks a level and it starts on every device at exactly the same moment.

![The LAN lobby](/images/posts/plecky-lan-party-stars-and-android/lanlobby.png)

How it plays:

- **Rhythm levels**: everybody plays the same song, the band's live scores sit bottom right. If your rock meter runs dry you're not kicked out, you're **booed off for two seconds** and then you're back. At the end a card ranks the band.
- **Platform levels**: the other players are half transparent ghosts with their own avatars. Everyone sees the **same camera**: the captain's (the player furthest along, or a fixed one the host picks). Fall behind the left edge and you die, and come back next to the captain two seconds later. When the first player reaches the gig, everybody has five seconds left: **GIG RUSH** bonus for whoever makes it.

### How the sync works

This was the part I was most curious about, because "start at the same moment" in a rhythm game means milliseconds.

- Godot's built-in multiplayer (ENet over UDP) does the messaging. Works on Windows, macOS, Linux, iOS and Android.
- When you join, the client pings the host sixteen times, keeps the eight fastest and takes the median clock offset.
- Once everybody has loaded the level the host says "start at host tick T", with T 1.5 seconds in the future. Every device maps sample 0 of the music onto its local T.
- And the nice bonus of building everything on the song clock from day one: beat blocks, moving platforms, catapults, the hue shifts... they're all functions of the song position. So the world doesn't need to be synced at all. Only the players do.

### Finding each other: no broadcast on iOS

The usual trick for "find games on the network" is a UDP broadcast. On iOS that needs a **restricted Apple entitlement** (`com.apple.developer.networking.multicast`) that you have to request case by case. Plain unicast needs nothing. So the scanner just sends one tiny `PLECKY?` packet to all 254 addresses of your subnet (50 per frame) and hosts answer `PLECKY!` with their name and level. Low tech, works everywhere. You can also type the address.

Notes for future me:

- iOS needs `NSLocalNetworkUsageDescription` in the plist and asks the user for Local Network permission once. Refuse it and the scan stays empty (typing the address still works).
- macOS 15 asks the same for the exported app, but **not** for programs run from Terminal, so you never see it while testing.
- Windows Firewall asks the first time you host.
- Guest Wi-Fi or "AP isolation" blocks it all.

### The first real test

I tested it the same evening, and it worked on the first go! Well, almost:

1. The **iPad had no sound**. Godot's default iOS audio session category is Ambient, which respects the silent switch. Set `audio/general/ios/session_category` to **Playback**.
2. The other device said the iPad had a **"different version"**. The level hash included the sizes of the WAV files, and an exported build doesn't have the source WAVs. So an exported build could never match one running from source. The hash now covers only the level and chart files.

So some tweaking was needed.

## Fancy dialogs: stars!

After playing it a lot people complained that nobody ever reaches 100% on a rhythm level. The best I had seen was 75%. Turns out the percentage was score divided by max score, and max score meant every single note inside the 25 ms perfect window. Not humane.

Now the percentage is simply **the share of notes you hit**. Hit every note and it's 100%, the score still rewards tight timing. And at the end a card drops in with one to three stars (60, 80 and 95%) in the Angry Birds style: they pop in one by one with a bounce, sparks and a rising chime, the score counts up and there's a NEW BEST tag.

![Stage clear with three stars](/images/posts/plecky-lan-party-stars-and-android/result.png)

The stars are drawn as polygons, because my lovely Barlow font has no star glyph. The menu shows your best stars per rhythm level too.

Platform levels got some love as well: tickets you already collected come back in **silver** on a replay and count for the run score. Collect every ticket in one run and reach the gig: **FULL HOUSE**, +500.

## More levels

Level design is where I'm now really having fun. I describe what I want, the level gets generated, I play it, I complain, it gets fixed.

**Dive** (90 BPM) is about secrets. Five gaps that all look the same. Most of them kill you. One is the only way forward, one hides a room with two tickets. And there's a nice climb up a wall as distraction, with nothing up there but one ticket. New elements: a **trampoline** and a **catapult** that fires you up on the next beat.

![Dive: which gap is the right one?](/images/posts/plecky-lan-party-stars-and-android/dive.png)

After my first play I found you could see the hidden rooms while falling into a deadly gap. So now there's an invisible KillZone two rows down. What the camera doesn't show, you don't know.

**Climb** got rebuilt: storeys 26 rows apart so you can't see the next floor even on a 4:3 iPad, catapults, spike beds under the planks and beat-block bridges over spikes. 15 tickets.

**Surf** (140 BPM) brings three new elements: a **slide** (a ramp you slide down faster than you run, jump off it and you fly over pits no running jump can cross), **ice** (good luck stopping) and a **fan** (stand in the updraft and float up, it blows on the beat).

![Surf with slides](/images/posts/plecky-lan-party-stars-and-android/surf.png)

Also the **jump feel** finally feels right: tap for a hop, hold for a jump of four cells, or a quick double tap for the same high jump (much nicer on a touchscreen). And the screen no longer flashes on every beat, which at 185 BPM was a bit much. Instead the ground shifts hue once per bar. Subtle, but you feel the music move.

## More music: Magic Metal at 185 BPM

I recorded nine takes at **185 BPM**. That's a level now: **Magic Metal**, nine checkpoints, every checkpoint the next take, 300 cells long. Getting closer to that fastest plectrum alive!

![Magic Metal at 185 BPM](/images/posts/plecky-lan-party-stars-and-android/magic.png)

And then the bug of the week. I heard Magic Metal loop back to the start after about four of its eight bars. The stems were fine. The cause: Godot 4.7 imports WAV files by default as **QOA**, a lossy codec, and the code calculated the loop length from the data size as if it was 16-bit PCM. QOA data is 2.47x smaller. So since the iPad fix in part 2 (load the imported resource instead of the raw WAV), every Type A level had a beat grid running **2.47 times too fast**. For ten days. That also explains the "flickering" I had complained about: 185 BPM times 2.47 is 7.6 flashes per second.

Fix for future me: set every `.wav.import` to `compress/mode=0` and add an importer default in `project.godot` so new WAVs come in as PCM. The game now refuses compressed stems with an error, so this can't sneak back in.

## Android: almost

Android was always going to be last, mostly because of audio. Godot 4.7 still drives Android audio through OpenSL ES with big fixed buffers at 44.1 kHz. People report around 100 ms latency on a Pixel and 500 ms over Bluetooth. A constant latency is fine, that's what calibration is for. A wobbly one is not. A new Oboe audio driver is in the works, and I'll re-check when it lands. Bluetooth headphones are a no for rhythm levels.

Where it stands, for future me:

- **Install Android Studio** (the one-download route, no Homebrew). It brings the SDK in `~/Library/Android/sdk`, `adb`, the emulator and its own JDK (JBR).
- Point Godot's editor setting `export/android/java_sdk_path` at Android Studio's JBR; `apksigner` needs a Java.
- The **NDK** has to come from Android Studio's SDK Manager: SDK Tools tab, "NDK (Side by side)". There are no command-line tools, so no `sdkmanager`.
- **midir has no Android backend**, so on Android the MIDI module is a stub that finds no ports. MIDI on a phone is a later problem.
- `scripts/build-android.sh` uses the NDK's clang as linker, API level 24, the 16 KB page-size flag (`-Wl,-z,max-page-size=16384`), arm64 only, and copies the `.so` to `game/bin/android/`.
- The `.gdextension` has `android.debug.arm64` and `android.release.arm64`. The "Android" preset: no Gradle build, arm64, package `nl.formatics.plecky`, internet permission for LAN play, signed with the debug keystore.

Status: `--export-debug Android` already produces a signed 103 MB APK. But the Rust library in it is still a zero-byte placeholder until the NDK is installed, so it can't run the game yet. Next steps:

```bash
scripts/build-android.sh release
/Applications/Godot.app/Contents/MacOS/Godot --path game --headless --export-debug Android ../build/android/Plecky.apk
adb install -r build/android/Plecky.apk
adb logcat | grep -i godot          # look for the godot-rust init line
emulator -avd Medium_Phone          # no phone? use the emulator
```

## Where we are after three weeks

- 11 platform levels from 70 to 185 BPM, 5 rhythm levels
- 19 avatars plus your own drawing
- runs on macOS, Windows and iPad, Android almost
- LAN play for up to eight
- a regression suite where a bot plays every level, including a LAN host and client on one machine

Still open: real art instead of coloured blocks, more of my own music (the 120 BPM metal takes are still on my list), secret corridors hidden behind the HUD and eventually Steam. But mostly: playing it. It's a game!
