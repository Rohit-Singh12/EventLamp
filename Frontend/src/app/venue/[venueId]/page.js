"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
} from "date-fns";

export default function VenueDetails({ params }) {
  let id = params.venueId; // Get dynamic venue ID from URL
  const router = useRouter();

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [moreSuggestions, setMoreSuggestions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Selected date for booking
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Current month for calendar

  // Fetch venue details and suggestions
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        // Fetch venue details using the dynamic `id`
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/venues/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch venue: ${res.statusText}`);
        }
        const data = await res.json();
        console.log(data);

        setVenue(data);

        // Fetch more suggestions based on category
        const suggestionsRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/venues?category=${data.category}`
        );
        if (!suggestionsRes.ok) {
          throw new Error(
            `Failed to fetch suggestions: ${suggestionsRes.statusText}`
          );
        }
        const suggestionsData = await suggestionsRes.json();
        setMoreSuggestions(suggestionsData.filter((v) => v.id !== data.id));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVenue();
  }, [id]);

  // Handle date selection
  const handleDateSelection = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setSelectedDate(formattedDate);
  };

  // Handle booking
  const handleBookNow = async () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    const bookingData = {
      userId: "67dc81af040f5cc6398595d7", // Replace with actual user ID
      venueId: id, // Use the dynamic venue ID
      dates: [selectedDate], // Booking a single date
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/bookings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Booking successful!");
        router.push(`/booking-confirmation?bookingId=${data.booking._id}`);
      } else {
        alert(`Booking failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error making booking:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  // Generate days for the current month
  const firstDay = startOfMonth(currentMonth);
  const lastDay = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading venue...
      </div>
    );

  if (!venue)
    return (
      <div className="text-center text-lg text-gray-600 mt-10">
        Venue not found
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Venue Image Section */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
        <img
          src={venue.images?.[0] || "/fallback.jpg"}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
          <h1 className="text-3xl font-bold">{venue.name}</h1>
          <p className="text-lg text-gray-300">{venue.location}</p>
        </div>
      </div>

      {/* Venue Details & Booking Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Venue Details */}
        <div className="md:col-span-2 space-y-6">
          <p className="text-gray-600">{venue.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">Category</h2>
              <p className="text-gray-700">{venue.category}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">Capacity</h2>
              <p className="text-gray-700">{venue.capacity} Guests</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">Price</h2>
              <p className="text-gray-700">₹{venue.price}/hour</p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">Address</h2>
              <p className="text-gray-700">{venue.address}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">Landmark</h2>
              <p className="text-gray-700">{venue.landmark}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">Pincode</h2>
              <p className="text-gray-700">{venue.pincode}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">State</h2>
              <p className="text-gray-700">{venue.state}</p>
            </div>
          </div>

          {/* Features */}
          <h2 className="text-2xl font-semibold mt-6">Features</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {venue.features?.map((feature, index) => (
              <div
                key={index}
                className="bg-blue-50 p-4 rounded-lg flex items-center space-x-2"
              >
                <span className="text-blue-500 text-xl">✔</span>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Book This Venue
          </h2>

          {/* Calendar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="text-gray-600 hover:text-gray-900"
              >
                Previous
              </button>
              <h3 className="text-lg font-semibold">
                {format(currentMonth, "MMMM yyyy")}
              </h3>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="text-gray-600 hover:text-gray-900"
              >
                Next
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
              {daysInMonth.map((day) => {
                const formattedDate = format(day, "yyyy-MM-dd");
                const isSelected = formattedDate === selectedDate;

                return (
                  <div
                    key={formattedDate}
                    onClick={() => handleDateSelection(day)}
                    className={`p-2 rounded-lg cursor-pointer ${
                      isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {format(day, "d")}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleBookNow}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* More Suggestions */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">More Suggestions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {moreSuggestions.map((suggestion) => (
            <Link
              key={suggestion.id}
              href={`/venues/${suggestion.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <img
                src={suggestion.image || "/fallback.jpg"}
                alt={suggestion.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {suggestion.name}
                </h3>
                <p className="text-gray-600 mb-2">{suggestion.description}</p>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="text-gray-600 ml-1">
                    {suggestion.rating} ({suggestion.capacity} guests)
                  </span>
                </div>
                <p className="text-gray-600 mt-2 font-semibold">
                  ₹{suggestion.price}/hour
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
