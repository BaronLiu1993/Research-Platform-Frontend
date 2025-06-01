import { cookies } from "next/headers";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcomponents/ui/carousel";

import { Badge } from "@/shadcomponents/ui/badge";
import KanbanButton from "./kanbanbutton";
import ApplyButton from "./applybutton";
import { Tag } from "lucide-react";

export default async function Recommendations() {
  const cookieStore = await cookies();
  const user_id = cookieStore.get("user_id");
  const data = await fetch("http://localhost:8080/match-professors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ student_id: user_id.value }),
    next: { revalidate: 3600 },
  });

  const responses = await data.json();
  return (
    <>
      <div className="pb-6 w-[55rem]">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
          className="font-main relative"
        >
          <CarouselContent className="-ml-4 flex">
            {responses.matches.map((response, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <div className="rounded-xs p-4 bg-white hover:shadow-sm transition-shadow duration-200 flex flex-col h-full border-1 border-gray-300">
                  <div className="flex justify-end -mt-2 -mr-2">
                    <KanbanButton
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
                      user_id={user_id.value}
                    />
                  </div>
                  <div className="space-y-1.5 flex-grow mb-4">
                    <div>
                      <h2 className="text-xs font-medium">{response.name}</h2>
                      <h1 className="text-md font-semibold">
                        <span> {response.school}</span>
                      </h1>
                      <h2 className="text-[13px] text-neutral-700">{response.faculty}</h2>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {response.research_interests.map((interest, i) => (
                        <Badge
                          key={i}
                          className="text-xs bg-[#eeeeee] rounded-xs text-neutral-700 px-2 py-0.5"
                        >
                          <Tag />
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex pt-4 border-t border-gray-300">
                    <ApplyButton
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
                      user_id={user_id.value}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 z-10 ml-2" />
          <CarouselNext className="absolute right-0 z-10 mr-2" />
        </Carousel>
      </div>
    </>
  );
}
