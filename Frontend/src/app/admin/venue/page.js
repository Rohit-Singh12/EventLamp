"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

const VenueManagement = () => {
  // Predefined options for dropdowns
  const states = ["New York", "California", "Texas", "Florida", "Illinois"];
  const categories = [
    "Conference Hall",
    "Wedding Venue",
    "Party Hall",
    "Outdoor Space",
  ];

  const [venues, setVenues] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    images: [],
    capacity: "",
    price: "",
    location: "",
    state: "",
    pincode: "",
    address: "",
    landmark: "",
    rating: 0,
    description: "",
    features: "",
    user: "67c6c5915becdd414e2663d9", // Default user ID (can be dynamically set)
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editVenueId, setEditVenueId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteVenueId, setDeleteVenueId] = useState(null);

  // Fetch all venues on component mount
  useEffect(() => {
    fetchVenues();
  }, []);

  // Fetch all venues from the backend
  const fetchVenues = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/venues`
      );
      if (!response.ok) throw new Error("Failed to fetch venues");
      const data = await response.json();
      setVenues(data);
    } catch (error) {
      console.error("Error fetching venues:", error);
      alert("Failed to fetch venues. Please try again.");
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    // Create FormData to send files to the backend
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      // Send files to the backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/v1/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to upload images");

      const data = await response.json(); // Get the response data
      console.log("Backend response:", data); // Debug the response

      // Extract the file URLs from the response
      const imageUrls = data.files.map((file) => file.path); // Use `file.path` or `file.filename` as needed

      console.log("Processed image URLs:", imageUrls); // Debug the processed URLs

      // Update the formData state with the new image URLs
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...imageUrls], // Append new URLs to existing ones
      }));
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images. Please try again.");
    }
  };

  // Delete an image from the preview
  const handleDeleteImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  // Handle form submission (Save or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create the venue with the uploaded image URLs
      const newVenue = {
        name: formData.name,
        category: formData.category,
        images: formData.images, // Use the uploaded image URLs
        capacity: Number(formData.capacity),
        price: Number(formData.price),
        location: formData.location,
        state: formData.state,
        pincode: formData.pincode,
        address: formData.address,
        landmark: formData.landmark,
        rating: Number(formData.rating),
        description: formData.description,
        features: formData.features,
        user: "67c6c5915becdd414e2663d9", // User ID (can be dynamically set)
      };

      // Save the venue to the backend
      let response;
      if (isEditing) {
        // Update existing venue
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/venues/${editVenueId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newVenue),
          }
        );
      } else {
        // Create new venue
        response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/venues`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newVenue),
        });
      }

      if (!response.ok) throw new Error("Failed to save venue");

      const savedVenue = await response.json();

      if (isEditing) {
        setVenues(
          venues.map((venue) =>
            venue._id === editVenueId ? { ...venue, ...savedVenue } : venue
          )
        );
      } else {
        setVenues([...venues, savedVenue]);
      }

      handleCancel(); // Close modal and reset form
    } catch (error) {
      console.error("Error saving venue:", error);
      alert("Failed to save venue. Please try again.");
    }
  };

  // Handle venue deletion
  const handleDelete = async (venueId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/venues/${venueId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete venue");

      setVenues(venues.filter((venue) => venue._id !== venueId));
      setDeleteVenueId(null);
    } catch (error) {
      console.error("Error deleting venue:", error);
      alert("Failed to delete venue. Please try again.");
    }
  };

  // Handle edit venue
  const handleEdit = (venue) => {
    setFormData({
      name: venue.name,
      category: venue.category,
      images: venue.images,
      capacity: venue.capacity,
      price: venue.price,
      location: venue.location,
      state: venue.state,
      pincode: venue.pincode,
      address: venue.address,
      landmark: venue.landmark,
      rating: venue.rating,
      description: venue.description,
      features: venue.features.join(", "),
      user: venue.user,
    });
    setIsEditing(true);
    setEditVenueId(venue._id);
    setIsModalOpen(true);
  };

  // Handle cancel (close modal and reset form)
  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      category: "",
      images: [],
      capacity: "",
      price: "",
      location: "",
      state: "",
      pincode: "",
      address: "",
      landmark: "",
      rating: 0,
      description: "",
      features: "",
      user: "67c6c5915becdd414e2663d9", // Reset user ID
    });
    setIsEditing(false);
    setEditVenueId(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Venue Management</h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditing(false);
            setFormData({
              name: "",
              category: "",
              images: [],
              capacity: "",
              price: "",
              location: "",
              state: "",
              pincode: "",
              address: "",
              landmark: "",
              rating: 0,
              description: "",
              features: "",
              user: "67c6c5915becdd414e2663d9", // Default user ID
            });
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FaPlus className="mr-2" />
          Add Venue
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <motion.div
            key={venue._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{venue.name}</h3>
            <p className="text-gray-600 mb-1">{venue.category}</p>
            <p className="text-gray-600 mb-1">Capacity: {venue.capacity}</p>
            <p className="text-gray-600 mb-1">Price: ${venue.price}</p>
            <p className="text-gray-600 mb-1">Location: {venue.location}</p>
            <p className="text-gray-600 mb-1">State: {venue.state}</p>
            <p className="text-gray-600 mb-1">Pincode: {venue.pincode}</p>
            <p className="text-gray-600 mb-1">Address: {venue.address}</p>
            <p className="text-gray-600 mb-1">Landmark: {venue.landmark}</p>
            <p className="text-gray-600 mb-1">Rating: {venue.rating}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(venue)}
                className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center"
              >
                <FaEdit className="mr-2" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(venue._id)}
                className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
              >
                <FaTrash className="mr-2" />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
          >
            <motion.div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-4 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {isEditing ? "Edit Venue" : "Add New Venue"}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Venue Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Venue Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* Category Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    placeholder="Capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* State Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* Landmark */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Landmark
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    placeholder="Landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rating
                  </label>
                  <input
                    type="number"
                    name="rating"
                    placeholder="Rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Features (comma separated)
                  </label>
                  <input
                    type="text"
                    name="features"
                    placeholder="Features"
                    value={formData.features}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* Image Upload and Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Images
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className="w-full p-2 border rounded"
                    accept="image/*"
                  />
                </div>

                <div className="flex gap-2 mt-2">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img} // Use the Cloudinary URL
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded"
                      />
                      <button
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        <FaTimes className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                {/* Form Actions */}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    {isEditing ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VenueManagement;
