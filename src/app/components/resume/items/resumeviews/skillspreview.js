export function SkillsPreview({ skills }) {
  return (
    <div className="font-serif w-full flex-col flex">
      <h1 className="text-[16px] font-semibold tracking-wide uppercase border-b border-gray-400">
        Skills
      </h1>
      <div className = "text-[10px] mt-2">
      {skills.join(", ")}
      </div>
    </div>
  );
}
