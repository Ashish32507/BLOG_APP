import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { POST_API_END_POINT } from "../apiurl";
import { setPosts } from "../redux/PostSlice";

function useGetAllPost() {
  const dispatch = useDispatch();
  return useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${POST_API_END_POINT}/posts`, {
          withCredentials: true,
        });
        if (response.data.success) {
          console.log(response.data);
          dispatch(setPosts(response.data.posts));
        } else {
          console.log("Post Is Not Found");
        }
      } catch (err) {
        console.log("Error In Fetching All Post Hooks");
        console.log(err);
      }
    };
    fetchPost();
  }, []);
}

export default useGetAllPost;
