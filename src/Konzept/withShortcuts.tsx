import { Editor } from "slate";

export default function withShortcuts(editor: Editor) {
  const { insertText } = editor;
  editor.insertText = (text: string) => {
    insertText(text);
  };
  return editor;
}
