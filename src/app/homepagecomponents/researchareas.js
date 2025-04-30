import Homecard from "./homecard"

export default function ResearchAreas () {
    return (
        <>
        <div className = "m-10">
            <h1 className = "font-sans font-medium text-[#5B61B2] p-2 rounded-md bg-slate-100">RESEARCH AREAS</h1>
            <h2 className = "b-[#5B61B2] border-b-2 w-fit font-sans font-medium p-1">📝 Modules</h2>
            <p className = "mt-2 font-sans text-sm font-light text-gray-800">Find a list of professors that research various disciplines ranging from Molecular Biology to Machine Learning and AI at UofT!</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 m-5 gap-2">
              <Homecard title="Molecular and Cell Biology" description="Discover Now ➡️" hexcode="#bbf7d0" />
              <Homecard title="Machine Learning and AI" description="Discover Now ➡️" hexcode="#bfdbfe" />
              <Homecard title="Macroeconomics" description="Discover Now ➡️" hexcode="#fef08a" />
              <Homecard title="Biomedical Engineering" description="Discover Now ➡️" hexcode="#fecaca" />
              <Homecard title="Thermofluids" description="Discover Now ➡️" hexcode="#e9d5ff" />
              <Homecard title="Organic Chemistry" description="Discover Now ➡️" hexcode="#c7d2fe" />
            </div>
        </div>
        </>
    )
}