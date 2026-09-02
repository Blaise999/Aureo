import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";
import { Carousel } from "@/components/Carousel";
import { images } from "@/lib/images";

export const metadata: Metadata = { title: "Wellness" };

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHeader title="Wellness" subtitle={"Massage and treatments at the resort spa."} photo={images.facilities.lapPool} />
        <div className="main-raised">
          <section className="section">
            <div className="mx-auto max-w-[1170px] px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <p className="description">
                  The spa offers massage and treatments throughout the day.
                  The full treatment menu and current rates are available at
                  the front desk — on long weekends the afternoon slots go
                  early, so ask when you check in.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
