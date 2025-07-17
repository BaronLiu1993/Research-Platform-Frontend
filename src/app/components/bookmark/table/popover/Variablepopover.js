import { FileJson2, RectangleEllipsis } from "lucide-react";

export default function VariablePopover() {
  return (
    <>
      <div className="text-xs flex flex-col  gap-2">
        <div className="text-xs flex items-centerfont-medium text-[#787774] gap-2">
          Set a Variable
        </div>
        <div>
          <div className="flex items-center gap-2">
            <FileJson2 className="text-[#787774] p-1 h-7 w-7" />
            <input
              className="font-main text-xs p-2 border-1 my-2 rounded-xs w-full"
              placeholder="Name"
            />
          </div>
          <div className="flex items-center gap-2">
            <RectangleEllipsis className="text-[#787774] p-1 h-7 w-7" />
            <input
              className="font-main text-xs p-2 border-1 my-2 rounded-xs w-full"
              placeholder="Value"
            />
          </div>
        </div>
        <button className="h-[1.7rem] w-fit p-1 text-[#448361] bg-[#EDF3EC] cursor-pointer">
          Create Variable
        </button>
      </div>
    </>
  );
}
