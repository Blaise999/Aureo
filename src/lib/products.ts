import { images, type Photo } from "./images";

/**
 * The shop catalogue, transcribed from the live WooCommerce store.
 *
 * Prices are in PHP and were correct as of the scrape — re-confirm before
 * launch, and confirm whether the variable products have per-variant
 * pricing (the old store showed a range, which usually means they do).
 *
 * NOTE: this is the catalogue only. Orders, stock levels and payment all
 * need a database and a payment provider — see README.
 */

export interface Variant {
  id: string;
  label: string;
  /** Price in centavos, to avoid floating point on money. */
  price: number;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string[];
  photo: Photo;
  sku: string;
  /** Simple products carry one variant named "Default". */
  variants: Variant[];
}

export const products: Product[] = [
  {
    slug: "aureo-water-bottle",
    name: "Insulated Bottled Water",
    category: "Beverage",
    categorySlug: "beverage",
    shortDescription: "Aureo Insulated Water Bottle 20oz",
    description: [
      "A 20oz insulated bottle, co-branded with Klean Kanteen. Keeps cold drinks cold through an afternoon on the beach.",
    ],
    photo: images.shop.bottle,
    sku: "aureo-water-bottle",
    variants: [{ id: "default", label: "20oz", price: 200000 }],
  },
  {
    slug: "gift-voucher",
    name: "Gift Voucher",
    category: "Gift",
    categorySlug: "gift",
    shortDescription: "Enjoy and re-experience nature",
    description: [
      "A gift voucher redeemable at the resort. Issued by value; check current terms and expiry with reservations before purchase.",
    ],
    photo: images.shop.voucher,
    sku: "gift-voucher",
    // TODO: confirm the actual denominations. The old store showed a
    // ₱8,000–₱20,000 range, so there are at least two.
    variants: [
      { id: "8000", label: "₱8,000", price: 800000 },
      { id: "20000", label: "₱20,000", price: 2000000 },
    ],
  },
  {
    slug: "aureo-face-mask",
    name: "Aureo Face Mask",
    category: "Accessories",
    categorySlug: "accessories",
    shortDescription: "Aureo Face Mask, two colours",
    description: ["A branded cloth face mask, available in two colours."],
    photo: images.shop.faceMask,
    sku: "AureoMask",
    // TODO: confirm which two colours.
    variants: [
      { id: "colour-1", label: "Colour 1", price: 10000 },
      { id: "colour-2", label: "Colour 2", price: 10000 },
    ],
  },
  {
    slug: "dagat-father-shirt",
    name: "Dagat Father Shirt",
    category: "Clothing",
    categorySlug: "clothing",
    shortDescription: "Dagat Father T-Shirt (Black)",
    description: ["A black cotton t-shirt with the Dagat Father print."],
    photo: images.shop.shirt,
    sku: "DagatShirt",
    // TODO: confirm the size run and which sizes carry the higher price.
    variants: [
      { id: "s", label: "Small", price: 40000 },
      { id: "m", label: "Medium", price: 40000 },
      { id: "l", label: "Large", price: 45000 },
      { id: "xl", label: "Extra Large", price: 45000 },
    ],
  },
];

/**
 * The live site colours each shop category differently (Hestia rotates a
 * palette per term). Reproduced here so the shop grid matches.
 */
export const categoryColour: Record<string, string> = {
  beverage: "#9c27b0",
  gift: "#00bcd4",
  accessories: "#f44336",
  clothing: "#ff9800",
};

export function productBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

const peso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
});

export function formatPrice(centavos: number): string {
  return peso.format(centavos / 100);
}

/** "₱400.00 – ₱450.00" for variable products, a single price otherwise. */
export function priceRange(product: Product): string {
  const prices = product.variants.map((variant) => variant.price);
  const low = Math.min(...prices);
  const high = Math.max(...prices);
  return low === high
    ? formatPrice(low)
    : `${formatPrice(low)} – ${formatPrice(high)}`;
}
