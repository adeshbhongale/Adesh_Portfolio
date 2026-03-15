import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { defaultSEO } from "@/next-seo.config";

export const metadata: Metadata = {
  title: defaultSEO.title,
  description: defaultSEO.description,
  metadataBase: new URL(defaultSEO.canonical),
  alternates: {
    canonical: "/"
  },
  keywords: [
    "Adesh Bhongale",
    "MERN Stack Developer",
    "Full Stack Developer",
    "Portfolio",
    "Next.js"
  ],
  openGraph: {
    title: defaultSEO.openGraph.title,
    description: defaultSEO.openGraph.description,
    url: defaultSEO.openGraph.url,
    siteName: defaultSEO.openGraph.siteName,
    locale: defaultSEO.openGraph.locale,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSEO.openGraph.title,
    description: defaultSEO.openGraph.description
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body>
        {children}
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${gaId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
