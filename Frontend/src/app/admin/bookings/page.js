"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [filterVenueId, setFilterVenueId] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Fetch all bookings with optional filters
        const res = await axios.get(`${API_BACKEND_URL}/bookings`, {
          params: {
            venueId: filterVenueId, // Filter by venue ID
          },
        });
        setBookings(Array.isArray(res.data.bookings) ? res.data.bookings : []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [filterVenueId]); // Re-fetch when filterVenueId changes

  const handleStatusChange = async (_id, newStatus) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/bookings/${_id}/status`,
        {
          status: newStatus,
        }
      );

      if (res.status === 200) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === _id ? { ...booking, status: newStatus } : booking
          )
        );
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    // Filter by status
    const matchesStatus =
      filterStatus === "all" || booking.status === filterStatus;

    // Filter by date
    const matchesDate =
      !filterDate ||
      booking.dates.some((date) => {
        const bookingDate = new Date(date).toISOString().split("T")[0]; // Convert booking date to YYYY-MM-DD
        return bookingDate === filterDate;
      });

    return matchesStatus && matchesDate;
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading bookings...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Booking Management
      </h1>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Filter by Status:
          </label>
          <select
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Filter by Date:
          </label>
          <input
            type="date"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Filter by Venue:
          </label>
          <input
            type="text"
            placeholder="Enter Venue ID"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={filterVenueId}
            onChange={(e) => setFilterVenueId(e.target.value)}
          />
        </div>
      </div>

      {/* Booking Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border text-sm font-medium text-gray-700">
                User
              </th>
              <th className="p-3 border text-sm font-medium text-gray-700">
                Venue
              </th>
              <th className="p-3 border text-sm font-medium text-gray-700">
                Booking Dates
              </th>
              <th className="p-3 border text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="p-3 border text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  {/* User Details */}
                  <td className="p-3 border text-sm text-gray-600">
                    <div className="space-y-1">
                      <p className="font-medium">
                        <strong>Name:</strong> {booking.userId?.name || "N/A"}
                      </p>
                      <p>
                        <strong>Email:</strong> {booking.userId?.email || "N/A"}
                      </p>
                      <p>
                        <strong>Role:</strong> {booking.userId?.role || "N/A"}
                      </p>
                      <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(
                          booking.userId?.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </td>

                  {/* Venue Details */}
                  <td className="p-3 border text-sm text-gray-600">
                    <div className="space-y-1">
                      <p className="font-medium">
                        <strong>Name:</strong> {booking.venueId?.name || "N/A"}
                      </p>
                      <p>
                        <strong>Category:</strong>{" "}
                        {booking.venueId?.category || "N/A"}
                      </p>
                      <p>
                        <strong>Location:</strong>{" "}
                        {booking.venueId?.location || "N/A"}
                      </p>
                      <p>
                        <strong>Capacity:</strong>{" "}
                        {booking.venueId?.capacity || "N/A"}
                      </p>
                      <p>
                        <strong>Price:</strong>{" "}
                        {booking.venueId?.price || "N/A"}
                      </p>
                      <p>
                        <strong>Rating:</strong>{" "}
                        {booking.venueId?.rating || "N/A"}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {booking.venueId?.description || "N/A"}
                      </p>
                      <p>
                        <strong>Features:</strong>{" "}
                        {booking.venueId?.features?.join(", ") || "N/A"}
                      </p>
                      <p>
                        <strong>Address:</strong>{" "}
                        {booking.venueId?.address || "N/A"}
                      </p>
                      <p>
                        <strong>Landmark:</strong>{" "}
                        {booking.venueId?.landmark || "N/A"}
                      </p>
                      <p>
                        <strong>Pincode:</strong>{" "}
                        {booking.venueId?.pincode || "N/A"}
                      </p>
                      <p>
                        <strong>State:</strong>{" "}
                        {booking.venueId?.state || "N/A"}
                      </p>
                    </div>
                  </td>

                  {/* Booking Dates */}
                  <td className="p-3 border text-sm text-gray-600">
                    {booking.dates?.map((date, index) => (
                      <p key={index}>
                        {new Date(date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    ))}
                  </td>

                  {/* Status */}
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "completed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3 border">
                    {booking.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleStatusChange(booking._id, "confirmed")
                          }
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(booking._id, "canceled")
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    {booking.status === "confirmed" && (
                      <button
                        onClick={() =>
                          handleStatusChange(booking._id, "completed")
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-4 text-sm text-gray-600"
                >
                  No bookings available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
