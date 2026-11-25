export const BASE_CSS = `
:root {
  --bg: __BG_LIGHT__;
  --surface: __SURFACE_LIGHT__;
  --elev: __ELEV_LIGHT__;
  --text: __TEXT_LIGHT__;
  --muted: __MUTED_LIGHT__;
  --border: __BORDER_LIGHT__;
  --accent: __ACCENT_LIGHT__;
  --on-accent: __ONACCENT_LIGHT__;
  --success: __SUCCESS_LIGHT__;
  --warning: __WARNING_LIGHT__;
  --danger: __DANGER_LIGHT__;
  --font-display: __FONT_DISPLAY__;
  --font-body: __FONT_BODY__;
  --font-mono: __FONT_MONO__;
  --display-size: __DISPLAY_SIZE__px;
  --body-size: __BODY_SIZE__px;
  --title-size: __TITLE_SIZE__px;
  --headline-size: __HEADLINE_SIZE__px;
  --label-size: __LABEL_SIZE__px;
  --caption-size: __CAPTION_SIZE__px;
  --track-display: __TRACK_DISPLAY__em;
  --track-label: __TRACK_LABEL__em;
  --radius-sm: __RADIUS_SM__px;
  --radius-md: __RADIUS_MD__px;
  --radius-lg: __RADIUS_LG__px;
  --margin: __MARGIN__px;
  --gutter: __GUTTER__px;
  --ease: __EASE__;
}
html[data-mode="dark"] {
  --bg: __BG_DARK__;
  --surface: __SURFACE_DARK__;
  --elev: __ELEV_DARK__;
  --text: __TEXT_DARK__;
  --muted: __MUTED_DARK__;
  --border: __BORDER_DARK__;
  --accent: __ACCENT_DARK__;
  --on-accent: __ONACCENT_DARK__;
  --success: __SUCCESS_DARK__;
  --warning: __WARNING_DARK__;
  --danger: __DANGER_DARK__;
}

* { box-sizing: border-box; }
html { background: #e9e4d9; }
body {
  margin: 0;
  color: #1c1a16;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background:
    radial-gradient(circle at 8% -4%, rgba(255,255,255,.92), transparent 34%),
    radial-gradient(circle at 94% 6%, rgba(255,255,255,.5), transparent 24%),
    repeating-linear-gradient(90deg, rgba(32,28,20,.035) 0 1px, transparent 1px 96px),
    #e9e4d9;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; }
button { font: inherit; }

.studio-top {
  width: min(1400px, 100%);
  margin: 0 auto;
  padding: 22px 36px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border-bottom: 1px solid rgba(28, 26, 22, .16);
}
.studio-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  font-size: 18px;
  letter-spacing: .13em;
  text-transform: uppercase;
}
.studio-mark {
  width: 22px;
  height: 22px;
  border: 1.5px solid #1c1a16;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 11px;
  letter-spacing: 0;
  font-family: var(--font-mono, monospace);
}
.studio-nav { display: flex; gap: 24px; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #6b655a; }
.studio-nav span:first-child { color: #1c1a16; border-bottom: 1px solid #1c1a16; padding-bottom: 3px; }
.studio-tools { display: flex; align-items: center; gap: 14px; }
.mode-switch {
  display: inline-flex;
  padding: 3px;
  border: 1px solid rgba(28,26,22,.22);
  border-radius: 999px;
  background: rgba(255,255,255,.35);
}
.mode-switch button {
  border: 0;
  background: transparent;
  color: #5c564c;
  font-size: 10px;
  letter-spacing: .08em;
  text-transform: uppercase;
  padding: 6px 11px;
  border-radius: 999px;
  cursor: pointer;
}
.mode-switch button.active { background: #1c1a16; color: #f3efe6; }
.studio-index { font-family: var(--font-mono, monospace); font-size: 10px; color: #797267; }

.studio-hero {
  width: min(1400px, 100%);
  margin: 0 auto;
  padding: 30px 36px 18px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 30px;
  align-items: end;
}
.hero-kicker {
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: #6d665b;
  display: flex;
  align-items: center;
  gap: 10px;
}
.hero-kicker i { width: 26px; height: 1px; background: #1c1a16; display: inline-block; }
.studio-hero h1 {
  margin: 9px 0 10px;
  font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  font-weight: 500;
  font-size: clamp(42px, 4.6vw, 68px);
  line-height: .95;
  letter-spacing: -.035em;
}
.studio-hero h1 span { color: #8a8173; font-style: italic; }
.studio-hero .hero-thesis { margin: 0; max-width: 690px; font-size: 14px; line-height: 1.55; color: #4e493f; }
.hero-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 14px; }
.hero-tag {
  font-family: var(--font-mono, monospace);
  font-size: 9px;
  letter-spacing: .08em;
  text-transform: uppercase;
  border: 1px solid rgba(28,26,22,.25);
  border-radius: 999px;
  padding: 5px 9px;
  color: #4e493f;
}
.hero-tag.accent { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
.hero-side { border-left: 1px solid rgba(28,26,22,.18); padding-left: 20px; }
.hero-side .side-label { margin-bottom: 9px; }
.hero-fact { display: flex; justify-content: space-between; gap: 10px; font-size: 11px; padding: 5px 0; border-bottom: 1px solid rgba(28,26,22,.1); }
.hero-fact span { color: #6d665b; }
.hero-fact strong { font-family: var(--font-mono, monospace); font-weight: 500; font-size: 10px; text-align: right; }

.board {
  width: min(1400px, 100%);
  margin: 0 auto;
  padding: 16px 36px 26px;
  display: grid;
  grid-template-columns: 386px 386px minmax(310px, 1fr);
  gap: 34px;
  align-items: start;
}
.device-col { margin: 0; }
.device-meta {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 14px;
  font-family: var(--font-mono, monospace);
  font-size: 9px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #6d665b;
}
.device-meta strong { color: #1c1a16; font-weight: 500; }
.phone {
  position: relative;
  width: 386px;
  height: 812px;
  padding: 10px;
  border-radius: 54px;
  background: linear-gradient(145deg, #2b2925, #0c0b0a 55%, #201e1a);
  box-shadow:
    0 1px 0 rgba(255,255,255,.22) inset,
    0 32px 60px rgba(38,32,22,.28),
    0 8px 18px rgba(38,32,22,.18);
}
.phone::before {
  content: "";
  position: absolute;
  inset: 4px;
  border-radius: 50px;
  border: 1px solid rgba(255,255,255,.08);
  pointer-events: none;
  z-index: 30;
}
.island {
  position: absolute;
  top: 18px;
  left: 50%;
  width: 98px;
  height: 27px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: #050505;
  z-index: 40;
}
.phone-screen {
  width: 366px;
  height: 792px;
  border-radius: 45px;
  overflow: hidden;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: var(--body-size);
  line-height: 1.4;
  position: relative;
}
.screen { height: 100%; display: flex; flex-direction: column; background: var(--bg); color: var(--text); position: relative; overflow: hidden; }
.screen button { border: 0; background: none; color: inherit; padding: 0; }
.screen-main { flex: 1; min-height: 0; overflow: hidden; }

.statusbar {
  flex: none;
  height: 44px;
  padding: 4px 22px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  color: inherit;
}
.sb-time { font-family: var(--font-body); font-size: 12px; font-weight: 700; letter-spacing: .01em; }
.sb-icons { display: flex; align-items: center; gap: 5px; }
.statusbar.on-art { color: #fff; }
.statusbar.on-art .sb-icons { filter: drop-shadow(0 1px 2px rgba(0,0,0,.22)); }

.tabbar {
  flex: none;
  height: 62px;
  display: flex;
  align-items: flex-start;
  padding: 7px 10px 0;
  background: color-mix(in srgb, var(--surface) 94%, transparent);
  border-top: 1px solid var(--border);
  backdrop-filter: blur(12px);
  position: relative;
  z-index: 12;
}
.tab { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; color: var(--muted); font-size: 8.5px; letter-spacing: .04em; }
.tab.active { color: var(--accent); }
.tab svg { opacity: .9; }
.tab.active svg { opacity: 1; }
.tab span { white-space: nowrap; }

.ic { flex: none; display: block; }
.icon-btn { width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; color: inherit; background: transparent; flex: none; }
.icon-btn.on-art { background: rgba(10,10,10,.26); color: #fff; backdrop-filter: blur(8px); }
.btn { height: 44px; padding: 0 18px; border-radius: var(--radius-md); display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-size: 12px; font-weight: 650; letter-spacing: .01em; }
.btn.primary { background: var(--accent); color: var(--on-accent); }
.btn.ghost { background: transparent; border: 1px solid var(--border); color: var(--text); }
.chip {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 11px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--surface) 75%, transparent);
  color: var(--muted);
  font-size: 9.5px;
  white-space: nowrap;
}
.chip.active { background: var(--text); color: var(--bg); border-color: var(--text); }
.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-grid;
  place-items: center;
  font-size: 9px;
  font-weight: 700;
  color: var(--on-accent);
  background: var(--accent);
  border: 2px solid var(--surface);
  flex: none;
}
.avatar.a2 { background: color-mix(in srgb, var(--accent) 55%, var(--text)); color: #fff; }
.avatar.a3 { background: var(--warning); color: #1c1304; }
.avatar.a4 { background: var(--success); color: #06130c; }
.avatar-stack { display: inline-flex; }
.avatar-stack .avatar + .avatar { margin-left: -8px; }

.art { position: relative; overflow: hidden; background: var(--elev); }
.art-grain {
  position: absolute;
  inset: 0;
  opacity: .22;
  mix-blend-mode: overlay;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E");
}
.art-editorial {
  background:
    radial-gradient(circle at 73% 28%, rgba(255,250,235,.95) 0 9%, transparent 9.6%),
    radial-gradient(circle at 73% 28%, color-mix(in srgb, var(--accent) 32%, transparent) 0 22%, transparent 22.5%),
    linear-gradient(168deg, color-mix(in srgb, var(--accent) 16%, var(--elev)) 0%, color-mix(in srgb, var(--accent) 7%, var(--bg)) 52%, color-mix(in srgb, var(--text) 18%, var(--bg)) 100%);
}
.art-editorial::before {
  content: "";
  position: absolute;
  left: -12%;
  bottom: -28%;
  width: 92%;
  height: 78%;
  border-radius: 50% 50% 0 0;
  background: color-mix(in srgb, var(--text) 30%, var(--bg));
  opacity: .42;
  transform: rotate(-8deg);
}
.art-editorial::after {
  content: "";
  position: absolute;
  right: 8%;
  bottom: 0;
  width: 26%;
  height: 58%;
  border-left: 1px solid rgba(255,255,255,.45);
  border-top: 1px solid rgba(255,255,255,.45);
  transform: skewY(-8deg);
  opacity: .55;
}
.art-cinematic {
  background:
    radial-gradient(circle at 71% 38%, color-mix(in srgb, var(--accent) 58%, transparent) 0 11%, transparent 11.8%),
    radial-gradient(circle at 71% 38%, color-mix(in srgb, var(--accent) 20%, transparent) 0 34%, transparent 47%),
    linear-gradient(145deg, color-mix(in srgb, var(--accent) 22%, #050505), #080808 48%, color-mix(in srgb, var(--text) 12%, #050505));
}
.art-cinematic::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 46%;
  width: 62%;
  height: 62%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.22);
  box-shadow: 0 0 70px color-mix(in srgb, var(--accent) 32%, transparent) inset;
}
.art-cinematic::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.82) 0%, rgba(0,0,0,.12) 44%, rgba(0,0,0,.32) 100%);
}
.art-cinematic.tone-2 { filter: hue-rotate(28deg) saturate(.85) brightness(1.05); }
.art-cinematic.tone-3 { filter: hue-rotate(-24deg) saturate(1.08); }
.art-luxe {
  background:
    radial-gradient(ellipse at 52% 74%, color-mix(in srgb, var(--text) 18%, transparent) 0 20%, transparent 52%),
    linear-gradient(155deg, color-mix(in srgb, var(--accent) 13%, var(--elev)), color-mix(in srgb, var(--accent) 5%, #e9e0d0) 58%, color-mix(in srgb, var(--text) 16%, #d9cdbb));
}
.art-luxe::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -6%;
  width: 46%;
  height: 78%;
  transform: translateX(-50%);
  border-radius: 50% 50% 4px 4px / 34% 34% 4px 4px;
  border: 1px solid rgba(255,255,255,.55);
  background: linear-gradient(180deg, rgba(255,255,255,.18), rgba(255,255,255,.03));
  box-shadow: 0 30px 60px rgba(50,38,20,.22);
}
.art-luxe::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 5%;
  width: 18%;
  height: 34%;
  transform: translateX(-50%);
  border-radius: 50% 50% 8px 8px / 40% 40% 8px 8px;
  background: color-mix(in srgb, var(--accent) 32%, #cfc0a8);
  opacity: .8;
}
.art-luxe.tone-2 { filter: hue-rotate(22deg) brightness(.98); }
.art-luxe.tone-3 { filter: hue-rotate(-20deg) brightness(1.03); }
.art-organic {
  background:
    radial-gradient(circle at 28% 36%, color-mix(in srgb, var(--accent) 72%, #f2c14e) 0 18%, transparent 18.8%),
    radial-gradient(circle at 62% 58%, color-mix(in srgb, var(--warning) 62%, #9a3d1e) 0 14%, transparent 14.8%),
    radial-gradient(circle at 74% 26%, color-mix(in srgb, var(--success) 34%, transparent) 0 24%, transparent 30%),
    linear-gradient(160deg, color-mix(in srgb, var(--accent) 10%, #f4e8ca), color-mix(in srgb, var(--success) 30%, #e5d7b4) 62%, color-mix(in srgb, var(--text) 20%, #b7a782));
}
.art-organic::before {
  content: "";
  position: absolute;
  left: 12%;
  bottom: -24%;
  width: 66%;
  height: 66%;
  border-radius: 50% 46% 40% 54%;
  border: 1px solid rgba(255,255,255,.32);
  transform: rotate(-10deg);
}
.art-organic.tone-2 { filter: hue-rotate(18deg) saturate(.92); }
.art-organic.tone-3 { filter: hue-rotate(-16deg) saturate(1.05); }

.side { min-width: 0; }
.side-panel {
  background: rgba(255,255,255,.55);
  border: 1px solid rgba(28,26,22,.14);
  border-radius: 16px;
  padding: 17px 18px;
  margin-bottom: 14px;
  backdrop-filter: blur(8px);
}
.side-label {
  font-family: var(--font-mono, monospace);
  font-size: 9px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: #6d665b;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
}
.side-label em { font-style: normal; color: #1c1a16; }
.palette-strip { display: grid; grid-template-columns: repeat(6, 1fr); gap: 5px; }
.palette-chip { min-width: 0; }
.palette-chip i { display: block; height: 38px; border-radius: 7px; border: 1px solid rgba(0,0,0,.12); }
.palette-chip span { display: block; margin-top: 4px; font-family: var(--font-mono, monospace); font-size: 7px; color: #6d665b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.palette-row + .palette-row { margin-top: 10px; }
.type-specimen { display: flex; align-items: baseline; gap: 12px; }
.type-specimen .aa { font-family: var(--font-display); font-size: 48px; line-height: .9; letter-spacing: var(--track-display); }
.type-specimen .type-copy { min-width: 0; }
.type-specimen strong { display: block; font-family: var(--font-display); font-size: 13px; font-weight: 600; }
.type-specimen span { display: block; font-size: 9.5px; color: #6d665b; line-height: 1.35; margin-top: 2px; }
.type-scale { margin-top: 11px; border-top: 1px solid rgba(28,26,22,.12); }
.type-scale div { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(28,26,22,.08); font-size: 9px; }
.type-scale span { color: #6d665b; }
.type-scale em { font-family: var(--font-mono, monospace); font-style: normal; font-size: 8px; }
.signature-list { list-style: none; margin: 0; padding: 0; }
.signature-list li { display: grid; grid-template-columns: 18px 1fr; gap: 8px; padding: 7px 0; border-top: 1px solid rgba(28,26,22,.1); font-size: 10.5px; line-height: 1.4; }
.signature-list li:first-child { border-top: 0; padding-top: 0; }
.signature-list span { font-family: var(--font-mono, monospace); font-size: 8px; color: #8b8376; padding-top: 2px; }
.contrast-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 7px 12px; }
.contrast-cell { border-top: 1px solid rgba(28,26,22,.12); padding-top: 6px; }
.contrast-cell span { display: block; font-size: 8.5px; color: #6d665b; text-transform: uppercase; letter-spacing: .06em; }
.contrast-cell strong { font-family: var(--font-mono, monospace); font-size: 11px; font-weight: 500; }
.contrast-cell em { font-style: normal; color: #3f7a53; font-size: 8px; margin-left: 3px; }
.side-note { font-size: 10px; line-height: 1.45; color: #5f594e; margin: 10px 0 0; }
.side-foot { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }
.side-foot span { font-family: var(--font-mono, monospace); font-size: 8px; border: 1px solid rgba(28,26,22,.2); border-radius: 999px; padding: 3px 7px; color: #5f594e; }

.studio-notes {
  width: min(1400px, 100%);
  margin: 0 auto;
  padding: 4px 36px 34px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
.note-card { border-top: 1px solid rgba(28,26,22,.22); padding-top: 12px; }
.note-card span { font-family: var(--font-mono, monospace); font-size: 8px; color: #8b8376; }
.note-card h3 { margin: 5px 0 6px; font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif; font-size: 18px; font-weight: 500; }
.note-card p { margin: 0; font-size: 10.5px; line-height: 1.55; color: #5f594e; }
.studio-footer {
  width: min(1400px, 100%);
  margin: 0 auto;
  padding: 0 36px 30px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  font-family: var(--font-mono, monospace);
  font-size: 8.5px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #7c7467;
}

@media (max-width: 1240px) {
  .board { grid-template-columns: 386px 386px; justify-content: center; }
  .side { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .side-panel { margin-bottom: 0; }
  .studio-notes { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 880px) {
  .studio-top { padding: 18px 20px; }
  .studio-nav { display: none; }
  .studio-hero { padding: 22px 20px 12px; grid-template-columns: 1fr; }
  .hero-side { display: none; }
  .board { grid-template-columns: 386px; padding: 10px 20px 24px; }
  .side { grid-template-columns: 1fr; }
  .studio-notes { grid-template-columns: 1fr; padding: 0 20px 24px; }
  .studio-footer { padding: 0 20px 24px; flex-direction: column; gap: 6px; }
}
`;
