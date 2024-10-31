import { Router } from "express";
import {
  createRequest,
  acceptRequest,
  getPendingRequestsWithInitialPayment,
  InitialPayment,
  completePayment, // Import the new function
} from "../controllers/request.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { dealerAuthentication } from "../middlewares/dealer.auth.middleware.js";

const router = Router();

// Route for creating a new request
router.route("/request-creation").post(verifyJWT, upload.none(), createRequest);

// Route for accepting a request
router
  .route("/accept-request")
  .post(verifyJWT, dealerAuthentication, acceptRequest);

// New route for getting pending requests with paid initial payment
router
  .route("/get-pending-initial-payment")
  .get(verifyJWT, dealerAuthentication, getPendingRequestsWithInitialPayment);

router.route("/complete-initial-payment").post(verifyJWT, InitialPayment);

router.route("/complete-payment").post(verifyJWT, completePayment);

export default router;
