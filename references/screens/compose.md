# Compose

**Job:** create something and send it without losing work.

## Chrome

- iOS: sheet with detents for short compose; full screen only for a real editor or media capture.
- Android: full-screen route or `ModalBottomSheet`; `TopAppBar` with cancel and send.

## Hierarchy

1. The input, at the top, focused.
2. Attachments and recipients.
3. Validation and character/limit feedback.
4. Send or publish, enabled only when valid.
5. Discard confirmation when dirty.

## States

- **Empty draft:** valid; send disabled with a reason.
- **Dirty:** warn before discard.
- **Validation:** inline, next to the field, not a toast after submit.
- **Sending:** disable send, show progress, keep the draft.
- **Success:** dismiss or show a confirmation with an undo where appropriate.
- **Failure:** keep the draft, explain whether it was sent, offer retry.
- **Offline:** queue it or block it, and say which.
- **Permission:** camera, photos, microphone, and notifications are requested in context.

## Interaction

- The keyboard must not cover the input or the send button; use `imePadding` / keyboard safe area.
- Send is a commit action; use haptics once.
- Back or cancel with a dirty draft confirms discard.
- Autosave drafts locally; restore after a crash.
- Do not lose the draft on a failed request.

## Slop

- A full-screen modal for one text field.
- A send button that is always enabled and fails silently.
- No failure state; the draft disappears.
- The keyboard covers the field or the send button.
- Discard without confirmation.
- A fake character counter that does not enforce anything.
- Attachment buttons that do nothing.
- A "Post" action that shows a success toast before the request completes.

## Acceptance

- [ ] Send is disabled with a visible reason when invalid.
- [ ] Dirty discard confirms.
- [ ] Sending, success, failure, and offline are handled.
- [ ] The draft survives failure and relaunch.
- [ ] The keyboard never covers the input or send.
- [ ] Attachment and permission actions are real.

## Signature opportunity

One distinctive editor detail: a subtle rule under the active line, a character-limit treatment, or a
send-state transition. Not a gradient toolbar.
