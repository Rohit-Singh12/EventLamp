"use client";

import React, { useState, useEffect } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
} from "date-fns";

//const API_URL = "http://localhost:5000/api/availability";
const API_BACKEND_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

const Availability = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch availability data when the month changes
  useEffect(() => {
    fetchAvailability();
  }, [currentMonth]);

  // Fetch availability data from the backend
  const fetchAvailability = async () => {
    setLoading(true);
    setError(null);
    try {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth(); // Get month as 0-11

      const response = await fetch(
        `${API_BACKEND_URL}/availability/67aa679925c4cdeac1d83cb0/${year}/${month}`
      );
      if (!response.ok) throw new Error("Failed to fetch availability data");

      const data = await response.json();

      // Generate all dates for the current month
      const firstDay = startOfMonth(currentMonth);
      const lastDay = endOfMonth(currentMonth);
      const allDatesInMonth = eachDayOfInterval({
        start: firstDay,
        end: lastDay,
      });

      // Map fetched data to selectedDates, initializing missing dates with defaults
      const mappedData = allDatesInMonth.reduce((acc, date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        const fetchedDate = data.find((d) => d.date === formattedDate);
        acc[formattedDate] = {
          isAvailable: fetchedDate?.isAvailable ?? true, // Default to true if not fetched
          isBooked: fetchedDate?.isBooked ?? false, // Default to false if not fetched
        };
        return acc;
      }, {});

      setSelectedDates(mappedData);
    } catch (error) {
      console.error("Error fetching availability:", error);
      setError("Failed to fetch availability data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle availability for a specific date
  const toggleDateSelection = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    if (selectedDates[formattedDate]?.isBooked) return; // Prevent changes if booked

    setSelectedDates((prev) => ({
      ...prev,
      [formattedDate]: {
        ...prev[formattedDate],
        isAvailable: !prev[formattedDate]?.isAvailable,
      },
    }));
  };

  // Save availability data to the backend
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth(); // 0 for Jan, 1 for Feb...

      // Generate all dates for the current month
      const firstDay = startOfMonth(currentMonth);
      const lastDay = endOfMonth(currentMonth);
      const allDatesInMonth = eachDayOfInterval({
        start: firstDay,
        end: lastDay,
      });

      // Map all dates to the required format, ensuring default values for missing dates
      const datesArray = allDatesInMonth.map((date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        return {
          date: formattedDate,
          isAvailable: selectedDates[formattedDate]?.isAvailable ?? true, // Default to true if not set
        };
      });

      // Send data to the backend
      const response = await fetch(`${API_BACKEND_URL}/api/availability/set`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partyPlotId: "67aa679925c4cdeac1d83cb0", // Replace with dynamic ID
          year,
          month,
          dates: datesArray,
        }),
      });

      if (!response.ok) throw new Error("Failed to save availability");

      alert("Availability saved successfully!");
    } catch (error) {
      console.error("Error saving availability:", error);
      setError("Failed to save availability. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Generate all days in the current month
  const firstDay = startOfMonth(currentMonth);
  const lastDay = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Availability Management
      </h2>
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            disabled={loading}
          >
            Previous
          </button>
          <h3 className="text-xl font-semibold text-gray-700">
            {format(currentMonth, "MMMM yyyy")}
          </h3>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            disabled={loading}
          >
            Next
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-600">Loading availability...</p>
        ) : (
          <div className="grid grid-cols-7 gap-2 text-center">
            {daysInMonth.map((day) => {
              const formattedDate = format(day, "yyyy-MM-dd");
              const isBooked = selectedDates[formattedDate]?.isBooked;
              const isAvailable =
                selectedDates[formattedDate]?.isAvailable ?? true;

              return (
                <div
                  key={formattedDate}
                  className={`p-3 border rounded-lg shadow-sm transition-all ${
                    isBooked
                      ? "bg-red-100 cursor-not-allowed"
                      : isAvailable
                      ? "bg-green-100 hover:bg-green-200"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <label className="flex flex-col items-center cursor-pointer">
                    <span className="text-sm font-medium text-gray-700">
                      {format(day, "d")}
                    </span>
                    <input
                      type="checkbox"
                      checked={isAvailable}
                      onChange={() => toggleDateSelection(day)}
                      className="mt-1 w-5 h-5 cursor-pointer"
                      disabled={isBooked || loading}
                    />
                  </label>
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={handleSave}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition-colors"
          disabled={saving || loading}
        >
          {saving ? "Saving..." : "Save Availability"}
        </button>
      </div>
    </div>
  );
};

export default Availability;
