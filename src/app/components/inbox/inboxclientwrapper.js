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

import {
  FileCheck2,
  FileMinus2,
  FolderOpen,
  Inbox,
  Lightbulb,
} from "lucide-react";

import EngagementButton from "./badges/engagementButton";
import { Skeleton } from "@/shadcomponents/ui/skeleton";
import { Badge } from "@/shadcomponents/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shadcomponents/ui/composedialog";
import Compose from "./editor/compose";
import ComposeFollowUp from "./button/compose/composeFollowUp";
import ContinueFollowUp from "./button/compose/continueFollowUp";
import SeenButton from "./badges/seenButton";
const EmailSidebar = lazy(() => import("./side/emailsidebar"));

export default function InboxClientWrapper({
  threadArrayEmailResponse,
  userId,
  emails,
}) {
  const [openThreadId, setOpenThreadId] = useState("");

  const [draftExistsMap, setDraftExistsMap] = useState(() => {
    const map = {};
    threadArrayEmailResponse.forEach((email) => {
      map[email.threadId] = email.draftData.draftExists;
    });
    return map;
  });

  useEffect(() => {
    const map = {};
    threadArrayEmailResponse.forEach((email) => {
      map[email.threadId] = email.draftData.draftExists;
    });
    setDraftExistsMap(map);
  }, [threadArrayEmailResponse]);

  function handleCreateReply(threadId) {
    setDraftExistsMap((prev) => ({
      ...prev,
      [threadId]: true,
    }));
  }

  return (
    <>
      <div className="font-main p-6 w-full">
        <div>
          <div className="w-full border-b-1 my-4">
            <div className="px-4 pt-3 bg-white justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Inbox className="h-5 w-5 text-gray-500" />
                <h1 className="text-xl font-semibold">Email Inbox</h1>
              </div>
              <div className="flex items-center py-2 space-x-2">
                <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-xs text-[10px]">
                  <Lightbulb />
                  Email
                </Badge>
                <div className="rounded-full h-1 w-1 bg-[#37352F]"></div>
                <h2 className="text-xs font-semibold text-[10px] text-[#37352F]">
                  By Jie Xuan Liu
                </h2>
              </div>
            </div>
            <h2 className="px-4 py-3 text-sm font-light text-[#37352F]">
              Track email engagement metrics, including when recipients open
              your emails and access attached files, so you can monitor
              communication effectiveness and follow up accordingly.
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-full cursor-pointer flex flex-col gap-2">
              <Badge className="bg-green-700 p-1 text-xs items-center font-main rounded-xs text-white flex gap-2 w-fit">
                <FileCheck2 className="h-6 w-6" />
                Response
              </Badge>
              {threadArrayEmailResponse.length > 0 ? (
                threadArrayEmailResponse?.map((email) => (
                  <Sheet
                    onOpenChange={(open) => {
                      if (open) setOpenThreadId(email.threadId);
                      else setOpenThreadId(null);
                    }}
                    key={email.threadId}
                  >
                    <SheetTrigger asChild>
                      <div className="w-full flex justify-between items-center p-2 hover:bg-gray-100 rounded-xs font-main text-[12.5px] space-x-4">
                        <div className="flex">
                          <div className="text-left">
                            <h1 className="font-semibold truncate">
                              {email.thread_title}
                            </h1>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 overflow-hidden basis-1/2">
                          <h1 className="font-light truncate max-w-[40%]">
                            {email.firstMessageData.subject || "No Subject"}
                          </h1>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 basis-1/4 justify-end">
                          <SeenButton seenData={email.seenData} />
                          <EngagementButton
                            engagementData={email.engagementData}
                          />
                          <span className="text-nowrap text-gray-500 ml-2">
                            {new Date(
                              email.firstMessageData.date
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </SheetTrigger>
                    <SheetContent className="w-[700px] sm:w-[540px] overflow-y-auto">
                      <SheetHeader>
                        <div className="flex justify-between">
                          <FolderOpen className="text-blue-700 h-6.5 w-6.5 p-1 rounded-xs cursor-pointer hover:bg-[#F1F1EF]" />

                          <div className="flex space-x-2 h-6.5">
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
                              <DialogContent>
                                <Compose
                                  draftData={email.draftData}
                                  userId={userId}
                                  professorId={email.professorId}
                                  threadId={email.threadId}
                                  fromName={email.userName}
                                  fromEmail={email.userEmail}
                                  to={email.professorEmail}
                                />
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <SheetTitle></SheetTitle>
                        <SheetDescription>
                          <div className="w-full p-4 font-main">
                            <div className="px-4 space-x-2">
                              <div className="px-8 space-y-4"></div>
                            </div>
                            {openThreadId === email.threadId && (
                              <Suspense
                                fallback={
                                  <div className="space-y-4">
                                    <p className="text-sm text-gray-500">
                                      Loading...
                                    </p>
                                    <Skeleton className="h-[40rem] w-full rounded-md animate-pulse bg-gray-200" />
                                  </div>
                                }
                              >
                                <EmailSidebar
                                  threadId={email.threadId}
                                  seenData={email.seenData}
                                  engagementData={email.engagementData}
                                  userId={userId}
                                  email={emails}
                                />
                              </Suspense>
                            )}
                          </div>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                ))
              ) : (
                <div className="font-light text-sm p-4">No Emails Found</div>
              )}
            </div>
            <div className="w-full cursor-pointer flex flex-col gap-2">
              <Badge className="bg-orange-700 p-1 text-xs items-center font-main rounded-xs text-white flex gap-2 w-fit">
                <FileMinus2 className="h-6 w-6" />
                No Response
              </Badge>
              {!threadArrayEmailResponse.length > 0 ? (
                threadArrayEmailResponse?.map((email) => (
                  <Sheet
                    onOpenChange={(open) => {
                      if (open) setOpenThreadId(email.threadId);
                      else setOpenThreadId(null);
                    }}
                    key={email.threadId}
                  >
                    <SheetTrigger asChild>
                      <div className="w-full flex justify-between items-center p-2 hover:bg-gray-100 rounded-xs font-main text-[12.5px] space-x-4">
                        <div className="flex">
                          <div className="text-left">
                            <h1 className="font-semibold truncate">
                              {email.thread_title}
                            </h1>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 overflow-hidden basis-1/2">
                          <h1 className="font-light truncate max-w-[40%]">
                            {email.firstMessageData.subject || "No Subject"}
                          </h1>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 basis-1/4 justify-end">
                          <SeenButton seenData={email.seenData} />
                          <EngagementButton
                            engagementData={email.engagementData}
                          />
                          <span className="text-nowrap text-gray-500 ml-2">
                            {new Date(
                              email.firstMessageData.date
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </SheetTrigger>
                    <SheetContent className="w-[700px] sm:w-[540px] overflow-y-auto">
                      <SheetHeader>
                        <div className="flex justify-between">
                          <FolderOpen className="text-blue-700 h-6.5 w-6.5 p-1 rounded-xs cursor-pointer hover:bg-[#F1F1EF]" />

                          <div className="flex space-x-2 h-6.5">
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
                              <DialogContent>
                                <Compose
                                  draftData={email.draftData}
                                  userId={userId}
                                  professorId={email.professorId}
                                  threadId={email.threadId}
                                  fromName={email.userName}
                                  fromEmail={email.userEmail}
                                  to={email.professorEmail}
                                />
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                        <SheetTitle></SheetTitle>
                        <SheetDescription>
                          <div className="w-full p-4 font-main">
                            <div className="px-4 space-x-2">
                              <div className="px-8 space-y-4"></div>
                            </div>
                            {openThreadId === email.threadId && (
                              <Suspense
                                fallback={
                                  <div className="space-y-4">
                                    <p className="text-sm text-gray-500">
                                      Loading...
                                    </p>
                                    <Skeleton className="h-[40rem] w-full rounded-md animate-pulse bg-gray-200" />
                                  </div>
                                }
                              >
                                <EmailSidebar
                                  threadId={email.threadId}
                                  seenData={email.seenData}
                                  engagementData={email.engagementData}
                                  userId={userId}
                                  email={emails}
                                />
                              </Suspense>
                            )}
                          </div>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                ))
              ) : (
                <div className="font-light text-sm p-4">No Emails Found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
