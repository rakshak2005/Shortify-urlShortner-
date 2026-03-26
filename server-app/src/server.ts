import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import shortUrlRoutes from "./routes/shortUrl";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/", shortUrlRoutes);

// DB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});