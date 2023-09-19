export function ListItem(props: {
  title: string;
  subTitle?: string;
  children?: JSX.Element | JSX.Element[];
  icon?: JSX.Element;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`list-item ${props.className || ""}`}
      onClick={props.onClick}
    >
      <div className="list-header">
        {props.icon && <div className="list-icon">{props.icon}</div>}
        <div className="list-item-title">
          <div>{props.title}</div>
          {props.subTitle && (
            <div className="list-item-sub-title">{props.subTitle}</div>
          )}
        </div>
      </div>
      {props.children}
    </div>
  );
}

export function List(props: {
  children:
    | Array<JSX.Element | null | undefined>
    | JSX.Element
    | null
    | undefined;
}) {
  return <div className="list">{props.children}</div>;
}
