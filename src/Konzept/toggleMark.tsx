import { Editor, Mark } from "./types";
import { Editor as SlateEditor } from "slate";
import switchMark from "./switchMark";

function isMarkActive(editor: Editor, mark: Mark) {
  const marks = SlateEditor.marks(editor);
  return marks ? marks[mark] === true : false;
}

export default function toggleMark(editor: Editor, mark: Mark) {
  const isActive = isMarkActive(editor, mark);
  switchMark(editor, mark, !isActive);
}
