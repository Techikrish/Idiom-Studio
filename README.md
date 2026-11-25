# Idiom Studio

**An installable design skill for coding agents. Native iOS and Android only.**

> [!WARNING]
> **Beta software.** Idiom Studio is under active development. Expect bugs, rough edges, and breaking
> changes between releases. If something looks wrong, please
> [open an issue](https://github.com/Techikrish/Idiom-Studio/issues) with the brief, the chosen
> direction, and the generated files.

You describe the app. Idiom Studio chooses a committed visual direction — family, variant, accent,
mode — then produces design tokens, a rendered preview, and drop-in SwiftUI/Compose themes. The agent
uses that package to build the screens, so the result looks like it was designed for the brief instead
of recolored from the same AI template.

```
brief → family → variant → accent + mode → tokens → spec + preview + SwiftUI/Compose themes
```

- 10 families, 30 variants, 3–4 accents per family, light and dark.
- Deterministic: the same brief always produces the same direction.
- Native grammar and accessibility are part of the skill, not an afterthought.
- Zero dependencies. Node 20+ only. System fonts only.

---

## Install

```bash
git clone https://github.com/Techikrish/Idiom-Studio.git ~/.idiom-studio
~/.idiom-studio/install.sh
```

The installer wires the skill into every agent it finds:

| Agent | Location |
|---|---|
| Claude Code | `~/.claude/skills/idiom-studio` |
| Codex | `~/.agents/skills/idiom-studio` |
| OpenCode | `~/.config/opencode/skills/idiom-studio` and `~/.agents/skills` |
| Hermes / other | `./install.sh --target <that agent's skills directory>` |

It also installs two commands into `~/.local/bin`:

- `idiom-studio` — the design generator
- `idiom-gate` — the optional anti-slop linter

If `~/.local/bin` is not on your PATH:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

### Project-local install

Commit the skill with the app so every teammate and every agent uses the same direction:

```bash
./install.sh --target .agents/skills --copy
```

Codex and OpenCode both read project `.agents/skills`. Claude Code reads project `.claude/skills`:

```bash
./install.sh --target .claude/skills --copy
```

### Hermes and other agents

Any agent that implements the open Agent Skills standard reads a directory containing `SKILL.md`:

```bash
./install.sh --target ~/.hermes/skills
```

If the agent does not support skills yet, point it at this repository and tell it to read `SKILL.md`.
The skill is self-contained; the CLI is recommended but not required.

### Verify the install

```bash
idiom-studio families      # lists 10 families and their variants
idiom-studio validate      # validates every palette in both modes
```

---

## Test it in 60 seconds

No agent needed:

```bash
idiom-studio design "A local guide for hiking trails, maps, and nearby places. Warm, outdoors, calm." \
  --name "North" --out /tmp/north --shot
```

Open `/tmp/north/preview.png` or `/tmp/north/preview.html`. You should get **Spatial / Trail Map**,
moss accent, light mode.

Now prove the core claim — different briefs produce different products:

```bash
idiom-studio design "A dense portfolio app for investments, budgets, and market positions. Dark, technical." \
  --name "Ledger" --out /tmp/ledger --shot

idiom-studio design "A calm app for sleep, meditation, and a bedtime ritual. Soft, gentle, breathing." \
  --name "Dusk" --out /tmp/dusk --shot

idiom-studio design "A city services app for permits, notices, and public transit. Plain language." \
  --name "Civic" --out /tmp/civic --shot

idiom-studio design "A weekend plans app for friends, stickers, and group ideas. Playful." \
  --name "Crew" --out /tmp/crew --shot
```

Compare the four `preview.png` files. They should not share a layout.

---

## Use it in an agent

### Claude Code

```bash
mkdir -p /tmp/test-app && cd /tmp/test-app
claude
```

Prompt:

```text
Use the idiom-studio skill. Build a native iOS app for tracking climbing sessions:
log a session, see progress, and find a nearby gym.

Do not ask me questions; state your assumptions. Generate the direction first,
show me the preview, then implement the home and detail screens in SwiftUI.
Use the generated theme and cover loading, empty, error, and offline states.
```

### Codex

```bash
cd /tmp/test-app
codex
```

Prompt:

```text
$idiom-studio Build a native Android app for a neighbourhood coffee guide with maps,
opening hours, and a short editorial for each cafe.

Generate the direction first, then implement Home and Detail in Jetpack Compose.
Use the generated theme, edge-to-edge insets, predictive back, and 48dp targets.
```

### OpenCode

```bash
cd /tmp/test-app
opencode
```

Prompt:

```text
@idiom-studio Build a native iOS app for a seasonal garden and recipe journal.
Generate the direction first, then implement the home and detail screens in SwiftUI.
Use the generated tokens and show me the preview.
```

### What good looks like

The agent should:

1. Write a one-line brief and state its assumptions.
2. Run `idiom-studio design ... --out .idiom/design --shot`.
3. Read `.idiom/design/DESIGN.md` and `tokens.json`.
4. Copy `ios/Theme.swift` or `android/Theme.kt` into the project.
5. Build native screens using the family's screen rules.
6. Cover loading, empty, error, offline, and permission states.
7. Report the direction and what it could not verify.

If the agent skips step 2 and starts writing UI, stop it and point it at `SKILL.md`.

---

## What you get

Every run writes:

| File | Purpose |
|---|---|
| `DESIGN.md` | Thesis, why, screen rules, platform rules, type, color, components, and a copy-paste agent brief |
| `design.json` | Machine-readable direction, content, screens, components, alternatives |
| `tokens.json` | Colors, type, spacing, radii, motion, and contrast report |
| `preview.html` | Interactive design board with light/dark toggle |
| `preview.png` | Rendered design board (with `--shot`) |
| `ios/Theme.swift` | SwiftUI theme: adaptive colors, system fonts, spacing, radius, motion |
| `android/Theme.kt` | Compose Material 3 theme: color schemes, typography, shapes |

The theme files are standalone and have no third-party dependencies.

---

## The families

| Family | Use for | Variants |
|---|---|---|
| **Editorial** | reading, news, books, long-form | Broadsheet, Field Notes, Literary Journal |
| **Instrument** | finance, data, monitoring, operations | Trading Desk, Flight Deck, Laboratory |
| **Cinematic** | film, music, events, streaming | Film Festival, Gallery, Nightclub |
| **Spatial** | maps, travel, trails, local | Trail Map, City Guide, Studio Canvas |
| **Ritual** | sleep, meditation, habits, fitness | Morning Pages, Training Log, Meditation Timer |
| **Playground** | friends, plans, social, kids | Toy Box, Sticker Album, Arcade |
| **Luxe** | fashion, hotels, beauty, premium | Atelier, Concierge, Boutique |
| **Utility** | tools, weather, files, notes | Pocket Tool, Workbench, Field Manual |
| **Civic** | government, transit, permits, services | Notice Board, Service Desk, Wayfinding |
| **Organic** | food, garden, farming, nature | Market Table, Garden Plot, Slow Kitchen |

Full reference: `references/families.md`.

---

## How it decides

1. **Family** — scores keywords, feelings, content cues, and negative signals. Reports matched signals
   and two alternatives. No signal → deterministic hash fallback with `low confidence`.
2. **Variant** — scores the brief against density, treatment, and signature. Compact briefs get compact
   variants; calm briefs get spacious ones.
3. **Accent** — scores hue, saturation, and lightness against tone words (warm, cool, natural, bold,
   quiet). Direct color words get a large bonus.
4. **Mode** — explicit flag, explicit words, or the variant's dark-first default.
5. **Tokens** — generated, contrast-checked, and emitted for Swift and Kotlin.

Same brief + same name = same direction. Details: `references/studio-workflow.md`.

---

## CLI

```bash
idiom-studio design "<brief>" [options]
idiom-studio families
idiom-studio validate
```

| Option | Description |
|---|---|
| `--name <name>` | Product name used in the spec and themes |
| `--out <dir>` | Output directory (default `./studio-out/<slug>`) |
| `--mode light\|dark` | Force the preview mode |
| `--family <id>` | Force a family |
| `--variant <id>` | Force a variant |
| `--accent <id>` | Force an accent |
| `--shot` | Render `preview.png` with headless Chrome |
| `--json` | Print a JSON summary |
| `--quiet` | Print only the output directory |

---

## Optional gate

The original linter is still included as a verification step. Use it after the UI is built:

```bash
idiom-gate lint . --mode prototype
idiom-gate states .
idiom-gate lint . --mode release --strict
```

It checks platform grammar, accessibility, honest states, fake data, and dead controls. See `GATE.md`
and `references/floor.md`. The gate is optional; the design direction is the product.

---

## Requirements

- Node.js 20 or newer for the generator.
- Chrome/Chromium for `--shot`. Without it, `preview.html` still works.
- macOS + Xcode to build the iOS output; Android SDK to build the Android output. The skill can
  generate and inspect the design without either.

---

## Examples

Generated bundles live in:

- `examples/finance` — Instrument / Flight Deck, signal green, dark
- `examples/travel` — Spatial / Trail Map, moss, light
- `examples/health` — Ritual / Meditation Timer, lavender, dark

Each includes `preview.png`, `DESIGN.md`, `tokens.json`, and both theme files.

---

## Uninstall

```bash
~/.idiom-studio/install.sh --uninstall
```

Or, for a local checkout:

```bash
./install.sh --uninstall
```

---

## License

MIT. The Floor/Reflex/Finish model is adapted from Hallmark (MIT). Native guidance is informed by the
Apple HIG and Material 3 but is not a mirror of either. Rule text and code are original.
