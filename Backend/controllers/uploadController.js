import File from "../models/Upload.js";
import path from "path";

// Upload a file
export const uploadFile = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  try {
    const uploadedFiles = await Promise.all(
      req.files.map(async (file) => {
        // Construct the URL for the uploaded file
        const fileUrl = `https://api.eventlamp.com/uploads/${file.filename}`;

        // Save the file metadata in the database
        const newFile = new File({
          filename: file.filename,
          path: fileUrl, // Save the URL instead of the local path
        });
        await newFile.save();
        return newFile;
      })
    );

    res.status(201).json({
      message: "Files uploaded successfully",
      files: uploadedFiles,
    });
  } catch (err) {
    console.error("Error uploading files:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all files
export const getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (err) {
    console.error("Error fetching files:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a file by ID
export const getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json(file);
  } catch (err) {
    console.error("Error fetching file:", err);
    res.status(500).json({ message: "Server error" });
  }
};
