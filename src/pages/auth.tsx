import Router from "next/router";
import React, { useCallback } from "react";
import { Button } from "src/ui/Buttons";
import { useAccessStore } from "src/store";
import { usePost } from "src/hooks/useFetch";
import Image from "next/image";

const Login = () => {
  const { run, loading, error } = usePost("/user/login");

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.currentTarget;
      const { value: username } = form.elements.namedItem(
        "username",
      ) as HTMLInputElement;
      const { value: password } = form.elements.namedItem(
        "password",
      ) as HTMLInputElement;

      const res = await run({ username, password });

      if (res && res.success) {
        useAccessStore.setState({ ...res.data });

        return Router.replace("/");
      }
    },
    [run],
  );

  return (
    <form
      className="p-6 md:p-8 lg:p-10 rounded-2xl mx-4 shadow-2xl dark:shadow-slate-900 bg-white space-y-5 flex-grow max-w-md border-2 border-emerald-500"
      onSubmit={onSubmit}
    >
      <Image
        width={144}
        height={144}
        className="mx-auto mb-4 md:mb-8"
        alt="logo"
        src="/logo.png"
      />
      <input
        required
        className="min-w-full h-12"
        placeholder="Username"
        name="username"
        type="text"
      />
      <input
        required
        className="min-w-full h-12"
        placeholder="Password"
        name="password"
        type="password"
      />

      {error && (
        <div className="mb-4 ml-4 -mt-5 text-red-400 text-center">{error}</div>
      )}
      <Button
        btn="success"
        type="submit"
        iconSize={28}
        loading={loading}
        size="lg"
        className={["w-full text-lg font-medium", error ? "shake" : ""].join(
          " ",
        )}
      >
        Submit
      </Button>
    </form>
  );
};

Login.noAuth = true;

export default Login;
