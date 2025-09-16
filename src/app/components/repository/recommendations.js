import { cookies } from "next/headers";
import SaveButton from "../bookmark/buttons/saveButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcomponents/ui/carousel";
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

export default async function Recommendations() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  const access = cookieStore.get("access_token")?.value;

  let responses = { matches: [] };
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080"}/repository/match-professors?userId=${encodeURIComponent(
        userId ?? ""
      )}`,
      {
        method: "GET",
        headers: access ? { Authorization: `Bearer ${access}` } : {},
        next: { revalidate: 3600 },
        cache: "force-cache",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch matches:", res.status, res.statusText);
    } else {
      responses = await res.json();
    }
  } catch (e) {
    console.error("Error fetching matches", e);
  }

  const matches = Array.isArray(responses?.matches)
    ? responses.matches
    : [];

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6">
      <div className="pb-6">
        <Carousel
          opts={{ align: "start", loop: matches.length > 5, slidesToScroll: 1 }}
          className="font-main relative"
        >
          {matches.length === 0 ? (
            <div className="p-6 text-sm text-neutral-600 bg-slate-50 border border-slate-200 rounded-lg">
              No recommendations yet. Try updating your interests to see matched professors.
            </div>
          ) : (
            <>
              <CarouselContent className="-ml-3 md:-ml-4">
                {matches.map((response, index) => (
                  <CarouselItem
                    key={response.professor_id ?? index}
                    className="pl-3 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
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
          )}
        </Carousel>
      </div>
    </div>
  );
}
