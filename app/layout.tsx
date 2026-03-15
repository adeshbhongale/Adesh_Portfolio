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
