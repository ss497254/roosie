import * as React from "react";

export type ButtonType = "primary" | "danger" | "highlight" | null;

export function IconButton(props: {
  onClick?: () => void;
  icon?: JSX.Element;
  type?: ButtonType;
  text?: string;
  bordered?: boolean;
  shadow?: boolean;
  className?: string;
  title?: string;
  disabled?: boolean;
  tabIndex?: number;
  autoFocus?: boolean;
}) {
  return (
    <button
      className={[
        "clickable icon-button",
        props.bordered ? "border-light" : "",
        props.shadow ? "card-shadow" : "",
        props.type ?? "",
        props.text ? "!px-4" : "",
        props.className ?? "",
      ].join(" ")}
      onClick={props.onClick}
      title={props.title}
      disabled={props.disabled}
      role="button"
      tabIndex={props.tabIndex}
      autoFocus={props.autoFocus}
    >
      {props.icon && (
        <div className={`h-4 w-4 c ${props.type === "primary" && "no-dark"}`}>
          {props.icon}
        </div>
      )}

      {props.text && <div className="icon-button-text">{props.text}</div>}
    </button>
  );
}
