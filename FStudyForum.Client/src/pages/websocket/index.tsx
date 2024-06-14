import React, { useEffect, useState } from 'react';

const WebSocketComponent: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:5005/api/WebSocket/getweb"); 
        ws.onopen = () => {
            console.log('Connected to WebSocket');
            setIsConnected(true);
        };
        ws.onmessage = (event) => {
            const message = event.data;
            console.log('Received message:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        ws.onerror = (event) => {
            console.error('WebSocket error:', event);
            setError('WebSocket error');
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
            setIsConnected(false);
        };

        // Cleanup function khi component unmounts
        return () => {
            ws.close();
        };
    }, []);

    return (
        <div>
            <h1>WebSocket Notifications</h1>
            {isConnected ? <p>Connected</p> : <p>Disconnected</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
};

export default WebSocketComponent;
