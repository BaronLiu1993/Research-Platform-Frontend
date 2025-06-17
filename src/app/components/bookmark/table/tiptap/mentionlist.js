import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";

import { useSelectedVariablesStore } from "@/app/store/useSelectedRowsStore";
import { Braces } from "lucide-react";

const MentionList = forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const scrollContainerRef = useRef(null);

  const addSelectedVariable = useSelectedVariablesStore(
    (state) => state.addSelectedVariable
  );
  const selectItem = (index) => {
    const item = props.items[index];
    if (item) {
      props.command({ id: item.variable });
      addSelectedVariable(item.variable);
    }
  };

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        setSelectedIndex(
          (selectedIndex + props.items.length - 1) % props.items.length
        );
        return true;
      }
      if (event.key === "ArrowDown") {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
        return true;
      }
      if (event.key === "Enter") {
        selectItem(selectedIndex);
        return true;
      }
      return false;
    },
  }));

  useEffect(() => setSelectedIndex(0), [props.items]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (event) => {
      if (container.scrollHeight > container.clientHeight) {
        event.stopPropagation();
      }
    };

    container.addEventListener("wheel", handleWheel);

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="rounded-sm border py-3 px-1 bg-white w-[360px]">
      <h1 className="text-xs font-semibold text-[#787774] px-3">
        Create New Variables
      </h1>
  
      <div className="flex flex-col pr-1">
        <button className="flex font-main gap-2 items-center p-2 rounded-xs hover:cursor-pointer hover:bg-gray-100">
          <div>
            <Braces className="p-2 rounded-sm border-1 h-12 w-12 stroke-[1px] text-[#37352F]" />
          </div>
          <div className="flex flex-col justify-start items-start">
            <span className="text-[12px] text-[#37352F]">Add Variable</span>
            <span className="text-[12px] font-light text-[#787774]">
              Repeat Repetitive Variables
            </span>
          </div>
        </button>
      </div>
  
      <div
        ref={scrollContainerRef}
        className="flex flex-col pr-1 max-h-[200px] overflow-y-auto mt-2"
      >
        {props.items.length ? (
            
          <>
            <h1 className="text-xs font-semibold text-[#787774] px-3 pt-2">
              Prebuilt Variables
            </h1>
  
            {props.items.map((item, index) => (
              <button
                className={`flex font-main gap-2 items-center p-2 rounded-xs hover:bg-gray-100 ${
                  selectedIndex === index ? "bg-gray-100" : ""
                }`}
                key={index}
                onClick={() => selectItem(index)}
              >
                <div>{item.icon}</div>
                <div className="flex flex-col justify-start items-start">
                  <span className="text-[12px] text-[#37352F]">
                    {item.title || "Untitled"}
                  </span>
                  <span className="text-[12px] font-light text-[#787774]">
                    {item.description || ""}
                  </span>
                </div>
              </button>
            ))}
          </>
        ) : (
          <div className="item px-3 py-2 text-sm text-gray-500">No result</div>
        )}
      </div>
    </div>
  );
  
  
});

export default MentionList;
