//Components
import Navbar from '../components/navbar';
import RepoCard from '../components/repository/repocard';
import { columns } from './columns';
import { DataTable } from './data-table';

export default async function Repository() {
  const serverData = await fetch('http://localhost:8080/Taishan/');
  const parsedResponse = await serverData.json();
  const responses = parsedResponse.data
  
  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)] bg-slate-50 overflow-auto">
        <div className="p-5 sticky h-full overflow-y-auto bg-gray-50">

        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-sans font-semibold my-5">Discover Professors at UofT!</h1>
            <div className="">
              <DataTable columns={columns} data={responses} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
