export default function Publish () {
    return (
        <>
            <div className = "">
                <h1 className = "text-[#787774]">1. Edit and Check Information</h1>
                <div className="space-y-1 pt-6 pb-3 flex w-full">
                <p className="text-[#37352F] text-[13px] w-[55rem] font-light">
                    When working with AI, be sure to{" "}
                    <span className="font-bold text-blue-700 font-mono">
                      check the website for accurate and precise information
                    </span>{" "}
                    that align closely with your current research interests.
                    Your{" "}
                    <span className="text-blue-700 font-bold font-mono">
                      research interests
                    </span>{" "}
                    are converted into vector representations, which are then
                    matched against each professor’s own{" "}
                    <span className="text-blue-700 font-bold font-mono">
                      research interests
                    </span>{" "}
                    using{" "}
                    <span className="underline text-blue-700 font-mono cursor-pointer">
                      cosine similarity scoring
                    </span>{" "}
                    [1].
                  </p>
                  
                </div>
            </div>
        </>
    )
}