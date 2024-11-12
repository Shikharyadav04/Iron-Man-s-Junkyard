import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { completePayment } from "../controllers/payment.controller.js";

const router = Router();

router.route("/complete-payment").post( completePayment);


export default router;
