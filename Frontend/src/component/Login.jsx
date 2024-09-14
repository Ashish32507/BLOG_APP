import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../apiurl";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/UserSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to manage form input
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "",
  });

  // State for loading spinner
  const [loading, setLoading] = useState(false);

  // Form field change handler
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    const { email, password, role } = data;
    if (!email || !password || !role) {
      toast.error("All fields are required.");
      return false;
    }
    return true;
  };

  // Form submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) return;

    setLoading(true); // Start loading spinner

    try {
      // Send login request to the server
      const response = await axios.post(`${USER_API_END_POINT}/login`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Ensure cookies are handled correctly
      });

      // Handle successful login response
      if (response.data.success) {
        toast.success("User Login SuccessFully");
        console.log("Authenticated User:", response.data.user);

        // Store user data in Redux
        dispatch(setUser(response.data.user));

        // Navigate to the home page or dashboard
        navigate("/");
      } else {
        // Handle unsuccessful login attempt
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle errors during login (network/server errors)
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="w-full bg-gray-100 flex justify-center items-center p-20">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          Login
        </h2>
        <form className="flex flex-col space-y-4" onSubmit={submitHandler}>
          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={data.email}
              onChange={changeHandler}
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={data.password}
              onChange={changeHandler}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="flex flex-col">
            <label htmlFor="role" className="text-sm font-semibold mb-1">
              Role
            </label>
            <select
              name="role"
              id="role"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={data.role}
              onChange={changeHandler}
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Login Button with Loading Spinner */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md font-semibold hover:bg-blue-600 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Sign-up link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
