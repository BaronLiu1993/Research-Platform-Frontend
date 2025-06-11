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
} from "lucide-react";

import EngagementButton from "./badges/engagementButton";
import { Skeleton } from "@/shadcomponents/ui/skeleton";
import { Button } from "@/shadcomponents/ui/button";
const EmailSidebar = lazy(() => import("./side/emailsidebar"));

export default function InboxClientWrapper({
  threadArrayEmailResponse,
  userId,
  emails,
}) {
  const [openThreadId, setOpenThreadId] = useState("");
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
                <div className="flex justify-between items-center p-2 mx-4 hover:bg-[#F4EEEE] rounded-xs cursor-pointer font-main text-[12.5px]">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-1.5 w-1.5 bg-blue-700 rounded-full shrink-0"></div>
                    <h1 className="font-semibold truncate">
                      {email.thread_title}
                    </h1>
                  </div>

                  <div className="flex items-center gap-2 max-w-[60%] overflow-hidden">
                    <h1 className="font-semibold truncate">
                      {email.firstMessageData.subject}
                    </h1>
                    <h1 className="text-[#979A9B] truncate">
                      {email.firstMessageData.body}
                    </h1>
                    <EngagementButton />
                  </div>

                  <span className="text-nowrap text-gray-500 ml-2 shrink-0">
                    {new Date(email.firstMessageData.date).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
              </SheetTrigger>
              <SheetContent className="w-[700px] sm:w-[540px]">
                <SheetHeader>
                  <div className="flex justify-between">
                    <FolderOpen className="text-blue-700 h-6.5 w-6.5 p-1 rounded-xs cursor-pointer hover:bg-[#F1F1EF]" />
                    <div className="flex space-x-2 h-6.5">
                      <Button className = "h-6 text-xs bg-white border-1 border-[#F4EEEE] text-black hover:bg-white cursor-pointer">Auto Label Similar</Button>
                      <Database className="h-6.5 w-6.5 p-1 text-[#787774] hover:bg-[#F4EEEE] cursor-pointer"/>
                      <Trash2 className="text-[#787774] h-6.5 w-6.5 p-1 hover:bg-red-100 hover:text-red-700 cursor-pointer rounded-xs" />
                      <Tag className="h-6.5 w-6.5 p-1 text-[#787774] hover:bg-[#F4EEEE] cursor-pointer" />
                      <Clock className="h-6.5 w-6.5 p-1 text text-[#787774] hover:bg-[#F4EEEE] cursor-pointer" />
                      <Ellipsis className="h-6.5 w-6.5 p-1 text text-[#787774] hover:bg-[#F4EEEE] cursor-pointer" />
                    </div>
                  </div>
                  <SheetTitle></SheetTitle>
                  <SheetDescription>
                    <div className="w-full p-4">
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
