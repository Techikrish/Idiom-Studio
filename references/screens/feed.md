# Feed

**Job:** scan, choose, return. The feed is a navigation surface, not a gallery.

## Chrome

- iOS: `NavigationStack`, large title, `.searchable` when search is a primary job, tab bar for
  top-level destinations.
- Android: `TopAppBar` (or a large top app bar), `NavigationBar` or rail, edge-to-edge list.

## Hierarchy

1. Section or filter context.
2. Row: primary label, secondary metadata, one leading visual, one trailing affordance.
3. Selection or unread state.
4. The next action (open, play, read, save).

Rows should be scannable at a glance. If every row is a card with an image, a title, a subtitle, two
badges, and three actions, nothing is scannable.

## States

- **Loading:** skeleton rows that match the final row height.
- **Refreshing:** keep the list, show a small progress indicator or the platform refresh control.
- **Empty:** distinguish no items, no results after a filter, and no access.
- **Error:** keep any cached rows, show a retry at the top or in place.
- **Offline:** cached rows plus a banner; do not blank the screen.
- **Pagination:** a footer spinner, an end marker, and a retry for the failed page.
- **Partial:** show the loaded section and a retry for the rest.

## Interaction

- Tap opens detail; do not put the primary action only in a swipe.
- Swipe actions are secondary and reversible where possible.
- Long press opens a context menu; do not hide the only action there.
- Pull to refresh only when the content can change.
- Preserve scroll position across refresh and navigation.
- Use stable item identity (`key` / `Identifiable`).

## Slop

- Every row is an elevated card with a shadow.
- Fake avatars and names before the user has data.
- Five equal tabs, with the feed as one of them.
- An infinite spinner with no skeleton and no error.
- No empty state; the screen is just blank.
- A hero card at the top that pushes the actual content below the fold.
- Nested scroll views.

## Acceptance

- [ ] Rows use the platform list primitive where possible.
- [ ] Loading, empty, error, offline, and pagination are implemented.
- [ ] Scroll position survives refresh.
- [ ] Item identity is stable.
- [ ] The primary action is reachable without a swipe.
- [ ] No fake production rows.

## Signature opportunity

One distinctive row rhythm: a rule between sections, a numeral treatment, a leading time column, or a
single accent on the unread marker. One, not five.
