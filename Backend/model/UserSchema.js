import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validator.isEmail, "Please Enter The Valid Email"],
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
  },
  photo: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
  },
  education: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
  },
  password: {
    type: String,
    required: true,
    Select: false,
    minlength: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const User = mongoose.model("User", userSchema);
