import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [chatRooms, setChatRooms] = useState([]); // Make sure this is initialized

  useEffect(() => {
    const newSocket = io("http://localhost:8000"); // Your socket URL
    setSocket(newSocket);

    // Optionally, listen for chat room updates
    newSocket.on("chatRooms", (rooms) => {
      setChatRooms(rooms); // Set the rooms once they are fetched
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, chatRooms }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
