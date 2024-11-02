import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";

const getLatestNews = asyncHandler(async (req, res) => {
  try {
    // Make request to API
    const response = await axios.get("https://newsdata.io/api/1/latest", {
      params: {
        apikey: process.env.NEWS_API_KEY, // Ensure this is correct
        q: 'pollution OR recycling OR "Swachh Bharat Abhiyan" OR "global warming" OR "scrap management"',
        language: "en", // Ensure this is the correct language code
      },
    });

    // Check if results are available
    const { status, results } = response.data;

    if (status !== "success" || !results || results.length === 0) {
      throw new ApiError(500, "Failed to fetch news");
    }

    // Map and structure the response data
    const articles = results.map((article) => ({
      title: article.title,
      link: article.link,
    }));

    // Send structured response
    return res
      .status(200)
      .json(new ApiResponse(200, articles, "News fetched successfully"));
  } catch (error) {
    // Log detailed error information
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
