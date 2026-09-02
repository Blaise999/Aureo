import Image from "next/image";
import type { Photo } from "@/lib/images";

/**
 * The theme's `page-header header-small`: a background image behind a
 * 50% black filter, with the page title centred over it.
 */
export function PageHeader({
  title,
  subtitle,
  photo,
}: {
  title: string;
  subtitle?: string;
  photo: Photo;
}) {
  return (
    <section className="header-filter relative flex min-h-[55vh] items-center justify-center overflow-hidden bg-black pb-16 pt-40">
      <Image
        src={photo.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="relative z-[2] mx-auto max-w-[900px] px-4 text-center">
        <h1 className="section-title text-white">{title}</h1>
        {subtitle ? (
          <p className="description mx-auto mt-4 max-w-[700px] text-white/80">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
