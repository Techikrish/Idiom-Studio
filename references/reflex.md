# Reflex

Reflex rules cover the defaults an LLM reaches for when it has no direction. They are not forbidden.
They are **suspicious as defaults** and must become decisions.

A Reflex finding is a question, not a verdict:

- Is this the right pattern for this product, or the first pattern in the training data?
- Would the screen still work if this element were removed?
- Is it doing a job, or decorating the absence of a job?

If the answer is "it is doing a job," keep it and waive it with a reason. If the answer is "it looked
good," remove it.

---

## The common defaults

### 1. Web chrome in a native shell

Hamburger drawer, centered title, overflow kebab, hero card, three-column feature grid.

**Why it happens:** the model has seen more marketing sites than native apps.

**Legitimate:** almost never on iOS; rarely on Android.

**Instead:** `NavigationStack` + title + toolbar + tab bar on iOS. `TopAppBar` + navigation bar or rail
on Android. Put the overflow in the platform overflow.

### 2. Five equal tabs

Every app gets Home, Search, Create, Inbox, Profile.

**Why it happens:** it is the default information architecture in tutorials.

**Legitimate:** products where those five destinations genuinely have equal weight and frequency.

**Instead:** two or three primary destinations plus a secondary surface. Give the primary task more
weight than the rest. On Android, move the rest into overflow or a navigation drawer; on iOS, use the
tab bar's built-in More only when the destinations truly are peers.

### 3. Card stack for everything

Every row is an elevated card with a shadow, a radius, and 16dp of padding.

**Why it happens:** cards are the easiest way to make a wireframe look "designed."

**Legitimate:** a feed of heterogeneous, independently actionable objects; a dashboard of unrelated
metrics.

**Instead:** plain lists, dividers, and one elevated surface for the thing that matters. On iOS,
`List` with `.insetGrouped`; on Android, `ListItem`. Hierarchy comes from type, spacing, and position,
not from wrapping everything in a rectangle.

### 4. Pill everything

Every button, chip, card, search field, and avatar is fully rounded.

**Why it happens:** pills read as friendly and modern in isolation.

**Legitimate:** tags, single-line filters, a small set of high-emphasis actions.

**Instead:** a radius scale with small, medium, and large steps. Let shape distinguish a button from a
card from a sheet. A 28dp radius on a 200dp-tall card is not a design system; it is a default.

### 5. Gradient everything

Purple-to-blue headers, mint-to-lime accents, gradient text, gradient buttons.

**Why it happens:** gradients hide weak hierarchy and look "premium" in a thumbnail.

**Legitimate:** a brand surface with a real role; a photo overlay scrim; a data visualization.

**Instead:** one solid accent, generous neutrals, and type hierarchy. If a gradient has no job, it is
noise. Never put body text on a gradient without measured contrast.

### 6. Glass everything

`.ultraThinMaterial` on every card, `glassEffect` on content, blurred toolbars over text.

**Why it happens:** glass is the current platform aesthetic, and models over-apply new APIs.

**Legitimate:** the control layer (navigation bars, toolbars, floating controls) and overlays where
content must remain visible underneath.

**Instead:** Liquid Glass only where the platform puts it. Standard materials or solid surfaces for
content. Glass on glass is always wrong.

### 7. Bento grid on a phone

A 2×3 grid of unequal cards, each with an icon and a number, on a 390pt-wide screen.

**Why it happens:** it looks like a dashboard in a screenshot.

**Legitimate:** wide layouts with genuinely scannable, independent metrics.

**Instead:** on compact width, use a vertical list ordered by importance. A bento grid on a phone is a
desktop layout squeezed into a column.

### 8. Default FAB as the primary action

Every screen has a floating plus button, including Settings and Detail.

**Why it happens:** the Material template includes one.

**Legitimate:** a single, frequent creation action that is the screen's main job.

**Instead:** a FAB only when there is one dominant action. For 2–6 related actions, use
`FloatingActionButtonMenu`. For everything else, put the action in the app bar or inline.

### 9. Emoji as icons

🔥 in a heading, 🚀 in a button, ✅ in a list.

**Why it happens:** emoji are available without an icon set.

**Legitimate:** user content, reactions, and expressive copy where the emoji is the content.

**Instead:** SF Symbols on iOS, Material Symbols on Android. They inherit weight, scale, and tint, and
they are announced correctly by screen readers.

### 10. Full-screen modal for one field

A whole screen slides up to rename a file, add a tag, or enter a date.

**Why it happens:** it is easy to route to a new view.

**Legitimate:** a multi-step flow, a media capture, or a task that genuinely needs focus.

**Instead:** a sheet with detents, an inline edit, a popover, or an alert with a text field. Match the
surface to the size of the task.

### 11. "Welcome back, John" personalization

A greeting with a fake name and a stock avatar.

**Why it happens:** it fills the top of the screen and looks friendly.

**Legitimate:** a real, known user with a real profile.

**Instead:** use the real account state. If there is no user yet, show onboarding or an empty state,
not a fictional one.

### 12. Stats cards with invented numbers

"12.4k users", "98% uptime", "$1,234.56" on a new project with no data.

**Why it happens:** empty dashboards look broken, so the model fills them.

**Legitimate:** a demo or marketing page, clearly labeled.

**Instead:** show a real zero state with a next action, or a skeleton while loading. A fake number is
worse than an empty screen because it teaches the user not to trust the product.

### 13. Everything animates

Every tap springs, every list item staggers, every number counts up.

**Why it happens:** motion is easy to add and looks impressive in a screen recording.

**Legitimate:** state transitions, continuity between screens, feedback for a committed action.

**Instead:** one motion signature, short durations, and a reduce-motion fallback. Motion should explain
a change, not announce that the app is alive.

### 14. The AI-startup palette

Indigo-to-violet gradient, mint accent, near-black background, glass cards.

**Why it happens:** it is the visual prior of a thousand generated landing pages.

**Legitimate:** never as the default. It can be a deliberate brand choice if the product actually owns
it.

**Instead:** choose a material from `idiom direction` and validate contrast. A palette should come from
the product's subject, not from the model's average.

---

## How to keep a Reflex

A Reflex can stay when it is the best pattern for the job. Record why:

```swift
// idiom-ignore card-stack: each card is an independently actionable listing with its own media
```

```kotlin
// idiom-ignore android-five-tabs: the five destinations are the product's five equal workstreams
```

A good waiver answers:

1. What job does this pattern do here?
2. What would break if it were removed?
3. Why is the generic alternative worse for this product?

If you cannot answer all three, remove the pattern.

---

## Anti-convergence

The biggest Reflex is **sameness across apps**. Two different products should not produce the same
screen with different labels.

Use the ledger:

```bash
idiom direction --name "App" --category "..." --adjectives "..." --save
```

The dealer avoids the last three directions and records what was used. Then commit to:

- **One material.** Not a blend of Paper and Signal.
- **One signature move.** A distinctive numeral treatment, a rule, a surface, a motion. Once.
- **One refusal.** A thing this app will never do. Write it down and enforce it.

The signature move is what makes the app recognizable. The refusal is what keeps it coherent.

---

## Review questions

- If I removed every card, gradient, and pill, would the screen still have hierarchy?
- Does the navigation match the platform, or a website?
- Is the primary action obvious without a colored button?
- Is there exactly one accent doing one job?
- Would this screen look the same if the product were a different category?
- Which element exists only because the model saw it in a template?
