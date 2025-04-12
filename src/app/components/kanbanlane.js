import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "../components/kanbancard"; 



export default function KanbanLane({ title, items }) {
  const { setNodeRef } = useDroppable({
    id: title, 
  });

  return (
    <div className="flex flex-col w-72 p-4 m-2 bg-white border border-gray-300 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">{title}</h3>
      <div ref={setNodeRef} className="space-y-2 bg-gray-100 p-2 rounded-lg">
        {items.map(({ title: cardTitle }, key) => (
          <KanbanCard
            key={key}
            title={cardTitle}
            index={key}
            parent={title}
          />
        ))}
      </div>
    </div>
  );
}
