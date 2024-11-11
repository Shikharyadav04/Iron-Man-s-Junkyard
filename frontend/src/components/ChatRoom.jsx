import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client"; // Socket.IO client

const socket = io("http://localhost:8000"); // Connect to the Socket.IO server

const ChatRoom = () => {
  const { roomId } = useParams(); // Extract roomId from the URL
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null); // To scroll to the bottom of the chat

  useEffect(() => {
    // Emit 'joinRoom' event to join the specific chat room
    socket.emit("joinRoom", roomId);

    // Fetch the chat messages for the specific chat room
    axios
      .get(`http://localhost:8000/api/v1/chat/${roomId}/messages`, {
        withCredentials: true,
      })
      .then((response) => {
        setMessages(response.data.data.messages); // Assuming response.data.messages contains the chat messages
      })
      .catch((error) => {
        console.error("Error fetching chat messages:", error);
      });

    // Listen for new messages from Socket.IO
    socket.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup when the component is unmounted
    return () => {
      socket.off("newMessage");
    };
  }, [roomId]);

  // Scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Send message to the backend
      axios
        .post(
          `http://localhost:8000/api/v1/chat/${roomId}/message`,
          { message },
          { withCredentials: true }
        )
        .then(() => {
          setMessage(""); // Clear the message input
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Chat Room: {roomId}
      </h2>

      <div className="max-h-96 overflow-y-auto mb-4 p-2 border border-gray-300 rounded-lg bg-gray-50">
        {/* Display chat messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className="p-3 mb-2 rounded-lg border border-gray-300 hover:bg-gray-200 transition-all"
          >
            <div className="flex items-center justify-between">
              <strong className="text-sm text-gray-700">{msg.senderId}</strong>
              <span className="text-xs text-gray-500">
                {new Date(msg.timestamp).toLocaleString() || "Invalid time"}
              </span>
            </div>
            <div className="mt-1 text-gray-800">{msg.message}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input area */}
      <div className="flex items-center border-t border-gray-300 pt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 p-2 border border-gray-300 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;