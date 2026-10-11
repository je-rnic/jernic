import type { ReactNode } from "react";

/**
 * Two equal columns: narrative on one side, artefact on the other (the
 * "Success metric" + metric box pattern). Stacks on phones.
 * Wrap each side in a <div> in MDX.
 */
export default function Split({ children }: { children: ReactNode }) {
  return <div className="split-2">{children}</div>;
}
