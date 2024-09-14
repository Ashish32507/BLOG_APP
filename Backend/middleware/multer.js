import multer from "multer";

// Configure multer to use memory storage (you can change this to disk storage if needed)
const storage = multer.memoryStorage();

// Middleware for handling single file uploads
export const singleUpload = multer({ storage }).single("file");
