"use client"

import { fetchCalendar } from "@/app/fetch/calendar";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; 
import '@fullcalendar/common/main.css';
import '@fullcalendar/timegrid/main.css';

export default function GoogleCalendar({ userId }) {
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [events, setEvents] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCalendar(userId)
      setEvents(data.events)
    } 
    fetchData()
  }, [userId])

  console.log(event)
  const handleDateSelect = (selectInfo) => {
    alert(`Selected from ${selectInfo.startStr} to ${selectInfo.endStr}`);
    setSelectedInfo(selectInfo);
  };

  const handleEventClick = (clickInfo) => {
    alert(`Event: ${clickInfo.event.title}`);
  };

  return (
    <FullCalendar
      className = "text-xs"
      plugins={[timeGridPlugin, interactionPlugin]}
      slotMinTime="09:00:00"
      slotMaxTime="17:00:00"
      scrollTime="12:00:00"
      initialView="timeGridWeek"
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={true}
      events={events}
      select={handleDateSelect}
      eventClick={handleEventClick}
      initialDate={"2025-01-20"} 
      height="auto"
    />
  );
}
