import { useCallback, useState } from "react";
import { API_URL } from "src/constant";

const DefaultHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const usePost = (path: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const run = useCallback(
    async (data: any = {}) => {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(API_URL + path, {
          headers: DefaultHeader,
          method: "POST",
          body: JSON.stringify(data),
        });

        if (
          res.ok &&
          res.headers.get("Content-Type")?.includes("application/json")
        ) {
          setLoading(false);
          return res.json();
        }

        throw new Error(await res.text());
      } catch (e) {
        console.warn(
          {
            message: "API ERROR",
            desc: (e as Error).message,
          },
          "error",
        );
      }

      setLoading(false);
      setError(true);
      return null;
    },
    [path],
  );

  return { loading, error, run };
};

export const useDelete = (path: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const run = useCallback(
    async (data: any = {}) => {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(API_URL + path, {
          headers: DefaultHeader,
          method: "DELETE",
          body: JSON.stringify(data),
        });

        if (
          res.ok &&
          res.headers.get("Content-Type")?.includes("application/json")
        ) {
          setLoading(false);
          return res.json();
        }

        throw new Error(await res.text());
      } catch (e) {
        console.warn(
          {
            message: "API ERROR",
            desc: (e as Error).message,
          },
          "error",
        );
      }

      setLoading(false);
      setError(true);
      return null;
    },
    [path],
  );

  return { loading, error, run };
};
