import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema(
  {
    requestId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    scraps: [
      {
        scrapId: {
          type: mongoose.Schema.ObjectId,
          ref: "Scrap",
          required: true,
        },
        category: { type: String, required: true },
        subCategory: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    pickupLocation: {
      type: String,
      required: true,
    },
    scheduledPickupDate: {
      type: Date,
    },
    condition: {
      type: String,
      enum: ["Good", "Old", "Damaged"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "completed", "canceled"],
      default: "pending",
    },
    assignedDealerId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
    },
    isSubscriber: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Request = mongoose.model("Request", requestSchema);
