import { LoaderCircle, Cloud } from "lucide-react";
import { useLoadingStore } from "@/app/store/useLoadingStore";

export function SaveIndicator() {
  const status = useLoadingStore((s) => s.status);

  return (
    <div className="flex gap-1 text-[#37352F]">
      {status === "saving" ? (
        <>
          <LoaderCircle className="animate-spin h-4 w-4" />
          <span>Saving Draft...</span>
        </>
      ) : (
        <>
          <Cloud className="h-4 w-4" />
          <span>Draft Saved!</span>
        </>
      )}
    </div>
  );
}
