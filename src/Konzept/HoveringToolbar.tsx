import { Editor as SlateEditor, Range } from "slate";
import { useFocused, useSlate } from "slate-react";

export default function HoveringToolbar() {
  const editor = useSlate();
  const inFocus = useFocused();
  let isVisible = false;

  const { selection } = editor;

  if (
    inFocus &&
    selection &&
    Range.isExpanded(selection) &&
    SlateEditor.string(editor, selection) !== ""
  ) {
    isVisible = true;
  }
  if (!isVisible) {
    return null;
  }
  return (
    <span
      onMouseDown={(e) => e.preventDefault()}
      style={{ border: "1px dashed lightgray", padding: "7px" }}
    >
      <button>
        <mark>H</mark>
      </button>
      <button>
        <strong>B</strong>
      </button>
      <button>
        <em>I</em>
      </button>
      <button>
        <s>S</s>
      </button>
    </span>
  );
}
