import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Request } from "../models/request.models.js";
import { Scrap } from "../models/scrap.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Transaction } from "../models/transaction.models.js";

const createRequest = asyncHandler(async (req, res) => {
  const { scraps, pickupLocation, scheduledPickupDate, condition, userId } =
    req.body;
  console.log(`userId : ${userId}`);
  if (!Array.isArray(scraps) || scraps.length === 0) {
    throw new ApiError(400, "Scraps array is required and cannot be empty");
  }
  const requestId = `REQ-${Date.now()}`;
  let totalAmount = 0;
  const validatedScraps = [];

  for (const { category, subCategory, quantity } of scraps) {
    const scrap = await Scrap.findOne({ category, subCategory });
    if (!scrap) {
      throw new ApiError(
        404,
        `Scrap not found for ${category} - ${subCategory}`
      );
    }
    const scrapTotalAmount = scrap.pricePerUnit * quantity;
    totalAmount += scrapTotalAmount;

    validatedScraps.push({
      scrapId: scrap._id,
      category,
      subCategory,
      quantity,
      pricePerUnit: scrap.pricePerUnit,
      scrapTotalAmount,
    });
  }

  const initialPayment = totalAmount * 0.3;
  const newRequest = await Request.create({
    requestId,
    userId,
    scraps: validatedScraps,
    pickupLocation,
    scheduledPickupDate,
    condition,
    totalAmount,
    initialPayment,
  });

  const newTransaction = await Transaction.create({
    transactionId: `TRANS-${Date.now()}`,
    requestId: newRequest._id,
    customerId: userId,
    totalAmount,
    initialPayment,
    remainingAmount: totalAmount - initialPayment,
    payments: [],
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { newRequest, newTransaction },
        "Request created successfully. Please complete the initial payment."
      )
    );
});

const getPendingRequestsWithInitialPayment = asyncHandler(async (req, res) => {
  const requests = await Request.find({
    isInitialPaymentMade: true,
    status: "pending",
  })
    .populate("userId", "fullName")
    .select(
      "requestId scheduledPickupDate userId scraps pickupLocation condition status totalAmount initialPayment"
    );

  res
    .status(200)
    .json(
      new ApiResponse(200, requests, "Pending requests with initial payment.")
    );
});

const acceptRequest = asyncHandler(async (req, res) => {
  const requestId = req.body.requestId;
  if (!requestId) {
    throw new ApiError(400, "Request ID is required");
  }

  const dealerId = req.user._id;
  const request = await Request.findOneAndUpdate(
    {
      requestId: requestId,
      status: "pending",
    },
    {
      status: "accepted",
      assignedDealerId: dealerId,
    },
    {
      new: true,
    }
  );

  if (!request) {
    throw new ApiError(404, "Request not found or already accepted");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        request,
        "Request accepted successfully. You can now proceed with the rest of the payment."
      )
    );
});

const getCompletedPickup = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }
  const completedRequests = await Request.aggregate([
    {
      $match: {
        $or: [{ userId: userId }, { assignedDealerId: userId }],
      },
    },
    {
      $match: {
        status: "completed",
      },
    },
  ]);

  if (!completedRequests) {
    throw new ApiError(404, "No completed requests found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, completedRequests, "Completed pickups."));
});

export {
  createRequest,
  getPendingRequestsWithInitialPayment,
  acceptRequest,
  getCompletedPickup,
};
