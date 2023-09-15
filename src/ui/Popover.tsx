export function Popover(props: {
  children: JSX.Element;
  content: JSX.Element;
  open?: boolean;
  onClose?: () => void;
}) {
  return (
    <div className="relative z-10">
      {props.children}
      {props.open && (
        <div className="popover-content">
          <div
            className="fixed top-0 left-0 h-screen w-screen"
            onClick={props.onClose}
          ></div>
          {props.content}
        </div>
      )}
    </div>
  );
}
