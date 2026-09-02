"use client";

import { useActionState } from "react";
import { login, type ActionState } from "../actions";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    login,
    {},
  );

  return (
    <form action={formAction} className="mt-8">
      <input type="hidden" name="next" value={next} />

      <label className="field-label" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        className="field"
        autoComplete="current-password"
        required
        autoFocus
      />

      {state.error ? (
        <p className="mt-3 text-sm text-red-600">{state.error}</p>
      ) : null}

      <button
        type="submit"
        className="btn btn-primary mt-6 w-full"
        disabled={pending}
      >
        {pending ? "Checking" : "Sign in"}
      </button>
    </form>
  );
}
