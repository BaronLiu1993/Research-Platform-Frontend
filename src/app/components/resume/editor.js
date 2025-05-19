"use client";

import { useState } from "react";
import Employment from "./items/employment/employment";
import Projects from "./items/project/projects";
import Contact from "./items/contact/contact";
import PersonalInfo from "./items/personal/personalinfo";
import Skills from "./items/skills/skills";
import PageTabs from "./pagetabs";
import ResumeDisplayWrapper from "./resumeview";

import { Button } from "@/shadcomponents/ui/button";

import { ArrowLeft, ArrowRight } from "lucide-react";

const initialResumeState = {
  name: "Your Name",
  contact_information: {
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    website: "",
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  personal_details: { name: "Your Name" },
};

export default function Editor({
  student_experience,
  student_projects,
  student_personal_details,
  student_contact,
}) {
  const [resumeData, setResumeData] = useState(() => {
    return {
      ...initialResumeState,
      projects: student_projects || initialResumeState.projects,
      contact_information:
        student_contact || initialResumeState.contact_information,
      experience: student_experience || initialResumeState.experience,
    };
  });

  console.log(resumeData.contact_information)

  const handleExperienceUpdate = (updatedExperienceArray) => {
    setResumeData((prev) => ({
      ...prev,
      experience: updatedExperienceArray,
    }));
  };

  const handleProjectUpdate = (updatedProjectsArray) => {
    setResumeData((prev) => ({
      ...prev,
      projects: updatedProjectsArray,
    }));
  };

  const handleContactUpdate = (updatedContactsArray) => {
    setResumeData((prev) => ({
      ...prev,
      contact: updatedContactsArray,
    }));
  };

  const pages = [
    {
      component: (
        <Employment
          experienceArray={resumeData.experience}
          onExperienceArrayChange={handleExperienceUpdate}
        />
      ),
      name: "Employment",
    },
    {
      component: (
        <Projects
          projectArray={resumeData.projects}
          onProjectsArrayChange={handleProjectUpdate}
        />
      ),
      name: "Projects",
    },
    {
      component: (
        <Contact
          contactArray={resumeData.contact_information}
          onContactArrayChange={handleContactUpdate}
        />
      ),
      name: "Contact",
    },
    {
      component: (
        <PersonalInfo personal_details_data={student_personal_details} />
      ),
      name: "Info",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1 < pages.length ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  return (
    <>
      <div className="flex border-1">
        <div className=" max-w-[40rem] overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {pages.map((page, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4 font-sans">
                <div className="flex justify-between items-center mt-6 mx-6">
                  <div className="space-x-2 flex">
                    <Button
                      onClick={prevPage}
                      disabled={currentPage === 0}
                      className="text-xs h-6 w-4 bg-purple-400 hover:bg-purple-300 font-bold cursor-pointer"
                    >
                      <ArrowLeft />
                    </Button>
                    <Button
                      onClick={nextPage}
                      disabled={currentPage === pages.length - 1}
                      className="text-xs h-6 w-4 bg-purple-400 hover:bg-purple-300 font-bold cursor-pointer"
                    >
                      <ArrowRight />
                    </Button>
                  </div>
                  <PageTabs
                    pages={pages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
                <div>{page.component}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <ResumeDisplayWrapper resume={resumeData} />
        </div>
      </div>
    </>
  );
}
