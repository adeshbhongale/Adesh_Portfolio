"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminDashboardPage() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const triggerRebuild = async () => {
    setLoading(true);
    setStatus("");
    const response = await fetch("/api/rebuild", { method: "POST" });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setStatus(data.message || "Rebuild failed");
      return;
    }
    setStatus("Rebuild triggered successfully");
  };

  return (
    <div className="space-y-6 text-white">
      <div className="rounded-2xl border border-white/10 bg-[#120d27] p-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-slate-300">Manage content, projects, and blog posts. Trigger manual build when content is ready.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/admin/content" className="rounded-2xl border border-white/10 bg-[#120d27] p-5 hover:border-[#8245ec]">
          <h2 className="text-lg font-semibold">Site Content</h2>
          <p className="mt-2 text-sm text-slate-300">Edit about, skills, experience, and education sections.</p>
        </Link>
        <Link href="/admin/projects" className="rounded-2xl border border-white/10 bg-[#120d27] p-5 hover:border-[#8245ec]">
          <h2 className="text-lg font-semibold">Projects</h2>
          <p className="mt-2 text-sm text-slate-300">Create, edit, and delete portfolio projects.</p>
        </Link>
        <Link href="/admin/blog" className="rounded-2xl border border-white/10 bg-[#120d27] p-5 hover:border-[#8245ec]">
          <h2 className="text-lg font-semibold">Blog</h2>
          <p className="mt-2 text-sm text-slate-300">Manage blog posts and slugs for SEO.</p>
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#120d27] p-6">
        <h2 className="text-xl font-semibold">Deployment</h2>
        <p className="mt-2 text-sm text-slate-300">Manual rebuild keeps your static pages and CDN cache updated.</p>
        <button onClick={triggerRebuild} disabled={loading} className="mt-4 rounded-lg bg-pink-600 px-6 py-3 hover:bg-pink-700 disabled:opacity-50">
          {loading ? "Triggering..." : "Manual Rebuild"}
        </button>
        {status ? <p className="mt-3 text-sm text-slate-300">{status}</p> : null}
      </div>
    </div>
  );
}
