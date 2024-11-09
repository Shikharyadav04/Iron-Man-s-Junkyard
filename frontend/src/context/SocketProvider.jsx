import React, { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8000");

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, currentRoom, setCurrentRoom }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
