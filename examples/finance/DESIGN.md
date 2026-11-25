# Ledger

> A precise, dense portfolio app for tracking investments, budgets, and market positions. Dark, technical, fast, green signal.

## Direction

**Instrument / Flight Deck** · Signal Green · dark mode · high confidence

The app is a precision instrument: dense information, exact alignment, and no decoration that competes with the data.

A dark cockpit: segmented gauges, uppercase labels, and amber alerts.

**Signature move:** A segmented status rail across the top.

### Why this direction

- Matched signals: budget, portfolio, investment
- Tone: cool, warm, natural
- Alternative directions: Organic (4.75), Utility (2.5)
- The brief strongly matches Instrument. The layout, type, and surface decisions come from that family rather than from a generic template.

### The direction in one sentence

Dark-first, mono labels, compact rows, and a single amber warning color.

## Principles

- Data first; chrome second.
- Alignment is the decoration.
- Every number has a unit, a time, and a comparison.
- Color encodes state, not category.

## Signature moves

- A total that updates in place with tabular figures.
- A segmented status rail across the top.
- A measurement grid behind the data.
- A delta marker that sits on the baseline.

## Avoid

- Equal-weight cards for every metric.
- A dashboard with no primary question.
- Green and red as the only signal.
- Decorative gradients behind numbers.

## Screens

### Home
One dominant total, a compact delta, a status rail, and rows with aligned columns. The total is the only oversized element.

### Detail
A single position: price, change, position size, cost basis, and a simple chart. Actions sit in the toolbar or at the bottom, not floating.

### Create / compose
A transaction form: amount first, then account, category, date, and note. Use a numeric keypad, inline validation, and a visible save state.

### Profile / settings
Settings and account: grouped rows, clear labels, no invented achievements. Security and data export are easy to find.

## Platform grammar

### iOS
Use a compact navigation title, not a large title. Use SF Mono for numbers and SF Pro for labels. Put filters in the toolbar. Keep rows at 44pt minimum. Use a tab bar only for peers; otherwise use a segmented control. Keep the system back gesture.

### Android
TopAppBar with title and filter action. Edge-to-edge. Use a compact NavigationBar or rail. No FAB unless there is one dominant create action. Use tabular figures and 48dp rows. Predictive back must work.

## Type

| Role | Size | Face | Tracking |
|---|---:|---|---:|
| Display | 34pt/sp | SF Pro / Roboto | -0.010em |
| Title | 26pt/sp | SF Pro / Roboto | -0.010em |
| Headline | 20pt/sp | SF Pro / Roboto | 0 |
| Body | 14pt/sp | SF Pro / Roboto | 0 |
| Label | 12pt/sp | SF Pro / Roboto | +0.060em |
| Caption | 11pt/sp | SF Pro / Roboto | 0 |

Display: `SF Pro / Roboto`. Body: `SF Pro / Roboto`. Numeric: `SF Mono / Roboto Mono`, tabular figures.

## Color

| Token | Light | Dark |
|---|---|---|
| `background` | `#F3F4F2` | `#0B0D0C` |
| `surface` | `#FFFFFF` | `#141715` |
| `elevated` | `#FFFFFF` | `#1C201D` |
| `text` | `#111311` | `#F1F5F0` |
| `muted` | `#555A55` | `#A3ADA4` |
| `border` | `#D4D8D2` | `#2B322C` |
| `accent` | `#0B7A3B` | `#4ADE80` |
| `onAccent` | `#FFFFFF` | `#08130C` |
| `success` | `#1F6B45` | `#7BC4A0` |
| `warning` | `#8A5A00` | `#E0B05A` |
| `danger` | `#A61B2B` | `#FF8A8A` |

Light: text 16.9:1, muted 6.4:1, accent on surface 5.4:1, on-accent 5.4:1. Dark: text 17.7:1, muted 8.4:1, accent on surface 10.4:1, on-accent 10.9:1. All pass WCAG AA for their role.

Use the accent for the primary action and one signature detail. Color must never be the only carrier of state: pair it with text, an icon, or a shape.

## Space, shape, motion

- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 pt or dp.
- Screen margin: 16pt/dp; gutter: 12pt/dp.
- Minimum target: 44pt iOS, 48dp Android.
- Radius: small 0, medium 4, large 8.
- Motion: linear-fast, 100ms fast / 160ms base / 240ms slow.
- Surface model: flat-grid.

## Components

- **Button:** Rectangular with a 0-4pt radius. Primary filled with the signal accent; secondary outlined with a 1pt border. Numeric labels use tabular figures.
- **List:** Rows with a 1pt bottom rule, 12-16pt vertical padding, aligned numeric columns, no cards.
- **Input:** Label above, value right-aligned for numbers, unit inside the field. Error text below in the danger color.
- **Navigation:** Compact title, filter in the toolbar, tab bar or rail for peers. No hamburger.

## Other variants in this family

- **Trading Desk** — A live desk: dense rows, tabular numbers, and green/red signals used only for state.
- **Flight Deck** — A dark cockpit: segmented gauges, uppercase labels, and amber alerts.
- **Laboratory** — A clean lab: light grid, precise columns, and blue calibration marks.

## Agent brief

Copy this into the coding agent before it writes UI:

```text
Build a native mobile app called Ledger.

Direction: Instrument / Flight Deck, Signal Green accent, dark-first with full light and dark support.

Thesis: The app is a precision instrument: dense information, exact alignment, and no decoration that competes with the data.
Treatment: Dark-first, mono labels, compact rows, and a single amber warning color.
Signature: A segmented status rail across the top.

Use the supplied tokens exactly:
- Display face: SF Pro / Roboto; body: SF Pro / Roboto; numeric: SF Mono / Roboto Mono.
- Background #F3F4F2 / #0B0D0C; surface #FFFFFF / #141715; text #111311 / #F1F5F0; accent #0B7A3B / #4ADE80.
- 16pt/dp screen margins, 12pt/dp gutters, 44pt iOS and 48dp Android minimum targets.
- Radius: 0/4/8. Motion: 100-240ms, linear-fast.

Screen rules:
- Home: One dominant total, a compact delta, a status rail, and rows with aligned columns. The total is the only oversized element.
- Detail: A single position: price, change, position size, cost basis, and a simple chart. Actions sit in the toolbar or at the bottom, not floating.
- Create: A transaction form: amount first, then account, category, date, and note. Use a numeric keypad, inline validation, and a visible save state.
- Profile: Settings and account: grouped rows, clear labels, no invented achievements. Security and data export are easy to find.

iOS: Use a compact navigation title, not a large title. Use SF Mono for numbers and SF Pro for labels. Put filters in the toolbar. Keep rows at 44pt minimum. Use a tab bar only for peers; otherwise use a segmented control. Keep the system back gesture.
Android: TopAppBar with title and filter action. Edge-to-edge. Use a compact NavigationBar or rail. No FAB unless there is one dominant create action. Use tabular figures and 48dp rows. Predictive back must work.

Use real sample content from the design file. Build all states: loading, empty, error, offline, permission, and a long-content case. Keep the system back gesture, safe areas, and keyboard insets. Support Dynamic Type / 200% font scale, VoiceOver / TalkBack, and reduce motion. Never use color as the only signal.

Avoid: Equal-weight cards for every metric.; A dashboard with no primary question.; Green and red as the only signal.; Decorative gradients behind numbers..
```

## Files

- Design spec: `DESIGN.md`
- Machine-readable design: `design.json`
- Design tokens: `tokens.json`
- Visual preview: `preview.html`
- SwiftUI theme: `ios/Theme.swift`
- Compose theme: `android/Theme.kt`
