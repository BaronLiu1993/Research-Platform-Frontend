import Link from "next/link";

//ShadCN Components
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcomponents/ui/card"

import { Lightbulb } from "lucide-react"

import { School } from "lucide-react";

import { 
    Button 
} from "@/shadcomponents/ui/button";

export default function RepoCard({ name, url, researchInterests, school, faculty, department }) {
    return (
        <Card>
                

            <CardContent className = "font-sans flex flex-col justify-start space-y-2">
                <CardTitle>
                    {name}
                </CardTitle>
                <CardDescription>
                    {school}
                </CardDescription>
                <div className = "flex gap-2 items-center bg-blue-200 rounded-md p-1">
                    <Lightbulb className = "flex h-5 w-5 rounded-md bg-sky-500"/>
                    <p className="text-xs leading-none text-sky-600 font-semibold">{department}</p>
                </div>
                <div className = "flex gap-2 items-center bg-pink-200 p-1 rounded-md">
                    <School className = "flex h-5 w-5 rounded-md bg-pink-400"/>
                    <p className="text-xs leading-none text-pink-600 font-semibold">{researchInterests}</p>
                </div>
                <Button>
                    <Link href={`/resume?url=${encodeURIComponent(url)}`}>
                        Connect
                    </Link>
                </Button>
            </CardContent>

    
            
        </Card>
    );
}