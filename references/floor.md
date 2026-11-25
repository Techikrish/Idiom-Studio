# Floor

The Floor is what makes an app **wrong**, not merely unstylish. It is not a matter of taste and it is
not waivable for aesthetic reasons.

Three families:

1. **Platform grammar** — the app behaves like the OS expects.
2. **Accessibility** — the app works for people who do not use it the way the designer does.
3. **Honesty** — the app tells the truth about its data, actions, and costs.

If a Floor finding is present, stop adding features and fix it.

---

## 1. Platform grammar

### iOS

| Rule | What goes wrong | Fix |
|---|---|---|
| `ios-fixed-type` | `.font(.system(size:))` ignores Dynamic Type | Semantic text style or `.custom(_, size:, relativeTo:)` |
| `ios-custom-back` | Hiding the system back button removes swipe-back | Keep the system button, or preserve the interactive pop gesture and add a labeled control |
| `ios-safe-area-ignore` | Content sits under the status bar or home indicator | Ignore safe areas on backgrounds only |
| `ios-liquid-glass-content` | Glass on cards, rows, or media destroys legibility and hierarchy | Glass belongs to navigation and controls; content uses standard materials |
| `ios-manual-modal` | A hand-built drag sheet loses detents, focus handling, and VoiceOver dismissal | `.sheet` + `.presentationDetents` + `.presentationDragIndicator` |
| `ios-web-chrome` | Hamburger plus overflow is a web pattern | `NavigationStack`, title, toolbar, tab bar |

**iOS 27 context.** Liquid Glass is the navigation and control layer, not a texture for content. It
has clear and tinted variants; use the variant the system provides. Do not stack glass on glass, and
do not put glass behind text. Standard materials remain correct for content surfaces.

**iPhone Duo and resizing.** Apps built with the iOS 27 SDK resize dynamically across the inner and
outer displays and fold poses. Hardcoded widths, fixed orientations, and assumptions about a single
window break. Use size classes, `ViewThatFits`, and layouts that reflow.

### Android

| Rule | What goes wrong | Fix |
|---|---|---|
| `android-orientation-lock` | Locks orientation or resizability | Adaptive layout with `WindowSizeClass` and `sw600dp` resources |
| `android-edge-to-edge` | Content under system bars, or deprecated bar colors | `enableEdgeToEdge()` before `setContent`; consume insets |
| `android-ime-insets` | Keyboard covers the field or send button | `imePadding()` / `WindowInsets.ime` / `adjustResize` |
| `android-system-bar-color` | Deprecated `statusBarColor` / `navigationBarColor` | Edge-to-edge with `SystemBarStyle` and local scrims |
| `android-predictive-back` | `onBackPressed` or `KEYCODE_BACK` breaks predictive back | `OnBackPressedDispatcher`, predictive back APIs, Compose `BackHandler` |
| `android-tab-overflow` | More than five navigation destinations | Three to five top-level destinations plus overflow |
| `android-fab-stack` | Two FABs compete for one primary-action slot | `FloatingActionButtonMenu` for 2–6 related actions |
| `android-default-purple` | Untouched baseline M3 purple | Semantic scheme with measured contrast |
| `android-no-adaptive` | Phone-only layout stretches across tablets and foldables | `WindowSizeClass`, `sw600dp`, list-detail |

**Android 17 context.** Apps targeting API 37 no longer get to opt out of resizing on large screens
with orientation or resizability restrictions. Build for `sw >= 600dp` by default. Edge-to-edge is the
baseline. Predictive back is the gesture contract.

**Material 3 Expressive.** Button groups, FAB menus, shape morph, and expressive motion are available,
but they are not decoration. Use a FAB menu when there are 2–6 related actions. Use shape morph to
show a state change, not to make a tap wobble.

---

## 2. Accessibility

| Rule | Requirement | Verification |
|---|---|---|
| `a11y-label` | Every icon-only control names its action | VoiceOver / TalkBack; static check |
| `a11y-contrast` | Body text ≥ 4.5:1; large text ≥ 3:1; UI components ≥ 3:1 | Token math, XCUITest audit, Android accessibility checks |
| `a11y-touch-target` | ≥ 44pt iOS, ≥ 48dp Android of tappable area | Measure the target, not the glyph |
| `a11y-text-clip` | Text grows without clipping at large sizes | 2× font scale / largest Dynamic Type |
| Reduce motion | Animation respects the OS setting | `accessibilityReduceMotion` / `LocalMotionDurationScale` |
| Focus and keyboard | Every control is reachable and operable without touch | Switch Control, keyboard navigation |
| Traits and roles | Buttons are buttons, headers are headers | Accessibility inspector |

**Do not** fix a label by putting the label in a nearby `Text` and leaving the control unlabeled. The
control itself needs the name.

**Do not** use a 24pt glyph as the hit target. Add padding or `contentShape`, then measure the target.

**Do not** treat dark mode as an inverted light theme. Re-measure contrast; some accents fail.

### Deterministic checks

- iOS: `XCUIApplication.performAccessibilityAudit()` (iOS 17+) audits contrast, hit regions, clipped
  text, element descriptions, and Dynamic Type.
- Android: Compose `ui-test-junit4-accessibility` / `tryPerformAccessibilityChecks()`, or Espresso
  `AccessibilityChecks`.
- Idiom: `idiom lint` checks source and theme tokens; `idiom states` checks state coverage.
  Rendered audits catch what static analysis cannot.

---

## 3. Honesty

| Rule | What goes wrong | Fix |
|---|---|---|
| `state-missing` | Data screens only implement content | Add loading, empty, error, offline, permission as applicable |
| `dead-control` | A visible control does nothing | Implement, disable with explanation, or remove |
| `fake-data` | `John Doe`, `$1,234.56`, `Lorem ipsum` ship in production | Previews/tests/debug source sets only |
| `fake-success` | `try?` or a success-only callback hides failure | Handle failure, retry, roll back optimistic state |
| `dark-pattern-consent` | Consent pre-selected | Default off, explicit opt-in |
| `dark-pattern-urgency` | Fake countdown or "only 2 left" | Use real scarcity or remove it |

Honesty is the part of the Floor that most linters miss. A beautiful screen with a dead button is
still slop.

### Release criteria for states

For every data-backed screen:

- Loading: a skeleton that matches the final layout, or a spinner with context.
- Empty: what is missing and one next action.
- Error: what failed, whether data was saved, and a retry.
- Offline: what still works, what is queued.
- Permission: why it is needed and what happens without it.
- Refreshing: keep existing content visible.
- Partial: show what loaded and let the user retry the rest.

A static screen can declare `static` and skip the matrix. Say so in `.idiom/decisions.md`.

---

## 4. Adaptive and input

- Test the smallest phone, the largest phone, a tablet, and a foldable posture where supported.
- Do not lock orientation to hide a layout problem.
- Do not hardcode a width that assumes a single window.
- Handle the keyboard on every form, search field, and composer.
- Handle RTL if localized; do not mirror icons that carry direction unless the platform does.
- Support hardware keyboards and pointer hover where the platform expects it.

---

## 5. Waivers

Floor waivers are exceptional. A valid example:

```swift
// idiom-ignore ios-fixed-type: the wordmark is a fixed logotype, not body copy
```

An invalid example:

```swift
// idiom-ignore a11y-contrast: the gray looks better
```

`a11y-*`, `fake-data`, `dead-control`, `fake-success`, and `dark-pattern-*` should not be waived in a
release build. If a rule is wrong for a legitimate platform reason, fix the rule or add a narrow
exception with a link to the platform documentation.

---

## 6. Gate

```bash
idiom lint . --mode release --strict
```

- **certain Floor** findings block by default.
- **likely Floor** findings block with `--strict` and should be reviewed in normal mode.
- **Reflex** and **Finish** never block.

The gate is a floor, not a taste score. Passing it does not make the app good. It makes the app not
wrong.
