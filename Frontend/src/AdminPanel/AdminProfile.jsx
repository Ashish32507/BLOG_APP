import React, { useState } from "react";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";

function AdminProfile() {
  // State to control modal visibility
  const [isModalOpen, setModalOpen] = useState(false);

  // Sample admin data (replace with real data from state or API)
  const { user } = useSelector((store) => store.user);

  // Open the modal
  const openModal = () => setModalOpen(true);

  // Close the modal
  const closeModal = () => setModalOpen(false);

  return (
    <div className="bg-gray-200 min-h-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        {/* Profile Section */}
        <div className="flex items-center mb-8">
          <img
            src={user?.photo?.url || "asdas"}
            alt="Admin Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
          />
          <div className="ml-6">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-700 text-sm mt-1">{user.email}</p>
            <p className="text-gray-700 text-sm mt-1">{user.phone}</p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Contact Information
          </h3>
          <p className="text-gray-700">
            Email: <span className="font-medium">{user.email}</span>
          </p>
          <p className="text-gray-700">
            Phone: <span className="font-medium">{user.phone}</span>
          </p>
          <p className="text-gray-700">
            Education: <span className="font-medium">{user.education}</span>
          </p>
        </div>

        {/* Update Profile Button */}
        <div className="mt-8 text-center">
          <button
            onClick={openModal}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Modal Component */}
      <UpdateProfile isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default AdminProfile;
