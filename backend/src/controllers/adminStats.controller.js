import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { Request } from "../models/request.models.js";

// Stats Endpoints

// 1. Growth Rate
export const getGrowthStats = asyncHandler(async (req, res) => {
  const lastTwoMonths = [
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
    new Date(new Date().setMonth(new Date().getMonth() - 2)),
  ];

  const monthlyGrowth = await Promise.all(
    lastTwoMonths.map(async (date) => {
      return await User.countDocuments({ createdAt: { $gte: date } });
    })
  );

  const growthRate =
    ((monthlyGrowth[0] - monthlyGrowth[1]) / (monthlyGrowth[1] || 1)) * 100;
  return res.status(200).json({ growthRate, monthlyGrowth });
});

// 2. Retention Rate
export const getRetentionStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({
    lastActive: {
      $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    },
  });

  const retentionRate = (activeUsers / totalUsers) * 100;
  return res.status(200).json({ retentionRate, activeUsers });
});

// 3. Request Counts
export const getRequestCounts = asyncHandler(async (req, res) => {
  const requestCounts = await Request.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  return res.status(200).json({ requestCounts });
});

// 4. Conversion Rate
export const getConversionStats = asyncHandler(async (req, res) => {
  const newUsers = await User.countDocuments({
    createdAt: {
      $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    },
  });
  const activeUsers = await User.countDocuments({
    lastActive: {
      $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    },
  });
  const conversionRate = (activeUsers / newUsers) * 100;
  return res.status(200).json({ conversionRate });
});

// 5. Feature Effectiveness
export const getFeatureEffectiveness = asyncHandler(async (req, res) => {
  const featureReleaseDate = new Date("2024-01-01");
  const activeUsersBefore = await User.countDocuments({
    lastActive: { $lte: featureReleaseDate },
  });
  const activeUsersAfter = await User.countDocuments({
    lastActive: { $gte: featureReleaseDate },
  });

  const changeRate =
    ((activeUsersAfter - activeUsersBefore) / (activeUsersBefore || 1)) * 100;
  return res
    .status(200)
    .json({ activeUsersBefore, activeUsersAfter, changeRate });
});

// 6. Peak Usage Times
export const getPeakUsageTimes = asyncHandler(async (req, res) => {
  const usageData = await Request.aggregate([
    { $group: { _id: { $hour: "$createdAt" }, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  return res.status(200).json({ usageData });
});

// 7. Forecasting
export const getForecastStats = asyncHandler(async (req, res) => {
  const usersPerMonth = await User.aggregate([
    { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
  return res.status(200).json({ usersPerMonth });
});

// 8. Demographics
export const getUserDemographics = asyncHandler(async (req, res) => {
  const locationData = await User.aggregate([
    { $group: { _id: "$location", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  return res.status(200).json({ locationData });
});
