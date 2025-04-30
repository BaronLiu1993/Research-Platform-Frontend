import Link from "next/link";

export default function Card({ name, url, researchInterests, school, faculty, department }) {
    return (
        <div className=" justify-center flex flex-col p-5 rounded-md transition border bg-white border-gray-300 shadow-md">
            <h1 className="font-sans my-2 font-semibold text-xl">{name}</h1>
            <div className = "space-y-2">
                <p className="bg-blue-200 w-fit p-0.5 text-blue-500 text-xs rounded-md">{school}</p>
                <p className="bg-red-200 w-fit p-0.5 text-red-500 font-md text-xs rounded-md">{department}</p>
                <p className="bg-green-200 w-fit p-0.5 text-green-500 font-md text-xs rounded-md">{researchInterests}</p>
            </div>

    
            <Link href={`/resume?url=${encodeURIComponent(url)}`}>
                <div className="font-sans text-blue-400 mt-4 cursor-pointer w-fit">
                    Connect Now ➝
                </div>
            </Link>
        </div>
    );
}