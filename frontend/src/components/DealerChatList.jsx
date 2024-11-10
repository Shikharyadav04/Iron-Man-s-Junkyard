import React, { useState } from "react";

const ChatWindow = ({ chat, onBack, onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message); // Call sendMessage function passed as prop
      setMessage(""); // Clear message input
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <button className="text-blue-500 mb-4" onClick={onBack}>
        Back to Chat List
      </button>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Chat with Request ID: {chat.requestId}
        </h2>
        <div className="border-b mb-4">
          {chat.messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <p className="font-semibold">{msg.senderId}:</p>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
