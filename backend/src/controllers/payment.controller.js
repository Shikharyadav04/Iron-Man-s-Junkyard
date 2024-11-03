import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Request } from "../models/request.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Transaction } from "../models/transaction.models.js";

// TODO: frontend to automatically fetch amount

const completePayment = asyncHandler(async (req, res) => {
  const { requestId, paymentMethod } = req.body;

  // Validate inputs
  if (!requestId) {
    throw new ApiError(400, "Request ID not found");
  }
  if (!paymentMethod) {
    throw new ApiError(400, "Payment method is required");
  }

  // Find and update the transaction in a single operation
  const transaction = await Transaction.findOneAndUpdate(
    { requestId },
    {
      $set: {
        isCompleted: true,
        completedAt: Date.now(),
        paymentMethod: paymentMethod, // Optionally store payment method
      },
    },
    { new: true }
  );

  if (!transaction) {
    throw new ApiError(404, "Transaction not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, transaction, "Payment completed successfully"));
});

export { completePayment };
