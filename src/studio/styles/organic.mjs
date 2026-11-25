export const ORGANIC_CSS = `
/* Organic */
.organic { background: var(--bg); }
.organic-head { display: flex; align-items: center; justify-content: space-between; padding: 2px 20px 2px; }
.organic-brand { font-family: var(--font-display); font-size: 18px; font-weight: 620; letter-spacing: -.02em; }
.organic-main { padding: 6px 20px 0; display: flex; flex-direction: column; }
.organic-season { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 6.5px; letter-spacing: .14em; text-transform: uppercase; color: var(--accent); }
.organic-title { font-family: var(--font-display); font-size: 33px; line-height: .98; letter-spacing: -.035em; font-weight: 560; margin: 4px 0 4px; }
.organic-sub { margin: 0 0 10px; font-family: var(--font-display); font-style: italic; font-size: 11px; color: var(--muted); }
.organic-feature { position: relative; height: 178px; flex: none; border-radius: var(--radius-md) var(--radius-md) 2px 2px; overflow: hidden; }
.organic-feature .art { position: absolute; inset: 0; }
.organic-tag { position: absolute; top: 8px; left: 8px; background: var(--surface); color: var(--text); font-family: var(--font-mono); font-size: 6px; letter-spacing: .1em; padding: 3px 6px; border-radius: 2px; transform: rotate(-1.5deg); z-index: 3; }
.organic-feature-copy { position: absolute; left: 10px; right: 10px; bottom: 9px; z-index: 3; color: #fff; }
.organic-feature-copy span { display: block; font-family: var(--font-mono); font-size: 6.5px; letter-spacing: .06em; }
.organic-feature-copy strong { display: block; font-family: var(--font-display); font-size: 17px; line-height: 1.05; font-weight: 560; margin-top: 2px; }
.organic-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; margin-top: 10px; }
.organic-card { min-width: 0; }
.organic-card .art { height: 92px; border-radius: 2px var(--radius-md) 2px 2px; }
.organic-card span { display: block; margin-top: 5px; font-family: var(--font-mono); font-size: 6px; color: var(--muted); letter-spacing: .04em; }
.organic-card strong { display: block; font-family: var(--font-display); font-size: 11px; line-height: 1.12; font-weight: 560; margin-top: 1px; }

/* Garden plot */
.variant-garden-plot { background: var(--bg); }
.variant-garden-plot .organic-main { padding-top: 4px; }
.variant-garden-plot .organic-title { font-size: 30px; }
.variant-garden-plot .organic-season { background: var(--accent); color: var(--on-accent); padding: 5px 8px; margin: 0 -2px 9px; }
.variant-garden-plot .organic-sub { margin-bottom: 8px; }
.organic-plot { border-top: 1px solid var(--text); }
.organic-plant { display: grid; grid-template-columns: 30px 1fr auto; gap: 9px; align-items: center; padding: 11px 0; border-bottom: 1px solid var(--border); }
.organic-plant-icon { width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; background: color-mix(in srgb, var(--accent) 13%, var(--surface)); color: var(--accent); }
.organic-plant strong { display: block; font-family: var(--font-display); font-size: 12px; font-weight: 560; }
.organic-plant span { display: block; font-size: 7.5px; color: var(--muted); margin-top: 1px; }
.organic-plant em { font-family: var(--font-mono); font-style: normal; font-size: 6.5px; color: var(--accent); text-transform: uppercase; }
.organic-plant-bar { height: 3px; background: var(--border); border-radius: 2px; margin-top: 5px; overflow: hidden; }
.organic-plant-bar i { display: block; height: 100%; background: var(--accent); }
.organic-note { display: flex; align-items: center; gap: 5px; margin-top: 10px; font-family: var(--font-mono); font-size: 7px; color: var(--muted); }
.organic-note .ic { color: var(--accent); }

/* Slow kitchen */
.variant-slow-kitchen { background: var(--surface); }
.variant-slow-kitchen .organic-main { padding-top: 9px; }
.variant-slow-kitchen .organic-title { font-size: 35px; font-weight: 520; }
.variant-slow-kitchen .organic-feature { height: 164px; border-radius: 0; }
.variant-slow-kitchen .organic-card .art { border-radius: 0; }
.variant-slow-kitchen .organic-grid { gap: 13px; }
.variant-slow-kitchen .organic-card strong { font-weight: 520; }
.variant-slow-kitchen .organic-season { color: var(--muted); }

/* Organic detail */
.organic-detail { background: var(--bg); }
.organic-detail-hero { height: 294px; flex: none; position: relative; color: #fff; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: 14px; }
.organic-detail-hero::after { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none; background: linear-gradient(to top, rgba(24,20,8,.5), transparent 38%); }
.organic-top { display: flex; align-items: center; justify-content: space-between; padding: 0 16px; position: relative; z-index: 3; }
.organic-detail-caption { display: flex; justify-content: space-between; padding: 0 22px; position: relative; z-index: 3; font-family: var(--font-mono); font-size: 7px; letter-spacing: .1em; color: rgba(255,255,255,.9); }
.organic-detail-main { padding: 12px 22px 0; overflow: hidden; }
.organic-detail-main h2 { font-family: var(--font-display); font-size: 33px; line-height: 1; letter-spacing: -.03em; font-weight: 560; margin: 4px 0 5px; }
.organic-detail-sub { margin: 0 0 10px; font-size: 9px; line-height: 1.45; color: var(--muted); }
.organic-recipe { display: grid; grid-template-columns: .9fr 1.1fr; gap: 13px; border-top: 1px solid var(--text); padding-top: 8px; }
.organic-recipe-label { font-family: var(--font-mono); font-size: 6.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); margin-bottom: 5px; }
.organic-ingredients div:not(.organic-recipe-label) { font-family: var(--font-display); font-size: 9.5px; line-height: 1.4; padding: 4px 0; border-bottom: 1px solid var(--border); }
.organic-step { display: grid; grid-template-columns: 14px 1fr; gap: 5px; padding: 4px 0; border-bottom: 1px solid var(--border); }
.organic-step span { font-family: var(--font-mono); font-size: 7px; color: var(--accent); }
.organic-step p { margin: 0; font-size: 8px; line-height: 1.4; color: var(--muted); }
.organic-detail-action { flex: none; display: flex; align-items: center; gap: 10px; padding: 9px 20px 13px; border-top: 1px solid var(--border); }
.organic-detail-action .btn { flex: 1; }
.organic-detail-action span { font-family: var(--font-mono); font-size: 7px; color: var(--muted); white-space: nowrap; }
.variant-garden-plot.organic-detail .organic-detail-main h2 { font-weight: 600; }
.variant-slow-kitchen.organic-detail { background: var(--surface); }
.variant-slow-kitchen.organic-detail .organic-detail-hero { height: 268px; }
`;
