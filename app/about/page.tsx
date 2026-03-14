import About from "@/components/About";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const revalidate = false;

export default function AboutPage() {
  return (
    <div className="bg-[#050414] min-h-screen">
      <div className="relative pt-20">
        <Navbar />
        <About />
        <Footer />
      </div>
    </div>
  );
}
