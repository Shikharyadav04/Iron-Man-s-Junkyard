import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000"); // Update with your server URL

const ChatWindow = ({ chat, onBack, role }) => {
  const [messages, setMessages] = useState(chat.messages);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", chat.requestId); // Join chat room by requestId

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]); // Append new message from server
    });

    return () => {
      socket.off("receiveMessage");
      socket.emit("leaveRoom", chat.requestId); // Leave room on component unmount
    };
  }, [chat.requestId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        roomId: chat.requestId,
        senderId: socket.id, // Use socket ID for sender
        message: newMessage,
      };

      // Emit message to the server
      socket.emit("sendMessage", messageData);

      // Do not immediately update local state here
      setNewMessage(""); // Clear input field
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-6">
      <button onClick={onBack} className="text-blue-600 font-semibold mb-6">
        &lt; Back to Chat List
      </button>

      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col h-full">
        <div className="flex-1 overflow-y-auto mb-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 mb-3 rounded-lg ${
                msg.senderId === socket.id
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-black self-start"
              }`}
            >
              <p>{msg.content}</p>
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
