"use client";

import { BlogItem } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const BlogPreview = ({ blogs }: { blogs: BlogItem[] }) => {
  const latestPosts = blogs.slice(0, 3);

  return (
    <section id="blog" className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">LATEST BLOGS</h2>
        <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold max-w-3xl mx-auto">
          Practical engineering articles on MERN development, performance optimization, API design, and deployment workflows.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {latestPosts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`group block h-full transition-all duration-700 ${index === 0 ? "delay-0" : index === 1 ? "delay-200" : "delay-400"
              }`}
            style={{
              animation: `fadeInUp 0.6s ease-out forwards`,
              opacity: 0,
              animationDelay: `${index * 150}ms`
            }}
          >
            <article className="relative h-full overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-sm transition-all duration-500 hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/30">
              {/* Background gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Image Container */}
              <div className="relative h-35 w-full overflow-hidden bg-purple-900/50">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700"
                />
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Content Container */}
              <div className="relative p-6 flex flex-col h-full">
                {/* Date Badge */}
                <div className="mb-3">
                  <p className="text-xs uppercase tracking-widest text-purple-400 font-semibold">
                    {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </p>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-300 line-clamp-3 flex-grow mb-4">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full border border-purple-500/40 text-purple-300 bg-purple-500/10 group-hover:border-purple-500/60 group-hover:bg-purple-500/20 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="text-xs px-2 py-1 rounded-full border border-purple-500/40 text-purple-300 bg-purple-500/10 group-hover:border-purple-500/60 group-hover:bg-purple-500/20 transition-all duration-300">
                      +{post.tags.length - 2}
                    </span>
                  )}
                </div>

                {/* Bottom accent line */}
                <div className="h-1 w-0 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-500"></div>
              </div>

              {/* Hover indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-sm font-semibold flex items-center gap-1">
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/blog"
          className="px-8 py-3 rounded-lg border border-purple-500/50 text-purple-300 hover:text-white hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 font-semibold"
        >
          View All Articles
        </Link>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default BlogPreview;
