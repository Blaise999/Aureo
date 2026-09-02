import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";
import { FilterGallery } from "@/components/FilterGallery";
import { images } from "@/lib/images";
import { galleryEntries } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Rooms, pools, amenities and the beach at Aureo La Union, San Fernando.",
};

export default function GalleryPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHeader title="Gallery" photo={images.hero} />

        <div className="main-raised">
          <section className="section">
            <div className="mx-auto max-w-[1170px] px-4">
              <FilterGallery />

              <p className="mt-12 text-center text-xs text-muted">
                {galleryEntries.length} photographs. Higher-resolution
                originals to be requested from the client before launch.
              </p>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
