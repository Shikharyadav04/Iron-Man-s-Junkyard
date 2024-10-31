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
      required: true,
    },
    condition: {
      type: String,
      enum: ["good", "old", "damaged"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "in-progress", "completed", "canceled"],
      default: "pending",
    },
    assignedDealerId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    isInitialPaymentMade: {
      // New field to indicate if the initial payment is made
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Request = mongoose.model("Request", requestSchema);
