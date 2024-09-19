import { Blog } from "../model/BlogModel.js"; // Ensure correct path
import { User } from "../model/UserSchema.js"; // Ensure correct path
import cloudinary from "cloudinary";

// Cloudinary config (if needed, otherwise set in separate file)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a blog
export const createBlog = async (req, res) => {
  try {
    const { title, category, about } = req.body;
    const { blogImage } = req.files || {};

    if (!title || !category || !about) {
      return res.status(400).json({
        success: false,
        message: "Title, category, and about fields are required.",
      });
    }

    if (!blogImage || !blogImage.mimetype) {
      return res.status(400).json({
        success: false,
        message: "Please upload a blog image.",
      });
    }

    const allowedFormats = ["image/jpeg", "image/png"];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Please upload a valid image format (jpg, png).",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated.",
      });
    }

    const adminName = req.user.name;
    const adminImage = req.user.photo?.url;
    const createdBy = req.user.id;

    const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("Error in Cloudinary upload:", cloudinaryResponse.error);
      return res.status(500).json({
        success: false,
        message: "Image upload failed.",
      });
    }

    const newBlog = new Blog({
      title,
      category,
      about,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
      createdBy,
      adminName,
      adminImage,
    });

    await newBlog.save();

    return res.status(201).json({
      success: true,
      message: "Blog created successfully.",
      blog: newBlog,
    });
  } catch (err) {
    console.error("Error creating blog:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Delete a blog post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req?.user?.id?.toString();

    if (!id || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters.",
      });
    }

    const deletedPost = await Blog.findOneAndDelete({
      _id: id,
      createdBy: userId,
    });

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found or you're not authorized to delete it.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (err) {
    console.error("Error deleting blog post:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const posts = await Blog.find();
    if (!posts || posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blog posts found.",
      });
    }

    return res.status(200).json({
      success: true,
      posts,
      message: "Blog posts found.",
    });
  } catch (err) {
    console.error("Error fetching blog posts:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get all blogs created by an admin (the authenticated user)
export const getAllAdminPost = async (req, res) => {
  try {
    const userId = req?.user?.id?.toString();
    const findPost = await Blog.find({ createdBy: userId });
    if (!findPost || findPost.length === 0) {
      return res.status(404).json({
        success: false,
        message: "You have not created any posts.",
      });
    }

    return res.status(200).json({
      success: true,
      posts: findPost,
      message: "Posts found.",
    });
  } catch (err) {
    console.error("Error fetching admin posts:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get a single blog post by ID
export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const findPost = await Blog.findById(id);

    if (!findPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    return res.status(200).json({
      success: true,
      post: findPost,
      message: "Post found.",
    });
  } catch (err) {
    console.error("Error fetching blog post:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Update a blog post
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id?.toString();

    if (!id || !userId) {
      return res.status(400).json({
        success: false,
        message: "Blog ID and User ID are required.",
      });
    }

    const allowedUpdates = ["title", "category", "about", "blogImage"];
    const updates = Object.keys(req.body).reduce((acc, key) => {
      if (allowedUpdates.includes(key)) {
        acc[key] = req.body[key];
      }
      return acc;
    }, {});

    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: id, createdBy: userId },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found or you are not authorized to update it.",
      });
    }

    return res.status(200).json({
      success: true,
      blog: updatedBlog,
      message: "Blog post updated successfully.",
    });
  } catch (err) {
    console.error("Error updating blog post:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
