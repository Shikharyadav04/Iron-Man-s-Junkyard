import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { adminAuthentication } from "../middlewares/admin.auth.middleware.js";
import { addScrap } from "../controllers/admin.controller.js";

const router = Router();

router.route("/addScrap").post(verifyJWT, adminAuthentication, addScrap);

export default router;
