import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Request } from "../models/request.models.js";
import { Scrap } from "../models/scrap.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Transaction } from "../models/transaction.models.js";
import { sendMail } from "../utils/mail.js";
import { Chat } from "../models/chat.models.js";
import { getIo } from "../utils/Socket.js";
const createRequest = asyncHandler(async (req, res) => {
  const { scraps, pickupLocation, scheduledPickupDate, condition } = req.body;
  const userId = req.user._id;
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
  const newRequest = await Request.create({
    requestId,
    userId,
    scraps: validatedScraps,
    pickupLocation,
    scheduledPickupDate,
    condition,
    totalAmount,
  });

  const newTransaction = await Transaction.create({
    transactionId: `TRANS-${Date.now()}`,
    requestId: newRequest._id,
    customerId: userId,
    totalAmount,
  });

  const transactionId = newTransaction._id;
  newRequest.transactionId = transactionId;
  await newRequest.save();
  const Sendemail = await sendMail({
    to: req.user.email,
    subject: "ScrapMan - Scrap Pickup Request Created Successfully",
    text: `Hello ${req.user.fullName},\n\nYour scrap pickup request has been successfully created on ScrapMan. Here are the details of your request:\n\nRequest ID: ${newRequest.requestId}\nScheduled Pickup Date: ${newRequest.scheduledPickupDate}\nTotal Amount: ${newRequest.totalAmount}\n\nWe will notify you once your pickup has been scheduled. Thank you for using ScrapMan!\n\nBest regards,\nThe ScrapMan Team`,
  });
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { newRequest, newTransaction },
        "Request created successfully"
      )
    );
});

const getPendingRequest = asyncHandler(async (req, res) => {
  const requests = await Request.find({
    status: "pending",
  })
    .populate("userId", "fullName")
    .select(
      "requestId scheduledPickupDate userId scraps pickupLocation condition status totalAmount"
    )
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(
      new ApiResponse(200, requests, "Pending requests with initial payment.")
    );
});

const acceptRequest = asyncHandler(async (req, res) => {
  const requestId = req.body.requestId;
  console.log(`requestId : ${requestId}`);
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

  // Ensure dealerId and customerId are ObjectId types for MongoDB
  const newChat = await Chat.create({
    requestId,
    dealerId: mongoose.Types.ObjectId(dealerId),
    customerId: mongoose.Types.ObjectId(request.userId), // Ensure ObjectId
    messages: [],
  });

  const io = getIo(); // Access the io instance

  // Emit events using io
  io.to(request.userId.toString()).emit("chatCreated", { requestId, dealerId });
  io.to(dealerId.toString()).emit("chatCreated", { requestId, dealerId });

  res
    .status(200)
    .json(new ApiResponse(200, request, "Request accepted successfully"));
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
  ]).sort({ createdAt: -1 });

  if (!completedRequests) {
    throw new ApiError(404, "No completed requests found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, completedRequests, "Completed pickups."));
});

const closeRequest = asyncHandler(async (req, res) => {
  //get request Id from user
  //find the request
  //check if transactions is completed or not
  //if not throw error
  //update the request status to completed
  //return response

  const transactionId = req.body.transactionId;
  console.log(transactionId);
  if (!transactionId) {
    throw new ApiError(400, "Transaction ID is required");
  }

  const request = await Request.findOne({
    transactionId: transactionId,
  });

  if (!request) {
    throw new ApiError(404, "Request not found");
  }
  if (request.status === "completed") {
    throw new ApiError(400, "Request is already closed");
  }
  const requestId = request.requestId;

  const transaction = await Transaction.findById(transactionId);

  if (!transaction) {
    throw new ApiError(404, "Transaction not found");
  }

  if (transaction.isCompleted !== true) {
    throw new ApiError(
      400,
      "Transactions are not completed please complete your payment"
    );
  }

  request.status = "completed";
  await request.save();

  return res
    .status(200)
    .json(new ApiResponse(200, request, "Request closed successfully"));
});

const getUserRequest = asyncHandler(async (req, res) => {
  //get user Id from request
  //find all requests of user
  //return response
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }
  const requests = await Request.find({
    userId: userId,
  }).sort({ createdAt: -1 });
  if (!requests) {
    throw new ApiError(404, "No requests found");
  }
  return res.status(200).json(new ApiResponse(200, requests, "User requests."));
});

const getAcceptedRequest = asyncHandler(async (req, res) => {
  //get userId
  //apply aggregation pipelines to find the request
  //if not found the throw error
  // return response
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  const acceptedRequest = await Request.aggregate([
    {
      $match: {
        $or: [{ userId: userId }, { assignedDealerId: userId }],
      },
    },
    {
      $match: {
        status: "accepted",
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);

  if (!acceptedRequest) {
    throw new ApiError(404, "No accepted requests found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, acceptedRequest, "User's accepted requests."));
});

const cancelRequest = asyncHandler(async (req, res) => {
  console.log("Cancelled request received");
  console.log("Request body:", req.body); // Log entire req.body to inspect

  const { requestId } = req.body; // Update this line to destructure directly from req.body
  if (!requestId) {
    throw new ApiError(400, "Request ID is required");
  }

  // Continue with your existing logic
  const request = await Request.findOne({ requestId });
  if (!request) {
    throw new ApiError(404, "Request not found");
  }
  if (request.status === "completed" || request.status === "canceled") {
    throw new ApiError(400, `Request is already ${request.status}`);
  }

  request.status = "canceled";
  await request.save();
  const Sendemail = await sendMail({
    to: req.user.email,
    subject: "ScrapMan - Scrap Pickup Request Canceled",
    text: `Hello ${req.user.fullName},\n\nWe’ve received your request to cancel the scrap pickup with Request ID: ${request.requestId}. Your request has been successfully canceled.\n\nIf you need further assistance, feel free to contact us.\n\nThank you for using ScrapMan.\n\nBest regards,\nThe ScrapMan Team`,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, request, "Request canceled successfully"));
});

export {
  createRequest,
  getPendingRequest,
  acceptRequest,
  getCompletedPickup,
  closeRequest,
  getUserRequest,
  getAcceptedRequest,
  cancelRequest,
};
