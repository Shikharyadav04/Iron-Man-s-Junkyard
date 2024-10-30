
import { Router } from "express"
import { Feedback } from "../models/feedback.models.js"; // Adjust path as needed

const router = Router();

// POST feedback
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
    res.status(201).json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    res.status(500).json({ error: "Error submitting feedback" });
  }
});

export default router;
