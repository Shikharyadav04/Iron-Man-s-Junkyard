import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Request } from "../models/request.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createRequest = asyncHandler(async (req, res) => {
  const { scrapId, pickupLocation, quantity, scheduledPickupDate } = req.body;

  // Check if scrapId, pickupLocation, and scheduledPickupDate are non-empty strings
  if (
    [scrapId, pickupLocation, scheduledPickupDate].some(
      (field) => typeof field !== "string" || field.trim() === ""
    ) ||
    typeof quantity !== "number" ||
    isNaN(quantity) ||
    quantity <= 0
  ) {
    throw new ApiError(
      400,
      "All fields are required and quantity must be a positive number"
    );
  }

  const userId = req.user._id;
  const requestId = `REQ-${Date.now()}`;

  const newRequest = await Request.create({
    requestId,
    userId,
    scrapId,
    pickupLocation,
    quantity,
    scheduledPickupDate,
  });

  if (!newRequest) {
    throw new ApiError(500, "Failed to create new request");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, newRequest, "Your request is created successfully")
    );
});

export { createRequest };
