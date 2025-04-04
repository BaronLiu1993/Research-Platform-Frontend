import { createClient } from '../utils/supabase/server';
import { cookies } from 'next/headers';
import Card from '../components/card'; 
import Navbar from '../components/navbar';

export default async function Page() {
  const cookieStore = await cookies();
  
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('Taishan')
    .select('id, name, url, research_interests')
    .limit(10);  

  console.log(data)

  return (
    <>
    <Navbar />
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-2xl font-sans font-semibold my-5">Discover Professors at UofT!</h1>
      <div className="grid grid-cols-3 gap-4">
        {data?.map((professor) => (
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
