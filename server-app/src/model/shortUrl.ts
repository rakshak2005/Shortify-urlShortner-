import mongoose from "mongoose";
import shortid from "shortid";

const urlSchema = new mongoose.Schema(
  {
    fullUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
      default: shortid.generate, // auto if not custom
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const urlModel = mongoose.model("url", urlSchema);