import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { POST_API_END_POINT } from "../apiurl";
import EditPostModal from "./EditPostModal";

function AdminPost() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);

  // Function to handle search/filter
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Fetch posts from the API
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${POST_API_END_POINT}/adminpost`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setPosts(response.data.posts);
        } else {
          console.log("Posts not found");
        }
      } catch (err) {
        console.error("Internal error in AdminPost", err);
      }
    };

    fetchPosts(); // Call the fetchPosts function
  }, []);

  // Function to handle post deletion
  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${POST_API_END_POINT}/delete/${postId}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setPosts(posts.filter((post) => post._id !== postId));
        toast.success("Post deleted successfully!");
      } else {
        toast.error("Failed to delete the post.");
      }
    } catch (err) {
      toast.error("Error deleting the post. Please try again.");
      console.error("Error deleting the post", err);
    }
  };

  const handleEdit = (post) => {
    setPostToEdit(post);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    // Refresh posts after updating
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${POST_API_END_POINT}/adminpost`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setPosts(response.data.posts);
        }
      } catch (err) {
        console.error("Internal error in AdminPost", err);
      }
    };

    fetchPosts();
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Posts</h1>

      {/* Search/Filter Input */}
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />

      {/* Post List */}
      {filteredPosts.length > 0 ? (
        <ul className="space-y-4">
          {filteredPosts.map((post) => (
            <li
              key={post._id}
              className="bg-white p-4 border border-gray-200 rounded-md shadow-sm flex flex-col md:flex-row items-center"
            >
              {/* Post Image */}
              <img
                src={post.blogImage.url}
                alt={post.title}
                className="w-32 h-32 object-cover rounded-md mb-4 md:mb-0 md:mr-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-600">
                  Date: {post.createdAt.slice(0, 10)}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {/* Buttons for editing or deleting a post */}
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No posts found.</p>
      )}

      {/* Edit Post Modal */}
      <EditPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postToEdit={postToEdit}
        onUpdate={handleUpdate}
      />

      <ToastContainer />
    </div>
  );
}

export default AdminPost;
