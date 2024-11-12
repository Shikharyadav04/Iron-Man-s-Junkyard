import { Router } from "express";

import {
  addScrap,
  changeScrapPrice,
  getStats,
} from "../controllers/admin.controller.js";

const router = Router();

router.route("/addScrap").post(addScrap);
router.route("/changeScrapPrice").post(changeScrapPrice);

router.route("/stats").get(getStats);
export default router;
