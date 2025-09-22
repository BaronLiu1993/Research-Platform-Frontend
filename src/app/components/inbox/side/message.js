import { Separator } from "@/shadcomponents/ui/separator";
import Display from "../editor/text/display";

export default function Message({ data }) {
  return (
    <>
      <div className="font-main">
        <div className="px-6 py-4 space-y-4">
          <Separator />
        </div>
        <div className="flex items-center justify-between px-6">
          <span className="text-xs font-semibold text-black">{`From ${data.from.address} <${data.from.name} >`}</span>
          <div className="flex items-center gap-5">
            <span className="text-xs text-light">
              {new Date(data.date).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </span>
          </div>
        </div>
        <div className="font px-6 text-xs">{`To ${data.to.name} <${data.to.address}>`}</div>
        <div className="text-black px-6 py-6 tracking-wide text-xs flex flex-col gap-2">
          <Display emailContent={data.body} />
        </div>
      </div>
    </>
  );
}
