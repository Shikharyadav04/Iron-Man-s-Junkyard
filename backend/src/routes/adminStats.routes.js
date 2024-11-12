import express from "express";
import {
  getGrowthStats,
  getRetentionStats,
  getRequestCounts,
  getConversionStats,
  getFeatureEffectiveness,
  getPeakUsageTimes,
  getForecastStats,
  getUserDemographics
} from "../controllers/adminStats.controller.js";

const router = express.Router();

router.get("/growth-stats", getGrowthStats);
router.get("/retention-stats", getRetentionStats);
router.get("/request-counts", getRequestCounts);
router.get("/conversion-stats", getConversionStats);
router.get("/feature-effectiveness", getFeatureEffectiveness);
router.get("/peak-usage-times", getPeakUsageTimes);
router.get("/forecast-stats", getForecastStats);
router.get("/user-demographics", getUserDemographics);

export default router;
