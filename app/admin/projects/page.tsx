"use client";

import { FormEvent, useEffect, useState } from "react";

type ProjectPayload = {
  id: number;
  _id?: string;
  title: string;
  description: string;
  image: string;
  github: string;
  webapp: string;
  techStack: string[];
  featured?: boolean;
};

export default function AdminProjectsPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [projects, setProjects] = useState<ProjectPayload[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    github: "",
    live: "",
    techStack: "",
    featured: false
  });

  const loadProjects = async () => {
    const response = await fetch("/api/projects");
    const data = await response.json();
    if (response.ok) {
      setProjects(data);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

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
    if (response.ok) {
      setFormData({ title: "", description: "", image: "", github: "", live: "", techStack: "", featured: false });
      await loadProjects();
    }
  };

  const updateProject = async (project: ProjectPayload) => {
    if (!project._id) {
      return;
    }

    setMessage("");
    const response = await fetch(`/api/projects/${project._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: project.title,
        description: project.description,
        image: project.image,
        github: project.github,
        live: project.webapp,
        techStack: project.techStack,
        featured: Boolean(project.featured)
      })
    });
    const data = await response.json();
    setMessage(response.ok ? "Project updated" : data.message || "Failed to update project");
    if (response.ok) {
      await loadProjects();
    }
  };

  const deleteProject = async (projectId?: string) => {
    if (!projectId) {
      return;
    }

    setMessage("");
    const response = await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
    const data = await response.json();
    setMessage(response.ok ? "Project deleted" : data.message || "Failed to delete project");
    if (response.ok) {
      await loadProjects();
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="rounded-2xl border border-white/10 bg-[#120d27] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">Manage Projects</h1>
            <p className="mt-2 text-sm text-slate-300">Create new projects and edit existing entries directly from here.</p>
          </div>
          <button
            onClick={() => setShowCreateForm((prev) => !prev)}
            className="rounded-lg bg-purple-700 px-5 py-3 text-sm font-semibold hover:bg-purple-800"
          >
            {showCreateForm ? "Close Add Project" : "Add Project"}
          </button>
        </div>
      </div>

      {showCreateForm ? (
        <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-white/10 bg-[#120d27] p-6">
          <h2 className="text-xl font-semibold">Add Project</h2>
          <input
            className="rounded-lg border border-white/10 bg-[#1a1236] p-3"
            placeholder="Title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <textarea
            className="rounded-lg border border-white/10 bg-[#1a1236] p-3"
            placeholder="Description"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <input
            className="rounded-lg border border-white/10 bg-[#1a1236] p-3"
            placeholder="Image URL"
            required
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
          <input
            className="rounded-lg border border-white/10 bg-[#1a1236] p-3"
            placeholder="GitHub URL"
            required
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          />
          <input
            className="rounded-lg border border-white/10 bg-[#1a1236] p-3"
            placeholder="Live URL"
            required
            value={formData.live}
            onChange={(e) => setFormData({ ...formData, live: e.target.value })}
          />
          <input
            className="rounded-lg border border-white/10 bg-[#1a1236] p-3"
            placeholder="Tech stack comma separated"
            value={formData.techStack}
            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
          />
          <label className="inline-flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
            Featured Project
          </label>
          <button className="w-fit rounded-lg bg-purple-700 px-5 py-3 hover:bg-purple-800 disabled:opacity-50" disabled={loading}>
            {loading ? "Saving..." : "Save Project"}
          </button>
        </form>
      ) : null}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Existing Projects</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project, index) => (
            <div key={project._id || `${project.title}-${index}`} className="space-y-2 rounded-2xl border border-white/10 bg-[#120d27] p-5">
              <input
                className="w-full rounded-lg border border-white/10 bg-[#1a1236] p-3"
                value={project.title}
                onChange={(event) =>
                  setProjects((prev) => prev.map((item, idx) => (idx === index ? { ...item, title: event.target.value } : item)))
                }
              />
              <textarea
                className="w-full rounded-lg border border-white/10 bg-[#1a1236] p-3"
                value={project.description}
                onChange={(event) =>
                  setProjects((prev) => prev.map((item, idx) => (idx === index ? { ...item, description: event.target.value } : item)))
                }
              />
              <input
                className="w-full rounded-lg border border-white/10 bg-[#1a1236] p-3"
                value={project.image}
                onChange={(event) =>
                  setProjects((prev) => prev.map((item, idx) => (idx === index ? { ...item, image: event.target.value } : item)))
                }
              />
              <input
                className="w-full rounded-lg border border-white/10 bg-[#1a1236] p-3"
                value={project.github}
                onChange={(event) =>
                  setProjects((prev) => prev.map((item, idx) => (idx === index ? { ...item, github: event.target.value } : item)))
                }
              />
              <input
                className="w-full rounded-lg border border-white/10 bg-[#1a1236] p-3"
                value={project.webapp}
                onChange={(event) =>
                  setProjects((prev) => prev.map((item, idx) => (idx === index ? { ...item, webapp: event.target.value } : item)))
                }
              />
              <input
                className="w-full rounded-lg border border-white/10 bg-[#1a1236] p-3"
                value={project.techStack.join(", ")}
                onChange={(event) =>
                  setProjects((prev) =>
                    prev.map((item, idx) =>
                      idx === index
                        ? { ...item, techStack: event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean) }
                        : item
                    )
                  )
                }
              />
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={Boolean(project.featured)}
                  onChange={(event) =>
                    setProjects((prev) => prev.map((item, idx) => (idx === index ? { ...item, featured: event.target.checked } : item)))
                  }
                />
                Featured
              </label>
              <div className="flex gap-2">
                <button onClick={() => updateProject(project)} className="rounded-lg bg-purple-700 px-4 py-2 text-sm hover:bg-purple-800">
                  Update
                </button>
                <button onClick={() => deleteProject(project._id)} className="rounded-lg bg-rose-700 px-4 py-2 text-sm hover:bg-rose-800">
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
