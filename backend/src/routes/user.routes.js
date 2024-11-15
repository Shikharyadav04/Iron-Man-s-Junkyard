import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  updateUserAvatar,
  updateUserDetails,
  getCurrentUser,
  changeCurrentPassword,
  acceptDealerRegistration,
  askDealerRegistration,
  getdealerRequests,
  subscribeUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkSubscription } from "../middlewares/subscription.middleware.js";
const router = Router();

// Updated route to handle both file and other fields in form-data
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 }, // Handling avatar uploads
  ]),
  registerUser // Your controller to handle registration
);

// Other routes
router.route("/login").post(checkSubscription, loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refreshToken").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateUserDetails);
// In your user.routes.js
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

router.route("/dealer-request").post(askDealerRegistration);

router.route("/get-dealer-request").get(getdealerRequests);
router.route("/accept-dealer").post(acceptDealerRegistration);

router.route("/verifyjwt").get(verifyJWT);
router.route("/subscribe").post(verifyJWT, subscribeUser);
export default router;
