---
title: 'Plecky part 2: MIDI, calibration, iPad and Windows'
date: '2026-11-07 12:00'
author: 'acidjunk'
category: ['Computerz', 'Music']
tags: ["Computerz","Music","plecky","gamedev","godot","rust","midi","ios","xcode","windows","github-actions"]
thumbnail: '/images/posts/plecky-midi-calibration-ipad-and-windows/highway.png'
status: 'published'
---

*Part 2 of the Plecky series. Part 1: [a plectrum with rock hair](/plecky-a-plectrum-with-rock-hair/). Part 3: [LAN party, stars and Android](/plecky-lan-party-stars-and-android/).*

Week two of Plecky, my bass plectrum rhythm platformer. Last week was all about the story, the engine choice and dressing up Plecky. This week the game learned to listen: to a calibration tap, to my MIDI keyboard and to a finger on an iPad. And it runs on Windows now, without me owning a Windows machine.

## Calibration: every device lies a little

Remember from part 1 that Godot reports an output latency of 0 on macOS? That means the game simply doesn't know how late the sound comes out of your speakers. Bluetooth headphones make it way worse. So there's a calibration screen (C in the menu):

![The calibration screen](/images/posts/plecky-midi-calibration-ipad-and-windows/calibrate.png)

Two numbers:

- **Visual offset**: move the flash left or right until it lands exactly on the click.
- **Input offset**: tap SPACE on every click, at least 8 taps. The first 4 are ignored (everybody needs a few to lock in). The average goes into the Judge, and the spread gets logged so I can see how sloppy I am.

Do it once per device. And once more when you switch from speakers to headphones.

## Type B: the highway

The rhythm levels got their proper lane view. Four lanes for the four strings of a bass (E A D G), notes come in from the right, hit them on the line. Holds are bars you keep pressed. Hit windows are perfect ±25 ms, good ±60 ms, okay ±100 ms.

![First Strum, a Type B rhythm level](/images/posts/plecky-midi-calibration-ipad-and-windows/highway.png)

If you miss too much the **rock meter** (top right) runs dry and the song stops. Booed off stage. On easy it drains half as fast.

## MIDI: why it had to be Rust

Godot does have MIDI input, but only on desktop, without timestamps, and only once per rendered frame. At 60 Hz that's up to 16.7 ms of random error per note, which is more than half of the perfect window. Not great for a game that wants to judge your timing.

So MIDI lives in the Rust extension, using the [midir](https://crates.io/crates/midir) crate:

- It connects to every CoreMIDI input and rescans every two seconds, so you can plug in a controller mid-game.
- Every note gets CoreMIDI's **hardware timestamp**, mapped onto Godot's clock. So the Judge asks "where was the song when the string was hit?" instead of "when did the next frame notice?".
- Test without hardware: `plecky-tools midi-send` creates a virtual MIDI source. Ten notes sent 500 ms apart arrived 500.6 ms apart, spread under 2 ms. Nice.

### MIDI pads

I plugged in my Akai MPK mini 3 and wanted the pads on the lanes. Charts map MIDI notes to lanes for a bass, which is the wrong place for a pad controller. So there's a learn screen now: hit the pad you want for lane 1, then lane 2, up to 6. Saved per device.

![The MIDI pads learn screen](/images/posts/plecky-midi-calibration-ipad-and-windows/midimap.png)

(Fun detail: the MPK pads sit on MIDI channel 10 and the keys on channel 1. The mapping ignores channels on purpose, so both just work.)

## Writing charts: Logic and an in-game editor

A chart is a text file. Very readable, very boring to type:

```
bpm = 70
resolution = 16
lanes = E, A, D, G
midi_lanes = { 28 = E, 33 = A, 38 = D, 43 = G }

[1]
E : x...|x...|x...|x...

[2]
E : x.xx|x...|x.xx|x...
```

Two ways around the typing:

**From Logic Pro**: File > Export > Selection as MIDI File, then

```bash
plecky-tools midi-import song.mid \
  --header game/levels/<slug>/chart.txt -o game/levels/<slug>/chart.txt
```

Velocity above 100 becomes an accent, two steps or longer becomes a hold, all quantized to the grid.

**The in-game editor**: press E on a rhythm level. Same highway, but now SPACE plays from the cursor and you place notes with ENTER, A (accent) and H (hold). Or just play along on the keys or a MIDI instrument while it records. S saves the chart and regenerates the click track.

![The in-game chart editor](/images/posts/plecky-midi-calibration-ipad-and-windows/editor.png)

This is my favorite part so far. I charted First Strum, Garage Groove, Open Mic and Soundcheck myself in the editor, on the couch, with a bass on my lap. SHIFT+DEL clears everything, because sometimes you just start over.

## More levels, more music

The platform side grew a lot this week:

| Level | BPM | Thing |
|---|---|---|
| Metal | 120 | moving platforms on the beat |
| Sprint | 150 | fast |
| Stoner | 85 | slow, heavy, long |
| Grunge | 110 | flannel shirt not included |
| Trash | 160 | (thrash, but I keep my spelling) |
| Prog | 95 | first **vertical** level: planks you jump through from below, tunnels |
| Climb | 100 | five storeys up, then a shaft down to the gig |

![Prog, the first vertical level](/images/posts/plecky-midi-calibration-ipad-and-windows/prog.png)

![Trash at 160 BPM](/images/posts/plecky-midi-calibration-ipad-and-windows/trash.png)

![Climb: up up up](/images/posts/plecky-midi-calibration-ipad-and-windows/climb.png)

Eleven platform levels no longer fit in one menu column, so the menu got a big **PLATFORM | RHYTHM** switch in the title bar, and every row shows how many gig tickets you have. Moving platforms also move on the music clock now and not the physics clock, which fixed a lovely bug where jumping off one launched you into space.

## iPad: notes for future me

Getting Godot + a Rust extension on an iPad was the real adventure of the week. Here's everything, so I never have to figure it out again.

### Build the extension for iOS

```bash
rustup target add aarch64-apple-ios aarch64-apple-ios-sim x86_64-apple-ios
scripts/build-ios.sh
```

The script builds device and simulator and packs both into `game/bin/ios/plecky_core.xcframework` with a hand-written `Info.plist`. The crate compiled without changes, and midir uses CoreMIDI on iOS too, so a MIDI controller works on the iPad as well. The `.gdextension` file points `ios.debug` and `ios.release` at the xcframework; Godot turns it into a proper `.framework` on export.

### The export preset

The "iOS" preset uses `export_project_only=true`, so Godot writes an Xcode project (`build/ios/Plecky.xcodeproj`) and Xcode does the signing. Things it insisted on, all with useless error messages:

- an **App Store Team ID** (any non-empty string gets you past the export, the real one for signing)
- `rendering/textures/vram_compression/import_etc2_astc=true`; without it the export fails with an **empty** error message
- an **app icon** (1024 px `game/icon.png`)

### The simulator is x86_64 only

Godot 4.7.2's simulator `libgodot.a` is x86_64, even though its plist says arm64 too. Building for an arm64 simulator gives `found architecture 'x86_64', required architecture 'arm64'`. Fix: `ARCHS=x86_64`, or pick a Rosetta simulator in Xcode.

### First run on a real iPad

1. Accept the Xcode license once: `sudo xcodebuild -license accept`. Until you do, `git`, `python3` and `cc` all refuse to run. Yes, `git` too.
2. Pair: `xcrun devicectl manage pair --device <udid>`, trust the computer on the iPad.
3. Turn on **Developer Mode** (Settings > Privacy & Security). The switch only shows up after pairing. The iPad reboots and asks again.
4. Add your Apple ID in Xcode and pick the team in Signing & Capabilities. My company team refused with "PLA Update available" until the account holder accepted the new license agreement on developer.apple.com.
5. Build, install, launch:

```bash
xcodebuild -project build/ios/Plecky.xcodeproj -scheme Plecky \
  -configuration Release -sdk iphoneos -destination 'id=<udid>' \
  -allowProvisioningUpdates -allowProvisioningDeviceRegistration \
  DEVELOPMENT_TEAM=<team-id> CODE_SIGN_STYLE=Automatic \
  CODE_SIGN_IDENTITY="Apple Development" \
  -derivedDataPath build/ios/derived-dev build

xcrun devicectl device install app --device <udid> \
  build/ios/derived-dev/Build/Products/Release-iphoneos/Plecky.app

xcrun devicectl device process launch --console --device <udid> nl.formatics.plecky
```

6. The first launch fails with "profile has not been explicitly trusted". Trust it on the iPad: Settings > General > VPN & Device Management.

With `--console` you see stdout, and the first line that matters is `Initialize godot-rust (...)`: the Rust extension runs on iOS. Careful, ending the console capture kills the app.

When I got a second iPad I also had to change the bundle id: the old `com.acidjunk.plecky` was taken by my personal team, so it's `nl.formatics.plecky` now.

### The empty level list

The first iPad build started fine and showed... no levels. The export only packs Godot *resources*, so `level.toml`, `chart.txt` and the `.ldtk` files were missing. Every preset now has `include_filter="*.toml,*.txt,*.ldtk,*.wav,*.json"`. And WAV stems still went missing, because Godot only packs the imported copy of an audio file, never the source. Keep that one in mind, it comes back with a vengeance in part 3.

### Touch

No keyboard on an iPad, so: two pads bottom left to move, tap anywhere else to jump (hold for higher), a finger on a lane band in rhythm levels, X and R rings in the corners for back and restart. Every touch is turned into the same action the keyboard would do, so there's no second input path to maintain. `--touch` shows the zones on the desktop:

![Touch zones on Slow Rock](/images/posts/plecky-midi-calibration-ipad-and-windows/touch.png)

## Windows (and macOS) builds without a Windows machine

I don't have a Windows box, so GitHub Actions does it. `.github/workflows/build.yml` runs on every push to main:

- Rust tests and a Linux build of the extension on Ubuntu
- the headless regression on Ubuntu (the bot plays every level)
- the Windows extension, then a Windows export with the PCK embedded
- a macOS export: universal dylib via `lipo`, ad-hoc signed (Apple Silicon won't run it otherwise; not notarized, so right-click Open the first time)
- a separate iOS job that builds the simulator and an unsigned device app

Publishing a GitHub release attaches `Plecky-windows.zip` and `Plecky-macos.zip`, so friends can test without digging through the Actions tab.

Gotchas that bit me:

- `godot.sh` had a zsh shebang. Ubuntu runners don't have zsh. POSIX `sh` it is.
- The iOS job needs **macos-26**: Xcode 15.4 on macos-14 can't link Godot 4.7.2's Swift objects.
- The extension was registered twice (an old `.gdextension` file from the first spike was still lying around). Locally it happened to work, in CI it crashed on export. The regression now fails on any ERROR or panic line.

## Cheat sheet

```bash
scripts/run.sh --calibrate                       # calibration screen
scripts/run.sh --midi-map                        # learn MIDI pads
scripts/run.sh --edit=b04-open-mic-80            # chart editor
plecky-tools chart-check <chart.txt> --notes     # validate a chart
plecky-tools midi-send --delay-s 6 --count 10    # fake MIDI device
scripts/build-ios.sh                             # iOS xcframework
xcrun devicectl list devices                     # find the iPad's udid
```

Next week: playing Plecky together over Wi-Fi, stars, more crazy levels and a first look at Android. On to [part 3](/plecky-lan-party-stars-and-android/).
