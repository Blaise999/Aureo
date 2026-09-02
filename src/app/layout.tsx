import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { site } from "@/lib/site";
import "./globals.css";

/** Lato at the weights the live theme loads. */
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato-src",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Home - Aureo Hotel & Resort | San Fernando La Union",
    template: `%s - ${site.legalName}`,
  },
  description: site.description,
  openGraph: {
    title: "Aureo Hotel & Resort | San Fernando La Union",
    description: site.description,
    url: site.url,
    siteName: site.legalName,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className={lato.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-gold focus:px-4 focus:py-3 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
