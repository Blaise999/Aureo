import Link from "next/link";
import { footerLinks, nav, site } from "@/lib/site";

/**
 * Dark footer: three columns, a rule, then the full menu and the
 * copyright line — the same structure as the live site.
 *
 * The TripAdvisor Travellers' Choice widget and the Safety Seal image are
 * both from 2021. The seal has almost certainly lapsed. Confirm with the
 * client whether either should still be shown; displaying an expired
 * certification is worse than showing nothing.
 */
export function SiteFooter() {
  const { resort, head } = site.offices;

  return (
    <footer className="bg-footer text-white/80">
      <div className="mx-auto max-w-[1170px] px-4 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h5 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">
              More information
            </h5>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm uppercase text-white/70 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">
              Follow us
            </h5>
            <ul className="flex gap-4">
              {site.social.map((channel) => (
                <li key={channel.name}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-full border border-gold text-xs font-bold text-gold transition-colors hover:bg-gold hover:text-white"
                    aria-label={channel.name}
                  >
                    {channel.name.slice(0, 2)}
                  </a>
                </li>
              ))}
            </ul>

            <h5 className="mb-3 mt-8 text-sm font-bold uppercase tracking-wide text-white">
              Travellers&apos; Choice
            </h5>
            <a
              href={site.tripAdvisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/70 hover:text-gold"
            >
              Read the reviews on TripAdvisor
            </a>
          </div>

          <div>
            <h5 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">
              Reservations
            </h5>
            <address className="text-sm not-italic leading-relaxed text-white/70">
              {resort.address}
            </address>
            <p className="mt-3 text-sm text-white/70">
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p className="mt-1 text-sm text-white/70">
              {head.telephone[0]}
            </p>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-5"
            >
              Book now
            </a>
          </div>
        </div>

        <hr className="my-10 border-white/15" />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {nav.map((item) =>
              item.external ? (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase text-white/60 hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ) : (
                <li key={`${item.label}-${item.href}`}>
                  <Link
                    href={item.href}
                    className="text-xs uppercase text-white/60 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <p className="text-xs text-white/50">{site.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
