// EditPostModal.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditPostModal = ({ isOpen, onClose, postToEdit, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    about: "",
    blogImage: null,
  });

  useEffect(() => {
    if (postToEdit) {
      setFormData({
        title: postToEdit.title || "",
        category: postToEdit.category || "",
        about: postToEdit.about || "",
        blogImage: null, // Clear the file input on open
      });
    }
  }, [postToEdit]);

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("about", formData.about);
    if (formData.blogImage) {
      formDataToSend.append("blogImage", formData.blogImage);
    }

    try {
      const response = await axios.put(
        `https://blog-app-qdrv.onrender.com/post/upate/${postToEdit._id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        onUpdate(); // Notify parent to refresh posts
        onClose(); // Close the modal
      } else {
        console.log("Failed to update the post");
      }
    } catch (err) {
      console.error("Error updating the post", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter post title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter post category"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="about" className="block text-gray-700">
              About
            </label>
            <textarea
              id="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter post description"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="blogImage" className="block text-gray-700">
              Blog Image
            </label>
            <input
              type="file"
              id="blogImage"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
