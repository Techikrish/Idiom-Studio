export const INSTRUMENT_CSS = `
/* Instrument */
.inst { background: var(--bg); }
.inst-head { display: flex; align-items: center; justify-content: space-between; padding: 2px 20px 3px; }
.inst-brand { font-family: var(--font-display); font-size: 17px; font-weight: 750; letter-spacing: -.03em; }
.inst-head-actions { display: flex; align-items: center; gap: 5px; color: var(--muted); }
.inst-live { font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .12em; }
.live-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--success); box-shadow: 0 0 0 3px color-mix(in srgb, var(--success) 16%, transparent); }
.inst-main { padding: 9px 20px 0; display: flex; flex-direction: column; }
.inst-label { font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .13em; text-transform: uppercase; color: var(--muted); }
.inst-total { font-family: var(--font-body); font-size: 11px; color: var(--muted); margin-top: 10px; }
.inst-value { font-family: var(--font-mono); font-variant-numeric: tabular-nums; font-size: 39px; line-height: 1; letter-spacing: -.05em; font-weight: 620; margin: 3px 0 6px; }
.inst-delta { display: flex; align-items: baseline; gap: 8px; font-family: var(--font-mono); font-size: 8.5px; color: var(--muted); }
.inst-delta .up { color: var(--success); font-weight: 700; }
.inst-mono { font-family: var(--font-mono); }
.chart { width: 100%; height: 110px; margin: 8px 0 0; overflow: visible; }
.chart-grid line { stroke: var(--border); stroke-width: 1; stroke-dasharray: 2 4; }
.chart-area { fill: color-mix(in srgb, var(--accent) 11%, transparent); }
.chart-line { fill: none; stroke: var(--accent); stroke-width: 2; stroke-linecap: round; }
.chart-dot { fill: var(--accent); stroke: var(--surface); stroke-width: 1.5; }
.inst-rail { display: flex; height: 6px; gap: 2px; margin-top: 4px; }
.inst-rail .segment { flex: 1; background: var(--border); border-radius: 2px; }
.inst-rail .segment:first-child { border-radius: 3px 0 0 3px; }
.inst-rail .segment:last-child { border-radius: 0 3px 3px 0; }
.inst-rail .segment.on { background: var(--accent); flex: 2.2; }
.inst-rail .segment.warn { background: var(--warning); flex: .5; }
.inst-rail-labels { display: flex; justify-content: space-between; gap: 4px; margin-top: 4px; font-family: var(--font-mono); font-size: 6px; letter-spacing: .02em; color: var(--muted); }
.inst-section { display: flex; align-items: center; justify-content: space-between; margin: 14px 0 2px; padding-bottom: 5px; border-bottom: 1px solid var(--text); font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .12em; text-transform: uppercase; }
.inst-section span:last-child { display: flex; align-items: center; gap: 2px; color: var(--muted); }
.inst-row { display: grid; grid-template-columns: 28px 1fr auto; align-items: center; gap: 8px; padding: 8px 0; border-bottom: 1px solid var(--border); }
.inst-mark { width: 26px; height: 26px; border-radius: 7px; display: grid; place-items: center; background: color-mix(in srgb, var(--accent) 12%, var(--surface)); color: var(--accent); font-family: var(--font-mono); font-size: 11px; font-weight: 700; }
.inst-row-copy { min-width: 0; display: flex; flex-direction: column; gap: 1px; }
.inst-row-copy strong { font-size: 10.5px; font-weight: 650; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.inst-row-copy span { font-size: 8px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.inst-row-value { text-align: right; font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
.inst-row-value strong { display: block; font-size: 10.5px; font-weight: 600; }
.inst-row-value span { display: block; font-size: 7.5px; color: var(--success); }
.inst-activity { display: flex; flex-direction: column; }
.inst-activity div { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding: 8px 0; border-bottom: 1px solid var(--border); }
.inst-activity span { font-size: 8.5px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.inst-activity em { font-family: var(--font-mono); font-style: normal; font-size: 9px; white-space: nowrap; }

/* Flight deck */
.variant-flight-deck .inst-brand,
.variant-flight-deck .inst-label,
.variant-flight-deck .inst-section,
.variant-flight-deck .inst-row-copy strong { font-family: var(--font-mono); text-transform: uppercase; letter-spacing: .06em; }
.variant-flight-deck .inst-brand { font-size: 13px; letter-spacing: .14em; }
.variant-flight-deck .inst-value { font-size: 37px; color: var(--accent); }
.variant-flight-deck .inst-rail { height: 12px; gap: 3px; }
.variant-flight-deck .inst-rail .segment { border-radius: 1px; }
.variant-flight-deck .inst-section { border-bottom-color: var(--accent); }
.variant-flight-deck .inst-row { border-bottom-style: dashed; }
.variant-flight-deck .inst-mark { border-radius: 2px; }

/* Laboratory */
.variant-laboratory { background-image: linear-gradient(to right, color-mix(in srgb, var(--border) 36%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--border) 36%, transparent) 1px, transparent 1px); background-size: 24px 24px; }
.variant-laboratory .inst-head { background: color-mix(in srgb, var(--surface) 82%, transparent); padding-bottom: 7px; }
.variant-laboratory .inst-main { background: color-mix(in srgb, var(--surface) 70%, transparent); margin: 0 10px; padding: 12px 12px 0; border-left: 1px solid var(--border); border-right: 1px solid var(--border); }
.variant-laboratory .inst-value { font-size: 33px; color: var(--accent); }
.variant-laboratory .inst-rail { height: 3px; }

/* Instrument detail */
.inst-detail-head { display: flex; align-items: center; justify-content: space-between; padding: 0 14px; }
.inst-detail-head .icon-btn { width: 30px; height: 30px; }
.inst-detail-main { padding: 12px 22px 0; display: flex; flex-direction: column; }
.inst-detail-name { font-family: var(--font-display); font-size: 23px; line-height: 1.08; font-weight: 650; letter-spacing: -.025em; }
.inst-detail-value { font-family: var(--font-mono); font-variant-numeric: tabular-nums; font-size: 37px; line-height: 1; letter-spacing: -.045em; font-weight: 620; margin: 12px 0 5px; }
.inst-detail-main .chart { height: 150px; margin-top: 10px; }
.inst-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 0 18px; border-top: 1px solid var(--text); margin-top: 8px; }
.inst-stats div { display: flex; flex-direction: column; gap: 2px; padding: 8px 0; border-bottom: 1px solid var(--border); }
.inst-stats span { font-family: var(--font-mono); font-size: 7px; letter-spacing: .09em; text-transform: uppercase; color: var(--muted); }
.inst-stats strong { font-family: var(--font-mono); font-size: 10.5px; font-weight: 500; font-variant-numeric: tabular-nums; }
.inst-note { display: flex; gap: 8px; align-items: flex-start; margin-top: 10px; padding: 9px 10px; background: color-mix(in srgb, var(--accent) 7%, var(--surface)); border: 1px solid var(--border); border-radius: var(--radius-sm); }
.inst-note-mark { width: 14px; height: 14px; border-radius: 50%; background: var(--accent); color: var(--on-accent); display: grid; place-items: center; font-family: var(--font-mono); font-size: 8px; flex: none; }
.inst-note p { margin: 0; font-size: 8.5px; line-height: 1.4; color: var(--muted); }
.inst-actions { flex: none; display: flex; gap: 8px; padding: 10px 20px 14px; border-top: 1px solid var(--border); }
.inst-actions .btn { flex: 1; }
.variant-flight-deck .inst-detail-name { font-family: var(--font-mono); text-transform: uppercase; font-size: 18px; letter-spacing: .02em; }
.variant-flight-deck .inst-detail-value { color: var(--accent); }
.variant-laboratory .inst-detail-main { background: color-mix(in srgb, var(--surface) 70%, transparent); margin: 0 10px; padding: 14px 14px 0; }
`;
