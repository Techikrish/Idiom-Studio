# Dusk

> A calm app for sleep, meditation, and a daily morning ritual. Soft, dark, gentle, breathing.

## Direction

**Ritual / Meditation Timer** · Lavender · dark mode · high confidence

The app is a ritual: one clear sequence, a calm pace, and visible progress without pressure.

A dark sanctuary: a breathing circle, minimal text, and slow motion.

**Signature move:** A slow-breathing orb.

### Why this direction

- Matched signals: meditation, sleep, breathing, calm, gentle
- Tone: quiet
- Alternative directions: Editorial (3.5), Organic (3)
- The brief strongly matches Ritual. The layout, type, and surface decisions come from that family rather than from a generic template.

### The direction in one sentence

Near-black surfaces, a single soft accent, a large circular timer, and almost no chrome.

## Principles

- One sequence per screen.
- Progress is visible, not gamified.
- Calm does not mean low contrast.
- The next action is always obvious.

## Signature moves

- A breathing ring that fills with the day.
- A progress bar segmented by week.
- A slow-breathing orb.
- A single handwritten note in the margin.

## Avoid

- A dashboard of rings and invented streaks.
- Confetti for a basic habit.
- Tiny gray text that disappears in sunlight.
- A paywall before the first useful session.

## Screens

### Home
A centered daily ritual: one prompt, one progress indicator, and one primary action. Secondary practices sit below a rule.

### Detail
A practice detail: what it is, how long, what you need, and one start action. Show the real duration.

### Create / compose
A check-in or journal entry: one prompt, a generous text area, a mood control, and a save action that preserves the draft.

### Profile / settings
A calm history: current streak, recent sessions, and settings. No fake social comparison.

## Platform grammar

### iOS
Use a large title but keep the chrome quiet. Prefer a single primary action and a tab bar for two or three peers. Use sheets for check-ins. Respect reduce motion and Dynamic Type. Haptics only on completion.

### Android
Edge-to-edge with a soft surface and a compact top app bar. Use a NavigationBar for two or three peers. Respect the system animation scale. Use 48dp targets and generous spacing.

## Type

| Role | Size | Face | Tracking |
|---|---:|---|---:|
| Display | 30pt/sp | New York / Noto Serif | -0.010em |
| Title | 26pt/sp | New York / Noto Serif | -0.010em |
| Headline | 20pt/sp | New York / Noto Serif | 0 |
| Body | 16pt/sp | SF Pro / Roboto | 0 |
| Label | 13pt/sp | SF Pro / Roboto | +0.040em |
| Caption | 12pt/sp | SF Pro / Roboto | 0 |

Display: `New York / Noto Serif`. Body: `SF Pro / Roboto`. Numeric: `SF Pro / Roboto`.

## Color

| Token | Light | Dark |
|---|---|---|
| `background` | `#FAF6F0` | `#14100E` |
| `surface` | `#FFFFFF` | `#1D1815` |
| `elevated` | `#FFFFFF` | `#27211D` |
| `text` | `#2A211B` | `#F6EEE6` |
| `muted` | `#6B5D53` | `#BCAA9C` |
| `border` | `#E3D8CC` | `#3A302A` |
| `accent` | `#63527A` | `#C4B0E0` |
| `onAccent` | `#FFFFFF` | `#120D18` |
| `success` | `#1F6B45` | `#7BC4A0` |
| `warning` | `#8A5A00` | `#E0B05A` |
| `danger` | `#A61B2B` | `#FF8A8A` |

Light: text 14.6:1, muted 5.9:1, accent on surface 7.0:1, on-accent 7.0:1. Dark: text 16.5:1, muted 8.4:1, accent on surface 8.9:1, on-accent 9.7:1. All pass WCAG AA for their role.

Use the accent for the primary action and one signature detail. Color must never be the only carrier of state: pair it with text, an icon, or a shape.

## Space, shape, motion

- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 pt or dp.
- Screen margin: 24pt/dp; gutter: 20pt/dp.
- Minimum target: 44pt iOS, 48dp Android.
- Radius: small 12, medium 20, large 28.
- Motion: ease-in-out, 220ms fast / 360ms base / 520ms slow.
- Surface model: soft-fill.

## Components

- **Button:** Large, soft, filled with the accent; secondary actions are text or outlined. Minimum 48dp/44pt.
- **List:** Soft rows or cards with 20-28pt radius, no hard shadows. Use whitespace and a subtle tonal fill.
- **Input:** Comfortable line height, visible label, gentle validation, no aggressive red until submit.
- **Navigation:** Quiet top bar, two or three tabs, sheets for check-ins.

## Other variants in this family

- **Morning Pages** — A soft morning ritual: centered prompt, warm paper, one action.
- **Training Log** — A disciplined training log: progress bars, split times, and a clear next set.
- **Meditation Timer** — A dark sanctuary: a breathing circle, minimal text, and slow motion.

## Agent brief

Copy this into the coding agent before it writes UI:

```text
Build a native mobile app called Dusk.

Direction: Ritual / Meditation Timer, Lavender accent, dark-first with full light and dark support.

Thesis: The app is a ritual: one clear sequence, a calm pace, and visible progress without pressure.
Treatment: Near-black surfaces, a single soft accent, a large circular timer, and almost no chrome.
Signature: A slow-breathing orb.

Use the supplied tokens exactly:
- Display face: New York / Noto Serif; body: SF Pro / Roboto; numeric: SF Pro / Roboto.
- Background #FAF6F0 / #14100E; surface #FFFFFF / #1D1815; text #2A211B / #F6EEE6; accent #63527A / #C4B0E0.
- 24pt/dp screen margins, 20pt/dp gutters, 44pt iOS and 48dp Android minimum targets.
- Radius: 12/20/28. Motion: 220-520ms, ease-in-out.

Screen rules:
- Home: A centered daily ritual: one prompt, one progress indicator, and one primary action. Secondary practices sit below a rule.
- Detail: A practice detail: what it is, how long, what you need, and one start action. Show the real duration.
- Create: A check-in or journal entry: one prompt, a generous text area, a mood control, and a save action that preserves the draft.
- Profile: A calm history: current streak, recent sessions, and settings. No fake social comparison.

iOS: Use a large title but keep the chrome quiet. Prefer a single primary action and a tab bar for two or three peers. Use sheets for check-ins. Respect reduce motion and Dynamic Type. Haptics only on completion.
Android: Edge-to-edge with a soft surface and a compact top app bar. Use a NavigationBar for two or three peers. Respect the system animation scale. Use 48dp targets and generous spacing.

Use real sample content from the design file. Build all states: loading, empty, error, offline, permission, and a long-content case. Keep the system back gesture, safe areas, and keyboard insets. Support Dynamic Type / 200% font scale, VoiceOver / TalkBack, and reduce motion. Never use color as the only signal.

Avoid: A dashboard of rings and invented streaks.; Confetti for a basic habit.; Tiny gray text that disappears in sunlight.; A paywall before the first useful session..
```

## Files

- Design spec: `DESIGN.md`
- Machine-readable design: `design.json`
- Design tokens: `tokens.json`
- Visual preview: `preview.html`
- SwiftUI theme: `ios/Theme.swift`
- Compose theme: `android/Theme.kt`
