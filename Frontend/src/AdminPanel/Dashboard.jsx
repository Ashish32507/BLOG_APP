import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/UserSlice"; // Import your user action

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    // Redirect to login page if user is null
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Clear user data from Redux store
    dispatch(setUser(null));
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden p-4 bg-gray-800 text-white"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <FaTimes className="text-xl" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </button>

      {/* Left Sidebar */}
      <div
        className={`fixed inset-0 z-30 md:relative md:top-0 md:left-0 w-64 bg-gray-800 text-white flex flex-col transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Mobile Close Button */}
        <button
          className="md:hidden absolute top-4 right-4 text-white text-2xl"
          onClick={toggleSidebar}
        >
          <FaTimes />
        </button>

        {/* Profile Section */}
        <div className="p-4 border-b border-gray-700">
          <img
            src={user?.photo?.url || "https://via.placeholder.com/100"} // Placeholder for profile image
            alt="Admin"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h2 className="text-center text-xl font-semibold mt-2">
            {user?.name || "Admin"}
          </h2>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 mt-4 text-center">
          <ul>
            <li>
              <NavLink
                to="/"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                activeClassName="bg-gray-600"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/posts"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                activeClassName="bg-gray-600"
              >
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/createpost"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                activeClassName="bg-gray-600"
              >
                Add Post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/profile"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                activeClassName="bg-gray-600"
              >
                Profile
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-center px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Right Content Area */}
      <div
        className={`flex-1 p-6 bg-gray-100 transition-transform overflow-y-auto ${
          isSidebarOpen ? "md:ml-64" : ""
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
