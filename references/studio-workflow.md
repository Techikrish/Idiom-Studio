# Studio workflow

How the generator decides, how to override it, and how to hand the result to a coding agent.

## 1. The brief

The generator reads the brief as plain text. More signal produces a more specific direction. A useful
brief covers:

```text
Product:   one sentence
Platform:  iOS / Android / both
Audience:  who, where, and in what state of mind
Content:   data / reading / visual / mixed
Mood:      three adjectives
Density:   compact / comfortable / spacious
Mode:      light / dark / both
Screens:   the 3–5 screens that must exist
Avoid:     what the user rejected
```

Do not pad the brief with category keywords just to steer the result. Write what the product is. The
selection is deterministic, so the same words always produce the same direction.

## 2. The command

```bash
idiom-studio design "<brief>" --name "<AppName>" --out .idiom/design --shot
```

The command prints:

- the chosen family, variant, accent, mode, and confidence;
- the signals that matched;
- two alternative families with their scores;
- the output directory and files.

### Flags

| Flag | Behavior |
|---|---|
| `--name` | Sets the product name and output slug. Defaults to the family name. |
| `--out` | Output directory. Defaults to `./studio-out/<slug>`. |
| `--mode light\|dark` | Forces the preview mode. Both modes are always generated. |
| `--family` | Forces a family. The variant and accent are still selected from the brief. |
| `--variant` | Forces a variant inside the chosen family. |
| `--accent` | Forces an accent inside the chosen family. |
| `--shot` | Renders `preview.png` with headless Chrome. |
| `--json` | Prints a JSON summary instead of the human report. |
| `--quiet` | Prints only the output directory. |

## 3. How selection works

### Family score

Each family has:

- `keywords` — concrete product and content words;
- `feelings` — mood adjectives, weighted lower;
- `avoidFor` — categories that subtract score;
- content cues — words that boost related families.

A keyword match adds 2.25 points (3 for a phrase). A feeling adds 0.5. An avoided category subtracts 4.
Content cues add 1.5–2.5. The highest score wins.

If no family scores above zero, the generator uses a hash of the brief and name to pick a family. That
is the `low confidence` case. It is still deterministic.

### Variant score

The variant is scored on:

- overlap between brief words and the variant's name, summary, treatment, and signature;
- density words (`dense`, `compact`, `fast`, `data`) favoring compact variants;
- calm words (`calm`, `slow`, `quiet`, `spacious`) favoring spacious variants;
- explicit dark or light words;
- display size for `bold` or `compact` briefs.

Ties are broken by a hash of the seed and variant id.

### Accent

Tone words are grouped into warm, cool, natural, bold, and quiet. Each accent is scored by hue,
saturation, and lightness against those tones. A direct name match (`green`, `lavender`, `orange`)
adds a large bonus. Ties are broken by hash.

### Mode

An explicit `--mode` wins. Otherwise explicit `dark` or `light` words in the brief win. Otherwise
variants marked as dark-first (for example `flight-deck`, `nightclub`, `meditation-timer`) default to
dark; everything else defaults to light.

### Determinism

The seed is `normalize(brief + "|" + name)`. The same brief and name always produce the same family,
variant, accent, and mode. Changing the name changes the seed and may change the variant or accent
tie-break, but not the family unless scores are tied.

## 4. Confidence

| Confidence | Meaning | Action |
|---|---|---|
| `high` | Three or more category signals matched | Commit. |
| `medium` | One or two signals matched | Commit, or compare one alternative. |
| `low` | No category signal; hash fallback | Commit to the proposal, or force a family from the audience. |

The report always names the two closest alternatives. If the proposal misses, generate a second
complete direction with `--family` and compare previews. Do not merge them.

## 5. Reading the bundle

### `DESIGN.md`

The primary document. It contains:

- the direction and why it was chosen;
- principles, signature moves, and the avoid list;
- screen rules for home, detail, create, and profile;
- iOS and Android platform rules;
- the type table, palette table, and contrast line;
- space, shape, and motion values;
- component rules;
- a copy-paste **Agent brief** at the end.

### `design.json`

Machine-readable. Useful when a script or agent needs the direction, content, screens, components, or
alternatives without parsing Markdown. It includes the `studio` version and the `files` map.

### `tokens.json`

The source of truth for implementation. See `references/tokens.md`.

### `preview.html` / `preview.png`

A design board with two phone screens: home and detail. The HTML has a light/dark toggle and a sidebar
with palette, type, signature moves, and contrast. It is a reference, not production code.

## 6. Handoff checklist

Before the coding agent writes UI:

- [ ] `.idiom/design/DESIGN.md` exists and names one family and variant.
- [ ] `tokens.json` exists and all contrast checks pass.
- [ ] The agent has read the screen rules and the platform section.
- [ ] The app name and bundle/package id are known.
- [ ] The first three screens are chosen.
- [ ] The state matrix is written in `.idiom/decisions.md`.
- [ ] The agent knows which theme file to copy.

After the UI is built:

- [ ] The app builds.
- [ ] Light and dark both render.
- [ ] Largest Dynamic Type / font scale does not clip.
- [ ] Empty, error, offline, and permission states exist.
- [ ] VoiceOver / TalkBack labels exist for icon-only controls.
- [ ] The preview and the native screens read as the same product.
- [ ] The optional gate passes or has specific waivers.

## 7. Worked examples

| Brief | Direction | Why |
|---|---|---|
| Dense investment portfolio, dark, technical | Instrument / Flight Deck / Signal Green / dark | `portfolio`, `investment`, `data`, `dark` |
| Hiking trails, maps, nearby places, warm | Spatial / Trail Map / Moss / light | `trails`, `maps`, `nearby`, `outdoors` |
| Sleep, meditation, bedtime ritual, soft | Ritual / Meditation Timer / Lavender / dark | `sleep`, `meditation`, `ritual`, `calm` |
| City services, permits, notices, plain language | Civic / Service Desk or Notice Board / Civic Blue / light | `city`, `services`, `permit`, `public` |
| Seasonal garden and recipes | Organic / Market Table or Garden Plot / Tomato / light | `garden`, `recipe`, `seasonal` |
| Weekend plans with friends, stickers | Playground / Sticker Album / bright accent / light | `friends`, `plans`, `stickers`, `playful` |

## 8. Troubleshooting

| Problem | Fix |
|---|---|
| `idiom-studio: command not found` | Run `./install.sh`, then add `~/.local/bin` to PATH, or call `node <skill>/bin/studio.mjs`. |
| No `preview.png` | Chrome was not found. Set `CHROME_PATH`, or open `preview.html` directly. |
| Unknown variant | The variant belongs to another family. Run `idiom-studio families` to see valid ids. |
| The same family keeps winning | The brief shares category words. Force a family and compare, or make the brief more specific. |
| Output looks wrong for the audience | Check `why.signals` in `design.json`. If the signals are wrong, rewrite the brief, do not recolor the result. |
| Need a token that is missing | Add it to `tokens.json` and `DESIGN.md`, and state why. Never improvise silently. |
