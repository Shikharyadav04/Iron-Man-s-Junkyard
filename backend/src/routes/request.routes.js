import { Router } from "express";
import {
  createRequest,
  acceptRequest,
  getPendingRequest,
  getCompletedPickup,
  closeRequest,
  getUserRequest,
  getAcceptedRequest,
  cancelRequest,
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
  .route("/get-pending-request")
  .post(verifyJWT, dealerAuthentication, getPendingRequest);

router.route("/get-completed-pickup").post(verifyJWT, getCompletedPickup);
router
 .route("/close-request")
 .post(verifyJWT, dealerAuthentication, closeRequest);

router.route("/get-user-request").post(verifyJWT, getUserRequest);

router.route("/get-accepted-request").post(verifyJWT, getAcceptedRequest);

router.route("/cancel-request").post(cancelRequest);

export default router;
