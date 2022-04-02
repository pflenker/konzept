import { ReactEditor } from "slate-react";
import { BaseEditor } from "slate";

type Text = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  highlight?: boolean;
};
export type Mark = "bold" | "highlight" | "italic" | "strikethrough";
export type Decoration = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type Editor = BaseEditor & ReactEditor;
type Paragraph = {
  type: "paragraph";
  decoration?: Decoration;
  children: Text[];
};
declare module "slate" {
  interface CustomTypes {
    Editor: Editor;
    Element: Paragraph;
    Text: Text;
  }
}
