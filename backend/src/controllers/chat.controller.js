import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Chat } from "../models/chat.models.js";
import { User } from "../models/user.models.js";
const getDealerChats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  const chats = await Chat.findOne({ dealerId: userId });

  if (!chats) {
    throw new ApiError(404, "No chats found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { chats }, "Chats fetched successfully"));
});

const getCustomerChats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  const chats = await Chat.findOne({ customerId: userId });

  if (!chats) {
    throw new ApiError(404, "No chats found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { chats }, "Chats fetched successfully"));
});

export { getDealerChats, getCustomerChats };
