# Settings

**Job:** configure the product, manage the account, and get out of the way.

## Chrome

- iOS: grouped `List` (`.insetGrouped`), system controls, navigation to sub-pages.
- Android: grouped `ListItem`s, `Switch` / `Checkbox`, `TopAppBar`, edge-to-edge.

## Hierarchy

1. Account or identity, if there is one.
2. Frequently changed settings.
3. Notifications, privacy, and data.
4. About, legal, and version.
5. Destructive actions last, visually separated.

## States

- **Static:** most settings are local and need no loading state.
- **Account loading:** skeleton for the profile row, not the whole screen.
- **Account error:** retry, and keep local settings usable.
- **Signed out:** show sign-in, not a fake profile.
- **Destructive:** confirm sign-out and account deletion; name the consequence.
- **Permission:** notification and tracking settings link to the system settings when denied.
- **Offline:** local settings still work; cloud sync shows queued or unavailable.

## Interaction

- Use platform switches, not custom toggles.
- A row that navigates shows a chevron; a row that toggles has a switch; do not mix the affordance.
- Sign out and delete account are destructive and separated.
- Export/download actions must actually produce something.
- Version and build are real, not "1.0.0".
- Legal and privacy are reachable in one tap from About.

## Slop

- Every setting is a card with a shadow.
- Custom switches that do not match the platform.
- A dead "Export data" or "Rate us" row.
- Sign out with no confirmation.
- A fake profile ("John Doe") when signed out.
- Privacy buried three levels deep.
- A "Dark mode" toggle that does not follow the system.
- A "Notifications" toggle that does not deep-link to system settings when denied.

## Acceptance

- [ ] Platform controls, not custom ones.
- [ ] Signed-out and account-error states are handled.
- [ ] Destructive actions confirm.
- [ ] Every row does something.
- [ ] Version and legal are real.
- [ ] Notification denial links to system settings.
- [ ] No fake profile.

## Signature opportunity

A quiet one: a section rule, a version block, or a single accent on the account row. Settings should
feel calm, not branded.
