import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";
import { images } from "@/lib/images";
import { products, priceRange, categoryColour } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Aureo products and merchandise from the A-Boutique, available online.",
};

export default function ShopPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHeader
          title="Shop"
          subtitle="Your well-loved Aureo products and merch from our A-Boutique is now available online."
          photo={images.facilities.lobby}
        />

        <div className="main-raised">
          <section className="section">
            <div className="mx-auto max-w-[1170px] px-4">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/shop/${product.slug}`}
                    className="card card-product flex flex-col pt-5 text-center"
                  >
                    <div className="relative -mt-5 mx-4 aspect-[3/2] overflow-hidden rounded shadow-lg">
                      <Image
                        src={product.photo.src}
                        alt={product.photo.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p
                        className="text-xs font-bold uppercase tracking-wide"
                        style={{ color: categoryColour[product.categorySlug] }}
                      >
                        {product.category}
                      </p>
                      <h2 className="info-title mt-2">{product.name}</h2>
                      <p className="description mt-2 flex-1 text-sm">
                        {product.shortDescription}
                      </p>
                      <p className="mt-4 text-lg font-bold text-body-text">
                        {priceRange(product)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
