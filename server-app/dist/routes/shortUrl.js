"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shortUrl_1 = require("../controller/shortUrl");
const router = express_1.default.Router();
// Create short URL
router.post("/shortUrl", shortUrl_1.createUrl);
// Get all short URLs
router.get("/shortUrl", shortUrl_1.getAllUrl);
// Redirect (use :shortUrl for consistency with controller)
router.get("/shortUrl/:shortUrl", shortUrl_1.getUrl);
// Delete by ID
router.delete("/shortUrl/:id", shortUrl_1.deleteUrl);
exports.default = router;
