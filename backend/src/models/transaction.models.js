import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    transactionId: String,
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Request" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dealerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    totalAmount: Number,
    initialPayment: Number,
    remainingAmount: Number,
    payments: [
      {
        amount: Number,
        paymentMethod: String,
        paymentStatus: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
