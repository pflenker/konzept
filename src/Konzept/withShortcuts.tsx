import { Editor as SlateEditor, Range, Text, Transforms, Point } from "slate";
import getParagraph from "./getParagraph";
import { Mark, Editor, Decoration } from "./types";
const SHORTCUT_MARK_MAP: Readonly<{
  [key: string]: Mark;
}> = {
  ":": "highlight",
  "\\*": "bold",
  _: "italic",
  "~": "strikethrough",
};

const SHORTCUT_DECORATIONS_MAP: Readonly<{
  [key: string]: Decoration;
}> = {
  "# ": "h1",
  "## ": "h2",
  "### ": "h3",
  "#### ": "h4",
  "##### ": "h5",
  "###### ": "h6",
};

function handleParagraphShortcut(editor: Editor): boolean {
  const [[, path]] = getParagraph(editor);
  const { anchor } = editor.selection!;
  const start = SlateEditor.start(editor, path);
  const beforeRange = { anchor, focus: start };
  const beforeText = SlateEditor.string(editor, beforeRange);
  let decoration = SHORTCUT_DECORATIONS_MAP[beforeText];
  if (!decoration) {
    return false;
  }
  Transforms.setNodes(editor, { decoration }, { at: path });
  Transforms.select(editor, beforeRange);
  Transforms.delete(editor);
  return true;
}

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
    handleParagraphShortcut(editor) || handleInlineShortcuts(editor);
  };
  return editor;
}
