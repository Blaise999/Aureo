import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Carousel } from "@/components/Carousel";
import { roomPages, roomPageBySlug, headerImageUrl } from "@/lib/room-pages";
import { getRoom, formatRate } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return roomPages.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = roomPageBySlug(slug);
  if (!room) return { title: "Room not found" };
  return { title: room.name, description: room.description };
}

/**
 * Mirrors the live page section for section:
 *   header band -> BOOK NOW -> carousel -> description -> two amenity
 *   columns -> "Have Questions?" + INQUIRE.
 *
 * Content sits in a centred 8-of-12 column, as the theme does.
 */
export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = roomPageBySlug(slug);
  if (!page) notFound();

  // Rates and photo overrides come from the admin panel, if set.
  const live = await getRoom(slug);
  const photos = live?.photos?.length ? live.photos : page.photos;

  return (
    <>
      <SiteHeader />

      <main id="main">
        {/* page-header header-small */}
        <section className="header-filter relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-black pt-[110px]">
          <Image
            src={headerImageUrl(page.headerImage)}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="relative z-[2] px-4 text-center">
            <h1 className="section-title text-white">{page.name}</h1>
          </div>
        </section>

        <div className="main-raised">
          <div className="mx-auto max-w-[1170px] px-4 py-14">
            {/* Content column: col-md-8 col-md-offset-2 on the live site. */}
            <div className="mx-auto max-w-[780px]">
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

              <div className="mt-10">
                <Carousel photos={photos} aspect="aspect-[16/9]" priority />
              </div>

              <p className="mt-10 text-base leading-relaxed">
                {page.description}
              </p>

              {live?.nightlyRateFrom != null ? (
                <p className="mt-6 text-xl font-bold text-body-text">
                  From {formatRate(live.nightlyRateFrom)}{" "}
                  <span className="text-base font-normal text-muted">
                    per night
                  </span>
                </p>
              ) : null}

              <p className="mt-8 font-bold">In-Room Amenities Include:</p>

              <div className="mt-6 grid gap-10 sm:grid-cols-2">
                {page.amenityColumns.map((column, index) => (
                  <div key={index}>
                    {column.map((group) => (
                      <div key={group.heading} className="mb-7">
                        <h2 className="text-sm font-bold uppercase tracking-wide text-body-text">
                          {group.heading}
                        </h2>
                        <ul className="mt-2">
                          {group.items.map((item) => (
                            <li key={item} className="text-base leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
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
