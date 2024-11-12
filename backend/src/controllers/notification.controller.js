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

  // Step 1: Log the userId for debugging
  console.log("User ID:", userId);

  // Step 2: Update notifications that are unread (read: false)
  const result = await Notification.updateMany(
    { userId, read: false },
    { $set: { read: true } }
  );

  // Check if any notifications were updated
  if (result.modifiedCount === 0) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "No unread notifications found"));
  }

  // Step 3: Fetch the updated notifications
  const notifications = await Notification.find({ userId }).sort({
    createdAt: -1,
  });

  // Step 4: Send the updated notifications
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
