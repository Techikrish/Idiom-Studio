export const EDITORIAL_CSS = `
/* Editorial */
.ed { background: var(--bg); }
.ed-head { display: flex; align-items: baseline; justify-content: space-between; padding: 2px 22px 8px; }
.ed-brand { font-family: var(--font-display); font-size: 23px; font-weight: 650; letter-spacing: -.03em; line-height: 1; }
.ed-edition { font-family: var(--font-mono); font-size: 8px; letter-spacing: .13em; color: var(--muted); text-transform: uppercase; }
.ed-rule { height: 1px; background: var(--text); margin: 0 22px; opacity: .85; }
.ed-main { padding: 12px 22px 0; display: flex; flex-direction: column; }
.ed-kicker { font-size: 8px; letter-spacing: .16em; text-transform: uppercase; color: var(--accent); font-weight: 750; }
.ed-title { font-family: var(--font-display); font-size: 37px; line-height: .99; letter-spacing: -.04em; margin: 5px 0 7px; font-weight: 620; }
.ed-sub { font-size: 11.5px; line-height: 1.4; color: var(--muted); margin: 0 0 11px; max-width: 296px; }
.ed-art { height: 166px; position: relative; flex: none; }
.ed-art > .art, .ed-detail-art > .art { position: absolute; inset: 0; }
.ed-caption { position: absolute; right: 7px; bottom: 6px; z-index: 2; font-family: var(--font-mono); font-size: 6.5px; letter-spacing: .1em; color: rgba(255,255,255,.8); }
.ed-byline { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); padding: 7px 0; border-bottom: 1px solid var(--border); }
.ed-item { display: grid; grid-template-columns: 23px 1fr; gap: 7px; padding: 8px 0; border-bottom: 1px solid var(--border); }
.ed-num { font-family: var(--font-mono); font-size: 8px; color: var(--accent); padding-top: 2px; }
.ed-meta { font-family: var(--font-mono); font-size: 7px; letter-spacing: .1em; color: var(--muted); text-transform: uppercase; }
.ed-item h3 { font-family: var(--font-display); font-size: 14.5px; line-height: 1.12; letter-spacing: -.015em; margin: 2px 0 2px; font-weight: 620; }
.ed-item p { font-size: 9px; line-height: 1.35; color: var(--muted); margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.ed-more { margin-top: auto; margin-bottom: 10px; align-self: flex-start; display: inline-flex; align-items: center; gap: 6px; font-size: 9px; letter-spacing: .12em; text-transform: uppercase; font-weight: 700; color: var(--accent); border-bottom: 1px solid currentColor !important; padding-bottom: 2px !important; }

/* Broadsheet */
.variant-broadsheet .ed-title { font-size: 39px; }
.variant-broadsheet .ed-art { height: 176px; }
.variant-broadsheet .ed-item:first-child .ed-item-title { font-size: 15px; }

/* Field notes */
.variant-field-notes { background: var(--surface); }
.variant-field-notes .ed-main {
  background-image: repeating-linear-gradient(to bottom, transparent 0 27px, color-mix(in srgb, var(--border) 65%, transparent) 27px 28px);
  background-position: 0 10px;
}
.variant-field-notes .ed-brand { font-size: 20px; letter-spacing: .02em; }
.variant-field-notes .ed-title { font-size: 31px; line-height: 1.02; }
.variant-field-notes .ed-art { height: 118px; margin-top: 2px; }
.variant-field-notes .ed-item { grid-template-columns: 26px 1fr; border-bottom: 1px solid color-mix(in srgb, var(--border) 80%, transparent); }
.variant-field-notes .ed-num { border: 1px solid var(--border); width: 20px; height: 20px; border-radius: 50%; display: grid; place-items: center; padding: 0; }
.variant-field-notes .ed-kicker { letter-spacing: .18em; }
.variant-field-notes .ed-more { margin-bottom: 12px; }

/* Literary journal */
.variant-literary-journal .ed-head { justify-content: center; padding-top: 8px; }
.variant-literary-journal .ed-edition { display: none; }
.variant-literary-journal .ed-brand { text-align: center; font-size: 20px; letter-spacing: .16em; text-transform: uppercase; }
.variant-literary-journal .ed-rule { margin: 0 54px; }
.variant-literary-journal .ed-main { text-align: center; padding: 18px 28px 0; }
.variant-literary-journal .ed-title { font-size: 39px; line-height: 1.04; font-weight: 500; }
.variant-literary-journal .ed-sub { margin-left: auto; margin-right: auto; font-family: var(--font-display); font-style: italic; font-size: 13px; }
.variant-literary-journal .ed-art { height: 124px; margin: 4px 0 12px; }
.variant-literary-journal .ed-byline { justify-content: center; gap: 10px; }
.variant-literary-journal .ed-list { text-align: left; margin-top: 4px; }
.variant-literary-journal .ed-item { display: block; padding: 9px 0; }
.variant-literary-journal .ed-num { display: none; }
.variant-literary-journal .ed-item h3 { font-size: 14px; font-weight: 500; }
.variant-literary-journal .ed-more { align-self: center; margin-top: 10px; }

/* Editorial detail */
.ed-detail-main { padding: 8px 24px 0; overflow: hidden; }
.ed-detail-head { display: flex; align-items: center; justify-content: space-between; padding: 0 12px; }
.ed-detail-head .icon-btn { width: 30px; height: 30px; }
.ed-detail-brand { font-family: var(--font-display); font-size: 12px; letter-spacing: .16em; text-transform: uppercase; }
.ed-detail-title { font-family: var(--font-display); font-size: 38px; line-height: 1; letter-spacing: -.04em; font-weight: 620; margin: 6px 0 8px; }
.ed-detail-meta { display: flex; gap: 9px; font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .06em; color: var(--muted); text-transform: uppercase; }
.ed-detail-meta span + span::before { content: "·"; margin-right: 9px; }
.ed-detail-art { height: 146px; margin: 11px 0 10px; }
.ed-opener { font-family: var(--font-display); font-size: 13px; line-height: 1.52; margin: 0 0 8px; }
.ed-opener::first-letter { float: left; font-size: 42px; line-height: .82; padding: 3px 5px 0 0; font-weight: 600; color: var(--accent); }
.ed-detail-main p { font-family: var(--font-body); font-size: 10px; line-height: 1.52; color: var(--muted); margin: 0 0 8px; }
.ed-detail-main blockquote { font-family: var(--font-display); font-size: 17px; line-height: 1.28; font-style: italic; margin: 10px 0; padding: 8px 0 8px 12px; border-left: 2px solid var(--accent); color: var(--text); }
.ed-detail-main .ed-detail-meta + .ed-detail-art { margin-top: 8px; }
.ed-related-label { font-family: var(--font-mono); font-size: 7px; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); border-top: 1px solid var(--text); padding-top: 6px; margin-top: 9px; }
.ed-related { display: flex; flex-direction: column; gap: 2px; padding: 6px 0; border-bottom: 1px solid var(--border); }
.ed-related span { font-family: var(--font-mono); font-size: 6.5px; color: var(--accent); letter-spacing: .08em; }
.ed-related strong { font-family: var(--font-display); font-size: 11.5px; font-weight: 600; }
.ed-reading-bar { flex: none; height: 46px; border-top: 1px solid var(--border); display: flex; align-items: center; gap: 16px; padding: 0 20px; font-size: 9px; color: var(--muted); }
.ed-reading-bar > span:not(.ed-progress) { display: flex; align-items: center; gap: 4px; }
.ed-progress { margin-left: auto; width: 82px; height: 2px; background: var(--border); position: relative; }
.ed-progress i { position: absolute; left: 0; top: 0; bottom: 0; width: 36%; background: var(--accent); }

.variant-field-notes.ed-detail { background: var(--surface); }
.variant-field-notes .ed-detail-main { background-image: repeating-linear-gradient(to bottom, transparent 0 27px, color-mix(in srgb, var(--border) 55%, transparent) 27px 28px); background-position: 0 5px; }
.variant-field-notes .ed-detail-title { font-size: 32px; }
.variant-field-notes .ed-detail-art { height: 104px; }
.variant-literary-journal.ed-detail .ed-detail-main { text-align: center; padding: 14px 30px 0; }
.variant-literary-journal .ed-detail-title { font-size: 33px; font-weight: 500; line-height: 1.05; }
.variant-literary-journal .ed-detail-meta { justify-content: center; }
.variant-literary-journal .ed-detail-art { height: 116px; }
.variant-literary-journal .ed-opener { text-align: left; }
.variant-literary-journal .ed-detail-main p { text-align: left; }
.variant-literary-journal .ed-detail-main blockquote { text-align: left; }
`;
