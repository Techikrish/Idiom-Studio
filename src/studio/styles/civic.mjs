export const CIVIC_CSS = `
/* Civic */
.civic { background: var(--bg); }
.civic-head { display: flex; align-items: center; justify-content: space-between; padding: 2px 20px 4px; }
.civic-brand { font-family: var(--font-display); font-size: 17px; font-weight: 720; letter-spacing: -.02em; }
.civic-city { display: block; font-family: var(--font-mono); font-size: 6.5px; letter-spacing: .1em; color: var(--muted); margin-top: 2px; }
.civic-help { width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center; background: var(--surface); border: 1px solid var(--border) !important; color: var(--accent); }
.civic-main { padding: 8px 20px 0; display: flex; flex-direction: column; }
.civic-title { font-family: var(--font-display); font-size: 28px; line-height: 1; letter-spacing: -.03em; margin: 2px 0 10px; }
.civic-search { height: 40px; border-radius: 8px; background: var(--surface); border: 1px solid var(--border); display: flex; align-items: center; gap: 8px; padding: 0 12px; font-size: 9.5px; color: var(--muted); }
.civic-search .ic { color: var(--accent); }
.civic-notice { display: flex; align-items: center; gap: 9px; margin-top: 10px; padding: 9px 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; }
.civic-notice-rule { width: 4px; align-self: stretch; border-radius: 2px; background: var(--warning); flex: none; }
.civic-notice div { min-width: 0; flex: 1; }
.civic-kicker { font-family: var(--font-mono); font-size: 6.5px; letter-spacing: .11em; text-transform: uppercase; color: var(--accent); font-weight: 700; }
.civic-notice strong { display: block; font-size: 10px; font-weight: 650; margin-top: 2px; }
.civic-notice p { margin: 1px 0 0; font-size: 8px; color: var(--muted); }
.civic-notice > .ic { color: var(--muted); }
.civic-section { display: flex; justify-content: space-between; margin: 13px 0 0; padding-bottom: 4px; border-bottom: 1px solid var(--text); font-family: var(--font-mono); font-size: 7px; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }
.civic-rows { display: flex; flex-direction: column; }
.civic-row { display: grid; grid-template-columns: 1fr auto 14px; align-items: center; gap: 8px; padding: 9px 0; border-bottom: 1px solid var(--border); }
.civic-row div { min-width: 0; }
.civic-row strong { display: block; font-size: 10.5px; font-weight: 650; }
.civic-row span { display: block; font-size: 8px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.civic-row em { font-family: var(--font-mono); font-size: 7px; font-style: normal; color: var(--danger); white-space: nowrap; }
.civic-row .ic { color: var(--muted); }
.civic-help-card { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 12px; padding: 10px 11px; background: color-mix(in srgb, var(--accent) 8%, var(--surface)); border: 1px solid color-mix(in srgb, var(--accent) 25%, var(--border)); border-radius: 8px; }
.civic-help-card strong { display: block; font-size: 9.5px; }
.civic-help-card span { display: block; font-size: 7.5px; color: var(--muted); margin-top: 1px; }
.civic-help-card .ic { color: var(--accent); }

/* Wayfinding */
.variant-wayfinding { background: var(--bg); }
.civic-route { background: var(--accent); color: var(--on-accent); font-family: var(--font-mono); font-size: 13px; font-weight: 700; padding: 5px 9px; border-radius: 4px; }
.variant-wayfinding .civic-head { border-bottom: 5px solid var(--accent); padding-bottom: 9px; }
.variant-wayfinding .civic-brand { font-family: var(--font-display); text-transform: uppercase; letter-spacing: .01em; }
.variant-wayfinding .civic-title { font-family: var(--font-display); }
.civic-way-title { font-family: var(--font-display); font-size: 34px; line-height: .96; letter-spacing: -.03em; text-transform: uppercase; margin: 6px 0 10px; }
.civic-departures { display: flex; flex-direction: column; border-top: 2px solid var(--text); }
.civic-departure { display: grid; grid-template-columns: 60px 1fr auto; align-items: baseline; gap: 10px; padding: 9px 0; border-bottom: 1px solid var(--border); }
.civic-departure span { font-family: var(--font-mono); font-size: 21px; font-weight: 600; letter-spacing: -.03em; }
.civic-departure.next span { color: var(--accent); }
.civic-departure strong { font-size: 9.5px; font-weight: 650; }
.civic-departure em { font-family: var(--font-mono); font-style: normal; font-size: 7px; color: var(--muted); }
.civic-stops { margin-top: 12px; border-left: 1px solid var(--border); padding-left: 12px; }
.civic-stop { display: grid; grid-template-columns: 10px 1fr auto; align-items: center; gap: 7px; padding: 5px 0; position: relative; }
.civic-stop-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--surface); border: 1px solid var(--border); margin-left: -16px; }
.civic-stop-dot.on { background: var(--accent); border-color: var(--accent); }
.civic-stop strong { font-size: 9px; font-weight: 600; }
.civic-stop em { font-family: var(--font-mono); font-style: normal; font-size: 7px; color: var(--muted); }
.civic-alert { margin-top: 10px; padding: 7px 8px; background: var(--surface); border: 1px solid var(--border); font-size: 7.5px; color: var(--muted); display: flex; align-items: center; gap: 5px; }
.civic-alert .ic { color: var(--warning); flex: none; }
.civic-alert u { color: var(--accent); }

/* Civic detail */
.civic-detail { background: var(--bg); }
.civic-detail-head { display: flex; align-items: center; justify-content: space-between; padding: 0 14px; font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .06em; color: var(--muted); text-transform: uppercase; }
.civic-detail-head .icon-btn { width: 30px; height: 30px; }
.civic-detail-main { padding: 8px 22px 0; overflow: hidden; }
.civic-detail-main h2 { font-family: var(--font-display); font-size: 31px; line-height: 1; letter-spacing: -.03em; margin: 4px 0 4px; }
.civic-detail-sub { margin: 0 0 12px; font-size: 9.5px; color: var(--muted); }
.civic-steps { display: flex; gap: 4px; margin-bottom: 12px; }
.civic-step { flex: 1; display: flex; flex-direction: column; gap: 4px; border-top: 3px solid var(--border); padding-top: 5px; }
.civic-step.on { border-color: var(--accent); }
.civic-step span { width: 16px; height: 16px; border-radius: 50%; display: grid; place-items: center; background: var(--border); color: var(--muted); font-family: var(--font-mono); font-size: 6.5px; }
.civic-step.on span { background: var(--accent); color: var(--on-accent); }
.civic-step strong { font-size: 6.5px; font-weight: 600; color: var(--muted); letter-spacing: .02em; }
.civic-detail-card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 10px 11px; }
.civic-detail-card-head { display: flex; justify-content: space-between; align-items: baseline; padding-bottom: 7px; border-bottom: 1px solid var(--border); }
.civic-detail-card-head strong { font-size: 9.5px; }
.civic-detail-card-head span { font-family: var(--font-mono); font-size: 7px; color: var(--muted); }
.civic-check { display: flex; align-items: center; gap: 6px; padding-top: 6px; font-size: 8.5px; }
.civic-check .ic { color: var(--success); }
.civic-body { font-size: 8.5px; line-height: 1.5; color: var(--muted); margin: 10px 0; }
.civic-plain { border-left: 3px solid var(--accent); padding: 2px 0 2px 9px; }
.civic-plain strong { display: block; font-size: 8.5px; }
.civic-plain p { margin: 2px 0 0; font-size: 8px; line-height: 1.45; color: var(--muted); }
.civic-detail-action { flex: none; padding: 9px 20px 12px; border-top: 1px solid var(--border); }
.civic-detail-action .btn { width: 100%; }
.civic-detail-action span { display: block; text-align: center; margin-top: 5px; font-family: var(--font-mono); font-size: 6.5px; color: var(--muted); }
.variant-wayfinding.civic-detail .civic-detail-main h2 { text-transform: uppercase; }
`;
