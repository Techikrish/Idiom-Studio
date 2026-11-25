# Tokens

`tokens.json` is the implementation source of truth. This reference explains the schema and how to map
it to SwiftUI and Compose without losing the direction.

## 1. Schema

```jsonc
{
  "name": "Instrument / Flight Deck",
  "appName": "Ledger",
  "slug": "ledger",
  "family": { "id": "instrument", "name": "Instrument" },
  "variant": { "id": "flight-deck", "name": "Flight Deck" },
  "accent": { "id": "signal-green", "name": "Signal Green" },
  "mode": "dark",
  "seed": "…",
  "color": {
    "light": { "background": "#…", "surface": "#…", "elevated": "#…", "text": "#…", "muted": "#…", "border": "#…", "accent": "#…", "onAccent": "#…", "success": "#…", "warning": "#…", "danger": "#…" },
    "dark":  { "…": "…" }
  },
  "type": {
    "display": "mono",
    "body": "sans",
    "numeric": "tabular",
    "displayFamily": "SF Mono / Roboto Mono",
    "bodyFamily": "SF Pro / Roboto",
    "numericFamily": "SF Mono / Roboto Mono",
    "scale": 1.25,
    "sizes": { "display": 56, "title": 28, "headline": 21, "body": 17, "label": 12, "caption": 11 },
    "tracking": { "display": -0.02, "label": 0.08 },
    "lineHeight": { "display": 1.05, "title": 1.15, "headline": 1.25, "body": 1.5, "label": 1.2, "caption": 1.3 }
  },
  "space": [4, 8, 12, 16, 24, 32, 48, 64],
  "radius": { "small": 4, "medium": 10, "large": 16, "pill": 999 },
  "layout": {
    "density": "compact",
    "margin": 16,
    "gutter": 12,
    "minTarget": { "ios": 44, "android": 48 },
    "maxContentWidth": 680
  },
  "motion": { "curve": "ease-out", "easing": "cubic-bezier(…)", "fast": 90, "base": 150, "slow": 240 },
  "contrast": { "light": { … }, "dark": { … } },
  "surface": "instrument-panel",
  "shapeFamily": "technical"
}
```

All sizes are points on iOS and scale-independent pixels on Android.

## 2. Color roles

| Token | Use | Do not |
|---|---|---|
| `background` | Screen background | Use for cards |
| `surface` | Cards, sheets, list rows | Use as the whole screen |
| `elevated` | A raised surface above `surface` | Stack three elevations |
| `text` | Primary text and icons | Use for large decorative fills |
| `muted` | Secondary text, captions, metadata | Use below 4.5:1 |
| `border` | Hairlines, dividers, input outlines | Use as a shadow substitute |
| `accent` | Primary action, one signature detail | Use on every icon |
| `onAccent` | Text/icons on `accent` | Use on `background` |
| `success` | Confirmed state | Carry state by color alone |
| `warning` | Caution, deadline | Use as decoration |
| `danger` | Destructive action, error | Use for non-destructive emphasis |

Rules:

- The accent is a spotlight, not a coat of paint. Primary action plus one detail per screen.
- Semantic colors always pair with text, an icon, or a shape.
- Both modes are first-class. Do not derive dark by inverting light.
- Contrast is already validated: text/muted 4.5:1, accent on surface 3:1, on-accent 4.5:1.

## 3. Type roles

| Role | Use | Notes |
|---|---|---|
| `display` | The one big statement per screen | Family-specific face and tracking |
| `title` | Screen and section titles | Slightly tighter than display |
| `headline` | Card and row headings | Body face or display face by family |
| `body` | Reading text | Never below 17pt iOS / 16sp Android |
| `label` | Buttons, tabs, overlines | Often uppercase with tracking |
| `caption` | Metadata, timestamps | Never the only explanation |

Rules:

- Use semantic text styles so Dynamic Type / font scale works.
- `displayFamily` is a system family name. Do not fetch a web font.
- Numeric data uses `numericFamily`; tabular figures where the family specifies `tabular`.
- Do not apply display tracking to body text.

## 4. Space, shape, motion

- `space` is a 4-based scale. Use it for padding, gaps, and section rhythm.
- `layout.margin` is the screen edge; `layout.gutter` is the gap between columns.
- `layout.minTarget` is the minimum touch target. Never go below it.
- `radius.small` is for inputs and chips; `medium` for buttons and cards; `large` for sheets and
  feature surfaces. `pill` is only for genuinely pill-shaped controls.
- `motion.fast` is for state changes; `base` for transitions; `slow` for entrances. Respect reduce
  motion: replace movement with a cross-fade.

## 5. SwiftUI mapping

```swift
import SwiftUI

@main
struct LedgerApp: App {
    var body: some Scene {
        WindowGroup {
            RootView()
                .tint(StudioTheme.Colors.accent)
                .background(StudioTheme.Colors.background)
        }
    }
}
```

```swift
struct BalanceCard: View {
    var body: some View {
        VStack(alignment: .leading, spacing: StudioTheme.Spacing.s2) {
            Text("TOTAL BALANCE")
                .font(StudioTheme.Typography.label())
                .tracking(StudioTheme.Typography.labelTracking)
                .foregroundStyle(StudioTheme.Colors.muted)
            Text("$84,210.40")
                .font(StudioTheme.Typography.numeric(40))
                .foregroundStyle(StudioTheme.Colors.text)
        }
        .padding(StudioTheme.Spacing.s4)
        .background(StudioTheme.Colors.surface, in: RoundedRectangle(cornerRadius: StudioTheme.Radius.medium))
        .overlay(
            RoundedRectangle(cornerRadius: StudioTheme.Radius.medium)
                .stroke(StudioTheme.Colors.border, lineWidth: 1)
        )
    }
}
```

Notes:

- Use `.foregroundStyle`, not `.foregroundColor`, for new code.
- Use `@ScaledMetric` only for custom dimensions that must scale with type.
- Do not hard-code `.system(size:)` in screens; use the theme functions.
- Keep the system back button and toolbar.

## 6. Compose mapping

```kotlin
@Composable
fun LedgerApp() {
    StudioTheme {
        Surface(color = MaterialTheme.colorScheme.background) {
            RootScreen()
        }
    }
}
```

```kotlin
@Composable
fun BalanceCard() {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(
                MaterialTheme.colorScheme.surface,
                RoundedCornerShape(StudioTokens.radiusMedium)
            )
            .border(
                1.dp,
                MaterialTheme.colorScheme.outline,
                RoundedCornerShape(StudioTokens.radiusMedium)
            )
            .padding(StudioTokens.space[3]),
        verticalArrangement = Arrangement.spacedBy(StudioTokens.space[1])
    ) {
        Text(
            "TOTAL BALANCE",
            style = MaterialTheme.typography.labelLarge,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Text(
            "$84,210.40",
            style = MaterialTheme.typography.displayLarge,
            color = MaterialTheme.colorScheme.onSurface
        )
    }
}
```

Notes:

- Use `MaterialTheme.colorScheme` and `MaterialTheme.typography`, not raw colors or sp values.
- Use `Modifier.heightIn(min = StudioTokens.minTarget)` on every interactive element.
- Apply `imePadding()` to forms and composers.
- Keep predictive back and edge-to-edge insets.

## 7. Component recipes

### Button

- Height: at least 44pt / 48dp; 48–52 for the primary action.
- Radius: `radius.medium` unless the family says otherwise.
- Primary: `accent` fill, `onAccent` label.
- Secondary: transparent fill, `border` outline, `text` label.
- Destructive: `danger` text or fill, with a confirmation.
- Never icon-only for a consequential action.

### List

- Use rows for settings and dense data; cards only when each item is a distinct object.
- Separator: 1px `border`, inset to the text start.
- Row height: at least 44pt / 48dp.
- Trailing value or chevron, not both unless the value is editable.

### Input

- Label above the field, hint below, error below in text and color.
- Value first, unit inside the field.
- Use the system keyboard; set the correct keyboard type.
- Validate inline; never clear the field on error.

### Navigation

- iOS: `NavigationStack` + `TabView` for 2–3 peers; sheets with detents for tasks.
- Android: `TopAppBar` + `NavigationBar` for 2–3 peers; predictive back; no hamburger.
- One primary action in the toolbar. Overflow in a menu.

### Empty state

- Say what is missing.
- Offer exactly one next action.
- Do not use a decorative illustration that hides the action.

## 8. Accessibility checklist

- [ ] Text scales to at least 200% without clipping.
- [ ] Every icon-only control has a label.
- [ ] Every target is at least 44pt / 48dp.
- [ ] Contrast passes in both modes.
- [ ] State is not carried by color alone.
- [ ] Reduce motion is respected.
- [ ] Focus order matches reading order.
- [ ] Forms work with the keyboard open.
- [ ] RTL layouts mirror correctly where localized.
- [ ] Charts and maps have a text alternative.
