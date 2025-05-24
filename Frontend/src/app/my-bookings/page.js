"use client";

import axios from "axios";
import { mapEasingToNativeEasing } from "framer-motion";
import { Heading1 } from "lucide-react";
import React, { useEffect, useState } from "react";

function page() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    getUserBookings();
  }, []);

  const getUserBookings = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/bookings/user/67dc81af040f5cc6398595d7`
      );
      console.log(data);
      setBookings(data.bookings);
    } catch (error) {}
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Bookings</h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr className="bg-slate-500 text-white">
            <th className="border px-4 py-2">User ID</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Venue ID</th>
            <th className="border px-4 py-2">Venue Name</th>
            <th className="border px-4 py-2">Venue Category</th>
            <th className="border px-4 py-2">Venue Image</th>
            <th className="border px-4 py-2">Venue Image</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="border px-4 py-2">{booking.userId}</td>
              <td className="border px-4 py-2">{booking.status}</td>
              <td className="border px-4 py-2">{booking.dates}</td>
              <td className="border px-4 py-2">{booking.venueId?._id}</td>
              <td className="border px-4 py-2">{booking.venueId?.name}</td>
              <td className="border px-4 py-2">{booking.venueId?.category}</td>
              <td className="border px-4 py-2">{booking.venueId?.category}</td>
              <td className="border px-4 py-2">{booking.venueId?.category}</td>
              <td className="border px-4 py-2">
                <img
                  src={booking.venueId?.image}
                  alt="Venue"
                  className="w-20 h-20 object-cover rounded-md"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default page;
