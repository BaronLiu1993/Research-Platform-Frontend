"use client";

import { useRef, useState, useEffect } from "react";
import EmploymentWordProcessor from "./employmentwordprocessor";

export default function EmploymentForm({ data, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");
  const [local, setLocal] = useState(data);

  console.log(data.description)

  useEffect(() => {
    setLocal(data);
  }, [data]);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen, local]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    const updated = { ...local, [name]: value };
    setLocal(updated);
    onChange(updated);
  };

  const handleDescriptionChange = (newDescriptionArray) => {
    const updated = { ...local, description: newDescriptionArray };
    setLocal(updated);
    onChange(updated);
  };

  return (
    <div className="border border-gray-300 rounded-md">
      <button
        onClick={() => setIsOpen(o => !o)}
        className="w-full flex justify-between items-center p-4 hover:bg-gray-200"
      >
        <span className="font-sans font-semibold">
          {local.job_title || "Untitled"}
        </span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 20 20"
        >
          <path
            d="M5.5 7.5l4.5 4.5 4.5-4.5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </button>

      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="p-6 flex flex-col gap-4">
          {/* Job Title */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold">Job Title</label>
            <input
              name="job_title"
              value={local.job_title}
              onChange={handleInput}
              className="p-2 border border-gray-200 bg-gray-50 rounded-md"
            />
          </div>

          {/* Company */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold">Company</label>
            <input
              name="company"
              value={local.company}
              onChange={handleInput}
              className="p-2 border border-gray-200 bg-gray-50 rounded-md"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold">Location</label>
            <input
              name="location"
              value={local.location}
              onChange={handleInput}
              className="p-2 border border-gray-200 bg-gray-50 rounded-md"
            />
          </div>

          {/* Dates */}
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-xs font-semibold">Start Date</label>
              <input
                name="start_date"
                type="date"
                value={local.start_date}
                onChange={handleInput}
                className="p-2 border border-gray-200 bg-gray-50 rounded-md"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-xs font-semibold">End Date</label>
              <input
                name="end_date"
                type="date"
                value={local.end_date}
                onChange={handleInput}
                className="p-2 border border-gray-200 bg-gray-50 rounded-md"
              />
            </div>
          </div>

          {/* Bullet Points */}
          <div>
            <label className="text-xs font-semibold">Bulletin Points</label>
            <EmploymentWordProcessor
              bullets={local.description}
              onChange={handleDescriptionChange}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
