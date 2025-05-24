import VenueCategory from "../models/VenueCategory.js";

// GET all
export const getAllVenueCategories = async (req, res) => {
  try {
    const categories = await VenueCategory.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET one
export const getVenueCategoryById = async (req, res) => {
  try {
    const category = await VenueCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Not found" });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// CREATE
export const createVenueCategory = async (req, res) => {
  try {
    const { name, icon, color } = req.body;
    const newCategory = new VenueCategory({ name, icon, color });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
};

// UPDATE
export const updateVenueCategory = async (req, res) => {
  try {
    const { name, icon, color } = req.body;
    const updated = await VenueCategory.findByIdAndUpdate(
      req.params.id,
      { name, icon, color },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: "Update failed" });
  }
};

// DELETE
export const deleteVenueCategory = async (req, res) => {
  try {
    const deleted = await VenueCategory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};
