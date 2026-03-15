import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getBlogs } from "@/lib/content";

export const revalidate = false;

export const metadata: Metadata = {
  title: "Blog | Adesh Bhongale",
  description: "SEO-friendly blog posts about full-stack development and projects."
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="bg-[#050414] min-h-screen text-white">
      <div className="relative pt-20 px-[12vw] md:px-[7vw] lg:px-[20vw]">
        <Navbar />
        <section className="py-24">
          <h1 className="text-4xl font-bold mb-3">BLOG</h1>
          <div className="w-24 h-1 bg-[#8245ec] mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((post) => (
              <article key={post.slug} className="bg-gray-900 border border-white/20 rounded-xl overflow-hidden">
                <Image src={post.coverImage} alt={post.title} width={800} height={400} className="w-full h-52 object-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-[#8245ec] font-semibold hover:underline">
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
