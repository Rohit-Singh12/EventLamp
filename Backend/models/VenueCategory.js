import mongoose from "mongoose";

const venueCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String, // You can store icon class name or URL
    required: true,
  },
  color: {
    type: String, // Tailwind or HEX color
    required: true,
  },
});

const VenueCategory = mongoose.model("VenueCategory", venueCategorySchema);
export default VenueCategory;
