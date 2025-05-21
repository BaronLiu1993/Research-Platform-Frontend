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
    <div className="projects-preview-container w-full font-serif  text-gray-800">
      <h2 className="text-[16px] font-bold tracking-wider uppercase text-black border-b border-black">
        PROJECTS
      </h2>

      {projects.map((p, index) => {
        const projectName = p.project_name || p.name || "Untitled Project";
        const techStack = p.achievements || "";
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
          <div key={index} className="font-serif">
            <div className="flex items-baseline text-[10px] leading-normal text-black">
              <p>
                <span className="font-bold">{projectName}</span>
              </p>
              {techAndDateString && (
                <span className="italic">{techAndDateString.trim()}</span>
              )}
            </div>

            {filteredBullets.length > 0 && (
              <ul className="list-disc pl-4 text-[9px] text-xs text-gray-900">
                {filteredBullets.map((b, i) => (
                  <li key={i} className="leading-snug m-0">
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
