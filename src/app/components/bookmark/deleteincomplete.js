"use client";

import { Button } from "@/shadcomponents/ui/button";
import { removeFromSaved } from "./removeFromSaved";
import { Trash2 } from "lucide-react"; 

export default function DeleteInCompleteButton({ professor_id, user_id }) { 
  async function handleDeleteApplication(user_id, professor_id) {
    try {
      const response = await removeFromSaved(user_id.value, professor_id);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Button
      variant="outline" 
      className="text-red-500 cursor-pointer hover:bg-red-50 hover:text-red-700 transition-colors duration-200" 
      onClick={() => handleDeleteApplication(user_id, professor_id)}
    >
      <Trash2 className="h-4 w-4 mr-1" /> 
      Delete
    </Button>
  );
}