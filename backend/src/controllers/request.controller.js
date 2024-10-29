import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Request } from "../models/request.models.js";
import { Scrap } from "../models/scrap.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createRequest = asyncHandler(async (req, res) => {
  const {
    category,
    subCategory,
    pickupLocation,
    quantity,
    scheduledPickupDate,
  } = req.body;

  // Check if category, subCategory, pickupLocation, and scheduledPickupDate are non-empty strings
  if (
    [category, subCategory, pickupLocation, scheduledPickupDate].some(
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

  // Find the scrap based on category and subCategory
  const scrap = await Scrap.findOne({ category, subCategory });
  if (!scrap) {
    throw new ApiError(404, "Scrap category or subcategory not found");
  }

  // Create the new request
  const newRequest = await Request.create({
    requestId,
    userId,
    scrapId: scrap._id,
    pickupLocation,
    quantity,
    scheduledPickupDate,
  });

  // Check if newRequest was created successfully
  if (!newRequest) {
    throw new ApiError(500, "Failed to create new request");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, newRequest, "Your request is created successfully")
    );
});

const getAllRequest = asyncHandler(async (req, res) => {
  // Check if user is a scrap dealer
  const userRole = req.user.role;
  if (userRole !== "dealer") {
    throw new ApiError(
      401,
      "Unauthorized request: Only scrap dealers can access this route"
    );
  }

  // Get all pending requests
  const requests = await Request.find({ status: "pending" })
    .populate("userId", "fullName") // Populate user's full name
    .select(
      "scheduledPickupDate userId scrapId pickupLocation quantity status"
    );

  // Return the response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        requests,
        "All pending requests fetched successfully"
      )
    );
});

export { createRequest, getAllRequest };
