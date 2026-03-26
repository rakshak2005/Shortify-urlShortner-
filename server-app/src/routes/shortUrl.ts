import express from "express";
import { createUrl, getAllUrl, getUrl, deleteUrl } from "../controller/shortUrl";

const router = express.Router();

// ✅ API routes
router.post("/shorturl", createUrl);
router.get("/shorturl", getAllUrl);
router.delete("/shorturl/:id", deleteUrl);

// ✅ REDIRECT (MUST BE LAST)
router.get("/:shortUrl", getUrl);

export default router;