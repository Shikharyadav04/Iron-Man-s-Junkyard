import { Router } from "express";
import {
  createRequest,
  getAllRequest,
} from "../controllers/request.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { dealerAuthentication } from "../middlewares/dealer.auth.middleware.js";
const router = Router();

router.route("/request-creation").post(verifyJWT, upload.none(), createRequest);

router
  .route("/get-request")
  .post(verifyJWT, dealerAuthentication, getAllRequest);

export default router;
