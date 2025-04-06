'use client'

import { useState, useEffect, use } from 'react';
import Card from '../components/card'; 
import Navbar from '../components/navbar';
import { fetchRepositoryData } from '../api/getRepository';

export default function Page() {
  const [data, setData] = useState([]); 
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchRepositoryData(); 
      if (response && response.data) {
        setData(response.data.slice(0, 10)); 
      }
    };
    fetchData(); 
  }, []);

  

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
            />
          ))}
        </div>
      </div>
    </>
  );
}