# Families

Idiom Studio ships ten direction families. Each family has three variants. The generator picks
one family from the brief, then one variant, one accent, and one mode. This file is the
human-readable reference and the no-CLI fallback.

**Rules that apply to every family:** one direction only, system fonts, 44pt/48dp targets,
semantic type styles, real states, and color is never the only signal.

## Contents

- [Cinematic](#cinematic) — The app is a stage: image, atmosphere, and timing do the work; the interface stays out of the frame.
- [Civic](#civic) — The app is a public building: open, legible, and accountable to everyone who walks in.
- [Editorial](#editorial) — The app should read like a publication: one clear voice, strong hierarchy, and room for the content to breathe.
- [Instrument](#instrument) — The app is a precision instrument: dense information, exact alignment, and no decoration that competes with the data.
- [Luxe](#luxe) — The app is a quiet room: generous space, one beautiful object at a time, and confidence without noise.
- [Organic](#organic) — The app is grown, not assembled: irregular rhythm, natural color, and materials that feel handled.
- [Playground](#playground) — The app is a playground: shape, color, and motion carry personality, but the next action is never ambiguous.
- [Ritual](#ritual) — The app is a ritual: one clear sequence, a calm pace, and visible progress without pressure.
- [Spatial](#spatial) — The app is a place: location, movement, and layers give the screen its structure.
- [Utility](#utility) — The app is a well-made tool: immediate, legible, and respectful of the hand using it.

## Cinematic

**Thesis.** The app is a stage: image, atmosphere, and timing do the work; the interface stays out of the frame.

**Best for.** Film, music, events, nightlife, streaming, photography, and culture.

**Avoid for.** utilities, banking, forms, dense data.

**Density.** spacious · **Surface.** image-led · **Shape.** soft (4/10/18)

### Variants

| Variant | Summary | Signature | Display / body |
|---|---|---|---:|
| `film-festival` — **Film Festival** | A poster wall: full-bleed key art, oversized titles, and minimal chrome. | A title that bleeds into the image. | 52 / 15 |
| `gallery` — **Gallery** | A white cube: large images, quiet labels, and a lot of air. | A caption set in the margin, not under the image. | 38 / 16 |
| `nightclub` — **Nightclub** | A dark stage: one neon accent, a stacked line-up, and high contrast. | A glowing time marker. | 44 / 14 |

### Signature moves

- A title that bleeds into the image.
- A caption set in the margin, not under the image.
- A glowing time marker.
- A full-bleed image that changes with the scroll.

### Palette

| Role | Light | Dark |
|---|---|---|
| `background` | `#F5F2EC` | `#080808` |
| `surface` | `#FFFFFF` | `#121212` |
| `elevated` | `#FFFFFF` | `#1A1A1A` |
| `text` | `#121212` | `#F5F5F0` |
| `muted` | `#5C5C5C` | `#A8A8A0` |
| `border` | `#DDD8CE` | `#2A2A2A` |

Accents:

| Accent | Light | Dark | On light | On dark |
|---|---|---|---|---|
| `gold` — Gold | `#8A6A1F` | `#E8C36A` | `#FFFFFF` | `#1A1408` |
| `electric` — Electric Blue | `#1D4ED8` | `#7DA2FF` | `#FFFFFF` | `#08122A` |
| `crimson` — Crimson | `#A61B2B` | `#FF7A8A` | `#FFFFFF` | `#22080C` |

### Type

Display: SF Pro Display / Roboto (sans). Body: SF Pro / Roboto (sans). Numeric: SF Pro / Roboto (proportional).

Display size 38–52 · body 14–16 · scale 1.5 · display tracking -0.03em · label tracking 0.12em.

### Screens

- **Home.** A full-bleed hero for the featured event, a time-and-venue line, then a horizontal line-up of alternatives. The hero is the only image at full width.
- **Detail.** An image-led detail: title, time, venue, a short description, and one reserve action. Keep the back gesture.
- **Create.** A short booking flow: date, time, quantity, seat or tier, payment. Show the real price and fees before confirmation.
- **Profile.** A ticket wallet: upcoming and past, with clear dates and venues. No fake loyalty points.

### Components

- **Button.** Solid accent with high contrast; a text-only secondary. Avoid pills unless the whole shape language is soft.
- **List.** Horizontal poster cards with 3:4 or 2:3 imagery, title and time below. Do not wrap each card in another card.
- **Input.** Minimal underline or filled field, large touch targets, clear error text.
- **Navigation.** Transparent top bar over imagery, tab bar for peers, sheets for detail.

### Principles

- One image, one title, one time.
- Chrome disappears until needed.
- Text over media needs a measured scrim.
- Motion is a cut or a fade, not a bounce.

### Avoid

- A grid of equal cards over a hero image.
- Neon gradients with no content reason.
- Autoplay video with sound.
- A play button on media that does not play.

### Platform

- **iOS.** Use a full-bleed hero under the status bar with a scrim only where text sits. Keep the system back button. Use a transparent navigation bar that becomes opaque on scroll. Sheets for details. Tab bar for peers.
- **Android.** Edge-to-edge with a transparent top app bar and a scrim. Predictive back. Use a bottom sheet for details. No FAB. Keep the system bars legible over imagery.

---

## Civic

**Thesis.** The app is a public building: open, legible, and accountable to everyone who walks in.

**Best for.** Government, transit, education, community services, public health, voting, and local organizing.

**Avoid for.** luxury, nightlife, gambling, fashion.

**Density.** comfortable · **Surface.** flat-public · **Shape.** plain (2/6/12)

### Variants

| Variant | Summary | Signature | Display / body |
|---|---|---|---:|
| `notice-board` — **Notice Board** | A public notice board: strong headings, plain language, and clear deadlines. | A colored left rule that marks urgency. | 34 / 17 |
| `service-desk` — **Service Desk** | A service counter: step-by-step forms, visible progress, and human help nearby. | A numbered step rail that stays visible. | 30 / 17 |
| `wayfinding` — **Wayfinding** | A transit sign: oversized labels, strong contrast, and routes you can read at a glance. | A route badge that repeats across every screen. | 40 / 16 |

### Signature moves

- A colored left rule that marks urgency.
- A numbered step rail that stays visible.
- A route badge that repeats across every screen.
- A plain-language summary above the legal text.

### Palette

| Role | Light | Dark |
|---|---|---|
| `background` | `#F4F6F8` | `#0B111B` |
| `surface` | `#FFFFFF` | `#131C29` |
| `elevated` | `#FFFFFF` | `#1B2635` |
| `text` | `#111827` | `#F0F4F9` |
| `muted` | `#4B5563` | `#AAB6C6` |
| `border` | `#D5DBE3` | `#2C394B` |

Accents:

| Accent | Light | Dark | On light | On dark |
|---|---|---|---|---|
| `civic-blue` — Civic Blue | `#0B4F9C` | `#8AB8F5` | `#FFFFFF` | `#06152B` |
| `transit-red` — Transit Red | `#B42318` | `#FF9A8F` | `#FFFFFF` | `#220706` |
| `park-green` — Park Green | `#246B45` | `#8ED3AA` | `#FFFFFF` | `#06170E` |
| `signal-yellow` — Signal Yellow | `#7A5200` | `#F2C94C` | `#FFFFFF` | `#1C1303` |

### Type

Display: SF Pro Display / Roboto (sans). Body: SF Pro / Roboto (sans). Numeric: SF Pro / Roboto (tabular).

Display size 30–40 · body 16–17 · scale 1.25 · display tracking -0.01em · label tracking 0.04em.

### Screens

- **Home.** A plain-language service index: one clear search, the top three tasks, and current notices with dates. Deadlines are visible without opening anything.
- **Detail.** A service detail: what it is, who it is for, what it costs, what you need, and how long it takes. The start action is above the fold.
- **Create.** A multi-step form with a visible step count, one question per screen where possible, saved progress, and a real review step before submit.
- **Profile.** A personal record: applications, documents, and payments. Show status in text as well as color, and make every record downloadable.

### Components

- **Button.** Solid civic blue with a 6-12pt radius and a text label. Secondary actions are outlined. Never icon-only for a consequential action.
- **List.** Flat rows with a 1pt separator and a colored urgency rule only when there is a real deadline. No shadows.
- **Input.** Label above, one field per row, hint text below, error in text and color. Large targets and visible focus.
- **Navigation.** Top app bar plus tab bar for two or three peers. A help action in the toolbar. No hamburger.

### Principles

- Plain language first; jargon last.
- Every deadline and cost is visible up front.
- Never use color alone to carry meaning.
- Help is always one tap away.

### Avoid

- Official-looking seals and crests used as decoration.
- A carousel of announcements that hides the important one.
- A form that asks for the same information twice.
- Small gray legal text as the only explanation.

### Platform

- **iOS.** Use the system navigation bar, back gesture, and sheet detents. Support Dynamic Type up to accessibility sizes, VoiceOver, and reduce motion. Never rely on color alone. Keep forms in one column with 44pt targets.
- **Android.** Edge-to-edge with a TopAppBar and predictive back. Support TalkBack and 200% font scale. Use 48dp targets and visible focus states. Keep forms in one column. No custom gestures where a button will do.

---

## Editorial

**Thesis.** The app should read like a publication: one clear voice, strong hierarchy, and room for the content to breathe.

**Best for.** Reading, writing, news, research, journals, and newsletters.

**Avoid for.** trading, arcade, fast delivery, real-time monitoring.

**Density.** comfortable · **Surface.** border-first · **Shape.** square (2/6/12)

### Variants

| Variant | Summary | Signature | Display / body |
|---|---|---|---:|
| `broadsheet` — **Broadsheet** | A confident front page: oversized masthead, an asymmetric lead story, and a tight news list. | A hairline rule that runs past the content margin. | 48 / 17 |
| `field-notes` — **Field Notes** | A working notebook: ruled lines, mono labels, compact entries, and a sense of use. | A ruled margin with numbered sections. | 34 / 16 |
| `literary-journal` — **Literary Journal** | A quiet journal: centered serif, generous leading, and a single pull quote. | A drop cap on the opening paragraph. | 42 / 18 |

### Signature moves

- A hairline rule that runs past the content margin.
- A drop cap on the first paragraph.
- A section number set in the margin.
- An oversized pull quote that breaks the column.

### Palette

| Role | Light | Dark |
|---|---|---|
| `background` | `#F7F3EA` | `#141210` |
| `surface` | `#FFFFFF` | `#1D1A17` |
| `elevated` | `#FFFDF8` | `#26221E` |
| `text` | `#171512` | `#F4EFE6` |
| `muted` | `#5E5850` | `#B8B0A4` |
| `border` | `#D9D2C4` | `#3A342D` |

Accents:

| Accent | Light | Dark | On light | On dark |
|---|---|---|---|---|
| `oxblood` — Oxblood | `#9B2C1F` | `#E37A5F` | `#FFFFFF` | `#1A1512` |
| `forest` — Forest | `#2F5D46` | `#7BC4A0` | `#FFFFFF` | `#101A14` |
| `navy` — Navy | `#1F3A5F` | `#8BB8E8` | `#FFFFFF` | `#0C1520` |
| `mustard` — Mustard | `#7A5A00` | `#E0B05A` | `#FFFFFF` | `#1D1608` |

### Type

Display: New York / Noto Serif (serif). Body: SF Pro / Roboto (sans). Numeric: SF Pro / Roboto (proportional).

Display size 34–48 · body 16–18 · scale 1.333 · display tracking -0.02em · label tracking 0.08em.

### Screens

- **Home.** Masthead, issue metadata, one lead story with a two-column headline, then a tight list of secondary stories. The lead is twice the visual weight of any other item.
- **Detail.** A 60-70 character measure, a serif headline, a byline and date, one pull quote, and related stories below a rule. Keep the reading position when returning.
- **Create.** A writing desk: title field, body editor, byline, a visible draft state, and one publish action. The keyboard must not cover the publish control.
- **Profile.** A contributor page: portrait, short bio, a list of pieces, and one follow action. Do not use a dashboard of invented statistics.

### Components

- **Button.** Rectangular with a 2pt radius. Solid ink fill for the primary action; underline or text for secondary actions. No pills.
- **List.** Hairline rules, 20pt vertical rhythm, no cards. Metadata sits above the title in uppercase 11-13pt with 0.08em tracking.
- **Input.** Underline only, label above, helper text below. No rounded box, no floating label.
- **Navigation.** iOS: large title plus tab bar for peers. Android: top app bar plus navigation bar or rail. The title is the strongest element in the chrome.

### Principles

- One lead story per screen. Everything else is secondary.
- Type and rules carry hierarchy; shadows are for overlays only.
- Margins are part of the composition, not leftover space.
- Real headlines and real bylines, never lorem ipsum.

### Avoid

- A grid of identical cards with equal visual weight.
- A hero image with a gradient overlay and no editorial reason.
- Centered body text wider than 75 characters.
- Decorative serif used for dense data.

### Platform

- **iOS.** NavigationStack with a large title. Use a serif display face for the masthead and SF Pro for body and metadata. Keep the system back button and swipe-back. Put one secondary action in the toolbar. Use a tab bar only when three destinations are true peers. Sheets use medium and large detents.
- **Android.** TopAppBar with a small title after scroll and an edge-to-edge list. Use Noto Serif for display and Roboto for body. Consume insets. Use a NavigationBar only for three to five peers; otherwise use a rail. Do not add a FAB. Ripple belongs to rows, not to the whole card.

---

## Instrument

**Thesis.** The app is a precision instrument: dense information, exact alignment, and no decoration that competes with the data.

**Best for.** Finance, analytics, operations, engineering, logistics, and productivity.

**Avoid for.** wellness, kids, fashion, nightlife.

**Density.** compact · **Surface.** flat-grid · **Shape.** sharp (0/4/8)

### Variants

| Variant | Summary | Signature | Display / body |
|---|---|---|---:|
| `trading-desk` — **Trading Desk** | A live desk: dense rows, tabular numbers, and green/red signals used only for state. | A total that updates in place with tabular figures. | 36 / 15 |
| `flight-deck` — **Flight Deck** | A dark cockpit: segmented gauges, uppercase labels, and amber alerts. | A segmented status rail across the top. | 34 / 14 |
| `laboratory` — **Laboratory** | A clean lab: light grid, precise columns, and blue calibration marks. | A measurement grid behind the data. | 34 / 15 |

### Signature moves

- A total that updates in place with tabular figures.
- A segmented status rail across the top.
- A measurement grid behind the data.
- A delta marker that sits on the baseline.

### Palette

| Role | Light | Dark |
|---|---|---|
| `background` | `#F3F4F2` | `#0B0D0C` |
| `surface` | `#FFFFFF` | `#141715` |
| `elevated` | `#FFFFFF` | `#1C201D` |
| `text` | `#111311` | `#F1F5F0` |
| `muted` | `#555A55` | `#A3ADA4` |
| `border` | `#D4D8D2` | `#2B322C` |

Accents:

| Accent | Light | Dark | On light | On dark |
|---|---|---|---|---|
| `signal-green` — Signal Green | `#0B7A3B` | `#4ADE80` | `#FFFFFF` | `#08130C` |
| `amber` — Amber | `#A15C00` | `#FBBF24` | `#FFFFFF` | `#1C1304` |
| `cyan` — Cyan | `#00677A` | `#67E8F9` | `#FFFFFF` | `#06171A` |
| `red` — Red | `#B42318` | `#F87171` | `#FFFFFF` | `#1C0808` |

### Type

Display: SF Pro Display / Roboto Condensed (sans). Body: SF Pro / Roboto (sans). Numeric: SF Mono / Roboto Mono (tabular).

Display size 34–36 · body 14–15 · scale 1.2 · display tracking -0.01em · label tracking 0.06em.

### Screens

- **Home.** One dominant total, a compact delta, a status rail, and rows with aligned columns. The total is the only oversized element.
- **Detail.** A single position: price, change, position size, cost basis, and a simple chart. Actions sit in the toolbar or at the bottom, not floating.
- **Create.** A transaction form: amount first, then account, category, date, and note. Use a numeric keypad, inline validation, and a visible save state.
- **Profile.** Settings and account: grouped rows, clear labels, no invented achievements. Security and data export are easy to find.

### Components

- **Button.** Rectangular with a 0-4pt radius. Primary filled with the signal accent; secondary outlined with a 1pt border. Numeric labels use tabular figures.
- **List.** Rows with a 1pt bottom rule, 12-16pt vertical padding, aligned numeric columns, no cards.
- **Input.** Label above, value right-aligned for numbers, unit inside the field. Error text below in the danger color.
- **Navigation.** Compact title, filter in the toolbar, tab bar or rail for peers. No hamburger.

### Principles

- Data first; chrome second.
- Alignment is the decoration.
- Every number has a unit, a time, and a comparison.
- Color encodes state, not category.

### Avoid

- Equal-weight cards for every metric.
- A dashboard with no primary question.
- Green and red as the only signal.
- Decorative gradients behind numbers.

### Platform

- **iOS.** Use a compact navigation title, not a large title. Use SF Mono for numbers and SF Pro for labels. Put filters in the toolbar. Keep rows at 44pt minimum. Use a tab bar only for peers; otherwise use a segmented control. Keep the system back gesture.
- **Android.** TopAppBar with title and filter action. Edge-to-edge. Use a compact NavigationBar or rail. No FAB unless there is one dominant create action. Use tabular figures and 48dp rows. Predictive back must work.

---

## Luxe

**Thesis.** The app is a quiet room: generous space, one beautiful object at a time, and confidence without noise.

**Best for.** Fashion, beauty, hospitality, premium commerce, dining, and interiors.

**Avoid for.** budget, utility, developer tools, trading.

**Density.** spacious · **Surface.** image-hairline · **Shape.** soft (2/8/16)

### Variants

| Variant | Summary | Signature | Display / body |
|---|---|---|---:|
| `atelier` — **Atelier** | An ivory atelier: serif title, one garment at a time, and generous space. | A full-bleed image with a small serif caption. | 42 / 16 |
| `concierge` — **Concierge** | A dark concierge: gold rules, curated cards, and quiet confidence. | A gold rule under the section label. | 38 / 15 |
| `boutique` — **Boutique** | A soft boutique: pastel surfaces, rounded arches, and gentle motion. | An arched image mask. | 36 / 16 |

### Signature moves

- A full-bleed image with a small serif caption.
- A gold rule under the section label.
- An arched image mask.
- A single object floating in generous space.

### Palette

| Role | Light | Dark |
|---|---|---|
| `background` | `#F7F5F0` | `#0C0C0B` |
| `surface` | `#FFFFFF` | `#151514` |
| `elevated` | `#FFFFFF` | `#1E1D1B` |
| `text` | `#161412` | `#F4F1EA` |
| `muted` | `#5E5A54` | `#A9A49B` |
| `border` | `#DDD8CE` | `#2E2C28` |

Accents:

| Accent | Light | Dark | On light | On dark |
|---|---|---|---|---|
| `brass` — Brass | `#8A6A2F` | `#D9B56A` | `#FFFFFF` | `#1A1408` |
| `burgundy` — Burgundy | `#6E1E2B` | `#D98A9A` | `#FFFFFF` | `#1D080D` |
| `forest` — Forest | `#294A3A` | `#8FC4A8` | `#FFFFFF` | `#07120C` |

### Type

Display: New York / Noto Serif (serif). Body: SF Pro / Roboto (sans). Numeric: SF Pro / Roboto (proportional).

Display size 36–42 · body 15–16 · scale 1.333 · display tracking -0.02em · label tracking 0.12em.

### Screens

- **Home.** One full-bleed image or one large product, a short serif title, and a single line of context. The collection list begins below the fold with generous spacing.
- **Detail.** A product or place detail: large image, name, price, materials, one primary action, and a quiet secondary action. Show the real price and availability.
- **Create.** A booking or order flow: dates, guests, room or item, price, confirmation. Show the full price before payment.
- **Profile.** A quiet account: orders, saved items, preferences. No gamification, no fake status tiers.

### Components

- **Button.** Rectangular or softly rounded, solid ink or accent, generous padding. Secondary actions are text with an underline.
- **List.** Large image rows with a small serif title and one metadata line. Hairline separators, no cards.
- **Input.** Underline or soft filled field, generous height, quiet validation.
- **Navigation.** Transparent over imagery, tab bar for peers, sheets for detail.

### Principles

- One object, one moment.
- Space is the luxury.
- Hairlines and images, not shadows.
- Motion is slow but never blocking.

### Avoid

- A wall of equal product cards.
- Gold gradients used as decoration.
- A countdown timer on a premium product.
- Fake scarcity or fake reviews.

### Platform

- **iOS.** Use a large title sparingly; let the image lead. Keep the system back gesture. Use a transparent navigation bar that becomes opaque on scroll. Sheets for detail. Use a tab bar only for true peers.
- **Android.** Edge-to-edge imagery with a scrim where text sits. Use a top app bar that fades in. Use a bottom sheet for detail. No FAB. Respect predictive back.

---

## Organic

**Thesis.** The app is grown, not assembled: irregular rhythm, natural color, and materials that feel handled.

**Best for.** Food, cooking, gardening, farming, nature, sustainability, and slow living.

**Avoid for.** trading, nightlife, enterprise software, gaming.

**Density.** comfortable · **Surface.** paper-produce · **Shape.** irregular (10/18/32)

### Variants

| Variant | Summary | Signature | Display / body |
|---|---|---|---:|
| `market-table` — **Market Table** | A market stall: abundant produce, hand-written price tags, and a warm crowd of cards. | A hand-written price tag pinned to the image. | 38 / 16 |
| `garden-plot` — **Garden Plot** | A garden bed: rows, seasons, and a calm record of what is growing. | A seasonal band across the top of the plot. | 34 / 16 |
| `slow-kitchen` — **Slow Kitchen** | A kitchen notebook: a recipe in steps, generous ingredients, and no rush. | A timeline that marks the resting and cooking stages. | 36 / 17 |

### Signature moves

- A hand-written price tag pinned to the image.
- A seasonal band across the top of the plot.
- A timeline that marks the resting and cooking stages.
- An ingredient list that sits in the margin.

### Palette

| Role | Light | Dark |
|---|---|---|
| `background` | `#F6F2E8` | `#12150F` |
| `surface` | `#FFFCF5` | `#1B2017` |
| `elevated` | `#FFFFFF` | `#242B1F` |
| `text` | `#20241B` | `#F2F3E8` |
| `muted` | `#5C6252` | `#B0B6A2` |
| `border` | `#DDD6C4` | `#333B2C` |

Accents:

| Accent | Light | Dark | On light | On dark |
|---|---|---|---|---|
| `tomato` — Tomato | `#A3341F` | `#FF8A6B` | `#FFFFFF` | `#220A05` |
| `olive` — Olive | `#556B2F` | `#BED48A` | `#FFFFFF` | `#141A08` |
| `pumpkin` — Pumpkin | `#96540D` | `#F3B25E` | `#FFFFFF` | `#1E1002` |
| `beet` — Beet | `#7A2447` | `#EBA0BE` | `#FFFFFF` | `#1E0710` |

### Type

Display: New York / Noto Serif (serif). Body: SF Pro / Roboto (sans). Numeric: SF Pro / Roboto (proportional).

Display size 34–38 · body 16–17 · scale 1.333 · display tracking -0.015em · label tracking 0.05em.

### Screens

- **Home.** One seasonal feature with a real photograph and a short line, then a loose grid of recipes or plants. Use whitespace and scale, not a wall of equal cards.
- **Detail.** A recipe or plant detail: image, name, season, time, ingredients or care, then steps. Ingredients sit near the top; the method is readable in one column.
- **Create.** A planting or recipe note: what, when, where, and one photo. Keep it short and preserve drafts.
- **Profile.** A garden record: what is growing, what was harvested, and what is saved. No invented social feed.

### Components

- **Button.** Softly rounded 12-18pt, solid earthy fill, generous padding. Secondary actions are text with a rule.
- **List.** Image-forward rows with an irregular but consistent rhythm. Tags can tilt; text never does.
- **Input.** Warm paper field with a visible label and hand-friendly height. Validation in plain language.
- **Navigation.** Large title, tab bar for three peers, sheets for detail. No floating buttons.

### Principles

- Season and ingredient before brand.
- Irregularity is rhythm, not randomness.
- Warmth comes from color and material, not from shadows.
- The recipe or plant is always the hero.

### Avoid

- A generic wellness gradient over a stock photo.
- Every card rotated in a different direction.
- Serif used for long dense data.
- Fake farms, fake certifications, or invented sourcing claims.

### Platform

- **iOS.** Use a large title and a warm surface. Keep the system back gesture. Use SF Symbols with a rounded weight. Support Dynamic Type; keep body text at least 17pt. Motion should be gentle and respect reduce motion.
- **Android.** Edge-to-edge with a compact top app bar. Use Material Symbols with a rounded style. Support 200% font scale and predictive back. Keep touch targets at 48dp. Avoid hard shadows.

---

## Playground

**Thesis.** The app is a playground: shape, color, and motion carry personality, but the next action is never ambiguous.

**Best for.** Social, community, creative tools, kids, games, and hobby apps.

**Avoid for.** banking, legal, medical, trading.

**Density.** comfortable · **Surface.** color-blocks · **Shape.** chunky (8/16/24)

### Variants

| Variant | Summary | Signature | Display / body |
|---|---|---|---:|
| `toy-box` — **Toy Box** | A bright toy box: chunky blocks, primary colors, and big actions. | A sticker that peels up on tap. | 40 / 16 |
| `sticker-album` — **Sticker Album** | A scrapbook: rotated cards, tape, and handwritten labels. | A rotated photo card with a tape strip. | 34 / 15 |
| `arcade` — **Arcade** | A neon arcade: dark background, pixel accents, and high-score energy. | A scoreboard header. | 38 / 14 |

### Signature moves

- A sticker that peels up on tap.
- A rotated photo card with a tape strip.
- A scoreboard header.
- A color block that changes the mood of the screen.

### Palette

| Role | Light | Dark |
|---|---|---|
| `background` | `#FFF8E7` | `#121016` |
| `surface` | `#FFFFFF` | `#1B1821` |
| `elevated` | `#FFFFFF` | `#24202B` |
| `text` | `#1C1A17` | `#F7F2E8` |
| `muted` | `#625C52` | `#B8AFC0` |
| `border` | `#E8DCC6` | `#342E3D` |

Accents:

| Accent | Light | Dark | On light | On dark |
|---|---|---|---|---|
| `coral` — Coral | `#D9362B` | `#FF7A6B` | `#FFFFFF` | `#210604` |
| `cobalt` — Cobalt | `#1D4ED8` | `#7DA2FF` | `#FFFFFF` | `#08122A` |
| `lime` — Lime | `#4D7C0F` | `#BEF264` | `#FFFFFF` | `#111A05` |
| `violet` — Violet | `#6D28D9` | `#C4B5FD` | `#FFFFFF` | `#140A24` |

### Type

Display: SF Rounded / Roboto (rounded). Body: SF Rounded / Roboto (rounded). Numeric: SF Rounded / Roboto (rounded).

Display size 34–40 · body 14–16 · scale 1.414 · display tracking -0.02em · label tracking 0.04em.

### Screens

- **Home.** A playful composition of one large color block, a crew strip, and two or three plan cards with real times. The primary action is a chunky button or FAB, not a hidden gesture.
- **Detail.** A plan detail: who is going, when, where, what to bring, and one join/leave action. Use avatars or initials, not fake testimonial photos.
- **Create.** A quick plan composer: what, when, where, who. Keep it to one screen with large controls and a visible create state.
- **Profile.** A playful profile: avatar, crew, recent plans, and a few real stats. No invented follower counts.

### Components

- **Button.** Chunky 12-20pt radius, bold label, high contrast. Pills only for tags and filters.
- **List.** Color-block cards with 16-24pt radius and one clear action. Do not put a card inside a card.
- **Input.** Large, friendly fields with clear labels and a visible focus state.
- **Navigation.** Tab bar with three to five peers, or a FAB menu for related create actions. Do not mix both.

### Principles

- One loud shape per screen.
- Color blocks are structure, not wallpaper.
- Motion is a reaction, not a loop.
- The primary action is still obvious.

### Avoid

- Every card rotated and every button pill-shaped.
- Confetti on launch.
- A gradient behind text with no contrast check.
- Five equal tabs because the template had five.

### Platform

- **iOS.** Use SF Rounded and SF Symbols. Keep the system back gesture. Use a tab bar for peers and sheets for quick actions. Spring only on direct manipulation. Respect reduce motion.
- **Android.** Use Roboto with rounded shapes and Material Symbols. Edge-to-edge. Use a NavigationBar for three to five peers, or a FAB menu for 2-6 related create actions. Respect the system animation scale.

---

## Ritual

**Thesis.** The app is a ritual: one clear sequence, a calm pace, and visible progress without pressure.

**Best for.** Health, wellness, habits, fitness, journaling, sleep, and recovery.

**Avoid for.** trading, arcade, fast delivery, nightlife.

**Density.** spacious · **Surface.** soft-fill · **Shape.** soft (12/20/28)

### Variants

| Variant | Summary | Signature | Display / body |
|---|---|---|---:|
| `morning-pages` — **Morning Pages** | A soft morning ritual: centered prompt, warm paper, one action. | A breathing ring that fills with the day. | 34 / 17 |
| `training-log` — **Training Log** | A disciplined training log: progress bars, split times, and a clear next set. | A progress bar segmented by week. | 32 / 15 |
| `meditation-timer` — **Meditation Timer** | A dark sanctuary: a breathing circle, minimal text, and slow motion. | A slow-breathing orb. | 30 / 16 |

### Signature moves

- A breathing ring that fills with the day.
- A progress bar segmented by week.
- A slow-breathing orb.
- A single handwritten note in the margin.

### Palette

| Role | Light | Dark |
|---|---|---|
| `background` | `#FAF6F0` | `#14100E` |
| `surface` | `#FFFFFF` | `#1D1815` |
| `elevated` | `#FFFFFF` | `#27211D` |
| `text` | `#2A211B` | `#F6EEE6` |
| `muted` | `#6B5D53` | `#BCAA9C` |
| `border` | `#E3D8CC` | `#3A302A` |

Accents:

| Accent | Light | Dark | On light | On dark |
|---|---|---|---|---|
| `sage` — Sage | `#4F6B52` | `#A8C9A8` | `#FFFFFF` | `#0C150D` |
| `clay` — Clay | `#A6533A` | `#F0A088` | `#FFFFFF` | `#1E0B06` |
| `lavender` — Lavender | `#63527A` | `#C4B0E0` | `#FFFFFF` | `#120D18` |

### Type

Display: New York / Noto Serif (serif). Body: SF Pro / Roboto (sans). Numeric: SF Pro / Roboto (proportional).

Display size 30–34 · body 15–17 · scale 1.2 · display tracking -0.01em · label tracking 0.04em.

### Screens

- **Home.** A centered daily ritual: one prompt, one progress indicator, and one primary action. Secondary practices sit below a rule.
- **Detail.** A practice detail: what it is, how long, what you need, and one start action. Show the real duration.
- **Create.** A check-in or journal entry: one prompt, a generous text area, a mood control, and a save action that preserves the draft.
- **Profile.** A calm history: current streak, recent sessions, and settings. No fake social comparison.

### Components

- **Button.** Large, soft, filled with the accent; secondary actions are text or outlined. Minimum 48dp/44pt.
- **List.** Soft rows or cards with 20-28pt radius, no hard shadows. Use whitespace and a subtle tonal fill.
- **Input.** Comfortable line height, visible label, gentle validation, no aggressive red until submit.
- **Navigation.** Quiet top bar, two or three tabs, sheets for check-ins.

### Principles

- One sequence per screen.
- Progress is visible, not gamified.
- Calm does not mean low contrast.
- The next action is always obvious.

### Avoid

- A dashboard of rings and invented streaks.
- Confetti for a basic habit.
- Tiny gray text that disappears in sunlight.
- A paywall before the first useful session.

### Platform

- **iOS.** Use a large title but keep the chrome quiet. Prefer a single primary action and a tab bar for two or three peers. Use sheets for check-ins. Respect reduce motion and Dynamic Type. Haptics only on completion.
- **Android.** Edge-to-edge with a soft surface and a compact top app bar. Use a NavigationBar for two or three peers. Respect the system animation scale. Use 48dp targets and generous spacing.

---

## Spatial

**Thesis.** The app is a place: location, movement, and layers give the screen its structure.

**Best for.** Travel, maps, local discovery, real estate, delivery, and transit.

**Avoid for.** deep reading, dense finance, forms.

**Density.** comfortable · **Surface.** layered · **Shape.** organic (8/16/24)

### Variants

| Variant | Summary | Signature | Display / body |
|---|---|---|---:|
| `trail-map` — **Trail Map** | A topographic field guide: earthy layers, route lines, and elevation labels. | A route line that connects cards. | 36 / 16 |
| `city-guide` — **City Guide** | A bold city index: grid neighborhoods, oversized labels, and photo cards. | A vertical district label in the margin. | 42 / 16 |
| `studio-canvas` — **Studio Canvas** | A light canvas: floating tools, soft panels, and spatial hierarchy. | A floating command bar that follows the canvas. | 32 / 15 |

### Signature moves

- A route line that connects cards.
- A vertical district label in the margin.
- A floating command bar that follows the canvas.
- A map pin that expands into a place card.

### Palette

| Role | Light | Dark |
|---|---|---|
| `background` | `#EEF3EC` | `#0F1512` |
| `surface` | `#FFFFFF` | `#17201B` |
| `elevated` | `#FFFFFF` | `#1F2B24` |
| `text` | `#1A2420` | `#EEF5EF` |
| `muted` | `#57645D` | `#A5B5AA` |
| `border` | `#D2DDD4` | `#2C3B32` |

Accents:

| Accent | Light | Dark | On light | On dark |
|---|---|---|---|---|
| `trail` — Trail Orange | `#B24A18` | `#FF9A62` | `#FFFFFF` | `#1E0D05` |
| `lake` — Lake Blue | `#0F5E7A` | `#6BD3F2` | `#FFFFFF` | `#061A21` |
| `moss` — Moss | `#3F6B3A` | `#9DCE8F` | `#FFFFFF` | `#0A1708` |

### Type

Display: SF Pro Display / Roboto (sans). Body: SF Pro / Roboto (sans). Numeric: SF Mono / Roboto Mono (tabular).

Display size 32–42 · body 15–16 · scale 1.25 · display tracking -0.02em · label tracking 0.06em.

### Screens

- **Home.** A map or spatial canvas occupies the top two-thirds, with one floating search/control bar and a bottom sheet preview of the nearest place. The list is an annotation, not a wall of cards.
- **Detail.** A place detail: hero image or map, name, distance, one key fact, and actions (directions, save, share). Keep the back gesture and the map position.
- **Create.** A route or place creation flow: search, drop a pin, name it, add a note, save. Show the pin on a map before committing.
- **Profile.** A personal atlas: saved places, routes, and trips. Use a map or spatial index, not a generic settings list.

### Components

- **Button.** Rounded 16-24pt, but only for floating controls and primary actions. List rows stay flat.
- **List.** Place rows with a small map thumbnail or distance marker, a bold name, and one metadata line. No heavy cards.
- **Input.** Search field floats over the map with a clear action and recent searches.
- **Navigation.** Floating search, bottom sheet, tab bar or rail. Keep the system back gesture.

### Principles

- Place first; list second.
- One floating control layer, not five.
- Use real geography or real spatial hierarchy.
- Cards are annotations, not the page.

### Avoid

- A map with a generic grid of cards over it.
- A floating action button with no spatial job.
- Decorative contour lines that do not encode data.
- A list that ignores location.

### Platform

- **iOS.** Use a full-bleed map or canvas under a floating search field. Use a bottom sheet with detents for place details. Keep the system back gesture. Use SF Symbols and a tab bar for peers.
- **Android.** Edge-to-edge map or canvas with a floating search bar. Use a bottom sheet for details. Predictive back. Use a NavigationBar or rail; no FAB unless it creates a place.

---

## Utility

**Thesis.** The app is a well-made tool: immediate, legible, and respectful of the hand using it.

**Best for.** Everyday tools, weather, files, notes, scanning, home control, settings, and quick tasks.

**Avoid for.** luxury, nightlife, editorial publishing, fashion.

**Density.** comfortable · **Surface.** flat-controls · **Shape.** practical (4/10/16)

### Variants

| Variant | Summary | Signature | Display / body |
|---|---|---|---:|
| `pocket-tool` — **Pocket Tool** | A single-purpose instrument: one big result, a few large controls, and nothing else. | One oversized readout with the controls arranged around it. | 56 / 17 |
| `workbench` — **Workbench** | A tidy workbench: grouped tools, compact rows, and a visible state for everything. | A status strip that shows what is on, off, or running. | 32 / 15 |
| `field-manual` — **Field Manual** | A printed manual: numbered sections, diagrams, and hard-working typography. | Numbered section tabs in the margin. | 34 / 16 |

### Signature moves

- One oversized readout with the controls arranged around it.
- A status strip that shows what is on, off, or running.
- Numbered section tabs in the margin.
- A control that changes shape when it is active.

### Palette

| Role | Light | Dark |
|---|---|---|
| `background` | `#F1F2EF` | `#0E100F` |
| `surface` | `#FFFFFF` | `#171A18` |
| `elevated` | `#FFFFFF` | `#202421` |
| `text` | `#151714` | `#F0F3EE` |
| `muted` | `#555B55` | `#A5AEA6` |
| `border` | `#D3D7D2` | `#2C322D` |

Accents:

| Accent | Light | Dark | On light | On dark |
|---|---|---|---|---|
| `safety-orange` — Safety Orange | `#B54A00` | `#FF9A4D` | `#FFFFFF` | `#1F0D02` |
| `tool-blue` — Tool Blue | `#0B5FA5` | `#7BB8F0` | `#FFFFFF` | `#061626` |
| `graphite` — Graphite | `#2B3330` | `#CBD5CE` | `#FFFFFF` | `#0C100E` |
| `hazard-yellow` — Hazard Yellow | `#7A5A00` | `#F5D34A` | `#FFFFFF` | `#1D1503` |

### Type

Display: SF Pro Display / Roboto Condensed (sans). Body: SF Pro / Roboto (sans). Numeric: SF Mono / Roboto Mono (tabular).

Display size 32–56 · body 15–17 · scale 1.25 · display tracking -0.02em · label tracking 0.08em.

### Screens

- **Home.** One current tool with a large readout or primary control, then recent tools below. No marketing hero, no feature grid. The current state is visible without a tap.
- **Detail.** A tool's working screen: the result, the controls, and a short history. Keep the last value when leaving and returning.
- **Create.** A short input flow for a saved item or calculation: label, value, unit, save. Validate inline and keep the keyboard from covering the action.
- **Profile.** Settings and history: grouped rows, clear on/off state, units, and data export. Nothing hidden behind a puzzle.

### Components

- **Button.** Large, filled, 8-12pt radius. Icon plus label for any control that is not universally understood.
- **List.** Grouped rows with hairline separators, a clear label, a value or switch on the right. No cards for settings.
- **Input.** Value first, unit inside the field, label above. Use the system numeric keyboard. Show validation next to the field.
- **Navigation.** Compact title, one primary action in the toolbar, tab bar for two or three peers. No hamburger.

### Principles

- The result is the interface.
- Every control has one job and one label.
- Speed is a design property.
- Work offline; never lose the user's input.

### Avoid

- A home screen of nine equal feature tiles.
- An icon with no text label.
- A settings page in place of a primary action.
- Decorative illustration on a tool that must load fast.

### Platform

- **iOS.** Respect the system navigation bar and back gesture. Use large 44pt targets, SF Symbols with consistent weight, and the system keyboard where possible. Put the primary control within thumb reach. Support Dynamic Type and VoiceOver labels for every control.
- **Android.** Edge-to-edge with a compact TopAppBar. Use Material Symbols, 48dp targets, and the system number picker or keyboard. Predictive back must work. Use a NavigationBar only for peers; a single screen with a toolbar is often correct.

---

## Quick selection

| Brief signal | Family |
|---|---|
| reading, writing, news, books, essays | Editorial |
| finance, trading, metrics, monitoring, operations | Instrument |
| film, music, events, streaming, photography | Cinematic |
| maps, travel, trails, local, logistics | Spatial |
| sleep, meditation, habits, fitness, health | Ritual |
| friends, plans, social, games, kids | Playground |
| fashion, hotels, beauty, premium retail | Luxe |
| tools, weather, files, notes, quick tasks | Utility |
| government, transit, permits, public services | Civic |
| food, garden, farming, nature, slow living | Organic |

Ambiguous briefs still get a deterministic proposal. Commit to it, or force a family with
`--family <id>` and evaluate the rendered preview.

