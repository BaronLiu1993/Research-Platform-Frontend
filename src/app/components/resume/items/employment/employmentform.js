"use client";  // ShadCN Components 
import {   
  Accordion,   
  AccordionContent,   
  AccordionItem,   
  AccordionTrigger, 
} from "@/shadcomponents/ui/accordion"; 

import { Textarea } from "@/shadcomponents/ui/textarea";
import { Input } from "@/shadcomponents/ui/input"; 
import { Label } from "@/shadcomponents/ui/label";  
import { useState, useEffect } from "react"; 

export default function EmploymentForm({ data, onChange }) {   
  const [local, setLocal] = useState(data);    

  useEffect(() => {     
    setLocal(data);   
  }, [data]);    

  const handleInput = (e) => {     
    const { name, value } = e.target;     
    const updated = { ...local, [name]: value };     
    setLocal(updated);     
    onChange(updated);   
  };    

  
  const handleDescriptionChange = (textContent) => {
    const bulletPoints = textContent
      .split('•')
      .map(text => text.trim())
      .filter(text => text.length > 0);
    
    const updated = { ...local, description: bulletPoints };
    setLocal(updated);
    onChange(updated);
  };
  
  const bulletContent = local.description && local.description.length > 0 
    ? "• " + local.description.join("\n• ") 
    : "• ";

  return (     
    <Accordion       
      type="single"       
      collapsible       
      className="w-full font-sans bg-white border rounded-md"     
    >       
      <AccordionItem value="employment-section">         
        <AccordionTrigger className="px-4 font-semibold text-lg">           
          <div>             
            <div className="">{local.job_title || "Untitled Position"}</div>             
            <div className="text-sm font-extralight">{local.company || "Untitled Company"}</div>             
            <div></div>           
          </div>         
        </AccordionTrigger>          
        
        <AccordionContent>           
          <div className="p-4 flex flex-col gap-4">             
            <div className="flex flex-col space-y-2">               
              <Label htmlFor="job_title">Job Title</Label>               
              <Input                 
                name="job_title"                 
                id="job_title"                 
                value={local.job_title || ""}                 
                onChange={handleInput}               
              />             
            </div>              
            
            <div className="flex flex-col space-y-2">               
              <Label htmlFor="company">Company</Label>               
              <Input                 
                name="company"                 
                id="company"                 
                value={local.company || ""}                 
                onChange={handleInput}               
              />             
            </div>              
            
            <div className="flex flex-col space-y-2">               
              <Label htmlFor="location">Location</Label>               
              <Input                 
                name="location"                 
                id="location"                 
                value={local.location || ""}                 
                onChange={handleInput}               
              />             
            </div>              
            
            <div className="flex flex-col sm:flex-row gap-4 sm:space-y-0 space-y-2">               
              <div className="flex flex-col flex-1 space-y-2">                 
                <Label htmlFor="start_date">Start Date</Label>                 
                <Input                   
                  type="date"                   
                  name="start_date"                   
                  id="start_date"                   
                  value={local.start_date || ""}                   
                  onChange={handleInput}                 
                />               
              </div>               
              <div className="flex flex-col flex-1 space-y-2">                 
                <Label htmlFor="end_date">End Date</Label>                 
                <Input                   
                  type="date"                   
                  name="end_date"                   
                  id="end_date"                   
                  value={local.end_date || ""}                   
                  onChange={handleInput}                 
                />               
              </div>             
            </div>              
            
            <div className="flex flex-col space-y-2">               
              <Label>Bullet Points</Label>               
              <Textarea
                className="w-full min-h-24 p-2 border rounded-md"
                value={bulletContent}
                onChange={(e) => handleDescriptionChange(e.target.value)}
              />
            </div>           
          </div>         
        </AccordionContent>       
      </AccordionItem>     
    </Accordion>   
  ); 
}