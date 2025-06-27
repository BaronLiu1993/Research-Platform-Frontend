"use client";

import { useState, Suspense, lazy } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shadcomponents/ui/sheet";

import {
  Inbox,
  ListFilter,
  RotateCw,
  FileSliders,
  Folder,
  FolderOpen,
  Trash,
  Trash2,
  Tag,
  Ellipsis,
  Clock,
  Database,
  Check,
  X,
  GlassWater,
  Group,
  Info,
  Reply,
  CircleOff,
  Scan,
  Newspaper,
  MessageSquareX,
} from "lucide-react";

import EngagementButton from "./badges/engagementButton";
import { Skeleton } from "@/shadcomponents/ui/skeleton";
import { Button } from "@/shadcomponents/ui/button";
import { Badge } from "@/shadcomponents/ui/badge";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/shadcomponents/ui/composedialog";
import Compose from "./editor/compose";
import ComposeFollowUp from "./button/compose/composeFollowUp";
import ContinueFollowUp from "./button/compose/continueFollowUp";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcomponents/ui/tabs";
import SeenButton from "./badges/seenButton";
const EmailSidebar = lazy(() => import("./side/emailsidebar"));

export default function InboxClientWrapper({
  threadArrayEmailResponse,
  userId,
  emails,
}) {
  const [openThreadId, setOpenThreadId] = useState("");
  console.log(threadArrayEmailResponse);
  return (
    <>
      <div className="font-main py-6">
        <div className="flex items-center justify-between space-x-2 px-5 py-3">
          <div className="flex items-center gap-2">
            <GlassWater className="h-5 w-5 text-red-700" />
            <h1 className="py-1 text-[15px] font-semibold text-black">
              Workflows
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ListFilter className="h-6 w-6 p-1 hover:bg-[#e9eaec] cursor-pointer rounded-xs text-blue-400" />
            <FileSliders className="h-6 w-6 p-1 hover:bg-[#e9eaec] cursor-pointer rounded-xs text-[#979A9B]" />
            <RotateCw className="h-6 w-6 p-1 hover:bg-[#e9eaec] cursor-pointer rounded-xs text-[#979A9B]" />
          </div>
        </div>
        <div>
          <Tabs className="bg-white">
            <TabsList className="bg-white">
              <TabsTrigger
                className="text-sm font-medium py-6 gap-2 pr-10 flex"
                value="primary"
              >
                <CircleOff className="h-10 w-10" />

                <div className="flex items-start flex-col">
                  <span className="flex gap-2">
                    No Replies
                    <Badge className="bg-[#FAF1F5] text-[#C14C8A] rounded-md">
                      3
                    </Badge>
                  </span>
                  <span className="text-xs font-light">Follow Up Maybe?</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                className="text-sm font-medium py-6 gap-2 pr-10 flex"
                value="replied"
              >
                <Reply className="h-10 w-10" />

                <div className="flex items-start flex-col">
                  <span className="flex gap-2">
                    Replied
                    <Badge className="bg-[#E7F3F8] text-[#337EA9] rounded-md">
                      3
                    </Badge>
                  </span>
                  <span className="text-xs font-light">
                    Someone's Interested
                  </span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                className="text-sm font-medium py-6 gap-2 pr-10 flex"
                value="interviews"
              >
                <Scan className="h-10 w-10" />

                <div className="flex items-start flex-col">
                  <span className="flex gap-2">
                    Interviews
                    <Badge className="bg-[#F6F3F9] text-[#9065B0] rounded-md">
                      3
                    </Badge>
                  </span>
                  <span className="text-xs font-light">Good Luck!</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                className="text-sm font-medium py-6 gap-2 pr-10 flex"
                value="offers"
              >
                <Newspaper className="h-10 w-10" />

                <div className="flex items-start flex-col">
                  <span className="flex gap-2">
                    Offers
                    <Badge className="bg-[#EDF3EC] text-[#448361] rounded-md">
                      3
                    </Badge>
                  </span>
                  <span className="text-xs font-light">Congratulations!</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                className="text-sm font-medium py-6 gap-2 pr-10 flex"
                value="lost"
              >
                <MessageSquareX className="h-10 w-10" />

                <div className="flex items-start flex-col">
                  <span className="flex gap-2">
                    Lost
                    <Badge className="bg-[#FDEBEC] text-[#D44C47] rounded-md">
                      3
                    </Badge>
                  </span>
                  <span className="text-xs font-light">Don't Give Up!</span>
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="primary">
              <div>
                {threadArrayEmailResponse.map((email) => (
                  <Sheet
                    onOpenChange={(open) => {
                      if (open) setOpenThreadId(email.threadId);
                      else setOpenThreadId(null);
                    }}
                    key={email.threadId}
                  >
                    <SheetTrigger>
                      <div
                        className={`flex justify-between items-center p-2 mx-4 hover:bg-[#F4EEEE] rounded-xs cursor-pointer font-main text-[12.5px] space-x-4 w-[60rem] ${
                          email.statusData.data === "Important"
                            ? "bg-[#F4EEEE]"
                            : ""
                        }`}
                      >
                        {" "}
                        <div className="flex items-center gap-2 min-w-0 basis-1/4 shrink-0 ">
                          <div className="w-[10rem] flex"></div>
                          <div className="w-[10rem] text-left">
                            <h1 className="font-semibold truncate">
                              {email.thread_title}
                            </h1>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 overflow-hidden basis-1/2">
                          <h1 className="font-semibold truncate max-w-[40%]">
                            {email.firstMessageData.subject}
                          </h1>
                          <h1 className="text-[#979A9B] truncate max-w-[60%]">
                            {email.firstMessageData.body}
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
                                  {email.draftData.draftExists ? (
                                    <ContinueFollowUp />
                                  ) : (
                                    <ComposeFollowUp
                                      userId={userId}
                                      professorId={email.professorId}
                                      userEmail={email.userEmail}
                                      professorEmail={email.professorEmail}
                                      userName={email.userName}
                                    />
                                  )}
                                </div>
                              </DialogTrigger>
                              <DialogContent>
                                <Compose
                                  draftData={email.draftData}
                                  userId={userId}
                                  professorId={email.professorId}
                                  fromName={email.userName}
                                  fromEmail={email.userEmail}
                                  to={email.professorEmail}
                                />
                              </DialogContent>
                            </Dialog>

                            <Database className="h-6.5 w-6.5 p-1 text-[#787774] hover:bg-[#F4EEEE] cursor-pointer" />
                            <Trash2 className="text-[#787774] h-6.5 w-6.5 p-1 hover:bg-red-100 hover:text-red-700 cursor-pointer rounded-xs" />
                            <Tag className="h-6.5 w-6.5 p-1 text-[#787774] hover:bg-[#F4EEEE] cursor-pointer" />
                            <Clock className="h-6.5 w-6.5 p-1 text text-[#787774] hover:bg-[#F4EEEE] cursor-pointer" />
                            <Ellipsis className="h-6.5 w-6.5 p-1 text text-[#787774] hover:bg-[#F4EEEE] cursor-pointer" />
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
                ))}
              </div>
            </TabsContent>
            <TabsContent value="promotions">promotions</TabsContent>
            <TabsContent value="social">social</TabsContent>
            <TabsContent value="updates">updates</TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
