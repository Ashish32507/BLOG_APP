import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { POST_API_END_POINT } from "../apiurl";
import { toast } from "react-toastify";

function AddPost() {
  const [formData, setFormData] = useState({
    title: "",
    blogImage: null,
    category: "",
    about: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create form data to send
    const form = new FormData();
    form.append("title", formData.title);
    form.append("category", formData.category);
    form.append("about", formData.about);
    if (formData.blogImage) form.append("blogImage", formData.blogImage);

    try {
      // Send POST request with the form data and authentication token
      const response = await axios.post(`${POST_API_END_POINT}/create`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include JWT token
        },
        withCredentials: true, // Ensure cookies are sent (if using cookies for authentication)
      });

      // Handle successful post creation
      if (response.data.success) {
        toast.success("Post added successfully!");
        navigate("/admin/posts");
      } else {
        toast.error(response.data.message || "Failed to add post.");
        console.error("Failed to add post:", response.data.message);
      }
    } catch (error) {
      // Handle different types of errors
      if (error.response && error.response.status === 401) {
        // Redirect to login if the user is unauthorized
        toast.error("You need to log in to add a post.");
        navigate("/login");
      } else {
        toast.error("Error adding post. Please try again.");
        console.error("Error adding post:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4 space-y-2">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4 space-y-2">
          <label className="block text-gray-700">Blog Image</label>
          <input
            type="file"
            name="blogImage"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4 space-y-2">
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select a category</option>
            <option value="Education">Education</option>
            <option value="Coding">Coding</option>
            <option value="Social">Social</option>
            <option value="Health">Health</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Travel">Travel</option>
          </select>
        </div>

        <div className="mb-4 space-y-2">
          <label className="block text-gray-700">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="5"
            required
          />
        </div>

        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Adding Post..." : "Add Post"}
        </button>
      </form>
    </div>
  );
}

export default AddPost;
