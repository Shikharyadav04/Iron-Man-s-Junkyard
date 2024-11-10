import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getCustomerChats,
  getDealerChats,
} from "../controllers/chat.controller.js";

const router = Router();

router.route("/get-chats-for-dealer").post(verifyJWT, getDealerChats);
router.route("/get-chats-for-customer").post(verifyJWT, getCustomerChats);

export default router;
