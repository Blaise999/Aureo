import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";
import { Accordion } from "@/components/Accordion";
import { images } from "@/lib/images";
import { premiumRoomsFaqs } from "@/lib/faqs";
import { premiumIntro, premiumSections, premiumVideoUrl } from "@/lib/premium";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Premium Rooms",
  description:
    "Enjoy the peace and tranquility just a minute away from the golden beach of Aureo. Experience condo living while enjoying Aureo resort facilities.",
};

export default function PremiumRoomsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHeader title="Premium Rooms" photo={images.rooms.villaBanner} />

        <div className="main-raised">
          <section className="section">
            <div className="mx-auto max-w-[900px] px-4 text-center">
              <h2 className="section-title-xxl">The Premium Rooms</h2>
              <hr className="divider" />
              <p className="description mt-4">{premiumIntro}</p>
              <a href="#enquire" className="btn btn-primary mt-8">
                Inquire
              </a>
            </div>

            <div className="mx-auto mt-14 max-w-[1170px] px-4">
              {/* Served from the client's WordPress. Move to a CDN or a
                  streaming host before launch — a 1080p MP4 off shared
                  hosting will be slow for guests on mobile data. */}
              <video
                controls
                preload="metadata"
                playsInline
                className="w-full rounded"
                poster={premiumSections[0].image}
              >
                <source src={premiumVideoUrl} type="video/mp4" />
                Your browser cannot play this video.
              </video>
            </div>
          </section>

          <section className="section bg-section-gray">
            <div className="mx-auto max-w-[1170px] px-4">
              <div className="grid gap-10 md:grid-cols-2">
                {premiumSections.map((section) => (
                  <article key={section.title}>
                    <div className="relative aspect-[3/2] overflow-hidden rounded">
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      {section.comingSoon ? (
                        <span className="absolute left-4 top-4 rounded bg-black/70 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                          Coming soon
                        </span>
                      ) : null}
                    </div>

                    <h3 className="section-title-xxl mt-6 text-2xl">
                      <Link href={section.href}>{section.title}</Link>
                    </h3>
                    <p className="description mt-3 text-sm">{section.body}</p>
                    <p className="mt-3">
                      <Link
                        href={section.href}
                        className="text-sm font-bold uppercase tracking-wide"
                      >
                        More information
                      </Link>
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="mx-auto max-w-[820px] px-4">
              <h2 className="section-title-xxl text-center">
                Frequently asked questions
              </h2>
              <hr className="divider" />
              <div className="mt-8">
                <Accordion items={premiumRoomsFaqs} />
              </div>
            </div>
          </section>

          <section id="enquire" className="section bg-section-gray">
            <div className="mx-auto max-w-[820px] px-4 text-center">
              <h2 className="section-title-xxl">For inquiries</h2>
              <hr className="divider" />

              <p className="mt-6">
                <a href={`mailto:${site.email}`} className="text-lg">
                  {site.email}
                </a>
              </p>

              <h3 className="info-title mt-8">Mobile</h3>
              <p className="description text-sm">
                {site.offices.resort.reservations.join(" | ")}
              </p>

              <h3 className="info-title mt-6">Telephone</h3>
              <p className="description text-sm">
                {site.offices.head.telephone[0]} ·{" "}
                {site.offices.resort.telephone[2]}
              </p>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
