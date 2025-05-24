"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VenueSlider = () => {
  const [venues, setVenues] = useState([]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/v1/slider`
        );
        setVenues(response.data);
      } catch (error) {
        console.error("Failed to fetch slider data:", error);
      }
    };

    fetchVenues();
  }, []);

  return (
    <div className="mb-8">
      <Slider {...sliderSettings}>
        {venues.map((venue) => (
          <div key={venue._id} className="relative w-full h-80 md:h-96">
            <img
              src={venue.image || "/fallback.jpg"}
              alt={venue.name}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
              <h2 className="text-2xl font-bold">{venue.name}</h2>
              <p className="text-gray-300">{venue.location}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VenueSlider;
