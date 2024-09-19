import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  blogImage: {
    public_id: {
      type: String,
      required: [true, "Image public_id is required"],
    },
    url: {
      type: String,
      required: [true, "Image URL is required"],
    },
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  about: {
    type: String,
    required: [true, "About is required"],
    minlength: [200, "About should contain at least 200 characters"],
  },
  adminName: {
    type: String,
    // If it's truly optional, no need to require it, but we can enforce trimming
    trim: true,
  },
  adminImage: {
    type: String,
    // Optional, but let's make sure it's a string if provided
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true, // Assuming a blog must be created by a user
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Blog = mongoose.model("Blog", blogSchema);
