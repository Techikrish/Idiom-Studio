---
name: idiom-gate
description: Optional deterministic anti-slop verification gate for native iOS and Android UI. Use after Idiom Studio, or on existing SwiftUI, UIKit, Jetpack Compose, or Android XML code, to lint platform grammar, accessibility, honest states, fake data, and dead controls.
---

# Idiom Gate

**Optional verification gate. Start with `SKILL.md` for the design direction; use this file to prove the result.**

**Slop is the visible absence of decisions.**

This skill makes the agent make decisions before writing UI, then verifies them with a deterministic
gate. Reading the references is not the job. Producing a screen that survives `idiom-gate lint`, `idiom
states`, and a rendered review is the job.

## Use this when

- Building a new SwiftUI/UIKit or Compose/XML screen or app.
- Reviewing native UI that feels like a web app in a native shell.
- A screen has placeholder data, dead controls, or only a happy path.
- The app needs a visual direction that is not the default template.
- A design needs to survive Dynamic Type, dark mode, RTL, tablets, or foldables.

Do not use this for web UI. Hallmark and Impeccable already cover that.

## Non-negotiables

1. **Platform grammar is not a preference.** Back gestures, safe areas, IME insets, navigation bars,
   sheets, and focus behavior belong to the OS. Do not rebuild them from divs.
2. **Accessibility is a floor.** Semantic type, 44pt/48dp targets, labels, contrast, and reduce-motion
   are release criteria, not polish.
3. **A screen must tell the truth.** No fake production data, no dead buttons, no success state for a
   write that can fail, no paywall that hides its price.
4. **One direction.** Pick one material and one signature move. Do not mix glass, gradients, pills,
   and cards because each looked good in isolation.
5. **Real states, not just the happy path.** Loading, empty, error, offline, and permission states are
   part of the screen, not an afterthought.

## The four gates

| Gate | Meaning | Action |
|---|---|---|
| **Floor** | Platform grammar, accessibility, honesty | Fix before shipping. `idiom-gate lint --mode release` must pass. |
| **Reflex** | Defaults an LLM reaches for without instruction | Keep only when it is a decision. Waive with a reason. |
| **Finish** | Craft: motion, spacing, type, surfaces | Polish after the floor is clear. |
| **Ledger** | Memory of directions and waivers | Prevents every app from converging on the same look. |

## Workflow

Commands below use `idiom-gate`. The installer creates that command. If it is not on PATH,
substitute `node bin/idiom.mjs` from the skill directory, or the absolute path to the installed CLI.
Script paths are relative to the skill directory.

### 1. Read the brief and write the screen contract

Before code, write `.idiom/decisions.md` (or append to it):

```md
## Screen: Checkout
- Job: confirm the order and pay
- Primary action: Pay
- Data: cart, totals, payment method
- States: loading, content, empty cart, payment error, offline, permission (Apple Pay / Google Pay)
- Empty copy: "Your cart is empty. Add an item to continue."
- Error copy: "Payment didn't go through. Your card was not charged."
- Destructive: remove item (confirm)
- Signature: one accent on the total only
```

If you cannot fill this in, you are not ready to write the UI.

### 2. Choose a direction

```bash
idiom-gate direction \
  --name "Ledger" \
  --category "finance" \
  --adjectives "precise, dense, calm" \
  --platform both \
  --save
```

Read the card. Commit to:

- **One material** — Paper, Instrument, Mineral, Signal, Field, or Toy.
- **One signature move** — the thing a user would recognize without the logo.
- **One refusal** — what this app will never do (no gradients, no glass on content, no pill buttons).

Record all three in `.idiom/decisions.md`. Do not combine materials. Do not add a second accent.

If the project already has a direction, read it first and extend it. Do not redecorate a working system.

### 3. Write the state matrix before the UI

For every data-backed screen, define:

| State | What the user sees | What they can do |
|---|---|---|
| Loading | Skeleton matching the final layout, or a spinner with context | Wait, cancel if slow |
| Content | Real data | Primary action |
| Empty | What is missing and one next action | Create / import / retry |
| Error | What failed, whether data was saved, retry | Retry, contact support |
| Offline | What still works, what is queued | Retry when online |
| Permission | Why it is needed, what happens without it | Grant, skip |
| Refreshing | Existing content plus a progress affordance | Keep reading |
| Partial | What loaded, what did not | Retry the missing part |

A static screen (legal copy, about) does not need fake states. Say so explicitly.

### 4. Build with platform grammar

Read the platform reference before the first screen:

- iOS: `references/ios.md`
- Android: `references/android.md`
- States: `references/states.md`
- Floor rules: `references/floor.md`
- Reflex defaults: `references/reflex.md`
- Craft: `references/finish.md`

Screen anatomies live in `references/screens/`. They are decision templates, not screenshots to copy.

### 5. Lint early and often

```bash
# Fast loop while building
idiom-gate lint . --mode prototype

# State coverage
idiom-gate states .

# Release gate
idiom-gate lint . --mode release --strict
```

Handle findings in this order:

1. **Floor + certain** — fix now. Do not continue.
2. **Floor + likely** — inspect. Fix, or document why the heuristic is wrong.
3. **Reflex** — keep only if it is a deliberate choice. Add a waiver with a reason.
4. **Finish** — polish when the screen is otherwise done.

Do not add a waiver to silence a real problem. A waiver is a design decision with a reason, not a
mute button.

### 6. Render and inspect

Static analysis cannot see a clipped label, an overlapping target, or a sheet that fights the keyboard.

**Android** (works on Linux, macOS, Windows with an emulator):

```bash
scripts/capture-android.sh com.example.app .MainActivity captures/android
```

This captures light/dark, 1.0/1.3/2.0 font scale, RTL where supported, and a UI-tree dump. Inspect the
contact sheet. Run `idiom-gate states` again if the layout changed.

**iOS** (macOS with Xcode):

```bash
scripts/capture-ios.sh com.example.app captures/ios
```

For the accessibility audit, add `scripts/ios/IdiomAccessibilityTests.swift` to a UI test target and
run it on a simulator. It calls `performAccessibilityAudit` for contrast, hit regions, clipped text,
element descriptions, and Dynamic Type.

Test at least:

- Smallest and largest supported phone.
- Tablet or foldable width if the app supports it.
- Light and dark appearance.
- Largest Dynamic Type / font scale.
- RTL if the app is localized.
- Keyboard open on every form or composer.

### 7. Fresh-context review

After the gate passes, look at the screenshots with fresh eyes and answer:

1. What is the one thing this screen wants me to do? Is it obvious in one second?
2. What would a user recognize as generic? Remove or change it.
3. Where does the layout lie about what the app can do?
4. What happens at 2× text size, offline, and with an empty account?
5. Does the signature move appear once, or is it everywhere?

Fix the answers, then re-run the gate.

## Waivers

A waiver is a comment next to the code and a line in `.idiom/decisions.md`:

```swift
// idiom-ignore ios-fixed-type: the brand wordmark is a fixed logotype, not body copy
```

```kotlin
// idiom-ignore android-five-tabs: five equal destinations are the product model
```

Rules:

- The reason must be specific. "Design choice" is not a reason.
- File-level waivers use `// idiom-ignore-file <rule-id>: <reason>`.
- Floor waivers require a platform or product justification and should be rare.
- Never waive `a11y-*`, `fake-data`, `dead-control`, `fake-success`, or `dark-pattern-*` in a release build.

## Output contract

When you finish, report:

- Screens changed and the direction used.
- `idiom-gate lint` gate status and any waivers with reasons.
- `idiom-gate states` coverage for data screens.
- Screenshots or capture paths.
- What you could not verify (for example, iOS rendered audit without a Mac).
- The next design decision, if any.

## Stop conditions

Stop and ask before shipping if:

- A Floor finding cannot be fixed without changing the product.
- The design needs a second direction to work.
- The app has a paywall, consent, or destructive action with no failure path.
- The only way to pass is to waive an accessibility or honesty rule.

## Quick reference: the most common native tells

| Tell | Why it reads as slop | Fix |
|---|---|---|
| Hamburger + centered title + kebab | Web chrome, not native navigation | NavigationStack / TopAppBar, tab bar or rail |
| Five equal tabs | Unedited information architecture | 2–3 primary destinations + overflow |
| Card stack for everything | Elevation replaces hierarchy | Lists, dividers, one elevated surface |
| Pills on every container | Shape stops carrying meaning | Radius scale with small/medium/large |
| Gradient or glass on content | Decoration replaces hierarchy | Solid surfaces; materials only where they have a job |
| Default M3 purple | The theme was never decided | Semantic scheme with measured contrast |
| FAB on every screen | Every screen claims the same primary action | One FAB, or a FAB menu, or none |
| Emoji as icons | Renders differently, cannot tint | SF Symbols / Material Symbols |
| Fixed font sizes | Breaks Dynamic Type / type scale | Semantic text styles |
| Fake names and prices | Ships as fake content, hides empty states | Previews/tests only; real states |
| Dead buttons | The app lies about what it does | Implement, disable with explanation, or remove |
| Happy-path only | Breaks on the first slow network | State matrix before UI |
| Orientation lock | Android 17 ignores it on large screens | Adaptive layout |
| Glass on content | Fights the control layer | Liquid Glass only on navigation/controls |

## Attribution

The Floor/Reflex/Finish model is adapted from Hallmark (MIT). Native platform guidance is informed by
Apple HIG and Material 3, but this skill is not a mirror of either. Rule text and code are original.
