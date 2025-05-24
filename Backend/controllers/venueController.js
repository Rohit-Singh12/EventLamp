import Venue from "../models/venueModel.js";

// @desc Get all venues
// @route GET /api/venues
export const getVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Create a new venue
// @route POST /api/venues
export const createVenue = async (req, res) => {
  try {
    const {
      name,
      category,
      images,
      capacity,
      price,
      location,
      state,
      pincode,
      address,
      landmark,
      rating,
      description,
      features,
      user,
    } = req.body;

    // Ensure `images` is an array of valid URLs
    const validImageUrls = images.map((image) => {
      if (!image.startsWith("http://localhost:5000/uploads/")) {
        throw new Error("Invalid image URL format");
      }
      return image;
    });

    const newVenue = new Venue({
      name,
      category,
      images: validImageUrls, // Save only valid image URLs
      capacity: Number(capacity),
      price: Number(price),
      location,
      state,
      pincode,
      address,
      landmark,
      rating: Number(rating),
      description,
      features: features.split(",").map((feature) => feature.trim()), // Convert features string to array
      user,
    });

    const savedVenue = await newVenue.save();
    res.status(201).json(savedVenue);
  } catch (error) {
    console.error("Error creating venue:", error);
    res.status(500).json({ message: "Error creating venue", error });
  }
};

// @desc Get a single venue by ID
// @route GET /api/venues/:id
export const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: "Venue not found" });
    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({ message: "Error fetching venue", error });
  }
};

// @desc Update a venue
// @route PUT /api/venues/:id
export const updateVenue = async (req, res) => {
  try {
    const {
      name,
      category,
      images,
      capacity,
      price,
      location,
      state,
      pincode,
      address,
      landmark,
      rating,
      description,
      features,
      user,
    } = req.body;

    // Ensure `images` is an array of valid URLs
    const validImageUrls = images.map((image) => {
      if (!image.startsWith("http://api.eventlamp.com/uploads/")) {
        throw new Error("Invalid image URL format");
      }
      return image;
    });

    const updatedVenue = await Venue.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        images: validImageUrls, // Save only valid image URLs
        capacity: Number(capacity),
        price: Number(price),
        location,
        state,
        pincode,
        address,
        landmark,
        rating: Number(rating),
        description,
        features: features.split(",").map((feature) => feature.trim()), // Convert features string to array
        user,
      },
      { new: true } // Return the updated document
    );

    if (!updatedVenue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    res.status(200).json(updatedVenue);
  } catch (error) {
    console.error("Error updating venue:", error);
    res.status(500).json({ message: "Error updating venue", error });
  }
};

// @desc Delete a venue
// @route DELETE /api/venues/:id
export const deleteVenue = async (req, res) => {
  try {
    const deletedVenue = await Venue.findByIdAndDelete(req.params.id);
    if (!deletedVenue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.status(200).json({ message: "Venue deleted successfully" });
  } catch (error) {
    console.error("Error deleting venue:", error);
    res.status(500).json({ message: "Error deleting venue", error });
  }
};
