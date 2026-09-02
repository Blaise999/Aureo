"use client";

import { useState } from "react";

/**
 * The live site posts these fields to Mailchimp (list 2150, "Aureo MC").
 * Nothing is wired up yet: set MAILCHIMP_ACTION to the list's form action,
 * or better, POST to a route handler so the audience ID stays server-side.
 */
const MAILCHIMP_ACTION = "";

type Status = "idle" | "sending" | "done" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState({
    FNAME: "",
    LNAME: "",
    EMAIL: "",
    BIRTHDAY: "",
    PHONE: "",
  });
  const [agreed, setAgreed] = useState(false);

  function set(key: keyof typeof fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    if (status === "error") setStatus("idle");
  }

  async function submit() {
    if (!fields.FNAME.trim() || !fields.EMAIL.includes("@") || !agreed) {
      setStatus("error");
      return;
    }

    if (!MAILCHIMP_ACTION) {
      console.warn("Newsletter: MAILCHIMP_ACTION is not configured.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await fetch(MAILCHIMP_ACTION, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(fields),
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="px-5 py-8 text-sm text-body-text">
        Thank you — you are on the list.
      </p>
    );
  }

  return (
    <div className="space-y-4 px-5 pb-6 pt-6">
      <div>
        <label className="field-label" htmlFor="nl-fname">
          First Name:
        </label>
        <input
          id="nl-fname"
          className="field"
          placeholder="First Name"
          value={fields.FNAME}
          onChange={(event) => set("FNAME", event.target.value)}
          required
        />
      </div>

      <div>
        <label className="field-label" htmlFor="nl-lname">
          Last Name:
        </label>
        <input
          id="nl-lname"
          className="field"
          placeholder="Last Name"
          value={fields.LNAME}
          onChange={(event) => set("LNAME", event.target.value)}
        />
      </div>

      <div>
        <label className="field-label" htmlFor="nl-email">
          Email address:
        </label>
        <input
          id="nl-email"
          type="email"
          className="field"
          placeholder="Email"
          value={fields.EMAIL}
          onChange={(event) => set("EMAIL", event.target.value)}
          required
        />
      </div>

      <div>
        <label className="field-label" htmlFor="nl-birthday">
          Birthday
        </label>
        <input
          id="nl-birthday"
          className="field"
          placeholder="MM/DD"
          pattern="(0[1-9]|1[012]).(0[1-9]|1[0-9]|2[0-9]|3[01])"
          value={fields.BIRTHDAY}
          onChange={(event) => set("BIRTHDAY", event.target.value)}
        />
      </div>

      <div>
        <label className="field-label" htmlFor="nl-phone">
          Phone Number
        </label>
        <input
          id="nl-phone"
          type="tel"
          className="field"
          value={fields.PHONE}
          onChange={(event) => set("PHONE", event.target.value)}
        />
      </div>

      <label className="flex items-start gap-2 pt-2 text-xs text-body-text">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
          className="mt-[3px] accent-gold"
        />
        <span>I have read and agree to the terms &amp; conditions</span>
      </label>

      {status === "error" ? (
        <p className="text-xs text-red-600">
          Check the required fields and the terms box, then try again.
        </p>
      ) : null}

      <button
        type="button"
        onClick={submit}
        disabled={status === "sending"}
        className="btn btn-primary w-full"
      >
        {status === "sending" ? "Sending" : "Subscribe"}
      </button>
    </div>
  );
}
