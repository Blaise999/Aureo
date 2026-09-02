import { readStore } from "@/lib/store";
import { addPaymentMethod } from "../actions";
import { PaymentEditor } from "./PaymentEditor";

export const dynamic = "force-dynamic";

export default async function AdminPaymentPage() {
  const store = await readStore();

  return (
    <div>
      <h1 className="text-2xl font-bold text-body-text">Payment options</h1>
      <p className="description mt-2 max-w-[60ch] text-sm">
        These appear on the cart page so customers know how to pay. Everything
        here is published on the public website — never put an API key or a
        password in these fields.
      </p>

      <PaymentEditor
        methods={store.payment.methods}
        note={store.payment.note}
      />

      <form action={addPaymentMethod} className="mt-6">
        <button type="submit" className="text-sm font-bold uppercase tracking-wide text-gold">
          Add a payment method
        </button>
      </form>
    </div>
  );
}
