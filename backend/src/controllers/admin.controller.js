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

export { addScrap };
