import React from "react";
import { useNavigate } from "react-router-dom";

function Trainding(props) {
  const navigate = useNavigate();
  const { _id, about, adminImage, adminName, blogImage, category, title } =
    props.post;

  return (
    <div
      onClick={() => {
        navigate(`/viewpost/${_id}`);
      }}
      className="w-full sm:w-64 bg-white rounded-lg shadow-md overflow-hidden group border border-gray-200 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={blogImage.url || "https://via.placeholder.com/300x150"} // Placeholder image
          alt={title || "Post Image"}
          className="w-full h-40 object-cover"
        />
        {/* Badge Label */}
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-sm px-2 py-1 rounded-full">
          {category}
        </div>
      </div>

      {/* Title Section */}
      <div className="p-4">
        <h2 className="text-xl font-bold group-hover:text-yellow-400">
          {title}
        </h2>
      </div>

      {/* User Info Section */}
      <div className="flex items-center space-x-2 px-4 pb-4">
        {/* Circular Avatar */}
        <img
          src={adminImage || "https://via.placeholder.com/50"} // Placeholder for avatar
          alt={adminName || "User Avatar"}
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
        />
        {/* Username */}
        <span className="font-semibold">{adminName}</span>
      </div>
    </div>
  );
}

export default Trainding;
