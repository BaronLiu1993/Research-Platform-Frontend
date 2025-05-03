'use client'

import { useState, useEffect } from "react";
import KanbanCard from "../components/kanbancard"; 
import Navbar from "../components/navbar";

export default async function Bookmark() {
  const serverData = await fetch('http://localhost:8080/auth/get-user', {
    method: 'GET',
    credentials: 'include', 
  });
  const parsedResponse = await serverData.json();
  
  return (
    <>
    <Navbar />
    
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

          {/*Personal Profile Information*/}
          <div className = "rounded-md w-[10rem] mx-10">
              <h1 className = "font-sans text-black text-md">Name</h1>

          </div>
        


        {"Kanban Columns Not in Use For Now"}
        {/*
        <div className="flex justify-center space-x-2.5 p-2">
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
        </div>*/}
      </div> 
    </div>
    </>
  );
}