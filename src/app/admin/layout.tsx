import Link from "next/link";
import type { Metadata } from "next";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/** Plain chrome on purpose — this is a tool, not a brochure. */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-hairline bg-white">
        <div className="mx-auto flex max-w-[1000px] flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4">
          <Link href="/admin" className="font-bold text-body-text">
            Aureo admin
          </Link>

          <nav className="flex gap-5 text-sm">
            <Link href="/admin/rooms">Rooms</Link>
            <Link href="/admin/payment">Payment</Link>
          </nav>

          <div className="ml-auto flex items-center gap-5 text-sm">
            <Link href="/" target="_blank" rel="noopener noreferrer">
              View site
            </Link>
            <form action={logout}>
              <button type="submit" className="text-muted hover:text-gold">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1000px] px-5 py-10">{children}</main>
    </div>
  );
}
