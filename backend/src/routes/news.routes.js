import { Router } from "express";

import { getLatestNews } from "../controllers/news.controller.js";

const router = Router();

router.route("/getNews").get(getLatestNews);

export default router;
