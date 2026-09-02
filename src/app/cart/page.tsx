import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CartView } from "@/components/CartView";
import { getPaymentMethods } from "@/lib/content";

export const metadata: Metadata = { title: "Cart" };

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const { methods, note } = await getPaymentMethods();

  return (
    <>
      <SiteHeader />
      <main id="main" className="pt-[120px]">
        <div className="main-raised mt-8">
          <section className="section">
            <div className="mx-auto max-w-[900px] px-4">
              <h1 className="section-title">Cart</h1>
              <hr className="divider divider-left" />
              <CartView paymentMethods={methods} paymentNote={note} />
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
