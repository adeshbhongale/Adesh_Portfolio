"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export const revalidate = false;

export default function AdminProjectsPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    github: "",
    live: "",
    techStack: "",
    featured: false
  });

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        techStack: formData.techStack.split(",").map((item) => item.trim()).filter(Boolean)
      })
    });

    const data = await response.json();
    setLoading(false);
    setMessage(response.ok ? "Project saved successfully" : data.message || "Failed to save project");
  };

  return (
    <div className="min-h-screen bg-[#050414] text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Link href="/admin/dashboard" className="text-purple-400 hover:underline">
          Back to dashboard
        </Link>
      </div>
      <form onSubmit={onSubmit} className="grid gap-4 max-w-2xl">
        <input className="p-3 rounded bg-[#131025]" placeholder="Title" required onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        <textarea className="p-3 rounded bg-[#131025]" placeholder="Description" required onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        <input className="p-3 rounded bg-[#131025]" placeholder="Image URL" required onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
        <input className="p-3 rounded bg-[#131025]" placeholder="GitHub URL" required onChange={(e) => setFormData({ ...formData, github: e.target.value })} />
        <input className="p-3 rounded bg-[#131025]" placeholder="Live URL" required onChange={(e) => setFormData({ ...formData, live: e.target.value })} />
        <input
          className="p-3 rounded bg-[#131025]"
          placeholder="Tech Stack comma separated"
          onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
        />
        <label className="flex items-center gap-2">
          <input type="checkbox" onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
          Featured
        </label>
        <button className="px-5 py-3 bg-purple-700 rounded hover:bg-purple-800 disabled:opacity-50" disabled={loading}>
          {loading ? "Saving..." : "Save Project"}
        </button>
      </form>
      {message ? <p className="mt-4 text-gray-300">{message}</p> : null}
    </div>
  );
}
