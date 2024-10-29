import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const adminAuthentication = asyncHandler(async (req, res, next) => {
  const userRole = req.user.role;
  if (userRole !== "admin") {
    return res.status(403).json({
      message: "Only admins have permission for this feature",
    });
  }

  next();
});
