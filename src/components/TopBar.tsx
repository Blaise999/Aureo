import { site } from "@/lib/site";

/**
 * Dark strip above the navbar. Socials left, phone numbers right, with the
 * "TEL:" and "MOBILE:" labels in gold and the numbers in white — matching
 * the live site.
 */
export function TopBar() {
  return (
    <div className="hidden bg-topbar text-white md:block">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-4 py-1.5">
        <ul className="flex items-center gap-4">
          {site.social.map((channel) => (
            <li key={channel.name}>
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-white hover:text-gold"
              >
                {channel.name === "TikTok" ? "Tiktok" : channel.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${site.email}`}
              className="text-[13px] text-white hover:text-gold"
              aria-label="Email reservations"
            >
              &#9993;
            </a>
          </li>
        </ul>

        <p className="text-[13px] text-white">
          <span className="text-gold">TEL:</span>{" "}
          (072) 888 0833 or (02) 8893 1111
          <span className="ml-6 text-gold">MOBILE:</span>{" "}
          (63) 917 822 5799
        </p>
      </div>
    </div>
  );
}
