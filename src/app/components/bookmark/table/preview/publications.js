import { useEffect, useState } from "react";
import { fetchPublications } from "@/app/actions/publications/fetchPublications";
import { Badge } from "@/shadcomponents/ui/badge";
import { Calendar, Link2, Plus } from "lucide-react";
import Link from "next/link";

export default function Publications({ professorId, onSelectTitle }) {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const loadPublications = async () => {
      const response = (await fetchPublications(professorId, access)) || [];
      const data = response?.message?.data || [];
      setPublications(data);
    };
    loadPublications();
  }, [professorId]);

  const handleSelect = (title) => {
    onSelectTitle?.(title);
  };

  return (
    <div className="font-main">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-black">Relevant Publications</h2>
        <p className="text-xs text-muted-foreground mt-1">
          We recommend clicking on each publication and{" "}
          <span className="font-semibold text-[#448361]">verifying</span> they
          fit with your email snippet.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {publications.map((pub) => (
          <div
            key={pub.title}
            className="rounded-md p-3 flex items-start gap-3"
          >
            <button
              onClick={() => handleSelect(pub.title)}
              className="h-8 w-8 p-1.5 flex items-center hover:text-[#448361] hover:bg-[#EDF3EC] cursor-pointer justify-center bg-white rounded-xs shrink-0"
            >
              <Plus className="h-5 w-5" />
            </button>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">{pub.title}</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-xs text-[#529CCA] bg-[#E7F3F8] px-2 py-1 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {pub.year || "Not Defined"}
                </Badge>
                {pub.url && (
                  <Link
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Badge className="rounded-xs text-[#448361] bg-[#EDF3EC] px-2 py-1 flex items-center gap-1">
                      <Link2 className="h-4 w-4" />
                      Open Publication
                    </Badge>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
