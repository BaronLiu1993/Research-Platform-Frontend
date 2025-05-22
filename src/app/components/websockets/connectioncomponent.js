"use client"

import { useState, useEffect } from "react";
import { socket } from "./socket";
import { ConnectionManager } from "./connectionmanager";
import { ConnectionState } from "./connectionstate";

export default function ConnectionComponent({}) {
    const [isConnected, setIsConnected] = useState(socket.connected)
    const [events, setEvents] = useState(null)

    useEffect(() => {
        function onConnect() {
            setIsConnected(true)
        }

        function onDisconnect() {
            setIsConnected(true)
        }

        function eventChange(value) {
            setEvents(previous => [...previous, value])

        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('event', eventChange)

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('event', eventChange)
        };
    }, []);

    console.log(isConnected)
    console.log(events)

    return (
        <>
            <ConnectionState isConnected={ isConnected } />
            <ConnectionManager />
        </>
    )
}