import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  InitialPayment,
  completePayment,
} from "../controllers/payment.controller.js";

const router = Router();

router.route("/complete-initial-payment").post(verifyJWT, InitialPayment);

router.route("/complete-payment").post(verifyJWT, completePayment);

export default router;
