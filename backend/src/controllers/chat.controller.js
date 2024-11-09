import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Chat } from "../models/chat.models.js";
import { User } from "../models/user.models.js";
const getChats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  const chats = await Chat.find({
    $or: [{ customerId: userId }, { dealerId: userId }],
  });

  if (!chats) {
    throw new ApiError(404, "No chats found");
  }
  const user = await User.findById(userId);

  const role = user.role;

  let name = "";

  if (role === "customer") {
    const dealer = await User.findById(chats[0].dealerId);
    name = dealer.username;
  } else {
    const customer = await User.findById(chats[0].customerId);
    name = customer.username;
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { chats, name }, "Chats fetched successfully"));
});

export { getChats };
