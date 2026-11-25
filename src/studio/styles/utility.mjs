export const UTILITY_CSS = `
/* Utility */
.util { background: var(--bg); }
.util-head { display: flex; align-items: center; justify-content: space-between; padding: 2px 20px 4px; }
.util-brand { font-family: var(--font-display); font-size: 20px; font-weight: 750; letter-spacing: -.03em; }
.util-head span { display: block; font-family: var(--font-mono); font-size: 6.5px; letter-spacing: .12em; color: var(--muted); margin-top: 2px; }
.util-head > .ic { color: var(--muted); }
.util-main { padding: 8px 20px 0; display: flex; flex-direction: column; }
.util-statusbar { display: flex; align-items: center; gap: 7px; padding: 7px 9px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 7.5px; color: var(--muted); }
.util-statusbar em { margin-left: auto; font-style: normal; font-size: 6.5px; letter-spacing: .1em; color: var(--success); }
.util-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--success); }
.util-gauge-wrap { display: flex; flex-direction: column; align-items: center; margin-top: 12px; }
.util-gauge .ring { width: 186px; height: 186px; margin: 0 auto; box-shadow: none; }
.util-gauge .ring::after { display: none; }
.util-gauge .ring-inner { background: var(--surface); }
.util-readout { font-family: var(--font-mono); font-size: 49px; line-height: .95; letter-spacing: -.055em; font-weight: 600; }
.util-unit { font-family: var(--font-mono); font-size: 8px; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); margin-top: 3px; }
.util-hint { font-family: var(--font-mono); font-size: 7px; letter-spacing: .08em; color: var(--muted); text-transform: uppercase; margin-top: 6px; }
.util-primary { height: 44px; margin-top: 12px; border-radius: var(--radius-md); background: var(--accent); color: var(--on-accent); display: flex; align-items: center; justify-content: center; gap: 7px; font-size: 11px; font-weight: 700; }
.util-segment { display: flex; margin-top: 8px; background: color-mix(in srgb, var(--border) 45%, transparent); border-radius: 7px; padding: 3px; }
.util-segment span { flex: 1; text-align: center; padding: 5px 0; font-family: var(--font-mono); font-size: 8px; color: var(--muted); border-radius: 5px; }
.util-segment .on { background: var(--surface); color: var(--text); box-shadow: 0 1px 2px rgba(0,0,0,.08); font-weight: 600; }
.util-section { margin: 12px 0 2px; padding-bottom: 4px; border-bottom: 1px solid var(--text); font-family: var(--font-mono); font-size: 7px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
.util-row { display: grid; grid-template-columns: 1fr auto 14px; align-items: center; gap: 8px; padding: 7px 0; border-bottom: 1px solid var(--border); }
.util-row div { min-width: 0; }
.util-row strong { display: block; font-size: 10px; font-weight: 650; }
.util-row span { display: block; font-size: 8px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.util-row em { font-family: var(--font-mono); font-size: 7px; font-style: normal; color: var(--muted); white-space: nowrap; }
.util-row .ic { color: var(--muted); }

/* Workbench */
.variant-workbench .util-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px; }
.util-tile { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 11px 10px; display: flex; flex-direction: column; gap: 2px; }
.util-tile.active { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent) inset; }
.util-tile-icon { width: 30px; height: 30px; border-radius: 8px; display: grid; place-items: center; background: color-mix(in srgb, var(--accent) 11%, var(--surface)); color: var(--accent); margin-bottom: 4px; }
.util-tile strong { font-size: 10px; font-weight: 650; }
.util-tile span { font-size: 7.5px; color: var(--muted); }
.util-tile.ghost { border-style: dashed; background: transparent; }
.util-tile.ghost .util-tile-icon { background: transparent; border: 1px dashed var(--border); color: var(--muted); }
.variant-workbench .util-section { margin-top: 13px; }

/* Field manual */
.variant-field-manual { background: var(--surface); }
.variant-field-manual .util-main { background-image: repeating-linear-gradient(to bottom, transparent 0 29px, color-mix(in srgb, var(--border) 55%, transparent) 29px 30px); }
.variant-field-manual .util-brand { font-family: var(--font-mono); font-size: 14px; letter-spacing: .1em; text-transform: uppercase; }
.variant-field-manual .util-gauge .ring { width: 160px; height: 160px; }
.variant-field-manual .util-primary { background: var(--text); color: var(--bg); border-radius: 3px; }
.variant-field-manual .util-row { background: color-mix(in srgb, var(--surface) 84%, transparent); }

/* Utility detail */
.util-detail { background: var(--bg); }
.util-detail-head { display: flex; align-items: center; justify-content: space-between; padding: 0 14px; font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .13em; color: var(--muted); }
.util-detail-head .icon-btn { width: 30px; height: 30px; }
.util-detail-main { padding: 8px 22px 0; display: flex; flex-direction: column; align-items: center; text-align: center; }
.util-detail-value { font-family: var(--font-mono); font-size: 78px; line-height: .9; letter-spacing: -.07em; font-weight: 600; }
.util-detail-value span { font-size: 30px; color: var(--muted); }
.util-detail-state { font-family: var(--font-mono); font-size: 8px; letter-spacing: .1em; text-transform: uppercase; color: var(--success); margin-top: 4px; }
.util-bubble { width: 230px; height: 150px; border: 1px solid var(--border); border-radius: 12px; background: color-mix(in srgb, var(--surface) 70%, transparent); position: relative; margin: 16px 0 10px; overflow: hidden; }
.util-bubble::before { content: ""; position: absolute; left: 50%; top: 50%; width: 62px; height: 62px; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent); transform: translate(-50%, -50%); }
.util-bubble::after { content: ""; position: absolute; left: 50%; top: 50%; width: 14px; height: 14px; border-radius: 50%; border: 1px dashed var(--accent); transform: translate(-50%, -50%); }
.util-bubble-dot { position: absolute; left: 54%; top: 47%; width: 18px; height: 18px; border-radius: 50%; background: color-mix(in srgb, var(--accent) 20%, transparent); border: 1px solid var(--accent); }
.util-bubble-line { position: absolute; left: 0; right: 0; top: 50%; border-top: 1px solid var(--border); }
.util-bubble-line::after { content: ""; position: absolute; left: 50%; top: -44px; bottom: -44px; border-left: 1px solid var(--border); }
.util-bubble em { position: absolute; left: 62%; top: 34%; font-family: var(--font-mono); font-style: normal; font-size: 8px; color: var(--accent); }
.util-detail-note { font-size: 8.5px; line-height: 1.5; color: var(--muted); max-width: 270px; }
.util-facts { display: grid; grid-template-columns: repeat(3, 1fr); width: 100%; gap: 8px; border-top: 1px solid var(--border); margin-top: 12px; padding-top: 8px; }
.util-facts div { text-align: left; }
.util-facts span { display: block; font-family: var(--font-mono); font-size: 6.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
.util-facts strong { display: block; font-size: 9.5px; font-weight: 600; margin-top: 2px; }
.util-detail-action { flex: none; display: flex; gap: 8px; padding: 9px 18px 14px; border-top: 1px solid var(--border); }
.util-detail-action .btn.primary { flex: 1.4; }
.util-detail-action .btn.ghost { flex: 1; }
.variant-workbench.util-detail .util-detail-main { align-items: flex-start; text-align: left; }
.variant-workbench.util-detail .util-breakdown { width: 100%; }
`;
