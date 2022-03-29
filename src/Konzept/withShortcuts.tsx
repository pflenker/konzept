import { Editor as SlateEditor, Range, Text } from "slate";
import { Mark, Editor } from "./types";
const SHORTCUT_MARK_MAP: Readonly<{
  [key: string]: Mark;
}> = {
  ":": "highlight",
  "\\*": "bold",
  _: "italic",
  "~": "strikethrough",
};

function handleInlineShortcuts(editor: Editor) {
  Array.from(
    SlateEditor.nodes(editor, { match: (n) => Text.isText(n) })
  ).forEach(([node, path]) => {
    let { text } = node as Text;
    for (const escapedKey in SHORTCUT_MARK_MAP) {
      const mark = SHORTCUT_MARK_MAP[escapedKey];
      const regexString = escapedKey + "(.+?)" + escapedKey;
      Array.from(text.matchAll(new RegExp(regexString, "g"))).forEach(
        (match) => {
          const [, value] = match;
          const { index } = match;
          if (index === undefined || !value.length) {
            return;
          }
          console.log(mark, value, index, path);
        }
      );
    }
  });
}

export default function withShortcuts(editor: Editor) {
  const { insertText } = editor;
  editor.insertText = (text: string) => {
    insertText(text);
    const { selection } = editor;
    if (text !== " " || !selection || Range.isExpanded(selection)) {
      return;
    }
    handleInlineShortcuts(editor);
  };
  return editor;
}
