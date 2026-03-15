"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminDashboardPage() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const triggerRebuild = async () => {
    try {
      setLoading(true);
      setStatus("");
      const response = await fetch("/api/rebuild", { method: "POST", credentials: "include" });
      const data = await response.json();
      if (!response.ok) {
        setStatus(data.message || "Rebuild failed");
        return;
      }
      setStatus(data.message || "Rebuild triggered successfully");
    } catch {
      setStatus("Unable to trigger rebuild");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLogoutLoading(true);
      await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
      window.location.href = "/admin/login";
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="rounded-2xl border border-white/10 bg-[#120d27] p-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-slate-300">Manage content, experiences, education, projects, and blog posts.</p>
        <button onClick={logout} disabled={logoutLoading} className="mt-4 rounded-lg border border-white/20 px-5 py-2 text-sm hover:bg-white/10 disabled:opacity-50">
          {logoutLoading ? "Logging out..." : "Logout"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/content" className="rounded-2xl border border-white/10 bg-[#120d27] p-5 hover:border-[#8245ec]">
          <h2 className="text-lg font-semibold">Site Content</h2>
          <p className="mt-2 text-sm text-slate-300">Edit about and skills sections.</p>
        </Link>
        <Link href="/admin/experience" className="rounded-2xl border border-white/10 bg-[#120d27] p-5 hover:border-[#8245ec]">
          <h2 className="text-lg font-semibold">Experience</h2>
          <p className="mt-2 text-sm text-slate-300">Add, reorder, and update work experience entries.</p>
        </Link>
        <Link href="/admin/education" className="rounded-2xl border border-white/10 bg-[#120d27] p-5 hover:border-[#8245ec]">
          <h2 className="text-lg font-semibold">Education</h2>
          <p className="mt-2 text-sm text-slate-300">Add, reorder, and update education entries.</p>
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
        <p className="mt-2 text-sm text-slate-300">Manual rebuild revalidates all public pages and blog details.</p>
        <button onClick={triggerRebuild} disabled={loading} className="mt-4 rounded-lg bg-pink-600 px-6 py-3 hover:bg-pink-700 disabled:opacity-50">
          {loading ? "Triggering..." : "Manual Rebuild"}
        </button>
        {status ? <p className="mt-3 text-sm text-slate-300">{status}</p> : null}
      </div>
    </div>
  );
}
