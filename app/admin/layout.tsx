import { ReactNode } from "react";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
