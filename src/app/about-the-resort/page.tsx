import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyVideo } from "@/components/StickyVideo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Looking for the best beach resort in La Union? Discover Aureo Hotels and Resorts and bask in the calming ambience of our place. Learn more about us!",
};

const UPLOADS = "https://www.aureohotels.com/wp-content/uploads/";
const HEADER = `${UPLOADS}2020/02/cropped-header_update_2-1.jpg`;

/**
 * Matches the live page: header band, then the sticky video, then the body
 * copy — all inside the theme's centred 8-of-12 column.
 */
export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <section className="header-filter relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-black pt-[110px]">
          <Image src={HEADER} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="relative z-[2] px-4 text-center">
            <h1 className="section-title text-white">About</h1>
          </div>
        </section>

        <div className="main-raised">
          <div className="mx-auto max-w-[1170px] px-4 py-14">
            <div className="mx-auto max-w-[780px]">
              <StickyVideo
                embedId="39RDtQ5cLQ0"
                poster={HEADER}
                title="Aureo La Union"
              />

              <h2 className="mt-12 text-2xl font-bold text-body-text">
                Enter a World that Revolves Around You
              </h2>

              <p className="mt-5 text-base leading-relaxed">
                Aureo is a first-class luxury resort in San Fernando, La Union.
                It boasts of 58 villa rooms and 116 tropical-themed hotel rooms,
                each distinctly designed to provide you an indulgent stay in
                paradise. The resort is located on a 400-meter stretch along the
                golden beach of San Fernando. The development integrates with
                its natural habitat where the original green landscape was
                retained to complement the tranquility of the place.
              </p>

              <p className="mt-5 text-base leading-relaxed">
                Aureo, derived from <em>&ldquo;Oro&rdquo;</em>, the Latin word
                for Gold, began its operations in 2016 with the concept of
                bringing everyone the perfect home away from home. Each room
                offers a generous private balcony where one can relax and soak
                in the view and the stunning sunsets over the West Philippine
                Sea. Everything on the property is designed, built, and intended
                to pamper you.
              </p>

              <p className="mt-5 text-base leading-relaxed">
                Enjoy our wide selection of cuisines and refreshing cocktails in
                the resort&apos;s many{" "}
                <Link href="/facilities">facilities</Link>, including the A
                Bistro, Salt + Sea, the Coast Bar and Restaurant, or while
                lounging poolside or frolicking on the shore. The resort also
                offers local delicacies that are created and mastered by our
                very own chefs, and is served at the Coast Restaurant, which is
                strategically located to take full advantage of the seafront
                view.
              </p>

              <p className="mt-5 text-base leading-relaxed">
                Discover one of the world&apos;s most beautiful beaches and
                experience an unforgettable beach holiday, only in Aureo La
                Union, where the world revolves around you.
              </p>

              <p className="mt-8 font-bold">Book your reservation now!</p>

              <p className="mt-4">
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Book now
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
