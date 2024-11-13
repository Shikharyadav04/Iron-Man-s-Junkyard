import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ChatRooms = () => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    // Fetch the list of chat rooms
    axios
      .get("http://localhost:8000/api/v1/chat/rooms", { withCredentials: true })
      .then((response) => {
        setChatRooms(response.data.data.chats); // Assuming response.data.chats contains the chat rooms
      })
      .catch((error) => {
        console.error("Error fetching chat rooms:", error);
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-[url(https://i.pinimg.com/564x/7d/50/5b/7d505bde575f517d0b42cb91e0ce951d.jpg)] bg-cover">
      <h2 className="text-2xl glow-text font-semibold text-center mb-6">
        Chat Rooms
      </h2>

      <div className="space-y-4 glow-text">
        {chatRooms.map((room) => (
          <Link
            key={room._id}
            to={`/chat/${room._id}`} // Link to the chat room detail page
            className="block p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">Chat ID: {room._id}</span>
              <span className="text-sm ">Request ID: {room.requestId}</span>
            </div>
            <div className="mt-2 text-sm ">
              <span className="font-medium">Customer:</span> {room.customerName}{" "}
              | <span className="font-medium">Dealer:</span> {room.dealerName}
              {"     "}|<span className="font-medium">Created On :</span>{" "}
              {new Date(room.createdAt).toLocaleDateString("en-GB")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatRooms;
