"use client";

import { useActionState } from "react";
import { savePayment, type ActionState } from "../actions";
import type { PaymentMethod } from "@/lib/store";

const KINDS = [
  { value: "bank", label: "Bank transfer" },
  { value: "gcash", label: "GCash" },
  { value: "maya", label: "Maya" },
  { value: "card", label: "Card" },
  { value: "other", label: "Other" },
];

export function PaymentEditor({
  methods,
  note,
}: {
  methods: PaymentMethod[];
  note: string;
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    savePayment,
    {},
  );

  return (
    <form action={formAction} className="mt-8">
      <label className="field-label" htmlFor="note">
        Note shown above the payment methods
      </label>
      <textarea
        id="note"
        name="note"
        rows={3}
        className="field"
        defaultValue={note}
      />

      <div className="mt-8 space-y-4">
        {methods.length === 0 ? (
          <p className="description text-sm">
            No payment methods yet. Add one below.
          </p>
        ) : null}

        {methods.map((method) => (
          <fieldset
            key={method.id}
            className="rounded border border-hairline p-5"
          >
            <legend className="px-2 text-xs uppercase tracking-wide text-muted">
              {method.label || "New method"}
            </legend>

            <input type="hidden" name="id" value={method.id} />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor={`kind-${method.id}`}>
                  Type
                </label>
                <select
                  id={`kind-${method.id}`}
                  name={`kind-${method.id}`}
                  className="field"
                  defaultValue={method.kind}
                >
                  {KINDS.map((kind) => (
                    <option key={kind.value} value={kind.value}>
                      {kind.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="field-label" htmlFor={`label-${method.id}`}>
                  Name shown to customers
                </label>
                <input
                  id={`label-${method.id}`}
                  name={`label-${method.id}`}
                  className="field"
                  defaultValue={method.label}
                  placeholder="BPI, GCash…"
                />
              </div>

              <div>
                <label
                  className="field-label"
                  htmlFor={`accountName-${method.id}`}
                >
                  Account name
                </label>
                <input
                  id={`accountName-${method.id}`}
                  name={`accountName-${method.id}`}
                  className="field"
                  defaultValue={method.accountName}
                />
              </div>

              <div>
                <label
                  className="field-label"
                  htmlFor={`accountNumber-${method.id}`}
                >
                  Account or mobile number
                </label>
                <input
                  id={`accountNumber-${method.id}`}
                  name={`accountNumber-${method.id}`}
                  className="field"
                  defaultValue={method.accountNumber}
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                className="field-label"
                htmlFor={`instructions-${method.id}`}
              >
                Instructions (optional)
              </label>
              <input
                id={`instructions-${method.id}`}
                name={`instructions-${method.id}`}
                className="field"
                defaultValue={method.instructions}
                placeholder="Send proof of payment to reservations@…"
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name={`enabled-${method.id}`}
                  defaultChecked={method.enabled}
                  className="accent-gold"
                />
                Show on the website
              </label>

              <p className="text-xs text-muted">
                To remove this method, clear the name field and save.
              </p>
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Saving" : "Save"}
        </button>
        {state.ok ? (
          <span className="text-sm text-green-700">{state.ok}</span>
        ) : null}
        {state.error ? (
          <span className="text-sm text-red-600">{state.error}</span>
        ) : null}
      </div>
    </form>
  );
}
