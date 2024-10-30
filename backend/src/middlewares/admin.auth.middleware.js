import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const adminAuthentication = asyncHandler(async (req, res, next) => {
  const userRole = req.user.role;
  if (userRole !== "admin") {
    throw new ApiError(403, "Only admins have permission for this feature");
  }

  next();
});
