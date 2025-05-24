"use client";

import { useState, useEffect } from "react";
import VenueCard from "./components/VenueCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WeddingVenueCategories from "@/components/layouts/Category";
import CompactCategoryRow from "@/components/layouts/Category";
import ResponsiveNavigation from "@/components/layouts/UserSidebar";
import VenueSlider from "@/components/layouts/Slider";

export default function Home() {
  const [venues, setVenues] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProfessional, setSelectedProfessional] = useState("All");
  const [selectedCapacity, setSelectedCapacity] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  // Fetch venues from the API
  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/venues`);
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    }

    fetchVenues();
  }, []);

  // Filter venues based on selected categories, filters, and search query
  const filteredVenues = venues.filter((venue) => {
    const isCategoryMatch =
      selectedCategory === "All" || venue.category === selectedCategory;
    const isProfessionalMatch =
      selectedProfessional === "All" ||
      venue.professional === selectedProfessional;
    const isCapacityMatch =
      selectedCapacity === "All" || venue.capacity === selectedCapacity;
    const isLocationMatch =
      selectedLocation === "All" || venue.location === selectedLocation;

    // Search filter
    const isSearchMatch =
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      isCategoryMatch &&
      isProfessionalMatch &&
      isCapacityMatch &&
      isLocationMatch &&
      isSearchMatch
    );
  });

  return (
    <div className="container mx-auto ">
      <CompactCategoryRow />
      {/* Image Slider */}
      <div className="mb-8">
        <VenueSlider />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 text-center mt-8">
        Featured Venues
      </h1>

      {/* Venue Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredVenues.map((venue) => (
          <VenueCard key={venue._id} venue={venue} />
        ))}
      </div>
    </div>
  );
}
