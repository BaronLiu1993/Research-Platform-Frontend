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
  Car,
} from "lucide-react";
import Link from "next/link";

import DeleteInProgressButton from "./deleteinprogressbutton";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/shadcomponents/ui/sheet";
import { Button } from "@/shadcomponents/ui/button";

export default function KanbanCardInProgress({
  prof_id,
  title,
  school,
  faculty,
  department,
  research_interests,
  email,
  labs,
  lab_url,
  url,
  date,
  user_id,
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <div className="rounded-xs border border-gray-200 bg-white w-full p-4 font-main shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
      <div className="flex items-center space-x-2 mb-2">
        <Car className="h-4 w-4 text-yellow-300" />
        <h2 className="font-medium text-sm text-black leading-tight break-words">
          {title || "Untitled Application"}
        </h2>
      </div>

      {(school || faculty) && (
        <div className="text-xs text-[#979A9B] mb-2 space-y-0.5">
          {school && <p>{school}</p>}
        </div>
      )}

      {research_interests && (
        <div className="flex flex-wrap items-center gap-1 mb-4 ">
          {research_interests?.[0] ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
              <Tag className="h-3 w-3 mr-1" />
              {`${research_interests[0].slice(0, 15)}...`}
            </span>
          ) : null}
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
        >
          <Button className="bg-white shadow-none hover:bg-gray-100 w-[1rem] rounded-xs inline-flex items-center cursor-pointer h-[1.5rem] text-xs font-medium">
            <Paperclip className="h-3 w-3 text-black" />
          </Button>
        </Link>

        <Button
          onClick={() => setIsSheetOpen(true)}
          className="bg-white shadow-none hover:bg-gray-100 w-[1rem] rounded-xs inline-flex items-center cursor-pointer h-[1.5rem] text-xs font-medium"
        >
          <NotebookPen className="h-3 w-3 text-black" />
        </Button>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full font-sans sm:w-[500px] bg-white p-6 border-l border-gray-200 shadow-lg">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl font-semibold text-gray-800">
              Application Details
            </SheetTitle>
            <SheetDescription className="text-gray-500 text-sm">
              Review the Data Used To Contexualise and Personalise Your
              Application
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
                  {lab_url && (
                    <Link
                      href={lab_url}
                      target="_blank"
                      className="text-xs text-blue-500 underline flex justify-center items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {labs}
                    </Link>
                  )}
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
                    View Professor Profile
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
                  <div className="text-blue-600 text-xs cursor-pointer mt-1 ml-6 hover:underline flex items-center">
                    {email}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <DeleteInProgressButton professor_id={prof_id} user_id={user_id} />
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
