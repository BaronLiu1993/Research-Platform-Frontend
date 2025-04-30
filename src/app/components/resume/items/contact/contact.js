export default function Contact ({student_contact}) {
    return (
        <>
            <div className = "p-4 border-gray-400 border-1 bg-gray-50 rounded-md">
                <div className = "px-6">
                        <h1 className = "font-sans text-md font-semibold">Contact</h1>
                        <p className = "text-gray-400 font-sans text-sm font-light">Check your Contact Info. Is it correct?</p>
                </div>
                <div className="p-6 flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold">Email</label>
                            <input className="p-2 border border-gray-200 bg-gray-50 rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold">LinkedIn</label>
                            <input className="p-2 border border-gray-200 bg-gray-50 rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold" value = {"University of Toronto"}>Phone Number</label>
                            <input className="p-2 border border-gray-200 bg-gray-50 rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold">Country</label>
                            <input className="p-2 border border-gray-200 bg-gray-50 rounded-md" />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col flex-1">
                                {/* Remember that every value here will be dynamically rendered from the user profile and will
                                    Users will only edit if they see a problem, regardless this should be accurate.
                                */}
                                <label className="text-xs font-semibold">Province</label>
                                <input className="p-2 border border-gray-200 bg-gray-50 rounded-md" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label className="text-xs font-semibold">Address</label>
                                <input className="p-2 border border-gray-200 bg-gray-50 rounded-md" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                                <label className="text-xs font-semibold" value = {"University of Toronto"}>University</label>
                                <input className="p-2 border border-gray-200 bg-gray-50 rounded-md" />
                        </div>
                </div>
                
            </div>
        </>
    )
}