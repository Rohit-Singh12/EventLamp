import { redirect } from "next/navigation";

export default function AdminPage() {
  // Redirect to the overview page by default
  redirect("/admin/dashboard");
}
