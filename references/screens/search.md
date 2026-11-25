# Search

**Job:** find something, fast, with confidence about what was searched.

## Chrome

- iOS: `.searchable`, cancel, scope bar, recent searches.
- Android: a search bar or `SearchBar`, back to dismiss, keyboard action "Search".

## Hierarchy

1. Query field with a clear action.
2. Scope or filters, only if they change the result meaningfully.
3. Results or suggestions.
4. Recent searches when the query is empty.
5. A result count or filter summary when the list is long.

## States

- **Idle:** recent searches, saved searches, or a short explanation.
- **Typing:** suggestions after a short debounce (250–300ms); do not fire a request per keystroke.
- **Loading:** keep the previous results visible; show progress in the field or a thin bar.
- **Results:** highlight the matched term; show why each result matched.
- **No results:** show the query, a suggestion, and a way to clear filters.
- **Error:** keep the query, retry, and do not clear the field.
- **Offline:** search cached content and say the scope is limited.

## Interaction

- The keyboard's search action submits.
- Clear returns to idle, not to an empty results screen.
- Tapping a result opens detail and preserves the query when returning.
- Filters show a count and a clear-all.
- Voice search asks for the microphone in context.

## Slop

- Search is a tab with no idle state.
- Fake "trending" or "popular" content.
- A request on every keystroke with no debounce.
- Results jump while typing because the layout changes height.
- The keyboard covers the last result.
- No distinction between "no results" and "search failed."
- A dead filter button.

## Acceptance

- [ ] Debounce is implemented.
- [ ] Idle, loading, results, no-results, error, and offline are handled.
- [ ] The query survives navigation and error.
- [ ] The keyboard does not cover results.
- [ ] Filters are real and clearable.
- [ ] No fake trending content.

## Signature opportunity

A distinctive result row: matched-term emphasis, a compact source line, or a numeral treatment for
counts. One.
