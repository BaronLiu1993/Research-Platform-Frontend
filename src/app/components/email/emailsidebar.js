"use client";

import { useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shadcomponents/ui/hover-card";
import { Badge } from "@/shadcomponents/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/shadcomponents/ui/card";

import { Info, X } from "lucide-react";

export default function EmailSideBar({ publications }) {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <div className="border-l-1 p-7 space-y-5">
        {visible ? (
          <div className="flex items-center space-x-2 border-2 border-red-900 bg-red-300 rounded-md px-4 py-2 text-red-800 font-sans text-xs font-bold">
            <Info className="h-6 w-6" />
            <span>Please Cross Reference Publications for Accuracy</span>
            <button
              onClick={() => setVisible(false)}
              aria-label="Close message"
              className="ml-auto text-red-800 hover:text-red-900 hover:cursor"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div></div>
        )}
        <Card className="rounded-lg border border-gray-200 bg-white shadow-sm p-4 font-sans">
          <CardTitle className="mb-4">
            <div className="flex items-center space-x-2 text-gray-800 mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="M4 19.5V15a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4.5A2.5 2.5 0 0 1 17.5 22H6.5A2.5 2.5 0 0 1 4 19.5z" />
                <path d="M6 13V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8" />
              </svg>
              <h1 className="text-base font-semibold">Publications</h1>
            </div>
            <CardDescription className="text-xs text-gray-500 ml-7">
              Review Publications Added for Relevance and Accuracy
            </CardDescription>
          </CardTitle>

          <div className="space-y-3">
            {publications.map((pub) => (
              <CardContent
                key={pub.id}
                className="flex flex-col gap-2 rounded-md p-3 border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="space-y-1">
                  <p className="text-gray-500 text-xs font-medium">Research</p>
                  {/* Title with character limit and ellipsis */}
                  <h1 className="text-sm font-medium text-gray-800">
                    {pub.title.length > 80
                      ? `${pub.title.substring(0, 80)}...`
                      : pub.title}
                  </h1>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer">
                      <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md px-2 py-0.5 font-normal">
                        Authors
                      </Badge>
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-white p-3 rounded-md shadow-lg border border-gray-200 text-sm text-gray-700">
                      <div className="flex flex-wrap gap-x-2">
                        {pub.authors.map((author, index) => (
                          <span key={index} className="font-normal">
                            {author}
                            {index < pub.authors.length - 1 ? "," : ""}
                          </span>
                        ))}
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md px-2 py-0.5 font-normal">
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      Link
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" x2="21" y1="14" y2="3" />
                      </svg>
                    </a>
                  </Badge>
                  <p className="text-gray-600 text-xs">
                    {pub.publication_date}
                  </p>
                </div>
              </CardContent>
            ))}
          </div>
        </Card>

        <Card className="w-[13rem] ">
          <CardTitle className="font-sans ">
            <CardContent className="text-sm flex space-x-2">
              <div className="h-4 w-4 bg-red-500"></div>
              <span>Spell Check</span>
            </CardContent>
            <CardDescription className="text-xs ml-5">
              Review the provided English text and identify any spelling errors
            </CardDescription>
          </CardTitle>
        </Card>
        <Card className="w-[13rem] ">
          <CardTitle className="font-sans ">
            <CardContent className="text-sm flex space-x-2">
              <div className="h-4 w-4 bg-orange-500"></div>
              <span>Specificity</span>
            </CardContent>
            <CardDescription className="text-xs ml-5">
              Review the provided English text and identify any spelling errors
            </CardDescription>
          </CardTitle>
        </Card>
      </div>
    </>
  );
}
