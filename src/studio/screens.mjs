import { hashString, mulberry32 } from '../util.mjs';

export function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const ICONS = {
  back: '<path d="M15 4.5 7.5 12l7.5 7.5"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 4.5 4.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  filter: '<path d="M4 7h16M7 12h10M10 17h4"/>',
  bookmark: '<path d="M7 4.5h10v15l-5-3.5-5 3.5z"/>',
  bag: '<path d="M5.5 8.5h13l-1 11h-11z"/><path d="M9 8.5a3 3 0 0 1 6 0"/>',
  help: '<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1.1 1-1.1 1.8"/><circle cx="12" cy="17" r=".7" fill="currentColor" stroke="none"/>',
  history: '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4.5 5.5V10H9"/><path d="M12 8v4.5l3 1.8"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/>',
  pin: '<path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z"/><circle cx="12" cy="11" r="2.2"/>',
  compass: '<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  share: '<circle cx="17" cy="6" r="2.2"/><circle cx="7" cy="12" r="2.2"/><circle cx="17" cy="18" r="2.2"/><path d="m9 11 6-3.5M9 13l6 3.5"/>',
  more: '<circle cx="6" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1" fill="currentColor" stroke="none"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>',
  heart: '<path d="M12 20s-7-4.5-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.5 12 20 12 20z"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  play: '<path d="M8 5.5v13l10-6.5z"/>',
  leaf: '<path d="M19 5c-8 0-13 4-13 9.5A4.5 4.5 0 0 0 10.5 19C16 19 19 13 19 5z"/><path d="M5 20c2-4 5-7 10-9"/>',
  flame: '<path d="M12 3s5 4.2 5 9a5 5 0 0 1-10 0c0-2.4 1.5-4.2 2.5-5.2C10.5 8 12 6 12 3z"/>',
  wagon: '<path d="M4 8h16l-1.5 8.5h-13z"/><circle cx="8" cy="19" r="1.5"/><circle cx="16" cy="19" r="1.5"/>',
  list: '<path d="M5 7h14M5 12h14M5 17h9"/>',
  tomato: '<circle cx="12" cy="14" r="6.2"/><path d="M12 7.8c-1.8 0-2.8-1.4-2.8-3 1.7 0 2.8.9 2.8 3zm0 0c1.8 0 2.8-1.4 2.8-3-1.7 0-2.8.9-2.8 3z"/><path d="M12 7.8V5"/>',
};

export function icon(name, size = 18, cls = '') {
  const body = ICONS[name] ?? ICONS.arrow;
  return `<svg class="ic ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

export function statusBar(tone = '') {
  return `<div class="statusbar ${tone}">
    <span class="sb-time">9:41</span>
    <span class="sb-icons">
      <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden="true"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M1 3.8a9.5 9.5 0 0 1 13 0M3.4 6.4a6 6 0 0 1 8.2 0M5.8 9a2.6 2.6 0 0 1 3.4 0"/></svg>
      <svg width="24" height="11" viewBox="0 0 24 11" fill="none" stroke="currentColor" aria-hidden="true"><rect x=".8" y=".8" width="20" height="9.4" rx="2.6" stroke-width="1.2"/><rect x="2.5" y="2.5" width="15" height="6" rx="1.2" fill="currentColor" stroke="none"/><path d="M22.5 4v3" stroke-width="1.6" stroke-linecap="round"/></svg>
    </span>
  </div>`;
}

const TAB_ICONS = ['home', 'list', 'user', 'search', 'bookmark'];

export function tabBar(labels, active = 0) {
  return `<nav class="tabbar">${labels
    .map((label, index) => {
      const glyph = ['home', 'list', 'user'][index % 3];
      const body = {
        home: '<path d="m4 10 8-6 8 6v10H4z"/><path d="M9 20v-6h6v6"/>',
        list: '<path d="M5 7h14M5 12h14M5 17h9"/>',
        user: '<circle cx="12" cy="8" r="3.2"/><path d="M5.5 20c.7-4 3-6 6.5-6s5.8 2 6.5 6"/>',
      }[glyph];
      return `<div class="tab ${index === active ? 'active' : ''}">
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>
        <span>${escapeHtml(label)}</span>
      </div>`;
    })
    .join('')}</nav>`;
}

export function avatar(name, index = 0) {
  const initials = String(name)
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return `<span class="avatar a${(index % 4) + 1}">${escapeHtml(initials)}</span>`;
}

export function avatarStack(count = 4) {
  const names = ['Mara Chen', 'Sam Okafor', 'Ines Ruiz', 'Theo Park', 'Nia Bell'];
  return `<span class="avatar-stack">${Array.from({ length: count }, (_, index) => avatar(names[index % names.length], index)).join('')}</span>`;
}

export function art(kind, extra = '') {
  return `<div class="art art-${kind} ${extra}"><span class="art-grain"></span></div>`;
}

export function lineChart(seed, height = 96) {
  const random = mulberry32(hashString(seed));
  const width = 320;
  const points = [];
  let value = 0.42 + random() * 0.12;
  for (let index = 0; index < 26; index += 1) {
    value += (random() - 0.42) * 0.09;
    value = Math.max(0.12, Math.min(0.92, value));
    points.push(value);
  }
  const step = width / (points.length - 1);
  const coords = points.map((point, index) => [index * step, height - 8 - point * (height - 20)]);
  const line = coords.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const area = `${line} L${width} ${height} L0 ${height} Z`;
  const grid = [0.25, 0.5, 0.75]
    .map((ratio) => `<line x1="0" y1="${(height * ratio).toFixed(1)}" x2="${width}" y2="${(height * ratio).toFixed(1)}" />`)
    .join('');
  const last = coords[coords.length - 1];
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="Trend line">
    <g class="chart-grid">${grid}</g>
    <path class="chart-area" d="${area}"/>
    <path class="chart-line" d="${line}"/>
    <circle class="chart-dot" cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="3.4"/>
  </svg>`;
}

function mapSvg() {
  return `<svg class="map-svg" viewBox="0 0 366 520" preserveAspectRatio="none" aria-hidden="true">
    <g class="contours">
      <path d="M-20 440C70 390 88 322 168 318s132 58 226 20"/>
      <path d="M-20 480C78 422 100 350 184 348s138 54 218 22"/>
      <path d="M-10 120C58 90 118 142 166 118s116-72 216-38"/>
      <path d="M-10 88C62 58 120 108 172 84s112-68 210-36"/>
      <path d="M34 260c42-30 76-22 108 2s66 24 104-4"/>
      <path d="M18 292c46-32 82-22 116 4s70 24 112-8"/>
    </g>
    <g class="roads">
      <path class="road major" d="M-20 214C60 202 108 224 168 250s134 36 218 10"/>
      <path class="road" d="M72 -20C86 80 72 190 104 288s46 170 34 252"/>
      <path class="road" d="M252 -20c-18 92-4 190 22 278s18 168 2 262"/>
      <path class="road" d="M-20 344c88-26 158 18 222 12s118-30 184-12"/>
      <path class="road" d="M-20 78c92 12 148-18 208 2s124 10 178-8"/>
    </g>
    <g class="waters">
      <path d="M-10 428c58-34 116-26 156 4s98 24 238-18"/>
    </g>
    <g class="blocks">
      <rect x="34" y="146" width="38" height="26" rx="3"/>
      <rect x="86" y="122" width="46" height="34" rx="3"/>
      <rect x="136" y="162" width="34" height="24" rx="3"/>
      <rect x="206" y="112" width="40" height="30" rx="3"/>
      <rect x="264" y="152" width="46" height="28" rx="3"/>
      <rect x="120" y="296" width="42" height="30" rx="3"/>
      <rect x="188" y="308" width="38" height="24" rx="3"/>
      <rect x="284" y="286" width="40" height="32" rx="3"/>
    </g>
  </svg>`;
}

function progressRing(percent, inner) {
  return `<div class="ring" style="--pct:${percent}"><div class="ring-inner">${inner}</div></div>`;
}

const COPY = {
  editorial:
    'The systems we stop noticing are usually the ones doing the most work. A ferry timetable, a library catalogue, a receipt folded into a coat pocket: each is a small promise that the day will hold together.',
  editorialQuote:
    '“Infrastructure is the shape of a promise we make to strangers.”',
  cinematic:
    'A father and daughter return to a resort that no longer remembers them. Sun, chlorine, and the small distances that open between people over twenty years.',
  spatial:
    'A ridgeline route with three clear viewpoints and one honest climb. The path is exposed at the top, so start early and carry water. The return leg follows the creek.',
  ritual:
    'Start with the breath, then move slowly through the shoulders and hips. There is no target and nothing to catch up on. Stop when the body asks you to.',
  playground:
    'Meet at the east gate at eight. Bring a notebook, a jacket, and something to trade. We will draw until the market closes, then find noodles.',
  luxe:
    'Cut from washed European linen and finished with a single seam. The shirt softens with wear and is meant to be kept, not replaced.',
  utility:
    'Hold the phone against the surface and keep it still for a moment. The reading settles when the bubble is centred.',
  civic:
    'Renew your annual permit online. You will need the property address, the permit number, and a current email address. Most renewals take about ten minutes.',
  organic:
    'Ripe tomatoes, torn sourdough, and more olive oil than feels reasonable. The heat does the work; the bread only needs to be charred at the edges.',
};

function itemsOf(family) {
  return family.content.items ?? [];
}

function headlineItem(item, index) {
  return `<article class="row-card">
    <div class="row-index">${String(index + 1).padStart(2, '0')}</div>
    <div class="row-copy">
      <div class="row-meta">${escapeHtml(item.meta)}</div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
    </div>
  </article>`;
}

/* ------------------------------- Editorial ------------------------------- */

function editorialHome(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  const nav = c.nav ?? ['Today', 'Archive', 'Saved'];
  return `<div class="screen ed variant-${variant.id}">
    ${statusBar()}
    <header class="ed-head">
      <div class="ed-brand">${escapeHtml(tokens.appName)}</div>
      <div class="ed-edition">TUE · 26 OCT</div>
    </header>
    <div class="ed-rule"></div>
    <main class="screen-main ed-main">
      <div class="ed-kicker">${escapeHtml(c.eyebrow)}</div>
      <h2 class="ed-title">${escapeHtml(c.title)}</h2>
      <p class="ed-sub">${escapeHtml(c.subtitle)}</p>
      <div class="ed-art">${art('editorial')}<span class="ed-caption">ILLUSTRATION · N. HAYES</span></div>
      <div class="ed-byline"><span>By Mara Chen</span><span>8 min read</span></div>
      <div class="ed-list">
        ${itemsOf(family)
          .slice(0, 2)
          .map((item, index) => `<article class="ed-item">
            <span class="ed-num">${String(index + 1).padStart(2, '0')}</span>
            <div>
              <div class="ed-meta">${escapeHtml(item.meta)}</div>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.body)}</p>
            </div>
          </article>`)
          .join('')}
      </div>
      <button class="ed-more">${escapeHtml(c.action)} ${icon('arrow', 16)}</button>
    </main>
    ${tabBar(nav)}
  </div>`;
}

function editorialDetail(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  const related = itemsOf(family).slice(0, 2);
  return `<div class="screen ed ed-detail variant-${variant.id}">
    ${statusBar()}
    <header class="ed-detail-head">
      <button class="icon-btn" aria-label="Back">${icon('back')}</button>
      <span class="ed-detail-brand">${escapeHtml(tokens.appName)}</span>
      <button class="icon-btn" aria-label="Save">${icon('bookmark')}</button>
    </header>
    <main class="screen-main ed-detail-main">
      <div class="ed-kicker">${escapeHtml(c.eyebrow)}</div>
      <h2 class="ed-detail-title">${escapeHtml(c.title)}</h2>
      <div class="ed-detail-meta"><span>Mara Chen</span><span>26 Oct 2026</span><span>8 min</span></div>
      <div class="ed-detail-art">${art('editorial')}</div>
      <p class="ed-opener">${escapeHtml(COPY.editorial)}</p>
      <p>${escapeHtml(c.subtitle)} ${escapeHtml(c.items[0]?.body ?? '')}</p>
      <blockquote>${escapeHtml(COPY.editorialQuote)}</blockquote>
      <div class="ed-related-label">Related</div>
      ${related
        .map((item) => `<div class="ed-related"><span>${escapeHtml(item.meta)}</span><strong>${escapeHtml(item.title)}</strong></div>`)
        .join('')}
    </main>
    <div class="ed-reading-bar">
      <span>${icon('bookmark', 17)} Save</span>
      <span>${icon('share', 17)} Share</span>
      <span class="ed-progress"><i></i></span>
    </div>
  </div>`;
}

/* ------------------------------- Instrument ------------------------------ */

function instrumentHome(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  const nav = c.nav ?? ['Overview', 'Activity', 'Plan'];
  const items = itemsOf(family);
  return `<div class="screen inst variant-${variant.id}">
    ${statusBar()}
    <header class="inst-head">
      <div class="inst-brand">${escapeHtml(tokens.appName)}</div>
      <div class="inst-head-actions">
        <span class="live-dot"></span><span class="inst-live">LIVE</span>
        ${icon('filter', 18)}
      </div>
    </header>
    <main class="screen-main inst-main">
      <div class="inst-label">${escapeHtml(c.eyebrow)}</div>
      <div class="inst-total">${escapeHtml(c.title)}</div>
      <div class="inst-value">${escapeHtml(c.subtitle.split('·')[0].trim())}</div>
      <div class="inst-delta"><span class="up">▲ 1.8%</span><span>+$2,284.10 today</span></div>
      ${lineChart(tokens.seed, 104)}
      <div class="inst-rail">
        <span class="segment on"></span><span class="segment"></span><span class="segment warn"></span>
      </div>
      <div class="inst-rail-labels"><span>EQUITY 74%</span><span>CASH 21%</span><span>PENDING 5%</span></div>
      <div class="inst-section"><span>Positions</span><span>All ${icon('chevron', 14)}</span></div>
      <div class="inst-rows">
        ${items
          .map((item) => {
            const [left, right] = String(item.meta).split('·');
            return `<div class="inst-row">
              <span class="inst-mark">${escapeHtml(item.title.slice(0, 1))}</span>
              <div class="inst-row-copy"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.body)}</span></div>
              <div class="inst-row-value"><strong>${escapeHtml(right?.trim() ?? left.trim())}</strong><span>${escapeHtml(left.trim())}</span></div>
            </div>`;
          })
          .join('')}
      </div>
      <div class="inst-section"><span>Activity</span><span>This week</span></div>
      <div class="inst-activity">
        <div><span>Dividend · VTI</span><em>+$182.40</em></div>
        <div><span>Deposit · Checking</span><em>+$1,200.00</em></div>
        <div><span>Rent · Scheduled</span><em>−$1,850.00</em></div>
      </div>
    </main>
    ${tabBar(nav)}
  </div>`;
}

function instrumentDetail(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  return `<div class="screen inst inst-detail variant-${variant.id}">
    ${statusBar()}
    <header class="inst-detail-head">
      <button class="icon-btn" aria-label="Back">${icon('back')}</button>
      <span class="inst-label">POSITION</span>
      <button class="icon-btn" aria-label="More">${icon('more')}</button>
    </header>
    <main class="screen-main inst-detail-main">
      <div class="inst-detail-name">${escapeHtml(c.items[0]?.title ?? 'Vanguard Total Market')}</div>
      <div class="inst-detail-value">$84,210.40</div>
      <div class="inst-delta"><span class="up">▲ 1.2%</span><span class="inst-mono">+$998.20 today</span></div>
      ${lineChart(`${tokens.seed}:detail`, 132)}
      <div class="inst-stats">
        <div><span>Shares</span><strong>412.884</strong></div>
        <div><span>Cost basis</span><strong>$61,240.10</strong></div>
        <div><span>Day range</span><strong class="inst-mono">$201.10–$204.88</strong></div>
        <div><span>Weight</span><strong>65.6%</strong></div>
      </div>
      <div class="inst-note"><span class="inst-note-mark">i</span><p>${escapeHtml(c.items[0]?.body ?? 'Core index position')}. Prices settle at market close.</p></div>
      <div class="inst-section"><span>Recent orders</span><span>All ${icon('chevron', 14)}</span></div>
      <div class="inst-activity">
        <div><span>Buy · 12 Oct · 4.212 sh</span><em>$842.10</em></div>
        <div><span>Buy · 02 Oct · 5.000 sh</span><em>$1,000.00</em></div>
        <div><span>Dividend · 28 Sep</span><em>+$182.40</em></div>
      </div>
    </main>
    <div class="inst-actions">
      <button class="btn ghost">Sell</button>
      <button class="btn primary">Buy</button>
    </div>
  </div>`;
}

/* -------------------------------- Cinematic ------------------------------ */

function cinematicHome(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  const nav = c.nav ?? ['Tonight', 'Calendar', 'Saved'];
  const items = itemsOf(family);
  const titleParts = String(c.title).split(' ');
  const first = titleParts[0] ?? c.title;
  const rest = titleParts.slice(1).join(' ');
  return `<div class="screen cine variant-${variant.id}">
    <div class="cine-hero art art-cinematic">
      <span class="art-grain"></span>
      ${statusBar('on-art')}
      <div class="cine-top">
        <span class="cine-brand">${escapeHtml(tokens.appName)}</span>
        <button class="icon-btn on-art" aria-label="Menu">${icon('menu')}</button>
      </div>
      <div class="cine-copy">
        <div class="cine-kicker">${escapeHtml(c.eyebrow)}</div>
        <h2 class="cine-title">${escapeHtml(first)}${rest ? `<em>${escapeHtml(rest)}</em>` : ''}</h2>
        <p>${escapeHtml(c.subtitle)}</p>
      </div>
    </div>
    <main class="screen-main cine-main">
      <button class="btn primary cine-cta">${escapeHtml(c.action)} ${icon('arrow', 16)}</button>
      <div class="cine-section"><span>Also tonight</span><span>See all</span></div>
      <div class="cine-cards">
        ${items
          .map((item, index) => `<article class="cine-card">
            ${art('cinematic', `tone-${index + 1}`)}
            <div class="cine-card-copy"><span>${escapeHtml(item.meta)}</span><strong>${escapeHtml(item.title)}</strong></div>
          </article>`)
          .join('')}
      </div>
    </main>
    ${tabBar(nav)}
  </div>`;
}

function cinematicDetail(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  return `<div class="screen cine cine-detail variant-${variant.id}">
    <div class="cine-detail-hero art art-cinematic">
      <span class="art-grain"></span>
      ${statusBar('on-art')}
      <div class="cine-top">
        <button class="icon-btn on-art" aria-label="Back">${icon('back')}</button>
        <button class="icon-btn on-art" aria-label="Save">${icon('bookmark')}</button>
      </div>
      <div class="cine-detail-caption"><span>${escapeHtml(c.eyebrow)}</span><span>102 MIN</span></div>
    </div>
    <main class="screen-main cine-detail-main">
      <h2>${escapeHtml(c.title)}</h2>
      <div class="cine-meta">${escapeHtml(c.subtitle)}</div>
      <p>${escapeHtml(COPY.cinematic)}</p>
      <div class="cine-times">
        <span class="chip active">20:30</span><span class="chip">21:15</span><span class="chip">22:00</span>
      </div>
      <div class="cine-meta-row"><span>${icon('pin', 15)} Screen 2</span><span>${icon('clock', 15)} 102 min</span></div>
    </main>
    <div class="cine-detail-action"><button class="btn primary">${escapeHtml(c.action)}</button><span class="cine-price">$14.50</span></div>
  </div>`;
}

/* --------------------------------- Spatial ------------------------------- */

function spatialHome(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  const nav = c.nav ?? ['Explore', 'Routes', 'Saved'];
  const items = itemsOf(family);
  return `<div class="screen sp variant-${variant.id}">
    <div class="sp-canvas">
      ${mapSvg()}
      ${statusBar('on-art')}
      <div class="sp-top">
        <div class="sp-search">${icon('search', 17)} <span>Search trails, places</span></div>
        ${avatar('Nia Bell', 2)}
      </div>
      <div class="sp-chips"><span class="chip active">All</span><span class="chip">Trails</span><span class="chip">Water</span><span class="chip">Lookouts</span></div>
      <div class="sp-pin p1"><span class="sp-pin-dot"></span><span class="sp-pin-label">Ridge Loop</span></div>
      <div class="sp-pin p2"><span class="sp-pin-dot"></span><span class="sp-pin-label">Cedar Falls</span></div>
      <div class="sp-pin p3"><span class="sp-pin-dot"></span></div>
      <div class="sp-map-label l1">NORTH RIDGE</div>
      <div class="sp-map-label l2">CEDAR CREEK</div>
      <div class="sp-compass">${icon('compass', 18)}</div>
    </div>
    <div class="sp-sheet">
      <div class="sp-grabber"></div>
      <div class="sp-sheet-head">
        <div>
          <div class="sp-kicker">${escapeHtml(c.eyebrow)}</div>
          <h2>${escapeHtml(c.title)}</h2>
          <p>${escapeHtml(c.subtitle)}</p>
        </div>
        <button class="sp-map-btn" aria-label="Open map">${icon('pin', 19)}</button>
      </div>
      <div class="sp-rows">
        ${items
          .map((item, index) => `<div class="sp-row"><span class="sp-row-num">${index + 1}</span><div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.body)}</span></div><em>${escapeHtml(item.meta.split('·')[0].trim())}</em></div>`)
          .join('')}
      </div>
    </div>
    ${tabBar(nav)}
  </div>`;
}

function spatialDetail(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  const item = itemsOf(family)[0] ?? c.items[0];
  return `<div class="screen sp-detail variant-${variant.id}">
    <div class="sp-detail-map">
      ${mapSvg()}
      ${statusBar('on-art')}
      <div class="sp-detail-top">
        <button class="icon-btn on-art" aria-label="Back">${icon('back')}</button>
        <button class="icon-btn on-art" aria-label="Save">${icon('bookmark')}</button>
      </div>
      <div class="sp-route-line"><span class="dot start"></span><span class="line"></span><span class="dot end"></span></div>
      <div class="sp-detail-pin">${icon('pin', 12)} North gate</div>
    </div>
    <div class="sp-detail-sheet">
      <div class="sp-grabber"></div>
      <div class="sp-detail-head">
        <div><div class="sp-kicker">TRAIL · MODERATE</div><h2>${escapeHtml(item?.title ?? c.title)}</h2><p>${escapeHtml(item?.body ?? c.subtitle)}</p></div>
        <div class="sp-distance"><strong>4.2</strong><span>km</span></div>
      </div>
      <div class="sp-facts">
        <div><span>Ascent</span><strong>240 m</strong></div>
        <div><span>Time</span><strong>1h 45</strong></div>
        <div><span>Start</span><strong>North gate</strong></div>
      </div>
      <p class="sp-body">${escapeHtml(COPY.spatial)}</p>
      <div class="sp-notes">
        <div><span>Surface</span><strong>Gravel, rock</strong></div>
        <div><span>Dogs</span><strong>On lead</strong></div>
        <div><span>Water</span><strong>At the falls</strong></div>
      </div>
      <div class="sp-trailhead"><span class="sp-trailhead-icon">${icon('pin', 14)}</span><div><strong>North gate trailhead</strong><span>12 min drive · parking fills by 9am</span></div><em>Open</em></div>
      <div class="sp-actions">
        <button class="btn primary">${icon('compass', 17)} Directions</button>
        <button class="btn ghost">Save</button>
      </div>
    </div>
  </div>`;
}

/* --------------------------------- Ritual -------------------------------- */

function ritualHome(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  const nav = c.nav ?? ['Today', 'Practice', 'You'];
  const items = itemsOf(family);
  const isTraining = variant.id === 'training-log';
  const isMeditation = variant.id === 'meditation-timer';
  return `<div class="screen ritual variant-${variant.id}">
    ${statusBar(isMeditation ? 'on-art' : '')}
    <header class="ritual-head">
      <span>${escapeHtml(c.eyebrow.split('·')[0].trim())}</span>
      ${isMeditation ? '' : avatar('Mara Chen', 0)}
    </header>
    <main class="screen-main ritual-main">
      ${isMeditation
        ? `<div class="ritual-med-copy"><div class="ritual-kicker">${escapeHtml(c.eyebrow)}</div><h2>${escapeHtml(c.title)}</h2><p>${escapeHtml(c.subtitle)}</p></div>
           ${progressRing(68, `<span class="ritual-time">10:00</span><span class="ritual-time-label">Breathe in</span>`)}
           <button class="ritual-stop">End session</button>
           <div class="ritual-week"><span class="done">M</span><span class="done">T</span><span>W</span><span>Th</span><span>F</span><span>Sa</span><span>Su</span><em>3 of 7 this week</em></div>`
        : `<div class="ritual-kicker">${escapeHtml(c.eyebrow)}</div>
           <h2 class="ritual-title">${escapeHtml(c.title)}</h2>
           <p class="ritual-sub">${escapeHtml(c.subtitle)}</p>
           ${isTraining
             ? `<div class="ritual-training">${items
                 .map((item, index) => `<div class="ritual-set"><div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.meta)}</span></div><div class="ritual-bar"><i style="width:${[82, 46, 18][index] ?? 30}%"></i></div><em>${[82, 46, 18][index] ?? 30}%</em></div>`)
                 .join('')}</div>`
             : `${progressRing(64, `<span class="ritual-ring-min">8</span><span class="ritual-ring-unit">min</span><span class="ritual-ring-start">${escapeHtml(c.action)}</span>`)}
                <div class="ritual-list">${items
                  .map((item, index) => `<div class="ritual-row"><span class="ritual-row-dot ${index === 0 ? 'on' : ''}"></span><div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.meta)}</span></div>${icon('chevron', 15)}</div>`)
                  .join('')}</div>`}
           <div class="ritual-note">${icon('leaf', 16)} <span>One line for today · “Notice what is already quiet.”</span></div>`}
    </main>
    ${tabBar(nav)}
  </div>`;
}

function ritualDetail(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  const item = itemsOf(family)[0];
  return `<div class="screen ritual-detail variant-${variant.id}">
    ${statusBar()}
    <header class="ritual-detail-head">
      <button class="icon-btn" aria-label="Back">${icon('back')}</button>
      <span>${escapeHtml(c.eyebrow)}</span>
      <button class="icon-btn" aria-label="More">${icon('more')}</button>
    </header>
    <main class="screen-main ritual-detail-main">
      <div class="ritual-detail-copy"><div class="ritual-kicker">3 MIN · GUIDED</div><h2>${escapeHtml(item?.title ?? 'Breathe')}</h2><p>${escapeHtml(COPY.ritual)}</p></div>
      ${progressRing(28, `<span class="ritual-time small">2:14</span><span class="ritual-time-label">remaining</span>`)}
      <div class="ritual-steps">
        <div class="ritual-step done"><span>1</span><div><strong>Arrive</strong><p>Sit tall. Let the shoulders drop.</p></div></div>
        <div class="ritual-step"><span>2</span><div><strong>Breathe</strong><p>In for four, out for six.</p></div></div>
        <div class="ritual-step"><span>3</span><div><strong>Close</strong><p>Notice one thing that changed.</p></div></div>
      </div>
      <div class="ritual-soft-note">${icon('leaf', 15)} <span>Pause any time. Your place in the session is saved.</span></div>
    </main>
    <div class="ritual-detail-action"><button class="btn primary">${escapeHtml(c.action)}</button></div>
  </div>`;
}

/* ------------------------------- Playground ------------------------------ */

function playgroundHome(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  const nav = c.nav ?? ['Crew', 'Plans', 'You'];
  const items = itemsOf(family);
  return `<div class="screen play variant-${variant.id}">
    <div class="play-hero">
      ${statusBar('on-art')}
      <div class="play-top"><span class="play-brand">${escapeHtml(tokens.appName)}</span>${avatar('Sam Okafor', 1)}</div>
      <div class="play-hero-copy">
        <div class="play-kicker">${escapeHtml(c.eyebrow)}</div>
        <h2>${escapeHtml(c.title)}</h2>
        <p>${escapeHtml(c.subtitle)}</p>
        <div class="play-crew">${avatarStack(4)}<span>6 friends in</span></div>
      </div>
      <button class="play-cta">${icon('plus', 18)} ${escapeHtml(c.action)}</button>
      <span class="play-sticker">SAT</span>
    </div>
    <main class="screen-main play-main">
      <div class="play-section"><span>Plans</span><span>2 ideas</span></div>
      <div class="play-cards">
        ${items
          .slice(0, 2)
          .map((item, index) => `<article class="play-card tilt-${index + 1}">
            <div class="play-time">${escapeHtml(item.meta.split('·')[0].trim())}</div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.body)}</p>
            <div class="play-card-foot">${avatarStack(3)}<span>${escapeHtml(item.meta.split('·')[1]?.trim() ?? '')}</span></div>
          </article>`)
          .join('')}
      </div>
    </main>
    ${tabBar(nav)}
  </div>`;
}

function playgroundDetail(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  const item = itemsOf(family)[0];
  return `<div class="screen play-detail variant-${variant.id}">
    ${statusBar()}
    <header class="play-detail-head">
      <button class="icon-btn" aria-label="Back">${icon('back')}</button>
      <span>${escapeHtml(c.eyebrow.split('·')[0].trim())}</span>
      <button class="icon-btn" aria-label="Share">${icon('share')}</button>
    </header>
    <main class="screen-main play-detail-main">
      <div class="play-big-time">${escapeHtml(item?.meta.split('·')[0].trim() ?? '18:00')}</div>
      <h2>${escapeHtml(item?.title ?? c.title)}</h2>
      <p class="play-detail-sub">${escapeHtml(item?.body ?? COPY.playground)}</p>
      <div class="play-people">${avatarStack(4)}<span>4 going · 2 maybe</span></div>
      <div class="play-info">
        <div><span>Where</span><strong>East gate, market</strong></div>
        <div><span>Bring</span><strong>A notebook + a jacket</strong></div>
      </div>
      <p class="play-note">${icon('heart', 16)} Sam says: “I will bring the good pencils.”</p>
      <div class="play-whos">
        <div class="play-section"><span>Who's in</span><span>4 going</span></div>
        <div class="play-person">${avatar('Mara Chen', 0)}<strong>Mara Chen</strong><em>Going</em></div>
        <div class="play-person">${avatar('Sam Okafor', 1)}<strong>Sam Okafor</strong><em>Going</em></div>
        <div class="play-person">${avatar('Ines Ruiz', 2)}<strong>Ines Ruiz</strong><em>Maybe</em></div>
      </div>
    </main>
    <div class="play-detail-action"><button class="btn primary">Join this plan</button><button class="btn ghost">Maybe</button></div>
  </div>`;
}

/* ---------------------------------- Luxe --------------------------------- */

function luxeHome(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  const nav = c.nav ?? ['Collection', 'Search', 'Saved'];
  const items = itemsOf(family);
  return `<div class="screen luxe variant-${variant.id}">
    <div class="luxe-hero art art-luxe">
      <span class="art-grain"></span>
      ${statusBar('on-art')}
      <div class="luxe-top"><span class="luxe-brand">${escapeHtml(tokens.appName)}</span><button class="icon-btn on-art" aria-label="Bag">${icon('bag')}</button></div>
      <div class="luxe-caption"><span>${escapeHtml(c.eyebrow)}</span><span>NO. 04</span></div>
    </div>
    <main class="screen-main luxe-main">
      <h2>${escapeHtml(c.title)}</h2>
      <p class="luxe-sub">${escapeHtml(c.subtitle)}</p>
      <div class="luxe-rule"></div>
      <div class="luxe-items">
        ${items
          .map((item, index) => `<div class="luxe-item"><div class="luxe-thumb art art-luxe tone-${index + 1}"><span class="art-grain"></span></div><div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.meta)}</span></div>${icon('chevron', 15)}</div>`)
          .join('')}
      </div>
      <button class="luxe-more">${escapeHtml(c.action)}</button>
    </main>
    ${tabBar(nav)}
  </div>`;
}

function luxeDetail(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  const item = itemsOf(family)[0];
  return `<div class="screen luxe-detail variant-${variant.id}">
    <div class="luxe-detail-hero art art-luxe">
      <span class="art-grain"></span>
      ${statusBar('on-art')}
      <div class="luxe-top"><button class="icon-btn on-art" aria-label="Back">${icon('back')}</button><button class="icon-btn on-art" aria-label="Save">${icon('bookmark')}</button></div>
      <div class="luxe-caption"><span>${escapeHtml(item?.title ?? c.title)}</span><span>01 / 04</span></div>
    </div>
    <main class="screen-main luxe-detail-main">
      <div class="luxe-detail-kicker">${escapeHtml(c.eyebrow)}</div>
      <h2>${escapeHtml(item?.title ?? c.title)}</h2>
      <div class="luxe-price">${escapeHtml(item?.meta.split('·')[0].trim() ?? '$180')}</div>
      <p>${escapeHtml(COPY.luxe)}</p>
      <div class="luxe-accordion"><span>Materials & care</span>${icon('plus', 16)}</div>
      <div class="luxe-accordion"><span>Delivery & returns</span>${icon('plus', 16)}</div>
      <div class="luxe-related">
        <div class="luxe-related-label">Also in the atelier</div>
        <div class="luxe-related-grid">
          ${itemsOf(family)
            .slice(1, 3)
            .map((related, index) => `<div class="luxe-related-card">${art('luxe', `tone-${index + 1}`)}<strong>${escapeHtml(related.title)}</strong><span>${escapeHtml(related.meta)}</span></div>`)
            .join('')}
        </div>
      </div>
    </main>
    <div class="luxe-detail-action"><button class="btn primary">Add to bag</button><span class="luxe-ship">Complimentary delivery</span></div>
  </div>`;
}

/* -------------------------------- Utility -------------------------------- */

function utilityHome(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  const nav = c.nav ?? ['Tools', 'History', 'Settings'];
  const items = itemsOf(family);
  if (variant.id === 'workbench') {
    return `<div class="screen util variant-${variant.id}">
      ${statusBar()}
      <header class="util-head"><div><div class="util-brand">${escapeHtml(tokens.appName)}</div><span>QUICK TOOLS · READY</span></div>${icon('history', 20)}</header>
      <main class="screen-main util-main">
        <div class="util-statusbar"><span class="util-dot"></span><span>All tools ready · offline</span><em>v2.4</em></div>
        <div class="util-grid">
          ${items.map((item, index) => `<div class="util-tile ${index === 0 ? 'active' : ''}"><span class="util-tile-icon">${icon(['compass', 'clock', 'arrow'][index] ?? 'plus', 22)}</span><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.meta)}</span></div>`).join('')}
          <div class="util-tile ghost"><span class="util-tile-icon">${icon('plus', 22)}</span><strong>Add tool</strong><span>Pin a shortcut</span></div>
        </div>
        <div class="util-section">Recent</div>
        ${items.map((item) => `<div class="util-row"><div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.body)}</span></div><em>${escapeHtml(item.meta)}</em>${icon('chevron', 15)}</div>`).join('')}
      </main>
      ${tabBar(nav)}
    </div>`;
  }
  return `<div class="screen util variant-${variant.id}">
    ${statusBar()}
    <header class="util-head"><div><div class="util-brand">${escapeHtml(tokens.appName)}</div><span>QUICK TOOLS · READY</span></div>${icon('history', 20)}</header>
    <main class="screen-main util-main">
      <div class="util-statusbar"><span class="util-dot"></span><span>Level calibrated · 0.2°</span><em>OFFLINE</em></div>
      <div class="util-gauge-wrap">
        <div class="util-gauge">${progressRing(72, `<span class="util-readout">0.0</span><span class="util-unit">cm</span>`)}</div>
        <div class="util-hint">Point at a surface</div>
      </div>
      <button class="util-primary">${icon('compass', 18)} ${escapeHtml(c.action)}</button>
      <div class="util-segment"><span class="on">cm</span><span>in</span><span>ft</span></div>
      <div class="util-pinned">
        <div><span class="util-pin-icon">${icon('clock', 17)}</span><strong>Timer</strong><em>04:00</em></div>
        <div><span class="util-pin-icon">${icon('sun', 17)}</span><strong>Light</strong><em>Off</em></div>
        <div><span class="util-pin-icon">${icon('leaf', 17)}</span><strong>Notes</strong><em>3</em></div>
      </div>
      <div class="util-section">Recent</div>
      <div class="util-rows">
        ${items.map((item) => `<div class="util-row"><div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.body)}</span></div><em>${escapeHtml(item.meta)}</em>${icon('chevron', 15)}</div>`).join('')}
      </div>
      <div class="util-tip"><strong>Tip</strong><span>Hold still for a stable reading. Saved readings stay on this device.</span></div>
    </main>
    ${tabBar(nav)}
  </div>`;
}

function utilityDetail(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  return `<div class="screen util-detail variant-${variant.id}">
    ${statusBar()}
    <header class="util-detail-head"><button class="icon-btn" aria-label="Back">${icon('back')}</button><span>LEVEL</span><button class="icon-btn" aria-label="History">${icon('history')}</button></header>
    <main class="screen-main util-detail-main">
      <div class="util-detail-value">0.2<span>°</span></div>
      <div class="util-detail-state">Surface is nearly flat</div>
      <div class="util-bubble"><span class="util-bubble-dot"></span><span class="util-bubble-line"></span><em>0.2°</em></div>
      <div class="util-detail-note">${escapeHtml(COPY.utility)}</div>
      <div class="util-facts"><div><span>Axis</span><strong>X / Y</strong></div><div><span>Accuracy</span><strong>± 0.1°</strong></div><div><span>Units</span><strong>Degrees</strong></div></div>
      <div class="util-section">Recent readings</div>
      <div class="util-recent">
        <div><span>Level · Kitchen shelf</span><em>0.2°</em></div>
        <div><span>Level · Studio desk</span><em>0.4°</em></div>
        <div><span>Level · Back wall</span><em>1.1°</em></div>
      </div>
    </main>
    <div class="util-detail-action"><button class="btn primary">Calibrate</button><button class="btn ghost">Save reading</button></div>
  </div>`;
}

/* --------------------------------- Civic --------------------------------- */

function civicHome(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  const nav = c.nav ?? ['Services', 'Notices', 'Help'];
  const items = itemsOf(family);
  if (variant.id === 'wayfinding') {
    return `<div class="screen civic variant-${variant.id}">
      ${statusBar()}
      <header class="civic-head"><div class="civic-brand">${escapeHtml(tokens.appName)}</div><span class="civic-route">R4</span></header>
      <main class="screen-main civic-main">
        <div class="civic-kicker">NEXT DEPARTURES · NORTHBOUND</div>
        <h2 class="civic-way-title">Riverside<br/>via Market</h2>
        <div class="civic-departures">${['3 min', '11 min', '19 min'].map((time, index) => `<div class="civic-departure ${index === 0 ? 'next' : ''}"><span>${time}</span><strong>${index === 0 ? 'Now boarding' : 'Scheduled'}</strong><em>Platform ${index + 1}</em></div>`).join('')}</div>
        <div class="civic-stops">${['City Hall', 'Market St', 'Riverside'].map((stop, index) => `<div class="civic-stop"><span class="civic-stop-dot ${index === 0 ? 'on' : ''}"></span><strong>${stop}</strong><em>${index === 0 ? 'You are here' : `${index * 4} min`}</em></div>`).join('')}</div>
        <div class="civic-alert">${icon('help', 17)} Service changes on Sunday · <u>Details</u></div>
      </main>
      ${tabBar(nav)}
    </div>`;
  }
  return `<div class="screen civic variant-${variant.id}">
    ${statusBar()}
    <header class="civic-head"><div><div class="civic-brand">${escapeHtml(tokens.appName)}</div><span class="civic-city">CITY OF NORTHFIELD</span></div><button class="civic-help">${icon('help', 18)}</button></header>
    <main class="screen-main civic-main">
      <h2 class="civic-title">Services</h2>
      <div class="civic-search">${icon('search', 17)} <span>Search services and notices</span></div>
      <div class="civic-notice"><span class="civic-notice-rule"></span><div><span class="civic-kicker">NOTICE · 30 NOV</span><strong>Leaf collection ends next week</strong><p>Put bins out by 7am on your regular day.</p></div>${icon('chevron', 15)}</div>
      <div class="civic-section"><span>Top tasks</span><span>All services</span></div>
      <div class="civic-rows">
        ${items.map((item) => `<div class="civic-row"><div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.body)}</span></div><em>${escapeHtml(item.meta)}</em>${icon('chevron', 15)}</div>`).join('')}
      </div>
      <div class="civic-section"><span>Notices</span><span>All notices</span></div>
      <div class="civic-notice-list">
        <div class="civic-notice-row"><span>02 NOV</span><strong>Road resurfacing on Market St</strong></div>
        <div class="civic-notice-row"><span>04 NOV</span><strong>Council meeting · 7pm, City Hall</strong></div>
      </div>
      <div class="civic-help-card"><div><strong>Need a hand?</strong><span>Call 311 · Mon–Fri, 8am–6pm</span></div>${icon('arrow', 17)}</div>
    </main>
    ${tabBar(nav)}
  </div>`;
}

function civicDetail(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  return `<div class="screen civic-detail variant-${variant.id}">
    ${statusBar()}
    <header class="civic-detail-head"><button class="icon-btn" aria-label="Back">${icon('back')}</button><span>${escapeHtml(tokens.appName)}</span><button class="icon-btn" aria-label="Help">${icon('help')}</button></header>
    <main class="screen-main civic-detail-main">
      <div class="civic-kicker">${escapeHtml(c.eyebrow)}</div>
      <h2>${escapeHtml(c.title)}</h2>
      <p class="civic-detail-sub">${escapeHtml(c.subtitle)}</p>
      <div class="civic-steps"><div class="civic-step on"><span>1</span><strong>Your details</strong></div><div class="civic-step"><span>2</span><strong>Property</strong></div><div class="civic-step"><span>3</span><strong>Review</strong></div><div class="civic-step"><span>4</span><strong>Pay</strong></div></div>
      <div class="civic-detail-card"><div class="civic-detail-card-head"><strong>Before you start</strong><span>About 10 min</span></div><div class="civic-check">${icon('check', 15)} <span>Property address</span></div><div class="civic-check">${icon('check', 15)} <span>Permit number</span></div><div class="civic-check">${icon('check', 15)} <span>Current email address</span></div></div>
      <p class="civic-body">${escapeHtml(COPY.civic)}</p>
      <div class="civic-plain"><strong>Plain-language summary</strong><p>You can renew online. You do not need an appointment. The fee is shown before you pay.</p></div>
      <div class="civic-next"><strong>What happens next</strong><div><span>1</span><p>We email a receipt right away.</p></div><div><span>2</span><p>The permit arrives within 3 working days.</p></div><div><span>3</span><p>Print it or keep it on your phone.</p></div></div>
    </main>
    <div class="civic-detail-action"><button class="btn primary">${escapeHtml(c.action)}</button><span>No payment due today</span></div>
  </div>`;
}

/* --------------------------------- Organic ------------------------------- */

function organicHome(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  const nav = c.nav ?? ['Garden', 'Recipes', 'Saved'];
  const items = itemsOf(family);
  if (variant.id === 'garden-plot') {
    return `<div class="screen organic variant-${variant.id}">
      ${statusBar()}
      <header class="organic-head"><div class="organic-brand">${escapeHtml(tokens.appName)}</div><button class="icon-btn" aria-label="Search">${icon('search', 18)}</button></header>
      <main class="screen-main organic-main">
        <div class="organic-season"><span>EARLY AUTUMN</span><span>BED 03</span></div>
        <h2 class="organic-title">${escapeHtml(c.title)}</h2>
        <p class="organic-sub">${escapeHtml(c.subtitle)}</p>
        <div class="organic-plot">
          ${items.map((item, index) => `<div class="organic-plant"><span class="organic-plant-icon">${icon(index === 0 ? 'tomato' : index === 1 ? 'leaf' : 'sun', 20)}</span><div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.meta)}</span><div class="organic-plant-bar"><i style="width:${[78, 54, 32][index] ?? 40}%"></i></div></div><em>${['Ready', 'Growing', 'Seedling'][index] ?? 'Growing'}</em></div>`).join('')}
        </div>
        <div class="organic-note">${icon('leaf', 16)} <span>Last watered yesterday · 18°C</span></div>
        <div class="organic-week"><div><span>Harvested</span><strong>2.4 kg</strong></div><div><span>Watered</span><strong>Yesterday</strong></div><div><span>Next</span><strong>Thursday</strong></div></div>
        <div class="organic-plot-label">From the plot</div>
        <div class="organic-plot-row"><span>Tomatoes</span><em>Ready to pick</em></div>
        <div class="organic-plot-row"><span>Basil</span><em>Pinch the tops</em></div>
      </main>
      ${tabBar(nav)}
    </div>`;
  }
  return `<div class="screen organic variant-${variant.id}">
    ${statusBar()}
    <header class="organic-head"><div class="organic-brand">${escapeHtml(tokens.appName)}</div><button class="icon-btn" aria-label="Search">${icon('search', 18)}</button></header>
    <main class="screen-main organic-main">
      <div class="organic-season"><span>${escapeHtml(c.eyebrow)}</span><span>NO. 06</span></div>
      <h2 class="organic-title">${escapeHtml(c.title)}</h2>
      <p class="organic-sub">${escapeHtml(c.subtitle)}</p>
      <div class="organic-feature">
        ${art('organic')}
        <span class="organic-tag">THIS WEEK</span>
        <div class="organic-feature-copy"><span>${escapeHtml(items[0]?.meta ?? '')}</span><strong>${escapeHtml(items[0]?.title ?? '')}</strong></div>
      </div>
      <div class="organic-grid">
        ${items.slice(1, 3).map((item, index) => `<article class="organic-card">${art('organic', `tone-${index + 1}`)}<span>${escapeHtml(item.meta)}</span><strong>${escapeHtml(item.title)}</strong></article>`).join('')}
      </div>
      <div class="organic-week"><div><span>Harvested</span><strong>2.4 kg</strong></div><div><span>In season</span><strong>6 crops</strong></div><div><span>Saved</span><strong>12 recipes</strong></div></div>
      <div class="organic-plot-label">From the plot</div>
      <div class="organic-plot-row"><span>Tomatoes</span><em>Ready to pick</em></div>
      <div class="organic-plot-row"><span>Basil</span><em>Pinch the tops</em></div>
    </main>
    ${tabBar(nav)}
  </div>`;
}

function organicDetail(selection, tokens) {
  const { family, variant } = selection;
  const c = family.content;
  const item = itemsOf(family)[0];
  return `<div class="screen organic-detail variant-${variant.id}">
    <div class="organic-detail-hero art art-organic">
      <span class="art-grain"></span>
      ${statusBar('on-art')}
      <div class="organic-top"><button class="icon-btn on-art" aria-label="Back">${icon('back')}</button><button class="icon-btn on-art" aria-label="Save">${icon('bookmark')}</button></div>
      <div class="organic-detail-caption"><span>${escapeHtml(item?.meta ?? '')}</span><span>2 SERVINGS</span></div>
    </div>
    <main class="screen-main organic-detail-main">
      <div class="organic-season"><span>EARLY AUTUMN</span><span>RECIPE</span></div>
      <h2>${escapeHtml(item?.title ?? c.title)}</h2>
      <p class="organic-detail-sub">${escapeHtml(item?.body ?? COPY.organic)}</p>
      <div class="organic-recipe">
        <div class="organic-ingredients"><div class="organic-recipe-label">Ingredients</div><div>4 ripe tomatoes</div><div>2 thick slices sourdough</div><div>Olive oil, salt, garlic</div></div>
        <div class="organic-timeline"><div class="organic-recipe-label">Method</div><div class="organic-step"><span>1</span><p>Halve the tomatoes. Salt them and let them sit for ten minutes.</p></div><div class="organic-step"><span>2</span><p>Char the bread. Rub it with garlic while it is still warm.</p></div><div class="organic-step"><span>3</span><p>Pile the tomatoes on top. Finish with oil and black pepper.</p></div></div>
      </div>
      <div class="organic-cooks-note"><span>Cook's note</span><p>Use the tomatoes at room temperature. If they are cold, the salt will take longer to draw out the juice.</p></div>
    </main>
    <div class="organic-detail-action"><button class="btn primary">Start cooking</button><span>25 min · Easy</span></div>
  </div>`;
}

export function renderScreens(selection, tokens) {
  const renderers = {
    editorial: [editorialHome, editorialDetail],
    instrument: [instrumentHome, instrumentDetail],
    cinematic: [cinematicHome, cinematicDetail],
    spatial: [spatialHome, spatialDetail],
    ritual: [ritualHome, ritualDetail],
    playground: [playgroundHome, playgroundDetail],
    luxe: [luxeHome, luxeDetail],
    utility: [utilityHome, utilityDetail],
    civic: [civicHome, civicDetail],
    organic: [organicHome, organicDetail],
  };
  const pair = renderers[selection.family.id];
  if (!pair) throw new Error(`No preview renderer for family ${selection.family.id}`);
  return { home: pair[0](selection, tokens), detail: pair[1](selection, tokens) };
}
