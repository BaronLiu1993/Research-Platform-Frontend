import TableEntry from "./tableentry"

export default function Recommendations () {
    const handleUrlSelection = (url) => {
        router.push(`/resume?url=${encodeURIComponent(url)}`);
    }
    return (
        <>
            <div className = "flex flex-col justify-start items-start">
                          <h1 className="text-2xl font-sans font-semibold my-5">Discover Professors at UofT!</h1>
            
                          <div className = "w-full">
                            <h1 className="text-md font-sans font-semibold my-2 bg-yellow-100 rounded-md">Cellular Biology Researchers</h1>
                            <div className = "space-y-2 mt-4">
                              <TableEntry
                                  name={"Jie Xuan Liu"}
                                  faculty={"Faculty of Engineering"}
                                  url={"Test"}
                                  onUrlSelect={handleUrlSelection}
                                />
                                <TableEntry
                                  name={"Xuan Yi Xiao"}
                                  faculty={"Faculty of Engineering"}
                                  url={"Test"}
                                  onUrlSelect={handleUrlSelection}
                                />
                                <TableEntry
                                  name={"Deng Yang Qing"}
                                  faculty={"Faculty of Engineering"}
                                  url={"Test"}
                                  onUrlSelect={handleUrlSelection}
                                />
                            </div>
                          </div>
                          <div className = "w-full">
                            <h1 className="text-md font-sans max-w-full font-semibold my-5 bg-red-100 rounded-md">Machine Learning Researchers</h1>
                            <div className = "space-y-2 mt-4">
                              <TableEntry
                                  name={"Jie Xuan Liu"}
                                  faculty={"Faculty of Engineering"}
                                  url={"Test"}
                                  onUrlSelect={handleUrlSelection}
                                />
                                <TableEntry
                                  name={"Xuan Yi Xiao"}
                                  faculty={"Faculty of Engineering"}
                                  url={"Test"}
                                  onUrlSelect={handleUrlSelection}
                                />
                                <TableEntry
                                  name={"Deng Yang Qing"}
                                  faculty={"Faculty of Engineering"}
                                  url={"Test"}
                                  onUrlSelect={handleUrlSelection}
                                />
                            </div>
                          </div>
                      </div>
        </>
    )
}