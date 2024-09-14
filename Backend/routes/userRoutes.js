import express from "express";
import {
  register,
  login,
  logout,
  profile,
  getAdmins,
  updateUserProfile,
} from "../controller/userController.js";
import { isAuthenticated } from "../middleware/authUser.js";
import { singleUpload } from "../middleware/multer.js";
const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.get("/logout", isAuthenticated, logout);
userRoutes.get("/profile", isAuthenticated, profile);
userRoutes.put("/profile/update", isAuthenticated, updateUserProfile);
userRoutes.get("/admins", getAdmins);

export default userRoutes;
