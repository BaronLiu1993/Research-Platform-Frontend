'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Card from '../components/card'; 
import Navbar from '../components/navbar';
import { fetchRepositoryData } from '../api/getRepository';

export default function Repository() {
  const [data, setData] = useState([]);
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchRepositoryData(); 
      if (response && response.data) {
        setData(response.data.slice(0, 10)); 
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
    </>
  );
}