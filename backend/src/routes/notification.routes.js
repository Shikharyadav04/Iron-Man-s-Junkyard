import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  markAllAsRead,
  getNotifications,
} from "../controllers/notification.controller.js";
const router = express.Router();

router.route("/get-notifications").get(verifyJWT, getNotifications);

// Route to mark all notifications as read
router.route("/mark-all-read").put(verifyJWT, markAllAsRead);
export default router;
