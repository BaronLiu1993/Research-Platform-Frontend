"use client";

import React from "react";

// Helper function
function formatDateRange(start, end) {
  const format = (d) =>
    d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "";
  const startDate = format(start);
  const endDate = end ? format(end) : "Present";
  if (!startDate && endDate === "Present" && !end) return "";
  if (!startDate) return endDate;
  return `${startDate} – ${endDate}`;
}

export function ProjectsPreview({ projects }) {
  if (!projects?.length) return null;

  return (
    <div className="projects-preview-container w-fit font-sans text-gray-800">
      <h2 className="text-xs font-bold tracking-wider uppercase text-black border-b border-black pb-0.5 mb-2.5">
        PROJECTS
      </h2>

      {projects.map((p, index) => {
        const projectName = p.project_name || p.name || "Untitled Project";
        const techStack = p.tech_stack || "";
        const projectDate = formatDateRange(p.start_date, p.end_date) || p.date_range || "";

        let techAndDateString = "";
        if (techStack) techAndDateString += ` | ${techStack}`;
        if (projectDate)
          techAndDateString += (techStack ? "  " : (projectName ? "  " : "")) + projectDate;

        const bulletsInput = p.bullets?.length ? p.bullets : p.description;
        const bullets = Array.isArray(bulletsInput)
          ? bulletsInput
          : typeof bulletsInput === "string"
          ? [bulletsInput]
          : [];

        const filteredBullets = bullets.filter((b) => typeof b === "string" && b.trim());

        return (
          <div key={index} className="mb-3">
            <p className="flex justify-between items-baseline text-xs leading-normal text-black mb-0.5">
              <span className="font-bold">{projectName}</span>
              {techAndDateString && (
                <span className="text-black">{techAndDateString.trim()}</span>
              )}
            </p>

            {filteredBullets.length > 0 && (
              <ul className="list-disc pl-5 mt-0 mb-3 text-xs text-gray-900">
                {filteredBullets.map((b, i) => (
                  <li key={i} className="mb-0.5 pl-0.5 leading-snug m-0">
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
