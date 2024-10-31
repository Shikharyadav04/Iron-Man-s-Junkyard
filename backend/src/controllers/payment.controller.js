import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Request } from "../models/request.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Transaction } from "../models/transaction.models.js";

//TODO:: frontend to automatically fetch amount

const completePayment = asyncHandler(async (req, res) => {
  const { requestId, amount, paymentMethod } = req.body;

  // Validate inputs
  if (!requestId || !amount || !paymentMethod) {
    throw new ApiError(
      400,
      "Request ID, amount, and payment method are required"
    );
  }

  const request = await Request.findOne({ requestId: requestId });

  if (!request) {
    throw new ApiError(404, "Request not found");
  }
  console.log(request._id.toString());
  const transaction = await Transaction.findOne({
    requestId: request._id.toString(),
  });

  if (!transaction) {
    throw new ApiError(404, "Transaction not found");
  }

  const finalPayment = {
    amount,
    paymentMethod,
    paymentStatus: "paid",
    paymentDate: new Date(),
  };

  transaction.payments.push(finalPayment);
  transaction.remainingAmount -= amount;

  if (transaction.remainingAmount <= 0) {
    request.status = "completed";
    request.isCompleted = true;
  }

  await transaction.save();
  await request.save();

  return res
    .status(200)
    .json(new ApiResponse(200, transaction, "Payment completed successfully"));
});

const InitialPayment = asyncHandler(async (req, res) => {
  const { transactionId, paymentDetails } = req.body;
  if (!transactionId || !paymentDetails) {
    throw new ApiError(400, "Transaction ID and payment details are required");
  }

  const transaction = await Transaction.findOne({ transactionId });
  if (!transaction) {
    throw new ApiError(404, "Transaction not found");
  }

  transaction.payments.push(paymentDetails);
  transaction.remainingAmount -= paymentDetails.amount;

  const isInitialPaymentCompleted =
    paymentDetails.amount >= transaction.initialPayment;

  if (isInitialPaymentCompleted) {
    const request = await Request.findById(transaction.requestId);
    request.isInitialPaymentMade = true;
    await request.save();
  }

  await transaction.save();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { transaction },
        "Initial payment completed successfully."
      )
    );
});

export { completePayment, InitialPayment };
