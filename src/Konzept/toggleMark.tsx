import { Editor, Mark } from "./types";
import { Editor as SlateEditor } from "slate";
function switchMark(editor: Editor, mark: Mark, on: boolean) {
  if (on) {
    SlateEditor.addMark(editor, mark, true);
  } else {
    SlateEditor.removeMark(editor, mark);
  }
}

function isMarkActive(editor: Editor, mark: Mark) {
  const marks = SlateEditor.marks(editor);
  return marks ? marks[mark] === true : false;
}

export default function toggleMark(editor: Editor, mark: Mark) {
  const isActive = isMarkActive(editor, mark);
  switchMark(editor, mark, !isActive);
}
