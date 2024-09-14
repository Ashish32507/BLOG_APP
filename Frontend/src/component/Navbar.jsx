import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setUser } from "../redux/UserSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(setUser(null)); // Clear user data from Redux store
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 left-0 right-0 z-50 lg:px-5">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <h1 className="font-bold text-2xl">
          Your<span className="text-blue-500">Blog</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 font-semibold text-lg">
          <NavLink
            exact
            to="/"
            className="px-3 py-2 rounded-md hover:bg-blue-100"
            activeClassName="bg-blue-500 text-white"
          >
            Home
          </NavLink>
          <NavLink
            to="/posts"
            className="px-3 py-2 rounded-md hover:bg-blue-100"
            activeClassName="bg-blue-500 text-white"
          >
            Blogs
          </NavLink>
          <NavLink
            to="/alladmin"
            className="px-3 py-2 rounded-md hover:bg-blue-100"
            activeClassName="bg-blue-500 text-white"
          >
            Creator
          </NavLink>
          <NavLink
            to="/about"
            className="px-3 py-2 rounded-md hover:bg-blue-100"
            activeClassName="bg-blue-500 text-white"
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className="px-3 py-2 rounded-md hover:bg-blue-100"
            activeClassName="bg-blue-500 text-white"
          >
            Contact Us
          </NavLink>
        </div>

        {/* Login/Signup for Desktop */}
        <div className="hidden md:flex space-x-4">
          {user && user.role === "admin" ? (
            <button
              onClick={() => navigate("/admin")}
              className="bg-blue-500 text-white p-2 rounded-md font-semibold hover:bg-blue-600"
            >
              Dashboard
            </button>
          ) : null}
          <button
            onClick={handleLogout}
            className="p-2 rounded-md font-semibold bg-red-500 text-white hover:bg-red-700"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white w-full text-center space-y-4 py-4 shadow-lg">
          <NavLink
            exact
            to="/"
            className="block text-lg py-2 hover:bg-blue-100"
            activeClassName="bg-blue-500 text-white"
          >
            Home
          </NavLink>
          <NavLink
            to="/posts"
            className="block text-lg py-2 hover:bg-blue-100"
            activeClassName="bg-blue-500 text-white"
          >
            Blogs
          </NavLink>
          <NavLink
            to="/alladmin"
            className="block text-lg py-2 hover:bg-blue-100"
            activeClassName="bg-blue-500 text-white"
          >
            Creator
          </NavLink>
          <NavLink
            to="/about"
            className="block text-lg py-2 hover:bg-blue-100"
            activeClassName="bg-blue-500 text-white"
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className="block text-lg py-2 hover:bg-blue-100"
            activeClassName="bg-blue-500 text-white"
          >
            Contact Us
          </NavLink>
          <div className="space-y-2">
            {user && user.role === "admin" ? (
              <button
                onClick={() => navigate("/admin")}
                className="w-full p-2 bg-red-500 rounded-md font-semibold hover:bg-red-700"
              >
                Dashboard
              </button>
            ) : null}
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full p-2 bg-red-500 rounded-md font-semibold hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/login">
                  <button className="w-full p-2 bg-red-500 rounded-md font-semibold hover:bg-red-700">
                    Login
                  </button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
