import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getBlogs } from "@/lib/content";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = false;

export const metadata: Metadata = {
  title: "Blog | Adesh Bhongale",
  description: "SEO-friendly blog posts about full-stack development and projects."
};

export default async function BlogPage() {
  const blogs = await getBlogs();
  const [featuredPost, ...restPosts] = blogs;

  return (
    <div className="min-h-screen bg-[#050414] text-white">
      <div className="relative pt-20 px-[6vw] md:px-[7vw] lg:px-[12vw]">
        <Navbar />
        <section className="mx-auto max-w-6xl py-20">
          <div className="mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-[#a16aff]">Engineering Journal</p>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">Blog & Insights</h1>
            <p className="mt-4 max-w-2xl text-gray-300">
              Deep dives on full-stack engineering, performance, architecture, security, and practical production lessons.
            </p>
          </div>

          {featuredPost ? (
            <article className="mb-10 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-[#1f1542] to-[#120d27]">
              <div className="grid md:grid-cols-2">
                <div className="relative h-60 md:h-full">
                  <Image src={featuredPost.coverImage} alt={featuredPost.title} fill className="object-cover" />
                </div>
                <div className="p-8">
                  <p className="text-xs uppercase tracking-wide text-slate-300">{new Date(featuredPost.publishedAt).toLocaleDateString("en-IN")}</p>
                  <h2 className="mt-3 text-3xl font-semibold">{featuredPost.title}</h2>
                  <p className="mt-4 text-gray-300">{featuredPost.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featuredPost.tags.map((tag) => (
                      <span key={`${featuredPost.slug}-${tag}`} className="rounded-full border border-white/20 px-3 py-1 text-xs text-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/blog/${featuredPost.slug}`} className="mt-6 inline-block rounded-full bg-[#8245ec] px-5 py-2 text-sm font-semibold hover:bg-[#6d37d4]">
                    Read Featured Post
                  </Link>
                </div>
              </div>
            </article>
          ) : null}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {restPosts.map((post) => (
              <article
                key={post.slug}
                className="group overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-[#1a1236] to-[#120d27] transition hover:-translate-y-1 hover:border-[#8245ec]"
              >
                <Image src={post.coverImage} alt={post.title} width={760} height={320} className="h-40 w-full object-cover" />
                <div className="p-6">
                  <p className="mb-2 text-xs uppercase tracking-wide text-slate-300">{new Date(post.publishedAt).toLocaleDateString("en-IN")}</p>
                  <h2 className="mb-2 line-clamp-2 text-xl font-semibold">{post.title}</h2>
                  <p className="mb-4 line-clamp-3 text-gray-300">{post.excerpt}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={`${post.slug}-${tag}`} className="rounded-full border border-white/20 px-2 py-1 text-xs text-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/blog/${post.slug}`} className="font-semibold text-[#a16aff] group-hover:text-[#c49cff]">
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
