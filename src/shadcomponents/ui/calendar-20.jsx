"use client";

import * as React from "react";

import { Button } from "@/shadcomponents/ui/button";
import { Calendar } from "@/shadcomponents/ui/calendar";
import { Card, CardContent, CardFooter } from "@/shadcomponents/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";

import FollowUpEditor from "@/app/components/bookmark/table/snippet/followUpEditor";

export default function Calendar20() {
  const [date, setDate] = React.useState(new Date(2025, 5, 12));
  const [selectedTime, setSelectedTime] = React.useState("10:00");
  const timeSlots = Array.from({ length: 37 }, (_, i) => {
    const totalMinutes = i * 15;
    const hour = Math.floor(totalMinutes / 60) + 9;
    const minute = totalMinutes % 60;
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  });
  console.log(date);

  return (
    <Card className="gap-0 p-0 font-main rounded-none shadow-none border-0">
      <CardContent className="relative p-0 md:pr-48 rounded-2xl">
        <div className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
            showOutsideDays={false}
            modifiersClassNames={{
              booked: "[&>button]:line-through opacity-100",
            }}
            className="bg-transparent p-0 [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
            formatters={{
              formatWeekdayName: (date) => {
                return date.toLocaleString("en-US", { weekday: "short" });
              },
            }}
          />
        </div>
        <div className="no-scrollbar inset-y-0 right-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6 md:absolute md:max-h-none md:w-48 md:border-t-0 md:border-l">
          <div className="grid gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                onClick={() => setSelectedTime(time)}
                className="w-full shadow-none rounded-xs cursor-pointer"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t px-6 !py-5 md:flex-row">
        <div className="text-sm">
          {date && selectedTime ? (
            <>
              Follow Up is Scheduled For{" "}
              <span className="font-medium">
                {" "}
                {date?.toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}{" "}
              </span>
              at <span className="font-medium">{selectedTime}</span>.
            </>
          ) : (
            <>Select Date and Time for Automated Follow Up Email.</>
          )}
        </div>
        <Button
          disabled={!date || !selectedTime}
          className="w-full md:ml-auto md:w-auto rounded-xs text-[#448361] bg-[#EDF3EC] border-0 hover:text-[#448361] cursor-pointer"
          variant="outline"
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
