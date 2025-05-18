"use client";

import React, { useMemo } from "react";

function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  return isNaN(d) 
    ? dateString 
    : d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

function _ExperiencePreview({ experience }) {
  if (!experience || experience.length === 0) return null;
  const items = useMemo(() => {
    return experience.map((exp) => ({
      ...exp,
      formattedDate: formatDate(exp.start_date),
      description: (exp.description || []).filter((pt) => pt.trim()),
    }));
  }, [experience]);

  return (
    <div className="mb-6">
      <h2 className="text-base font-bold uppercase tracking-wider mb-1 border-b border-gray-300 pb-1">
        Work Experience
      </h2>
      {items.map((exp, i) => (
        <div key={exp.id ?? i} className="mb-3">
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold">{exp.job_title || "Job Title"}</h3>
            <span className="text-sm">{exp.formattedDate}</span>
          </div>
          <div className="text-sm italic">{exp.company || "Company"}</div>
          <div className="text-sm">{exp.location}</div>
          {exp.description.length > 0 && (
            <ul className="list-disc pl-5 mt-1 text-sm">
              {exp.description.map((pt, j) => (
                <li key={j}>{pt}</li>
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
    prev.experience.every((e, i) => JSON.stringify(e) === JSON.stringify(next.experience[i]))
);
