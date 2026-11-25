# iOS

Current context: iOS 27, Liquid Glass, and iPhone Duo-style resizing. The platform is stricter than a
web view and more forgiving than a design system: it expects you to use its navigation, type, and
materials, and it will resize under you.

---

## 1. Liquid Glass

Liquid Glass is the **navigation and control layer**, not a texture for content.

- Use it on navigation bars, toolbars, tab bars, and floating controls.
- Do not use it behind cards, list rows, body text, or media.
- Use the clear or tinted variant the system provides; do not invent a third.
- Do not stack glass on glass.
- For content surfaces, use standard materials or solid color.
- Check text contrast over whatever is behind the glass, in both appearances.

If you are reaching for `.glassEffect()` on a content view, you probably want a solid surface, a
border, or a subtle shadow instead.

---

## 2. Navigation

Use `NavigationStack` for a single path, `NavigationSplitView` for a two- or three-column layout, and
`TabView` for top-level destinations.

- Keep the system back button. It provides swipe-back, the back menu, and the correct accessibility
  behavior. If you hide it, you must rebuild all three.
- Use `.navigationTitle` with `.large` or `.inline` deliberately. Do not center a custom title with a
  hamburger and a kebab; that is web chrome.
- Put secondary actions in `.toolbar`. Use `Menu` for overflow.
- Use `.searchable` for search; do not build a fake search field in the content.
- Use `.sheet` with detents for supplemental tasks, not a hand-built drag surface.
- Use `.fullScreenCover` only for immersive tasks that genuinely need the whole screen.

```swift
NavigationStack {
    List(items) { item in
        NavigationLink(value: item) {
            ItemRow(item: item)
        }
    }
    .navigationTitle("Library")
    .navigationDestination(for: Item.self) { item in
        ItemDetail(item: item)
    }
    .toolbar {
        ToolbarItem(placement: .topBarTrailing) {
            Menu {
                Button("Import", systemImage: "square.and.arrow.down") { importItems() }
                Button("Sort", systemImage: "arrow.up.arrow.down") { showSort = true }
            } label: {
                Label("More", systemImage: "ellipsis.circle")
            }
        }
    }
}
```

---

## 3. Sheets and modals

```swift
.sheet(isPresented: $isEditing) {
    EditorView(draft: $draft)
        .presentationDetents([.medium, .large])
        .presentationDragIndicator(.visible)
}
```

- Use detents that match the task.
- Keep the drag indicator when the sheet is dismissible.
- Do not use a full-screen cover for a single field.
- Confirm destructive dismissal if there are unsaved changes.
- Restore focus and scroll position after dismissal.

---

## 4. Layout and resizing

- Respect safe areas. Ignore them on background layers only.
- Use `.safeAreaInset(edge:)` for custom bars instead of manual padding.
- Handle the keyboard with `.scrollDismissesKeyboard`, `.ignoresSafeArea(.keyboard)` only when the
  content should genuinely extend under it, and `@FocusState` for focus.
- Use size classes and `ViewThatFits` instead of device checks.
- Do not hardcode widths that assume a single window.
- Do not lock orientation to hide a layout problem.

**iPhone Duo and foldables.** Apps built with the iOS 27 SDK resize dynamically across inner and outer
displays and fold poses. Test a compact width, an expanded width, and a resize while a sheet or
keyboard is open. Prefer layouts that reflow over layouts that scale.

```swift
ViewThatFits(in: .horizontal) {
    HStack { Sidebar(); Detail() }
    VStack { Detail(); Sidebar() }
}
```

Use `@ScaledMetric` for spacing or control sizes that must grow with Dynamic Type. Do not scale
everything; text and targets first.

---

## 5. Typography

- Use semantic styles: `.largeTitle`, `.title`, `.title2`, `.title3`, `.headline`, `.body`, `.callout`,
  `.subheadline`, `.footnote`, `.caption`, `.caption2`.
- Use `.font(.custom("Name", size: 17, relativeTo: .body))` for a brand face.
- Never use `.font(.system(size: 17))` for body copy.
- Use `.monospacedDigit()` for money, time, and counters.
- Avoid more than four or five sizes on one screen.
- Test the largest accessibility size; text should reflow, not clip.

---

## 6. States

Use the platform's state surfaces before inventing new ones:

- Loading: `ProgressView`, or a redacted/skeleton version of the content.
- Empty: `ContentUnavailableView` with a real next action.
- Error: `ContentUnavailableView` with what failed, whether data was saved, and a retry.
- Refresh: `.refreshable`.
- Offline: a banner plus cached content, not a blank screen.
- Permission: explain before the system prompt, then handle denial.

```swift
switch model.state {
case .loading:
    ProgressView("Loading library")
case .empty:
    ContentUnavailableView(
        "No saves yet",
        systemImage: "bookmark",
        description: Text("Save an item and it will appear here.")
    )
case .error(let message):
    ContentUnavailableView(
        "Couldn't load your library",
        systemImage: "exclamationmark.triangle",
        description: Text(message)
    )
case .content(let items):
    List(items) { item in ItemRow(item: item) }
}
```

Do not show a success toast for a write that can fail. Handle the failure, keep the draft, and offer
retry.

---

## 7. Controls

- Use `Button`, `Toggle`, `Picker`, `Slider`, `Stepper`, `Menu`, `ShareLink`, `PhotosPicker`.
- Use `.buttonStyle(.bordered)`, `.borderedProminent`, or `.plain` deliberately.
- Use `.contentShape(Rectangle())` to expand a hit area, not a larger visible glyph.
- Use `.sensoryFeedback` for commitment, not every tap.
- Use `Label` for icon + text; use `Image` + `.accessibilityLabel` for icon-only.
- Destructive actions use `.destructive` and a confirmation when the consequence is irreversible.

```swift
Button {
    save()
} label: {
    Label("Save", systemImage: "square.and.arrow.down")
}
.buttonStyle(.borderedProminent)
.accessibilityLabel("Save changes")
```

---

## 8. Accessibility

- Label every icon-only control.
- Add `.accessibilityHint` only when the result is not obvious from the label.
- Group related elements with `.accessibilityElement(children:)`.
- Use `.accessibilityValue` for sliders, progress, and custom controls.
- Respect `@Environment(\.accessibilityReduceMotion)`.
- Respect `@Environment(\.dynamicTypeSize)`.
- Test with VoiceOver, Switch Control, and the largest text size.

Deterministic audit:

```swift
let app = XCUIApplication()
app.launch()
try app.performAccessibilityAudit(for: [
    .contrast,
    .hitRegion,
    .clippedText,
    .sufficientElementDescription,
    .dynamicType,
])
```

`performAccessibilityAudit` is iOS 17+. It catches a useful subset, not everything. Combine it with a
human pass.

---

## 9. Common iOS slop

| Pattern | Why it fails |
|---|---|
| Custom centered title + hamburger + kebab | Web chrome; loses large-title behavior and back menu |
| Hidden system back button | Breaks swipe-back and accessibility |
| Glass on content | Destroys legibility and fights the control layer |
| `.font(.system(size:))` for body | Breaks Dynamic Type |
| Custom drag sheet | Loses detents, focus, and VoiceOver dismissal |
| Full-screen cover for one field | Wrong surface for the task |
| Fake `John Doe` profile | Ships as fake content; hides empty state |
| `try?` on save | Shows success for a failed write |
| Card stack with shadows on every row | Elevation replaces hierarchy |
| Five equal tabs by default | Unedited information architecture |
| Emoji as icons | Inconsistent rendering, no tint, poor accessibility |
| Hardcoded width for a single phone | Breaks on iPhone Duo and split view |

---

## 10. Capture

macOS with Xcode:

```bash
xcrun simctl list devices
xcrun simctl boot "iPhone 17 Pro"
xcrun simctl install booted /path/to/App.app
xcrun simctl launch booted com.example.app

xcrun simctl io booted screenshot captures/ios/light.png
xcrun simctl ui booted appearance dark
xcrun simctl io booted screenshot captures/ios/dark.png
xcrun simctl ui booted appearance light

xcrun simctl ui booted content_size accessibility-extra-extra-extra-large
xcrun simctl io booted screenshot captures/ios/large-type.png
xcrun simctl ui booted content_size medium
```

Use `scripts/capture-ios.sh` for the loop and `scripts/ios/IdiomAccessibilityTests.swift` for the
audit template. Rendered iOS verification requires a Mac; static iOS rules work everywhere.
