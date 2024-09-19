import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../apiurl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "",
    education: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false); // State for handling loading spinner

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when API call starts

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("education", formData.education);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("photo", formData.photo);

    try {
      const response = await axios.post(
        `https://blog-app-qdrv.onrender.com/register`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("There was an error registering!", error);
    } finally {
      setLoading(false); // Set loading to false when API call ends
      setFormData({
        name: "",
        phone: "",
        email: "",
        password: "",
        role: "",
        education: "",
        photo: null,
      });
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
            Signup
          </h2>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-semibold mb-1">
                Name
              </label>
              <input
                name="name"
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm font-semibold mb-1">
                Phone
              </label>
              <input
                name="phone"
                type="number"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-semibold mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="role" className="text-sm font-semibold mb-1">
                Role
              </label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="education" className="text-sm font-semibold mb-1">
                Education
              </label>
              <input
                name="education"
                type="text"
                id="education"
                value={formData.education}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your Qualification"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="photo" className="text-sm font-semibold mb-1">
                Photo
              </label>
              <input
                name="photo"
                type="file"
                id="photo"
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white w-full p-2 mt-6 rounded-md font-semibold hover:bg-blue-600 transition"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <span className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 017-7.937V4a8 8 0 010 16v-1.063A8 8 0 014 12z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Signup"
              )}
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
