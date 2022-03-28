import { KeyboardEvent } from "react";
import isHotkey from "is-hotkey";
import { Editor, Mark } from "./types";
import { Editor as SlateEditor } from "slate";
const HOTKEYS_MARKS_MAP: Record<string, Mark> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+shift+b": "highlight",
  "mod+shift+x": "strikethrough",
};

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

function toggleMark(editor: Editor, mark: Mark) {
  const isActive = isMarkActive(editor, mark);
  switchMark(editor, mark, !isActive);
}

export default function handleHotkeys(
  event: KeyboardEvent,
  editor: Editor
): boolean {
  for (const hotkey in HOTKEYS_MARKS_MAP) {
    if (isHotkey(hotkey, event)) {
      const mark = HOTKEYS_MARKS_MAP[hotkey];
      toggleMark(editor, mark);
      return true;
    }
  }
  return false;
}
