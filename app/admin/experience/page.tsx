"use client";

import { ExperienceItem } from "@/lib/data";
import { useEffect, useState } from "react";

export default function AdminExperiencePage() {
  const panelClass = "rounded-2xl border border-white/10 bg-[#120d27] p-5 md:p-6";
  const inputClass = "w-full rounded-lg border border-white/10 bg-[#1a1236] p-3 text-white outline-none focus:border-[#8245ec]";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [items, setItems] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/content/experience", { cache: "no-store" });
        const payload = await response.json();
        if (response.ok) {
          setItems(payload || []);
        } else {
          setStatus(payload.message || "Unable to load experiences");
        }
      } catch {
        setStatus("Unable to load experiences");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const save = async () => {
    setSaving(true);
    setStatus("");
    try {
      const response = await fetch("/api/content/experience", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(items)
      });
      const data = await response.json();
      setStatus(response.ok ? "Experiences updated" : data.message || "Unable to update experiences");
    } catch {
      setStatus("Unable to update experiences");
    } finally {
      setSaving(false);
    }
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    setItems((prev) => {
      const next = [...prev];
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= next.length) return prev;
      const [removed] = next.splice(index, 1);
      next.splice(newIndex, 0, removed);
      return next;
    });
  };

  if (loading) {
    return <div className={panelClass}>Loading experiences...</div>;
  }

  return (
    <div className="space-y-6 text-white">
      <div className={panelClass}>
        <h1 className="text-2xl font-bold">Experience Manager</h1>
        <p className="mt-2 text-sm text-slate-300">Add, edit, upload images, and reorder experience entries.</p>
      </div>

      <section className={panelClass}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Experiences</h2>
          <button
            onClick={() =>
              setItems((prev) => [
                ...prev,
                { id: Date.now(), img: "/assets/company_logo/ydcoders.png", role: "Role", company: "Company", date: "2026", desc: "Description", skills: ["React"] }
              ])
            }
            className="rounded-lg bg-[#8245ec] px-3 py-2 text-sm hover:bg-[#6d37d4]"
          >
            Add Experience
          </button>
        </div>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="grid gap-2 rounded-xl border border-white/10 bg-[#1a1236] p-4">
              <div className="flex gap-2">
                <button onClick={() => moveItem(index, -1)} className="rounded-lg border border-white/20 px-3 py-2 text-sm">Up</button>
                <button onClick={() => moveItem(index, 1)} className="rounded-lg border border-white/20 px-3 py-2 text-sm">Down</button>
              </div>
              <input className={inputClass} value={item.role} onChange={(e) => setItems((prev) => prev.map((it, i) => (i === index ? { ...it, role: e.target.value } : it)))} placeholder="Role" />
              <input className={inputClass} value={item.company} onChange={(e) => setItems((prev) => prev.map((it, i) => (i === index ? { ...it, company: e.target.value } : it)))} placeholder="Company" />
              <label className="grid gap-2 text-sm text-slate-300">
                Upload Company Image
                <input
                  type="file"
                  accept="image/*"
                  className={inputClass}
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    const formData = new FormData();
                    formData.append("file", file);
                    const res = await fetch("/api/upload/image", { method: "POST", body: formData });
                    const payload = await res.json();
                    if (res.ok && payload.url) {
                      setItems((prev) => prev.map((it, i) => (i === index ? { ...it, img: payload.url } : it)));
                    }
                  }}
                />
              </label>
              <input
                className={inputClass}
                value={item.img}
                onChange={(e) => setItems((prev) => prev.map((it, i) => (i === index ? { ...it, img: e.target.value } : it)))}
                placeholder="Image URL"
              />
              <input className={inputClass} value={item.date} onChange={(e) => setItems((prev) => prev.map((it, i) => (i === index ? { ...it, date: e.target.value } : it)))} placeholder="Date" />
              <textarea className={inputClass} value={item.desc} onChange={(e) => setItems((prev) => prev.map((it, i) => (i === index ? { ...it, desc: e.target.value } : it)))} placeholder="Description" />
              <input
                className={inputClass}
                value={item.skills.join(", ")}
                onChange={(e) => setItems((prev) => prev.map((it, i) => (i === index ? { ...it, skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) } : it)))}
                placeholder="Skills comma separated"
              />
              <button onClick={() => setItems((prev) => prev.filter((_, i) => i !== index))} className="w-fit rounded-lg bg-rose-700 px-3 py-2 text-sm hover:bg-rose-800">
                Delete Experience
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button onClick={save} disabled={saving} className="rounded-lg bg-[#8245ec] px-5 py-3 font-semibold hover:bg-[#6d37d4] disabled:opacity-50">
          {saving ? "Saving..." : "Save Experiences"}
        </button>
        {status ? <p className="text-sm text-slate-300">{status}</p> : null}
      </div>
    </div>
  );
}
