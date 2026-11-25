# Android

Current context: Android 17, Material 3 Expressive, edge-to-edge by default, predictive back, and
large-screen resizing you cannot opt out of. A phone-only layout is no longer a safe default.

---

## 1. Edge-to-edge and insets

Apps targeting Android 15+ draw edge-to-edge. Apps targeting API 37 ignore orientation and
resizability restrictions on large screens. Handle insets explicitly.

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent { AppTheme { App() } }
    }
}
```

```kotlin
Scaffold { innerPadding ->
    Column(
        modifier = Modifier
            .padding(innerPadding)
            .imePadding()
    ) {
        // content
    }
}
```

Rules:

- Call `enableEdgeToEdge()` before `setContent` / `setContentView`.
- Consume `innerPadding`; do not ignore it and add random top padding.
- Use `imePadding()` on forms, search, and composers.
- Do not set `statusBarColor` or `navigationBarColor`; they are deprecated. Draw a local scrim if
  content needs one.
- Use `WindowInsets.safeDrawing` for content, `safeContent` when the keyboard is open, and
  `systemBars` for chrome.

---

## 2. Navigation

- `NavigationBar` for 3–5 top-level destinations on compact width.
- `NavigationRail` for expanded width; combine with a list-detail layout.
- `NavigationDrawer` for many destinations, not as a default.
- Predictive back is the gesture contract; use `OnBackPressedDispatcher` or Compose `BackHandler`.
- Do not override `onBackPressed()`.
- Do not put five equal tabs in a new app just because the template did.

```kotlin
NavigationBar {
    destinations.forEach { destination ->
        NavigationBarItem(
            selected = current == destination,
            onClick = { navigate(destination) },
            icon = { Icon(destination.icon, contentDescription = null) },
            label = { Text(destination.label) }
        )
    }
}
```

The icon may use `contentDescription = null` because the label names the destination. An icon-only
control needs a description.

---

## 3. Large screens and foldables

Use `WindowSizeClass` and resource qualifiers, not device checks.

```kotlin
val windowSizeClass = currentWindowAdaptiveInfo().windowSizeClass
val expanded = windowSizeClass.windowWidthSizeClass == WindowWidthSizeClass.EXPANDED

if (expanded) {
    ListDetailPane()
} else {
    SinglePane()
}
```

- Provide `sw600dp` resources for margins, columns, and type when needed.
- Use a two-pane layout only when both panes have a job. A stretched phone layout is not adaptive.
- Test a foldable posture: tabletop, book, and flat.
- Do not lock orientation. Do not set `resizeableActivity="false"`.
- Do not use `configChanges="orientation|screenSize"` to avoid re-layout.

---

## 4. Material 3 Expressive

Expressive is a set of tools, not a requirement to animate everything.

- **FAB menu** for 2–6 related actions. Do not stack FABs.
- **Button groups** for related actions with shared context.
- **Shape morph** to show a state change (play → pause, collapsed → expanded).
- **Motion physics** for direct manipulation; keep durations short.
- **Dynamic color** is optional. It is not a substitute for a direction; it can also break a
  carefully measured palette. Test both dynamic and fallback schemes.

```kotlin
FloatingActionButtonMenu(
    expanded = expanded,
    onExpandedChange = { expanded = it }
) {
    FloatingActionButtonMenuItem(
        onClick = { createNote() },
        icon = { Icon(Icons.Default.NoteAdd, contentDescription = null) },
        text = { Text("New note") }
    )
    FloatingActionButtonMenuItem(
        onClick = { importNote() },
        icon = { Icon(Icons.Default.Upload, contentDescription = null) },
        text = { Text("Import") }
    )
}
```

---

## 5. Typography

- Use `MaterialTheme.typography.*` or a project type scale built on it.
- `sp` respects the user's font scale. Raw `fontSize = 14.sp` bypasses the scale, not accessibility.
  It is a design-system violation, not a hard accessibility failure.
- Never use the baseline purple `Purple40` / `Purple80` / `0xFF6750A4`.
- Use tabular figures for money and counters.
- Do not put more than four or five sizes on one screen.

```kotlin
Text(
    text = total,
    style = MaterialTheme.typography.headlineSmall,
    fontFeatureSettings = "tnum"
)
```

---

## 6. State

Use a sealed state model and render every branch.

```kotlin
sealed interface FeedUiState {
    data object Loading : FeedUiState
    data object Empty : FeedUiState
    data class Error(val message: String) : FeedUiState
    data class Content(val items: List<Item>) : FeedUiState
}

@Composable
fun FeedScreen(viewModel: FeedViewModel) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()

    when (val current = state) {
        FeedUiState.Loading -> CircularProgressIndicator()
        FeedUiState.Empty -> EmptyState(
            title = "No items yet",
            action = "Add item",
            onAction = viewModel::add
        )
        is FeedUiState.Error -> ErrorState(
            message = current.message,
            onRetry = viewModel::retry
        )
        is FeedUiState.Content -> LazyColumn {
            items(current.items, key = { it.id }) { item ->
                ListItem(
                    headlineContent = { Text(item.title) },
                    supportingContent = { Text(item.subtitle) }
                )
            }
        }
    }
}
```

- Use `collectAsStateWithLifecycle()` in Compose.
- Use `ListItem` for list rows; do not wrap every row in a `Card`.
- Keep content visible during refresh.
- Use a snackbar for a transient failure only when the content is still valid.
- Do not show a success snackbar for a write that may have failed.

---

## 7. Accessibility

- Every icon-only control needs `contentDescription`.
- A `NavigationBarItem` with a visible label can use `contentDescription = null` on its icon.
- Decorative images use `contentDescription = null`; meaningful images describe the content.
- Minimum target: 48dp. A 40dp icon with no padding is a 40dp target.
- Use `Modifier.semantics { heading() }` for section headers.
- Use `liveRegion` for changing status text.
- Respect `LocalMotionDurationScale` and the system animation setting.
- Test with TalkBack and at 2× font scale.

```kotlin
IconButton(onClick = { share() }) {
    Icon(
        imageVector = Icons.Default.Share,
        contentDescription = "Share item"
    )
}
```

Compose test:

```kotlin
composeTestRule.onRoot().tryPerformAccessibilityChecks()
```

Or Espresso `AccessibilityChecks.enable()`.

---

## 8. Common Android slop

| Pattern | Why it fails |
|---|---|
| Baseline M3 purple | The theme was never decided |
| `screenOrientation="portrait"` | Ignored on large screens for target 37, and hides layout failures |
| `resizeableActivity="false"` | Same |
| No `enableEdgeToEdge()` | Content under system bars, deprecated bar colors |
| No `imePadding()` | Keyboard covers the field or send button |
| Five or six equal `NavigationBarItem`s | Unedited information architecture |
| Two FABs | Competing primary actions |
| Custom Row with Menu + MoreVert | Web chrome; loses insets and semantics |
| `Card` around every list row | Elevation replaces hierarchy |
| `RoundedCornerShape(50)` on everything | Shape stops carrying meaning |
| `Color(0xFF...)` in a screen | Off-token color; breaks dark mode and contrast |
| `contentDescription = null` on an `IconButton` | Unusable with TalkBack |
| `.size(40.dp)` on a control | Below the 48dp target |
| Emoji as icons | Inconsistent rendering, no tint |
| `try?`-style swallowed errors | Fake success |
| `onBackPressed()` override | Breaks predictive back |

---

## 9. Capture

```bash
adb devices
adb shell am start -n com.example.app/.MainActivity
sleep 2

adb exec-out screencap -p > captures/android/light.png
adb shell uiautomator dump /sdcard/window.xml
adb pull /sdcard/window.xml captures/android/window.xml

# Dark mode
adb shell cmd uimode night yes
adb exec-out screencap -p > captures/android/dark.png
adb shell cmd uimode night no

# Large font
adb shell settings put system font_scale 2.0
adb exec-out screencap -p > captures/android/large-type.png
adb shell settings put system font_scale 1.0

# RTL (developer setting)
adb shell settings put global debug.force_rtl 1
adb exec-out screencap -p > captures/android/rtl.png
adb shell settings put global debug.force_rtl 0
```

`scripts/capture-android.sh` wraps this and restores the original settings. `uiautomator dump` gives
real bounds, labels, and clickable regions for a rendered audit.

---

## 10. Review checklist

- [ ] `enableEdgeToEdge()` and insets consumed.
- [ ] `imePadding()` on every form and composer.
- [ ] 3–5 navigation destinations, or a rail/drawer on expanded width.
- [ ] No orientation or resizability lock.
- [ ] A `WindowSizeClass` branch exists where the layout changes.
- [ ] Semantic type; no raw `fontSize` in screens.
- [ ] No baseline purple.
- [ ] Every data screen has loading, empty, error, and offline handling.
- [ ] Every icon-only control has a description.
- [ ] Every target is at least 48dp.
- [ ] No stacked FABs, card-stack lists, or pill-everything.
- [ ] Predictive back works.
- [ ] Light/dark, 2× font, and RTL screenshots inspected.
