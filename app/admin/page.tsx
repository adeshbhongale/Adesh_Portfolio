import { redirect } from "next/navigation";

export const revalidate = false;

export default function AdminRootPage() {
  redirect("/admin/dashboard");
}
