"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export const revalidate = false;

export default function AdminBlogPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    coverImage: "",
    tags: "",
    publishedAt: ""
  });

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
  };

  return (
    <div className="min-h-screen bg-[#050414] text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Blog</h1>
        <Link href="/admin/dashboard" className="text-purple-400 hover:underline">
          Back to dashboard
        </Link>
      </div>
      <form onSubmit={onSubmit} className="grid gap-4 max-w-2xl">
        <input className="p-3 rounded bg-[#131025]" placeholder="Title" required onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        <input className="p-3 rounded bg-[#131025]" placeholder="Slug" required onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
        <textarea className="p-3 rounded bg-[#131025]" placeholder="Excerpt" required onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} />
        <textarea className="p-3 rounded bg-[#131025]" placeholder="Content" required onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
        <input className="p-3 rounded bg-[#131025]" placeholder="Cover Image URL" required onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })} />
        <input className="p-3 rounded bg-[#131025]" placeholder="Tags comma separated" onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />
        <input className="p-3 rounded bg-[#131025]" placeholder="PublishedAt ISO (optional)" onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })} />
        <button className="px-5 py-3 bg-purple-700 rounded hover:bg-purple-800 disabled:opacity-50" disabled={loading}>
          {loading ? "Saving..." : "Save Blog"}
        </button>
      </form>
      {message ? <p className="mt-4 text-gray-300">{message}</p> : null}
    </div>
  );
}
