import express from "express";
const router = express.Router();

import {
  createSlider,
  getAllSliders,
  getSliderById,
  updateSlider,
  deleteSlider,
} from "../controllers/sliderController.js"; // ✅ Add .js at the end

router.post("/", createSlider);
router.get("/", getAllSliders);
router.get("/:id", getSliderById);
router.put("/:id", updateSlider);
router.delete("/:id", deleteSlider);

export default router;
