"use client";

import Link from "next/link";
import { useState } from "react";

export const revalidate = false;

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
    <div className="min-h-screen bg-[#050414] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex gap-4 mb-8">
        <Link href="/admin/projects" className="px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-800">
          Manage Projects
        </Link>
        <Link href="/admin/blog" className="px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-800">
          Manage Blogs
        </Link>
      </div>
      <button onClick={triggerRebuild} disabled={loading} className="px-6 py-3 rounded-md bg-pink-600 hover:bg-pink-700 disabled:opacity-50">
        {loading ? "Triggering..." : "Manual Rebuild"}
      </button>
      {status ? <p className="mt-4 text-gray-300">{status}</p> : null}
    </div>
  );
}
