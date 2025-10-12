"use client";

import { Button } from "@/shadcomponents/ui/button";
import { removeFromApply } from "./removeFromApply";
import { Trash2 } from "lucide-react"; 

export default function DeleteInProgressButton({ professor_id, user_id}) { 
  async function handleDeleteApplication(user_id, professor_id) {
    try {
      const response = await removeFromApply(user_id.value, professor_id);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Button
      variant="outline" 
      className="text-red-500 hover:bg-red-50 cursor-pointer hover:text-red-700 transition-colors duration-200" // Subtle red on hover
      onClick={() => handleDeleteApplication(user_id, professor_id)}
    >
      <Trash2 className="h-4 w-4 mr-1" /> 
      Delete
    </Button>
  );
}