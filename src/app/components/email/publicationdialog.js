"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shadcomponents/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shadcomponents/ui/hover-card";
import { Badge } from "@/shadcomponents/ui/badge";
import { CardContent } from "@/shadcomponents/ui/card";
import { Info, X } from "lucide-react";

export default function PublicationDialog({ publications }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (publications && publications.length > 0) {
      setOpen(true);
    }
  }, [publications]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <Info className="h-5 w-5 text-red-600" />
            Publications
          </DialogTitle>
        </DialogHeader>

        {visible && (
          <div className="flex items-center space-x-2 border-2 border-red-900 bg-red-300 rounded-md px-4 py-2 text-red-800 font-sans text-xs font-bold">
            <Info className="h-5 w-5" />
            <span>Please Cross Reference Publications for Accuracy</span>
            <button
              onClick={() => setVisible(false)}
              className="ml-auto text-red-800 hover:text-red-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="space-y-3 mt-4">
          {publications.map((pub) => (
            <CardContent
              key={pub.id}
              className="flex flex-col gap-2 rounded-md p-3 border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="space-y-1">
                <p className="text-gray-500 text-xs font-medium">Research</p>
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
                <p className="text-gray-600 text-xs">{pub.publication_date}</p>
              </div>
            </CardContent>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
