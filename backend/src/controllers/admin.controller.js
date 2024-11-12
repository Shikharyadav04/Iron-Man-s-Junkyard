import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Scrap } from "../models/scrap.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { Request } from "../models/request.models.js";
import { response } from "express";
const addScrap = asyncHandler(async (req, res) => {
  //take info form body
  //validate
  //check if scrap already exists
  //create new scrap
  //return response

  const { category, subCategory, pricePerUnit } = req.body;

  if (
    [category, subCategory, pricePerUnit].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const scrap = await Scrap.findOne({ subCategory });

  if (scrap) {
    throw new ApiError(400, "Scrap already exists");
  }

  const newScrap = await Scrap.create({
    category,
    subCategory,
    pricePerUnit,
  });

  if (!newScrap) {
    throw new ApiError(500, "Failed to create new scrap");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newScrap, "Scrap added successfully"));
});

const changeScrapPrice = asyncHandler(async (req, res) => {
  //get scrap category and sub category
  //get new price
  //validate if values given or not
  //check if scrap exist or not
  //update scrap price
  //return response

  const { scrapCategory, scrapSubCategory, newPrice } = req.body;

  // console.log(
  //   `Scrap category : ${scrapCategory} and sub category : ${scrapSubCategory}`
  // );

  if (!scrapCategory || !scrapSubCategory) {
    throw new ApiError(400, "Please provide scrap category and sub category");
  }

  const scrap = await Scrap.findOne({
    category: scrapCategory,
    subCategory: scrapSubCategory,
  });

  if (!scrap) {
    throw new ApiError(404, "Scrap not found");
  }

  scrap.pricePerUnit = newPrice;
  await scrap.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, scrap, "Scrap price updated successfully"));
});

const getStats = asyncHandler(async (req, res) => {
  const usersThisMonth = await User.countDocuments({
    createdAt: {
      $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    },
  });

  const requestCounts = await Request.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const activeUsers = await User.countDocuments({
    lastActive: {
      $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { usersThisMonth, requestCounts, activeUsers },
        "Stats fetched successfully"
      )
    );
});

const getUsers = asyncHandler(async (req, res) => {
  const { username, email, role, isSubscribed } = req.body;
  console.log(req.body);

  if (!username && !email && !role && !isSubscribed) {
    throw new ApiError(400, "Please provide at least one user field");
  }
  const matchCriteria = {};
  if (username) matchCriteria.username = username;
  if (email) matchCriteria.email = email;
  if (role) matchCriteria.role = role;
  if (isSubscribed !== undefined) matchCriteria.isSubscribed = isSubscribed;
  matchCriteria.isbanned = false;
  const users = await User.aggregate([{ $match: matchCriteria }]);

  return res
    .status(200)
    .json(new ApiResponse(200, users, "User fetched successfully"));
});
const banUser = asyncHandler(async (req, res) => {
  const { username } = req.body;
  if (!username) {
    throw new ApiError(400, "Please provide a username");
  }

  const user = await User.findOneAndUpdate(
    { username: username },
    { isbanned: true }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User banned successfully"));
});
export { addScrap, changeScrapPrice, getStats, getUsers, banUser };
