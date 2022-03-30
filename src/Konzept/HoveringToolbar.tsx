import { useRef } from "react";
import { Editor as SlateEditor, Range } from "slate";
import { useFocused, useSlate } from "slate-react";

export default function HoveringToolbar() {
  const editor = useSlate();
  const inFocus = useFocused();
  let isVisible = false;
  const ref = useRef<HTMLSpanElement | null>(null);
  let coordinates = {
    top: 0,
    left: 0,
  };
  const domSelection = window.getSelection();
  const el = ref.current;
  const { selection } = editor;

  if (
    inFocus &&
    selection &&
    Range.isExpanded(selection) &&
    SlateEditor.string(editor, selection) !== "" &&
    domSelection &&
    el
  ) {
    isVisible = true;
    const domRange = domSelection.getRangeAt(0);

    const rect = domRange.getBoundingClientRect();
    const top = rect.top - el.offsetHeight;
    const left = rect.left - el.offsetWidth / 2 + rect.width / 2;
    coordinates = {
      top,
      left,
    };
  }
  return (
    <span
      onMouseDown={(e) => e.preventDefault()}
      ref={ref}
      style={{
        border: "1px dashed lightgray",
        padding: "7px",
        position: "fixed",
        zIndex: 1,
        backgroundColor: "white",
        top: coordinates.top + "px",
        left: coordinates.left + "px",
        visibility: isVisible ? "visible" : "hidden",
      }}
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
