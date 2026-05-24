/**
 * The vertical line that splits the page in half.
 * Decorative-only — `pointer-events-none`, hidden under `lg`.
 */
export function CenterSeam() {
  return <div aria-hidden className="center-seam hidden lg:block" />
}
