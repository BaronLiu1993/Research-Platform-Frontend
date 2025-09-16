"use client";

import { useState, Suspense, lazy, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shadcomponents/ui/sheet";
import { Badge } from "@/shadcomponents/ui/badge";
import { Skeleton } from "@/shadcomponents/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shadcomponents/ui/composedialog";
import { FileCheck2, FileMinus2, FolderOpen, Lightbulb } from "lucide-react";

import Compose from "./editor/compose";
import ComposeFollowUp from "./button/compose/composeFollowUp";
import ContinueFollowUp from "./button/compose/continueFollowUp";
const EmailSidebar = lazy(() => import("./side/emailsidebar"));

export default function InboxClientWrapper({
  threadArrayEmailResponse,
  threadArrayNoResponse = [],
  userId,
  emails,
  access,
}) {
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
            <h1 className="text-2xl font-playfair text-black">
              Student Inbox 
            </h1>
            <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-md text-[11px] inline-flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5" />
              Email
            </Badge>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-8">
          <section className="space-y-3 border-1 p-4 rounded-md">
            <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-white bg-green-700 text-xs w-fit">
              <FileCheck2 className="h-4 w-4" />
              Response
            </span>

            <div className="rounded-lg overflow-hidden">
              {threadArrayEmailResponse?.length > 0 ? (
                <ul className="max-h-[60vh] overflow-y-auto divide-y">
                  {threadArrayEmailResponse.map((email) => (
                    <li key={email.threadId}>
                      <Sheet
                        onOpenChange={(open) =>
                          setOpenThreadId(open ? email.threadId : null)
                        }
                      >
                        <SheetTrigger asChild>
                          <button
                            className="w-full text-left flex items-center justify-between gap-3 px-3 sm:px-4 py-2.5 hover:bg-slate-50 transition-colors"
                            title={email.thread_title}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-[13px] truncate">
                                {email.thread_title}
                              </div>
                              <div className="text-[12.5px] text-slate-600 truncate">
                                {email?.firstMessageData?.subject ||
                                  "No Subject"}
                              </div>
                            </div>
                            {email?.firstMessageData?.date && (
                              <span className="text-xs text-gray-500 shrink-0">
                                {new Date(
                                  email.firstMessageData.date
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            )}
                          </button>
                        </SheetTrigger>

                        <SheetContent className="w-[760px] sm:w-[560px] p-0 overflow-y-auto">
                          <div className="px-5 py-3 border-b bg-gradient-to-r from-blue-50 to-white">
                            <div className="flex items-center justify-between">
                              <FolderOpen className="text-blue-700 h-6 w-6 p-1 rounded-md cursor-pointer hover:bg-[#F1F1EF]" />
                              <div className="flex items-center gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <div>
                                      {draftExistsMap[email.threadId] ? (
                                        <ContinueFollowUp />
                                      ) : (
                                        <ComposeFollowUp
                                          threadId={email.threadId}
                                          userId={userId}
                                          professorId={email.professorId}
                                          userEmail={email.userEmail}
                                          professorEmail={email.professorEmail}
                                          userName={email.userName}
                                          onCreateReply={() =>
                                            handleCreateReply(email.threadId)
                                          }
                                        />
                                      )}
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl p-0 rounded-xl overflow-hidden">
                                    <div className="px-5 py-3 border-b bg-gradient-to-r from-blue-50 to-white">
                                      <h3 className="text-base font-semibold text-slate-800">
                                        Compose Reply
                                      </h3>
                                    </div>
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
                                    <p className="text-sm text-gray-500">
                                      Loading…
                                    </p>
                                    <Skeleton className="h-[40rem] w-full rounded-md bg-gray-200" />
                                  </div>
                                }
                              >
                                <EmailSidebar
                                  threadId={email.threadId}
                                  seenData={email.seenData}
                                  engagementData={email.engagementData}
                                  userId={userId}
                                  email={emails}
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

          <section className="space-y-3 border-1 p-4 rounded-md">
            <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-white bg-orange-700 text-xs w-fit">
              <FileMinus2 className="h-4 w-4" />
              No Response
            </span>

            <div className="rounded-lg overflow-hidden">
              {threadArrayNoResponse?.length > 0 ? (
                <ul className="max-h-[60vh] overflow-y-auto divide-y">
                  {threadArrayNoResponse.map((email) => (
                    <li key={email.threadId}>
                      <Sheet
                        onOpenChange={(open) =>
                          setOpenThreadId(open ? email.threadId : null)
                        }
                      >
                        <SheetTrigger asChild>
                          <button
                            className="w-full text-left flex items-center justify-between gap-3 px-3 sm:px-4 py-2.5 hover:bg-slate-50 transition-colors"
                            title={email.thread_title}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-[13px] truncate">
                                {email.thread_title}
                              </div>
                              <div className="text-[12.5px] text-slate-600 truncate">
                                {email?.firstMessageData?.subject ||
                                  "No Subject"}
                              </div>
                            </div>
                            {email?.firstMessageData?.date && (
                              <span className="text-xs text-gray-500 shrink-0">
                                {new Date(
                                  email.firstMessageData.date
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            )}
                          </button>
                        </SheetTrigger>

                        <SheetContent className="w-[760px] sm:w-[560px] p-0 overflow-y-auto">
                          {/* Sheet header */}
                          <div className="px-5 py-3 border-b bg-gradient-to-r from-blue-50 to-white">
                            <div className="flex items-center justify-between">
                              <FolderOpen className="text-blue-700 h-6 w-6 p-1 rounded-md cursor-pointer hover:bg-[#F1F1EF]" />
                              <div className="flex items-center gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <div>
                                      {draftExistsMap[email.threadId] ? (
                                        <ContinueFollowUp />
                                      ) : (
                                        <ComposeFollowUp
                                          threadId={email.threadId}
                                          userId={userId}
                                          professorId={email.professorId}
                                          userEmail={email.userEmail}
                                          professorEmail={email.professorEmail}
                                          userName={email.userName}
                                          onCreateReply={() =>
                                            handleCreateReply(email.threadId)
                                          }
                                        />
                                      )}
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl p-0 rounded-xl overflow-hidden">
                                    <div className="px-5 py-3 border-b bg-gradient-to-r from-blue-50 to-white">
                                      <h3 className="text-base font-semibold text-slate-800">
                                        Compose Reply
                                      </h3>
                                    </div>
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

                          {/* Sheet body */}
                          <div className="p-4 sm:p-5">
                            {openThreadId === email.threadId ? (
                              <Suspense
                                fallback={
                                  <div className="space-y-3">
                                    <p className="text-sm text-gray-500">
                                      Loading…
                                    </p>
                                    <Skeleton className="h-[40rem] w-full rounded-md bg-gray-200" />
                                  </div>
                                }
                              >
                                <EmailSidebar
                                  threadId={email.threadId}
                                  seenData={email.seenData}
                                  userId={userId}
                                  email={emails}
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
        </div>
      </div>
    </div>
  );
}
