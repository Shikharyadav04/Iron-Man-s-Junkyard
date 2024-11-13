// controllers/notification.controller.js
import { Notification } from "../models/notification.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const notifications = await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .exec();

  res
    .status(200)
    .json(
      new ApiResponse(200, notifications, "Notifications fetched successfully")
    );
});

export const markAllAsRead = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  console.log("User ID:", userId);

  const result = await Notification.updateMany(
    { userId, read: false },
    { $set: { read: true } }
  );

  if (result.modifiedCount === 0) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "No unread notifications found"));
  }

  const notifications = await Notification.find({ userId }).sort({
    createdAt: -1,
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { notifications },
        "All notifications marked as read"
      )
    );
});
