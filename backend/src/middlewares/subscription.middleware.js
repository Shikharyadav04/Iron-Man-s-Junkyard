import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
export const checkSubscription = async (req, res, next) => {
  const { identifier } = req.body;

  if (!identifier) {
    throw new ApiError(401, "User not authenticated");
  }

  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });
  const currentDate = new Date();
  if (user.isSubscribed && user.subscriptionEndDate <= currentDate) {
    user.isSubscribed = false;
    await user.save();
  }
  console.log("checkSubscription checked : ");
  next();
};
