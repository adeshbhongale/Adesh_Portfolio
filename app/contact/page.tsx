import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const revalidate = false;

export default function ContactPage() {
  return (
    <div className="bg-[#050414] min-h-screen">
      <div className="relative pt-20">
        <Navbar />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
