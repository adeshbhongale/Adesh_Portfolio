const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const defaultSEO = {
  title: "Adesh Bhongale | Full Stack Developer | MERN Expert",
  description:
    "Adesh Bhongale - Full Stack & MERN Developer. Expert in Next.js, React, Node.js, MongoDB. Building scalable web applications. View portfolio, projects, and blogs.",
  canonical: siteUrl,
  keywords: [
    "Adesh Bhongale",
    "Adesh",
    "Bhongale",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Web Developer",
    "Software Developer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "MongoDB Developer",
    "Express Developer",
    "Tailwind CSS Developer",
    "REST API Developer",
    "Full Stack Web Development",
    "Web Application Development",
    "Portfolio",
    "Developer Portfolio",
    "Tech Portfolio"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Adesh Bhongale | Full Stack Developer | MERN Expert",
    description:
      "Adesh Bhongale - Expert Full Stack & MERN Developer. Specialized in Next.js, React, Node.js, and MongoDB. Explore my projects, experience, and technical expertise.",
    siteName: "Adesh Bhongale Portfolio"
  },
  twitter: {
    cardType: "summary_large_image"
  }
};
