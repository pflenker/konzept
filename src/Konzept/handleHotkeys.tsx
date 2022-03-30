import { KeyboardEvent } from "react";
import isHotkey from "is-hotkey";
import { Editor, Mark } from "./types";
import toggleMark from "./toggleMark";
const HOTKEYS_MARKS_MAP: Record<string, Mark> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+shift+b": "highlight",
  "mod+shift+x": "strikethrough",
};

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
