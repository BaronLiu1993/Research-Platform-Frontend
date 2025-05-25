import { cookies } from "next/headers";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcomponents/ui/carousel";

import { Badge } from "@/shadcomponents/ui/badge";
import { Button } from "@/shadcomponents/ui/button";
import KanbanButton from "./kanbanbutton";

export default async function Recommendations() {
  const cookieStore = await cookies();
  const user_id = cookieStore.get("user_id");
  const data = await fetch("http://localhost:8080/match-professors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ student_id: user_id.value }),
  });
  const responses = await data.json();
  return (
    <>
      <div className="px-6 md:px-8 lg:px-10 pb-6 my-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
          className="font-sans relative"
        >
          <CarouselContent className="-ml-4 flex">
            {responses.matches.map((response, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <div className="shadow-sm border rounded-lg p-4 bg-white hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
                  <div className="flex justify-end -mt-2 -mr-2">
                    <KanbanButton
                      professor_id={response.professor_id}
                      professor_name={response.name}
                      professor_url={response.url}
                      professor_research_interests={response.research_interests}
                      professor_school={response.school}
                      professor_faculty={response.faculty}
                      professor_department={response.department}
                      user_id={user_id}
                    />
                  </div>
                  <div className="space-y-1.5 flex-grow mb-4">
                    <div>
                      <h2 className="text-sm text-purple-600 font-medium">
                        {response.name}
                      </h2>
                      <h1 className="text-md font-semibold text-gray-800">
                        {response.faculty}
                      </h1>
                      <h2 className="text-xs font-normal text-gray-500">
                        {response.school}
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {response.research_interests.map((interest, i) => (
                        <Badge
                          key={i}
                          className="text-xs bg-gray-100 text-gray-700 border border-gray-200 font-normal px-2 py-0.5"
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <Button
                      className="cursor-pointer text-white text-xs px-3 py-1.5 rounded-md"
                      size="sm"
                    >
                      <span className="text-xs mr-1">Apply</span>
                    </Button>
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
