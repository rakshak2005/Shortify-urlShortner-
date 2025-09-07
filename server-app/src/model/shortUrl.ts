import mongoose from "mongoose";
import { nanoid } from "nanoid";

const shortUrlScheme = new mongoose.Schema({
    fullUrl:{
      type: String,
      reuired: true,
    },
    shortUrl:{
        type: String,
        required: true,
        default: () => nanoid().substring(0,8), 
    },
    clicks: {
        type: Number,
        default: 0,
    }
},{
    timestamps: true
});

export const urlModel = mongoose.model("shortUrl", shortUrlScheme);