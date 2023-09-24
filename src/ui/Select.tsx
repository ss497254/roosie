import DownIcon from "src/icons/down.svg";

export function Select(
  props: React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >,
) {
  const { className, children, ...otherProps } = props;
  return (
    <div className={`select-with-icon ${className}`}>
      <select className="select-with-icon-select" {...otherProps}>
        {children}
      </select>
      <DownIcon className="select-with-icon-icon" />
    </div>
  );
}
