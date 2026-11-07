/**
 * Fixed, decorative gradient layer behind the page (light mode only — hidden under `.dark`
 * in index.css). Gives the glass cards something to blur. Pure CSS, so it prerenders as-is.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="aurora">
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />
      <div className="aurora-grain" />
    </div>
  );
}
