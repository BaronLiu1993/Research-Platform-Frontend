/*
Deprecated Component, but I will Save for the Future If Needed 
*/

import { Input } from "@/shadcomponents/ui/input";
import {
  AlignLeft,
  Blocks,
  FileText,
  GraduationCap,
  Heart,
  Link,
  MailPlus,
  Quote,
  Send,
  Sparkle,
  WholeWord,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/shadcomponents/ui/select";

//Instead this will be for creating a new variable the AI is too complex and 
//Impractical in all honesty so Remove do not use it, maybe save in the future if there is demand
export default function AIcontext({}) {
  return (
    <>
      <div className="space-y-7 pb-6">
        <div className="font-main text-black font-medium text-[15px] px-4">
          Edit Snippet Variable
        </div>
        <div className="flex flex-col gap-4">
          <div className="px-4 space-y-2">
            <div className="font-medium text-xs">Variable Name</div>
            <div className="flex gap-4">
              <WholeWord className="h-7 w-7 p-1 rounded-sm border-1 text-[#529CCA]" />
              <Select className="h-7">
                <SelectTrigger className="h-7 rounded-xs"></SelectTrigger>
                <SelectContent>
                  <SelectGroup className="font-main">
                    <SelectItem value="Motivation">AIMotivation</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="px-4 space-y-2">
            <div className="font-medium text-xs">Variable Purpose</div>
            <div className="flex gap-4">
              <Blocks className="h-7 w-7 p-1 rounded-sm border-1 text-[#4DAB9A]" />
              <Select className="h-7 font-main text-xs">
                <SelectTrigger className="h-7 rounded-xs">
                  <SelectValue placeholder="Select a Purpose..." />
                </SelectTrigger>
                <SelectContent className="rounded-xs">
                  <SelectContent>
                    <SelectGroup className="font-main">
                      <SelectItem value="Motivation">
                        Motivation for Reaching Out
                      </SelectItem>
                      <SelectItem value="Value_Proposition">
                        Value Proposition
                      </SelectItem>
                      <SelectItem value="Personal_Experience">
                        Connect Personal Experience
                      </SelectItem>
                      <SelectItem value="Personal_Experience">
                        Publication Connection
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
