import { RenderLeafProps } from "slate-react";

export default function renderLeaf({
  attributes,
  children,
  leaf,
}: RenderLeafProps) {
  let enrichedChildren = children;
  if (leaf.bold) {
    enrichedChildren = <strong>{enrichedChildren}</strong>;
  }
  if (leaf.italic) {
    enrichedChildren = <em>{enrichedChildren}</em>;
  }
  if (leaf.strikethrough) {
    enrichedChildren = <s>{enrichedChildren}</s>;
  }
  if (leaf.highlight) {
    enrichedChildren = <mark>{enrichedChildren}</mark>;
  }
  return <span {...attributes}>{enrichedChildren}</span>;
}
