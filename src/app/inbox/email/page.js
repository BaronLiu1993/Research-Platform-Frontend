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
  console.log(`➡️ fetch: ${url}`);
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
    // still return object to avoid throwing here, upstream can handle
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
      console.warn("get-email-chain returned non-ok, using empty array");
      threadArrayEmailResponse = [];
    } else {
      const parsedEmailResponse = resp.parsed;
      console.log("get-email-chain parsed:", parsedEmailResponse);
      threadArrayEmailResponse = parsedEmailResponse?.threadArray ?? [];
    }
  } catch (err) {
    console.error("❌ Error in get-email-chain fetch:", err);
    threadArrayEmailResponse = [];
  }

  console.log("threadArrayEmailResponse length:", threadArrayEmailResponse.length);

  // map and enrich every thread with several dependent fetches
  const combinedArray = await Promise.all(
    threadArrayEmailResponse.map(async (obj, index) => {
      console.log(`\n--- processing thread index ${index} threadId=${obj.threadId} professorId=${obj.professorId} ---`);

      // create endpoint urls using the concrete userIdVal and obj fields (encode components)
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
        console.error(`❌ Error enriching thread at index ${index}:`, err);
        return { ...obj, engagementData: {}, statusData: {}, draftData: {}, seenData: {} };
      }
    })
  );

  console.log("combinedArray assembled, length:", combinedArray.length);

  // fetch user sidebar/profile
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

  console.log("=== InboxEmail server rendering END ===");
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
