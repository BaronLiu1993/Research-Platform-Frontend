"use client";

import { useMemo } from "react";
import { useSidebar } from "@/shadcomponents/ui/sidebar";
import { CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shadcomponents/ui/carousel";
import SaveButton from "../bookmark/buttons/saveButton";
import { Badge } from "@/shadcomponents/ui/badge";
import { Tag } from "lucide-react";

function InterestBadges({ interests }) {
  if (!Array.isArray(interests) || interests.length === 0) return null;
  const MAX = 6;
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

export default function RecommendationsClient({
  matches,
  userId,
  access,
}) {
  const { open } = useSidebar(); 

  const itemBasisClass = open
    ? "basis-full sm:basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
    : "basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5";

  const loop = useMemo(() => matches.length > 5, [matches.length]);

  if (!matches?.length) {
    return (
      <div className="p-6 text-sm text-neutral-600 bg-slate-50 border border-slate-200 rounded-lg">
        No recommendations yet. Try updating your interests to see matched professors.
      </div>
    );
  }

  return (
    <>
      <CarouselContent className="-ml-3 md:-ml-4">
        {matches.map((response, index) => (
          <CarouselItem
            key={response.professor_id ?? index}
            className={`pl-3 md:pl-4 ${itemBasisClass}`}
          >
            <article className="rounded-xl p-4 bg-white hover:shadow-sm transition-shadow duration-200 flex flex-col h-full border border-gray-200 min-w-0">
              <div className="flex justify-end -mt-1 -mr-1">
                <SaveButton
                  professor_id={response.professor_id}
                  professor_name={response.name}
                  professor_url={response.url}
                  professor_research_interests={response.research_interests}
                  professor_school={response.school}
                  professor_faculty={response.faculty}
                  professor_department={response.department}
                  professor_email={response.email}
                  professor_labs={response.labs}
                  professor_lab_url={response.lab_url}
                  user_id={userId}
                  access={access}
                />
              </div>

              <div className="space-y-1.5 flex-grow mb-2 min-w-0">
                <div className="min-w-0">
                  <h2 className="text-xs font-medium truncate" title={response?.name}>
                    {response?.name ?? "Unknown Name"}
                  </h2>
                  <h1 className="text-sm font-semibold truncate" title={response?.school}>
                    {response?.school ?? "—"}
                  </h1>
                  <h2 className="text-[13px] text-neutral-700 truncate" title={response?.faculty}>
                    {response?.faculty ?? ""}
                  </h2>
                </div>

                <InterestBadges interests={response?.research_interests ?? []} />
              </div>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-0 z-10 ml-1 md:ml-2" />
      <CarouselNext className="absolute right-0 z-10 mr-1 md:mr-2" />
    </>
  );
}
