export function Card(props: { children: JSX.Element[]; className?: string }) {
  return (
    <div className={"bg-white rounded-lg card-shadow p-2.5 " + props.className}>
      {props.children}
    </div>
  );
}
