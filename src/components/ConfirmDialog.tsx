/**
 * Asks before something that cannot be undone. Covers the whole screen with a
 * solid background (no see-through layer) so the question is all there is to read.
 */
export function ConfirmDialog({
  message,
  confirmLabel,
  cancelLabel,
  danger = false,
  onConfirm,
  onCancel,
}: {
  message: string
  confirmLabel: string
  cancelLabel: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <div
      className="confirm-screen"
      role="alertdialog"
      aria-modal="true"
      aria-label={message}
    >
      <div className="confirm-card">
        <p>{message}</p>
        <button
          className={`confirm-primary ${danger ? "is-danger" : ""}`.trim()}
          type="button"
          onClick={onConfirm}
        >
          {confirmLabel}
        </button>
        {/* The safe choice gets the focus. */}
        <button
          className="confirm-secondary"
          type="button"
          onClick={onCancel}
          autoFocus
        >
          {cancelLabel}
        </button>
      </div>
    </div>
  )
}
