import Image from "next/image";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Carousel } from "@/components/Carousel";
import {
  villaConfigurations,
  villaSharedFacilities,
  villaPetsPolicy,
  villaClosingPhotos,
} from "@/lib/amenities";
import { villaReservations } from "@/lib/rooms";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Luxury Pool Villas",
  description:
    "Exclusive and luxurious escape awaits you with Aureo La Union Luxury Villas, offering 10 luxury villas with its own private pool.",
};

const UPLOADS = "https://www.aureohotels.com/wp-content/uploads/";
const HEADER = `${UPLOADS}2023/01/DSC_0996e-scaled.jpg`;

function photos(paths: string[], alt: string) {
  return paths.map((path) => ({ src: `${UPLOADS}${path}`, alt }));
}

/**
 * Follows the live page order exactly: BOOK NOW, the reservations block,
 * the YouTube walkthrough, the intro, then each villa configuration as a
 * carousel followed by its spec list, a divider, the shared facilities,
 * and the closing carousel with "Have Questions?".
 */
export default function LuxuryVillasPage() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <section className="header-filter relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-black pt-[110px]">
          <Image src={HEADER} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="relative z-[2] px-4 text-center">
            <h1 className="section-title text-white">Luxury Pool Villas</h1>
          </div>
        </section>

        <div className="main-raised">
          <div className="mx-auto max-w-[1170px] px-4 py-14">
            <div className="mx-auto max-w-[820px]">
              <p className="text-center">
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Book now
                </a>
              </p>

              {/* The villas run their own reservations line. */}
              <div className="mt-10 text-center">
                <h2 className="text-xl font-bold">RESERVE NOW</h2>
                <p className="mt-3 font-bold">
                  TEL NO.: {villaReservations.telephone.join(" / ")}
                </p>
                <p className="mt-2 font-bold">
                  MOBILE NO.:{" "}
                  {villaReservations.mobile.map((number, index) => (
                    <span key={number} className="whitespace-nowrap">
                      {number}
                      {index < villaReservations.mobile.length - 1 ? " " : ""}
                    </span>
                  ))}
                </p>
              </div>

              <div className="relative mt-10 aspect-video w-full">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/Z6fPry3DK78"
                  title="The Luxury Villas by Aureo"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>

              <h2 className="mt-10 text-center text-xl font-bold leading-relaxed">
                Escape to our exclusive and luxurious The Luxury Villas by
                Aureo. Each villa offers its own private pool and is located
                just a few steps from the beach with sizes ranging from
                177sqm – 230sqm.
              </h2>

              {villaConfigurations.map((configuration, index) => (
                <section key={configuration.banner} className="mt-14">
                  <Carousel
                    photos={photos(configuration.photos, configuration.banner)}
                    aspect="aspect-[16/9]"
                  />

                  <h3 className="mt-8 text-center text-lg font-bold">
                    {configuration.banner}
                  </h3>
                  <h4 className="mt-4 text-center text-base font-bold">
                    {configuration.name}
                  </h4>

                  <ul className="mx-auto mt-4 max-w-[520px] list-disc pl-5">
                    {[...configuration.bedding, ...configuration.amenities].map(
                      (item) => (
                        <li key={item} className="leading-relaxed">
                          {item}
                        </li>
                      ),
                    )}
                    <li className="leading-relaxed">{villaPetsPolicy}</li>
                  </ul>

                  {index === 0 ? <hr className="divider mt-12" /> : null}
                </section>
              ))}

              <hr className="divider mt-14" />

              <p className="mt-8 text-center">
                <span className="font-bold">Other Facilities includes:</span>{" "}
                {villaSharedFacilities.join("  ")}
              </p>

              <div className="mt-12">
                <Carousel
                  photos={photos(villaClosingPhotos, "The Luxury Villas by Aureo")}
                  aspect="aspect-[16/9]"
                />
              </div>

              <div className="mt-12 text-center">
                <h2 className="text-base font-bold uppercase tracking-wide">
                  Have Questions?
                </h2>
                <a href="/contact-us" className="btn btn-primary mt-4">
                  Inquire
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
