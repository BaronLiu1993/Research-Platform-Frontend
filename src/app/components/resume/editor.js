"use client";

import { useState } from "react";
import Employment from "./items/employment/employment";
import Projects from "./items/project/projects";
import Contact from "./items/contact/contact";
import PersonalInfo from "./items/personal/personalinfo";
import ResumeView from "./resumeview";
import Skills from "./items/skills/skills";
import Progress from "./progress";
import PageTabs from "./pagetabs";

import { Button } from "@/shadcomponents/ui/button";

export default function Editor({
  student_experience,
  student_projects,
  student_personal_details,
  student_contact,
}) {
  const pages = [
    {
      component: <Employment experience_data={student_experience} />,
      name: "Employment",
    },
    {
      component: <Projects project_data={student_projects} />,
      name: "Projects",
    },
    { component: <Contact contact_data={student_contact} />, name: "Contact" },
    {
      component: (
        <PersonalInfo personal_details_data={student_personal_details} />
      ),
      name: "Personal Info",
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
                    className="text-xs h-6 w-4 bg-purple-400 font-bold cursor-pointer"
                  >
                    {"<-"}
                  </Button>
                  <Button
                    onClick={nextPage}
                    disabled={currentPage === pages.length - 1}
                    className="text-xs h-6 w-4 bg-purple-400 font-bold cursor-pointer"
                  >
                    {"->"}
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
    </>
  );
}
