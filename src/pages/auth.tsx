/* eslint-disable @next/next/no-img-element */
import Router from "next/router";
import React, { useCallback } from "react";
import { Button } from "src/ui/Buttons";
import { useAccessStore } from "src/store";
import { usePost } from "src/hooks/ApiHooks";

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
      className="p-6 md:p-8 rounded-2xl shadow-2xl space-y-5 flex-grow max-w-md border-light"
      onSubmit={onSubmit}
    >
      <img src="/logo.png" alt="logo" className="w-32 h-32 mx-auto mb-12" />
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
        size="xl"
        className={["w-full", error ? "shake" : ""].join(" ")}
      >
        Submit
      </Button>
    </form>
  );
};

Login.noAuth = true;

export default Login;
