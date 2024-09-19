import { Blog } from "../model/BlogModel.js";
import { User } from "../model/UserSchema.js";
import cloudinary from "cloudinary";

export const createBlog = async (req, res) => {
  try {
    const { title, category, about } = req.body;
    const { blogImage } = req.files || {};

    // Validate required fields
    if (!title || !category || !about) {
      return res.status(400).json({
        success: false,
        message: "Title, category, and about fields are required.",
      });
    }

    // Validate the presence of a blog image
    if (!blogImage || !blogImage.mimetype) {
      return res.status(400).json({
        success: false,
        message: "Please upload a blog image.",
      });
    }

    // Validate image format
    const allowedFormats = ["image/jpeg", "image/png"];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Please upload a valid image format (jpg, png).",
      });
    }

    // Ensure the user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated.",
      });
    }

    const adminName = req.user.name;
    const adminImage = req.user.photo?.url; // Assuming photo is stored in `photo.url`
    const createdBy = req.user.id;

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("Error in Cloudinary upload:", cloudinaryResponse.error);
      return res.status(500).json({
        success: false,
        message: "Image upload failed.",
      });
    }

    // Create a new blog post
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

    // Save the blog post to the database
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

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userid = req?.user?.id?.toString();

    if (!id || !userid) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters.",
      });
    }

    console.log("Post ID:", id, "User ID:", userid);

    // Find and delete the blog post in one query
    const deletedPost = await Blog.findOneAndDelete({
      _id: id,
      createdBy: userid,
    });

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found or you're not authorized to delete it.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting blog post:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const posts = await Blog.find();
    if (!posts) {
      return res.status(400).json({
        success: false,
        message: "No BlogPost Is Found",
      });
    }

    return res.status(200).json({
      success: true,
      posts,
      message: "Blog Post Found",
    });
  } catch (err) {
    console.error("Error deleting blog post:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getAllAdminPost = async (req, res) => {
  try {
    const userId = req?.user?.id?.toString();
    const findPost = await Blog.find({ createdBy: userId });
    if (!findPost) {
      return res.status(400).json({
        success: false,
        message: "You Have not Created Any Post",
      });
    }

    return res.status(200).json({
      success: true,
      posts: findPost,
      message: "Posts are Found",
    });
  } catch (err) {
    console.error("Error deleting blog post:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const findPost = await Blog.findOne({ _id: id });
    if (!findPost) {
      return res.status(400).json({
        success: false,
        message: "You Have not Created Any Post",
      });
    }

    return res.status(200).json({
      success: true,
      post: findPost,
      message: "Posts are Found",
    });
  } catch (err) {
    console.error("Error deleting blog post:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id?.toString();

    console.log("Blog ID:", id);
    console.log("User ID:", userId);

    // Validate that both ID and user ID are provided
    if (!id || !userId) {
      return res.status(400).json({
        success: false,
        message: "Blog ID and User ID are required.",
      });
    }

    // Filter out any fields that should not be updated
    const allowedUpdates = ["title", "category", "about", "blogImage"]; // List of fields you want to allow updating
    const updates = Object.keys(req.body).reduce((acc, key) => {
      if (allowedUpdates.includes(key)) {
        acc[key] = req.body[key];
      }
      return acc;
    }, {});

    // Update the blog post
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: id, createdBy: userId },
      updates, // Use the filtered updates object
      {
        new: true,
        runValidators: true, // Ensure validation checks are run on updates
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
