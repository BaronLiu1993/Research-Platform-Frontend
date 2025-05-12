import { cookies } from "next/headers";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcomponents/ui/carousel";

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
      <div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-sm font-sans"
        >
          <CarouselContent>
            {responses.matches.map((response, index) => (
              <CarouselItem key={index}>
                <div className = "shadow-sm border-1 rounded-md">
                  <h1>{response.name}</h1>
                  <div>
                     {response.research_interests.map((response_interests, index_interests) => (
                        <div key = {index_interests}>
                            {response_interests}
                        </div>
                     ))}
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
