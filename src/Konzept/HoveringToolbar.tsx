import { useRef } from "react";
import { Editor as SlateEditor, Range, Text } from "slate";
import { useFocused, useSlate } from "slate-react";
import toggleMark from "./toggleMark";
import { Editor, Mark } from "./types";

const isFormatActive = (editor: Editor, mark: Mark) => {
  return Array.from(
    SlateEditor.nodes(editor, { match: (n) => Text.isText(n) })
  ).some(([e]) => Text.isText(e) && e[mark]);
};

const markToButton = {
  bold: <strong>B</strong>,
  italic: <em>I</em>,
  highlight: <mark>H</mark>,
  strikethrough: <s>S</s>,
};

function MarkButton({ mark }: { mark: Mark }) {
  const editor = useSlate();
  const isActive = isFormatActive(editor, mark);
  const style = isActive ? { backgroundColor: "LightSalmon" } : {};
  return (
    <button
      style={style}
      onClick={() => {
        toggleMark(editor, mark);
      }}
    >
      {markToButton[mark]}
    </button>
  );
}

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
      <MarkButton mark="highlight" />
      <MarkButton mark="bold" />
      <MarkButton mark="italic" />
      <MarkButton mark="strikethrough" />
    </span>
  );
}
