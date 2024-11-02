import { Router } from "express";
import {
  createTweet,
  getUserTweets,
  updateTweet,
  deleteTweet,
} from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/add-tweet").post(createTweet);
router.route("/get-user-tweet").get(getUserTweets);
router.route("/delete-tweet").post(deleteTweet);
router.route("/update-tweet").post(updateTweet);

export default router;
