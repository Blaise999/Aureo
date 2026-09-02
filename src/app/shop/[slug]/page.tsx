import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AddToCart } from "@/components/AddToCart";
import { products, productBySlug } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.name, description: product.shortDescription };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <SiteHeader />
      <main id="main" className="pt-[120px]">
        <div className="main-raised mt-8">
          <section className="section">
            <div className="mx-auto max-w-[1170px] px-4">
              <p className="mb-6 text-sm">
                <Link href="/shop">Shop</Link>
                <span className="mx-2 text-muted">/</span>
                <span className="text-muted">{product.category}</span>
              </p>

              <div className="grid gap-12 lg:grid-cols-2">
                <div className="relative aspect-[3/2] overflow-hidden rounded">
                  <Image
                    src={product.photo.src}
                    alt={product.photo.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-muted">
                    {product.category}
                  </p>
                  <h1 className="section-title mt-2">{product.name}</h1>

                  {product.description.map((paragraph) => (
                    <p key={paragraph} className="description mt-4">
                      {paragraph}
                    </p>
                  ))}

                  <AddToCart product={product} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
