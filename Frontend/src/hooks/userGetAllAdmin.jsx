import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { USER_API_END_POINT } from "../apiurl";
import { setAdmin } from "../redux/UserSlice";

function useGetAllAdmins() {
  const dispatch = useDispatch();
  return useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`${USER_API_END_POINT}/admins`, {
          withCredentials: true,
        });
        if (response.data.success) {
          console.log(response.data);
          dispatch(setAdmin(response.data.profile));
        } else {
          console.log("Post Is Not Found");
        }
      } catch (err) {
        console.log("Error In Fetching All Post Hooks");
        console.log(err);
      }
    };
    fetchAdmins();
  }, []);
}

export default useGetAllAdmins;
