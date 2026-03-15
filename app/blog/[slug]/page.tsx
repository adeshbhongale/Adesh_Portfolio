import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogBySlug, getBlogs } from "@/lib/content";

export const revalidate = false;

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogBySlug(params.slug);
  if (!post) {
    return {};
  }
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt
    }
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await getBlogBySlug(params.slug);
  if (!post) {
    return (
      <div className="bg-[#050414] min-h-screen text-white pt-40 px-[12vw]">
        <h1 className="text-3xl font-bold">Post not found</h1>
      </div>
    );
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.coverImage,
    datePublished: post.publishedAt,
    description: post.excerpt,
    keywords: post.tags.join(",")
  };

  return (
    <div className="bg-[#050414] min-h-screen text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <div className="relative pt-20 px-[12vw] md:px-[7vw] lg:px-[20vw]">
        <Navbar />
        <article className="py-24 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-400 mb-6">{new Date(post.publishedAt).toLocaleDateString("en-IN")}</p>
          <Image src={post.coverImage} alt={post.title} width={1200} height={600} className="w-full h-auto rounded-xl mb-8" />
          <p className="text-lg text-gray-300 leading-relaxed">{post.content}</p>
        </article>
        <Footer />
      </div>
    </div>
  );
}
