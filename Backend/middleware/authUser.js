import { UserModel } from "../model/UserSchema.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    // Check if the token exists in cookies
    const token = req.cookies?.authToken;

    // Log token for debugging
    console.log("User Token Is:", token);

    // If no token is found, return an authentication error
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated. No token found.",
      });
    }

    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

    // Log decoded token for debugging
    console.log("Decoded Token:", decoded);

    // Find the user based on decoded token's `id`
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Construct new user object to attach to `req`
    req.user = {
      id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
      phone: user.phone,
      photo: user.photo,
    };

    // Log authenticated user for debugging
    console.log("Authenticated User:", req.user);

    // Proceed to the next middleware
    next();
  } catch (err) {
    // Log error for debugging
    console.error("Authentication error:", err);

    // Handle token expiration or other errors
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please login again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal error occurred during authentication.",
    });
  }
};

export const isAdmin = (...allowedRoles) => {
  return (req, res, next) => {
    // Ensure that `req.user` exists and the user's role is one of the allowed roles
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. You do not have the necessary permissions (Role: ${
          req.user?.role || "undefined"
        }).`,
      });
    }

    // Proceed to the next middleware
    next();
  };
};
