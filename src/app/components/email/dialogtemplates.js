"use client";

import { useState } from "react";
import { emailPrompts } from "./prompts";

export default function DialogTemplate({ sendTemplate }) {
  const [selected, setSelected] = useState("");
  const handleTemplate = (data) => {
    setSelected(data)
    sendTemplate(data)
  }
  return (
    <div className="font-main flex gap-4">
      {emailPrompts.map((prompt, idx) => {
        const isActive = selected === prompt.body;
        return (
          <button
            key={idx}
            onClick={() => handleTemplate(prompt.body)}
            className={`w-[20rem] p-4 cursor-pointer flex flex-col text-left rounded-md border transition-all duration-200
              ${
                isActive
                  ? "border-blue-500 bg-blue-50 shadow-sm"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            <h1 className="font-semibold text-sm mb-1">
              {prompt.level}
            </h1>
            <p className="text-xs text-gray-600">{prompt.description}</p>
          </button>
        );
      })}
    </div>
  );
}
