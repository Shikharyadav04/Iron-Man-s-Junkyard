import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { adminAuthentication } from "../middlewares/admin.auth.middleware.js";
import {
  addScrap,
  changeScrapPrice,
  getStats,
} from "../controllers/admin.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/addScrap").post(addScrap);
router
  .route("/changeScrapPrice")
<<<<<<< HEAD
  .post( changeScrapPrice);

=======
  .post(verifyJWT, adminAuthentication, upload.none(), changeScrapPrice);
router.route("/stats").get(getStats);
>>>>>>> a65260f780562e5e95f9a43da80a9cd6c9405954
export default router;
