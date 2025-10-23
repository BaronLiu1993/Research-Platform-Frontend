"use client";

import { useSidebar } from "@/shadcomponents/ui/sidebar";
import SaveButton from "./buttons/saveButton";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcomponents/ui/carousel";
import { Badge } from "@/shadcomponents/ui/badge";
import { Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/shadcomponents/ui/dialog";
import { Label } from "@/shadcomponents/ui/label";

import Link from "next/link";
import {
  Link2,
  University,
  BrainCircuit,
  Microscope,
  SchoolIcon,
} from "lucide-react";

function InterestBadges({ interests }) {
  if (!Array.isArray(interests) || interests.length === 0) return null;
  const MAX = 20;
  const shown = interests.slice(0, MAX);
  const remaining = Math.max(0, interests.length - shown.length);
  return (
    <div className="flex flex-wrap gap-1.5 mt-1">
      {shown.map((interest, i) => (
        <Badge
          key={`${interest}-${i}`}
          variant="secondary"
          className="text-[11px] leading-5 bg-slate-100 text-neutral-700 border border-slate-200 rounded-md px-2 py-0.5"
          title={interest}
        >
          <Tag className="h-3 w-3 mr-1" aria-hidden="true" />
          <span className="truncate max-w-[9rem] inline-block align-middle">
            {interest}
          </span>
        </Badge>
      ))}
      {remaining > 0 && (
        <Badge variant="outline" className="text-[11px] px-2 py-0.5">
          +{remaining} more
        </Badge>
      )}
    </div>
  );
}

export default function RecommendationsClient({ matches, access }) {
  const { open } = useSidebar();
  const itemBasisClass = open
    ? "basis-full sm:basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
    : "basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5";

  if (!matches?.length) {
    return (
      <div className="p-6 text-sm text-neutral-600 bg-slate-50 border border-slate-200 rounded-lg">
        No recommendations yet...
      </div>
    );
  }

  return (
    <>
      <CarouselContent className="-ml-3 md:-ml-4">
        {matches.map((response, index) => (
          <Dialog key={response.professor_id ?? index}>
            <CarouselItem className={`pl-3 md:pl-4 ${itemBasisClass}`}>
              <article className="rounded-xl p-4 bg-white hover:shadow-sm transition-shadow duration-200 flex flex-col border border-gray-200 min-w-0 h-[200px]">
                <div className="flex justify-end -mt-1 -mr-1">
                  <SaveButton
                    professorData={response}
                    isRecommendations
                    access={access}
                  />
                </div>

                <DialogTrigger asChild>
                  <div className="space-y-1.5 min-w-0 cursor-pointer">
                    <div className="min-w-0">
                      <h2
                        className="text-xs font-medium truncate"
                        title={response?.name}
                      >
                        {response?.name ?? "Unknown Name"}
                      </h2>
                      <h1
                        className="text-sm font-semibold truncate"
                        title={response?.school}
                      >
                        {response?.school ?? "—"}
                      </h1>
                      <h2
                        className="text-[13px] text-neutral-700 truncate"
                        title={response?.faculty}
                      >
                        {response?.faculty ?? ""}
                      </h2>
                    </div>
                    <InterestBadges
                      interests={response?.research_interests ?? []}
                    />
                  </div>
                </DialogTrigger>
              </article>
            </CarouselItem>

            <DialogContent className="sm:max-w-[640px] font-main p-12 bg-white shadow-xl rounded-lg max-h-[85vh] flex flex-col">
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  {response.name || "Professor"}
                </DialogTitle>

                <div className="flex flex-wrap gap-2">
                  {response.url && (
                    <Link
                      href={response.url}
                      target="_blank"
                      className="bg-sky-50 text-sky-700 rounded-md font-medium text-xs py-1.5 px-3 border border-sky-200/50 flex items-center hover:bg-sky-100 transition-colors"
                    >
                      <Link2 className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                      Profile
                    </Link>
                  )}

                  {response.lab_url && (
                    <Link
                      href={response.lab_url}
                      target="_blank"
                      className="bg-green-50 text-green-700 rounded-md font-medium text-xs py-1.5 px-3 border border-green-200/50 flex items-center hover:bg-green-100 transition-colors"
                    >
                      <SchoolIcon className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                      Visit Lab
                    </Link>
                  )}
                </div>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto space-y-4 py-4">
                <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                  <Label className="text-right font-medium text-gray-500 pt-1">
                    School
                  </Label>
                  <Badge className="bg-sky-50 text-sky-700 font-medium text-xs py-1.5 px-2.5 border border-sky-200/50 flex items-start text-left w-fit">
                    <University className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span className="break-words">
                      {response.school || "—"}
                    </span>
                  </Badge>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                  <Label className="text-right font-medium text-gray-500 pt-1">
                    Department
                  </Label>
                  <Badge className="bg-purple-50 text-purple-700 font-medium text-xs py-1.5 px-2.5 border border-purple-200/50 flex items-start text-left w-fit">
                    <BrainCircuit className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span className="break-words">
                      {response.department || "—"}
                    </span>
                  </Badge>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                  <Label className="text-right font-medium text-gray-500 pt-1">
                    Faculty
                  </Label>
                  <Badge className="bg-green-50 text-green-700 font-medium text-xs py-1.5 px-2.5 border border-green-200/50 flex items-start text-left w-fit">
                    <Microscope className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span className="break-words">
                      {response.faculty || "—"}
                    </span>
                  </Badge>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                  <Label className="text-right font-medium text-gray-500 pt-1">
                    Interests
                  </Label>
                  <div className="flex flex-wrap gap-1.5">
                    {(response.research_interests || []).length ? (
                      (response.research_interests || [])
                        .slice(0, 40)
                        .map((interest, i) => (
                          <Badge
                            key={`${interest}-${i}`}
                            variant="secondary"
                            className="text-xs bg-gray-50 text-gray-700 border-gray-200/80 px-2 py-0.5"
                            title={interest}
                          >
                            <span className="truncate max-w-[10rem] inline-block align-middle">
                              {interest}
                            </span>
                          </Badge>
                        ))
                    ) : (
                      <p className="text-gray-400 text-xs">—</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                  <Label className="text-right font-medium text-gray-500 pt-1">
                    Lab Affiliation
                  </Label>
                  <Badge className="bg-sky-50 text-sky-700 font-medium text-xs py-1.5 px-2.5 border border-sky-200/50 flex items-start text-left w-fit">
                    <span className="break-words">
                      {response.labs || "No Lab Affiliation"}
                    </span>
                  </Badge>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-0 z-10 ml-1 md:ml-2" />
      <CarouselNext className="absolute right-0 z-10 mr-1 md:mr-2" />
    </>
  );
}
