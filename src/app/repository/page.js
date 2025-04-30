//Components
import Navbar from '../components/navbar';
import Recommendations from '../components/recommendations';
import Sidebar from '../components/sidebar';
import Card from '../components/repository/card';

export default async function Repository() {
  const serverData = await fetch('http://localhost:8080/Taishan/');
  const parsedResponse = await serverData.json();
  const responses = parsedResponse.data
  
  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)] overflow-auto">
        {/* Sidebar - Fixed Width and Sticky */}
        <div className="p-5 sticky h-full overflow-y-auto bg-gray-50">
          <Sidebar />
        </div>

        {/* Main Content, it is scrollable */}
        <div className="flex-1 overflow-y-auto p-5">
          <Recommendations />
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-sans font-semibold my-5">Discover Professors at UofT!</h1>
            <div className="grid grid-cols-3 gap-4">
            {responses.map((response) => (
                <Card
                    key={response.id}
                    name={response.name}
                    url={response.url}
                    school={response.school}
                    department={response.department}
                    faculty={response.faculty}
                    researchInterests={response.research_interests}
                />
            ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
