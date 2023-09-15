import { useEffect, useState } from "react";
import { getWSClient } from "src/lib/ws-client-store";

export const useWSClientStatus = () => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const client = getWSClient();

    client.on("state", setStatus);
    return () => {
      client.off("state", setStatus);
    };
  }, []);

  return status;
};
