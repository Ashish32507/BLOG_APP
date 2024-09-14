import React from "react";

function Creators(props) {
  const { name, email, photo } = props.admin;
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Profile Section */}
      <div className="flex flex-col items-center">
        {/* Rounded Profile Picture */}
        <img
          src={photo.url || "https://via.placeholder.com/150"} // Placeholder for the profile image
          alt="Admin Profile"
          className="w-32 h-32 rounded-full object-cover shadow-lg"
        />
        {/* Admin Name */}
        <h3 className="mt-4 text-xl text-center font-semibold text-gray-800">
          {name}
        </h3>
      </div>
    </div>
  );
}

export default Creators;
