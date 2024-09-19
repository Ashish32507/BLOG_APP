import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email",
    },
  },
  phone: {
    type: String, // Changed to String as phone numbers can contain leading zeros and may vary in length.
    unique: true,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Simple validation for 10-digit phone numbers (you can adjust based on your needs)
      },
      message: "Please enter a valid 10-digit phone number",
    },
  },
  photo: {
    public_id: {
      type: String,
      // Optional, but good to have public_id if storing images
    },
    url: {
      type: String,
      required: [true, "Photo URL is required"],
    },
  },
  education: {
    type: String,
    required: [true, "Education is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: {
      values: ["user", "admin"],
      message: "Role must be either 'user' or 'admin'",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false, // This hides the password by default when querying users
    minlength: [8, "Password must be at least 8 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", userSchema);
