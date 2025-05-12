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

import { Book, Bookmark } from 'lucide-react';


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
  console.log(responses.matches);
  return (
    <>
      <div className = "px-12 pb-10">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-sm font-sans"
        >
          <CarouselContent>
            {responses.matches.map((response, index) => (
              <CarouselItem key={index} className = "">
                <div className="shadow-md border-1 rounded-md p-6 w-[20rem] overflow-hidden">
                  <div className = "border-b-1 pb-12 space-y-2">
                    <div className = "flex justify-end">
                        <Button className = "bg-gray-50 text-gray-500 border-1 hover:bg-gray-50 cursor-pointer">
                            <span className = "text-xs">Save</span>
                            <Bookmark />
                        </Button>
                    </div>
                    <h2 className="text-xs font-bold">
                        <span>{response.school} </span>
                    </h2>
                    <h1 className="text-xl font-semibold">{response.name}</h1>
                    <h2> {response.faculty}</h2>
                    <div className="grid grid-cols-2 space-y-2">
  {response.research_interests.map((response_interests, index_interests) => (
    <Badge key={index_interests}>{response_interests}</Badge>
  ))}
</div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
