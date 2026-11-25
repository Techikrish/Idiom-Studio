# Detail

**Job:** understand one thing and act on it.

## Chrome

- iOS: system back, title (inline or large), share/overflow in the toolbar, content under the control
  layer only where the media earns it.
- Android: `TopAppBar` with navigation icon and actions, edge-to-edge media with a scrim if text sits
  on it.

## Hierarchy

1. Media or identity (only if it helps recognition).
2. Title and the one fact that matters.
3. Primary action.
4. Metadata and body.
5. Secondary actions and related content.

The primary action should be visible without scrolling on a phone unless the content is the point
(an article, a photo).

## States

- **Loading:** skeleton for the title, media, and key facts.
- **Error:** what failed, retry, and a way back.
- **Deleted / 404:** say the item no longer exists; offer back or search.
- **Partial:** show what loaded; retry the rest.
- **Offline:** cached detail plus a banner; disable actions that need the network with an explanation.
- **Permission:** if the detail needs photos, location, or camera, explain before the system prompt.

## Interaction

- Back returns to the same scroll position in the feed.
- Share uses the platform share sheet with a real URL.
- Destructive actions confirm and name the object.
- Editing a field saves explicitly or autosaves with a visible state; do not do both.
- A sheet for edit uses detents, not a full-screen cover for one field.

## Slop

- The entire page is one card inside another card.
- A floating custom back button.
- The title repeated three times (nav title, hero title, body heading).
- Fake reviews, fake ratings, or fake "verified" badges.
- A hero image with text over it and no scrim.
- A primary action hidden below three screens of related content.
- A dead share or bookmark button.

## Acceptance

- [ ] The primary action is obvious in one second.
- [ ] Back restores the feed position.
- [ ] Loading, error, deleted, offline, and permission states are handled.
- [ ] Destructive actions confirm.
- [ ] No fake social proof.
- [ ] Text over media has measured contrast.

## Signature opportunity

A distinctive metadata treatment: a single rule, a compact fact row, or a numeral style that carries
the product's character.
