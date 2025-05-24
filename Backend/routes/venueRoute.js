import express from "express";
import {
  getVenues,
  createVenue,
  getVenueById,
  updateVenue,
  deleteVenue,
} from "../controllers/venueController.js";

const router = express.Router();

router.get("/", getVenues);
router.post("/", createVenue);
router.get("/:id", getVenueById);
router.put("/:id", updateVenue);
router.delete("/:id", deleteVenue);

export default router;
