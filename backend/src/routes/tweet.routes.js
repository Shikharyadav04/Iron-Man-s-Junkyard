import { Router } from "express";
import {
  createTweet,
  getUserTweets,
  updateTweet,
  deleteTweet,
  getAllTweets,
} from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/add-tweet").post(verifyJWT, createTweet);
router.route("/get-user-tweet").get(verifyJWT, getUserTweets);
router.route("/delete-tweet").post(verifyJWT, deleteTweet);
router.route("/update-tweet").post(verifyJWT, updateTweet);
router.route("/get-all-tweets").get(verifyJWT, getAllTweets);

export default router;
