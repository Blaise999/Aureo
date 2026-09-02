import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";
import { images } from "@/lib/images";
import { getPublishedRooms, formatRate } from "@/lib/content";
import { roomPageBySlug } from "@/lib/room-pages";

export const metadata: Metadata = { title: "Rooms" };

export const dynamic = "force-dynamic";

export default async function RoomsPage() {
  const rooms = (await getPublishedRooms()).filter(
    (room) => room.slug !== "condo",
  );

  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHeader title="Rooms" photo={images.rooms.deluxe[0]} />

        <div className="main-raised">
          <section className="section">
            <div className="mx-auto max-w-[1170px] px-4">
              <h2 className="section-title-xxl text-center">Explore our rooms.</h2>
              <hr className="divider" />

              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {rooms.map((room) => (
                  <Link
                    key={room.slug}
                    href={`/rooms/${room.slug}`}
                    className="card card-product overflow-hidden"
                  >
                    <div className="relative aspect-[3/2]">
                      <Image
                        src={room.photos[0].src}
                        alt={room.photos[0].alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="info-title">{room.name}</h3>
                      <p className="description mt-2 text-sm">
                        {roomPageBySlug(room.slug)?.description ?? room.summary}
                      </p>

                      {room.sizeSqm || room.sleeps ? (
                        <p className="mt-3 text-xs uppercase tracking-wide text-muted">
                          {[
                            room.sizeSqm
                              ? room.sizeSqmMax
                                ? `${room.sizeSqm}–${room.sizeSqmMax} sqm`
                                : `${room.sizeSqm} sqm`
                              : null,
                            room.sleeps ? `Up to ${room.sleeps} guests` : null,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      ) : null}
                      {room.nightlyRateFrom !== null ? (
                        <p className="mt-4 text-base font-bold text-body-text">
                          From {formatRate(room.nightlyRateFrom)}{" "}
                          <span className="text-sm font-normal text-muted">
                            per night
                          </span>
                        </p>
                      ) : null}
                      <p className="mt-3 text-sm font-bold uppercase tracking-wide text-gold">
                        Discover more
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
