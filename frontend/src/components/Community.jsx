import React, { useState, useEffect } from "react";
import axios from "axios";

const Community = () => {
  const [tweets, setTweets] = useState([]);
  const [message, setMessage] = useState("");
  const [editTweet, setEditTweet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const maxCharacters = 280;

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    setError("");
    try {
      const response = await axios.get("/api/v1/tweet/get-all-tweets", {
        withCredentials: true,
      });
      setTweets(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching tweets");
    }
  };

  const handleAddTweet = async (e) => {
    e.preventDefault();
    if (message.length > maxCharacters) return;
    setLoading(true);
    setError("");
    try {
      await axios.post(
        "/api/v1/tweet/add-tweet",
        { message },
        { withCredentials: true }
      );
      setMessage("");
      setCharacterCount(0);
      fetchTweets();
    } catch (error) {
      setError(error.response?.data?.message || "Error creating tweet");
    } finally {
      setLoading(false);
    }
  };

  const handleMessageChange = (e) => {
    const message = e.target.value;
    setMessage(message);
    setCharacterCount(message.length);
  };

  return (
    <div className="p-6 bg-[#18252B] text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Community</h1>

      {error && (
        <div className="mb-4 p-3 text-red-500 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <p className="text-gray-300 mb-4">{tweets.length} Tweets</p>

      <form onSubmit={handleAddTweet} className="mb-4 flex space-x-3">
        <div className="flex-grow flex flex-col space-y-2">
          <textarea
            className="p-2 rounded-md bg-gray-700 text-white resize-none h-24"
            placeholder="What's happening?"
            value={message}
            onChange={handleMessageChange}
            maxLength={maxCharacters}
          />
          <div className="flex justify-between items-center">
            {/* Character Counter */}
            <p
              className={`text-sm ${
                characterCount > maxCharacters
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              {characterCount}/{maxCharacters}
            </p>
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
              disabled={
                loading ||
                characterCount === 0 ||
                characterCount > maxCharacters
              }
            >
              {loading ? "Posting..." : editTweet ? "Add Tweet" : "Tweet"}
            </button>
          </div>
        </div>
      </form>

      {/* Tweets List */}
      <div className="space-y-4">
        {tweets.map((tweet) => (
          <div
            key={tweet._id}
            className="p-4 bg-gray-800 rounded-md flex space-x-3 items-start"
          >
            {/* Profile Picture Placeholder */}
            <img
              src={tweet.owner.avatar || "https://via.placeholder.com/50"} // Replace with user's avatar if available
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">{tweet.owner.username}</h2>
              <p className="text-gray-300">{tweet.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(tweet.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
