import { Spinner } from "../Spinner";
import { ButtonProps } from "./Button";

export const BlockButton = ({
  loading,
  disabled,
  iconSize,
  children,
  className,
  ...props
}: ButtonProps) => {
  const classes = [
    "r c outline-none border-light text-black px-3 bg-[rgba(0,0,0,0.05)] hover:bg-gray",
  ];

  if (className) {
    classes.push(className);
  }

  if (disabled) {
    classes.push("cursor-not-allowed");
  }

  return (
    <button
      disabled={disabled || loading}
      className={classes.join(" ")}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 bg-inherit flex items-center justify-center">
          <Spinner size={iconSize} />
        </div>
      )}
      {children}
    </button>
  );
};
