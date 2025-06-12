import { Badge } from "@/shadcomponents/ui/badge";
import { Button } from "@/shadcomponents/ui/button";
import { Separator } from "@/shadcomponents/ui/separator";
import { Forward, Reply } from "lucide-react";

export default function Message({ data, email, engagementData }) {
  return (
    <>
      <div className="font-main">
        <div className="px-6 py-4 space-y-4">
          <div>
            <div className="space-x-2 flex flex-col gap-2">
              <span className="text-md font-semibold text-black">
              {email === data.to.address ? <h1 className = "text-blue-500">Student </h1>: <h1 className = "text-purple-500">Professor</h1>} {data.subject}
              </span>
              <div className="space-x-2 flex">
                <div>
                  {email !== data.to.address && (
                    <Badge className="bg-green-500 text-[10px] rounded-xs">
                      RECEIVED
                    </Badge>
                  )}
                </div>
                <div>
                  {email === data.to.address && (
                    <div>
                      {engagementData.opened ? (
                        <Badge className="text-[10px] bg-green-500 rounded-xs">
                          ENGAGED
                        </Badge>
                      ) : (
                        <Badge className="text-[10px] bg-orange-500 rounded-xs">
                          NOT SEEN
                        </Badge>
                      )}
                      
                    </div>
                  )}
                  
                </div>
                <div>
                  {email === data.to.address && (
                    <div>
                      {engagementData.opened ? (
                        <Badge className="text-[10px] bg-purple-700 rounded-xs">
                          FOLLOW UP
                        </Badge>
                      ) : (
                        <Badge className="text-[10px] bg-orange-500 rounded-xs">
                          WAIT...
                        </Badge>
                      )}
                      
                    </div>
                  )}
                  
                </div>

                {data.labels?.map((label, idx) => (
                  <div key={idx}>
                    <Badge className="text-[10px] rounded-xs text-[#979A9B] bg-[#F1F1EF]">
                      {label}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Separator />
        </div>
        <div className="flex items-center justify-between px-6">
          <span className="text-xs font-semibold text-black">{`From ${data.from.name}`}</span>
          <div className="flex items-center gap-5">
            <div className="flex gap-2">
              <Reply className="h-6 w-6 text-[#979A9B] hover:bg-[#F1F1EF] cursor-pointer" />
              <Forward className="h-6 w-6 text-[#979A9B] hover:bg-[#F1F1EF] cursor-pointer" />
            </div>
            <span className="text-xs text-black font-semibold">
              {new Date(data.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
        <div className="font px-6 text-xs">{`To ${data.to.name} <${data.to.address}>`}</div>
        <div className="text-black px-6 py-6 tracking-wide text-xs">
          {data.body}
        </div>
        <div className="flex gap-4 px-6">
          <Button variant="outline" className="text-xs">
            Reply
            <Reply />
          </Button>
          <Button variant="outline" className="text-xs">
            Forward
            <Forward />
          </Button>
        </div>
      </div>
    </>
  );
}
