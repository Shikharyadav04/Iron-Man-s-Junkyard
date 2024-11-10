import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  sendMessage,
  getChatMessages,
  getChatRooms,
} from "../controllers/chat.controller.js";

const router = Router();

router.route("/rooms").get(verifyJWT, getChatRooms);
router.route("/:chatId/messages").get(verifyJWT, getChatMessages);
router.route("/:chatId/message").post(verifyJWT, sendMessage);

export default router;
