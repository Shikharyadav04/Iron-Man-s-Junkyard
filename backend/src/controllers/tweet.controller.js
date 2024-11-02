import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { Tweet } from "../models/tweet.models";

const createTweet = asyncHandler(async (req, res) => {
  //take message from frontend
  //validate message
  //find user of tweet
  //check if user exists or not
  //create tweet
  //check if tweet is created or not
  //return response

  const { message, userId } = req.body;

  if (!message) {
    throw new ApiError(400, "Please enter a message");
  }
  if (!userId) {
    throw new ApiError(500, "Unable to fetch User ID");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const tweet = await Tweet.create({
    message,
    owner: user._id,
  });

  if (!tweet) {
    throw new ApiError(500, "Failed to create tweet");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  //get userId from frontend
  //find all tweets of user
  //return response

  const { userId } = req.body;

  if (!userId) {
    throw new ApiError(400, "User Authorization failed : NO userId found");
  }

  const tweets = await Tweet.find({ owner: userId }).populate("owner");
});
