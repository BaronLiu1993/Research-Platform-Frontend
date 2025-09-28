"use client";

import { useState, Suspense, lazy, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/shadcomponents/ui/sheet";
import { Badge } from "@/shadcomponents/ui/badge";
import { Skeleton } from "@/shadcomponents/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shadcomponents/ui/composedialog";
import { FileCheck2, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";

import Compose from "./editor/compose";
import ComposeFollowUp from "./button/compose/composeFollowUp";
import ContinueFollowUp from "./button/compose/continueFollowUp";
import { Button } from "@/shadcomponents/ui/button";
const EmailSidebar = lazy(() => import("./side/emailsidebar"));

export default function InboxClientWrapper({
  threadArrayEmailResponse,
  userId,
  userEmail,
  userName,
  access,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);

  const gotoPage = (p) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handlePrev = () => {
    if (page > 1) gotoPage(page - 1);
  };
  const handleNext = () => {
    gotoPage(page + 1);
  };

  const [openThreadId, setOpenThreadId] = useState(null);
  const [draftExistsMap, setDraftExistsMap] = useState({});

  useEffect(() => {
    const map = {};
    (threadArrayEmailResponse || []).forEach((email) => {
      map[email.threadId] = Boolean(email?.draftData?.draftExists);
    });
    setDraftExistsMap(map);
  }, [threadArrayEmailResponse]);

  function handleCreateReply(threadId) {
    setDraftExistsMap((prev) => ({ ...prev, [threadId]: true }));
  }

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-main">
      <div className="rounded-xl bg-white overflow-hidden">
        <div className="px-4 sm:px-6 pt-5 pb-2">
          <div className="flex gap-2 flex-col">
            <h1 className="text-2xl font-playfair text-black">Student Inbox</h1>
            <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-md text-[11px] inline-flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5" />
              Email
            </Badge>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-8">
          <section className="space-y-3 border-1 p-4 rounded-md">
            <div className="flex justify-between items-center">
              <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-white bg-green-700 text-xs w-fit">
                <FileCheck2 className="h-4 w-4" />
                Response
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handlePrev} className="h-8 px-2 gap-1" disabled={page <= 1}>
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </Button>
                <span className="text-xs text-slate-600 w-16 text-center">Page {page}</span>
                <Button variant="outline" onClick={handleNext} className="h-8 px-2 gap-1">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden">
              {threadArrayEmailResponse?.length > 0 ? (
                <ul className="min-h-[60vh] overflow-y-auto">
                  {threadArrayEmailResponse.map((email) => (
                    <li key={email.threadId}>
                      <Sheet
                        onOpenChange={(open) =>
                          setOpenThreadId(open ? email.threadId : null)
                        }
                      >
                        <SheetTrigger asChild>
                          <button
                            className="w-full text-left rounded-md cursor-pointer flex items-center justify-between gap-3 px-3 sm:px-4 py-2.5 hover:bg-slate-100 transition-colors"
                            title={email.thread_title}
                          >
                            <div className="min-w-0 flex gap-5">
                              <div className="font-semibold text-[13px] truncate">
                                {email.thread_title}
                              </div>
                              <div className="text-[13px] truncate font-light">
                                {email?.firstMessageData?.subject || "No Subject"}
                              </div>
                            </div>
                            {email?.firstMessageData?.date && (
                              <span className="text-xs text-gray-800 font-light shrink-0">
                                {new Date(email.firstMessageData.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            )}
                          </button>
                        </SheetTrigger>

                        <SheetContent className="w-[760px] sm:w-[560px] p-0 overflow-y-auto">
                          <div className="px-5 py-3 to-white">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <div>
                                      {draftExistsMap[email.threadId] ? (
                                        <ContinueFollowUp />
                                      ) : (
                                        <ComposeFollowUp
                                          threadId={email.threadId}
                                          professorId={email.professorId}
                                          professorEmail={email.professorEmail}
                                          professorName={"placeholder"}
                                          fromEmail={userEmail}
                                          fromName={userName}
                                          onCreateReply={() =>
                                            handleCreateReply(email.threadId)
                                          }
                                          access={access}
                                        />
                                      )}
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent className=" rounded-xl overflow-hidden">
                                    <div className="p-5">
                                      <Compose
                                        draftData={email?.draftData}
                                        userId={userId}
                                        professorId={email.professorId}
                                        threadId={email.threadId}
                                        fromName={email.userName}
                                        fromEmail={email.userEmail}
                                        to={email.professorEmail}
                                      />
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 sm:p-5">
                            {openThreadId === email.threadId ? (
                              <Suspense
                                fallback={
                                  <div className="space-y-3">
                                    <Skeleton className="h-5 w-48" />
                                    <Skeleton className="h-4 w-64" />
                                    <Skeleton className="h-24 w-full" />
                                  </div>
                                }
                              >
                                <EmailSidebar
                                  threadId={email.threadId}
                                  seenData={email.seenData}
                                  engagementData={email.engagementData}
                                  userId={userId}
                                  email={userEmail}
                                  access={access}
                                />
                              </Suspense>
                            ) : null}
                          </div>
                        </SheetContent>
                      </Sheet>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 text-center text-sm text-slate-600">
                  No Emails Found
                </div>
              )}
            </div>
          </section>
          <div></div>
        </div>
      </div>
    </div>
  );
}
