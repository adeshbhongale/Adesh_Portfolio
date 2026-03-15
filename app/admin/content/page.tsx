"use client";

import { AboutContent, EducationItem, ExperienceItem, SkillCategory } from "@/lib/data";
import { useEffect, useState } from "react";

type ContentPayload = {
  about: AboutContent;
  skills: SkillCategory[];
  experiences: ExperienceItem[];
  educations: EducationItem[];
};

const emptyData: ContentPayload = {
  about: {
    headline: "",
    subheadline: "",
    description: "",
    cvUrl: "",
    image: ""
  },
  skills: [],
  experiences: [],
  educations: []
};

const panelClass = "rounded-2xl border border-white/10 bg-[#120d27] p-5 md:p-6";
const inputClass = "w-full rounded-lg border border-white/10 bg-[#1a1236] p-3 text-white outline-none focus:border-[#8245ec]";

export default function AdminContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [status, setStatus] = useState("");
  const [data, setData] = useState<ContentPayload>(emptyData);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/content");
        const payload = await response.json();
        if (response.ok) {
          setData(payload);
        } else {
          setStatus(payload.message || "Unable to load content");
        }
      } catch {
        setStatus("Unable to load content");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const saveAll = async () => {
    setSaving(true);
    setStatus("");
    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const payload = await response.json();
      setStatus(response.ok ? "Content updated successfully" : payload.message || "Unable to update content");
    } catch {
      setStatus("Unable to update content");
    } finally {
      setSaving(false);
    }
  };

  const uploadCv = async (file: File) => {
    setUploadingCv(true);
    setStatus("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload/cv", { method: "POST", body: formData });
      const payload = await response.json();
      if (!response.ok) {
        setStatus(payload.message || "Unable to upload CV");
        return;
      }
      setData((prev) => ({ ...prev, about: { ...prev.about, cvUrl: payload.url } }));
      setStatus("CV uploaded. Save all sections to publish it.");
    } catch {
      setStatus("Unable to upload CV");
    } finally {
      setUploadingCv(false);
    }
  };

  if (loading) {
    return <div className="rounded-2xl border border-white/10 bg-[#120d27] p-8 text-white">Loading content...</div>;
  }

  return (
    <div className="space-y-6 text-white">
      <div className={panelClass}>
        <h1 className="text-2xl font-bold">Content Manager</h1>
        <p className="mt-2 text-sm text-slate-300">Update about, skills, experience, and education from one place.</p>
      </div>

      <section className={panelClass}>
        <h2 className="mb-4 text-xl font-semibold">About Section</h2>
        <div className="grid gap-3">
          <input
            className={inputClass}
            value={data.about.headline}
            onChange={(event) => setData((prev) => ({ ...prev, about: { ...prev.about, headline: event.target.value } }))}
            placeholder="Headline"
          />
          <input
            className={inputClass}
            value={data.about.subheadline}
            onChange={(event) => setData((prev) => ({ ...prev, about: { ...prev.about, subheadline: event.target.value } }))}
            placeholder="Subheadline"
          />
          <textarea
            className={inputClass}
            rows={4}
            value={data.about.description}
            onChange={(event) => setData((prev) => ({ ...prev, about: { ...prev.about, description: event.target.value } }))}
            placeholder="Description"
          />
          <input
            className={inputClass}
            value={data.about.image}
            onChange={(event) => setData((prev) => ({ ...prev, about: { ...prev.about, image: event.target.value } }))}
            placeholder="Profile image URL"
          />
          <input
            className={inputClass}
            value={data.about.cvUrl}
            onChange={(event) => setData((prev) => ({ ...prev, about: { ...prev.about, cvUrl: event.target.value } }))}
            placeholder="CV URL"
          />
          <label className="grid gap-2 text-sm text-slate-300">
            Upload CV (PDF only)
            <input
              type="file"
              accept="application/pdf"
              className={inputClass}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  uploadCv(file);
                }
              }}
            />
          </label>
          {uploadingCv ? <p className="text-sm text-blue-300">Uploading PDF...</p> : null}
        </div>
      </section>

      <section className={panelClass}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Skills Section</h2>
          <button
            onClick={() =>
              setData((prev) => ({
                ...prev,
                skills: [...prev.skills, { title: "New Category", skills: [{ name: "Skill", logo: "/assets/tech_logo/reactjs.png" }] }]
              }))
            }
            className="rounded-lg bg-[#8245ec] px-3 py-2 text-sm hover:bg-[#6d37d4]"
          >
            Add Category
          </button>
        </div>
        <div className="space-y-4">
          {data.skills.map((category, categoryIndex) => (
            <div key={`${category.title}-${categoryIndex}`} className="rounded-xl border border-white/10 bg-[#1a1236] p-4">
              <div className="mb-3 flex gap-2">
                <input
                  className={inputClass}
                  value={category.title}
                  onChange={(event) =>
                    setData((prev) => ({
                      ...prev,
                      skills: prev.skills.map((item, index) => (index === categoryIndex ? { ...item, title: event.target.value } : item))
                    }))
                  }
                  placeholder="Category title"
                />
                <button
                  onClick={() => setData((prev) => ({ ...prev, skills: prev.skills.filter((_, index) => index !== categoryIndex) }))}
                  className="rounded-lg bg-rose-700 px-3 py-2 text-sm hover:bg-rose-800"
                >
                  Delete
                </button>
              </div>
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div key={`${skill.name}-${skillIndex}`} className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_1fr_auto]">
                    <input
                      className={inputClass}
                      value={skill.name}
                      onChange={(event) =>
                        setData((prev) => ({
                          ...prev,
                          skills: prev.skills.map((item, index) =>
                            index === categoryIndex
                              ? {
                                  ...item,
                                  skills: item.skills.map((skillItem, idx) => (idx === skillIndex ? { ...skillItem, name: event.target.value } : skillItem))
                                }
                              : item
                          )
                        }))
                      }
                      placeholder="Skill name"
                    />
                    <input
                      className={inputClass}
                      value={skill.logo}
                      onChange={(event) =>
                        setData((prev) => ({
                          ...prev,
                          skills: prev.skills.map((item, index) =>
                            index === categoryIndex
                              ? {
                                  ...item,
                                  skills: item.skills.map((skillItem, idx) => (idx === skillIndex ? { ...skillItem, logo: event.target.value } : skillItem))
                                }
                              : item
                          )
                        }))
                      }
                      placeholder="Logo URL"
                    />
                    <button
                      onClick={() =>
                        setData((prev) => ({
                          ...prev,
                          skills: prev.skills.map((item, index) =>
                            index === categoryIndex ? { ...item, skills: item.skills.filter((_, idx) => idx !== skillIndex) } : item
                          )
                        }))
                      }
                      className="rounded-lg bg-rose-700 px-3 py-2 text-sm hover:bg-rose-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    setData((prev) => ({
                      ...prev,
                      skills: prev.skills.map((item, index) =>
                        index === categoryIndex ? { ...item, skills: [...item.skills, { name: "Skill", logo: "/assets/tech_logo/reactjs.png" }] } : item
                      )
                    }))
                  }
                  className="rounded-lg bg-[#8245ec] px-3 py-2 text-sm hover:bg-[#6d37d4]"
                >
                  Add Skill
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={panelClass}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Experience Section</h2>
          <button
            onClick={() =>
              setData((prev) => ({
                ...prev,
                experiences: [
                  ...prev.experiences,
                  {
                    id: Date.now(),
                    img: "/assets/company_logo/ydcoders.png",
                    role: "Role",
                    company: "Company",
                    date: "2026",
                    desc: "Description",
                    skills: ["React"]
                  }
                ]
              }))
            }
            className="rounded-lg bg-[#8245ec] px-3 py-2 text-sm hover:bg-[#6d37d4]"
          >
            Add Experience
          </button>
        </div>
        <div className="space-y-4">
          {data.experiences.map((item, index) => (
            <div key={item.id} className="grid gap-2 rounded-xl border border-white/10 bg-[#1a1236] p-4">
              <input
                className={inputClass}
                value={item.role}
                onChange={(event) =>
                  setData((prev) => ({
                    ...prev,
                    experiences: prev.experiences.map((entry, idx) => (idx === index ? { ...entry, role: event.target.value } : entry))
                  }))
                }
                placeholder="Role"
              />
              <input
                className={inputClass}
                value={item.company}
                onChange={(event) =>
                  setData((prev) => ({
                    ...prev,
                    experiences: prev.experiences.map((entry, idx) => (idx === index ? { ...entry, company: event.target.value } : entry))
                  }))
                }
                placeholder="Company"
              />
              <input
                className={inputClass}
                value={item.img}
                onChange={(event) =>
                  setData((prev) => ({
                    ...prev,
                    experiences: prev.experiences.map((entry, idx) => (idx === index ? { ...entry, img: event.target.value } : entry))
                  }))
                }
                placeholder="Image URL"
              />
              <input
                className={inputClass}
                value={item.date}
                onChange={(event) =>
                  setData((prev) => ({
                    ...prev,
                    experiences: prev.experiences.map((entry, idx) => (idx === index ? { ...entry, date: event.target.value } : entry))
                  }))
                }
                placeholder="Date"
              />
              <textarea
                className={inputClass}
                value={item.desc}
                onChange={(event) =>
                  setData((prev) => ({
                    ...prev,
                    experiences: prev.experiences.map((entry, idx) => (idx === index ? { ...entry, desc: event.target.value } : entry))
                  }))
                }
                placeholder="Description"
              />
              <input
                className={inputClass}
                value={item.skills.join(", ")}
                onChange={(event) =>
                  setData((prev) => ({
                    ...prev,
                    experiences: prev.experiences.map((entry, idx) =>
                      idx === index ? { ...entry, skills: event.target.value.split(",").map((skill) => skill.trim()).filter(Boolean) } : entry
                    )
                  }))
                }
                placeholder="Skills comma separated"
              />
              <button
                onClick={() => setData((prev) => ({ ...prev, experiences: prev.experiences.filter((_, idx) => idx !== index) }))}
                className="w-fit rounded-lg bg-rose-700 px-3 py-2 text-sm hover:bg-rose-800"
              >
                Delete Experience
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className={panelClass}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Education Section</h2>
          <button
            onClick={() =>
              setData((prev) => ({
                ...prev,
                educations: [
                  ...prev.educations,
                  {
                    id: Date.now(),
                    img: "/assets/education_logo/kit.png",
                    school: "School",
                    date: "2026",
                    grade: "A",
                    desc: "Description",
                    degree: "Degree"
                  }
                ]
              }))
            }
            className="rounded-lg bg-[#8245ec] px-3 py-2 text-sm hover:bg-[#6d37d4]"
          >
            Add Education
          </button>
        </div>
        <div className="space-y-4">
          {data.educations.map((item, index) => (
            <div key={item.id} className="grid gap-2 rounded-xl border border-white/10 bg-[#1a1236] p-4">
              <input
                className={inputClass}
                value={item.degree}
                onChange={(event) =>
                  setData((prev) => ({
                    ...prev,
                    educations: prev.educations.map((entry, idx) => (idx === index ? { ...entry, degree: event.target.value } : entry))
                  }))
                }
                placeholder="Degree"
              />
              <input
                className={inputClass}
                value={item.school}
                onChange={(event) =>
                  setData((prev) => ({
                    ...prev,
                    educations: prev.educations.map((entry, idx) => (idx === index ? { ...entry, school: event.target.value } : entry))
                  }))
                }
                placeholder="School"
              />
              <input
                className={inputClass}
                value={item.img}
                onChange={(event) =>
                  setData((prev) => ({
                    ...prev,
                    educations: prev.educations.map((entry, idx) => (idx === index ? { ...entry, img: event.target.value } : entry))
                  }))
                }
                placeholder="Image URL"
              />
              <input
                className={inputClass}
                value={item.date}
                onChange={(event) =>
                  setData((prev) => ({
                    ...prev,
                    educations: prev.educations.map((entry, idx) => (idx === index ? { ...entry, date: event.target.value } : entry))
                  }))
                }
                placeholder="Date"
              />
              <input
                className={inputClass}
                value={item.grade}
                onChange={(event) =>
                  setData((prev) => ({
                    ...prev,
                    educations: prev.educations.map((entry, idx) => (idx === index ? { ...entry, grade: event.target.value } : entry))
                  }))
                }
                placeholder="Grade"
              />
              <textarea
                className={inputClass}
                value={item.desc}
                onChange={(event) =>
                  setData((prev) => ({
                    ...prev,
                    educations: prev.educations.map((entry, idx) => (idx === index ? { ...entry, desc: event.target.value } : entry))
                  }))
                }
                placeholder="Description"
              />
              <button
                onClick={() => setData((prev) => ({ ...prev, educations: prev.educations.filter((_, idx) => idx !== index) }))}
                className="w-fit rounded-lg bg-rose-700 px-3 py-2 text-sm hover:bg-rose-800"
              >
                Delete Education
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button onClick={saveAll} disabled={saving} className="rounded-lg bg-[#8245ec] px-5 py-3 font-semibold hover:bg-[#6d37d4] disabled:opacity-50">
          {saving ? "Saving..." : "Save All Sections"}
        </button>
        {status ? <p className="text-sm text-slate-300">{status}</p> : null}
      </div>
    </div>
  );
}
