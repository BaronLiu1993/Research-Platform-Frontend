"use server";

import { cookies } from "next/headers";
// ... keep your imports unchanged ...
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shadcomponents/ui/breadcrumb";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/shadcomponents/ui/sidebar";
import { AppSidebar } from "@/app/components/sidebar";
import {
  MoveLeft,
  MoveRight,
  Plus,
  Laptop,
  MapIcon,
  Mail,
} from "lucide-react";
import InboxClientWrapper from "@/app/components/inbox/inboxclientwrapper";

async function safeJson(resp) {
  try {
    return await resp.json();
  } catch (err) {
    const text = await resp.text().catch(() => "<no body>");
    return { __jsonError: true, text };
  }
}

async function fetchWithTrace(url, opts = {}) {
  let resp;
  try {
    resp = await fetch(url, opts);
  } catch (err) {
    console.error(`🚨 Network error fetching ${url}:`, err);
    throw err;
  }

  if (!resp.ok) {
    const body = await resp.text().catch(() => "<no body>");
    console.error(`🚨 Non-OK response from ${url}: status=${resp.status}`, body);
    return { ok: false, status: resp.status, body };
  }

  const parsed = await safeJson(resp);
  if (parsed?.__jsonError) {
    console.warn(`⚠️ JSON parse error for ${url}:`, parsed.text);
  }
  return { ok: true, parsed };
}

export default async function InboxEmail() {
  console.log("=== InboxEmail server rendering START ===");
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user_id");
  const accessCookie = cookieStore.get("access_token");

  console.log("cookie objects:", { userCookie, accessCookie });

  const userIdVal = userCookie?.value ?? null;
  const accessVal = accessCookie?.value ?? null;

  console.log("resolved values:", { userIdVal, accessVal });

  if (!userIdVal) {
    console.error("❌ No user_id cookie found — aborting server fetches.");
    // render fallback UI or return early
    return (
      <SidebarProvider>
        <AppSidebar student_data={{ student_email: "" }} />
        <SidebarInset>
          <div className="p-6">Could not identify user — please sign in.</div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  let threadArrayEmailResponse = [];
  try {
    const resp = await fetchWithTrace(
      `http://localhost:8080/inbox/get-email-chain/${encodeURIComponent(userIdVal)}`,
      { method: "GET" }
    );
    if (!resp.ok) {
      threadArrayEmailResponse = [];
    } else {
      const parsedEmailResponse = resp.parsed;
      threadArrayEmailResponse = parsedEmailResponse?.threadArray ?? [];
    }
  } catch (err) {
    threadArrayEmailResponse = [];
  }

  const combinedArray = await Promise.all(
    threadArrayEmailResponse.map(async (obj, index) => {
      const urls = {
        engagement: `http://localhost:8080/inbox/get-engagement/${encodeURIComponent(obj.threadId)}/${encodeURIComponent(obj.messageId)}`,
        status: `http://localhost:8080/inbox/get-status/${encodeURIComponent(userIdVal)}/${encodeURIComponent(obj.professorId)}`,
        draft: `http://localhost:8080/draft/resume-follow-up-draft/${encodeURIComponent(userIdVal)}/${encodeURIComponent(obj.professorId)}`,
        seen: `http://localhost:8080/inbox/get-seen/${encodeURIComponent(obj.threadId)}/${encodeURIComponent(obj.messageId)}`,
      };

      try {
        const [engagementResp, statusResp, draftResp, seenResp] = await Promise.all([
          fetchWithTrace(urls.engagement),
          fetchWithTrace(urls.status),
          fetchWithTrace(urls.draft),
          fetchWithTrace(urls.seen),
        ]);

        const engagementData = engagementResp.ok ? engagementResp.parsed : {};
        const statusData = statusResp.ok ? statusResp.parsed : {};
        const draftData = draftResp.ok ? draftResp.parsed : {};
        const seenData = seenResp.ok ? seenResp.parsed : {};

        console.log(`-> enriched object index ${index}`, {
          engagementOk: engagementResp.ok,
          statusOk: statusResp.ok,
          draftOk: draftResp.ok,
          seenOk: seenResp.ok,
        });

        return { ...obj, engagementData, statusData, draftData, seenData };
      } catch (err) {
        return { ...obj, engagementData: {}, statusData: {}, draftData: {}, seenData: {} };
      }
    })
  );


  let parsedUserProfile = { student_email: "" };
  try {
    const authUrl = "http://localhost:8080/auth/get-user-sidebar-info";
    const resp = await fetchWithTrace(authUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessVal}`,
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) {
      console.warn("auth/get-user-sidebar-info returned non-ok, using fallback profile");
    } else {
      parsedUserProfile = resp.parsed;
    }
  } catch (err) {
    console.error("❌ Error fetching user profile:", err);
  }

  console.log("parsedUserProfile:", parsedUserProfile);
  console.log(combinedArray)
  console.log("=== InboxEmail server rendering END ===");
  console.log(threadArrayEmailResponse)
  return (
    <SidebarProvider>
      <AppSidebar student_data={parsedUserProfile} />
      <SidebarInset>
        <header className="flex h-8 shrink-0 items-center gap-2 px-6">
          <SidebarTrigger className="cursor-pointer" />
          <Breadcrumb className="font-main font-semibold">
            <BreadcrumbList>
              <BreadcrumbItem>
                <MoveLeft className="w-5 text-[#787774] cursor-pointer rounded-xs hover:bg-gray-100 p-0.5" />
              </BreadcrumbItem>
              <BreadcrumbItem>
                <MoveRight className="w-5 text-[#787774] cursor-pointer rounded-xs hover:bg-gray-100 p-0.5" />
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Plus className="w-5 text-[#787774] cursor-pointer rounded-xs hover:bg-gray-100 p-0.5" />
              </BreadcrumbItem>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="/"
                  className="flex items-center font-medium text-[#37352F] gap-2"
                >
                  <Laptop className="rounded-xs text-white fill-blue-700 h-5 w-5" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <div className="text-gray-300">/</div>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-main flex items-center gap-2 font-medium text-[#37352F]">
                  <MapIcon className="fill-blue-700 text-white" />
                  Professors
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <div className="text-gray-300">/</div>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-main flex items-center gap-2 font-medium text-[#37352F]">
                  <Mail className="fill-blue-700 text-white" />
                  Inbox
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <InboxClientWrapper
          emails={parsedUserProfile.student_email ?? ""}
          threadArrayEmailResponse={combinedArray}
          userId={userIdVal}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
