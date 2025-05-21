export function EducationPreview({
  school,
  degree,
  gpa,
  start_date,
  end_date,
  relevant_course,
  awards
}) {
  return (
    <div className="font-serif w-full flex-col flex">
      <h1 className="text-[16px] font-semibold tracking-wide uppercase border-b border-gray-400">
        EDUCATION
      </h1>
      <div>
        <div className="flex justify-between items-baseline">
          <h3 className="text-[10px] font-semibold text-gray-900">
            {school || "University of Something"}
          </h3>
          <div className="flex justify-center items-center space-x-2">
            <span className="text-[10px] text-gray-700">
              {degree || "Bachelor of Computer Science"}
            </span>
          </div>
        </div>
        <div className="flex justify-between italic text-gray-700">
          <div className="text-[10px] font-light w-[20rem]">
            <span className = "text-[10px] font-semibold text-gray-900">Awards: </span> 

            {relevant_course.join(", ") || "Courses"}
          </div>
          <div className = "flex flex-col items-end">
            <div className="not-italic text-gray-600 ">
              {start_date} - {end_date}
            </div>
            <div>  {gpa === 0 ? <p> </p> : <p>GPA: {gpa}</p>}</div>
          </div>
        </div>
        <div>
            <span className = "text-[10px] font-semibold text-gray-900">Awards: </span> 
            <span className="text-[10px] font-light w-[20rem] text-gray-700 italic">
            {awards.join(', ')}
            </span>
        </div>
      </div>
    </div>
  );
}
