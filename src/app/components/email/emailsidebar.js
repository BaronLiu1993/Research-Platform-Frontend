import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shadcomponents/ui/hover-card";
import { Badge } from "@/shadcomponents/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcomponents/ui/card";
import { Info } from "lucide-react";
import { Button } from "@/shadcomponents/ui/button";

export default function EmailSideBar({ publications }) {
  console.log(publications);
  return (
    <>
      <div className="border-l-1 p-7 space-y-5">
        <h2 className="flex space-x-2 font-semibold border-2 text-xs font-sans items-center px-2 bg-red-200 rounded-md text-red-500">
          <Info className="h-4 w-4" />
          <span className="">Please Cross Reference Publications</span>
        </h2>
        <Card>
          <CardTitle className="font-sans ">
            <CardDescription className="text-xs mx-5">
              <h1 className="text-sm flex space-x-2 text-black">
                Publications
              </h1>
              <h2 className="font-normal">
                Review Publications Added for Relevance and Accuracy
              </h2>
            </CardDescription>
          </CardTitle>

          <div className="space-y-4">
            {publications.map((pub) => (
              <CardContent
                key={pub.id}
                className="flex justify-center items-center gap-2 rounded-md p-3 border-1 bg-gray-100 mx-2"
              >
                <div className="space-y-2">
                  <div>
                    <p className="text-gray-500 text-xs">Research</p>
                    <h1 className="text-xs font-bold">{pub.title}</h1>
                  </div>
                  <div className="flex items-center space-x-2">
                    <HoverCard>
                      <HoverCardTrigger className="cursor-pointer">
                        <Badge className = "drop-shadow-2xl">Authors</Badge>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <div className="flex">
                          {pub.authors.map((author, index) => (
                            <div className="text-xs font-sans font-semibold" key={index}>
                              {author}
                            </div>
                          ))}
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                    <Badge >
                      <a href = {pub.link} target = "_blank"> Link </a>
                    </Badge>
                    <p className="text-xs text-gray-800">
                      {pub.publication_date}
                    </p>
                  </div>
                </div>
              </CardContent>
            ))}
          </div>
        </Card>

        <Card className="w-[13rem] ">
          <CardTitle className="font-sans ">
            <CardContent className="text-sm flex space-x-2">
              <div className="h-4 w-4 bg-red-500"></div>
              <span>Spell Check</span>
            </CardContent>
            <CardDescription className="text-xs ml-5">
              Review the provided English text and identify any spelling errors
            </CardDescription>
          </CardTitle>
        </Card>
        <Card className="w-[13rem] ">
          <CardTitle className="font-sans ">
            <CardContent className="text-sm flex space-x-2">
              <div className="h-4 w-4 bg-orange-500"></div>
              <span>Specificity</span>
            </CardContent>
            <CardDescription className="text-xs ml-5">
              Review the provided English text and identify any spelling errors
            </CardDescription>
          </CardTitle>
        </Card>
      </div>
    </>
  );
}
