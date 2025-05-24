import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  GiWoodenDoor,
  GiModernCity,
  GiFlowerPot,
  GiIsland,
  GiCastle,
  GiPartyFlags,
} from "react-icons/gi";

// Icon mapping
const iconMap = {
  GiWoodenDoor: <GiWoodenDoor />,
  GiModernCity: <GiModernCity />,
  GiFlowerPot: <GiFlowerPot />,
  GiIsland: <GiIsland />,
  GiCastle: <GiCastle />,
  GiPartyFlags: <GiPartyFlags />,
};

const MobileVenueCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      console.log("API URL:", process.env.NEXT_PUBLIC_API_BACKEND_URL);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/v1/venueCategory`
        );
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-full no-scrollbar-container">
      <div className="flex overflow-x-auto no-scrollbar gap-5 py-2 touch-pan-x">
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex flex-col items-center flex-shrink-0 transition-transform hover:scale-105"
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md ${category.color} transition duration-300`}
            >
              <div className="text-2xl">
                {iconMap[category.icon] || <GiWoodenDoor />}
              </div>
            </div>
            <span className="text-sm text-gray-700 mt-2 font-semibold">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileVenueCategories;
