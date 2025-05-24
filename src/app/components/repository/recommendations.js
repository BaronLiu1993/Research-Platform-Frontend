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
      <div className="px-18 pb-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
          className="font-sans"
        >
          <CarouselContent className="gap-1 flex">
            {responses.matches.map((response, index) => (
              <CarouselItem
                key={index}
                className=" flex-shrink-0 sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
              >
                <div className="shadow-md max-w-[20rem] border rounded-md p-3 h-full flex flex-col justify-between space-y-10">
                  <div className="p-2">
                    <div className="flex justify-end ">
                      <KanbanButton
                        professor_id={response.professor_id}
                        professor_name={response.name}
                        professor_url={response.url}
                        professor_research_interests={
                          response.research_interests
                        }
                        professor_school={response.school}
                        professor_faculty={response.faculty}
                        professor_department={response.department}
                        user_id={user_id}
                      />
                    </div>
                    <div className = "space-y-2">
                      <div>
                        <h2 className="text-sm text-purple-500 font-semibold">
                          {response.name}
                        </h2>
                        <h1 className="text-md font-semibold">
                          {response.faculty}
                        </h1>
                        <h2 className="text-xs font-semibold text-gray-600">
                          {response.school}
                        </h2>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {response.research_interests.map((interest, i) => (
                          <Badge
                            key={i}
                            className="text-xs bg-gray-200 text-black"
                          >
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end border-t-1 pt-5">
                    <Button
                      className="cursor-pointer hover:bg-gray-100"
                      size="sm"
                    >
                      <span className="text-xs mr-1">Apply</span>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex mt-4 px-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </>
  );
}
