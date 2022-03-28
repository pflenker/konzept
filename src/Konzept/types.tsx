import { ReactEditor } from "slate-react";
import { BaseEditor } from "slate";

type Text = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  highlight?: boolean;
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
