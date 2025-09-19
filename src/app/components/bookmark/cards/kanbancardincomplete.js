"use client";

import { useState } from "react";
import {
  Briefcase,
  Calendar,
  Paperclip,
  ExternalLink,
  NotebookPen,
  StickyNote,
  Tag,
  CircleAlert,
  Mail,
  Copy,
} from "lucide-react";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/shadcomponents/ui/sheet";
import { Button } from "@/shadcomponents/ui/button";

export default function KanbanCardInComplete({
  prof_id,
  title,
  school,
  faculty,
  department,
  research_interests,
  email,
  url,
  labs,
  lab_url,
  date,
  user_id,
}) {
  const [open, setOpen] = useState(false);

  const interests = Array.isArray(research_interests)
    ? research_interests
    : research_interests
    ? [research_interests]
    : [];
  const shownInterests = interests.slice(0, 6);
  const extraInterests = Math.max(0, interests.length - shownInterests.length);
  const prettyDate = date ? new Date(date).toLocaleString() : null;

  const copyEmail = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white w-full p-4 font-sans shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
      <div className="flex items-center gap-2 mb-2">
        <CircleAlert className="h-4 w-4 text-rose-500" />
        <h2 className="font-medium text-sm text-gray-900 leading-tight truncate" title={title}>
          {title || "Untitled Application"}
        </h2>
      </div>

      {(school || faculty) && (
        <div className="text-xs text-gray-600 mb-2 space-y-0.5">
          {school && (
            <p className="truncate" title={school}>
              {school}
            </p>
          )}
          {faculty && (
            <p className="truncate" title={faculty}>
              {faculty}
            </p>
          )}
        </div>
      )}

      {interests.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {shownInterests.map((interest, i) => (
            <span
              key={`${interest}-${i}`}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200"
              title={interest}
            >
              <Tag className="h-3 w-3 mr-1" /> {interest}
            </span>
          ))}
          {extraInterests > 0 && (
            <span className="text-[11px] text-gray-500">+{extraInterests} more</span>
          )}
        </div>
      )}

      <div className="flex gap-2">
    

        <Button
          onClick={() => setOpen(true)}
          className="h-7 px-2 text-xs font-medium bg-white text-gray-800 border hover:bg-gray-50 rounded-md inline-flex items-center gap-1"
          variant="outline"
        >
          <NotebookPen className="h-3.5 w-3.5" /> Details
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:w-[560px] p-0 border-l bg-white">
          <div className="bg-gradient-to-r from-rose-50 to-white border-b">
            <div className="px-6 py-4">
              <SheetHeader className="space-y-1">
                <SheetTitle className="text-xl font-semibold text-gray-900 truncate">
                  {title || "Application Details"}
                </SheetTitle>
                <SheetDescription className="text-gray-600 text-sm">
                  Review what we’ll use to start your outreach.
                </SheetDescription>
              </SheetHeader>
            </div>
          </div>

          <div className="px-6 py-5 max-h-[75vh] overflow-y-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="flex items-center text-xs text-gray-500 mb-1">
                  <StickyNote className="h-4 w-4 mr-2" /> Name
                </div>
                <div className="text-sm font-medium text-gray-900 truncate">{title || "N/A"}</div>
              </div>
              {prettyDate && (
                <div className="rounded-lg border border-slate-200 p-3">
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <Calendar className="h-4 w-4 mr-2" /> Date Added
                  </div>
                  <div className="text-sm font-medium text-gray-900">{prettyDate}</div>
                </div>
              )}
            </div>

            {/* Academic */}
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                <Briefcase className="h-4 w-4 mr-2 text-gray-600" /> Academic Affiliations
              </div>
              <div className="space-y-1 text-sm text-gray-800">
                {school && (
                  <p className="truncate" title={school}>
                    {school}
                  </p>
                )}
                {faculty && (
                  <p className="truncate" title={faculty}>
                    {faculty}
                  </p>
                )}
                {department && (
                  <p className="truncate" title={department}>
                    {department}
                  </p>
                )}
                {labs && <p className="truncate" title={labs}>{labs}</p>}
                {lab_url && (
                  <Link
                    href={lab_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-blue-600 text-xs mt-1 underline break-all"
                  >
                    <ExternalLink className="h-3.5 w-3.5 mr-1" /> Visit lab website
                  </Link>
                )}
              </div>
            </div>

            {/* Interests */}
            {interests.length > 0 && (
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                  <Tag className="h-4 w-4 mr-2 text-gray-600" /> Research Interests
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {interests.map((interest, i) => (
                    <span
                      key={`${interest}-${i}`}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200"
                      title={interest}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {(url || email) && (
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                  <ExternalLink className="h-4 w-4 mr-2 text-gray-600" /> Links
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  {url && (
                    <Link
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2 py-1 rounded-md"
                    >
                      <ExternalLink className="h-3.5 w-3.5 mr-1" /> Open Profile
                    </Link>
                  )}
                  {email && (
                    <button
                      onClick={copyEmail}
                      className="inline-flex items-center text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2 py-1 rounded-md"
                    >
                      <Mail className="h-3.5 w-3.5 mr-1" /> {email}
                      <Copy className="h-3.5 w-3.5 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <SheetFooter className="px-6 py-4 border-t bg-white">
            <SheetClose asChild>
              <Button
                variant="outline"
                className="px-3 py-1.5 text-sm bg-gray-50 text-gray-700 hover:bg-gray-100"
              >
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
