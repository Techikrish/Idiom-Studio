# Finish

Finish is the difference between a screen that is correct and a screen that is considered. None of
this blocks a release, but all of it is visible.

---

## Motion

Motion explains a change. It is not a personality layer applied to every tap.

### Signature

Choose **one** motion idea and use it consistently:

- A soft ease-out for navigation and reveals.
- A spring only for direct manipulation (drag, reorder, pull).
- A crossfade for state changes.
- A shared-element transition for continuity between list and detail.

Do not mix a spring, a bounce, a stagger, and a parallax on the same screen.

### Timing

| Platform | Fast | Base | Slow |
|---|---|---|---|
| iOS | 120–180ms | 220–280ms | 320–400ms |
| Android M3 | 100–150ms | 180–240ms | 280–360ms |

- Entrances can be slightly slower than exits.
- A tap acknowledgment should be immediate; the visible result can settle.
- Never make a user wait for an animation to finish before they can act.

### Reduce motion

Every animation needs a fallback:

```swift
@Environment(\.accessibilityReduceMotion) private var reduceMotion

withAnimation(reduceMotion ? nil : .easeOut(duration: 0.24)) {
    isExpanded.toggle()
}
```

```kotlin
val durationScale = LocalMotionDurationScale.current.scaleFactor
val duration = if (durationScale == 0f) 0 else 240
```

A crossfade is usually the right fallback. Do not simply remove the state change; remove the movement.

### Haptics

- Use haptics on commitment: save, send, delete, successful payment, a detent snap.
- Do not use haptics on every tap, scroll, or hover.
- Match intensity to consequence. A destructive confirmation is not a success.
- Respect the system haptics setting.

### Continuity

If a list item opens a detail, the shared element should travel. If a sheet expands, the content should
not jump. If a filter changes the list, keep the scroll position stable unless the content is replaced.

---

## Typography

### Use the platform scale

- iOS: `.largeTitle`, `.title`, `.title2`, `.title3`, `.headline`, `.body`, `.callout`, `.subheadline`,
  `.footnote`, `.caption`, `.caption2`.
- Android: `MaterialTheme.typography.displayLarge` through `labelSmall`, or a project type scale built
  on it.

A screen with more than four or five sizes is usually compensating for weak hierarchy. Use weight,
color, and spacing before adding another size.

### Numerals

- Money, time, counts, and measurements use tabular numerals (`monospacedDigit()` on iOS,
  `FontFeature.TABULAR_FIGURES` on Android) so they do not jitter when they change.
- Align units and decimal points in columns.
- Do not use a display face for dense data.

### Line length and truncation

- Body text: roughly 50–75 characters per line on phone.
- Avoid `lineLimit(1)` on content that can grow with Dynamic Type. If you must truncate, make the full
  value available elsewhere.
- Do not use fixed heights on text containers.

### Optical alignment

Mathematical centering is not visual centering. Icons, numerals, and punctuation often need a small
offset. Check the screen at 100% and at large type.

---

## Color

### Semantic roles

Define roles, not colors:

```swift
enum Theme {
    static let background = Color(hex: "#FAF8F3")
    static let surface = Color(hex: "#FFFFFF")
    static let textPrimary = Color(hex: "#1A1A18")
    static let textMuted = Color(hex: "#5F5A52")
    static let accent = Color(hex: "#8C2F1B")
    static let onAccent = Color(hex: "#FFFFFF")
}
```

```kotlin
private val Background = Color(0xFFFAF8F3)
private val Surface = Color(0xFFFFFFFF)
private val TextPrimary = Color(0xFF1A1A18)
private val TextMuted = Color(0xFF5F5A52)
private val Accent = Color(0xFF8C2F1B)
private val OnAccent = Color(0xFFFFFFFF)
```

- One accent. If everything is accented, nothing is.
- Semantic error, warning, and success roles are separate from the brand accent.
- Dark mode is a separate set of roles, not an inversion. Re-measure contrast.
- Do not use pure black on pure white as a default; it is harsh and leaves no room for elevation.
- Do not put text on a gradient without measuring the worst case.

### Tinting

- iOS: `.tint()` on the control, not on every view.
- Android: `MaterialTheme.colorScheme.primary` for interactive elements; do not hardcode.
- Destructive actions use the platform destructive role, not the brand accent.

---

## Spacing

- Use a 4pt grid, with an 8pt rhythm for layout.
- Common steps: 4, 8, 12, 16, 24, 32, 40, 48, 64.
- Screen margins: 16–24pt on phone, wider on tablet.
- Density is a decision: compact for data, comfortable for reading, spacious for media.
- Optical spacing beats mathematical spacing. A heading often needs less space above than below.

`idiom lint` flags off-grid padding as a Finish finding.

---

## Surfaces

Choose a surface logic and apply it consistently:

| Logic | Use |
|---|---|
| **Border-first** | Calm, editorial, dense interfaces; separates without elevation |
| **Shadow** | Only for overlays and floating controls; shadows imply z-order |
| **Tonal fill** | Grouping and selection; no shadow |
| **Material / glass** | The control layer and overlays where content must remain visible |
| **Flat** | Data-dense or high-contrast interfaces; hierarchy comes from type |

Rules:

- A card with a shadow inside a card with a shadow is visual noise.
- A border and a shadow on the same surface usually means neither was decided.
- Glass on content is a Floor issue, not a Finish preference.
- Corner radius should follow a scale, not a random value per component.

---

## Iconography

- iOS: SF Symbols. Android: Material Symbols.
- Keep one weight and one optical size per context.
- Interface icons are 20–24pt visually; the target is 44/48.
- Label icon-only controls.
- Do not use emoji as interface icons.
- Do not mix filled and outlined icons in the same navigation bar.
- Directional icons mirror in RTL; logos, media, and clock icons do not.

---

## Content and microcopy

- Buttons use verbs: "Save changes", "Send invite", "Delete project".
- Empty states say what is missing and offer one action.
- Error copy says what happened, whether anything was saved, and what to do next.
- Do not use "Oops!", "Something went wrong", or a raw stack trace.
- Destructive confirmations name the object and the consequence.
- Paywalls show the real price, renewal terms, and a working restore action.
- Permission prompts say why before the system prompt appears.
- Loading copy is specific: "Loading orders", not "Loading...".

---

## Images and media

- Use aspect-fill with a focal point; do not stretch.
- Provide a placeholder that matches the final aspect ratio.
- Provide a dark-mode treatment or a scrim if the image sits under text.
- Do not use stock photos of people as fake users.
- Do not put a play button on a video that does not play.

---

## Finish checklist

- [ ] One motion signature, with a reduce-motion fallback.
- [ ] Haptics only on commitment.
- [ ] No more than four or five type sizes on one screen.
- [ ] Tabular numerals for money, time, and counts.
- [ ] One accent doing one job.
- [ ] Contrast re-measured in dark mode.
- [ ] Spacing on the 4pt grid.
- [ ] One surface logic; no border-plus-shadow-by-default.
- [ ] Platform icons, one weight.
- [ ] Error and empty copy with a next action.
- [ ] Images have a focal point and a placeholder.
- [ ] The signature move appears once, not on every element.
