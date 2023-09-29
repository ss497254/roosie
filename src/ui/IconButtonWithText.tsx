import * as React from "react";

export type ButtonType = "primary" | "danger" | "highlight" | null;

interface Props
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  icon?: JSX.Element;
  type?: ButtonType;
  text?: string;
  bordered?: boolean;
  shadow?: boolean;
}

export function IconButton({
  bordered,
  shadow,
  type,
  text,
  className,
  icon,
  ...props
}: Props) {
  return (
    <button
      className={[
        "clickable icon-button",
        bordered ? "border-light" : "",
        shadow ? "card-shadow" : "",
        type ?? "",
        text ? "!px-4" : "",
        className ?? "",
      ].join(" ")}
      role="button"
      {...props}
    >
      {icon && (
        <div className={`h-4 w-4 c ${type === "primary" && "no-dark"}`}>
          {icon}
        </div>
      )}

      {text && <div className="icon-button-text">{text}</div>}
    </button>
  );
}
