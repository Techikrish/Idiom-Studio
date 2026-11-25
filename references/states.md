# States

A native screen is not a layout. It is a small state machine that happens to have a layout.

Most generated apps implement `content`. That is why they break on the first slow network, the first
empty account, and the first failed write. The state matrix is the cheapest way to make an app feel
real.

---

## 1. State taxonomy

| State | Meaning | What the user needs |
|---|---|---|
| **Initial** | Nothing has happened yet | A clear first action, or automatic load |
| **Loading** | First load, no content yet | A skeleton that matches the layout, or a spinner with context |
| **Refreshing** | Content exists, a refresh is in flight | Keep the content; show a small progress affordance |
| **Content** | Real data | The primary action |
| **Empty** | The request succeeded, there is nothing | What is missing and one next action |
| **Error** | The request failed | What failed, whether anything was saved, retry |
| **Offline** | No connection, or a request is queued | What still works, what is queued, retry |
| **Permission** | The app needs access | Why, what happens without it, grant/skip |
| **Partial** | Some data loaded, some did not | What is available, retry the rest |
| **Stale** | Cached data may be out of date | When it was last updated, refresh |
| **Deleted / 404** | The object no longer exists | A way back, not a dead end |

`Success` is not a state that replaces content. It is a confirmation on top of a real state.

---

## 2. Matrix by screen

| Screen | Loading | Empty | Error | Offline | Permission |
|---|---|---|---|---|---|
| Feed | Skeleton rows | No items / no results / filtered empty | Retry | Cached items + banner | Notifications, if used |
| Detail | Skeleton | — | Retry / back | Cached detail | Photos, camera, location |
| Search | Spinner in field | Recent / no results | Retry | Cached results | Microphone, if voice |
| Compose | — | Empty draft is valid | Preserve draft + retry | Queue or block | Camera, photos, microphone |
| Settings | Account skeleton | Signed out | Retry account | Local settings still work | Notifications, tracking |
| Onboarding | — | — | Retry | Explain what needs network | Just-in-time |
| Paywall | Price skeleton | — | Retry / restore | Show cached price + retry | — |
| Profile | Skeleton | No profile yet | Retry | Cached profile | Photos |

A static screen (legal, about, a simple calculator) can skip the matrix. Write `static` in the screen
contract so the omission is deliberate.

---

## 3. State model

### Swift

```swift
enum ScreenState<Value> {
    case loading
    case empty
    case error(String)
    case content(Value)
}
```

```swift
switch model.state {
case .loading:
    SkeletonView()
case .empty:
    ContentUnavailableView(
        "No projects yet",
        systemImage: "square.stack",
        description: Text("Create a project to get started.")
    )
case .error(let message):
    ContentUnavailableView(
        "Couldn't load projects",
        systemImage: "exclamationmark.triangle",
        description: Text(message)
    )
case .content(let projects):
    ProjectList(projects: projects)
}
```

### Compose

```kotlin
sealed interface ScreenState<out T> {
    data object Loading : ScreenState<Nothing>
    data object Empty : ScreenState<Nothing>
    data class Error(val message: String) : ScreenState<Nothing>
    data class Content<T>(val value: T) : ScreenState<T>
}
```

```kotlin
when (val state = uiState) {
    ScreenState.Loading -> Skeleton()
    ScreenState.Empty -> EmptyState(onCreate = viewModel::create)
    is ScreenState.Error -> ErrorState(state.message, onRetry = viewModel::retry)
    is ScreenState.Content -> ProjectList(state.value)
}
```

Use `collectAsStateWithLifecycle()` on Android. Use `@StateObject` / `@Observable` on iOS and keep the
state model out of the view body.

---

## 4. Copy

Error copy has three jobs:

1. Say what happened.
2. Say whether anything was saved.
3. Say what to do next.

Bad:

> Something went wrong.

Good:

> We couldn't save your changes. Your draft is still here. Try again.

Empty copy has two jobs:

1. Say what is missing.
2. Offer one next action.

Bad:

> No data.

Good:

> No invoices yet. Create your first invoice to get paid.

Do not use "Oops", "Uh oh", or an error code as the primary message. Put the code in a detail view.

---

## 5. Writes and failure

Every write needs a failure path:

- **Optimistic UI:** show the change immediately, keep the previous value, roll back on failure, and
  tell the user.
- **Pessimistic UI:** disable the control, show progress, then confirm. Do not leave the screen frozen.
- **Offline queue:** say it is queued, show it in the list with a pending marker, and reconcile later.
- **Idempotency:** retries must not duplicate a payment, message, or order.
- **Destructive actions:** confirm, name the object, and offer undo where the platform supports it.

A success toast for a write that can fail is a lie. `try?` is not error handling.

---

## 6. Permissions

Ask just in time, in context:

1. Explain why in the UI before the system prompt.
2. Ask when the user takes the action that needs it.
3. Handle denial without a dead end.
4. Do not ask for notifications on first launch before showing value.
5. Do not pre-check consent. Consent is off by default.

---

## 7. What `idiom states` can and cannot see

It sees:

- Whether a screen has a data signal (network, list, view model, state object).
- Whether it declares loading, empty, error, offline, or permission branches.
- Dead controls and fake production strings from the lint pass.

It cannot see:

- Whether the skeleton matches the final layout.
- Whether the error copy is honest.
- Whether the state is owned by a parent and passed down.
- Whether the keyboard covers the retry button.

If the state lives in a parent, waive with a reason:

```swift
// idiom-ignore state-missing: state is owned by LibraryScreen and passed into this row
```

Then verify the parent. Do not waive the parent.

---

## 8. Acceptance

A data screen is done when:

- [ ] Loading, empty, and error are implemented and reachable.
- [ ] Offline behavior is defined.
- [ ] Permission behavior is defined where relevant.
- [ ] Refreshing keeps content visible.
- [ ] Every write has a failure path and a retry.
- [ ] No fake production data.
- [ ] No dead controls.
- [ ] The state matrix is written in `.idiom/decisions.md`.
- [ ] The screen was inspected at 2× text size and with the keyboard open.
