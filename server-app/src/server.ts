import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connectDb from "./config/dbConfig.js";
import shortUrl from "./routes/shortUrl.js"; // make sure .js is included if using ES modules

dotenv.config();
connectDb();

const PORT = process.env.PORT || 10000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Allow localhost (dev) + your Vercel domain
app.use(cors({
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
app.use("/api", shortUrl);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
