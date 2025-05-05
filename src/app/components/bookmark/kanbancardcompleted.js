

export default function KanbanCardCompleted({ title, description, id, column }) {
 

  return (
    <>
      {/* Cards Start Here */}
      <div>
        <div className="p-2 border-1 rounded-md">
          <h1 className="font-sans text-sm font-medium text-gray-800">{title}</h1>
          <p className="font-sans text-xs font-light text-gray-800">{description}</p>
        </div>
      </div>
    </>
  );
}
