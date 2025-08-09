import { Badge } from "@/shadcomponents/ui/badge";
import { Button } from "@/shadcomponents/ui/button";
import { Separator } from "@/shadcomponents/ui/separator";
import { Forward, Reply } from "lucide-react";
import Display from "../editor/text/display";

export default function Message({ data, email, engagementData, seenData }) {
  console.log(data)
  return (
    <>
      <div className="font-main">
        <div className="px-6 py-4 space-y-4">

          <Separator />
        </div>
        <div className="flex items-center justify-between px-6">
          <span className="text-xs font-semibold text-black">{`From ${data.from.address}`}</span>
          <div className="flex items-center gap-5">
            <span className="text-xs text-black font-semibold">
              {new Date(data.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
        <div className="font px-6 text-xs">{`To ${data.to.name} <${data.to.address}>`}</div>
        <div className="text-black px-6 py-6 tracking-wide text-xs flex flex-col gap-2">
          <Display emailContent = {data.body} />
        </div>
      </div>
    </>
  );
}
