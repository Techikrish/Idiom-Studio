export const PLAYGROUND_CSS = `
/* Playground */
.play { background: var(--bg); }
.play-hero { flex: none; height: 356px; position: relative; overflow: hidden; color: var(--on-accent); background: linear-gradient(145deg, var(--accent), color-mix(in srgb, var(--accent) 74%, var(--text))); border-radius: 0 0 28px 28px; padding-bottom: 18px; }
.play-hero .statusbar { color: var(--on-accent); }
.play-hero::before { content: ""; position: absolute; right: -40px; top: 84px; width: 190px; height: 190px; border-radius: 44% 56% 60% 40%; background: color-mix(in srgb, var(--on-accent) 12%, transparent); transform: rotate(18deg); }
.play-hero::after { content: ""; position: absolute; left: -26px; bottom: 26px; width: 120px; height: 120px; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--on-accent) 28%, transparent); }
.play-top { display: flex; align-items: center; justify-content: space-between; padding: 0 20px; position: relative; z-index: 2; }
.play-brand { font-family: var(--font-display); font-size: 17px; font-weight: 800; letter-spacing: -.02em; }
.play-hero-copy { position: relative; z-index: 2; padding: 20px 22px 0; }
.play-kicker { font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .14em; text-transform: uppercase; opacity: .82; }
.play-hero h2 { font-family: var(--font-display); font-size: 41px; line-height: .94; letter-spacing: -.045em; font-weight: 800; margin: 7px 0 7px; max-width: 270px; }
.play-hero-copy p { margin: 0; font-size: 10px; opacity: .86; }
.play-crew { display: flex; align-items: center; gap: 7px; margin-top: 12px; font-size: 8.5px; font-family: var(--font-mono); letter-spacing: .04em; }
.play-crew .avatar { border-color: color-mix(in srgb, var(--on-accent) 60%, transparent); }
.play-cta { position: absolute; left: 20px; right: 20px; bottom: 18px; height: 49px; border-radius: 15px; background: var(--surface); color: var(--text); display: flex; align-items: center; justify-content: center; gap: 7px; font-size: 12px; font-weight: 750; box-shadow: 0 7px 0 color-mix(in srgb, var(--text) 18%, transparent); z-index: 3; }
.play-sticker { position: absolute; right: 18px; top: 96px; z-index: 2; width: 54px; height: 54px; border-radius: 50%; display: grid; place-items: center; background: var(--surface); color: var(--accent); font-family: var(--font-mono); font-size: 8px; font-weight: 700; letter-spacing: .1em; transform: rotate(9deg); box-shadow: 0 4px 0 color-mix(in srgb, var(--text) 16%, transparent); border: 2px dashed color-mix(in srgb, var(--accent) 40%, transparent); }
.play-main { padding: 13px 18px 0; display: flex; flex-direction: column; }
.play-section { display: flex; justify-content: space-between; margin-bottom: 7px; font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
.play-cards { display: grid; gap: 8px; }
.play-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 10px 12px; box-shadow: 0 4px 12px rgba(30,24,12,.05); }
.play-card.tilt-1 { transform: rotate(-1deg); }
.play-card.tilt-2 { transform: rotate(1.2deg); }
.play-time { font-family: var(--font-mono); font-size: 8px; letter-spacing: .06em; color: var(--accent); font-weight: 700; }
.play-card h3 { font-family: var(--font-display); font-size: 16px; line-height: 1.1; letter-spacing: -.02em; font-weight: 750; margin: 2px 0 3px; }
.play-card p { margin: 0; font-size: 8.5px; color: var(--muted); }
.play-card-foot { display: flex; align-items: center; gap: 7px; margin-top: 7px; font-family: var(--font-mono); font-size: 7px; color: var(--muted); }
.play-card-foot .avatar { width: 21px; height: 21px; font-size: 7px; border-width: 1.5px; }
.play-card-foot .avatar + .avatar { margin-left: -7px; }

/* Sticker album */
.variant-sticker-album { background: var(--bg); }
.variant-sticker-album .play-hero { background: var(--surface); color: var(--text); border-radius: 0; height: 342px; }
.variant-sticker-album .play-hero .statusbar { color: var(--text); }
.variant-sticker-album .play-hero::before { background: color-mix(in srgb, var(--accent) 10%, transparent); border-radius: 24px; transform: rotate(-6deg); }
.variant-sticker-album .play-hero::after { border: 1px dashed var(--border); border-radius: 24px; }
.variant-sticker-album .play-kicker { color: var(--accent); opacity: 1; }
.variant-sticker-album .play-hero h2 { font-weight: 650; }
.variant-sticker-album .play-crew { color: var(--muted); }
.variant-sticker-album .play-crew .avatar { border-color: var(--surface); }
.variant-sticker-album .play-cta { background: var(--accent); color: var(--on-accent); box-shadow: 0 5px 0 color-mix(in srgb, var(--accent) 55%, var(--text)); }
.variant-sticker-album .play-sticker { background: var(--warning); color: #201503; transform: rotate(-11deg); border-style: solid; }
.variant-sticker-album .play-card { border: 0; box-shadow: 0 8px 22px rgba(40,30,14,.12); position: relative; }
.variant-sticker-album .play-card::before { content: ""; position: absolute; top: -7px; left: 50%; width: 58px; height: 15px; background: color-mix(in srgb, var(--warning) 55%, transparent); transform: translateX(-50%) rotate(-2deg); opacity: .8; }
.variant-sticker-album .play-card:nth-child(2)::before { transform: translateX(-50%) rotate(3deg); }
.variant-sticker-album .play-main { padding-top: 18px; }

/* Arcade */
.variant-arcade { background: var(--bg); }
.variant-arcade .play-hero { background: #090b09; color: var(--on-accent); height: 340px; border-radius: 0; }
.variant-arcade .play-hero::before { width: 220px; height: 220px; border-radius: 0; background: repeating-linear-gradient(0deg, transparent 0 9px, color-mix(in srgb, var(--accent) 16%, transparent) 9px 10px), repeating-linear-gradient(90deg, transparent 0 9px, color-mix(in srgb, var(--accent) 16%, transparent) 9px 10px); transform: perspective(220px) rotateX(56deg); right: -20px; top: 108px; }
.variant-arcade .play-hero::after { border-radius: 0; border-color: color-mix(in srgb, var(--accent) 35%, transparent); width: 150px; height: 150px; }
.variant-arcade .play-brand, .variant-arcade .play-kicker, .variant-arcade .play-hero h2 { font-family: var(--font-mono); text-transform: uppercase; }
.variant-arcade .play-hero h2 { font-size: 35px; letter-spacing: -.03em; }
.variant-arcade .play-cta { background: var(--accent); color: var(--on-accent); box-shadow: 0 0 24px color-mix(in srgb, var(--accent) 25%, transparent); border-radius: 4px; }
.variant-arcade .play-sticker { background: var(--bg); color: var(--accent); border-style: solid; border-radius: 4px; box-shadow: 0 0 20px color-mix(in srgb, var(--accent) 18%, transparent); }

/* Playground detail */
.play-detail { background: var(--bg); }
.play-detail-head { display: flex; align-items: center; justify-content: space-between; padding: 0 16px; font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
.play-detail-head .icon-btn { width: 30px; height: 30px; }
.play-detail-main { padding: 10px 22px 0; overflow: hidden; }
.play-big-time { font-family: var(--font-mono); font-size: 58px; line-height: .9; letter-spacing: -.06em; color: var(--accent); font-weight: 650; }
.play-detail-main h2 { font-family: var(--font-display); font-size: 34px; line-height: .98; letter-spacing: -.035em; font-weight: 780; margin: 8px 0 6px; }
.play-detail-sub { margin: 0; font-size: 10px; line-height: 1.45; color: var(--muted); max-width: 285px; }
.play-people { display: flex; align-items: center; gap: 8px; margin: 14px 0; font-family: var(--font-mono); font-size: 8px; color: var(--muted); }
.play-info { border-top: 1px solid var(--border); }
.play-info div { display: flex; justify-content: space-between; gap: 12px; padding: 9px 0; border-bottom: 1px solid var(--border); }
.play-info span { font-family: var(--font-mono); font-size: 7px; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }
.play-info strong { font-size: 9.5px; font-weight: 600; }
.play-note { margin-top: 12px; display: flex; gap: 6px; align-items: flex-start; font-size: 8.5px; line-height: 1.4; color: var(--muted); border-left: 2px solid var(--accent); padding-left: 8px; }
.play-note .ic { color: var(--accent); }
.play-detail-action { flex: none; display: flex; gap: 8px; padding: 9px 18px 14px; border-top: 1px solid var(--border); }
.play-detail-action .btn.primary { flex: 1.5; }
.play-detail-action .btn.ghost { flex: 1; }
.variant-arcade.play-detail .play-big-time { font-family: var(--font-mono); color: var(--accent); text-shadow: 0 0 24px color-mix(in srgb, var(--accent) 22%, transparent); }
.variant-sticker-album.play-detail .play-detail-main { background: var(--surface); margin: 0 10px; border: 1px solid var(--border); border-radius: 18px; transform: rotate(-.7deg); padding-top: 14px; }
`;
