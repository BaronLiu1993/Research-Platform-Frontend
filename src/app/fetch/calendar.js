"use server"

export async function fetchCalendar (userId) {
    try {
        const calendarData = await fetch(`http://localhost:8080/gcalendar/availability/${userId}`, {
            method: "GET",
        })
        const parsedCalendarData = await calendarData.json()
        return parsedCalendarData
    } catch (err) {
        console.log(err)
    }
} 