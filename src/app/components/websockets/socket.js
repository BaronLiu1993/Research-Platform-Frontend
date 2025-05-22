"use client";

import { io } from "socket.io-client";

const URL =  "ws://localhost:8000"; //Be sure to hide the link in production

export const socket = io(URL, {
    path: '/socket.io/', 
    transports: ['websocket'] 
});