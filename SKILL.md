---
name: idiom-studio
description: Design and build distinctive native iOS and Android app UI. Use when creating, redesigning, or reviewing SwiftUI, UIKit, Jetpack Compose, or Android XML screens, or when a mobile app brief needs a visual direction, design tokens, palette, typography, or a UI that does not look like a generic AI template. Generates one committed direction from 10 families, 30 variants, and 4 accents, with rendered previews and SwiftUI/Compose themes.
license: MIT
compatibility: Native iOS and Android only. Requires Node.js 20+ for the generator. No third-party packages.
---

# Idiom Studio

**A native app should look like it was designed for its own brief, not generated from a template.**

This skill turns a plain-English app brief into one committed visual direction and a working
implementation package for SwiftUI/UIKit and Jetpack Compose/XML. It chooses a family, a variant, an
accent, and a mode — then gives the agent exact tokens, screen rules, a rendered preview, and theme
files.

The direction is chosen, not averaged. One family, one variant, one accent, one signature move.

This skill is for native iOS and Android only. Do not use it for web UI.

---

## What the agent must produce

1. A one-line brief, with assumptions stated.
2. A generated direction bundle in `.idiom/design/`.
3. Native screens built from the generated tokens and platform grammar.
4. Loading, empty, error, offline, and permission states for every data screen.
5. A rendered check at normal and large text sizes.
6. A short report naming the direction and anything that could not be verified.

Do not start writing UI before step 2. Do not invent a palette, typeface, or layout that the direction
file does not contain.

---

## Step 1 — Write the brief

Infer the brief from the user's request. State your assumptions in one line; do not interrogate the
user with a long questionnaire.

Use this shape:

```text
Product:        what it is, in one sentence
Platform:       iOS / Android / both
Audience:       who uses it and in what situation
Content:        data / reading / visual / mixed
Mood:           three adjectives
Density:        compact / comfortable / spacious
Mode:           light / dark / both
Must-have:      the 3–5 screens that must exist
Avoid:          anything the user explicitly rejected
```

Example:

```text
Product: A local guide for hiking trails with maps, difficulty, and nearby places.
Platform: both
Audience: weekend hikers on a phone, often outdoors with poor signal
Content: mixed (maps, short editorial, practical data)
Mood: warm, outdoors, calm
Density: comfortable
Mode: light
Must-have: map home, trail detail, saved trails, offline download
Avoid: generic travel-blog cards, neon, glassmorphism
```

If the user gives only "make me an app for X", infer the rest and say so. A weak brief is still
better than no decision.

---

## Step 2 — Generate the direction

Run the generator from the user's project root:

```bash
idiom-studio design "<brief>" --name "<AppName>" --out .idiom/design --shot
```

If `idiom-studio` is not on PATH, use the absolute path to this skill's CLI:

```bash
node "<skill-directory>/bin/studio.mjs" design "<brief>" --name "<AppName>" --out .idiom/design --shot
```

The command prints the chosen direction, the matched signals, and two alternatives. Read that output.

### Options

| Option | Use |
|---|---|
| `--name <name>` | Product name used in the spec and theme files. Always set it. |
| `--out <dir>` | Output directory. Use `.idiom/design` unless the project already has a design folder. |
| `--mode light\|dark` | Force the preview mode when the brief is explicit. |
| `--family <id>` | Force a family when the user names a direction or the automatic pick misses. |
| `--variant <id>` | Force a variant within the family. |
| `--accent <id>` | Force an accent. |
| `--shot` | Render `preview.png` with headless Chrome. Skip if Chrome is unavailable; `preview.html` still works. |
| `--json` | Machine-readable summary. Useful in scripts. |

### If the direction misses

Do not average two families. Generate a second complete proposal and choose one:

```bash
idiom-studio design "<brief>" --name "<AppName>" --out .idiom/design-alt --family editorial --shot
```

Compare `preview.png` files. Keep one, delete the other, and record why in `.idiom/decisions.md`.
A direction that is 80% right and fully committed reads better than two directions blended together.

### If the brief has no category signal

The generator reports `low confidence` and picks deterministically. That is still a decision. Commit
to it, or force a family that fits the audience. Do not fall back to a generic Material or SF default.

---

## Step 3 — Read the bundle

| File | What it is for |
|---|---|
| `DESIGN.md` | The design rationale, screen rules, platform rules, component rules, and a copy-paste agent brief. Read this first. |
| `tokens.json` | Exact colors, type scale, spacing, radii, motion, and contrast report. This is the source of truth. |
| `design.json` | Machine-readable direction, content, screens, components, and alternatives. |
| `preview.png` | The rendered design board. A visual reference, not code to copy. |
| `preview.html` | Interactive preview with light/dark toggle. Open it when you need to inspect details. |
| `ios/Theme.swift` | Drop-in SwiftUI theme with adaptive light/dark colors and system fonts. |
| `android/Theme.kt` | Drop-in Compose Material 3 theme with system font families. |

Rules:

- Use the token values exactly. Do not substitute a "nicer" color or a different typeface.
- The preview is a design board, not production layout. Rebuild the screens natively.
- Replace the sample content with the product's real content. Keep the structure, hierarchy, and tone.
- If a needed token is missing, add it explicitly to `tokens.json` and say why. Never improvise silently.

---

## Step 4 — Implement natively

Build in this order:

1. **Theme** — copy `ios/Theme.swift` or `android/Theme.kt` into the project and wire it at the root.
2. **Home** — follow the `Home` rule in `DESIGN.md`. This screen establishes the family.
3. **Detail** — follow the `Detail` rule. This is where the signature move usually appears.
4. **Create / compose** — follow the `Create` rule. Handle keyboard, validation, and drafts.
5. **Profile / settings** — follow the `Profile` rule. Group rows, show state, allow export.
6. **States** — add loading, empty, error, offline, and permission states before calling it done.

### Token translation

SwiftUI:

```swift
// Generated theme
Text(title).font(StudioTheme.Typography.display())
Text(body).font(StudioTheme.Typography.body()).foregroundStyle(StudioTheme.Colors.text)
Button(action: pay) { Text("Pay") }
    .buttonStyle(.borderedProminent)
    .tint(StudioTheme.Colors.accent)
    .frame(minHeight: StudioTheme.Spacing.minTarget)
```

Compose:

```kotlin
// Generated theme
Text(title, style = MaterialTheme.typography.displayLarge)
Text(body, style = MaterialTheme.typography.bodyLarge, color = MaterialTheme.colorScheme.onBackground)
Button(onClick = pay, modifier = Modifier.heightIn(min = StudioTokens.minTarget)) {
    Text("Pay")
}
```

Use semantic styles, not fixed font sizes. Let Dynamic Type / font scale do its job.

### Platform grammar

Read the platform reference before the first screen:

- iOS: `references/ios.md`
- Android: `references/android.md`
- States: `references/states.md`
- Craft and finish: `references/finish.md`

Non-negotiables:

- **iOS:** keep the system back gesture and navigation bar; use `NavigationStack`, `TabView`, sheets
  with detents, `.searchable`, safe areas, and SF Symbols. Minimum 44pt targets.
- **Android:** edge-to-edge with insets, `TopAppBar`, predictive back, 48dp targets, Material Symbols,
  and `imePadding()` on every form. Support 200% font scale and large screens.
- **Both:** support VoiceOver / TalkBack, reduce motion, dark mode, RTL where localized, and the
  system keyboard. Never use color alone to carry state.

### The signature move

Each direction defines one signature move. Use it once per screen at most, and repeat it across the
app so the product is recognizable. Do not add a second signature move from another family.

### Content

- No lorem ipsum.
- No fake names, prices, ratings, or "trusted by" logos in a shipping screen.
- Empty states must say what is missing and offer one next action.
- Numbers use the numeric face and tabular figures where the direction specifies them.

---

## Step 5 — Cover the states

For every data-backed screen, implement:

| State | What the user sees | What they can do |
|---|---|---|
| Loading | Skeleton matching the final layout, or a spinner with context | Wait, cancel if slow |
| Content | Real data | Primary action |
| Empty | What is missing and one next action | Create / import / retry |
| Error | What failed, whether data was saved, retry | Retry, contact support |
| Offline | What still works, what is queued | Retry when online |
| Permission | Why it is needed, what happens without it | Grant, skip |
| Refreshing | Existing content plus progress | Keep reading |
| Partial | What loaded, what did not | Retry the missing part |

A static screen (legal copy, about) does not need fake states. Say so explicitly.

---

## Step 6 — Verify

1. **Build the app.** A screen that does not compile is not done.
2. **Render it.** Capture light and dark, smallest and largest supported phone, and the largest
   Dynamic Type / font scale. Open the keyboard on every form.
3. **Compare with `preview.png`.** Does it read as the same product? Same hierarchy, same accent
   discipline, same signature move?
4. **Run the optional gate** if the project has the linter installed:

   ```bash
   idiom-gate lint . --mode prototype
   idiom-gate states .
   idiom-gate lint . --mode release --strict
   ```

   Fix Floor findings before shipping. Waive Reflex findings only with a specific reason. See
   `GATE.md` and `references/floor.md`.

5. **Fresh-eye check.** Answer:
   - What is the one thing this screen wants me to do? Is it obvious in one second?
   - What looks generic enough to appear in any other app? Change or remove it.
   - Where does the layout lie about what the app can do?
   - What happens at 2× text, offline, and with an empty account?
   - Does the signature move appear once, or is it everywhere?

---

## Choosing a family

The generator scores the brief automatically. Use this table to sanity-check the result or to force a
direction.

| Family | Use for | Variants | Signature |
|---|---|---|---|
| **Editorial** | reading, news, books, long-form | Broadsheet, Field Notes, Literary Journal | rules, folios, a publication grid |
| **Instrument** | finance, data, monitoring, ops | Trading Desk, Flight Deck, Laboratory | dense readouts, exact alignment |
| **Cinematic** | film, music, events, streaming | Film Festival, Gallery, Nightclub | full-bleed image, title sequence |
| **Spatial** | maps, travel, local, logistics | Trail Map, City Guide, Studio Canvas | map canvas + bottom sheet |
| **Ritual** | health, sleep, habits, fitness | Morning Pages, Training Log, Meditation Timer | one progress ring, one sequence |
| **Playground** | social, friends, fun, kids | Toy Box, Sticker Album, Arcade | tilted cards, stickers, bold color |
| **Luxe** | fashion, hotels, beauty, premium | Atelier, Concierge, Boutique | one object, generous space, serif |
| **Utility** | tools, weather, files, notes | Pocket Tool, Workbench, Field Manual | one dominant readout or control |
| **Civic** | government, transit, services | Notice Board, Service Desk, Wayfinding | plain language, visible deadlines |
| **Organic** | food, garden, nature, slow living | Market Table, Garden Plot, Slow Kitchen | seasonal color, irregular rhythm |

Full details, palettes, and per-variant rules: `references/families.md`.

### Variation rules

- The same brief and name always produce the same direction. That is intentional.
- Different briefs should produce different families. If two unrelated apps land on the same family,
  change the variant and accent based on tone — or force a different family and evaluate it.
- Do not ship the same family for every app in a portfolio.
- "Clean and minimal" is not a direction. It describes the absence of one. Infer the content and mood,
  then commit.

---

## Hard rules

1. **One direction.** Do not mix glass, gradients, pills, and cards because each looked good alone.
2. **Platform grammar is not a preference.** Back gestures, safe areas, IME insets, navigation bars,
   sheets, and focus behavior belong to the OS.
3. **Accessibility is a floor.** Semantic type, 44pt/48dp targets, labels, contrast, and reduce motion
   are release criteria.
4. **A screen must tell the truth.** No dead buttons, fake success, hidden prices, or invented data.
5. **Color is never the only signal.** Pair it with text, an icon, or a shape.
6. **The accent is for the primary action and one signature detail.** Not every icon.
7. **System fonts only** unless the project already ships a licensed typeface. The generated themes
   use system families on purpose.

---

## Output contract

When you finish, report:

- The direction: family / variant / accent / mode, and the matched signals.
- The bundle path and the files you used.
- Screens implemented and the states covered.
- Build status and screenshot paths.
- Gate status and any waivers with reasons.
- What you could not verify (for example, iOS rendering without a Mac).
- The next design decision, if any.

---

## References

| File | Contents |
|---|---|
| `references/studio-workflow.md` | Brief template, selection logic, overrides, deterministic behavior, handoff checklist |
| `references/families.md` | All 10 families, 30 variants, palettes, type, signature moves, avoid lists |
| `references/tokens.md` | Token schema, SwiftUI/Compose mapping, component recipes, accessibility |
| `references/ios.md` | iOS platform grammar, Liquid Glass, navigation, type, motion |
| `references/android.md` | Android platform grammar, edge-to-edge, Material 3 Expressive, large screens |
| `references/states.md` | State coverage and honest copy |
| `references/finish.md` | Craft: spacing, type, surfaces, motion |
| `references/floor.md` | Floor rules enforced by the gate |
| `references/reflex.md` | Defaults that read as AI slop |
| `GATE.md` | Optional deterministic lint/state gate |

## No-CLI fallback

If the environment cannot run Node or the generator, read `references/families.md` and the JSON files
in `studio/data/families/`. Pick one family from the brief, then follow its thesis, variant, palette,
type, screen rules, and signature moves exactly. The rest of this workflow still applies. State that
the preview was not generated.
