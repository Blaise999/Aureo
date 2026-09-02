import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";
import { Carousel } from "@/components/Carousel";
import { images } from "@/lib/images";

export const metadata: Metadata = { title: "Events" };

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHeader title="Events" subtitle={"Weddings, receptions and corporate events at Aureo La Union."} photo={images.events.wedding} />
        <div className="main-raised">
          <section className="section">
            <div className="mx-auto max-w-[1170px] px-4">
              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <Carousel photos={[images.events.wedding]} aspect="aspect-[3/2]" />
                  <h2 className="section-title-xxl mt-6 text-center">Weddings</h2>
                  <hr className="divider" />
                  <p className="description text-center">
                    Beach and garden ceremonies with reception spaces indoors
                    and out. Capacities and packages vary by season — contact
                    the events team for current details.
                  </p>
                </div>
                <div>
                  <Carousel photos={[images.events.corporate]} aspect="aspect-[3/2]" />
                  <h2 className="section-title-xxl mt-6 text-center">Corporate</h2>
                  <hr className="divider" />
                  <p className="description text-center">
                    Function rooms, accommodation and catering on one property,
                    a four-hour drive from Metro Manila.
                  </p>
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
