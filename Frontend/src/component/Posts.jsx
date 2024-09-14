import React from "react";
import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import useGetAllPost from "../hooks/useGetAllPost";

function Posts() {
  useGetAllPost();
  const { post } = useSelector((store) => store.posts);
  return (
    <>
      <div className="max-w-6xl h-full flex flex-col items-start justify-start gap-6 py-5">
        {/* Section Title */}
        <h2 className="w-full text-3xl font-bold mb-4 flex items-center justify-start">
          All Posts
        </h2>
        <div className="w-full grid grid-cols-1 items-center justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {post
            ? post.map((post, index) => {
                return <BlogCard key={index} post={post} />;
              })
            : "Post Is Not Found"}
        </div>
      </div>
    </>
  );
}

export default Posts;
