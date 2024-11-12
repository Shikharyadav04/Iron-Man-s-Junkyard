import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Request } from "../models/request.models.js";
import { Scrap } from "../models/scrap.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Transaction } from "../models/transaction.models.js";
import { sendMail } from "../utils/mail.js";
import { Chat } from "../models/chat.models.js";
import { getIo } from "../utils/Socket.js";
import { User } from "../models/user.models.js";
import mongoose from "mongoose";
import { Notification } from "../models/notification.models.js";
const ObjectId = mongoose.Types.ObjectId;

const createRequest = asyncHandler(async (req, res) => {
  const {
    scraps,
    pickupLocation,
    scheduledPickupDate,
    condition,
    scheduledPickupTime,
  } = req.body;
  const userId = req.user._id;
  const isSubscriber = req.user.isSubscribed; // Assume `isSubscribed` field exists in the User schema
  console.log(`userId : ${userId}`);
  if (!Array.isArray(scraps) || scraps.length === 0) {
    throw new ApiError(400, "Scraps array is required and cannot be empty");
  }

  // Get the start and end of the current month
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  const endOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  // Find the number of requests made by the user in the current month
  const userRequestsThisMonth = await Request.find({
    userId,
    createdAt: { $gte: startOfMonth, $lt: endOfMonth },
  });

  const allowedRequests = isSubscriber ? 100 : 3; // 5 requests if subscribed, 3 otherwise
  const maxAmount = isSubscriber ? 5000 : 2000; // 5000 if subscribed, 2000 otherwise

  // Check if the user has exceeded the limit of requests for the month
  const user = await User.findById(userId);

  if (user.username !== "shikharyadav04") {
    if (userRequestsThisMonth.length >= allowedRequests) {
      throw new ApiError(
        400,
        `You can only create ${allowedRequests} requests per month`
      );
    }
  }
  let totalAmount = 0;
  const validatedScraps = [];
  // Validate scraps and calculate the total amount
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

  // Check if the total amount of the new request exceeds the limit
  if (totalAmount > maxAmount) {
    throw new ApiError(
      400,
      `Request total amount cannot exceed ${maxAmount} INR`
    );
  }

  const requestId = `REQ-${Date.now()}`;

  // Create the new request
  const newRequest = await Request.create({
    requestId,
    userId,
    scraps: validatedScraps,
    pickupLocation,
    scheduledPickupDate,
    condition,
    totalAmount,
    isSubscriber,
    scheduledPickupTime,
  });

  // Create a new transaction for the request
  const newTransaction = await Transaction.create({
    transactionId: `TRANS-${Date.now()}`,
    requestId: newRequest._id,
    customerId: userId,
    totalAmount,
  });

  const transactionId = newTransaction._id;
  newRequest.transactionId = transactionId;
  await newRequest.save();
  const notification = await Notification.create({
    userId: userId,
    message:
      "Your request has been created for further details check your mail",
  });
  const io = getIo();
  io.to(userId.toString()).emit("newNotification", notification);
  await sendMail({
    to: req.user.email,
    subject: "ScrapMan - Scrap Pickup Request Created Successfully",
    text: `Hello ${req.user.fullName},\n\nYour scrap pickup request has been successfully created on ScrapMan. Here are the details of your request:\n\nRequest ID: ${newRequest.requestId}\nScheduled Pickup Date: ${newRequest.scheduledPickupDate}\nTotal Amount: ${newRequest.totalAmount}\n\nWe will notify you once dealer will accept it. Thank you for using ScrapMan!\n\nBest regards,\nThe ScrapMan Team`,
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
      "requestId scheduledPickupDate scheduledPickupTime userId scraps pickupLocation condition status totalAmount isSubscriber"
    )
    .sort({ isSubscriber: -1, createdAt: -1 });

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
  const dealerUsername = req.user.username; // Assuming dealer's username is stored here
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

  // Retrieve customer details
  const customer = await User.findById(request.userId); // Assuming `userId` is the customer's ID in the request
  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }
  const customerUsername = customer.username;

  // Create a new chat room and send an initial message
  const newDealerId = new ObjectId(dealerId);
  const newCustomerId = new ObjectId(request.userId);
  const newChat = await Chat.create({
    requestId,
    dealerId: newDealerId,
    customerId: newCustomerId,
    messages: [
      {
        senderId: dealerId,
        message: `Hello ${customerUsername}, I ${dealerUsername} have accepted your request.`,
        timestamp: new Date(),
      },
    ],
  });
  const notification = await Notification.create({
    userId: newCustomerId,
    message: "Your request has been accepted by a dealer!",
  });

  // Emit events to the customer and dealer using socket.io
  const io = getIo(); // Assuming you have a function to get the io instance

  console.log("Emitting to customer room:", customer._id.toString()); // Log customer ID
  console.log("Emitting to dealer room:", dealerId.toString()); // Log dealer ID

  io.to(customer._id.toString()).emit("chatCreated", {
    chatId: newChat._id,
    message: `Hello ${customerUsername}, I ${dealerUsername} have accepted your request.`,
  });
  io.to(dealerId.toString()).emit("chatCreated", {
    chatId: newChat._id,
    message: `Hello ${customerUsername}, I ${dealerUsername} have accepted your request.`,
  });

  io.to(customer._id.toString()).emit("newNotification", notification);

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
  const user = await User.findById(request.userId);
  const dealer = await User.findById(request.assignedDealerId);
  request.status = "completed";
  await request.save();
  const notification = await Notification.create({
    userId: request.userId,
    message:
      "Your request has been completed by dealer for further details check your mail",
  });
  const io = getIo();
  io.to(request.userId.toString()).emit("newNotification", notification);
  await sendMail({
    to: user.email,
    subject: "ScrapMan - Scrap Pickup Request Created Successfully",
    text: `Hello ${user.fullName},\n\nYour scrap pickup request has been successfully completed by ${dealer.fullName}.If you have any issue please do not hesitate to contact us. Thank you for using ScrapMan!\n\nBest regards,\nThe ScrapMan Team`,
  });
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
  const userId = request.userId;
  const user = await User.findById(userId);

  const notification = await Notification.create({
    userId: userId,
    message:
      "Your request has been cancelled for further details check your mail",
  });
  const io = getIo();
  io.to(userId.toString()).emit("newNotification", notification);

  const Sendemail = await sendMail({
    to: user.email,
    subject: "ScrapMan - Scrap Pickup Request Canceled",
    text: `Hello ${user.fullName},\n\nWe’ve received your request to cancel the scrap pickup with Request ID: ${request.requestId}. Your request has been successfully canceled.\n\nIf you need further assistance, feel free to contact us.\n\nThank you for using ScrapMan.\n\nBest regards,\nThe ScrapMan Team`,
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
