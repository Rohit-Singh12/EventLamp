const mongoose = require("mongoose");

const influencerRequirementSchema = new mongoose.Schema({
  niche: {
    type: String,
    required: true,
    trim: true,
  },
  platforms: {
    type: String,
    required: true,
    trim: true,
  },
  followers: {
    type: Number,
    required: true,
  },
  goal: {
    type: String,
    required: true,
    trim: true,
  },
  challenges: [
    {
      type: String,
      trim: true,
    },
  ],
  services: [
    {
      type: String,
      trim: true,
    },
  ],
  budget: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  agencySizePreference: {
    type: String,
    enum: ["Small", "Medium", "Large"],
    required: true,
  },
  timeline: {
    type: String,
    enum: ["Short-Term", "Long-Term"],
    required: true,
  },
  accountManager: {
    type: Boolean,
    default: false,
  },
  consultationCall: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const InfluencerRequirement = mongoose.model(
  "InfluencerRequirement",
  influencerRequirementSchema
);

module.exports = InfluencerRequirement;
