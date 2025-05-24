import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbConnect.js"; // Import DB connection
import venueRoutes from "./routes/venueRoute.js";
import authRoutes from "./routes/authRoutes.js";
import AvailabilityRoutes from "./routes/availabilityRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import venueCategoryRoutes from "./routes/venueCategoryRoutes.js";
import sliderRoutes from "./routes/sliderRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

// Convert `import.meta.url` to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
connectDB();

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/v1/upload", uploadRoutes); // File upload routes
app.use("/api/venues", venueRoutes); // Venue routes
app.use("/api/v1/auth", authRoutes); // Authentication routes
app.use("/api/availability", AvailabilityRoutes); // Availability routes
app.use("/api/bookings", bookingRoutes); // Booking routes
app.use("/api/v1/venueCategory", venueCategoryRoutes);
app.use("/api/v1/slider", sliderRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Party Booking API!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
