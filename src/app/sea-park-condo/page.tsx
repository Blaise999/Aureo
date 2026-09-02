import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";
import { Carousel } from "@/components/Carousel";
import { images } from "@/lib/images";

export const metadata: Metadata = { title: "Sea Park" };

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHeader title="Sea Park" subtitle={"Condominium residences on the Aureo La Union shoreline."} photo={images.facilities.exterior} />
        <div className="main-raised">
          <section className="section">
            <div className="mx-auto max-w-[1170px] px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <p className="description">
                  Sea Park sits alongside the resort on the same stretch of
                  shoreline. Unit types, floor plans and current pricing come
                  from the sales team directly.
                </p>
                <a
                  href="mailto:reservations@aureohotels.com?subject=Sea%20Park%20enquiry"
                  className="btn btn-primary mt-8"
                >
                  Request the details
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
