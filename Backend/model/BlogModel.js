import mongoose from "mongoose";

export const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  blogImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  category: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
    minlength: [200, "Should Conatian atleast 200 Character"],
  },
  adminName: {
    type: String,
    // required: true,
  },
  adminImage: {
    type: String,
    // required: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const BlogModel = mongoose.model("Blog", blogSchema);
