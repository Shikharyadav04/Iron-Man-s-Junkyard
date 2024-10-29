import mongoose, { Schema } from "mongoose";

const categorySubcategoryMap = {
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
      enum: Object.keys(categorySubcategoryMap), // Main categories as enum
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

// Custom validation to ensure subCategory is valid for the selected category
scrapSchema.pre("validate", function (next) {
  const selectedCategory = this.category;
  const selectedSubcategory = this.subCategory;

  // Check if the subcategory is valid for the chosen category
  if (categorySubcategoryMap[selectedCategory]?.includes(selectedSubcategory)) {
    next(); // If valid, proceed
  } else {
    next(
      new Error(
        `Invalid subcategory "${selectedSubcategory}" for category "${selectedCategory}".`
      )
    );
  }
});

export const Scrap = mongoose.model("Scrap", scrapSchema);
