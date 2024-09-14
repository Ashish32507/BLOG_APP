import express from "express";
import {
  createBlog,
  deletePost,
  getAllAdminPost,
  getAllBlogs,
  getSinglePost,
  updateBlog,
} from "../controller/blogController.js";
const blogRoutes = express.Router();
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";

// Apply authentication and role-based access control
blogRoutes.post("/create", isAuthenticated, isAdmin("admin"), createBlog);
blogRoutes.delete("/delete/:id", isAuthenticated, isAdmin("admin"), deletePost);
blogRoutes.get("/posts", getAllBlogs);
blogRoutes.get(
  "/adminpost",
  isAuthenticated,
  isAdmin("admin"),
  getAllAdminPost
);
blogRoutes.get("/singlepost/:id", getSinglePost);
blogRoutes.put("/upate/:id", isAuthenticated, isAdmin("admin"), updateBlog);
export default blogRoutes;
