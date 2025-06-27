"use client"
import { Badge } from "@/shadcomponents/ui/badge"
import { BookOpenText, CircleStop } from "lucide-react"

export default function EngagementButton ({engagementData}) {
    return (
        <>
            {engagementData.opened ? <Badge className = "bg-green-700 font-main rounded-xs"><BookOpenText /> Engaged with Content</Badge>: <Badge className = "bg-orange-700 font-main rounded-xs"> <CircleStop />No Engagement</Badge>}
        </>
    )
}