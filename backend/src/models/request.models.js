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
    scrapId: {
      type: mongoose.Schema.ObjectId,
      ref: "Scrap",
      required: true,
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "in-progress", "completed", "canceled"],
      default: "pending",
    },
    assignedDealerId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    scheduledPickupDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Request = mongoose.model("Request", requestSchema);
