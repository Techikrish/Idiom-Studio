import { contrastRatio } from '../util.mjs';

export function buildDesign(selection, tokens, options = {}) {
  const appName = tokens.appName;
  return {
    app: {
      name: appName,
      slug: tokens.slug,
      brief: selection.brief,
    },
    direction: {
      family: selection.family.id,
      familyName: selection.family.name,
      variant: selection.variant.id,
      variantName: selection.variant.name,
      accent: selection.accent.id,
      accentName: selection.accent.name,
      mode: selection.mode,
      seed: selection.seed,
      confidence: selection.confidence,
    },
    thesis: selection.family.thesis,
    summary: selection.variant.summary,
    signature: selection.variant.signature,
    treatment: selection.variant.treatment,
    why: {
      signals: selection.signals,
      tones: selection.tones,
      alternatives: selection.alternatives,
      note: signalsNote(selection),
    },
    palette: {
      light: tokens.color.light,
      dark: tokens.color.dark,
      contrast: tokens.contrast,
    },
    type: tokens.type,
    space: tokens.space,
    radius: tokens.radius,
    motion: tokens.motion,
    layout: tokens.layout,
    surface: tokens.surface,
    shapeFamily: tokens.shapeFamily,
    principles: selection.family.principles,
    avoid: selection.family.avoid,
    signatureMoves: selection.family.signatureMoves,
    platform: selection.family.platform,
    screens: selection.family.screens,
    components: selection.family.components,
    content: selection.family.content,
    variants: selection.family.variants.map((variant) => ({
      id: variant.id,
      name: variant.name,
      summary: variant.summary,
      signature: variant.signature,
    })),
    files: options.files ?? {},
  };
}

function signalsNote(selection) {
  if (selection.confidence === 'high') {
    return `The brief strongly matches ${selection.family.name}. The layout, type, and surface decisions come from that family rather than from a generic template.`;
  }
  if (selection.confidence === 'medium') {
    return `The brief leans toward ${selection.family.name}. Treat this as a decisive proposal; if it misses, run the same brief with another direction instead of mixing two.`;
  }
  return `The brief has no strong category signal, so the direction is a deliberate proposal. Commit to it fully; do not average it with the default template.`;
}

function typeTable(type) {
  const rows = [
    ['Display', type.sizes.display, type.displayFamily, type.tracking.display],
    ['Title', type.sizes.title, type.displayFamily, type.tracking.display],
    ['Headline', type.sizes.headline, type.displayFamily, 0],
    ['Body', type.sizes.body, type.bodyFamily, 0],
    ['Label', type.sizes.label, type.bodyFamily, type.tracking.label],
    ['Caption', type.sizes.caption, type.bodyFamily, 0],
  ];
  return [
    '| Role | Size | Face | Tracking |',
    '|---|---:|---|---:|',
    ...rows.map(([role, size, face, tracking]) => `| ${role} | ${size}pt/sp | ${face} | ${formatTracking(tracking)} |`),
  ].join('\n');
}

function formatTracking(value) {
  if (!value) return '0';
  return `${value > 0 ? '+' : ''}${Number(value).toFixed(3)}em`;
}

function paletteTable(tokens) {
  const keys = ['background', 'surface', 'elevated', 'text', 'muted', 'border', 'accent', 'onAccent', 'success', 'warning', 'danger'];
  return [
    '| Token | Light | Dark |',
    '|---|---|---|',
    ...keys.map((key) => `| \`${key}\` | \`${tokens.color.light[key]}\` | \`${tokens.color.dark[key]}\` |`),
  ].join('\n');
}

function contrastLine(tokens) {
  const light = tokens.contrast.light;
  const dark = tokens.contrast.dark;
  return `Light: text ${light.text.ratio}, muted ${light.muted.ratio}, accent on surface ${light.accentOnSurface.ratio}, on-accent ${light.onAccent.ratio}. Dark: text ${dark.text.ratio}, muted ${dark.muted.ratio}, accent on surface ${dark.accentOnSurface.ratio}, on-accent ${dark.onAccent.ratio}. All pass WCAG AA for their role.`;
}

export function emitMarkdown(design, tokens) {
  const d = design.direction;
  const app = design.app;
  const variantList = design.variants
    .map((variant) => `- **${variant.name}** — ${variant.summary}`)
    .join('\n');
  const alternatives = design.why.alternatives.length
    ? design.why.alternatives.map((entry) => `${entry.name} (${entry.score})`).join(', ')
    : 'None close; the brief has a clear category.';
  const signals = design.why.signals.length ? design.why.signals.join(', ') : 'no explicit category words; directional proposal';
  const tones = design.why.tones.length ? design.why.tones.join(', ') : 'neutral';
  const fileList = Object.entries(design.files)
    .map(([label, value]) => `- ${label}: \`${value}\``)
    .join('\n');

  return `# ${app.name}

> ${app.brief}

## Direction

**${d.familyName} / ${d.variantName}** · ${d.accentName} · ${d.mode} mode · ${d.confidence} confidence

${design.thesis}

${design.summary}

**Signature move:** ${design.signature}

### Why this direction

- Matched signals: ${signals}
- Tone: ${tones}
- Alternative directions: ${alternatives}
- ${design.why.note}

### The direction in one sentence

${design.treatment}

## Principles

${design.principles.map((item) => `- ${item}`).join('\n')}

## Signature moves

${design.signatureMoves.map((item) => `- ${item}`).join('\n')}

## Avoid

${design.avoid.map((item) => `- ${item}`).join('\n')}

## Screens

### Home
${design.screens.home}

### Detail
${design.screens.detail}

### Create / compose
${design.screens.compose}

### Profile / settings
${design.screens.profile}

## Platform grammar

### iOS
${design.platform.ios}

### Android
${design.platform.android}

## Type

${typeTable(design.type)}

Display: \`${design.type.displayFamily}\`. Body: \`${design.type.bodyFamily}\`. Numeric: \`${design.type.numericFamily}\`${design.type.numeric === 'tabular' ? ', tabular figures' : ''}.

## Color

${paletteTable(tokens)}

${contrastLine(tokens)}

Use the accent for the primary action and one signature detail. Color must never be the only carrier of state: pair it with text, an icon, or a shape.

## Space, shape, motion

- Spacing scale: ${design.space.map((value) => `${value}`).join(' / ')} pt or dp.
- Screen margin: ${design.layout.margin}pt/dp; gutter: ${design.layout.gutter}pt/dp.
- Minimum target: ${design.layout.minTarget.ios}pt iOS, ${design.layout.minTarget.android}dp Android.
- Radius: small ${design.radius.small}, medium ${design.radius.medium}, large ${design.radius.large}.
- Motion: ${design.motion.curve}, ${design.motion.fast}ms fast / ${design.motion.base}ms base / ${design.motion.slow}ms slow.
- Surface model: ${design.surface}.

## Components

- **Button:** ${design.components.button}
- **List:** ${design.components.list}
- **Input:** ${design.components.input}
- **Navigation:** ${design.components.navigation}

## Other variants in this family

${variantList}

## Agent brief

Copy this into the coding agent before it writes UI:

\`\`\`text
Build a native mobile app called ${app.name}.

Direction: ${d.familyName} / ${d.variantName}, ${d.accentName} accent, ${d.mode}-first with full light and dark support.

Thesis: ${design.thesis}
Treatment: ${design.treatment}
Signature: ${design.signature}

Use the supplied tokens exactly:
- Display face: ${design.type.displayFamily}; body: ${design.type.bodyFamily}; numeric: ${design.type.numericFamily}.
- Background ${tokens.color.light.background} / ${tokens.color.dark.background}; surface ${tokens.color.light.surface} / ${tokens.color.dark.surface}; text ${tokens.color.light.text} / ${tokens.color.dark.text}; accent ${tokens.color.light.accent} / ${tokens.color.dark.accent}.
- ${design.layout.margin}pt/dp screen margins, ${design.layout.gutter}pt/dp gutters, ${design.layout.minTarget.ios}pt iOS and ${design.layout.minTarget.android}dp Android minimum targets.
- Radius: ${design.radius.small}/${design.radius.medium}/${design.radius.large}. Motion: ${design.motion.fast}-${design.motion.slow}ms, ${design.motion.curve}.

Screen rules:
- Home: ${design.screens.home}
- Detail: ${design.screens.detail}
- Create: ${design.screens.compose}
- Profile: ${design.screens.profile}

iOS: ${design.platform.ios}
Android: ${design.platform.android}

Use real sample content from the design file. Build all states: loading, empty, error, offline, permission, and a long-content case. Keep the system back gesture, safe areas, and keyboard insets. Support Dynamic Type / 200% font scale, VoiceOver / TalkBack, and reduce motion. Never use color as the only signal.

Avoid: ${design.avoid.join('; ')}.
\`\`\`

## Files

${fileList || '- No files listed.'}
`;
}

export { contrastRatio };
