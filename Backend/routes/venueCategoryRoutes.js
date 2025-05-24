import express from "express";
import {
  getAllVenueCategories,
  getVenueCategoryById,
  createVenueCategory,
  updateVenueCategory,
  deleteVenueCategory,
} from "../controllers/venueCategoryController.js";

const router = express.Router();

router.get("/", getAllVenueCategories);
router.get("/:id", getVenueCategoryById);
router.post("/", createVenueCategory);
router.put("/:id", updateVenueCategory);
router.delete("/:id", deleteVenueCategory);

export default router;
