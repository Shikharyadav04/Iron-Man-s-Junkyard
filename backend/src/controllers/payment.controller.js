import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Transaction } from "../models/transaction.models.js";
import mongoose from "mongoose";
// TODO: frontend to automatically fetch amount

const completePayment = asyncHandler(async (req, res) => {
  const { transactionId, paymentMethod } = req.body;
  // Validate inputs
  console.log(
    `TransactionId: ${transactionId} paymentMethod: ${paymentMethod}`
  );
  if (!transactionId) {
    throw new ApiError(400, "Transaction ID not found");
  }
  if (!paymentMethod) {
    throw new ApiError(400, "Payment method is required");
  }

  const transaction = await Transaction.findById(transactionId);

  if (!transaction) {
    throw new ApiError(404, "Transaction not found");
  }
  if (transaction.isCompleted == true) {
    throw new ApiError(
      400,
      "Payment has already been completed please close the request"
    );
  }

  transaction.isCompleted = true;
  transaction.completedAt = Date.now();
  transaction.paymentMethod = paymentMethod;

  await transaction.save();

  return res
    .status(200)
    .json(new ApiResponse(200, transaction, "Payment completed successfully"));
});

export { completePayment };
