"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";

import Builder from "../components/resume/builder";
import getProfessorData from "./resumeapi";
//Scans current resume for all keywords and then builds new resume with latex and the format given

import { Button } from "@/shadcomponents/ui/button";

import { Pen } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shadcomponents/ui/collapsible";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcomponents/ui/popover";

import { Badge } from "@/shadcomponents/ui/badge";

import { ChevronsUpDown } from "lucide-react";

import { Clipboard } from "lucide-react";

export default function resume({}) {
  const searchParams = useSearchParams();
  const search = searchParams.get("url");
  const router = useRouter();
  const [data, setData] = useState({});
  const [isInformationOpen, setIsInformationOpen] = useState(false);
  const [isInterestsOpen, setIsInterestsOpen] = useState(false);
  const [researchInterests, setResearchInterests] = useState({});
  const [professorEmail, setProfessorEmail] = useState({});
  const [professorName, setProfessorName] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const professor_url = search;
        const response = await getProfessorData({ url: professor_url });
        setData(response);
        setProfessorName(response.name);
        setProfessorEmail(response.email);
        setResearchInterests(response.research_interests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [search]);

  const handleSendDataToEmail = (url) => {
    router.push(
      `/email?url=${encodeURIComponent(
        url
      )}&professor_interests=${encodeURIComponent(
        researchInterests
      )}&name=${encodeURIComponent(professorName)}&email=${encodeURIComponent(
        professorEmail
      )}`
    );
  };

  // Save a copy of the resume and then it will allow user to name it and that will be there resume for this one

  return (
    <>
      <Navbar />
      <div className="flex items-start space-x-2 p-2 select-none bg-gray-100">
        <div className="flex flex-col w-[20rem] bg-white p-4 rounded-xl shadow-md font-sans text-sm">
          {/* Information Collapsible */}
          <Collapsible
            open={isInformationOpen}
            onOpenChange={setIsInformationOpen}
            className="space-y-1"
          >
            <div className="flex items-center justify-between bg-gray-100 p-1 rounded-md">
              <Badge className="">
                <Clipboard />
                Researcher Info
              </Badge>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                  <ChevronsUpDown className="h-4 w-4 text-gray-500" />
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="space-y-1">
              <div className="px-3 py-2 rounded-md cursor-pointer">
                {data.email}
              </div>
              <div className="px-3 py-2 rounded-md cursor-pointer">
                {data.name}
              </div>
              <div className="px-3 py-2 rounded-md cursor-pointer">
                {data.number}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Research Interests Collapsible */}
          <Collapsible
            open={isInterestsOpen}
            onOpenChange={setIsInterestsOpen}
            className="space-y-1 mt-4 font-sans"
          >
            <p className="border-1 p-1 text-xs rounded-md bg-purple-100 flex items-center border-purple-200">
              <Pen className="w-6 h-6 p-1 text-purple-500" />
              <span className="text-purple-500">
                Learn More About Their Research
              </span>
            </p>
            <div className="flex items-center justify-between bg-gray-100 p-1 rounded-md">
              <Badge className="">
                <Clipboard />
                Research Interests
              </Badge>
              <CollapsibleTrigger asChild className="">
                <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="space-y-1">
              {data.research_interests?.map((keyword, index) => (
                <Popover key={index}>
                  <PopoverTrigger asChild>
                    <div className="cursor-pointer rounded-md px-2 py-1 text-sm font-sans bg-gray-100 hover:bg-gray-200 transition-colors">
                      {keyword}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-fit max-w-xs p-4 space-y-3">
                    <h1 className="text-base font-semibold font-sans">
                      Learn More
                    </h1>
                    <p className="text-xs font-light text-muted-foreground font-san leading-relaxed">
                      Explore the professor’s research focus. You can query
                      topics, view summaries, and dive deeper into specific
                      areas of interest.
                    </p>
                    <Badge className="text-sm font-sans cursor-pointer">
                      Query Research
                    </Badge>
                  </PopoverContent>
                </Popover>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
        <Builder researchInterests={data.research_interests} />
      </div>
      <button onClick={handleSendDataToEmail}>Email Page</button>
    </>
  );
}
