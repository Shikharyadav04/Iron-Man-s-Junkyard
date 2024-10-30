import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Scrap } from "../models/scrap.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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

export { addScrap, changeScrapPrice };
