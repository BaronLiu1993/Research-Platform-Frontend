'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Card from '../components/card'; 
import Navbar from '../components/navbar';
import { fetchRepositoryData } from '../api/getRepository';
import TableEntry from '../components/tableentry';
import Sidebar from '../components/sidebar';

export default function Repository() {
  const [data, setData] = useState([]);
  const router = useRouter()
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
  }

  return (
    <>
      <Navbar />

      <div className = "flex">

        <div className = "m-5">
            <Sidebar />
        </div>
        {/*Second Horizontal Flex Box Starts Here*/}
        <div>
          <div className = "flex flex-col justify-start items-start">
              <h1 className="text-2xl font-sans font-semibold my-5">Discover Professors at UofT!</h1>

              <div className = "w-full">
                <h1 className="text-md font-sans font-semibold my-2 bg-yellow-100 rounded-md">Cellular Biology Researchers</h1>
                <h2 className="font-sans mb-5 font-bold text-sm border-b-2 w-fit">✅Recommendations</h2>
                <div className = "space-y-2">
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
              </div>

              <div className = "w-full">
                <h1 className="text-md font-sans font-semibold my-5 bg-blue-100 rounded-md">Medical Researchers</h1>
              </div>
          </div>
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-2xl font-sans font-semibold my-5">Discover Professors at UofT!</h1>
            
            <div className="grid grid-cols-3 gap-4">
              {data.map((professor) => ( 
                <Card
                  key={professor.id}
                  name={professor.name}
                  url={professor.url}
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