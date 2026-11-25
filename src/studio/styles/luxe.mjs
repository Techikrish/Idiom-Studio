export const LUXE_CSS = `
/* Luxe */
.luxe { background: var(--bg); }
.luxe-hero { height: 382px; flex: none; position: relative; color: #fff; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: 16px; }
.luxe-hero::after, .luxe-detail-hero::after { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none; background: linear-gradient(to bottom, rgba(24,18,10,.34), transparent 24%, transparent 66%, rgba(24,18,10,.5)); }
.luxe-top { display: flex; align-items: center; justify-content: space-between; padding: 0 16px 0 22px; position: relative; z-index: 3; }
.luxe-brand { font-family: var(--font-display); font-size: 13px; letter-spacing: .28em; text-transform: uppercase; }
.luxe-caption { position: relative; z-index: 3; display: flex; justify-content: space-between; padding: 0 22px; font-family: var(--font-mono); font-size: 7px; letter-spacing: .16em; color: rgba(255,255,255,.88); }
.luxe-main { padding: 15px 22px 0; display: flex; flex-direction: column; flex: 1; }
.luxe-main h2 { font-family: var(--font-display); font-size: 34px; line-height: 1; letter-spacing: -.025em; font-weight: 520; margin: 0 0 5px; }
.luxe-sub { margin: 0; font-family: var(--font-display); font-style: italic; font-size: 12px; color: var(--muted); }
.luxe-rule { height: 1px; background: var(--border); margin: 11px 0 2px; }
.luxe-item { display: grid; grid-template-columns: 42px 1fr auto; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--border); }
.luxe-thumb { width: 42px; height: 42px; border-radius: 1px; }
.luxe-item div:nth-child(2) { min-width: 0; }
.luxe-item strong { display: block; font-family: var(--font-display); font-size: 13px; font-weight: 520; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.luxe-item span { display: block; font-family: var(--font-mono); font-size: 7.5px; color: var(--muted); margin-top: 2px; }
.luxe-item .ic { color: var(--muted); }
.luxe-more { margin-top: auto; margin-bottom: 10px; align-self: flex-start; font-family: var(--font-mono); font-size: 8px; letter-spacing: .13em; text-transform: uppercase; color: var(--text); border-bottom: 1px solid var(--text) !important; padding-bottom: 3px !important; }

/* Concierge */
.variant-concierge .luxe-hero { height: 360px; }
.variant-concierge .luxe-main h2 { font-size: 35px; }
.variant-concierge .luxe-rule { background: var(--accent); height: 1px; }
.variant-concierge .luxe-item { border-bottom-color: color-mix(in srgb, var(--accent) 22%, var(--border)); }
.variant-concierge .luxe-thumb { width: 38px; height: 48px; }
.variant-concierge .luxe-item { grid-template-columns: 48px 1fr auto; }
.variant-concierge .luxe-more { color: var(--accent); border-color: var(--accent) !important; }

/* Boutique */
.variant-boutique .luxe-hero { height: 372px; background: var(--bg); }
.variant-boutique .luxe-hero::after, .variant-boutique.luxe-detail .luxe-detail-hero::after { display: none; }
.variant-boutique .art-luxe { border-radius: 48% 48% 0 0 / 26% 26% 0 0; margin: 0 28px; overflow: hidden; }
.variant-boutique .luxe-hero .luxe-brand, .variant-boutique .luxe-hero .luxe-caption { color: var(--text); }
.variant-boutique .luxe-hero .icon-btn.on-art { background: color-mix(in srgb, var(--text) 10%, transparent); color: var(--text); }
.variant-boutique .luxe-main h2 { font-weight: 600; }

/* Luxe detail */
.luxe-detail { background: var(--bg); }
.luxe-detail-hero { height: 354px; flex: none; position: relative; color: #fff; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: 14px; }
.luxe-detail-main { padding: 15px 22px 0; overflow: hidden; }
.luxe-detail-kicker { font-family: var(--font-mono); font-size: 7px; letter-spacing: .16em; text-transform: uppercase; color: var(--accent); }
.luxe-detail-main h2 { font-family: var(--font-display); font-size: 32px; line-height: 1; letter-spacing: -.02em; font-weight: 520; margin: 5px 0 3px; }
.luxe-price { font-family: var(--font-mono); font-size: 12px; }
.luxe-detail-main p { font-size: 9.5px; line-height: 1.5; color: var(--muted); margin: 10px 0 12px; }
.luxe-accordion { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); padding: 10px 0; font-size: 9px; }
.luxe-accordion:last-of-type { border-bottom: 1px solid var(--border); }
.luxe-accordion .ic { color: var(--muted); }
.luxe-related { margin-top: 14px; }
.luxe-related-label { font-family: var(--font-mono); font-size: 6.5px; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); margin-bottom: 7px; }
.luxe-related-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.luxe-related-card .art { height: 72px; }
.luxe-related-card strong { display: block; font-family: var(--font-display); font-size: 10px; font-weight: 520; margin-top: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.luxe-related-card span { display: block; font-family: var(--font-mono); font-size: 6.5px; color: var(--muted); }
.luxe-detail-action { flex: none; padding: 9px 20px 12px; border-top: 1px solid var(--border); }
.luxe-detail-action .btn { width: 100%; }
.luxe-ship { display: block; text-align: center; margin-top: 5px; font-family: var(--font-mono); font-size: 6.5px; letter-spacing: .06em; color: var(--muted); }
.variant-concierge.luxe-detail .luxe-detail-hero { height: 330px; }
.variant-concierge.luxe-detail .luxe-detail-kicker { color: var(--accent); }
.variant-boutique.luxe-detail .luxe-detail-hero { background: var(--bg); }
.variant-boutique.luxe-detail .art-luxe { border-radius: 48% 48% 0 0 / 28% 28% 0 0; margin: 0 24px; }
.variant-boutique.luxe-detail .luxe-caption { color: var(--text); }
.variant-boutique.luxe-detail .luxe-top .icon-btn.on-art { background: color-mix(in srgb, var(--text) 10%, transparent); color: var(--text); }
`;
