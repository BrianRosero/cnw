import React, { useState, useEffect } from 'react';

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Conexión establecida');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Mensaje recibido: ', message);
      // Actualiza los datos en la aplicación
      setMessages(prevMessages => [...prevMessages, message]);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Mensajes recibidos:</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketComponent;
