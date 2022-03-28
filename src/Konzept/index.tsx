import { useMemo, useState } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { BaseEditor } from "slate";

type Text = {
  text: string;
};
type Editor = BaseEditor & ReactEditor;
type Paragraph = {
  type: "paragraph";
  children: Text[];
};
declare module "slate" {
  interface CustomTypes {
    Editor: Editor;
    Element: Paragraph;
    Text: Text;
  }
}
const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

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
        <Editable spellCheck autoFocus />
      </Slate>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </>
  );
}
