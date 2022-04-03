import { NodeEntry, Element, Editor as SlateEditor } from "slate";
import { Editor, Paragraph } from "./types";

export default function getParagraph(
  editor: Editor
): Array<NodeEntry<Paragraph>> {
  return Array.from(
    SlateEditor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === "paragraph",
    })
  );
}
