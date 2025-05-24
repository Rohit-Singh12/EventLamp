import express from "express";
import {
  uploadFile,
  getAllFiles,
  getFileById,
} from "../controllers/uploadController.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";
const router = express.Router();

// Upload a file
router.post(
  "/",
  uploadMiddleware.array("images", 5), // Use the middleware
  uploadFile
);

// Get all files
router.get("/files", getAllFiles);

// Get a file by ID
router.get("/files/:id", getFileById);

export default router;
