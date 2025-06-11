"use client"
import { Badge } from "@/shadcomponents/ui/badge"
import { useState } from "react"

export default function EngagementButton () {
    const [viewed, setViewed] = useState(false)
    
    return (
        <>
            {viewed ? <Badge className = "bg-green-700 font-main rounded-xs">Engaged</Badge>: <Badge className = "bg-orange-700 font-main rounded-xs">Not Engaged</Badge>}
        </>
    )
}