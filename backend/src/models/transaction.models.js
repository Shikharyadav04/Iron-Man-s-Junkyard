import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    requestId: {
      type: mongoose.Schema.ObjectId,
      ref: "Request",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    dealerId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    scrapDetails: [
      {
        scrapId: {
          type: mongoose.Schema.ObjectId,
          ref: "Scrap",
          required: true,
        },
        scrapQuantity: {
          type: Number,
          required: true,
        },
      },
    ],
    subTotal: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    tax: {
      type: Number,
      required: true,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "upi"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
