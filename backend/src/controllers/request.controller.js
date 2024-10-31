import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Request } from "../models/request.models.js";
import { Scrap } from "../models/scrap.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createRequest = asyncHandler(async (req, res) => {
  const { scraps, pickupLocation, scheduledPickupDate, condition } = req.body;

  // Validate the required fields
  if (!Array.isArray(scraps) || scraps.length === 0) {
    throw new ApiError(400, "Scraps array is required and cannot be empty");
  }

  const userId = req.user._id;
  const requestId = `REQ-${Date.now()}`;

  // Fetch scrap details and validate each item
  const validatedScraps = [];
  for (const { category, subCategory, quantity } of scraps) {
    if (
      typeof category !== "string" ||
      typeof subCategory !== "string" ||
      typeof quantity !== "number" ||
      quantity <= 0
    ) {
      throw new ApiError(400, "Invalid data in scraps array");
    }

    // Find scrap by category and subCategory
    const scrap = await Scrap.findOne({ category, subCategory });
    if (!scrap) {
      throw new ApiError(
        404,
        `Scrap with category ${category} and subCategory ${subCategory} not found`
      );
    }

    validatedScraps.push({
      scrapId: scrap._id,
      category,
      subCategory,
      quantity,
    });
  }

  // Create the new request
  const newRequest = await Request.create({
    requestId,
    userId,
    scraps: validatedScraps,
    pickupLocation,
    scheduledPickupDate,
    condition,
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

const getAllRequest = asyncHandler(async (req, res) => {
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

const acceptRequest = asyncHandler(async (req, res) => {
  const requestId = req.body.requestId;
  if (!requestId) {
    throw new ApiError(400, "Request ID is required");
  }
  console.log("Request ID:", requestId);

  const dealerId = req.user._id;

  const request = await Request.findOne({ _id: requestId });

  if (!request) {
    throw new ApiError(404, "Request not found");
  }

  if (request.status !== "pending") {
    throw new ApiError(400, "This request is already accepted or rejected");
  }

  request.assignedDealerId = dealerId;
  request.status = "accepted";

  await request.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        request,
        "Request accepted successfully. You are now assigned to this request"
      )
    );
});

export { createRequest, getAllRequest, acceptRequest };
