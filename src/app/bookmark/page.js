'use client'

import { DndContext, rectIntersection } from "@dnd-kit/core";
import { useState, useEffect } from "react";
import KanbanCard from "../components/kanbancard"; 
import Navbar from "../components/navbar";

export default function Bookmark() {

  {/*Fix Card Functionality Later*/}
  const [isClient, setIsClient] = useState(false);
  const [todoItems, setTodoItems] = useState([
    { id: "1", title: "Irene Park", description: "Material Science Engineering" },
    { id: "2", title: "Jung Che", description: "Molecular Biology" },
    { id: "3", title: "Kairu Liu", description: "Philosophy" },
    { id: "4", title: "Jay Patel", description: "Engineering Science" },
    { id: "5", title: "Jerry Liu", description: "Consulting" },
  ]);
  const [inProgressItems, setInProgressItems] = useState([
    { id: "6", title: "Ethan Teh", description: "Medicine" },
    { id: "7", title: "Jaiden Parthenon", description: "Management" },
    { id: "8", title: "Deng Yang Qing", description: "User Experience" },
  ]);
  const [completedItems, setCompletedItems] = useState([
    { id: "9", title: "Chen Jie Yong", description: "Material Science Engineering" },
  ]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const sourceColumn = active.data.current.column;
    const destinationColumn = over?.id;

    if (!destinationColumn || sourceColumn === destinationColumn) return;

    const cardId = active.id;
    const card = active.data.current;
    let sourceItems = [];
    let destinationItems = [];
    if (sourceColumn === "ToDo") {
      sourceItems = [...todoItems];
    } else if (sourceColumn === "InProgress") {
      sourceItems = [...inProgressItems];
    } else if (sourceColumn === "Completed") {
      sourceItems = [...completedItems];
    }
    const [removedItem] = sourceItems.filter((item) => item.id === cardId);
    if (destinationColumn === "ToDo") {
      destinationItems = [...todoItems, removedItem];
    } else if (destinationColumn === "InProgress") {
      destinationItems = [...inProgressItems, removedItem];
    } else if (destinationColumn === "Completed") {
      destinationItems = [...completedItems, removedItem];
    }

    if (sourceColumn === "ToDo") {
      setTodoItems(todoItems.filter((item) => item.id !== cardId));
    } else if (sourceColumn === "InProgress") {
      setInProgressItems(inProgressItems.filter((item) => item.id !== cardId));
    } else if (sourceColumn === "Completed") {
      setCompletedItems(completedItems.filter((item) => item.id !== cardId));
    }

    if (destinationColumn === "ToDo") {
      setTodoItems(destinationItems);
    } else if (destinationColumn === "InProgress") {
      setInProgressItems(destinationItems);
    } else if (destinationColumn === "Completed") {
      setCompletedItems(destinationItems);
    }
  };

  if (!isClient) {
    return null; 
  }

  return (
    <>
    <Navbar />
    <DndContext collisionDetection={rectIntersection} onDragEnd={handleDragEnd}>
      <div className="rounded-md border-gray-300 select-none">
        <div className="flex flex-col justify-center items-center mt-5">
          <h1 className="font-sans text-2xl font-medium">
            Welcome, <span className="text-green-400">Min Jeong!</span>
          </h1>
          <p className="font-sans text-sm">
            Resume where you left off! Keep applying! You got this!
          </p>
        </div>
        <div className = "flex justify-center">
          <div className = "rounded-md w-[10rem] mx-10">
              <h1 className = "font-sans text-black text-md">Name</h1>
          </div>
        
        <div className="flex justify-center space-x-2.5 p-2">
          {/* Kanban Columns */}
          <div>
            <div className="flex items-center space-x-2 my-2 bg-red-300 w-fit p-1 rounded-4xl">
              <div className="bg-red-600 h-2 w-2 rounded-full"></div>
              <h1 className="text-xs font-sans font-medium">Not Started</h1>
            </div>
            <div className="space-y-2">
              {todoItems.map((item) => (
                <KanbanCard key={item.id} title={item.title} description={item.description} id={item.id} column="ToDo" />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 my-2 bg-yellow-200 w-fit p-1 rounded-4xl">
              <div className="bg-yellow-600 h-2 w-2 rounded-full"></div>
              <h1 className="text-xs font-sans font-medium">In Progress</h1>
            </div>
            <div className="space-y-2">
              {inProgressItems.map((item) => (
                <KanbanCard key={item.id} title={item.title} description={item.description} id={item.id} column="InProgress" />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 my-2 bg-green-200 w-fit p-1 rounded-4xl">
              <div className="bg-green-500 h-2 w-2 rounded-full"></div>
              <h1 className="text-xs font-sans font-medium">Completed!</h1>
            </div>
            <div className="space-y-2">
              {completedItems.map((item) => (
                <KanbanCard key={item.id} title={item.title} description={item.description} id={item.id} column="Completed" />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 my-2 bg-purple-200 w-fit p-1 rounded-4xl">
              <div className="bg-purple-500 h-2 w-2 rounded-full"></div>
              <h1 className="text-xs font-sans font-medium">Follow Up?</h1>
            </div>
            <div className="space-y-2">
              {completedItems.map((item) => (
                <KanbanCard key={item.id} title={item.title} description={item.description} id={item.id} column="Completed" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </DndContext>
    </>
  );
}