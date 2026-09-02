import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { EntryPopup } from "@/components/EntryPopup";
import { SiteFooter } from "@/components/SiteFooter";
import { Carousel } from "@/components/Carousel";
import { NewsletterForm } from "@/components/NewsletterForm";
import { images } from "@/lib/images";
import { products, priceRange, categoryColour } from "@/lib/products";
import { site } from "@/lib/site";

/** The three room panels under "Explore our rooms." */
const roomPanels = [
  {
    heading: "SUPERIOR",
    photos: images.rooms.superior,
    body: "Our Superior Rooms comfort and style seamlessly blend to create a home away from home.",
    href: "/rooms/superior-room",
  },
  {
    heading: "DELUXE",
    photos: images.rooms.deluxe,
    body: "Our Deluxe Rooms boast of the best the resort has to offer.",
    href: "/rooms/deluxe-room",
  },
  {
    heading: "LUXURY POOL VILLAS",
    photos: images.rooms.villas,
    body: "Exclusive and Luxurious escapes await you with Aureo La Union Luxury villas, offering 10 luxury villas with its own private pool.",
    href: "/rooms/luxury-villas",
  },
];

const facilityPhotos = [
  images.events.wedding,
  images.events.corporate,
  images.facilities.lazyRiver,
  images.facilities.lobbyPhaseFour,
  images.facilities.grounds,
  images.facilities.exterior,
  images.facilities.lobby,
  images.facilities.features,
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <EntryPopup
        href="/rooms/luxury-villas"
        image={images.rooms.villaBanner.src}
      />

      <main id="main">
        {/* Header image with the BOOK NOW call to action centred over it. */}
        <section className="header-filter relative flex min-h-[62vh] items-center justify-center overflow-hidden bg-black pt-[120px]">
          <Image
            src={images.hero.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="relative z-[2] px-4 text-center">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Book now
            </a>
          </div>
        </section>

        <div className="main-raised overflow-hidden">
          {/* ---- Features ------------------------------------------------ */}
          <section className="section">
            <div className="mx-auto max-w-[1170px] px-4">
              <div className="mx-auto max-w-[860px] text-center">
                <h2 className="section-title">
                  A Secluded Resort that Exudes Luxury and Embraces Nature, Set
                  Against a Backdrop of Golden Sunsets and Pristine Waters.
                </h2>
                <p className="description mt-6">
                  Aureo Resort is your sanctuary to relax and unwind. From
                  serene beaches to infinity pools, we provide a tranquil
                  environment to recuperate after a tiresome work week. Create
                  memories with fun-filled activities. Enjoy the fresh breeze
                  and glide with the waves for selfie-captured moments.
                  We&apos;re located in the heart of La Union that is a 4-hour
                  drive outside the metro.
                </p>
              </div>

              <div className="mt-12 text-center">
                <Link href="/about-the-resort" className="group inline-block">
                  <span className="mx-auto block text-3xl text-gold" aria-hidden="true">
                    »
                  </span>
                  <span className="info-title mt-2 block group-hover:text-gold">
                    DISCOVER MORE
                  </span>
                </Link>
              </div>
            </div>
          </section>

          {/* ---- Explore our rooms --------------------------------------- */}
          {/* Dark section, as on the live site. */}
          <section className="section bg-black">
            <div className="mx-auto max-w-[1170px] px-4">
              <h2 className="section-title-xxl text-center text-white">
                Explore our rooms.
              </h2>
              <hr className="divider" />

              <div className="mt-10 grid gap-10 md:grid-cols-3">
                {roomPanels.map((panel) => (
                  <div key={panel.heading}>
                    <Carousel photos={panel.photos} aspect="aspect-[3/2]" />
                    <hr className="divider" />
                    <h3 className="text-center text-xl font-bold tracking-wide text-white">
                      {panel.heading}
                    </h3>
                    <p className="mt-3 text-center text-base text-white/70">
                      {panel.body}
                    </p>
                    <p className="mt-4 text-center">
                      <Link
                        href={panel.href}
                        className="text-sm font-bold uppercase tracking-wide"
                      >
                        Discover more
                      </Link>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---- Facilities ---------------------------------------------- */}
          <section className="section pt-0">
            <div className="mx-auto max-w-[1170px] px-4">
              <h2 className="section-title-xxl text-center">Facilities</h2>
              <hr className="divider" />
              <div className="mt-8">
                <Carousel photos={facilityPhotos} aspect="aspect-[16/9]" />
              </div>
            </div>
          </section>

          {/* ---- Shop ---------------------------------------------------- */}
          <section className="section bg-section-gray">
            <div className="mx-auto max-w-[1170px] px-4">
              <div className="mx-auto max-w-[760px] text-center">
                <h2 className="section-title">Shop</h2>
                <p className="description mt-4">
                  Your well-loved Aureo products and merch from our A-Boutique
                  is now available online.
                </p>
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/shop/${product.slug}`}
                    className="card card-product flex flex-col pt-5 text-center"
                  >
                    <div className="relative -mt-5 mx-4 aspect-[3/2] overflow-hidden rounded shadow-lg">
                      <Image
                        src={product.photo.src}
                        alt={product.photo.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p
                        className="text-xs font-bold uppercase tracking-wide"
                        style={{ color: categoryColour[product.categorySlug] }}
                      >
                        {product.category}
                      </p>
                      <h4 className="info-title mt-2">{product.name}</h4>
                      <p className="description mt-2 flex-1 text-sm">
                        {product.shortDescription}
                      </p>
                      <p className="mt-4 text-lg font-bold text-body-text">
                        {priceRange(product)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ---- Newsletter + offices ------------------------------------ */}
          <section className="header-filter relative overflow-hidden bg-black py-20">
            <Image
              src={images.facilities.lapPool.src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="relative z-[2] mx-auto max-w-[1170px] px-4">
              <div className="grid gap-12 lg:grid-cols-12">
                <div className="text-white lg:col-span-5">
                  <h2 className="section-title text-white">
                    Subscribe to our newsletter
                  </h2>
                  <p className="description mt-4 text-white/80">
                    Be up-to-date and join our mailing list. Fill up the form to
                    receive updates on new promos and events.
                  </p>

                  <div className="mt-10 space-y-8">
                    <Office office={site.offices.resort} />
                    <Office office={site.offices.head} />
                  </div>
                </div>

                <div className="lg:col-span-5 lg:col-start-8">
                  <div className="card overflow-hidden pt-5">
                    <div className="card-header-primary text-center">
                      <h4 className="text-lg font-bold">Subscribe</h4>
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

function Office({
  office,
}: {
  office:
    | typeof site.offices.resort
    | typeof site.offices.head;
}) {
  const reservations = "reservations" in office ? office.reservations : [];
  const note = "reservationsNote" in office ? office.reservationsNote : "";

  return (
    <div className="flex gap-4">
      <span className="mt-1 text-gold" aria-hidden="true">
        ◆
      </span>
      <div>
        <h4 className="info-title text-white">{office.label}</h4>
        <address className="mt-1 text-sm not-italic leading-relaxed text-white/80">
          {office.address}
        </address>

        {reservations.length > 0 ? (
          <p className="mt-2 text-sm text-white/80">
            Reservations: {reservations.join(" · ")}{" "}
            <span className="text-white/60">({note})</span>
          </p>
        ) : null}

        <p className="mt-1 text-sm text-white/80">
          Telephone: {office.telephone.join(" · ")}
        </p>
      </div>
    </div>
  );
}
