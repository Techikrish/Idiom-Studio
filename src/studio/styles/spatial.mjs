export const SPATIAL_CSS = `
/* Spatial */
.sp { background: var(--bg); }
.sp-canvas { position: relative; flex: 1; min-height: 0; overflow: hidden; background: color-mix(in srgb, var(--accent) 5%, var(--bg)); }
.map-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.map-svg .contours path { fill: none; stroke: color-mix(in srgb, var(--text) 15%, transparent); stroke-width: .8; }
.map-svg .roads .road { fill: none; stroke: color-mix(in srgb, var(--surface) 82%, transparent); stroke-width: 6; }
.map-svg .roads .road.major { stroke-width: 9; }
.map-svg .roads { filter: drop-shadow(0 1px 0 color-mix(in srgb, var(--text) 12%, transparent)); }
.map-svg .waters path { fill: none; stroke: color-mix(in srgb, var(--accent) 34%, transparent); stroke-width: 9; opacity: .55; }
.map-svg .blocks rect { fill: color-mix(in srgb, var(--surface) 44%, transparent); stroke: color-mix(in srgb, var(--text) 9%, transparent); stroke-width: .6; }
.sp .statusbar { position: absolute; top: 0; left: 0; right: 0; color: var(--text); z-index: 9; }
.sp-top { position: absolute; top: 50px; left: 16px; right: 16px; display: flex; align-items: center; gap: 8px; z-index: 10; }
.sp-search { flex: 1; height: 40px; border-radius: 12px; background: color-mix(in srgb, var(--surface) 93%, transparent); box-shadow: 0 6px 20px rgba(22,32,26,.12); display: flex; align-items: center; gap: 7px; padding: 0 13px; font-size: 10px; color: var(--muted); backdrop-filter: blur(8px); }
.sp-chips { position: absolute; top: 100px; left: 16px; right: 16px; display: flex; gap: 6px; z-index: 10; }
.sp-chips .chip { height: 26px; padding: 0 10px; font-size: 8.5px; box-shadow: 0 2px 8px rgba(22,32,26,.05); }
.sp-pin { position: absolute; z-index: 6; display: flex; align-items: center; gap: 4px; font-size: 8px; font-weight: 700; color: var(--text); }
.sp-pin-dot { width: 13px; height: 13px; border-radius: 50%; background: var(--accent); border: 2px solid var(--surface); box-shadow: 0 2px 8px rgba(20,30,24,.28); }
.sp-pin-label { background: var(--surface); padding: 3px 7px; border-radius: 5px; box-shadow: 0 2px 8px rgba(20,30,24,.15); white-space: nowrap; }
.sp-pin.p1 { left: 18%; top: 37%; }
.sp-pin.p2 { right: 12%; top: 51%; }
.sp-pin.p3 { right: 25%; top: 29%; }
.sp-pin.p3 .sp-pin-dot { background: var(--warning); }
.sp-compass { position: absolute; right: 16px; bottom: 16px; width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center; background: var(--surface); color: var(--muted); box-shadow: 0 4px 14px rgba(20,30,24,.15); z-index: 6; }
.sp-map-label { position: absolute; z-index: 4; font-family: var(--font-mono); font-size: 6.5px; letter-spacing: .18em; color: color-mix(in srgb, var(--text) 50%, transparent); }
.sp-map-label.l1 { left: 22%; top: 22%; transform: rotate(-4deg); }
.sp-map-label.l2 { left: 16%; bottom: 28%; transform: rotate(3deg); }
.sp-sheet { flex: none; position: relative; z-index: 11; margin-top: -22px; padding: 6px 18px 0; background: var(--surface); border-radius: 22px 22px 0 0; box-shadow: 0 -12px 34px rgba(22,32,26,.12); }
.sp-grabber { width: 32px; height: 4px; border-radius: 2px; background: var(--border); margin: 0 auto 8px; }
.sp-sheet-head { display: flex; justify-content: space-between; gap: 10px; align-items: flex-start; }
.sp-kicker { font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .13em; text-transform: uppercase; color: var(--accent); font-weight: 700; }
.sp-sheet h2 { font-family: var(--font-display); font-size: 25px; line-height: 1.05; letter-spacing: -.025em; font-weight: 650; margin: 3px 0 2px; }
.sp-sheet-head p { margin: 0; font-size: 9.5px; color: var(--muted); }
.sp-map-btn { width: 36px; height: 36px; border-radius: 50%; background: var(--accent); color: var(--on-accent); display: grid; place-items: center; flex: none; }
.sp-rows { margin-top: 7px; }
.sp-row { display: grid; grid-template-columns: 20px 1fr auto; align-items: center; gap: 7px; padding: 7px 0; border-top: 1px solid var(--border); }
.sp-row-num { width: 18px; height: 18px; border-radius: 50%; border: 1px solid var(--border); display: grid; place-items: center; font-family: var(--font-mono); font-size: 7px; color: var(--muted); }
.sp-row div { min-width: 0; }
.sp-row strong { display: block; font-size: 10.5px; font-weight: 650; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sp-row span { display: block; font-size: 8px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sp-row em { font-family: var(--font-mono); font-style: normal; font-size: 8px; color: var(--accent); white-space: nowrap; }

/* Spatial detail */
.sp-detail { background: var(--bg); display: flex; flex-direction: column; height: 100%; }
.sp-detail-map { height: 286px; flex: none; position: relative; overflow: hidden; background: color-mix(in srgb, var(--accent) 6%, var(--bg)); }
.sp-detail-top { position: absolute; top: 48px; left: 16px; right: 16px; display: flex; justify-content: space-between; z-index: 9; }
.sp-detail-map .statusbar { position: absolute; top: 0; left: 0; right: 0; color: var(--text); z-index: 9; }
.sp-route-line { position: absolute; left: 50%; top: 34%; width: 42%; height: 40%; z-index: 5; }
.sp-route-line .dot { position: absolute; width: 10px; height: 10px; border-radius: 50%; background: var(--accent); border: 2px solid var(--surface); box-shadow: 0 1px 5px rgba(0,0,0,.2); }
.sp-route-line .dot.start { left: -3px; top: 46%; }
.sp-route-line .dot.end { right: -3px; top: 0; }
.sp-route-line .line { position: absolute; left: 4px; top: 10%; width: 100%; height: 70%; border-top: 2px dashed var(--accent); transform: rotate(-31deg); transform-origin: left center; opacity: .85; }
.sp-detail-pin { position: absolute; left: 23%; top: 58%; z-index: 6; display: flex; align-items: center; gap: 4px; background: var(--surface); color: var(--text); padding: 4px 7px; border-radius: 5px; font-family: var(--font-mono); font-size: 7px; box-shadow: 0 2px 8px rgba(20,30,24,.16); }
.sp-detail-pin .ic { color: var(--accent); }
.sp-detail-sheet { flex: 1; min-height: 0; margin-top: -24px; position: relative; z-index: 10; background: var(--surface); border-radius: 24px 24px 0 0; padding: 6px 20px 0; box-shadow: 0 -10px 30px rgba(22,32,26,.12); }
.sp-detail-head { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
.sp-detail-head h2 { font-family: var(--font-display); font-size: 27px; line-height: 1.05; letter-spacing: -.025em; font-weight: 650; margin: 3px 0 3px; }
.sp-detail-head p { margin: 0; font-size: 9.5px; color: var(--muted); }
.sp-distance { text-align: right; flex: none; padding-top: 3px; }
.sp-distance strong { display: block; font-family: var(--font-mono); font-size: 23px; line-height: 1; font-weight: 550; color: var(--accent); }
.sp-distance span { font-family: var(--font-mono); font-size: 7px; color: var(--muted); letter-spacing: .1em; text-transform: uppercase; }
.sp-facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); margin-top: 10px; padding: 8px 0; }
.sp-facts span { display: block; font-family: var(--font-mono); font-size: 6.5px; color: var(--muted); text-transform: uppercase; letter-spacing: .08em; }
.sp-facts strong { display: block; font-size: 10px; font-weight: 600; margin-top: 2px; }
.sp-body { font-size: 9.5px; line-height: 1.5; color: var(--muted); margin: 9px 0 0; }
.sp-notes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 10px; padding-top: 8px; border-top: 1px solid var(--border); }
.sp-notes span { display: block; font-family: var(--font-mono); font-size: 6.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
.sp-notes strong { display: block; font-size: 8.5px; font-weight: 600; margin-top: 2px; }
.sp-trailhead { display: flex; align-items: center; gap: 8px; margin-top: 9px; padding: 8px 9px; background: color-mix(in srgb, var(--accent) 6%, var(--surface)); border: 1px solid var(--border); border-radius: var(--radius-sm); }
.sp-trailhead-icon { width: 26px; height: 26px; border-radius: 50%; background: var(--accent); color: var(--on-accent); display: grid; place-items: center; flex: none; }
.sp-trailhead div { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
.sp-trailhead strong { font-size: 9.5px; font-weight: 650; }
.sp-trailhead div span { font-size: 7.5px; color: var(--muted); }
.sp-trailhead em { font-family: var(--font-mono); font-style: normal; font-size: 6.5px; color: var(--success); text-transform: uppercase; }
.sp-actions { display: flex; gap: 8px; margin-top: 10px; }
.sp-actions .btn { flex: 1; height: 40px; font-size: 10.5px; }
.sp-actions .btn.ghost { flex: .55; }

/* Variants */
.variant-trail-map .sp-canvas { background: color-mix(in srgb, var(--accent) 8%, var(--bg)); }
.variant-trail-map .map-svg .contours path { stroke: color-mix(in srgb, var(--accent) 30%, transparent); }
.variant-trail-map .map-svg .waters path { stroke: color-mix(in srgb, var(--accent) 22%, transparent); }
.variant-city-guide .sp-sheet { border-radius: 0; margin-top: 0; background: var(--bg); }
.variant-city-guide .sp-sheet h2 { font-family: var(--font-display); font-size: 31px; text-transform: uppercase; letter-spacing: -.02em; }
.variant-city-guide .sp-map-btn { border-radius: 4px; }
.variant-city-guide .map-svg .blocks rect { fill: color-mix(in srgb, var(--surface) 72%, transparent); }
.variant-studio-canvas .sp-canvas { background: color-mix(in srgb, var(--elev) 80%, var(--bg)); }
.variant-studio-canvas .map-svg { opacity: .45; }
.variant-studio-canvas .sp-search { border-radius: 999px; box-shadow: 0 8px 24px rgba(22,32,26,.1); }
.variant-studio-canvas .sp-map-btn { border-radius: 12px; }
.variant-city-guide.sp-detail .sp-detail-sheet { border-radius: 0; }
.variant-studio-canvas.sp-detail .sp-detail-sheet { border-radius: 22px; margin: 0 12px -12px; }
`;
