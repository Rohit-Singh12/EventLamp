import express from "express";
import {
  createBooking,
  updateBookingStatus,
  cancelBooking,
  getUserBookings,
  getVenueBookings,
  getAllBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

// Create a new booking
router.post("/", createBooking);

// Update booking status
router.patch("/:bookingId/status", updateBookingStatus);

// Cancel a booking
router.patch("/:bookingId/cancel", cancelBooking);

// Get all bookings for a user
router.get("/user/:userId", getUserBookings);

// Get all bookings for a venue
router.get("/venue/:venueId", getVenueBookings);

// Get all bookings (with optional filters)
router.get("/", getAllBookings);

export default router;
