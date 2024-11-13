import mongoose from "mongoose";
const { Schema } = mongoose;

const feedbackSchema = new Schema(
  {
    message: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  },
  { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
