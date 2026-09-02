"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { formatPrice, type Product } from "@/lib/products";

/** Variant picker, quantity, and the add button. */
export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variant =
    product.variants.find((candidate) => candidate.id === variantId) ??
    product.variants[0];

  const hasOptions = product.variants.length > 1;

  return (
    <div>
      <p className="mt-4 text-2xl font-bold text-body-text">
        {formatPrice(variant.price)}
      </p>

      {hasOptions ? (
        <div className="mt-6">
          <label className="field-label" htmlFor="variant">
            Options
          </label>
          <select
            id="variant"
            className="field"
            value={variantId}
            onChange={(event) => {
              setVariantId(event.target.value);
              setAdded(false);
            }}
          >
            {product.variants.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label} — {formatPrice(option.price)}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="mt-6 max-w-[120px]">
        <label className="field-label" htmlFor="quantity">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          max={99}
          className="field"
          value={quantity}
          onChange={(event) => {
            setQuantity(Math.max(1, Number(event.target.value) || 1));
            setAdded(false);
          }}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            add(product.slug, variantId, quantity);
            setAdded(true);
          }}
        >
          Add to cart
        </button>

        {added ? (
          <Link href="/cart" className="text-sm font-bold uppercase tracking-wide">
            View cart
          </Link>
        ) : null}
      </div>

      <p className="mt-6 text-xs text-muted">SKU: {product.sku}</p>
    </div>
  );
}
