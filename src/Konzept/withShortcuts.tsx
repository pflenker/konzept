import { Editor as SlateEditor, Range, Text, Transforms, Point } from "slate";
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
          const selectionOffset = editor.selection!.anchor.offset;
          const lastMatchingCharOffset = index + value.length + 2;
          if (selectionOffset - 1 !== lastMatchingCharOffset) {
            return;
          }
          let beginning: Point = {
            path: path,
            offset: index,
          };

          Transforms.delete(editor, { at: beginning });

          let end = {
            path: path,
            offset: index + value.length,
          };
          Transforms.delete(editor, { at: end });
          let update: { [key: string]: boolean } = {};
          update[mark] = true;
          Transforms.setNodes(editor, update, {
            at: {
              anchor: beginning,
              focus: end,
            },
            match: (n) => Text.isText(n),
            split: true,
          });
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
