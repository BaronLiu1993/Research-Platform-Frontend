import { cookies } from "next/headers";
import { AppSidebar } from "@/app/components/sidebar";
import {
  SidebarProvider,
  SidebarInset,
} from "@/shadcomponents/ui/sidebar";

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const access = cookieStore.get("access_token")?.value;
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";

  let parsedUserProfile = {};

  try {
    const profileRes = await fetch(`${API_BASE}/auth/get-user-sidebar-info`, {
      headers: access
        ? { Authorization: `Bearer ${access}`, "Content-Type": "application/json" }
        : {},
      cache: "no-store",
    });
    if (profileRes.ok) {
      parsedUserProfile = await profileRes.json();
    }
  } catch {}

  return (
    <div className="w-full overflow-hidden">
      <SidebarProvider>
        <AppSidebar student_data={parsedUserProfile} />
        <SidebarInset className="flex flex-col min-h-0 overflow-hidden">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
