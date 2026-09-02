"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, type NavNode } from "@/lib/site";
import { images } from "@/lib/images";
import { TopBar } from "./TopBar";

/**
 * Fixed navbar: logo left, full menu right, matching the live site.
 * Dropdowns open on hover on desktop and on tap on mobile, and are
 * keyboard reachable through :focus-within (see globals.css).
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={scrolled ? "shadow-md" : ""}>
        <TopBar />

        <nav className="bg-white">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-4 py-3 lg:px-8">
            <Link
              href="/"
              className="relative block h-11 w-[160px] shrink-0 lg:h-14 lg:w-[190px]"
              onClick={() => setMenuOpen(false)}
            >
              <Image
                src={images.logo.src}
                alt={images.logo.alt}
                fill
                priority
                sizes="190px"
                className="object-contain object-left"
              />
            </Link>

            {/* The live menu wraps onto two right-aligned rows rather than
                scrolling or collapsing — reproduced here with flex-wrap. */}
            <ul className="hidden flex-1 flex-wrap items-center justify-end gap-y-1 xl:flex">
              {nav.map((item) => (
                <DesktopItem key={`${item.label}-${item.href}`} item={item} />
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex flex-col gap-[5px] p-2 xl:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="block h-[2px] w-6 bg-body-text" />
              <span className="block h-[2px] w-6 bg-body-text" />
              <span className="block h-[2px] w-6 bg-body-text" />
            </button>
          </div>
        </nav>
      </div>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="h-[calc(100vh-64px)] overflow-y-auto bg-white px-4 pb-16 pt-2 xl:hidden"
        >
          <ul>
            {nav.map((item) => (
              <MobileItem
                key={`${item.label}-${item.href}`}
                item={item}
                openSection={openSection}
                setOpenSection={setOpenSection}
                close={() => setMenuOpen(false)}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}

/* -------------------------------------------------------------------------- */

function DesktopItem({ item }: { item: NavNode }) {
  const hasChildren = Boolean(item.children?.length);

  return (
    <li className="nav-item relative">
      <NavAnchor
        item={item}
        className="flex items-center gap-1 px-3 py-2 text-[13px] font-medium uppercase tracking-wide text-body-text hover:text-gold"
      >
        <span className="nav-link-underline">{item.label}</span>
        {hasChildren ? <Caret /> : null}
      </NavAnchor>

      {hasChildren ? (
        <ul className="nav-dropdown">
          {item.children!.map((child) => (
            <li key={`${child.label}-${child.href}`} className="nav-item relative">
              <NavAnchor
                item={child}
                className="flex items-center justify-between gap-2 px-4 py-2 text-[13px] text-body-text hover:bg-section-gray hover:text-gold"
              >
                {child.label}
                {child.children?.length ? <Caret className="-rotate-90" /> : null}
              </NavAnchor>

              {child.children?.length ? (
                <ul className="nav-dropdown">
                  {child.children.map((grandchild) => (
                    <li key={grandchild.href}>
                      <NavAnchor
                        item={grandchild}
                        className="block px-4 py-2 text-[13px] text-body-text hover:bg-section-gray hover:text-gold"
                      >
                        {grandchild.label}
                      </NavAnchor>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function MobileItem({
  item,
  openSection,
  setOpenSection,
  close,
}: {
  item: NavNode;
  openSection: string | null;
  setOpenSection: (value: string | null) => void;
  close: () => void;
}) {
  const hasChildren = Boolean(item.children?.length);
  const isOpen = openSection === item.label;

  const childLinks = hasChildren
    ? item.children!.flatMap((child) =>
        child.children?.length ? child.children : [child],
      )
    : [];

  return (
    <li className="border-b border-hairline">
      <div className="flex items-center justify-between">
        <NavAnchor
          item={item}
          onClick={close}
          className="flex-1 py-3 text-sm font-medium uppercase tracking-wide text-body-text"
        >
          {item.label}
        </NavAnchor>

        {hasChildren ? (
          <button
            type="button"
            onClick={() => setOpenSection(isOpen ? null : item.label)}
            className="p-3"
            aria-expanded={isOpen}
            aria-label={`${isOpen ? "Hide" : "Show"} ${item.label} pages`}
          >
            <Caret className={isOpen ? "rotate-180" : ""} />
          </button>
        ) : null}
      </div>

      {hasChildren && isOpen ? (
        <ul className="pb-2 pl-4">
          {childLinks.map((child) => (
            <li key={`${child.label}-${child.href}`}>
              <NavAnchor
                item={child}
                onClick={close}
                className="block py-2 text-sm text-muted"
              >
                {child.label}
              </NavAnchor>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

/** External items open in a new tab, matching the live "Book" link. */
function NavAnchor({
  item,
  children,
  className,
  onClick,
}: {
  item: NavNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function Caret({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 448 512"
      aria-hidden="true"
      className={`h-[9px] w-[9px] fill-current transition-transform ${className}`}
    >
      <path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-34 0z" />
    </svg>
  );
}
