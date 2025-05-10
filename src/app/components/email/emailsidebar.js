import { Accordion, AccordionTrigger, AccordionHeader } from "@/shadcomponents/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcomponents/ui/card"

export default function EmailSideBar ({publications}) {
    console.log(publications)
    return (
        <>
            <div className = "border-l-1 p-7 space-y-5">
                <Card>
                    
                </Card>
                <Card className = "w-[13rem] ">
                    <CardTitle className = "font-sans ">
                        <CardContent className = "text-sm flex space-x-2">
                            <div className = "h-4 w-4 bg-red-500"></div>
                            <span>Spell Check</span>
                        </CardContent>
                        <CardDescription className="text-xs ml-5">Review the provided English text and identify any spelling errors</CardDescription>
                    </CardTitle>
                </Card>
                <Card className = "w-[13rem] ">
                    <CardTitle className = "font-sans ">
                        <CardContent className = "text-sm flex space-x-2">
                            <div className = "h-4 w-4 bg-orange-500"></div>
                            <span>Specificity</span>
                        </CardContent>
                        <CardDescription className="text-xs ml-5">Review the provided English text and identify any spelling errors</CardDescription>
                    </CardTitle>
                </Card>
            </div>
        </>
    )
}