/** Short confirmation shown after an action. Floats above the bottom navigation. */
export function Toast({ message }: { message: string | null }) {
  // Always in the page (empty when idle) so screen readers announce new messages.
  return (
    <div className="toast" role="status" aria-live="polite">
      {message}
    </div>
  )
}
