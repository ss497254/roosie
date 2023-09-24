import React, { HTMLProps, useState } from "react";
import { IconButton } from "./IconButtonWithText";

import EyeOffIcon from "src/icons/eye-off.svg";
import EyeIcon from "src/icons/eye.svg";

export type InputProps = React.HTMLProps<HTMLTextAreaElement> & {
  autoHeight?: boolean;
  rows?: number;
};

export function Input(props: InputProps) {
  return (
    <textarea {...props} className={`input ${props.className}`}></textarea>
  );
}

export function PasswordInput(props: HTMLProps<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);

  function changeVisibility() {
    setVisible(!visible);
  }

  return (
    <div className="password-input-container">
      <IconButton
        icon={visible ? <EyeIcon /> : <EyeOffIcon />}
        onClick={changeVisibility}
        className="password-eye"
      />
      <input
        {...props}
        type={visible ? "text" : "password"}
        className="password-input"
      />
    </div>
  );
}

export interface InputRangeProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  title?: string;
  value: number | string;
  className?: string;
  min: string;
  max: string;
  step: string;
}

export function InputRange({
  onChange,
  title,
  value,
  className,
  min,
  max,
  step,
}: InputRangeProps) {
  return (
    <div
      className={`border-light rounded-lg py-2.5 px-3 flex justify-between max-w-[50%] ${
        className ?? ""
      }`}
    >
      <div className="w-10 text-center">{title || value}</div>
      <input
        className="max-w-[calc(100%-40px)]"
        type="range"
        title={title}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      ></input>
    </div>
  );
}

export interface TextAreaProps extends React.ComponentPropsWithoutRef<"div"> {}
