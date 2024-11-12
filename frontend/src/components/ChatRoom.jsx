import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSocket } from "@/context/SocketProvider";

const ChatRoom = () => {
  const { roomId } = useParams();
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [customerId, setCustomerId] = useState();

  // Initial setup for joining the room and listening for new messages via WebSocket
  useEffect(() => {
    if (!socket) return;

    socket.emit("joinRoom", roomId);

    axios
      .get(`http://localhost:8000/api/v1/chat/${roomId}/messages`, {
        withCredentials: true,
      })
      .then((response) => {
        setMessages(response.data.data.messages);
        console.log(`response: ${response.data.data.chat.customerId}`);
        setCustomerId(response.data.data.chat.customerId);
      })
      .catch((error) => {
        console.error("Error fetching chat messages:", error);
      });

    socket.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, roomId]);

  // Polling every 2 seconds to fetch the latest messages
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`http://localhost:8000/api/v1/chat/${roomId}/messages`, {
          withCredentials: true,
        })
        .then((response) => {
          setMessages(response.data.data.messages);
        })
        .catch((error) => {
          console.error("Error fetching chat messages:", error);
        });
    }, 2000);

    return () => clearInterval(interval);
  }, [roomId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      axios
        .post(
          `http://localhost:8000/api/v1/chat/${roomId}/message`,
          { message },
          { withCredentials: true }
        )
        .then(() => {
          setMessage("");
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
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.senderId === customerId ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`${
                msg.senderId === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } p-3 rounded-lg max-w-xs`}
            >
              <div className="flex justify-between text-xs text-gray-500">
                <strong>{msg.senderName}</strong>
                <span>
                  {new Date(msg.timestamp).toLocaleString() || "Invalid time"}
                </span>
              </div>
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
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
