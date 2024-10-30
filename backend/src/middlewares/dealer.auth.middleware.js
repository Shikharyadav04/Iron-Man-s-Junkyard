import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const dealerAuthentication = asyncHandler(async (req, res, next) => {
  const userRole = req.user.role;
  if (userRole !== "dealer") {
    throw new ApiError(
      401,
      "Unauthorized request: Only scrap dealers can access this route"
    );
  }

  next();
});
