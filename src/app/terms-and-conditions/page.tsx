import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms and Conditions", robots: { index: false } };

/**
 * PLACEHOLDER. The live site has this page; its text was not in the scrape.
 * This must come from the client verbatim. It governs bookings and shop purchases. Do not write one yourself.
 * Do not launch with this page in its current state.
 */
export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHeader title="Terms and Conditions" photo={images.facilities.grounds} />
        <div className="main-raised">
          <section className="section">
            <div className="mx-auto max-w-[800px] px-4">
              <p className="description">
                This page is being updated. For anything urgent, contact{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
