import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { fontVariables } from "@/styles/fonts";
import { BrandConfig } from "@/config/brand.config";
import { LanguageProvider } from "@/context/language-context";

export const viewport: Viewport = {
  themeColor: "#101e32",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(`https://${BrandConfig.domain}`),
  title: {
    default: `${BrandConfig.name} | ${BrandConfig.taglineEn}`,
    template: `%s | ${BrandConfig.name}`,
  },
  description: `${BrandConfig.legalNameEn} — ${BrandConfig.taglineEn}. Mainland, Free Zone, Golden Visa & PRO Services in Dubai & Abu Dhabi.`,
  keywords: [
    "UAE Business Setup",
    "Dubai Company Formation",
    "Golden Visa UAE",
    "PRO Services Dubai",
    "Novus UAE",
    "Mainland License Dubai",
    "Free Zone License UAE",
  ],
  authors: [{ name: BrandConfig.name, url: `https://${BrandConfig.domain}` }],
  creator: BrandConfig.name,
  publisher: BrandConfig.name,
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: `https://${BrandConfig.domain}`,
    siteName: BrandConfig.name,
    title: `${BrandConfig.name} — ${BrandConfig.taglineEn}`,
    description: BrandConfig.legalNameEn,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      <body className="min-h-screen bg-brand-primary text-brand-text-primary antialiased selection:bg-brand-gold selection:text-brand-primary">
        <LanguageProvider>
          <main className="relative flex min-h-screen flex-col overflow-x-clip">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
