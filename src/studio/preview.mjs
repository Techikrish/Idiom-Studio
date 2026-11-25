import { hashString } from '../util.mjs';
import { buildStyles } from './styles.mjs';
import { escapeHtml, renderScreens } from './screens.mjs';

function paletteRow(tokens, mode) {
  const c = tokens.color[mode];
  const keys = [
    ['bg', c.background],
    ['surface', c.surface],
    ['text', c.text],
    ['accent', c.accent],
    ['muted', c.muted],
    ['border', c.border],
  ];
  return `<div class="palette-row">
    <div class="side-label"><span>${mode}</span><em>${mode === 'light' ? 'primary' : 'adapted'}</em></div>
    <div class="palette-strip">
      ${keys
        .map(([name, value]) => `<div class="palette-chip" title="${name} ${value}"><i style="background:${value}"></i><span>${name}</span></div>`)
        .join('')}
    </div>
  </div>`;
}

function contrastCells(tokens) {
  const light = tokens.contrast.light;
  const dark = tokens.contrast.dark;
  const cells = [
    ['Text / light', light.text.ratio],
    ['Muted / light', light.muted.ratio],
    ['Text / dark', dark.text.ratio],
    ['Muted / dark', dark.muted.ratio],
    ['Accent / light', light.accentOnSurface.ratio],
    ['Accent / dark', dark.accentOnSurface.ratio],
  ];
  return cells
    .map(([label, ratio]) => `<div class="contrast-cell"><span>${label}</span><strong>${ratio}</strong><em>PASS</em></div>`)
    .join('');
}

function typeRows(tokens) {
  const t = tokens.type;
  return [
    ['Display', t.sizes.display, t.displayFamily.split(' / ')[0]],
    ['Title', t.sizes.title, t.displayFamily.split(' / ')[0]],
    ['Body', t.sizes.body, t.bodyFamily.split(' / ')[0]],
    ['Label', t.sizes.label, t.bodyFamily.split(' / ')[0]],
  ]
    .map(([label, size, face]) => `<div><span>${label}</span><em>${size} / ${escapeHtml(face)}</em></div>`)
    .join('');
}

export function renderPreview(selection, tokens, design) {
  const { family, variant, accent, mode } = selection;
  const screens = renderScreens(selection, tokens);
  const accentColor = tokens.color[mode].accent;
  const onAccent = tokens.color[mode].onAccent;
  const appName = escapeHtml(tokens.appName);
  const signals = selection.signals.length ? selection.signals.slice(0, 4).join(' · ') : 'no category signal · proposal';
  const sideFacts = [
    ['Family', family.name],
    ['Variant', variant.name],
    ['Accent', accent.name],
    ['Mode', mode],
    ['Density', family.density],
    ['Confidence', selection.confidence],
  ]
    .map(([key, value]) => `<div class="hero-fact"><span>${key}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join('');

  return `<!doctype html>
<html lang="en" data-mode="${mode}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${appName} · ${escapeHtml(family.name)} / ${escapeHtml(variant.name)}</title>
<style>${buildStyles(tokens)}</style>
</head>
<body>
<header class="studio-top">
  <div class="studio-brand"><span class="studio-mark">I</span> Idiom Studio</div>
  <nav class="studio-nav"><span>Design board</span><span>Screens</span><span>Tokens</span><span>Handoff</span></nav>
  <div class="studio-tools">
    <div class="mode-switch" role="group" aria-label="Preview mode">
      <button type="button" data-set-mode="light" class="${mode === 'light' ? 'active' : ''}">Light</button>
      <button type="button" data-set-mode="dark" class="${mode === 'dark' ? 'active' : ''}">Dark</button>
    </div>
    <span class="studio-index">IDM—${String(hashString(`${family.id}:${variant.id}:${accent.id}`) % 999).padStart(3, '0')}</span>
  </div>
</header>

<section class="studio-hero">
  <div>
    <div class="hero-kicker"><i></i> ${escapeHtml(family.name)} / ${escapeHtml(variant.name)} · ${escapeHtml(accent.name)} · ${mode} mode</div>
    <h1>${appName} <span>${escapeHtml(variant.name.toLowerCase())}</span></h1>
    <p class="hero-thesis">${escapeHtml(family.thesis)} ${escapeHtml(variant.summary)}</p>
    <div class="hero-tags">
      <span class="hero-tag accent" style="background:${accentColor};color:${onAccent}">${escapeHtml(accent.name)}</span>
      <span class="hero-tag">${escapeHtml(family.density)} density</span>
      <span class="hero-tag">${escapeHtml(variant.signature)}</span>
      <span class="hero-tag">iOS + Android</span>
    </div>
  </div>
  <aside class="hero-side">
    <div class="side-label"><span>Direction file</span><em>${selection.confidence}</em></div>
    ${sideFacts}
    <div class="hero-fact"><span>Signals</span><strong style="max-width:170px">${escapeHtml(signals)}</strong></div>
  </aside>
</section>

<main class="board">
  <figure class="device-col">
    <div class="phone">
      <div class="island"></div>
      <div class="phone-screen">${screens.home}</div>
    </div>
    <figcaption class="device-meta"><strong>Home</strong><span>${escapeHtml(variant.signature)}</span></figcaption>
  </figure>
  <figure class="device-col">
    <div class="phone">
      <div class="island"></div>
      <div class="phone-screen">${screens.detail}</div>
    </div>
    <figcaption class="device-meta"><strong>Detail</strong><span>${escapeHtml(family.name)} grammar</span></figcaption>
  </figure>

  <aside class="side">
    <section class="side-panel">
      <div class="side-label"><span>Palette</span><em>AA checked</em></div>
      ${paletteRow(tokens, 'light')}
      ${paletteRow(tokens, 'dark')}
      <p class="side-note">Both modes are first-class. The accent carries the primary action; color never carries state alone.</p>
    </section>

    <section class="side-panel">
      <div class="side-label"><span>Type</span><em>${escapeHtml(tokens.type.displayFamily)}</em></div>
      <div class="type-specimen">
        <span class="aa">Aa</span>
        <div class="type-copy">
          <strong>${escapeHtml(tokens.type.displayFamily)}</strong>
          <span>${escapeHtml(tokens.type.bodyFamily)} · ${tokens.type.numeric === 'tabular' ? 'tabular figures' : 'proportional figures'}</span>
        </div>
      </div>
      <div class="type-scale">${typeRows(tokens)}</div>
      <div class="side-foot">
        <span>${tokens.type.sizes.display}pt display</span>
        <span>${tokens.type.sizes.body}pt body</span>
        <span>${tokens.type.tracking.label > 0 ? '+' : ''}${Number(tokens.type.tracking.label).toFixed(2)}em labels</span>
      </div>
    </section>

    <section class="side-panel">
      <div class="side-label"><span>Signature moves</span><em>01—0${Math.min(3, design.signatureMoves.length)}</em></div>
      <ul class="signature-list">
        ${design.signatureMoves
          .slice(0, 3)
          .map((move, index) => `<li><span>0${index + 1}</span><div>${escapeHtml(move)}</div></li>`)
          .join('')}
      </ul>
      <p class="side-note">${escapeHtml(design.principles[0] ?? '')}</p>
    </section>

    <section class="side-panel">
      <div class="side-label"><span>Contrast</span><em>WCAG AA</em></div>
      <div class="contrast-grid">${contrastCells(tokens)}</div>
      <p class="side-note">40/44/48 target sizes · ${tokens.layout.margin}pt margins · ${tokens.radius.small}/${tokens.radius.medium}/${tokens.radius.large} radii · ${tokens.motion.fast}–${tokens.motion.slow}ms motion.</p>
    </section>
  </aside>
</main>

<section class="studio-notes">
  <article class="note-card"><span>01 · HOME</span><h3>Composition</h3><p>${escapeHtml(design.screens.home)}</p></article>
  <article class="note-card"><span>02 · DETAIL</span><h3>Focus</h3><p>${escapeHtml(design.screens.detail)}</p></article>
  <article class="note-card"><span>03 · CREATE</span><h3>Flow</h3><p>${escapeHtml(design.screens.compose)}</p></article>
  <article class="note-card"><span>04 · PLATFORM</span><h3>Native grammar</h3><p>${escapeHtml(design.platform.ios)}</p></article>
</section>

<footer class="studio-footer">
  <span>Idiom Studio · ${escapeHtml(family.name)} / ${escapeHtml(variant.name)} · ${escapeHtml(accent.name)}</span>
  <span>${escapeHtml(tokens.appName)} · native iOS + Android · generated from one brief</span>
</footer>

<script>
(() => {
  const buttons = [...document.querySelectorAll('[data-set-mode]')];
  const setMode = (mode) => {
    document.documentElement.dataset.mode = mode;
    buttons.forEach((button) => button.classList.toggle('active', button.dataset.setMode === mode));
  };
  buttons.forEach((button) => button.addEventListener('click', () => setMode(button.dataset.setMode)));
  if (location.hash === '#dark') setMode('dark');
  if (location.hash === '#light') setMode('light');
})();
</script>
</body>
</html>
`;
}
