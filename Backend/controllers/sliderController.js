import Slider from "../models/Slider.js";

export const createSlider = async (req, res) => {
  try {
    const slider = await Slider.create(req.body);
    res.status(201).json(slider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSliders = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.status(200).json(sliders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSliderById = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    if (!slider) return res.status(404).json({ message: "Slider not found" });
    res.status(200).json(slider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSlider = async (req, res) => {
  try {
    const slider = await Slider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!slider) return res.status(404).json({ message: "Slider not found" });
    res.status(200).json(slider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findByIdAndDelete(req.params.id);
    if (!slider) return res.status(404).json({ message: "Slider not found" });
    res.status(200).json({ message: "Slider deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
