// routes/feedbackRoutes.js
import express from "express";
import { Feedback } from "../models/feedback.models.js"; // Adjust the import path as needed

const router = express.Router();

// Route to submit feedback
router.post("/", async (req, res) => {
  const { transactionId, customerId, message, rating } = req.body;

  try {
    const feedback = new Feedback({
      transactionId,
      customerId,
      message,
      rating,
    });

    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get feedback by transaction ID
router.get("/:transactionId", async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ transactionId: req.params.transactionId });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
