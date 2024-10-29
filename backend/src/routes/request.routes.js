import { Router } from "express";
import { createRequest } from "../controllers/request.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/request-creation").post(verifyJWT, createRequest);

export default router;
