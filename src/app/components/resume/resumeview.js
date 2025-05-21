"use client";

import React from "react";
import { NameHeader } from "./items/resumeviews/nameheader";
import { ExperiencePreview } from "./items/resumeviews/experiencepreview";
import { ProjectsPreview } from "./items/resumeviews/projectspreview";
import { ContactPreview } from "./items/resumeviews/contactspreview";
import { EducationPreview } from "./items/resumeviews/educationpreview";
import { SkillsPreview } from "./items/resumeviews/skillspreview";
import { Badge } from "@/shadcomponents/ui/badge";
import { Check, Hand } from "lucide-react";

function ResumeDisplayWrapperInner({ resume }) {
  return (
    <>
      <div className="border-l-1">
        <div className="p-4">
          <div className="mb-5 mx-5 space-y-2">
            <div className="flex space-x-2">
              <h1 className="font-sans text-purple-800 font-light">
                Resume Preview
              </h1>
              <Badge className="bg-gray-700">
                <Check />
                Auto Saved
              </Badge>
            </div>
          </div>
          <p className="border-1 p-1 text-xs rounded-md bg-purple-100 flex items-center border-purple-200">
            <Hand className="w-6 h-6 p-1 text-purple-500" />
            <span className="text-purple-500">Click Preview to Expand</span>
          </p>
        </div>
        <div className="prose-mirror-editor font-sans text-[6pt] p-10 m-3 border-1 rounded-md leading-normal bg-white ">
          <NameHeader
            first_name={resume.personal_information[0].first_name}
            last_name={resume.personal_information[0].last_name}
          />
          <ContactPreview contact={resume.contact_information} />
          <EducationPreview
            school={resume.personal_information[0].school}
            degree={resume.personal_information[0].degree}
            start_date={resume.personal_information[0].start_date}
            end_date={resume.personal_information[0].end_date}
            gpa={resume.personal_information[0].gpa}
            relevant_course={resume.personal_information[0].relevant_course}
            awards={resume.personal_information[0].awards}
          />
          <ExperiencePreview experience={resume.experience} />
          <ProjectsPreview projects={resume.projects} />
          <SkillsPreview skills={resume.personal_information[0].skills} />
        </div>
      </div>
    </>
  );
}

const ResumeDisplayWrapper = React.memo(ResumeDisplayWrapperInner, (a, b) => {
  return (
    a.resume.experience === b.resume.experience &&
    a.resume.projects === b.resume.projects &&
    a.resume.contact_information === b.resume.contact_information &&
    a.resume.personal_information === b.resume.personal_information
  );
});

export default ResumeDisplayWrapper;
