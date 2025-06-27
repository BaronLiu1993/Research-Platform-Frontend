"use client"
import { Badge } from "@/shadcomponents/ui/badge"
import { Eye, EyeClosed } from "lucide-react"

export default function SeenButton ({seenData}) {
    return (
        <>
            {seenData.opened ? <Badge className = "bg-blue-700 font-main rounded-xs"><Eye /> Opened</Badge>: <Badge className = "bg-red-700 font-main rounded-xs"> <EyeClosed /> Not Seen</Badge>}
        </>
    )
}