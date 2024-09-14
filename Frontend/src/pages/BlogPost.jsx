import React from "react";
import BlogCard from "../component/BlogCard";
import Trainding from "../component/Trainding";
import Creators from "../component/Creators";
import useGetAllPost from "../hooks/useGetAllPost";
import { useSelector } from "react-redux";
import useGetAllTrandingPost from "../hooks/useGetAllTrendingPost";
import useGetAllAdmins from "../hooks/userGetAllAdmin";

function BlogPost() {
  useGetAllPost();
  useGetAllAdmins();
  const { post, traindingPost } = useSelector((store) => store.posts);
  const { admins } = useSelector((store) => store.user);

  useGetAllTrandingPost();

  return (
    <>
      <div className="max-w-6xl h-full flex flex-col items-center gap-8">
        {/* Latest Post Section */}
        <h2 className="w-full text-3xl font-bold mb-4 text-left pt-4">
          Latest Post
        </h2>
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center">
          {post
            ? post.slice(0, 8).map((post, index) => {
                return <BlogCard key={index} post={post} />;
              })
            : "Post Is Not Found"}
        </div>

        <h2 className="w-full text-3xl font-bold mb-4 text-left pt-4">
          Trending Post
        </h2>
        <div className="w-full px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {traindingPost ? (
              traindingPost
                .slice(0, 4)
                .map((post, index) => <Trainding key={index} post={post} />)
            ) : (
              <p>Trending Post Is Not Found</p>
            )}
          </div>
        </div>

        {/* Creators Section */}
        <h2 className="w-full text-3xl font-bold mb-4 text-left">Creators</h2>
        <div className="w-full max-w-6xl py-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 items-center justify-center">
          {admins && admins.length > 0 ? (
            admins.slice(0, 6).map((admin, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 duration-300 w-full"
              >
                <Creators admin={admin} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-lg text-gray-500">
              No Admins Found
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default BlogPost;
