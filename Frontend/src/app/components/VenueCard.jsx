// components/VenueCard.js
import React from "react";
import { useRouter } from "next/navigation"; // For navigation

const VenueCard = ({ venue }) => {
  const {
    _id,
    name,
    images,
    capacity,
    price,
    location,
    rating,
    description,
    category,
  } = venue;
  const router = useRouter();
  console.log(_id, "id");

  // Function to render star icons based on rating
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-xl ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Navigate to details page
  const handleCardClick = () => {
    router.push(`/venue/${_id}`); // Navigate to the details page for this venue
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Venue Image */}
      <img src={images[0]} alt={name} className="w-full h-48 object-cover" />

      {/* Venue Details */}
      <div className="p-4">
        {/* Category Badge */}
        <div className="mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>

        {/* Name and Description */}
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 mb-2">{description}</p>

        {/* Location, Capacity, and Price */}
        <p className="text-gray-600 mb-2">
          <strong>Location:</strong> {location}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Capacity:</strong> {capacity} guests
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Price:</strong> ₹{price.toLocaleString()}
        </p>

        {/* Rating with Stars */}
        <div className="flex items-center mb-2">
          <span className="text-gray-600 mr-2">Rating:</span>
          <div className="flex">{renderRatingStars(rating)}</div>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
