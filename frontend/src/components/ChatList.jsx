import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const fetchChats = async () => {
    try {
      // Start loading state
      setLoading(true);

      // Make the request to fetch chats with cookies included
      const response = await axios.post(
        "http://localhost:8000/api/v1/chat/get-chat",
        {},
        {
          withCredentials: true, // This sends cookies with the request
        }
      );

      // Handle the response
      if (response.data.success && response.data.data.chats) {
        setChats(response.data.data.chats);
        setName(response.data.data.name);
      } else {
        console.error("No chats found or invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      // End loading state
      setLoading(false);
    }
  };

  // Fetch chats on component mount
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Chats
      </h2>

      {loading ? (
        <div className="flex justify-center items-center space-x-2">
          {/* Loading spinner with Tailwind CSS */}
          <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading chats...</span>
        </div>
      ) : (
        <div>
          {chats.length > 0 ? (
            <div className="space-y-4">
              {chats.map((chat) => (
                <div
                  key={chat._id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200"
                >
                  <h4 className="text-xl font-semibold text-gray-800">
                    Name: {name}
                  </h4>

                  <div className="mt-2">
                    <p className="text-gray-500">
                      Messages: {chat.messages.length} message(s)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-6">
              No chats available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatList;
