import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getBlogBySlug, getBlogs } from "@/lib/content";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";

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
      <div className="bg-[#050414] min-h-screen text-white pt-10 px-[12vw]">
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
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <div className="relative pt-20 px-[6vw] md:px-[7vw] lg:px-[12vw]">
        <article className="mx-auto max-w-5xl py-20">
          <Link href="/blog" className="mb-8 inline-block text-sm font-semibold text-[#a16aff] hover:text-[#c49cff]">
            ← Back to all posts
          </Link>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{post.title}</h1>
          <p className="mb-4 text-gray-400">{new Date(post.publishedAt).toLocaleDateString("en-IN")}</p>
          <div className="mb-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={`${post.slug}-${tag}`} className="rounded-full border border-white/20 px-3 py-1 text-xs text-slate-200">
                {tag}
              </span>
            ))}
          </div>
          <Image src={post.coverImage} alt={post.title} width={1280} height={720} className="mb-10 h-auto w-full rounded-2xl object-cover" />
          <div className="space-y-5 text-lg leading-relaxed text-gray-200">
            {post.content
              .split("\n")
              .filter((line) => line.trim().length > 0)
              .map((line, index) => (
                <p key={`${post.slug}-line-${index}`}>{line}</p>
              ))}
          </div>
        </article>
        <Footer />
      </div>
    </div>
  );
}
