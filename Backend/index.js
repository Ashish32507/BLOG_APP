import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import blogRoutes from "./routes/blogRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// Initialize app and environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Database connection
dbConnection();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "https://blog-app-qdrv.onrender.com", credentials: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET_KEY, // Fixed typo
});

// Routes
app.use("/user", userRoutes);
app.use("/post", blogRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Your Server Is Running On ${PORT}`);
});
