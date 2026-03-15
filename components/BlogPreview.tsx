import { BlogItem } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const BlogPreview = ({ blogs }: { blogs: BlogItem[] }) => {
  const latestPosts = blogs.slice(0, 3);

  return (
    <section id="blog" className="py-24 px-[12vw] md:px-[7vw] lg:px-[20vw]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold text-white">LATEST BLOGS</h2>
          <div className="mt-3 h-1 w-28 bg-purple-500"></div>
          <p className="mt-4 max-w-2xl text-gray-400">
            Practical engineering articles on MERN development, performance optimization, API design, and deployment workflows.
          </p>
        </div>
        <Link href="/blog" className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-slate-200 hover:border-purple-400 hover:text-white">
          View All Blogs
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {latestPosts.map((post) => (
          <article
            key={post.slug}
            className="group overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-[#1a1236] to-[#120d27] transition hover:-translate-y-1 hover:border-[#8245ec]"
          >
            <div className="relative h-40 w-full overflow-hidden">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <p className="mb-2 text-xs uppercase tracking-wide text-slate-300">{new Date(post.publishedAt).toLocaleDateString("en-IN")}</p>
              <h3 className="line-clamp-2 text-lg font-semibold text-white">{post.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-gray-300">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-[#a16aff] group-hover:text-[#c49cff]">
                Read Article
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogPreview;
