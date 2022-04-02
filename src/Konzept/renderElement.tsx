import { RenderElementProps } from "slate-react";

export default function renderElement(props: RenderElementProps) {
  const { children, attributes, element } = props;
  let Component = element.decoration || "div";
  return <Component {...attributes}>{children}</Component>;
}
