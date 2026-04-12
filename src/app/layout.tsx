import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://www.cnsoltree.com"
  ),
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  title: {
    default: "Cnsoltree | Professional Electrical Protection Solutions",
    template: "%s | Cnsoltree",
  },
  description:
    "Cnsoltree is a B2B manufacturer and supplier of low-voltage electrical protection products including circuit breakers, SPDs, DC fuse holders, power meters, ATS, and PV combiner boxes.",
  keywords: [
    "circuit breaker",
    "surge protector",
    "DC fuse holder",
    "power meter",
    "ATS dual power switch",
    "PV combiner box",
    "low voltage protection",
    "electrical components wholesale",
    "B2B electrical supplier",
  ],
  authors: [{ name: "Cnsoltree" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Cnsoltree",
    title: "Cnsoltree | Professional Electrical Protection Solutions",
    description:
      "B2B manufacturer of circuit breakers, SPDs, DC fuse holders, power meters, ATS and PV combiner boxes.",
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cnsoltree | Professional Electrical Protection Solutions",
    description:
      "B2B manufacturer of low-voltage electrical protection products.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preload" as="image" href="/images/hero-bg.jpg" fetchPriority="high" />
      </head>
      <body className="flex min-h-screen flex-col bg-white antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
