"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  X,
  Briefcase,
  Calendar, 
  Paperclip,
  ExternalLink,
  NotebookPen,
  StickyNote,
  Tag, 
} from "lucide-react";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/shadcomponents/ui/sheet";
import { Button } from "@/shadcomponents/ui/button";

export default function KanbanCardInProgress({
  title,
  school,
  faculty,
  department,
  research_interests,
  email,
  url,
  date,
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="rounded-md border border-gray-200 bg-white w-full p-4 font-sans shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
      <div className="flex items-center space-x-2 mb-2">
        <StickyNote className="h-4 w-4 text-gray-400" />
        <h2 className="font-medium text-gray-800 text-base leading-tight break-words">
          {title || "Untitled Application"}
        </h2>
      </div>

      {(school || faculty) && (
        <div className="text-xs text-gray-500 mb-2 space-y-0.5">
          {school && <p>{school}</p>}
        </div>
      )}

      {date && (
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <Calendar className="h-3 w-3 mr-1 text-gray-400" />
          <p>{new Date(date).toLocaleString()}</p>
        </div>
      )}

      {research_interests && (
        <div className="flex flex-wrap items-center gap-1 mb-4 ">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
            <Tag className="h-3 w-3 mr-1" />
            {research_interests[0]}
          </span>
          {research_interests.length > 1 && (
            <span className="text-xs mr-1 text-gray-500 underline">
              +{research_interests.length - 1} more
            </span>
          )}
        </div>
      )}

      <div className="flex gap-2">
        <Link
          href={{
            pathname: `/resume/${title}`,
            query: {
              research_interests: research_interests,
              professor_email: email,
              professor_name: title,
            },
          }}
          className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors duration-200"
        >
          <Paperclip className="h-3 w-3 mr-1 text-orange-500" />
          Continue
        </Link>

        <Button
          onClick={() => setIsSheetOpen(true)}
          className="inline-flex items-center cursor-pointer h-[1.5rem] text-xs font-medium bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
        >
          <NotebookPen className="h-3 w-3 text-blue-500" />
          Details
        </Button>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full font-sans sm:w-[500px] bg-white p-6 border-l border-gray-200 shadow-lg">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl font-semibold text-gray-800">
              Application Details
            </SheetTitle>
            <SheetDescription className="text-gray-500 text-sm">
              Review the Data Used To Contexualise and Personalise Your Application
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center">
              <div>
                <div className="flex underline">
                  <StickyNote className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0 " />
                  <p className="font-medium text-sm text-gray-600">Name</p>
                </div>
                <div className="pl-6">
                  <p className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 whitespace-nowrap border-1 border-blue-500">
                    {title || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="space-y-1">
                {" "}
                <div className="flex items-center mb-1">
                  {" "}
                  <Briefcase className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                  <p className="font-medium text-sm text-gray-600 underline">
                    Academic Affiliations
                  </p>
                </div>
                <div className="pl-6 text-gray-800">
                  {" "}
                  {school && <p className="text-xs">{school}</p>}
                  {faculty && <p className="text-xs">{faculty}</p>}
                  {department && <p className="text-xs">{department}</p>}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-gray-600 underline">
                    Date Added
                  </p>
                  <p className="text-xs">{new Date(date).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {research_interests && research_interests.length > 0 && (
              <div>
                <div className="flex items-center mb-1">
                  <Tag className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                  <p className="font-medium text-sm text-gray-600 underline">
                    Research Interests
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pl-6">
                  {" "}
                  {research_interests.map((interest, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 whitespace-nowrap border-1 border-blue-500"
                    >
                      {interest.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {url && (
              <div className="flex items-center">
                <div>
                  <p className="font-medium text-sm text-gray-600 underline flex">
                    <ExternalLink className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                    Profile Link
                  </p>
                  <Link
                    href={url}
                    target="_blank"
                    className="text-blue-600 text-xs cursor-pointer mt-1 ml-6 hover:underline flex items-center"
                  >
                    {url}
                  </Link>
                </div>
              </div>
            )}

            {email && (
              <div className="flex items-center">
                <div>
                  <p className="font-medium text-sm text-gray-600 underline flex">
                    <ExternalLink className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                    Professor Email
                  </p>
                  <div
                    className="text-blue-600 text-xs cursor-pointer mt-1 ml-6 hover:underline flex items-center"
                  >
                    {email}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Button
              variant="outline"
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              onClick={() => setIsSheetOpen(false)}
            >
              Close
            </Button>
          
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
