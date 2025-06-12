"use client"
import { Badge } from "@/shadcomponents/ui/badge"

export default function EngagementButton ({engagementData}) {
    return (
        <>
            {engagementData.opened ? <Badge className = "bg-green-700 font-main rounded-xs">Engaged</Badge>: <Badge className = "bg-orange-700 font-main rounded-xs">Not Engaged</Badge>}
        </>
    )
}