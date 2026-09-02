import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";
import { NewsletterForm } from "@/components/NewsletterForm";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const { resort, head } = site.offices;

  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHeader title="Contact Us" photo={images.facilities.lobby} />

        <div className="main-raised">
          <section className="section">
            <div className="mx-auto max-w-[1170px] px-4">
              <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-6">
                  <h2 className="section-title-xxl">{resort.label}</h2>
                  <hr className="divider divider-left" />
                  <address className="description not-italic">
                    {resort.address}
                  </address>

                  <h3 className="info-title mt-6">
                    Reservations ({resort.reservationsNote})
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {resort.reservations.map((number) => (
                      <li key={number}>
                        <a
                          href={`tel:${number.replace(/[^\d+]/g, "")}`}
                          className="text-sm"
                        >
                          {number}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <h3 className="info-title mt-6">Telephone</h3>
                  <ul className="mt-2 space-y-1">
                    {resort.telephone.map((number) => (
                      <li key={number}>
                        <a
                          href={`tel:${number.replace(/[^\d+]/g, "")}`}
                          className="text-sm"
                        >
                          {number}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <h2 className="section-title-xxl mt-12">{head.label}</h2>
                  <hr className="divider divider-left" />
                  <address className="description not-italic">
                    {head.address}
                  </address>
                  <p className="mt-2 text-sm">
                    <a href={`tel:${head.telephone[0].replace(/[^\d+]/g, "")}`}>
                      {head.telephone[0]}
                    </a>
                  </p>
                  <p className="mt-2 text-sm">
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </p>
                </div>

                <div className="lg:col-span-5 lg:col-start-8">
                  <div className="card overflow-hidden pt-5">
                    <div className="card-header-primary text-center">
                      <h2 className="text-lg font-bold">Subscribe</h2>
                    </div>
                    <NewsletterForm />
                  </div>
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
