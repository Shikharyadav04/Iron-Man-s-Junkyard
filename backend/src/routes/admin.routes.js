import { Router } from "express";

import {
  addScrap,
  banUser,
  changeScrapPrice,
  getStats,
  getUsers,
} from "../controllers/admin.controller.js";

const router = Router();

router.route("/addScrap").post(addScrap);
router.route("/changeScrapPrice").post(changeScrapPrice);

router.route("/stats").get(getStats);

router.route("/get-users").post(getUsers);
router.route("/ban").post(banUser);
export default router;
