import { User } from "../model/UserSchema.js";
import cloudinary from "cloudinary";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, name, phone, password, role, education } = req.body;
    const { photo } = req.files;

    // Check if photo exists
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
        message: "Please upload a valid photo format (jpg, png)",
      });
    }

    // Check for missing fields
    if (!email || !name || !phone || !password || !role || !education) {
      return res.status(400).json({
        success: false,
        message: "Some required fields are missing",
      });
    }

    // Upload photo to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("Error in Cloudinary upload", cloudinaryResponse.error);
      return res.status(500).json({
        success: false,
        message: "Photo upload failed",
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

    // Hash the password
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

    // Prepare JWT payload
    const tokenData = {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      phone: newUser.phone,
      role: newUser.role,
      education: newUser.education,
      photo: newUser.photo.url,
    };

    // Sign the token with expiration (e.g., 1 day)
    const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN, {
      expiresIn: "1d",
    });

    // Respond with success message
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
        role: newUser.role,
        education: newUser.education,
        photo: newUser.photo.url,
        token: token,
      },
    });
  } catch (err) {
    console.error("Internal Error", err);
    return res.status(500).json({
      success: false,
      message: "An internal error occurred",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if all required fields are provided
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and role are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // If user is not found
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

    // Check if the role matches the user's role
    if (user.role !== role) {
      return res.status(403).json({
        success: false,
        message: "Role does not match",
      });
    }

    // Remove the password from the user object before sending it in the response
    const newUser = { ...user.toObject(), password: undefined };

    // JWT payload data
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };

    // Generate JWT token with a 1-day expiration time
    const token = jwt.sign(
      tokenData, // Payload
      process.env.SECRET_TOKEN, // Secret key from .env
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // Set token in an HTTP-only, secure cookie
    res.cookie("authToken", token, {
      httpOnly: true, // Prevent access via client-side JavaScript
      secure: process.env.NODE_ENV === "production", // Send only over HTTPS in production
      sameSite: "strict", // Mitigate CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
    });

    // Send response with the user details (without password)
    return res.status(200).json({
      success: true,
      user: newUser,
      message: "Login successful",
    });
  } catch (err) {
    // Log internal server errors
    console.error("Internal Error:", err);
    return res.status(500).json({
      success: false,
      message: "An internal error occurred",
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the authToken cookie by setting its expiration to a past date
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensures cookie is only sent over HTTPS in production
      sameSite: "strict", // Helps mitigate CSRF attacks
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

export const profile = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const findUser = await User.findById(userId);

    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "User Is Not Found",
      });
    }

    const newUser = findUser.toObject();
    newUser.password = undefined;

    return res.status(200).json({
      success: true,
      profile: newUser,
      message: "User Is Found",
    });
  } catch (err) {
    console.error("Error updating blog post:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const findUsers = await User.find({ role: "admin" });

    if (findUsers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No admins found",
      });
    }

    // Remove passwords from the user objects
    const usersWithoutPassword = findUsers.map((user) => {
      const userObj = user.toObject();
      delete userObj.password; // Ensure password is not included
      return userObj;
    });

    return res.status(200).json({
      success: true,
      profile: usersWithoutPassword,
      message: "Admins found",
    });
  } catch (err) {
    console.error("Error fetching admins:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    const userId = req.user.id;
    const { name, email, phone, education } = req.body;
    const image = req.file;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.education = education || user.education;

    // Handle image upload
    if (image) {
      const result = await cloudinary.uploader.upload(image.path, {
        folder: "user_images",
      });
      user.photo.url = result.secure_url;
    }

    // Save updated user
    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
