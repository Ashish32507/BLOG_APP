import React from "react";
import { useNavigate } from "react-router-dom";

function BlogCard(props) {
  const { _id, about, adminImage, adminName, blogImage, category, title } =
    props.post;

  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/viewpost/${_id}`);
      }}
      className="w-full sm:w-64 h-72 bg-white rounded-lg shadow-md overflow-hidden group transform transition-transform duration-200 hover:scale-105"
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={blogImage.url || "https://via.placeholder.com/300x150"} // Placeholder for the image
          alt="Blog"
          className="w-full h-48 object-cover"
        />
        {/* Title on the Image */}
        <div className="absolute bottom-2 left-2 text-white font-bold text-lg group-hover:text-yellow-400">
          {title}
        </div>

        {/* Category on the Top Left */}
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded">
          {category}
        </div>
      </div>

      {/* User Info Section */}
      <div className="flex gap-3 px-2 items-center justify-start mt-4">
        {/* Circular Avatar */}
        <img
          src={adminImage || "https://via.placeholder.com/50"} // Placeholder for the avatar
          alt="User Avatar"
          className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
        />
        {/* Title & Label */}
        <div className="text-left">
          <h4 className="text-lg font-semibold">{adminName}</h4>
          <span className="text-sm text-gray-500">New</span>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
