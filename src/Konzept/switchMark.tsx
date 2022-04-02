import { Editor, Mark } from "./types";
import { Editor as SlateEditor } from "slate";

export default function switchMark(editor: Editor, mark: Mark, on: boolean) {
  if (on) {
    SlateEditor.addMark(editor, mark, true);
  } else {
    SlateEditor.removeMark(editor, mark);
  }
}
