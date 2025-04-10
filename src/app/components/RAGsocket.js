'use client'

import { useState } from 'react';
import useWebSocket from 'react-use-websocket';

export default function RAGSocket({ url }) {
  const [message, setMessage] = useState(null); 
  const [error, setError] = useState(null);  
  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://127.0.0.1:8000/ws/ai-agent', {
    onOpen: () => {
      if (url) {
        sendMessage(JSON.stringify({ message: url }));  
      }
    },
    onError: (error) => {
      setError('Error: Unable to connect to WebSocket.');
    },
    onMessage: (event) => {
      try {
        const data = JSON.parse(event.data); 
        setMessage(data); 
        console.log(data)
      } catch (error) {
        setError('Error: Invalid response received.');
      }
    },
    onClose: () => {
      console.log('WebSocket connection closed');
    },
  });

  return (
    <div>
      {error && <div>{error}</div>}  
      <div>{message ? JSON.stringify(message) : 'Waiting for response...'}</div>  {/* Render message */}
      <div>Status: {readyState === 0 ? 'Connecting...' : readyState === 1 ? 'Connected' : 'Disconnected'}</div>
    </div>
  );
}
