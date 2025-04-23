'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../components/card';
import Navbar from '../components/navbar';
import { fetchRepositoryData } from '../api/getRepository';
import Recommendations from '../components/recommendations';
import Sidebar from '../components/sidebar';

export default function Repository() {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchRepositoryData();
      if (response && response.data) {
        setData(response.data.slice(60, 70));
      }
    };
    fetchData();
  }, []);

  const handleUrlSelection = (url) => {
    router.push(`/resume?url=${encodeURIComponent(url)}`);
  };

  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)] overflow-auto">
        {/* Sidebar - Fixed Width and Sticky */}
        <div className="p-5 sticky h-full overflow-y-auto bg-gray-50">
          <Sidebar />
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-5">
          <Recommendations />
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-sans font-semibold my-5">Discover Professors at UofT!</h1>
            <div className="grid grid-cols-3 gap-4">
              {data.map((professor) => (
                <Card
                  key={professor.id}
                  name={professor.name}
                  url={professor.url}
                  school={professor.school}
                  department={professor.department}
                  faculty={professor.faculty}
                  researchInterests={professor.research_interests}
                  onUrlSelect={handleUrlSelection}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
