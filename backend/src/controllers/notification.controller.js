// controllers/notification.controller.js
import { Notification } from "../models/notification.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Fetch all notifications for the user, sorted by most recent
  const notifications = await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .exec();

  res
    .status(200)
    .json(
      new ApiResponse(200, notifications, "Notifications fetched successfully")
    );
});

// controllers/notification.controller.js
export const markAllAsRead = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  await Notification.updateMany(
    { userId, read: false },
    { $set: { read: true } }
  );

  res
    .status(200)
    .json(new ApiResponse(200, null, "All notifications marked as read"));
});
