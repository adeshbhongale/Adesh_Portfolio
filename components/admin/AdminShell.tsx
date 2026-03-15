"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/blog", label: "Blog" }
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#050414] text-white">
      <div className="mx-auto flex max-w-[1500px]">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-white/10 bg-[#0e0a1f] p-5 transition-transform md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="mb-8">
            <p className="text-sm text-slate-300">Portfolio Admin</p>
            <h2 className="text-xl font-bold text-white">Adesh Control</h2>
          </div>
          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm transition ${pathname === link.href ? "bg-[#8245ec] text-white" : "bg-white/5 text-slate-200 hover:bg-white/10"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="w-full md:ml-64">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#050414]/90 px-4 py-3 backdrop-blur md:px-8">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="rounded-lg border border-white/15 px-3 py-2 text-sm md:hidden"
              aria-label="Toggle admin sidebar"
            >
              Menu
            </button>
            <p className="text-sm text-slate-300">{links.find((item) => item.href === pathname)?.label || "Admin"}</p>
            <Link href="/" target="_blank" className="rounded-lg border border-white/15 px-3 py-2 text-sm hover:bg-white/5">
              View Site
            </Link>
          </header>
          <main className="p-4 md:p-8">{children}</main>
        </div>
      </div>
      {open ? <button className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setOpen(false)} aria-label="Close sidebar" /> : null}
    </div>
  );
}
