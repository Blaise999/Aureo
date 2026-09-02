"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/products";
import type { PaymentMethod } from "@/lib/store";

/**
 * The cart, and where the rebuild currently stops.
 *
 * Checkout needs three things this project does not have yet: a database
 * to write orders to, a payment provider (PayMongo or Xendit for GCash and
 * Maya in the Philippines), and somewhere for staff to see what came in.
 * Rather than fake a checkout button that goes nowhere, this states the
 * position and offers the two routes that actually work today.
 */
export function CartView({
  paymentMethods,
  paymentNote,
}: {
  paymentMethods: PaymentMethod[];
  paymentNote: string;
}) {
  const { resolved, subtotal, itemCount, setQuantity, remove } = useCart();

  if (resolved.length === 0) {
    return (
      <div className="py-10">
        <p className="description">Your cart is empty.</p>
        <Link href="/shop" className="btn btn-primary mt-6">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6">
      <ul>
        {resolved.map((line) => (
          <li
            key={`${line.productSlug}-${line.variantId}`}
            className="flex flex-wrap items-center gap-4 border-b border-hairline py-5"
          >
            <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded">
              <Image
                src={line.product.photo.src}
                alt={line.product.photo.alt}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>

            <div className="min-w-[160px] flex-1">
              <Link
                href={`/shop/${line.product.slug}`}
                className="info-title block"
              >
                {line.product.name}
              </Link>
              {line.product.variants.length > 1 ? (
                <p className="text-sm text-muted">{line.variant.label}</p>
              ) : null}
              <p className="text-sm text-muted">
                {formatPrice(line.variant.price)} each
              </p>
            </div>

            <div className="w-[90px]">
              <label className="sr-only" htmlFor={`qty-${line.productSlug}-${line.variantId}`}>
                Quantity for {line.product.name}
              </label>
              <input
                id={`qty-${line.productSlug}-${line.variantId}`}
                type="number"
                min={1}
                max={99}
                className="field"
                value={line.quantity}
                onChange={(event) =>
                  setQuantity(
                    line.productSlug,
                    line.variantId,
                    Number(event.target.value) || 1,
                  )
                }
              />
            </div>

            <p className="w-[110px] text-right font-bold">
              {formatPrice(line.lineTotal)}
            </p>

            <button
              type="button"
              onClick={() => remove(line.productSlug, line.variantId)}
              className="text-sm text-muted hover:text-gold"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </p>
        <p className="text-xl font-bold">Subtotal {formatPrice(subtotal)}</p>
      </div>

      <div className="mt-10 rounded border border-hairline bg-section-gray p-6">
        <h2 className="info-title">How to pay</h2>
        <p className="description mt-2 text-sm">{paymentNote}</p>

        {paymentMethods.length > 0 ? (
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {paymentMethods.map((method) => (
              <li key={method.id} className="rounded bg-white p-4">
                <p className="info-title text-base">{method.label}</p>
                {method.accountName ? (
                  <p className="mt-1 text-sm">{method.accountName}</p>
                ) : null}
                {method.accountNumber ? (
                  <p className="text-sm font-bold tracking-wide">
                    {method.accountNumber}
                  </p>
                ) : null}
                {method.instructions ? (
                  <p className="mt-2 text-xs text-muted">
                    {method.instructions}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted">
            Payment details are being set up. Email or call reservations and
            they will take your order directly.
          </p>
        )}
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={`mailto:reservations@aureohotels.com?subject=${encodeURIComponent(
              "Shop order",
            )}&body=${encodeURIComponent(
              resolved
                .map(
                  (line) =>
                    `${line.quantity} x ${line.product.name}` +
                    (line.product.variants.length > 1
                      ? ` (${line.variant.label})`
                      : "") +
                    ` — ${formatPrice(line.lineTotal)}`,
                )
                .join("\n") + `\n\nSubtotal: ${formatPrice(subtotal)}`,
            )}`}
            className="btn btn-primary"
          >
            Email this order
          </a>
          <a
            href="tel:+63288931111"
            className="btn"
            style={{ border: "1px solid #e0e0e0", color: "#3c4858" }}
          >
            Call (02) 8893 1111
          </a>
        </div>
      </div>
    </div>
  );
}
