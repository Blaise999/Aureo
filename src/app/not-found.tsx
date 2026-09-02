import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHeader } from "@/components/PageHeader";
import { images } from "@/lib/images";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHeader title="Page not found" photo={images.facilities.grounds} />
        <div className="main-raised">
          <section className="section">
            <div className="mx-auto max-w-[700px] px-4 text-center">
              <p className="description">
                That page is not here. The link may be from the old site.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/rooms" className="btn btn-primary">
                  See the rooms
                </Link>
                <Link
                  href="/"
                  className="btn"
                  style={{ border: "1px solid #e0e0e0", color: "#3c4858" }}
                >
                  Home
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
