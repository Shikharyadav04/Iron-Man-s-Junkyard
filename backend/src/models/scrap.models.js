import mongoose, { Schema } from "mongoose";

const predefinedCategorySubcategoryMap = {
  Metals: ["Aluminum", "Copper", "Steel", "Brass"],
  Plastics: ["PET", "HDPE", "PVC", "LDPE"],
  Electronics: [
    "Laptops",
    "Desktops",
    "Computer Accessories",
    "Smartphones",
    "Tablets",
  ],
  Glass: ["Bottles", "Windows", "Jars"],
  Paper: ["Office Paper", "Cardboard Boxes", "Newspaper"],
};

const scrapSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    pricePerUnit: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

scrapSchema.pre("validate", function (next) {
  const selectedCategory = this.category;
  const selectedSubcategory = this.subCategory;

  if (predefinedCategorySubcategoryMap[selectedCategory]) {
    if (
      predefinedCategorySubcategoryMap[selectedCategory].includes(
        selectedSubcategory
      )
    ) {
      next();
    } else {
      next(
        new Error(
          `Invalid subcategory "${selectedSubcategory}" for predefined category "${selectedCategory}".`
        )
      );
    }
  } else {
    next();
  }
});

export const Scrap = mongoose.model("Scrap", scrapSchema);
