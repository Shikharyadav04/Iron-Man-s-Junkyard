import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
  requestId: { type: String, required: true },
  dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  messages: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      message: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export const Chat = mongoose.model("Chat", chatSchema);
