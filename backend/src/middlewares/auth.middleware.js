import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("AccessToken Cookie:", req.cookies?.accessToken);
    console.log("Authorization Header:", req.header("Authorization"));
    console.log("Token received:", token); // Check if token is retrieved

    if (!token || typeof token !== "string") {
      throw new ApiError(401, "Unauthorized request: Token missing or invalid");
    }

    // Verify token and ensure ACCESS_TOKEN_SECRET is defined and correct
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log("Decoded Token:", decodedToken); // Debugging line

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Unauthorized request: User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    // console.error("Error verifying token:", error);
    throw new ApiError(400, error?.message || "Can't verify token");
  }
});
