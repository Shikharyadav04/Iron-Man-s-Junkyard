import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";

const getLatestNews = asyncHandler(async (req, res) => {
  try {
    // Make request to the news API
    const response = await axios.get("https://newsdata.io/api/1/latest", {
      params: {
        apikey: process.env.NEWS_API_KEY, 
        q: 'pollution OR recycling OR "Swachh Bharat Abhiyan" OR "global warming" OR "scrap management"',
        language: "en",
      },
    });

    // Check if results are available
    const { status, results } = response.data;

    if (status !== "success" || !results || results.length === 0) {
      throw new ApiError(500, "Failed to fetch news");
    }

    // Map and structure the response data, including image URLs
    const articles = results.map((article) => ({
      title: article.title,
      link: article.link,
      image_url: article.image_url || null, // Include image URL if available, otherwise null
    }));

    // Send structured response
    return res
      .status(200)
      .json(new ApiResponse(200, articles, "News fetched successfully"));
  } catch (error) {
    console.error(
      "Error fetching news:",
      error.response ? error.response.data : error.message
    );
    throw new ApiError(
      500,
      "Error fetching news: " +
        (error.response ? error.response.data.message : error.message)
    );
  }
});

export { getLatestNews };
