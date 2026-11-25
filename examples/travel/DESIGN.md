# North

> A local guide for hiking trails, maps, and nearby places. Warm, outdoors, calm, route-first.

## Direction

**Spatial / Trail Map** · Trail Orange · light mode · high confidence

The app is a place: location, movement, and layers give the screen its structure.

A topographic field guide: earthy layers, route lines, and elevation labels.

**Signature move:** A route line that connects cards.

### Why this direction

- Matched signals: maps, local, places, hiking, outdoors, guide, route, trail, map, nearby
- Tone: quiet, warm, natural
- Alternative directions: Organic (4.25), Ritual (2)
- The brief strongly matches Spatial. The layout, type, and surface decisions come from that family rather than from a generic template.

### The direction in one sentence

Earthy palette, contour-like rules, distance labels, and layered place cards.

## Principles

- Place first; list second.
- One floating control layer, not five.
- Use real geography or real spatial hierarchy.
- Cards are annotations, not the page.

## Signature moves

- A route line that connects cards.
- A vertical district label in the margin.
- A floating command bar that follows the canvas.
- A map pin that expands into a place card.

## Avoid

- A map with a generic grid of cards over it.
- A floating action button with no spatial job.
- Decorative contour lines that do not encode data.
- A list that ignores location.

## Screens

### Home
A map or spatial canvas occupies the top two-thirds, with one floating search/control bar and a bottom sheet preview of the nearest place. The list is an annotation, not a wall of cards.

### Detail
A place detail: hero image or map, name, distance, one key fact, and actions (directions, save, share). Keep the back gesture and the map position.

### Create / compose
A route or place creation flow: search, drop a pin, name it, add a note, save. Show the pin on a map before committing.

### Profile / settings
A personal atlas: saved places, routes, and trips. Use a map or spatial index, not a generic settings list.

## Platform grammar

### iOS
Use a full-bleed map or canvas under a floating search field. Use a bottom sheet with detents for place details. Keep the system back gesture. Use SF Symbols and a tab bar for peers.

### Android
Edge-to-edge map or canvas with a floating search bar. Use a bottom sheet for details. Predictive back. Use a NavigationBar or rail; no FAB unless it creates a place.

## Type

| Role | Size | Face | Tracking |
|---|---:|---|---:|
| Display | 36pt/sp | SF Pro / Roboto | -0.020em |
| Title | 28pt/sp | SF Pro / Roboto | -0.020em |
| Headline | 21pt/sp | SF Pro / Roboto | 0 |
| Body | 16pt/sp | SF Pro / Roboto | 0 |
| Label | 13pt/sp | SF Pro / Roboto | +0.060em |
| Caption | 12pt/sp | SF Pro / Roboto | 0 |

Display: `SF Pro / Roboto`. Body: `SF Pro / Roboto`. Numeric: `SF Mono / Roboto Mono`, tabular figures.

## Color

| Token | Light | Dark |
|---|---|---|
| `background` | `#EEF3EC` | `#0F1512` |
| `surface` | `#FFFFFF` | `#17201B` |
| `elevated` | `#FFFFFF` | `#1F2B24` |
| `text` | `#1A2420` | `#EEF5EF` |
| `muted` | `#57645D` | `#A5B5AA` |
| `border` | `#D2DDD4` | `#2C3B32` |
| `accent` | `#B24A18` | `#FF9A62` |
| `onAccent` | `#FFFFFF` | `#1E0D05` |
| `success` | `#1F6B45` | `#7BC4A0` |
| `warning` | `#8A5A00` | `#E0B05A` |
| `danger` | `#A61B2B` | `#FF8A8A` |

Light: text 14.2:1, muted 5.5:1, accent on surface 5.4:1, on-accent 5.4:1. Dark: text 16.7:1, muted 8.6:1, accent on surface 8.0:1, on-accent 9.0:1. All pass WCAG AA for their role.

Use the accent for the primary action and one signature detail. Color must never be the only carrier of state: pair it with text, an icon, or a shape.

## Space, shape, motion

- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 pt or dp.
- Screen margin: 20pt/dp; gutter: 16pt/dp.
- Minimum target: 44pt iOS, 48dp Android.
- Radius: small 8, medium 16, large 24.
- Motion: ease-out, 160ms fast / 240ms base / 360ms slow.
- Surface model: layered.

## Components

- **Button:** Rounded 16-24pt, but only for floating controls and primary actions. List rows stay flat.
- **List:** Place rows with a small map thumbnail or distance marker, a bold name, and one metadata line. No heavy cards.
- **Input:** Search field floats over the map with a clear action and recent searches.
- **Navigation:** Floating search, bottom sheet, tab bar or rail. Keep the system back gesture.

## Other variants in this family

- **Trail Map** — A topographic field guide: earthy layers, route lines, and elevation labels.
- **City Guide** — A bold city index: grid neighborhoods, oversized labels, and photo cards.
- **Studio Canvas** — A light canvas: floating tools, soft panels, and spatial hierarchy.

## Agent brief

Copy this into the coding agent before it writes UI:

```text
Build a native mobile app called North.

Direction: Spatial / Trail Map, Trail Orange accent, light-first with full light and dark support.

Thesis: The app is a place: location, movement, and layers give the screen its structure.
Treatment: Earthy palette, contour-like rules, distance labels, and layered place cards.
Signature: A route line that connects cards.

Use the supplied tokens exactly:
- Display face: SF Pro / Roboto; body: SF Pro / Roboto; numeric: SF Mono / Roboto Mono.
- Background #EEF3EC / #0F1512; surface #FFFFFF / #17201B; text #1A2420 / #EEF5EF; accent #B24A18 / #FF9A62.
- 20pt/dp screen margins, 16pt/dp gutters, 44pt iOS and 48dp Android minimum targets.
- Radius: 8/16/24. Motion: 160-360ms, ease-out.

Screen rules:
- Home: A map or spatial canvas occupies the top two-thirds, with one floating search/control bar and a bottom sheet preview of the nearest place. The list is an annotation, not a wall of cards.
- Detail: A place detail: hero image or map, name, distance, one key fact, and actions (directions, save, share). Keep the back gesture and the map position.
- Create: A route or place creation flow: search, drop a pin, name it, add a note, save. Show the pin on a map before committing.
- Profile: A personal atlas: saved places, routes, and trips. Use a map or spatial index, not a generic settings list.

iOS: Use a full-bleed map or canvas under a floating search field. Use a bottom sheet with detents for place details. Keep the system back gesture. Use SF Symbols and a tab bar for peers.
Android: Edge-to-edge map or canvas with a floating search bar. Use a bottom sheet for details. Predictive back. Use a NavigationBar or rail; no FAB unless it creates a place.

Use real sample content from the design file. Build all states: loading, empty, error, offline, permission, and a long-content case. Keep the system back gesture, safe areas, and keyboard insets. Support Dynamic Type / 200% font scale, VoiceOver / TalkBack, and reduce motion. Never use color as the only signal.

Avoid: A map with a generic grid of cards over it.; A floating action button with no spatial job.; Decorative contour lines that do not encode data.; A list that ignores location..
```

## Files

- Design spec: `DESIGN.md`
- Machine-readable design: `design.json`
- Design tokens: `tokens.json`
- Visual preview: `preview.html`
- SwiftUI theme: `ios/Theme.swift`
- Compose theme: `android/Theme.kt`
