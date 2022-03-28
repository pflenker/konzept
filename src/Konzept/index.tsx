import { useMemo, useState, KeyboardEvent } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor, Descendant } from "slate";

import { Editor } from "./types";
import handleHotkeys from "./handleHotkeys";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

function onKeyDown(event: KeyboardEvent, editor: Editor) {
  let handled = handleHotkeys(event, editor);
  if (handled) {
    event.preventDefault();
  }
}

export default function Konzept() {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <Editable
          spellCheck
          autoFocus
          onKeyDown={(event) => onKeyDown(event, editor)}
        />
      </Slate>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </>
  );
}
