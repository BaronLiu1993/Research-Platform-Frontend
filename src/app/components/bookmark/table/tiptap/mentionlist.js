import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";

const MentionList = forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index) => {
    const item = props.items[index];
    if (item) {
      props.command({ id: `<strong>${item.variable}</strong>` });
    }
  };

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
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

  return (
    <div className="rounded-md border py-3 px-1 bg-white">
      <h1 className="text-xs font-semibold text-[#787774] px-3 overflow-y-auto max-h-[400px]">Building Blocks</h1>
      <div className="flex flex-col">
        {props.items.length ? (
          props.items.map((item, index) => (
            <button
              className={`flex font-main gap-2 items-center p-2 rounded-xs ${selectedIndex === index ? "bg-gray-100" : ""}`}
              key={index}
              onClick={() => selectItem(index)}
            >
              <div>{item.icon}</div>
              <div className="flex flex-col justify-start items-start">
                <span className="text-[12px] text-[#37352F]">
                  {item.title}
                </span>
                <span className="text-[12px] font-light text-[#787774]">
                  {item.description}
                </span>
              </div>
            </button>
          ))
        ) : (
          <div className="item">No result</div>
        )}
      </div>
    </div>
  );
});

export default MentionList;
