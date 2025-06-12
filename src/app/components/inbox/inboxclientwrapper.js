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
} from "lucide-react";

import EngagementButton from "./badges/engagementButton";
import { Skeleton } from "@/shadcomponents/ui/skeleton";
import { Button } from "@/shadcomponents/ui/button";
import { Badge } from "@/shadcomponents/ui/badge";
import { Dialog, DialogTitle, DialogContent, DialogTrigger } from "@/shadcomponents/ui/composedialog";
import Compose from "./editor/compose";
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
            <Inbox className="h-5 w-5 text-red-700" />
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
                    email.statusData.data === "Important" ? "bg-[#F4EEEE]" : ""
                  }`}
                >
                  {" "}
                  {/* Status + Title */}
                  <div className="flex items-center gap-2 min-w-0 basis-1/4 shrink-0 ">
                    <div className="w-[10rem] flex">
                      <Badge
                        className={`font-main rounded-xs   ${
                          email.statusData.data === "Lost"
                            ? "bg-red-700"
                            : email.statusData.data === "Won"
                            ? "bg-green-700"
                            : email.statusData.data === "Interview"
                            ? "bg-yellow-500"
                            : email.statusData.data === "Important"
                            ? "bg-purple-500"
                            : "bg-blue-700"
                        }`}
                      >
                        {email.statusData.data === "Lost"
                          ? "😞"
                          : email.statusData.data === "Won"
                          ? "🎉"
                          : email.statusData.data === "Interview"
                          ? "📚"
                          : email.statusData.data === "Important"
                          ? "❗"
                          : "🔄"}{" "}
                        {email.statusData.data}
                      </Badge>
                    </div>
                    <div className="w-[10rem] text-left">
                      <h1 className="font-semibold truncate">
                        {email.thread_title}
                      </h1>
                    </div>
                  </div>
                  {/* Subject + Body */}
                  <div className="flex items-center gap-2 overflow-hidden basis-1/2">
                    <h1 className="font-semibold truncate max-w-[40%]">
                      {email.firstMessageData.subject}
                    </h1>
                    <h1 className="text-[#979A9B] truncate max-w-[60%]">
                      {email.firstMessageData.body}
                    </h1>
                  </div>
                  {/* Engagement + Date */}
                  <div className="flex items-center gap-2 shrink-0 basis-1/4 justify-end">
                    <EngagementButton engagementData={email.engagementData} />
                    <span className="text-nowrap text-gray-500 ml-2">
                      {new Date(email.firstMessageData.date).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        }
                      )}
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
                          <Button className="h-6 text-xs bg-white border border-[#F4EEEE] text-black hover:bg-white cursor-pointer">
                            Generate Follow Up
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <Compose />
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
                        <div className="px-8 space-y-4">
                          <div className="text-xs text-black font-mono">
                            Tag workflows as{" "}
                            <span className="text-blue-700  font-semibold">
                              {"Won"}
                            </span>{" "}
                            or{" "}
                            <span className="text-red-700  font-semibold">
                              {"Lost"}
                            </span>{" "}
                            to keep things focused.{" "}
                            <span className="text-blue-700  font-semibold">
                              {"Won"}
                            </span>{" "}
                            workflows stay on top, while{" "}
                            <span className="text-red-700  font-semibold">
                              {"Lost"}
                            </span>{" "}
                            ones get tucked away.
                          </div>
                          <div className="space-x-4">
                            <Button className="h-6 text-xs bg-white border-1 border-[#F4EEEE] text-black hover:bg-white cursor-pointer">
                              <Check className="" />
                              Won
                            </Button>
                            <Button className="h-6 text-xs bg-white border-1 border-[#F4EEEE] text-black hover:bg-white cursor-pointer">
                              <X />
                              Lost
                            </Button>
                          </div>
                        </div>
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
      </div>
    </>
  );
}
