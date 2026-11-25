export const RITUAL_CSS = `
/* Ritual */
.ritual { background: var(--bg); }
.ritual-head { flex: none; display: flex; align-items: center; justify-content: space-between; padding: 0 22px 2px; font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
.ritual-main { padding: 4px 22px 0; display: flex; flex-direction: column; align-items: center; text-align: center; }
.ritual-kicker { font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .14em; text-transform: uppercase; color: var(--accent); font-weight: 700; }
.ritual-title { font-family: var(--font-display); font-size: 32px; line-height: 1.02; letter-spacing: -.03em; font-weight: 600; margin: 6px 0 4px; }
.ritual-sub { margin: 0; font-size: 9.5px; color: var(--muted); }
.ring {
  width: 208px;
  height: 208px;
  border-radius: 50%;
  margin: 14px auto;
  padding: 8px;
  display: grid;
  place-items: center;
  position: relative;
  background: conic-gradient(var(--accent) calc(var(--pct) * 1%), color-mix(in srgb, var(--border) 55%, transparent) 0);
  box-shadow: 0 18px 40px color-mix(in srgb, var(--accent) 10%, transparent);
}
.ring::after { content: ""; position: absolute; inset: -6px; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--accent) 13%, transparent); }
.ring-inner { width: 100%; height: 100%; border-radius: 50%; background: var(--surface); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; box-shadow: inset 0 0 40px color-mix(in srgb, var(--accent) 5%, transparent); }
.ritual-ring-min { font-family: var(--font-display); font-size: 62px; line-height: .9; letter-spacing: -.04em; }
.ritual-ring-unit { font-family: var(--font-mono); font-size: 8px; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); margin-top: 3px; }
.ritual-ring-start { font-family: var(--font-body); font-size: 8px; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); font-weight: 750; margin-top: 9px; }
.ritual-list { width: 100%; border-top: 1px solid var(--border); }
.ritual-row { display: grid; grid-template-columns: 12px 1fr auto; align-items: center; gap: 8px; padding: 8px 0; border-bottom: 1px solid var(--border); text-align: left; }
.ritual-row-dot { width: 7px; height: 7px; border-radius: 50%; border: 1px solid var(--border); }
.ritual-row-dot.on { background: var(--accent); border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 14%, transparent); }
.ritual-row div { display: flex; flex-direction: column; gap: 1px; }
.ritual-row strong { font-size: 10.5px; font-weight: 650; }
.ritual-row span { font-size: 8px; color: var(--muted); }
.ritual-row .ic { color: var(--muted); }
.ritual-note { margin-top: 9px; display: flex; align-items: flex-start; gap: 6px; font-size: 8px; line-height: 1.4; color: var(--muted); text-align: left; }
.ritual-note .ic { color: var(--accent); margin-top: 1px; }

/* Training log */
.variant-training-log .ritual-main { align-items: stretch; text-align: left; }
.variant-training-log .ritual-title { font-size: 29px; }
.variant-training-log .ritual-kicker { text-align: left; }
.variant-training-log .ritual-sub { text-align: left; }
.ritual-training { margin-top: 16px; border-top: 1px solid var(--text); }
.ritual-set { display: grid; grid-template-columns: 1fr 92px 30px; align-items: center; gap: 8px; padding: 12px 0; border-bottom: 1px solid var(--border); }
.ritual-set div:first-child { display: flex; flex-direction: column; gap: 2px; }
.ritual-set strong { font-size: 11px; font-weight: 650; }
.ritual-set span { font-size: 8px; color: var(--muted); }
.ritual-bar { height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
.ritual-bar i { display: block; height: 100%; background: var(--accent); border-radius: 2px; }
.ritual-set em { font-family: var(--font-mono); font-style: normal; font-size: 8px; color: var(--muted); text-align: right; }
.variant-training-log .ritual-note { margin-top: 14px; }

/* Meditation timer */
.variant-meditation-timer { background: var(--bg); }
.variant-meditation-timer .ritual-head { display: none; }
.variant-meditation-timer .ritual-main { justify-content: center; gap: 16px; padding-top: 26px; }
.ritual-med-copy { text-align: center; }
.ritual-med-copy h2 { font-family: var(--font-display); font-size: 27px; font-weight: 500; letter-spacing: -.02em; margin: 5px 0 3px; }
.ritual-med-copy p { margin: 0; font-size: 9px; color: var(--muted); }
.variant-meditation-timer .ring { width: 268px; height: 268px; margin: 16px auto; background: conic-gradient(color-mix(in srgb, var(--accent) 82%, transparent) calc(var(--pct) * 1%), color-mix(in srgb, var(--accent) 12%, transparent) 0); box-shadow: 0 0 90px color-mix(in srgb, var(--accent) 18%, transparent), inset 0 0 30px color-mix(in srgb, var(--accent) 14%, transparent); }
.variant-meditation-timer .ring-inner { background: radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--accent) 12%, var(--bg)), var(--bg) 70%); }
.variant-meditation-timer .ritual-time { font-family: var(--font-mono); font-size: 40px; letter-spacing: -.03em; }
.variant-meditation-timer .ritual-time-label { font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .15em; text-transform: uppercase; color: var(--muted); }
.ritual-time { font-family: var(--font-mono); font-size: 34px; letter-spacing: -.03em; }
.ritual-time.small { font-size: 29px; }
.ritual-time-label { font-family: var(--font-mono); font-size: 7px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); margin-top: 2px; }
.ritual-stop { margin-top: 2px; font-family: var(--font-mono); font-size: 8px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); border-bottom: 1px solid var(--border) !important; padding-bottom: 3px !important; }
.ritual-week { display: flex; align-items: center; gap: 6px; margin-top: 18px; width: 100%; justify-content: center; }
.ritual-week span { width: 22px; height: 22px; border-radius: 50%; border: 1px solid var(--border); display: grid; place-items: center; font-family: var(--font-mono); font-size: 6.5px; color: var(--muted); }
.ritual-week span.done { background: color-mix(in srgb, var(--accent) 20%, transparent); border-color: var(--accent); color: var(--accent); }
.ritual-week em { margin-left: 5px; font-family: var(--font-mono); font-style: normal; font-size: 6.5px; letter-spacing: .03em; color: var(--muted); }
.ritual-soft-note { display: flex; align-items: flex-start; gap: 6px; width: 100%; margin-top: 10px; padding: 8px 9px; background: color-mix(in srgb, var(--accent) 7%, var(--surface)); border: 1px solid var(--border); border-radius: var(--radius-sm); font-size: 7.5px; line-height: 1.4; color: var(--muted); text-align: left; }
.ritual-soft-note .ic { color: var(--accent); margin-top: 1px; }

/* Ritual detail */
.ritual-detail { background: var(--bg); }
.ritual-detail-head { display: flex; align-items: center; justify-content: space-between; padding: 0 14px; font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
.ritual-detail-head .icon-btn { width: 30px; height: 30px; }
.ritual-detail-main { padding: 6px 24px 0; display: flex; flex-direction: column; align-items: center; text-align: center; }
.ritual-detail-copy h2 { font-family: var(--font-display); font-size: 33px; line-height: 1.03; letter-spacing: -.03em; font-weight: 580; margin: 6px 0 6px; }
.ritual-detail-copy p { margin: 0 auto; max-width: 280px; font-size: 9.5px; line-height: 1.5; color: var(--muted); }
.ritual-detail-main .ring { width: 168px; height: 168px; margin: 16px auto; }
.ritual-detail-main .ring::after { display: none; }
.ritual-detail-main .ring-inner { background: var(--surface); }
.ritual-steps { width: 100%; text-align: left; border-top: 1px solid var(--border); }
.ritual-step { display: grid; grid-template-columns: 22px 1fr; gap: 9px; padding: 10px 0; border-bottom: 1px solid var(--border); }
.ritual-step > span { width: 20px; height: 20px; border-radius: 50%; border: 1px solid var(--border); display: grid; place-items: center; font-family: var(--font-mono); font-size: 7px; color: var(--muted); }
.ritual-step.done > span { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
.ritual-step strong { display: block; font-size: 10px; font-weight: 650; }
.ritual-step p { margin: 1px 0 0; font-size: 8.5px; line-height: 1.4; color: var(--muted); }
.ritual-detail-action { flex: none; padding: 9px 20px 14px; border-top: 1px solid var(--border); }
.ritual-detail-action .btn { width: 100%; }
.variant-meditation-timer.ritual-detail .ritual-detail-main { justify-content: center; }
.variant-meditation-timer.ritual-detail .ritual-detail-main .ring { width: 210px; height: 210px; }
.variant-training-log.ritual-detail .ritual-detail-copy { text-align: left; width: 100%; }
.variant-training-log.ritual-detail .ritual-detail-main { align-items: stretch; }
`;
