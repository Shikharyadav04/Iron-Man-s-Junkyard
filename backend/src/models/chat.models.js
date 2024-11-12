import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
  requestId: { type: String, required: true },
  dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      senderName: String,
      message: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export const Chat = mongoose.model("Chat", chatSchema);
