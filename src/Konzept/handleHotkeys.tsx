import { KeyboardEvent } from "react";
import isHotkey from "is-hotkey";
import { Decoration, Editor, Mark } from "./types";
import toggleMark from "./toggleMark";
import getParagraph from "./getParagraph";
import { Transforms } from "slate";
const HOTKEYS_MARKS_MAP: Record<string, Mark> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+shift+b": "highlight",
  "mod+shift+x": "strikethrough",
};

const HOTKEYS_DECORATIONS_MAP: Record<string, Decoration> = {
  "ctrl+1": "h1",
  "ctrl+2": "h2",
  "ctrl+3": "h3",
  "ctrl+4": "h4",
  "ctrl+5": "h5",
  "ctrl+6": "h6",
};

function toggleDecoration(editor: Editor, decoration: Decoration) {
  const paragraphs = getParagraph(editor);
  let shouldSetDecoration = paragraphs.some(
    ([paragraph]) => paragraph.decoration !== decoration
  );
  paragraphs.forEach(([, path]) => {
    if (shouldSetDecoration) {
      Transforms.setNodes(editor, { decoration }, { at: path });
    } else {
      Transforms.unsetNodes(editor, "decoration", { at: path });
    }
  });
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
  for (const hotkey in HOTKEYS_DECORATIONS_MAP) {
    if (isHotkey(hotkey, event)) {
      const decoration = HOTKEYS_DECORATIONS_MAP[hotkey];
      toggleDecoration(editor, decoration);
      return true;
    }
  }
  return false;
}
