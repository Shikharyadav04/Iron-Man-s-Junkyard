import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Tweet = mongoose.model("Tweet", tweetSchema);
