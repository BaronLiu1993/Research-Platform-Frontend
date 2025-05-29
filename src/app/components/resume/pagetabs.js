import { useRef, useEffect, useState } from "react";

export default function PageTabs({ pages, currentPage, setCurrentPage }) {
  const tabRefs = useRef([]);
  const [underlineStyle, setUnderlineStyle] = useState({});

  useEffect(() => {
    const currentTab = tabRefs.current[currentPage];
    if (currentTab) {
      setUnderlineStyle({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
      });
    }
  }, [currentPage, pages]);

  return (
    <div className="relative border-b border-gray-200 text-xs font-sans">
      <div className="flex space-x-6">
        {pages.map((page, index) => (
          <button
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            onClick={() => setCurrentPage(index)}
            className={`pb-2 transition-colors text-xs duration-300 font-light cursor-pointer ${
              currentPage === index
                ? "text-neutral-500 font-semibold"
                : "text-neutral-400 hover:text-neutral-500"
            }`}
          >
            {page.name}
          </button>
        ))}
      </div>
      <span
        className="absolute bottom-0 h-[2px] bg-neutral-500 transition-all duration-300"
        style={underlineStyle}
      />
    </div>
  );
}
