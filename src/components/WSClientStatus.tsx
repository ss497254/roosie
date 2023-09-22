import React from "react";
import { getWSClient } from "src/lib/ws-client-store";
import { IconButton } from "src/ui";

interface SystemStatusProps extends React.PropsWithChildren {
  compact?: boolean;
}

const StatusColorMap: Record<string, string> = {
  connected: "bg-emerald-500",
  resolving: "bg-orange-500 animate-pulse",
  connecting: "bg-orange-500",
  closed: "bg-red-500",
};

export const WSClientStatus: React.FC<SystemStatusProps> = ({ compact }) => {
  const client = getWSClient();
  const status = client.getStore()((state) => state.status);

  const icon = (
    <div
      className={[
        "h-3 w-3 rounded-full",
        StatusColorMap[status] ?? "bg-slate-500",
      ].join(" ")}
    />
  );
  return (
    <IconButton
      title={status}
      icon={icon}
      text={compact ? undefined : status}
      onClick={client.reconnect.bind(client)}
      shadow
    />
  );
};
