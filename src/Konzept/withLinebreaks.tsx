import { Editor as SlateEditor, Range, Transforms, Node } from "slate";
import getParagraph from "./getParagraph";
import switchMark from "./switchMark";
import { Mark, Editor, Paragraph } from "./types";
function disableAllMarks(editor: Editor) {
  let marks = SlateEditor.marks(editor);
  if (!marks) {
    return;
  }
  Object.keys(marks).forEach((mark) => switchMark(editor, mark as Mark, false));
}
function getTextFromParagraph(paragraph: Paragraph) {
  let ret = "";
  Array.from(Node.texts(paragraph)).forEach(([text]) => (ret += text.text));
  return ret;
}

function getCurrentText(editor: Editor) {
  let [[paragraph]] = getParagraph(editor);
  return getTextFromParagraph(paragraph);
}

export default function withLineBreaks(editor: Editor) {
  editor.insertSoftBreak = () => {
    editor.insertText("\n");
  };
  const { insertBreak } = editor;
  editor.insertBreak = () => {
    if (Range.isExpanded(editor.selection!)) {
      Transforms.delete(editor);
    }
    const line1text = getCurrentText(editor);

    insertBreak();
    disableAllMarks(editor);
    const line2text = getCurrentText(editor);

    if (line1text.trim().length && !line2text.trim().length) {
      Transforms.unsetNodes(editor, "decoration");
    }
  };
  return editor;
}
