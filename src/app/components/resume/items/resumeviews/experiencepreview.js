"use client";

import React, { useMemo } from "react";

function formatDateRange(start, end) {
  const format = (d) =>
    d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "";
  return `${format(start)} – ${end ? format(end) : "Present"}`;
}

function _ExperiencePreview({ experience }) {
  if (!experience || experience.length === 0) return null;

  const items = useMemo(() => {
    return experience.map((exp) => ({
      ...exp,
      formattedDateRange: formatDateRange(exp.start_date, exp.end_date),
      description: (exp.description || []).filter((pt) => pt.trim()),
    }));
  }, [experience]);

  return (
    <div className = "w-fit">
      <h2 className="text-[10px] font-semibold tracking-wide uppercase border-b border-gray-400">
        Experience
      </h2>
      {items.map((exp, i) => (
        <div key={exp.id ?? i} className="mb-4">
          <div className="flex justify-between items-baseline">
            <h3 className="text-[7px] font-semibold text-gray-900">
              {exp.job_title || "Job Title"}
            </h3>
            <span className="text-[7px] font-bold text-gray-700 font-mono">
              {exp.formattedDateRange}
            </span>
          </div>
          <div className="flex justify-between text-[7px] italic text-gray-700">
            <div>{exp.company || "Company"}</div>
            <div className="not-italic text-gray-600">{exp.location}</div>
          </div>
          {exp.description.length > 0 && (
            <ul className="list-disc list-inside text-[7px] text-gray-900 leading-tight">
              {exp.description.map((pt, j) => (
                <li key={j} className="m-0 p-0">{pt}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export const ExperiencePreview = React.memo(
  _ExperiencePreview,
  (prev, next) =>
    prev.experience.length === next.experience.length &&
    prev.experience.every(
      (e, i) => JSON.stringify(e) === JSON.stringify(next.experience[i])
    )
);
