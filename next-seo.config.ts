const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const defaultSEO = {
  title: "Adesh Bhongale | Full Stack Developer",
  description:
    "Portfolio of Adesh Bhongale, Full Stack and MERN Developer building scalable web applications.",
  canonical: siteUrl,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Adesh Bhongale | Full Stack Developer",
    description:
      "Portfolio of Adesh Bhongale with projects, experience, education, and blogs.",
    siteName: "Adesh Portfolio"
  },
  twitter: {
    cardType: "summary_large_image"
  }
};
