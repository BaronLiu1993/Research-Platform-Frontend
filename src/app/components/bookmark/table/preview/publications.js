import { useEffect, useState } from "react";
import { fetchPublications } from "@/app/actions/publications/fetchPublications";
import { Badge } from "@/shadcomponents/ui/badge";
import { Calendar, Link2, Newspaper, Plus, PlusCircle } from "lucide-react";

export default function Publications({ professorId, onSelectTitle }) {
  const [publications, setPublications] = useState([]);
  useEffect(() => {
    const handleFetchPublications = async () => {
      const response = (await fetchPublications(professorId)) || [];
      console.log(response)
      const data = response?.message || [];
      setPublications(data);
    };
    handleFetchPublications();
  }, [professorId]);
  console.log(publications)
  return (
    <>
      <div className="font-main">
        <div className="pb-5">
          <div className="font-medium text-[black]">Relevant Publications</div>
          <div className="font-medium text-[#787774] text-xs">
            We Recommmend Clicking On Each Publication and{" "}
            <span className = "font-semibold text-[#448361]">Verifying</span> they fit with your email snippet.
          </div>
        </div>
        {publications?.map((data) => (
          <div className="font-main text-xs p-2 rounded-xs flex">
            <div className="space-y-1 flex items-center gap-2">
            <Plus className="h-8 w-8 flex-shrink-0 self-start mt-1 hover:bg-[#F7F6F3] rounded-xs p-2 cursor-pointer"
                onClick={() => onSelectTitle?.(data.title)}
            />
              <div className = "space-y-2">
                <div className="font-medium">{data.title}</div>
                <div className="flex gap-2">
                  <Badge className="rounded-xs text-[#529CCA] bg-[#E7F3F8]">
                    <Calendar />
                    {data.publication_date || "Not Defined"}
                  </Badge>
                  <Badge className="rounded-xs text-[#9F6B53] bg-[#F4EEEE]">
                    <Newspaper />
                    {data.publication_type || "No Date"}
                  </Badge>
                  <a href={data.link} target="_blank" rel="noopener noreferrer">
                    <Badge className="rounded-xs text-[#448361] bg-[#EDF3EC] inline-flex items-center gap-1">
                      <Link2 />
                      Open Publication
                    </Badge>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
