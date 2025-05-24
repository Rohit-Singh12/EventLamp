import Availability from "../models/Availability.js";

// 📌 Fetch availability for a given month and year
export const getAvailabilityByMonth = async (req, res) => {
  try {
    const { partyPlotId, year, month } = req.params;

    const availability = await Availability.findOne({
      partyPlotId,
      year,
      month,
    });

    if (!availability) {
      return res.json({ dates: [] }); // If no availability found, return empty
    }

    res.json(availability.dates);
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 Set availability for a given month (create or update)
export const setAvailability = async (req, res) => {
  try {
    const { partyPlotId, year, month, dates } = req.body;

    if (!partyPlotId || !year || !month || !Array.isArray(dates)) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    let availability = await Availability.findOne({ partyPlotId, year, month });

    if (availability) {
      // Update existing availability
      availability.dates = dates;
      await availability.save();
    } else {
      // Create new availability
      availability = await Availability.create({
        partyPlotId,
        year,
        month,
        dates,
      });
    }

    res.json({ message: "Availability updated successfully!" });
  } catch (error) {
    console.error("Error updating availability:", error);
    res.status(500).json({ message: "Server error" });
  }
};
