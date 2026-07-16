import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Set NEXT_PUBLIC_SITE_URL in your .env.local (or hosting env vars) when you have a domain.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Stellar Associates | Development Consultancy",
    template: "%s | Stellar Associates",
  },
  description:
    "Stellar Associates is a Bangladesh-based development consultancy providing research, monitoring and evaluation, governance advisory, and technical assistance services to development partners worldwide.",
  keywords: [
    "development consultancy",
    "Bangladesh",
    "research",
    "governance",
    "monitoring and evaluation",
    "MEL",
    "labor rights",
    "USAID",
    "capacity building",
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-x-hidden" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
