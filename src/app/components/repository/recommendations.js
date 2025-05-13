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

import { Book, Bookmark } from "lucide-react";

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
          <div className="shadow-md max-w-[20rem] border rounded-md p-3 h-full flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex justify-end">
                <Button
                  className="bg-gray-50 text-gray-500 border hover:bg-gray-100"
                  variant="outline"
                  size="sm"
                >
                  <span className="text-xs mr-1">Save</span>
                  <Bookmark className="w-3 h-3" />
                </Button>
              </div>
              <h2 className="text-xs text-purple-500 font-semibold">
                {response.school}
              </h2>
              <h1 className="text-sm font-medium">{response.name}</h1>
              <h2 className="text-xs text-gray-600">
                {response.faculty}
              </h2>
              <div className="flex flex-wrap gap-1">
                {response.research_interests.map((interest, i) => (
                  <Badge key={i} className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                className="bg-gray-50 text-gray-500 border hover:bg-gray-100"
                variant="outline"
                size="sm"
              >
                <span className="text-xs mr-1">Apply</span>
                <Bookmark className="w-3 h-3" />
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
