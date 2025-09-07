import express from "express";
import { createUrl, deleteUrl, getAllUrl, getUrl } from "../controller/shortUrl";

const router = express.Router();

// Create short URL
router.post("/shortUrl", createUrl);

// Get all short URLs
router.get("/shortUrl", getAllUrl);

// Redirect (use :shortUrl for consistency with controller)
router.get("/shortUrl/:shortUrl", getUrl);

// Delete by ID
router.delete("/shortUrl/:id", deleteUrl);

export default router;
