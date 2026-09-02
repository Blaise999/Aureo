import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";
import { Accordion } from "@/components/Accordion";
import { images } from "@/lib/images";
import { premiumRoomsFaqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Common questions about staying at Aureo La Union — location, rates, payment, children and group bookings.",
};

/**
 * These are the FAQs published on the Premium Rooms page. The live site also
 * has a separate /FAQs/ page which could not be retrieved (its footer link
 * is broken — see README). Reconcile the two before launch.
 */
export default function FaqsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHeader title="FAQs" photo={images.facilities.grounds} />

        <div className="main-raised">
          <section className="section">
            <div className="mx-auto max-w-[820px] px-4">
              <Accordion items={premiumRoomsFaqs} />
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
