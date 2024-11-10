import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatWindow from "./ChatWindow";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null); // State to track the selected chat

  const fetchChats = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/api/v1/chat/get-chats-for-customer",
        {},
        {
          withCredentials: true,
        }
      );

      console.log("Response data:", response.data);

      const chatsData = response.data.data.chats;

      if (chatsData) {
        setChats(Array.isArray(chatsData) ? chatsData : [chatsData]);
      } else {
        console.error("No chats found or invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleChatClick = (chat) => {
    setSelectedChat(chat); // Set the clicked chat as selected
  };

  const handleBackToList = () => {
    setSelectedChat(null); // Reset selected chat to show the list again
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      {selectedChat ? (
        // Render ChatWindow if a chat is selected
        <ChatWindow chat={selectedChat} onBack={handleBackToList} />
      ) : (
        // Render ChatList when no chat is selected
        <div>
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
            Chats
          </h2>

          {loading ? (
            <div className="flex justify-center items-center space-x-2">
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
                      className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                      onClick={() => handleChatClick(chat)} // Handle click event
                    >
                      <h4 className="text-xl font-semibold text-gray-800">
                        Request ID: {chat.requestId}
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
      )}
    </div>
  );
};

export default ChatList;
