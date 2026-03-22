import { defaultSEO } from "@/next-seo.config";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: defaultSEO.title,
  description: defaultSEO.description,
  metadataBase: new URL(defaultSEO.canonical),
  alternates: {
    canonical: "/"
  },
  keywords: defaultSEO.keywords,
  authors: [
    {
      name: "Adesh Bhongale",
      url: defaultSEO.canonical
    }
  ],
  creator: "Adesh Bhongale",
  publisher: "Adesh Bhongale",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
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
    description: defaultSEO.openGraph.description,
    creator: "@adesh_bhongale"
  },
  verification: {
    google: "google-site-verification"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
