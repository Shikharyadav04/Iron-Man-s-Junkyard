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
      enum: ["Metals", "Plastics", "Electronics", "Glass", "Paper"],
    },
    subCategory: {
      type: String,
      required: true,
      enum: Object.keys(categorySubcategoryMap),
    },
    pricePerUnit: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      enum: ["new", "old", "damaged"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Validation to check if the selected subcategory is valid for the chosen category
scrapSchema.pre("validate", function (next) {
  const selectedCategory = this.category;
  const selectedSubcategory = this.subcategory;

  // Check if the subcategory is allowed for the category
  if (categorySubcategoryMap[selectedCategory]?.includes(selectedSubcategory)) {
    next(); // If valid, proceed to save
  } else {
    // If invalid, throw an error
    next(
      new Error(
        `Invalid subcategory "${selectedSubcategory}" for category "${selectedCategory}".`
      )
    );
  }
});

export const Scrap = mongoose.model("Scrap", scrapSchema);
