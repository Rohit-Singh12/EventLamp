import mongoose from "mongoose";
const AvailabilitySchema = new mongoose.Schema({
  partyPlotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number, // 0 for January, 1 for February, etc.
    required: true,
  },
  dates: [
    {
      date: { type: String, required: true }, // Format: "YYYY-MM-DD"
      isAvailable: { type: Boolean, default: true },
      isBooked: { type: Boolean, default: false },
    },
  ],
});

const Availability = mongoose.model("Availability", AvailabilitySchema);
export default Availability;
