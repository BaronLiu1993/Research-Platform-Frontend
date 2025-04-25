"use client";
import { useRef, useState, useEffect } from "react";
import WordProcessor from "@/app/api/wordprocessor";

export default function ProjectForm() {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className="border border-gray-300 rounded-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 hover:bg-gray-200"
      >
        <span className="font-sans font-semibold">Untitled</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M5.5 7.5l4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </button>

      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-semibold">Job Title</label>
            <input className="p-2 border border-gray-200 bg-gray-50 rounded-md" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold">Company</label>
            <input className="p-2 border border-gray-200 bg-gray-50 rounded-md" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold">Location</label>
            <input className="p-2 border border-gray-200 bg-gray-50 rounded-md" />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-xs font-semibold">Start Date</label>
              <input className="p-2 border border-gray-200 bg-gray-50 rounded-md" />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-xs font-semibold">End Date</label>
              <input className="p-2 border border-gray-200 bg-gray-50 rounded-md" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold">Bulletin Points</label>
            <WordProcessor className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
