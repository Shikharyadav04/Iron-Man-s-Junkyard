import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getChats } from "../controllers/chat.controller.js";

const router = Router();

router.route("/get-chat").post(verifyJWT, getChats);

export default router;
