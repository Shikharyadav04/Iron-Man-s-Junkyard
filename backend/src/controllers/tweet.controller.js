import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tweet } from "../models/tweet.models.js";
import { User } from "../models/user.models.js";

const createTweet = asyncHandler(async (req, res) => {
  //take message from frontend
  //validate message
  //find user of tweet
  //check if user exists or not
  //create tweet
  //check if tweet is created or not
  //return response

  const { message } = req.body;
  const userId = req.user._id;
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
    avatar: user.avatar,
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

  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(400, "User Authorization failed : NO userId found");
  }

  const tweets = await Tweet.find({ owner: userId }).populate("owner");

  if (!tweets) {
    throw new ApiError(404, "No tweets found for this user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tweets, "User tweets fetched successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  //get tweetId and new message from frontend
  //find tweet by id
  //validate message
  //update tweet message
  //check if tweet is updated or not
  //return response

  const { tweetId, message } = req.body;

  if (!tweetId) {
    throw new ApiError(400, "Tweet Id not found");
  }
  if (!message) {
    throw new ApiError(400, "Please enter a new message");
  }
  const tweet = await Tweet.findByIdAndUpdate(
    tweetId,
    { message },
    { new: true }
  );

  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  //get tweetId from frontend
  //find tweet by id
  //delete tweet
  //check if tweet is deleted or not
  //return response

  const { tweetId } = req.body;

  if (!tweetId) {
    throw new ApiError(400, "Tweet Id not found");
  }

  const tweet = await Tweet.findByIdAndDelete(tweetId);

  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweet deleted successfully"));
});
const getAllTweets = asyncHandler(async (req, res) => {
  const tweets = await Tweet.find().populate("owner", "fullName email avatar");

  if (!tweets || tweets.length === 0) {
    throw new ApiError(404, "No tweets found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tweets, "All tweets fetched successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet, getAllTweets };
