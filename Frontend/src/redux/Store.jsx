import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../redux/UserSlice";
import PostSlice from "./PostSlice";
const store = configureStore({
  reducer: {
    user: UserSlice,
    posts: PostSlice,
  },
});

export default store;
