"use client";

import { useState } from "react";
import Employment from "./items/employment";
import Projects from "./items/projects";
import Contact from "./items/contact";
import PersonalInfo from "./items/personalinfo";
import Progress from "./progress";

export default function Editor() {
    const pages = [
        { component: <Employment />, name: "Employment" },
        { component: <Projects />, name: "Projects" },
        { component: <Contact />, name: "Contact" },
        { component: <PersonalInfo />, name: "Personal Info" },
    ];

    const [currentPage, setCurrentPage] = useState(0);

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1 < pages.length ? prev + 1 : prev));
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
    };

    return (
        <>
        <div className="w-full overflow-hidden">
            <div className = "p-6">
                <Progress />
            </div>
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
                {pages.map((page, index) => (
                    <div key={index} className="w-full flex-shrink-0 p-4">
                        {page.component}
                    </div>
                ))}
            </div>

            <div className="flex justify-between mt-4">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Back
                </button>
                <button
                    onClick={nextPage}
                    disabled={currentPage === pages.length - 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
        </>
    );
}
