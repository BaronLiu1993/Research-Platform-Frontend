"use client";

import { fetchCalendar } from "@/app/fetch/calendar";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function GoogleCalendar({ userId }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCalendar(userId);
      setEvents(data.events);
    };
    fetchData();
  }, [userId]);

  return (
    <div className="text-xs">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        slotMinTime="09:00:00"
        slotMaxTime="17:00:00"
        scrollTime="12:00:00"
        initialView="timeGridWeek"
        selectable={true}
        selectMirror={true}
        events={events}
        initialDate={"2025-01-20"}
        height="auto"
        eventTextColor="#1D4ED8"
        eventBackgroundColor="#E7F3F8"
        eventBorderColor="white"
        weekends ={false}

      />

      {/* ✅ Global styling block */}
      <style jsx global>{`
        .fc .fc-col-header-cell-cushion {
          font-weight: 500;
          font: 
          color: #374151;
          font-size: 0.5rem;
        }
        .fc .fc-event {
          background-color: #E7F3F8;
          border-radius: 0.1rem;
          box-shadow: 0 1px 2px rgb(0 0 0 / 0.1);
          color: #1D4ED8; 
          font-size: 0.5rem;
          font-weight: 600;
          padding: 2px 4px;
        }

        .fc .fc-event:hover {
          cursor: pointer;
        }

        .fc .fc-timegrid-slot-lane {
          border-bottom: 1px solid #e5e7eb;

        }
      `}</style>
    </div>
  );
}
