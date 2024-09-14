import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { POST_API_END_POINT } from "../apiurl";
import { toast } from "react-toastify";

function ViewSinglePost() {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState(null); // Changed to null for better handling of empty states

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const response = await axios.get(
          `${POST_API_END_POINT}/singlepost/${id}`,
          { withCredentials: true }
        );
        if (response.data.success) {
          setSinglePost(response.data.post);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("An error occurred while fetching the post.");
      }
    };

    fetchSinglePost();
  }, [id]);

  if (!singlePost) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Image Section with Category */}
      <div className="relative mb-6">
        <img
          src={singlePost.blogImage.url} // Assuming 'blogImage.url' contains the image URL
          alt={singlePost.title}
          className="w-full h-auto rounded-lg shadow-md"
        />
        {/* Category Badge */}
        <span className="absolute top-2 left-2 bg-gray-800 text-white px-3 py-1 text-sm font-semibold rounded-lg">
          {singlePost.category}{" "}
          {/* Assuming 'category' contains the post category */}
        </span>
      </div>

      {/* Post Details */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{singlePost.title}</h1>
        <p className="text-gray-700 mb-4 text-justify">{singlePost.about}</p>
        <p className="text-gray-500">
          Posted on {new Date(singlePost.createdAt).toLocaleDateString()}
        </p>

        {/* Admin Info Section */}
        <div className="flex items-center mt-4">
          <img
            src={singlePost.adminImage} // Assuming 'adminImage.url' contains the admin's image URL
            alt={singlePost.adminName}
            className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
          />
          <div className="ml-4">
            <p className="text-gray-800 font-semibold">
              {singlePost.adminName}
            </p>
            <p className="text-gray-500 text-sm">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSinglePost;
