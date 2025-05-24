import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the venue
  category: { type: String, required: true }, // Category (e.g., Conference Hall, Wedding Venue)
  images: { type: [String], required: true }, // Array of image URLs
  capacity: { type: Number, required: true }, // Maximum capacity of the venue
  price: { type: Number, required: true }, // Price per day or event
  location: { type: String, required: false, default: "" }, // General location (e.g., City, Area)
  state: { type: String, required: true }, // State of the venue
  pincode: { type: String, required: true }, // Pincode of the venue's location
  address: { type: String, required: true }, // Full address of the venue
  landmark: { type: String, required: true }, // Nearby landmark
  rating: { type: Number, default: 0 }, // Average rating (0 by default)
  description: { type: String, required: true }, // Detailed description of the venue
  features: { type: [String], required: true }, // Array of features (e.g., Wi-Fi, Parking)
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: "User", // Name of the User model
    required: true, // Venue must have a user (owner)
  },
});

const Venue = mongoose.model("Venue", venueSchema);

export default Venue;
