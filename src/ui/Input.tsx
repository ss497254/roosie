import React, { useId, useState } from "react";
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

export function PasswordInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
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
      className={[
        "border-light rounded-lg py-2.5 px-3 flex justify-between items-center max-w-[50%]",
        className ?? "",
      ].join(" ")}
    >
      <div className="w-10 text-center">{title || value}</div>
      <input
        className="max-w-[calc(100%-50px)]"
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

export interface FileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  error?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  className,
  error,
  containerClassName,
  ...props
}) => {
  const id = useId();

  return (
    <div className={containerClassName}>
      <label
        htmlFor={id}
        className="c flex-col w-full min-h-[128px] border border-light rounded-md cursor-pointer bg-gray hover:border-primary"
      >
        <svg
          aria-hidden="true"
          className="w-8 h-8 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <p className="text-sm">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
      </label>
      <input id={id} type="file" className="hidden" {...props} />
      {error && <p className="text-xs text-red-500 ml-1 mt-1">{error}</p>}
    </div>
  );
};
