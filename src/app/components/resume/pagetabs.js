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
            className={`pb-2 transition-colors text-xs duration-300 font-semibold ${
              currentPage === index
                ? "text-purple-500"
                : "text-gray-400 hover:text-purple-500"
            }`}
          >
            {page.name}
          </button>
        ))}
      </div>
      <span
        className="absolute bottom-0 h-[2px] bg-purple-500 transition-all duration-300"
        style={underlineStyle}
      />
    </div>
  );
}
