import { User } from "../model/UserSchema.js";
import cloudinary from "cloudinary";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer"; // Ensure multer is imported for image upload handling

// Register User
export const register = async (req, res) => {
  try {
    const { email, name, phone, password, role, education } = req.body;
    console.log( email, name, phone, password, role, education);
    console.log(req.files);
    const { photo } = req.files;
    
    // Validate required fields
    if (!email || !name || !phone || !password || !role || !education) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if photo is uploaded
    if (!photo) {
      return res.status(400).json({
        success: false,
        message: "Please upload a photo",
      });
    }

    // Validate photo format
    const allowedFormats = ["image/jpeg", "image/png"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Please upload a valid photo format (JPEG/PNG)",
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    // Upload photo to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("Cloudinary upload error", cloudinaryResponse.error);
      return res.status(500).json({
        success: false,
        message: "Photo upload failed",
      });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      name,
      phone,
      password: hashedPassword,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
      role,
      education,
    });

    // Generate JWT token
    const tokenData = {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      phone: newUser.phone,
      role: newUser.role,
      education: newUser.education,
      photo: newUser.photo.url,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_TOKEN, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        ...tokenData,
        token,
      },
    });
  } catch (err) {
    console.error("Internal error:", err);
    return res.status(500).json({
      success: false,
      message: "An internal error occurred",
    });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate required fields
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and role are required",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify password
    const isMatchPassword = await bcryptjs.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Verify role
    if (user.role !== role) {
      return res.status(403).json({
        success: false,
        message: "Role does not match",
      });
    }

    // Generate JWT token
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_TOKEN, { expiresIn: "1d" });

    // Set token in an HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      success: true,
      user: { ...tokenData, token },
      message: "Login successful",
    });
  } catch (err) {
    console.error("Internal error:", err);
    return res.status(500).json({
      success: false,
      message: "An internal error occurred",
    });
  }
};

// Logout User
export const logout = async (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful. Cookies cleared.",
    });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred during logout",
    });
  }
};

// Get User Profile
export const profile = async (req, res) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      profile: user,
      message: "User found",
    });
  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");

    if (!admins.length) {
      return res.status(404).json({
        success: false,
        message: "No admins found",
      });
    }

    return res.status(200).json({
      success: true,
      admins,
      message: "Admins found",
    });
  } catch (err) {
    console.error("Get admins error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, phone, education } = req.body;
    const photo = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (education) user.education = education;

    // Handle photo update
    if (photo) {
      const result = await cloudinary.uploader.upload(photo.path, {
        folder: "user_images",
      });
      user.photo.url = result.secure_url;
    }

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: { ...user.toObject(), password: undefined },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
