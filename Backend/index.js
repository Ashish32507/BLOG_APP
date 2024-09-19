import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import blogRoutes from "./routes/blogRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs"; // Import fs module to manage file system

// Initialize app and environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Ensure temp directory exists
const tempDir = "/temp/";
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true }); // Create the temp directory if it doesn't exist
}

// Database connection
dbConnection();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "https://blog-app-frontend-9z9y.onrender.com", // Use environment variable for origin if available
  credentials: true,
}));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: tempDir,
  })
);

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, // Use `process.env.API_SECRET` for correct naming
});

// Routes
app.use("/user", userRoutes);
app.use("/post", blogRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Your Server Is Running On Port ${PORT}`);
});
