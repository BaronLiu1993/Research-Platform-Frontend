import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function KanbanCard({ title, description, id, column }) {
  // Apply the useDraggable hook to the component
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,  // Use the id for each Kanban card
    data: {
      title,
      description,
      column
    },
  });

  // Apply the transform style from dnd-kit
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <>
      {/* Cards Start Here */}
      <div
        ref={setNodeRef}  
        {...listeners}  
        {...attributes}  
        style={style}  
        className="border border-gray-300 rounded-md w-[10rem] h-[5rem] overflow-hidden"
      >
        <div className="p-2">
          <h1 className="font-sans text-sm font-medium text-gray-800">{title}</h1>
          <p className="font-sans text-xs font-light text-gray-800">{description}</p>
        </div>
      </div>
    </>
  );
}
