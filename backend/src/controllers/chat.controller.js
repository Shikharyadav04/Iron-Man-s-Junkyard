import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Chat } from "../models/chat.models.js";
import { User } from "../models/user.models.js";
import { getIo } from "../utils/Socket.js";

const getChatRooms = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const chats = await Chat.find({
    $or: [{ dealerId: userId }, { customerId: userId }],
  });

  if (!chats) {
    throw new ApiError(404, "No chat rooms found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { chats }, "Chat rooms fetched successfully"));
});

const getChatMessages = asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.chatId);

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { messages: chat.messages },
        "Chat messages fetched successfully"
      )
    );
});

const sendMessage = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { message } = req.body;
  const senderId = req.user._id;

  const chat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { messages: { senderId, message, timestamp: new Date() } },
    },
    { new: true }
  );

  if (!chat) {
    throw new ApiError(404, "Chat not found or failed to update");
  }

  const io = getIo();
  io.to(chatId).emit("newMessage", {
    senderId,
    message,
    timestamp: new Date(),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { message: "Message sent successfully" },
        "Message sent successfully"
      )
    );
});

export { getChatRooms, getChatMessages, sendMessage };
