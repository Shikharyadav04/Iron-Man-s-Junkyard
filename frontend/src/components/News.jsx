// src/components/News.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/news/getNews");
        setNews(response.data.data); // Adjust to match your backend response structure
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch news.");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-[#F2FBF6] min-h-screen p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Latest News</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((article, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            {/* Image Section */}
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
            )}
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              {article.title}
            </h3>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
