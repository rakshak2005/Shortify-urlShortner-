"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const shortUrl_1 = __importDefault(require("./routes/shortUrl")); // make sure .js is included if using ES modules
dotenv_1.default.config();
(0, dbConfig_1.default)();
const PORT = process.env.PORT || 5001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// ✅ Allow localhost (dev) + your Vercel domain
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://shortify-url-shortner-ctap.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
// ✅ Test root route
app.get("/", (req, res) => {
    res.send("Backend is running ✅");
});
// ✅ API routes
app.use("/api", shortUrl_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
