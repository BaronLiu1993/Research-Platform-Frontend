export default function tableentry ({name, faculty, url, onUrlSelect}) {
    const handleCardClick = () => {
        onUrlSelect(url)
    }
    return (
        <>
        <div className="h-fit flex rounded-md justify-between">
            <h1 className="font-sans font-semibold text-sm">{name}</h1>
            <div className = "flex space-x-1">
                <div className = "bg-red-200 text-red-600 font-sans text-xs p-1 rounded-sm">Data Science</div>
                <div className = "bg-green-200 text-green-600 font-sans text-xs p-1 rounded-sm">Machine Learning</div>
                <div className = "bg-red-200 text-red-600 font-sans text-xs p-1 rounded-sm">Engineering</div>
            </div>
        </div>
        </>
    )
}