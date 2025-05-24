import express from "express";
import {
  getAvailabilityByMonth,
  setAvailability,
} from "../controllers/availabilityController.js";

const router = express.Router();

// Fetch availability for a specific month
router.get("/:partyPlotId/:year/:month", getAvailabilityByMonth);

// Set availability for a month
router.post("/set", setAvailability);

export default router;
