export default function PersonalInfo () {

    return (
        <>
            <div className = "p-4 border-gray-400 border-1 bg-gray-50 rounded-md">
                <div className = "px-6">
                        <h1 className = "font-sans text-md font-semibold">Personal Details</h1>
                        <p className = "text-gray-400 font-sans text-sm font-light">Check your Personal Info. Is it correct?</p>
                </div>
                <div className="p-6 flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold">First Name</label>
                            <input className="p-2 border border-gray-200 bg-gray-50 rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold">Last Name</label>
                            <input className="p-2 border border-gray-200 bg-gray-50 rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold" value = {"University of Toronto"}>School</label>
                            <input className="p-2 border border-gray-200 bg-gray-50 rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold">Major</label>
                            <input className="p-2 border border-gray-200 bg-gray-50 rounded-md" />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col flex-1">
                                {/* Remember that every value here will be dynamically rendered from the user profile and will
                                    Users will only edit if they see a problem, regardless this should be accurate.
                                */}
                            <label className="text-xs font-semibold">Start Year</label>
                            <input className="p-2 border border-gray-200 bg-gray-50 rounded-md" />
                            </div>
                            <div className="flex flex-col flex-1">
                            <label className="text-xs font-semibold">End Year</label>
                            <input className="p-2 border border-gray-200 bg-gray-50 rounded-md" />
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}