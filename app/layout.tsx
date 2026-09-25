import type { Metadata } from "next";
import { Gabarito, Nunito_Sans } from "next/font/google";
import { Footer, Header } from "@/components/site-chrome";
import { site } from "@/lib/catalog";
import "./globals.css";
import "./redesign.css";

const display = Gabarito({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });
const body = Nunito_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "PageNook: PDFs worth keeping", template: "%s · PageNook" },
  description: site.description,
  openGraph: { siteName: "PageNook", type: "website", images: ["/covers/ship-it-with-claude-code.jpg"] },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Header />
        <main id="top">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
