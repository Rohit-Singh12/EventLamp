import Booking from "../models/Booking.js";
import Venue from "../models/venueModel.js";

// Create a new booking with multiple dates
export const createBooking = async (req, res) => {
  try {
    const { userId, venueId, dates } = req.body;

    // Check if the venue exists
    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    // Check if all selected dates are available
    for (const date of dates) {
      const existingBooking = await Booking.findOne({
        venueId,
        dates: date,
        status: { $ne: "cancelled" }, // Ignore cancelled bookings
      });
      if (existingBooking) {
        return res.status(400).json({
          message: `Date ${date.toISOString().split("T")[0]} is already booked`,
        });
      }
    }

    // Create the booking with multiple dates
    const booking = new Booking({ userId, venueId, dates });
    await booking.save();

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};

// Update booking status (for owner)
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Update booking status
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking status updated", booking });
  } catch (error) {
    res.status(500).json({ message: "Error updating booking status", error });
  }
};

// Cancel a booking (for user)
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Cancel the booking
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "cancelled" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling booking", error });
  }
};

// Get all bookings for a user
export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ userId }).populate("venueId");

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user bookings", error });
  }
};

// Get all bookings for a venue (for owner)
export const getVenueBookings = async (req, res) => {
  try {
    const { venueId } = req.params;

    const bookings = await Booking.find({ venueId }).populate("userId");

    res.status(200).json({ bookings });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error fetching venue bookings", error });
  }
};

// Get all bookings (with optional filters for user or venue)
export const getAllBookings = async (req, res) => {
  try {
    const { userId, venueId } = req.query;

    // Build the query based on filters
    const query = {};
    if (userId) query.userId = userId;
    if (venueId) query.venueId = venueId;

    // Fetch bookings with optional filters
    const bookings = await Booking.find(query)
      .populate("userId")
      .populate("venueId");

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching all bookings", error });
  }
};
