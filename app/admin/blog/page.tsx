"use client";

import { FormEvent, useEffect, useState } from "react";

type BlogPayload = {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  publishedAt: string;
};

export default function AdminBlogPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [blogs, setBlogs] = useState<BlogPayload[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    coverImage: "",
    tags: "",
    publishedAt: ""
  });

  const loadBlogs = async () => {
    const response = await fetch("/api/blog");
    const data = await response.json();
    if (response.ok) {
      setBlogs(data);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        tags: formData.tags.split(",").map((item) => item.trim()).filter(Boolean)
      })
    });

    const data = await response.json();
    setLoading(false);
    setMessage(response.ok ? "Blog saved successfully" : data.message || "Failed to save blog");
    if (response.ok) {
      setFormData({ title: "", slug: "", content: "", excerpt: "", coverImage: "", tags: "", publishedAt: "" });
      await loadBlogs();
    }
  };

  const updateBlog = async (blog: BlogPayload) => {
    if (!blog._id) {
      return;
    }

    const response = await fetch(`/api/blog/${blog._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        coverImage: blog.coverImage,
        tags: blog.tags,
        publishedAt: blog.publishedAt
      })
    });
    const data = await response.json();
    setMessage(response.ok ? "Blog updated" : data.message || "Failed to update blog");
    if (response.ok) {
      await loadBlogs();
    }
  };

  const deleteBlog = async (blogId?: string) => {
    if (!blogId) {
      return;
    }

    const response = await fetch(`/api/blog/${blogId}`, { method: "DELETE" });
    const data = await response.json();
    setMessage(response.ok ? "Blog deleted" : data.message || "Failed to delete blog");
    if (response.ok) {
      await loadBlogs();
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="rounded-2xl border border-white/10 bg-[#120d27] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">Manage Blog</h1>
            <p className="mt-2 text-sm text-slate-300">Create and update SEO-friendly blog posts.</p>
          </div>
          <button
            onClick={() => setShowCreateForm((prev) => !prev)}
            className="rounded-lg bg-purple-700 px-5 py-3 text-sm font-semibold hover:bg-purple-800"
          >
            {showCreateForm ? "Close Add Blog" : "Add Blog"}
          </button>
        </div>
      </div>

      {showCreateForm ? (
        <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-white/10 bg-[#120d27] p-6">
          <h2 className="text-xl font-semibold">Add Blog</h2>
          <input
            className="rounded-lg border border-white/10 bg-[#1a1236] p-3"
            placeholder="Title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <input
            className="rounded-lg border border-white/10 bg-[#1a1236] p-3"
            placeholder="Slug"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
          <textarea
            className="rounded-lg border border-white/10 bg-[#1a1236] p-3"
            placeholder="Excerpt"
            required
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          />
          <textarea
            className="rounded-lg border border-white/10 bg-[#1a1236] p-3"
            placeholder="Content"
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
          <input
            className="rounded-lg border border-white/10 bg-[#1a1236] p-3"
            placeholder="Cover Image URL"
            required
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          />
          <input
            className="rounded-lg border border-white/10 bg-[#1a1236] p-3"
            placeholder="Tags comma separated"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
          <input
            className="rounded-lg border border-white/10 bg-[#1a1236] p-3"
            placeholder="PublishedAt ISO (optional)"
            value={formData.publishedAt}
            onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
          />
          <button className="w-fit rounded-lg bg-purple-700 px-5 py-3 hover:bg-purple-800 disabled:opacity-50" disabled={loading}>
            {loading ? "Saving..." : "Save Blog"}
          </button>
        </form>
      ) : null}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Existing Blogs</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {blogs.map((blog, index) => (
            <div key={blog._id || `${blog.slug}-${index}`} className="space-y-2 rounded-2xl border border-white/10 bg-[#120d27] p-5">
              <input
                className="w-full rounded-lg border border-white/10 bg-[#1a1236] p-3"
                value={blog.title}
                onChange={(event) => setBlogs((prev) => prev.map((item, idx) => (idx === index ? { ...item, title: event.target.value } : item)))}
              />
              <input
                className="w-full rounded-lg border border-white/10 bg-[#1a1236] p-3"
                value={blog.slug}
                onChange={(event) => setBlogs((prev) => prev.map((item, idx) => (idx === index ? { ...item, slug: event.target.value } : item)))}
              />
              <textarea
                className="w-full rounded-lg border border-white/10 bg-[#1a1236] p-3"
                value={blog.excerpt}
                onChange={(event) => setBlogs((prev) => prev.map((item, idx) => (idx === index ? { ...item, excerpt: event.target.value } : item)))}
              />
              <textarea
                className="w-full rounded-lg border border-white/10 bg-[#1a1236] p-3"
                value={blog.content}
                onChange={(event) => setBlogs((prev) => prev.map((item, idx) => (idx === index ? { ...item, content: event.target.value } : item)))}
              />
              <input
                className="w-full rounded-lg border border-white/10 bg-[#1a1236] p-3"
                value={blog.coverImage}
                onChange={(event) => setBlogs((prev) => prev.map((item, idx) => (idx === index ? { ...item, coverImage: event.target.value } : item)))}
              />
              <input
                className="w-full rounded-lg border border-white/10 bg-[#1a1236] p-3"
                value={blog.tags.join(", ")}
                onChange={(event) =>
                  setBlogs((prev) =>
                    prev.map((item, idx) =>
                      idx === index ? { ...item, tags: event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean) } : item
                    )
                  )
                }
              />
              <input
                className="w-full rounded-lg border border-white/10 bg-[#1a1236] p-3"
                value={blog.publishedAt}
                onChange={(event) =>
                  setBlogs((prev) => prev.map((item, idx) => (idx === index ? { ...item, publishedAt: event.target.value } : item)))
                }
              />
              <div className="flex gap-2">
                <button onClick={() => updateBlog(blog)} className="rounded-lg bg-purple-700 px-4 py-2 text-sm hover:bg-purple-800">
                  Update
                </button>
                <button onClick={() => deleteBlog(blog._id)} className="rounded-lg bg-rose-700 px-4 py-2 text-sm hover:bg-rose-800">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {message ? <p className="text-sm text-gray-300">{message}</p> : null}
    </div>
  );
}
