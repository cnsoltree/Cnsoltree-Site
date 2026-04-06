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
  title: {
    default: "Cnsoltree",
    template: "%s | Cnsoltree",
  },
  description:
    "Cnsoltree — 专注于提供高质量的咨询与技术解决方案，助力企业数字化转型。",
  keywords: ["Cnsoltree", "咨询", "技术", "数字化转型", "Next.js"],
  authors: [{ name: "Cnsoltree Team" }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "Cnsoltree",
    title: "Cnsoltree",
    description:
      "Cnsoltree — 专注于提供高质量的咨询与技术解决方案，助力企业数字化转型。",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cnsoltree",
    description:
      "Cnsoltree — 专注于提供高质量的咨询与技术解决方案，助力企业数字化转型。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col bg-white">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
