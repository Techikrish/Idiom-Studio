# Onboarding and paywall

**Job:** explain the value, earn consent, and ask for money honestly.

## Chrome

- iOS: `TabView` with `.page` style or a single advancing screen; skip in the toolbar; sheets for
  paywall; StoreKit for purchase.
- Android: `HorizontalPager` or a single advancing screen; skip; `ModalBottomSheet` or full-screen
  paywall; Play Billing.

## Hierarchy

1. One idea per screen.
2. The value, shown with the product, not a stock illustration.
3. A skip or "not now" that is as easy to find as continue.
4. Permission requests in context, never on first launch before value.
5. The paywall after value, with the real price and terms.
6. Restore purchases.

## States

- **First run:** progress, skip, continue.
- **Permission not determined:** explain, then ask.
- **Permission denied:** continue without it; offer a link to settings.
- **Trial eligible / ineligible:** say which, before the purchase button.
- **Purchase pending:** show progress; do not double-charge.
- **Purchase success:** unlock and confirm.
- **Purchase failure:** keep the paywall, explain, offer retry and restore.
- **Restore:** pending, restored, nothing to restore.
- **Offline:** show cached price if available; block purchase with an explanation.

## Interaction

- Price, period, renewal terms, and cancellation are visible before purchase.
- Restore purchases is always available.
- Dismiss is always available; do not trap the user.
- Consent is off by default and separate from the purchase.
- "Not now" is a real button, not a tiny gray link.
- The free tier is described honestly.

## Slop and dark patterns

- A hard paywall before any value.
- Pre-checked marketing consent.
- Fake countdowns or "only 2 spots left."
- Hidden renewal price or a fake "was" price.
- No restore purchases.
- A dismiss button that is invisible or delayed.
- Fake testimonials with stock faces.
- A "free trial" that charges immediately.
- Confusing plan preselection.
- A dead "Terms" or "Privacy" link.

## Acceptance

- [ ] The value is shown before the ask.
- [ ] Price, period, renewal, and cancellation are clear.
- [ ] Restore purchases works.
- [ ] Dismiss and "not now" are available.
- [ ] Consent is opt-in.
- [ ] Permission denial does not dead-end.
- [ ] Purchase pending, success, failure, and offline are handled.
- [ ] No fake urgency or social proof.

## Signature opportunity

One honest, memorable moment: a single line of product truth, a real screenshot, or a price
treatment that is unusually clear. Honesty is the brand.
