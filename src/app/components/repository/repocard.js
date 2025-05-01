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

import { 
    Button 
} from "@/shadcomponents/ui/button";

export default function RepoCard({ name, url, researchInterests, school, faculty, department }) {
    return (
        <Card>
            <CardHeader className="font-sans font-semibold">
                <CardTitle>
                    {name}
                </CardTitle>
                <CardDescription>
                    {school}
                </CardDescription>

            </CardHeader>
            <CardContent className = "font-sans flex flex-col justify-start space-y-2">
                <div className = "flex space-x-2 items-center">
                    <span className = "flex h-2 w-2 rounded-full bg-sky-500"></span>
                    <p className="text-xs leading-none font-light">{department}</p>
                </div>
                <div className = "flex space-x-2 items-center">
                    <span className = "flex h-2 w-2 rounded-full bg-green-500"></span>
                    <p className="text-xs leading-none font-light">{researchInterests}</p>
                </div>
            </CardContent>

    
            <CardFooter>
                <Button>
                    <Link href={`/resume?url=${encodeURIComponent(url)}`}>
                        Connect
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}