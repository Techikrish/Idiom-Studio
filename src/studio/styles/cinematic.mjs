export const CINEMATIC_CSS = `
/* Cinematic */
.cine { background: var(--bg); }
.cine-hero { height: 462px; flex: none; display: flex; flex-direction: column; justify-content: space-between; position: relative; color: #fff; padding-bottom: 20px; }
.cine-hero .statusbar { position: relative; z-index: 3; }
.cine-top { display: flex; align-items: center; justify-content: space-between; padding: 1px 16px 0 22px; position: relative; z-index: 3; }
.cine-brand { font-family: var(--font-display); font-size: 12px; letter-spacing: .24em; text-transform: uppercase; }
.cine-copy { position: relative; z-index: 3; padding: 0 22px; }
.cine-kicker { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: .16em; color: rgba(255,255,255,.82); }
.cine-title { font-family: var(--font-display); font-size: 55px; line-height: .9; letter-spacing: -.05em; font-weight: 640; margin: 7px 0 10px; color: #fff; text-shadow: 0 4px 26px rgba(0,0,0,.3); }
.cine-title em { display: block; font-style: normal; color: color-mix(in srgb, var(--accent) 68%, #fff); }
.cine-copy p { margin: 0; font-size: 10.5px; color: rgba(255,255,255,.84); }
.cine-main { padding: 12px 20px 0; display: flex; flex-direction: column; }
.cine-cta { width: 100%; height: 43px; flex: none; }
.cine-section { display: flex; justify-content: space-between; margin: 13px 0 7px; font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .13em; text-transform: uppercase; color: var(--muted); }
.cine-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.cine-card { min-width: 0; }
.cine-card .art { height: 84px; border-radius: var(--radius-sm); }
.cine-card-copy { display: block; margin-top: 5px; }
.cine-card-copy span { display: block; font-family: var(--font-mono); font-size: 6.5px; color: var(--accent); letter-spacing: .04em; }
.cine-card-copy strong { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-family: var(--font-body); font-size: 9.5px; line-height: 1.2; font-weight: 600; margin-top: 2px; }

/* Gallery */
.variant-gallery { background: var(--surface); }
.variant-gallery .cine-hero { height: 440px; color: var(--text); }
.variant-gallery .cine-hero .statusbar.on-art,
.variant-gallery .cine-copy { color: var(--text); }
.variant-gallery .cine-hero .statusbar.on-art { color: var(--text); }
.variant-gallery .cine-brand { color: var(--text); }
.variant-gallery .cine-title { color: var(--text); font-family: var(--font-display); font-weight: 500; font-size: 45px; text-shadow: none; letter-spacing: -.03em; }
.variant-gallery .cine-title em { color: var(--accent); font-style: italic; }
.variant-gallery .cine-kicker { color: var(--muted); }
.variant-gallery .cine-copy p { color: var(--muted); }
.variant-gallery .art-cinematic { background: linear-gradient(160deg, color-mix(in srgb, var(--accent) 10%, #f3eee2), #ded5c2 60%, #c9bda7); }
.variant-gallery .art-cinematic::after { background: linear-gradient(to top, rgba(30,25,18,.18), transparent 45%); }
.variant-gallery .art-cinematic::before { border-color: rgba(30,25,18,.25); box-shadow: none; }
.variant-gallery .cine-main { padding-top: 16px; }
.variant-gallery .cine-cta { background: var(--text); color: var(--bg); }
.variant-gallery .cine-cards { gap: 14px; }
.variant-gallery .cine-card .art { height: 92px; }
.variant-gallery .cine-card-copy span { color: var(--muted); }
.variant-gallery .cine-section { border-bottom: 1px solid var(--border); padding-bottom: 5px; }

/* Nightclub */
.variant-nightclub { background: var(--bg); }
.variant-nightclub .cine-hero { height: 410px; }
.variant-nightclub .cine-brand { font-family: var(--font-mono); letter-spacing: .18em; }
.variant-nightclub .cine-title { font-family: var(--font-mono); font-size: 43px; line-height: .92; text-transform: uppercase; letter-spacing: -.03em; }
.variant-nightclub .cine-title em { color: var(--accent); text-shadow: 0 0 30px color-mix(in srgb, var(--accent) 55%, transparent); }
.variant-nightclub .cine-kicker { color: var(--accent); }
.variant-nightclub .cine-cta { background: var(--accent); color: var(--on-accent); }
.variant-nightclub .cine-cards { grid-template-columns: 1fr; gap: 0; }
.variant-nightclub .cine-card { display: grid; grid-template-columns: 54px 1fr; gap: 10px; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border); }
.variant-nightclub .cine-card .art { height: 48px; border-radius: 2px; }
.variant-nightclub .cine-card-copy { margin-top: 0; }
.variant-nightclub .cine-card-copy span { color: var(--accent); }

/* Cinematic detail */
.cine-detail { background: var(--bg); }
.cine-detail-hero { height: 432px; flex: none; position: relative; color: #fff; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: 15px; }
.cine-detail-caption { display: flex; justify-content: space-between; padding: 0 22px; position: relative; z-index: 3; font-family: var(--font-mono); font-size: 8px; letter-spacing: .14em; color: rgba(255,255,255,.82); }
.cine-detail-main { padding: 16px 22px 0; overflow: hidden; }
.cine-detail-main h2 { font-family: var(--font-display); font-size: 39px; line-height: .98; letter-spacing: -.04em; font-weight: 620; margin: 0 0 5px; }
.cine-meta { font-family: var(--font-mono); font-size: 8.5px; color: var(--muted); letter-spacing: .02em; }
.cine-detail-main p { font-size: 10px; line-height: 1.52; color: var(--muted); margin: 10px 0 12px; }
.cine-times { display: flex; gap: 7px; margin-bottom: 12px; }
.cine-meta-row { display: flex; gap: 16px; font-size: 9px; color: var(--muted); border-top: 1px solid var(--border); padding-top: 9px; }
.cine-meta-row span { display: flex; align-items: center; gap: 4px; }
.cine-detail-action { flex: none; display: flex; align-items: center; gap: 12px; padding: 10px 20px 14px; border-top: 1px solid var(--border); }
.cine-detail-action .btn { flex: 1; }
.cine-price { font-family: var(--font-mono); font-size: 13px; font-weight: 600; }
.variant-gallery.cine-detail .cine-detail-hero { height: 410px; }
.variant-gallery.cine-detail .cine-detail-caption { color: var(--text); }
.variant-gallery.cine-detail .cine-detail-main { text-align: left; }
.variant-gallery.cine-detail .cine-detail-main h2 { font-weight: 500; font-size: 34px; }
.variant-nightclub.cine-detail .cine-detail-hero { height: 380px; }
.variant-nightclub.cine-detail .cine-detail-main h2 { font-family: var(--font-mono); text-transform: uppercase; font-size: 30px; }
.variant-nightclub.cine-detail .cine-detail-action .btn { background: var(--accent); color: var(--on-accent); }
`;
