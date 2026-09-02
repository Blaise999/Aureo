"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { productBySlug, type Product, type Variant } from "@/lib/products";

/**
 * Client-side cart. Deliberately in memory only.
 *
 * It is tempting to persist this to localStorage, but a cart that survives
 * a refresh while orders have nowhere to go would be misleading — the
 * customer would think something was saved. Once the backend exists, this
 * moves to a server-side cart keyed by session.
 */

export interface CartLine {
  productSlug: string;
  variantId: string;
  quantity: number;
}

type Action =
  | { type: "add"; productSlug: string; variantId: string; quantity: number }
  | { type: "setQuantity"; productSlug: string; variantId: string; quantity: number }
  | { type: "remove"; productSlug: string; variantId: string }
  | { type: "clear" };

function reducer(lines: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "add": {
      const existing = lines.find(
        (line) =>
          line.productSlug === action.productSlug &&
          line.variantId === action.variantId,
      );
      if (existing) {
        return lines.map((line) =>
          line === existing
            ? { ...line, quantity: line.quantity + action.quantity }
            : line,
        );
      }
      return [
        ...lines,
        {
          productSlug: action.productSlug,
          variantId: action.variantId,
          quantity: action.quantity,
        },
      ];
    }
    case "setQuantity":
      if (action.quantity < 1) {
        return lines.filter(
          (line) =>
            !(
              line.productSlug === action.productSlug &&
              line.variantId === action.variantId
            ),
        );
      }
      return lines.map((line) =>
        line.productSlug === action.productSlug &&
        line.variantId === action.variantId
          ? { ...line, quantity: action.quantity }
          : line,
      );
    case "remove":
      return lines.filter(
        (line) =>
          !(
            line.productSlug === action.productSlug &&
            line.variantId === action.variantId
          ),
      );
    case "clear":
      return [];
  }
}

export interface ResolvedLine extends CartLine {
  product: Product;
  variant: Variant;
  lineTotal: number;
}

interface CartValue {
  lines: CartLine[];
  resolved: ResolvedLine[];
  itemCount: number;
  subtotal: number;
  add: (productSlug: string, variantId: string, quantity?: number) => void;
  setQuantity: (productSlug: string, variantId: string, quantity: number) => void;
  remove: (productSlug: string, variantId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);

  const value = useMemo<CartValue>(() => {
    const resolved = lines.flatMap((line) => {
      const product = productBySlug(line.productSlug);
      const variant = product?.variants.find(
        (candidate) => candidate.id === line.variantId,
      );
      // A line referencing a product that no longer exists is dropped
      // rather than crashing the cart.
      if (!product || !variant) return [];
      return [
        {
          ...line,
          product,
          variant,
          lineTotal: variant.price * line.quantity,
        },
      ];
    });

    return {
      lines,
      resolved,
      itemCount: resolved.reduce((total, line) => total + line.quantity, 0),
      subtotal: resolved.reduce((total, line) => total + line.lineTotal, 0),
      add: (productSlug, variantId, quantity = 1) =>
        dispatch({ type: "add", productSlug, variantId, quantity }),
      setQuantity: (productSlug, variantId, quantity) =>
        dispatch({ type: "setQuantity", productSlug, variantId, quantity }),
      remove: (productSlug, variantId) =>
        dispatch({ type: "remove", productSlug, variantId }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside <CartProvider>.");
  }
  return context;
}
