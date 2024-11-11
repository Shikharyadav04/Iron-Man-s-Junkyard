import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { adminAuthentication } from "../middlewares/admin.auth.middleware.js";
import { addScrap, changeScrapPrice } from "../controllers/admin.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/addScrap").post(addScrap);
router
  .route("/changeScrapPrice")
  .post( changeScrapPrice);

export default router;
