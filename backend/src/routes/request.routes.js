import { Router } from "express";
import {
  createRequest,
  getAllRequest,
} from "../controllers/request.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/request-creation").post(verifyJWT, createRequest);

router.route("/get-request").post(verifyJWT, getAllRequest);

export default router;
