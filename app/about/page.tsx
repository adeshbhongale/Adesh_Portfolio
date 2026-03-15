import About from "@/components/About";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getSiteContent } from "@/lib/content";

export const revalidate = false;

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <div className="bg-[#050414] min-h-screen">
      <div className="relative pt-20">
        <Navbar />
        <About about={content.about} />
        <Footer />
      </div>
    </div>
  );
}
